/**
 * Comunicação com o backend.
 *
 * Tudo o que precisa chegar ao servidor (cadastro e partidas do ranking) passa
 * por uma fila local. Um item só sai da fila quando o servidor confirma com
 * `{ ok: true }` em JSON. Falha de rede, servidor sem configuração, timeout ou
 * resposta que não seja JSON (por exemplo, o HTML do site) deixam o item na
 * fila para nova tentativa. Só um erro de validação (4xx com
 * `retryable: false`) tira o item da fila, e ele vai para `envios-recusados`.
 *
 * Filas no localStorage (ver core/storage.js):
 * - `lead-queue`: cadastro e atualizações do perfil. Um item por lead; a versão
 *   mais nova substitui a anterior, porque cada envio leva o perfil completo.
 * - `score-queue`: partidas para o ranking, uma por `partidaId`.
 * Se o localStorage falhar, a fila fica em memória até a página fechar e o
 * retorno avisa `salvo: false`.
 *
 * Novas tentativas: ao abrir o app, ao voltar a conexão, ao voltar para a aba
 * e por temporizador, com espera crescente (5 s, 10 s, 20 s... até 10 min).
 * Uma aba envia por vez (Web Locks quando o navegador oferece).
 */
import { PITSTOP } from '../config/pitstop.js'
import { normalizeTelefone } from './validation.js'
import { load, save } from './storage.js'

export const QUEUE = { lead: 'lead-queue', score: 'score-queue' }
const REJECTED = 'envios-recusados'
const MAX_SCORES = 200
const TIMEOUT_MS = 10000
const BACKOFF_MS = { base: 5000, max: 10 * 60 * 1000 }

const volatile = {}
/** Resultado de cada envio desta sessão, por `key#v`. Não depende do localStorage. */
const resultados = new Map()
const listeners = new Set()

function readQueue(name) {
  return volatile[name] ?? load(name, [])
}

/** Grava a fila. Devolve false se só ficou em memória. */
function writeQueue(name, items) {
  if (save(name, items)) {
    delete volatile[name]
    return true
  }
  volatile[name] = items
  return false
}

const uuid = () =>
  globalThis.crypto?.randomUUID?.() ??
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })

/**
 * Faz o POST e classifica o resultado.
 * @returns {{ ok: true } | { ok: false, retryable: boolean, error: string, campo?: string }}
 */
export async function postJson(url, body, { timeout = TIMEOUT_MS, fetchImpl = globalThis.fetch } = {}) {
  const controller = typeof AbortController === 'function' ? new AbortController() : null
  const timer = controller && setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetchImpl(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller?.signal,
    })
    const isJson = (res.headers?.get?.('content-type') || '').includes('application/json')
    const data = isJson ? await res.json().catch(() => null) : null
    if (res.ok && data?.ok === true) return { ok: true }
    if (!data || res.ok) return { ok: false, retryable: true, error: res.ok ? 'resposta_invalida' : `http_${res.status}` }
    // Só sai da fila sem confirmação quando o servidor diz que reenviar não adianta.
    // Um 404 ou 4xx sem esse aviso (rota ausente, proxy) continua na fila.
    return { ok: false, retryable: data.retryable !== false, error: data.error || `http_${res.status}`, campo: data.campo }
  } catch (err) {
    return { ok: false, retryable: true, error: err?.name === 'AbortError' ? 'timeout' : 'rede' }
  } finally {
    if (timer) clearTimeout(timer)
  }
}

const idDe = (item) => `${item.key}#${item.v}`

function registrar(item, status, extra = {}) {
  resultados.set(idDe(item), { status, ...extra })
  if (resultados.size > 200) resultados.delete(resultados.keys().next().value)
  const [tipo, id] = item.key.split(':')
  emit({ tipo: tipo === 'lead' ? 'lead' : 'partida', id, versao: item.v, status, ...extra })
}

function reject(item, result) {
  // A recusa fica registrada em memória mesmo se o localStorage falhar.
  registrar(item, 'recusado', { campo: result.campo ?? null })
  const list = readQueue(REJECTED)
  list.push({ key: item.key, v: item.v, url: item.url, error: result.error, campo: result.campo ?? null, em: new Date().toISOString(), body: item.body })
  writeQueue(REJECTED, list.slice(-20))
}

