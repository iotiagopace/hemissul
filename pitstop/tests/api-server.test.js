import { describe, expect, it, vi } from 'vitest'
import { createLeadHandler } from '../api/lead.js'
import { createRankingHandler, LIMITE_POR_JOGADOR, startOfDayBoaVista } from '../api/ranking.js'

const ID = '4f9c2b1e-8d3a-4c5b-9e7f-1a2b3c4d5e6f'
const LEAD_ID = '0b7c9d2e-1f3a-4b5c-8d6e-7f8091a2b3c4'
const LEAD = { id: ID, revisao: 1760000000000, nome: 'Ana Teste', telefone: '(95) 9 9000-0001', aceite: true, posto: '01' }

function mockRes() {
  return {
    statusCode: 0,
    headers: {},
    body: undefined,
    setHeader(k, v) {
      this.headers[k.toLowerCase()] = v
    },
    status(c) {
      this.statusCode = c
      return this
    },
    json(b) {
      this.body = b
      return this
    },
  }
}

const req = (method, body, headers = { 'content-type': 'application/json' }, query) => ({ method, body, headers, query })

function response(status, body = '', headers = {}) {
  if (status === 204) return new Response(null, { status, headers })
  return new Response(typeof body === 'string' ? body : JSON.stringify(body), { status, headers })
}

const silent = { warn: vi.fn(), error: vi.fn() }

async function call(handler, r) {
  const res = mockRes()
  await handler(r, res)
  return res
}

