/**
 * Vercel Function: ranking do dia por posto e por jogo (Supabase via REST).
 * Contrato completo em docs/BACKEND.md.
 *
 * Variáveis de ambiente (só no servidor, nunca com prefixo VITE_):
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 * Sem elas, responde 503 { error: 'nao_configurado' } e o app mostra o
 * recorde local sem apresentá-lo como publicado.
 *
 * GET  /api/ranking?posto=01&jogo=corrida  -> top 10 do dia (horário de Boa Vista)
 * POST /api/ranking { partidaId, leadId, nome, posto, jogo, pontos, jogadaEm, duracao? }
 *
 * O que o servidor garante: formato, limites de pontuação por jogo, partida
 * não repetida (partidaId único), data de até 48 h e no máximo
 * LIMITE_POR_JOGADOR partidas por lead a cada 10 min. O que ele NÃO garante:
 * que a partida aconteceu de verdade. A pontuação é calculada no aparelho.
 */
import { JOGOS, isPosto, parsePartida } from '../src/core/validation.js'
import { fail, fetchWithTimeout, isTemporary, readJson, send, supabaseConfig } from './_lib/http.js'

export const LIMITE_POR_JOGADOR = 30
const JANELA_MS = 10 * 60 * 1000
const RETRY_AFTER = { 'Retry-After': '60' }

// Boa Vista (RR) fica em UTC-4 o ano todo.
export function startOfDayBoaVista(now = Date.now()) {
  const local = new Date(now - 4 * 3600 * 1000)
  local.setUTCHours(0, 0, 0, 0)
  return new Date(local.getTime() + 4 * 3600 * 1000).toISOString()
}

const upstreamFail = (res, r) =>
  isTemporary(r) ? fail(res, 503, 'indisponivel', {}, RETRY_AFTER) : fail(res, 502, 'destino_recusou', { retryable: true }, RETRY_AFTER)

export function createRankingHandler({ env = process.env, fetchImpl = globalThis.fetch, now = () => Date.now(), log = console, timeout = 4000 } = {}) {
  return async function handler(req, res) {
    if (req.method !== 'GET' && req.method !== 'POST') return fail(res, 405, 'metodo', {}, { Allow: 'GET, POST' })
    const sb = supabaseConfig(env)

    if (req.method === 'GET') {
      const posto = String(req.query?.posto ?? 'sem-posto')
      const jogo = String(req.query?.jogo ?? 'corrida')
      if (!isPosto(posto)) return fail(res, 400, 'invalido', { campo: 'posto' })
      if (!JOGOS.includes(jogo)) return fail(res, 400, 'invalido', { campo: 'jogo' })
      if (!sb) return fail(res, 503, 'nao_configurado', {}, { 'Retry-After': '300' })
      const q = new URLSearchParams({
        select: 'nome,pontos',
        posto: `eq.${posto}`,
        jogo: `eq.${jogo}`,
        jogada_em: `gte.${startOfDayBoaVista(now())}`,
        order: 'pontos.desc,jogada_em.asc',
        limit: '10',
      })
      const r = await fetchWithTimeout(`${sb.url}/rest/v1/pitstop_partidas?${q}`, { headers: sb.headers }, { fetchImpl, timeout, expectJson: true })
      if (!r.ok || !Array.isArray(r.data)) {
        log.error(`[pitstop/ranking] leitura status=${r.status} erro=${r.error}`)
        return upstreamFail(res, r)
      }
      const ranking = r.data.map((x) => ({ nome: x.nome, pontos: x.pontos }))
      return send(res, 200, { ok: true, posto, jogo, ranking }, { 'Cache-Control': 's-maxage=30, stale-while-revalidate=60' })
    }

    const parsed = readJson(req)
    if (parsed.error) return fail(res, parsed.status, parsed.error)
    const v = parsePartida(parsed.body, now())
    if (!v.ok) return fail(res, 400, 'invalido', { campo: v.campo, mensagem: v.mensagem })
    const p = v.partida
    if (!sb) return fail(res, 503, 'nao_configurado', {}, { 'Retry-After': '300' })

    // Limite simples de abuso: partidas recebidas do mesmo lead nos últimos 10 min.
    const desde = new Date(now() - JANELA_MS).toISOString()
    const q = new URLSearchParams({ select: 'partida_id', lead_id: `eq.${p.leadId}`, recebido_em: `gte.${desde}`, limit: '1' })
    const c = await fetchWithTimeout(
      `${sb.url}/rest/v1/pitstop_partidas?${q}`,
      { headers: { ...sb.headers, Prefer: 'count=exact' } },
      { fetchImpl, timeout },
    )
    if (!c.ok) return upstreamFail(res, c)
    const total = Number(String(c.headers?.get?.('content-range') || '').split('/')[1])
    if (Number.isFinite(total) && total >= LIMITE_POR_JOGADOR)
      return fail(res, 429, 'limite', { retryable: true }, { 'Retry-After': '600' })

    const w = await fetchWithTimeout(
      `${sb.url}/rest/v1/pitstop_partidas?on_conflict=partida_id`,
      {
        method: 'POST',
        headers: { ...sb.headers, Prefer: 'resolution=ignore-duplicates,return=minimal' },
        body: JSON.stringify({
          partida_id: p.partidaId,
          lead_id: p.leadId,
          nome: p.nome,
          posto: p.posto,
          jogo: p.jogo,
          pontos: p.pontos,
          duracao: p.duracao,
          jogada_em: p.jogadaEm,
        }),
      },
      { fetchImpl, timeout },
    )
    if (!w.ok) {
      log.error(`[pitstop/ranking] gravação status=${w.status} erro=${w.error} partida=${p.partidaId}`)
      return upstreamFail(res, w)
    }
    return send(res, 200, { ok: true, partidaId: p.partidaId })
  }
}

export default createRankingHandler()