/** Tira o item da fila, a menos que ele tenha sido trocado por uma versão mais nova durante o envio. */
function dropIfSame(name, item) {
  writeQueue(
    name,
    readQueue(name).filter((x) => !(x.key === item.key && x.v === item.v)),
  )
}

function postpone(name, item, now) {
  const [tipo, id] = item.key.split(':')
  queueMicrotask(() => emit({ tipo: tipo === 'lead' ? 'lead' : 'partida', id, versao: item.v, status: 'na_fila' }))
  const tentativas = (item.tentativas || 0) + 1
  const wait = Math.min(BACKOFF_MS.max, BACKOFF_MS.base * 2 ** (tentativas - 1))
  writeQueue(
    name,
    readQueue(name).map((x) => (x.key === item.key && x.v === item.v ? { ...x, tentativas, proxima: now + wait } : x)),
  )
}

async function drain(name, now, force) {
  for (const item of readQueue(name)) {
    if (!force && item.proxima && item.proxima > now) break
    const result = await postJson(item.url, item.body)
    if (result.ok) {
      registrar(item, 'enviado')
      dropIfSame(name, item)
    } else if (!result.retryable) {
      reject(item, result)
      dropIfSame(name, item)
    } else {
      postpone(name, item, Date.now())
      break
    }
  }
}

let chain = Promise.resolve()
let timer = null

function schedule() {
  if (typeof window === 'undefined') return
  clearTimeout(timer)
  const next = [...readQueue(QUEUE.lead), ...readQueue(QUEUE.score)]
    .map((x) => x.proxima || 0)
    .sort((a, b) => a - b)[0]
  if (next == null) return
  timer = setTimeout(() => flushQueue(), Math.max(1000, next - Date.now()))
}

async function runFlush(force) {
  const work = async () => {
    const now = Date.now()
    await drain(QUEUE.lead, now, force)
    await drain(QUEUE.score, now, force)
  }
  const locks = typeof navigator !== 'undefined' ? navigator.locks : null
  if (locks?.request) await locks.request('pitstop-hemissul-envio', { ifAvailable: true }, (lock) => lock && work())
  else await work()
  schedule()
  return queueStatus()
}

/**
 * Tenta enviar tudo o que está na fila, um envio por vez.
 * `force` ignora a espera entre tentativas (usado ao voltar a conexão).
 */
export function flushQueue({ force = false } = {}) {
  chain = chain.then(() => runFlush(force)).catch(() => queueStatus())
  return chain
}

/** Mantido para compatibilidade com o App: envia cadastro e partidas pendentes. */
export const flushLeadQueue = () => flushQueue({ force: true })

export function queueStatus() {
  return {
    leads: readQueue(QUEUE.lead).length,
    partidas: readQueue(QUEUE.score).length,
    recusados: readQueue(REJECTED).length,
    salvo: !volatile[QUEUE.lead] && !volatile[QUEUE.score] && !volatile[REJECTED],
  }
}

function emit(evento) {
  if (!listeners.size) return
  const status = { ...queueStatus(), evento }
  for (const fn of listeners) {
    try {
      fn(status)
    } catch {
      /* um ouvinte com erro não interrompe a fila */
    }
  }
}

/**
 * Avisa a cada envio confirmado ou recusado, e a cada nova espera.
 * O ouvinte recebe `queueStatus()` mais `evento`:
 * `{ tipo: 'lead' | 'partida', id, versao, status: 'enviado' | 'recusado' | 'na_fila', campo? }`.
 * Devolve a função que cancela a inscrição. Não altera o contrato de
 * sendLead, sendScore e queueStatus.
 */