describe('api/lead', () => {
  const env = { SUPABASE_URL: 'https://x.supabase.test/', SUPABASE_SERVICE_ROLE_KEY: 'k' }
  const RPC = 'https://x.supabase.test/rest/v1/rpc/pitstop_upsert_lead'

  it('só aceita POST com JSON', async () => {
    const h = createLeadHandler({ env, log: silent })
    expect((await call(h, req('GET'))).statusCode).toBe(405)
    const r415 = await call(h, req('POST', LEAD, { 'content-type': 'text/plain' }))
    expect(r415.statusCode).toBe(415)
    expect(r415.body).toMatchObject({ ok: false, retryable: false })
  })

  it('JSON quebrado vira 400, sem estourar', async () => {
    const h = createLeadHandler({ env, log: silent })
    const broken = { method: 'POST', headers: { 'content-type': 'application/json' }, get body() { throw new SyntaxError('x') } }
    const res = await call(h, broken)
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe('json_invalido')
    expect(res.headers['content-type']).toMatch(/application\/json/)
  })

  it('validação devolve o campo sem ecoar dados pessoais', async () => {
    const h = createLeadHandler({ env, log: silent })
    const res = await call(h, req('POST', { ...LEAD, telefone: '123' }))
    expect(res.statusCode).toBe(400)
    expect(res.body).toMatchObject({ ok: false, error: 'invalido', campo: 'telefone', retryable: false })
    expect(JSON.stringify(res.body)).not.toMatch(/Ana|123/)
  })

  it('sem banco configurado não confirma o lead', async () => {
    const fetchImpl = vi.fn()
    const res = await call(createLeadHandler({ env: {}, fetchImpl, log: silent }), req('POST', LEAD))
    expect(res.statusCode).toBe(503)
    expect(res.body).toMatchObject({ ok: false, error: 'nao_configurado', retryable: true })
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('variáveis antigas de CRM não geram envio externo nem substituem o banco', async () => {
    const fetchImpl = vi.fn(async () => response(204))
    const old = { LEAD_WEBHOOK_URL: 'https://crm.test/hook', LEAD_WEBHOOK_TOKEN: 't', LEAD_SUPABASE: '1' }
    const semBanco = await call(createLeadHandler({ env: old, fetchImpl, log: silent }), req('POST', LEAD))
    expect(semBanco.statusCode).toBe(503)
    await call(createLeadHandler({ env: { ...old, ...env }, fetchImpl, log: silent }), req('POST', LEAD))
    expect(fetchImpl.mock.calls.map(([url]) => url)).toEqual([RPC])
  })

  it('confirma só depois do banco gravar', async () => {
    const fetchImpl = vi.fn(async () => response(204))
    const res = await call(createLeadHandler({ env, fetchImpl, log: silent }), req('POST', { ...LEAD, extra: 'ignorado' }))
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ ok: true, id: ID, revisao: LEAD.revisao })
    const [url, init] = fetchImpl.mock.calls[0]
    expect(url).toBe(RPC)
    expect(init.headers.Authorization).toBe('Bearer k')
    const { p } = JSON.parse(init.body)
    expect(p).toMatchObject({ id: ID, revisao: LEAD.revisao, telefone: '95990000001', origem: 'pitstop', aceite_lgpd: true, proposta_solicitada_em: null })
    expect(p).not.toHaveProperty('extra')
  })

  it('interesse em proposta só vai quando a interface envia a ação explícita', async () => {
    const fetchImpl = vi.fn(async () => response(204))
    const h = createLeadHandler({ env, fetchImpl, log: silent })
    await call(h, req('POST', { ...LEAD, app: true, atividade: 'Atividade principal', protecao: 'Não sei' }))
    await call(h, req('POST', { ...LEAD, propostaSolicitadaEm: '2026-10-01T14:10:00-04:00' }))
    const [a, b] = fetchImpl.mock.calls.map(([, init]) => JSON.parse(init.body).p.proposta_solicitada_em)
    expect(a).toBeNull()
    expect(b).toBe('2026-10-01T18:10:00.000Z')
  })

  it('repetir a mesma requisição manda o mesmo upsert (mesmo id e revisão)', async () => {
    const fetchImpl = vi.fn(async () => response(204))
    const h = createLeadHandler({ env, fetchImpl, log: silent })
    await call(h, req('POST', LEAD))
    await call(h, req('POST', LEAD))
    const [a, b] = fetchImpl.mock.calls.map(([, init]) => JSON.parse(init.body).p)
    expect(a).toEqual(b)
  })

  it('timeout, 5xx e rede viram 503 para tentar de novo', async () => {
    const hang = (url, init) =>
      new Promise((_, reject) => init.signal.addEventListener('abort', () => reject(Object.assign(new Error('a'), { name: 'AbortError' }))))
    for (const fetchImpl of [hang, async () => response(500, 'erro'), async () => { throw new TypeError('fetch failed') }]) {
      const res = await call(createLeadHandler({ env, fetchImpl, log: silent, timeout: 20 }), req('POST', LEAD))
      expect(res.statusCode).toBe(503)
      expect(res.body).toMatchObject({ ok: false, error: 'indisponivel', retryable: true })
      expect(res.headers['retry-after']).toBeTruthy()
    }
  })

  it('banco que recusa (4xx) não confirma e continua reenviável', async () => {
    const res = await call(createLeadHandler({ env, fetchImpl: async () => response(401, 'no'), log: silent }), req('POST', LEAD))
    expect(res.statusCode).toBe(502)
    expect(res.body).toMatchObject({ ok: false, error: 'destino_recusou', retryable: true })
  })

  it('logs não levam nome nem telefone', async () => {
    const log = { warn: vi.fn(), error: vi.fn() }
    await call(createLeadHandler({ env, fetchImpl: async () => response(500), log }), req('POST', LEAD))
    const text = JSON.stringify([...log.error.mock.calls, ...log.warn.mock.calls])
    expect(text).not.toMatch(/Ana|9900|99000/)
  })
})