export function subscribeQueue(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function enqueue(name, item, max) {
  const items = readQueue(name)
  const i = items.findIndex((x) => x.key === item.key)
  if (i >= 0) items[i] = item
  else items.push(item)
  return writeQueue(name, items.slice(-max))
}

/**
 * Resultado da versão `v` do item `key`:
 * 1. ainda na fila (esta versão ou uma mais nova do mesmo lead) -> na_fila;
 * 2. resultado registrado nesta sessão -> enviado ou recusado;
 * 3. recusa registrada no localStorage para esta mesma versão -> recusado;
 * 4. senão, outra aba enviou -> enviado.
 * Recusas de versões anteriores não contaminam o resultado de uma nova.
 */
function outcome(name, key, v, salvo) {
  if (readQueue(name).some((x) => x.key === key)) return { status: 'na_fila', salvo }
  const r = resultados.get(`${key}#${v}`)
  if (r) return r.status === 'recusado' ? { status: 'recusado', salvo, campo: r.campo } : { status: 'enviado', salvo }
  const recusado = readQueue(REJECTED).find((x) => x.key === key && x.v === v)
  return recusado ? { status: 'recusado', salvo, campo: recusado.campo } : { status: 'enviado', salvo }
}

let ultimaRevisao = 0

/**
 * Envia (ou atualiza) o lead. Cada envio leva o perfil completo e uma
 * `revisao` crescente; o servidor ignora uma revisão mais antiga que a salva.
 * @returns {Promise<{ status: 'enviado' | 'na_fila' | 'recusado', salvo: boolean, campo?: string }>}
 */
export async function sendLead(lead, extra = {}) {
  const anterior = readQueue(QUEUE.lead).find((x) => x.key === `lead:${lead.id}`)?.v || 0
  const revisao = (ultimaRevisao = Math.max(Date.now(), anterior + 1, ultimaRevisao + 1))
  const body = { ...lead, ...extra, telefone: normalizeTelefone(lead.telefone), revisao }
  const key = `lead:${lead.id}`
  const salvo = enqueue(QUEUE.lead, { key, v: revisao, url: PITSTOP.leadEndpoint, body, tentativas: 0, proxima: 0 }, 20)
  await flushQueue()
  return outcome(QUEUE.lead, key, revisao, salvo)
}

/**
 * Registra a partida no ranking do posto. Cada chamada gera um `partidaId`;
 * reenviar o mesmo item não duplica a partida no servidor.
 * `duracao` (segundos) é opcional e ajuda o servidor a barrar pontuação
 * impossível.
 * @returns {Promise<{ status: 'enviado' | 'na_fila' | 'recusado', salvo: boolean, partidaId: string }>}
 */
export async function sendScore({ leadId, nome, posto, jogo, pontos, duracao }) {
  const partidaId = uuid()
  const body = { partidaId, leadId, nome, posto, jogo, pontos, jogadaEm: new Date().toISOString() }
  if (Number.isInteger(duracao) && duracao > 0) body.duracao = duracao
  const key = `score:${partidaId}`
  const salvo = enqueue(QUEUE.score, { key, v: 1, url: PITSTOP.rankingEndpoint, body, tentativas: 0, proxima: 0 }, MAX_SCORES)
  await flushQueue()
  return { ...outcome(QUEUE.score, key, 1, salvo), partidaId }
}

/** Ranking do dia. `null` quando indisponível (sem backend, erro ou resposta que não é JSON). */
export async function fetchRanking(posto, jogo) {
  const controller = typeof AbortController === 'function' ? new AbortController() : null
  const t = controller && setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(
      `${PITSTOP.rankingEndpoint}?posto=${encodeURIComponent(posto)}&jogo=${encodeURIComponent(jogo)}`,
      { signal: controller?.signal },
    )
    if (!res.ok || !(res.headers.get('content-type') || '').includes('application/json')) return null
    const data = await res.json()
    return Array.isArray(data.ranking) ? data.ranking : null
  } catch {
    return null
  } finally {
    if (t) clearTimeout(t)
  }
}

/** Fila antiga (antes da revisão): itens sem `key`. Converte para o formato novo. */
function migrateLegacyQueue() {
  const items = load(QUEUE.lead, [])
  if (!items.some((x) => !x.key)) return
  const latest = new Map()
  for (const x of items) {
    if (x.key) latest.set(x.key, x)
    else if (x.id) {
      const revisao = Date.parse(x.enviadoEm) || Date.now()
      const { enviadoEm, ...rest } = x
      latest.set(`lead:${x.id}`, {
        key: `lead:${x.id}`,
        v: revisao,
        url: PITSTOP.leadEndpoint,
        body: { ...rest, telefone: normalizeTelefone(x.telefone), revisao },
        tentativas: 0,
        proxima: 0,
      })
    }
  }
  writeQueue(QUEUE.lead, [...latest.values()])
}

if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  migrateLegacyQueue()
  window.addEventListener('online', () => flushQueue({ force: true }))
  document.addEventListener?.('visibilitychange', () => {
    if (document.visibilityState === 'visible') flushQueue()
  })
}