describe('api/ranking', () => {
  const env = { SUPABASE_URL: 'https://x.supabase.test', SUPABASE_SERVICE_ROLE_KEY: 'k' }
  const agora = Date.parse('2026-10-01T15:00:00Z')
  const PARTIDA = { partidaId: ID, leadId: LEAD_ID, nome: 'Carlos Souza', posto: '01', jogo: 'blocos', pontos: 900, jogadaEm: '2026-10-01T14:58:00Z' }
  const count = (n) => response(200, '[]', { 'content-range': n ? `0-0/${n}` : '*/0' })

  it('sem Supabase: GET e POST respondem 503 em JSON', async () => {
    const h = createRankingHandler({ env: {}, now: () => agora, log: silent })
    const g = await call(h, req('GET', undefined, {}, { posto: '01', jogo: 'corrida' }))
    expect(g.statusCode).toBe(503)
    expect(g.body).toMatchObject({ ok: false, error: 'nao_configurado' })
    const p = await call(h, req('POST', PARTIDA))
    expect(p.statusCode).toBe(503)
  })

  it('GET valida posto e jogo e lê o dia de Boa Vista', async () => {
    const fetchImpl = vi.fn(async () => response(200, [{ nome: 'Carlos', pontos: 900 }]))
    const h = createRankingHandler({ env, fetchImpl, now: () => agora, log: silent })
    expect((await call(h, req('GET', undefined, {}, { posto: '01', jogo: 'xadrez' }))).statusCode).toBe(400)
    expect((await call(h, req('GET', undefined, {}, { posto: '../x', jogo: 'corrida' }))).statusCode).toBe(400)
    const res = await call(h, req('GET', undefined, {}, { posto: '01', jogo: 'corrida' }))
    expect(res.body).toEqual({ ok: true, posto: '01', jogo: 'corrida', ranking: [{ nome: 'Carlos', pontos: 900 }] })
    const url = new URL(fetchImpl.mock.calls[0][0])
    expect(url.searchParams.get('posto')).toBe('eq.01')
    expect(url.searchParams.get('jogada_em')).toBe(`gte.${startOfDayBoaVista(agora)}`)
    expect(startOfDayBoaVista(Date.parse('2026-10-01T03:00:00Z'))).toBe('2026-09-30T04:00:00.000Z')
  })

  it('GET com resposta que não é JSON não vira ranking vazio', async () => {
    const h = createRankingHandler({ env, fetchImpl: async () => response(200, '<html>'), now: () => agora, log: silent })
    const res = await call(h, req('GET', undefined, {}, { posto: '01', jogo: 'corrida' }))
    expect(res.statusCode).toBe(502)
    expect(res.body.ok).toBe(false)
  })

  it('POST grava com partida_id único e ignora repetição', async () => {
    const fetchImpl = vi.fn(async (url, init) => (init.method === 'POST' ? response(201) : count(0)))
    const h = createRankingHandler({ env, fetchImpl, now: () => agora, log: silent })
    const a = await call(h, req('POST', PARTIDA))
    const b = await call(h, req('POST', PARTIDA))
    expect(a.statusCode).toBe(200)
    expect(b.body).toEqual(a.body)
    const writes = fetchImpl.mock.calls.filter(([, init]) => init.method === 'POST')
    expect(writes[0][0]).toContain('on_conflict=partida_id')
    expect(writes[0][1].headers.Prefer).toContain('ignore-duplicates')
    const row = JSON.parse(writes[0][1].body)
    expect(row).toMatchObject({ partida_id: ID, nome: 'Carlos', jogada_em: '2026-10-01T14:58:00.000Z' })
  })

  it('POST barra pontuação impossível e partida antiga', async () => {
    const h = createRankingHandler({ env, fetchImpl: vi.fn(), now: () => agora, log: silent })
    expect((await call(h, req('POST', { ...PARTIDA, jogo: 'cruzadas', pontos: 5000 }))).body.campo).toBe('pontos')
    expect((await call(h, req('POST', { ...PARTIDA, jogadaEm: '2026-09-20T00:00:00Z' }))).body.campo).toBe('jogadaEm')
  })

  it('POST limita partidas por jogador', async () => {
    const fetchImpl = vi.fn(async () => count(LIMITE_POR_JOGADOR))
    const res = await call(createRankingHandler({ env, fetchImpl, now: () => agora, log: silent }), req('POST', PARTIDA))
    expect(res.statusCode).toBe(429)
    expect(res.body).toMatchObject({ error: 'limite', retryable: true })
    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })

  it('POST com banco fora do ar responde 503', async () => {
    const fetchImpl = vi.fn(async (url, init) => (init.method === 'POST' ? response(500) : count(0)))
    const res = await call(createRankingHandler({ env, fetchImpl, now: () => agora, log: silent }), req('POST', PARTIDA))
    expect(res.statusCode).toBe(503)
    expect(res.body.retryable).toBe(true)
  })
})
