import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const ID = '4f9c2b1e-8d3a-4c5b-9e7f-1a2b3c4d5e6f'
const LEAD = { id: ID, nome: 'Ana Teste', telefone: '(95) 9 9000-0001', aceite: true, app: null, posto: '01', criadoEm: '2026-10-01T14:00:00Z' }
const P = 'pitstop-hemissul.'

function memoryStorage() {
  const m = new Map()
  return {
    broken: false,
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem(k, v) {
      if (this.broken) throw new Error('QuotaExceededError')
      m.set(k, String(v))
    },
    removeItem: (k) => m.delete(k),
  }
}

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
const ok = () => json(200, { ok: true })
const queue = (name) => JSON.parse(localStorage.getItem(P + name) || '[]')

let api
beforeEach(async () => {
  vi.resetModules()
  globalThis.localStorage = memoryStorage()
  globalThis.fetch = vi.fn(async () => ok())
  api = await import('../src/core/api.js')
})
afterEach(() => {
  delete globalThis.localStorage
  delete globalThis.fetch
})

describe('fila de envio', () => {
  it('confirma o lead e esvazia a fila', async () => {
    const r = await api.sendLead(LEAD, { partidas: 1 })
    expect(r).toEqual({ status: 'enviado', salvo: true })
    expect(queue('lead-queue')).toEqual([])
    const body = JSON.parse(fetch.mock.calls[0][1].body)
    expect(body.telefone).toBe('95990000001')
    expect(Number.isInteger(body.revisao)).toBe(true)
  })

  it('servidor sem configuração (503) mantém o lead na fila', async () => {
    fetch.mockResolvedValue(json(503, { ok: false, error: 'nao_configurado', retryable: true }))
    const r = await api.sendLead(LEAD)
    expect(r.status).toBe('na_fila')
    expect(queue('lead-queue')).toHaveLength(1)
    expect(queue('lead-queue')[0].tentativas).toBe(1)
  })

  it('HTML com status 200 não conta como envio', async () => {
    fetch.mockResolvedValue(new Response('<!doctype html><html>', { status: 200, headers: { 'content-type': 'text/html' } }))
    expect((await api.sendLead(LEAD)).status).toBe('na_fila')
    fetch.mockResolvedValue(json(200, { recebido: true }))
    expect((await api.flushQueue({ force: true })).leads).toBe(1)
  })

  it('offline e reconexão: reenvia e só então libera', async () => {
    fetch.mockRejectedValue(new TypeError('Failed to fetch'))
    expect((await api.sendLead(LEAD)).status).toBe('na_fila')
    // Antes do prazo da próxima tentativa, sem force, não reenvia.
    await api.flushQueue()
    expect(fetch).toHaveBeenCalledTimes(1)
    fetch.mockResolvedValue(ok())
    const status = await api.flushLeadQueue()
    expect(status.leads).toBe(0)
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('reabertura: a fila gravada é enviada pelo módulo novo', async () => {
    fetch.mockRejectedValue(new TypeError('offline'))
    await api.sendLead(LEAD)
    vi.resetModules()
    globalThis.fetch = vi.fn(async () => ok())
    const reaberto = await import('../src/core/api.js')
    expect((await reaberto.flushLeadQueue()).leads).toBe(0)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('erro de validação sai da fila e fica registrado, não some', async () => {
    fetch.mockResolvedValue(json(400, { ok: false, error: 'invalido', campo: 'telefone', retryable: false }))
    const r = await api.sendLead(LEAD)
    expect(r).toMatchObject({ status: 'recusado', campo: 'telefone' })
    expect(queue('lead-queue')).toEqual([])
    expect(queue('envios-recusados')).toHaveLength(1)
    expect(api.queueStatus().recusados).toBe(1)
  })

  it('atualizações do mesmo lead ocupam um item só, com revisão crescente', async () => {
    fetch.mockRejectedValue(new TypeError('offline'))
    await api.sendLead(LEAD)
    await api.sendLead({ ...LEAD, app: true })
    const items = queue('lead-queue')
    expect(items).toHaveLength(1)
    expect(items[0].body.app).toBe(true)
    const [first, second] = fetch.mock.calls.map(([, init]) => JSON.parse(init.body).revisao)
    expect(second).toBeGreaterThan(first)
  })

  it('versão nova durante um envio não é apagada quando o envio antigo confirma', async () => {
    let release
    fetch.mockImplementationOnce(() => new Promise((r) => (release = r)))
    const a = api.sendLead(LEAD)
    await vi.waitFor(() => expect(release).toBeTypeOf('function'))
    const b = api.sendLead({ ...LEAD, app: false })
    release(ok())
    await Promise.all([a, b])
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(JSON.parse(fetch.mock.calls[1][1].body).app).toBe(false)
    expect(queue('lead-queue')).toEqual([])
  })

  it('envios simultâneos não mandam o mesmo item duas vezes', async () => {
    fetch.mockRejectedValueOnce(new TypeError('offline'))
    await api.sendLead(LEAD)
    fetch.mockClear()
    fetch.mockResolvedValue(ok())
    await Promise.all([api.flushLeadQueue(), api.flushLeadQueue(), api.flushLeadQueue()])
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('armazenamento bloqueado: avisa salvo=false e mantém na memória', async () => {
    localStorage.broken = true
    fetch.mockRejectedValue(new TypeError('offline'))
    const r = await api.sendLead(LEAD)
    expect(r).toEqual({ status: 'na_fila', salvo: false })
    expect(api.queueStatus()).toMatchObject({ leads: 1, salvo: false })
    fetch.mockResolvedValue(ok())
    expect((await api.flushLeadQueue()).leads).toBe(0)
  })

  it('partida do ranking fica na fila até confirmar e leva partidaId', async () => {
    fetch.mockResolvedValue(json(503, { ok: false, error: 'nao_configurado', retryable: true }))
    const r = await api.sendScore({ leadId: ID, nome: 'Ana', posto: '01', jogo: 'corrida', pontos: 500 })
    expect(r.status).toBe('na_fila')
    const [item] = queue('score-queue')
    expect(item.body).toMatchObject({ partidaId: r.partidaId, jogo: 'corrida', pontos: 500 })
    expect(item.body.jogadaEm).toBeTruthy()
    fetch.mockResolvedValue(ok())
    await api.flushLeadQueue()
    expect(queue('score-queue')).toEqual([])
    const ids = fetch.mock.calls.map(([, init]) => JSON.parse(init.body).partidaId)
    expect(new Set(ids).size).toBe(1)
  })

  it('cadastro vai antes das partidas', async () => {
    fetch.mockRejectedValue(new TypeError('offline'))
    await api.sendLead(LEAD)
    await api.sendScore({ leadId: ID, nome: 'Ana', posto: '01', jogo: 'corrida', pontos: 500 })
    fetch.mockClear()
    fetch.mockResolvedValue(ok())
    await api.flushLeadQueue()
    expect(fetch.mock.calls.map(([url]) => url)).toEqual(['/api/lead', '/api/ranking'])
  })

  it('fila no formato antigo é convertida', async () => {
    localStorage.setItem(P + 'lead-queue', JSON.stringify([{ ...LEAD, enviadoEm: '2026-10-01T14:05:00Z' }, { ...LEAD, app: true, enviadoEm: '2026-10-01T14:06:00Z' }]))
    vi.resetModules()
    globalThis.window = { addEventListener: () => {} }
    globalThis.document = { addEventListener: () => {} }
    try {
      const novo = await import('../src/core/api.js')
      const items = queue('lead-queue')
      expect(items).toHaveLength(1)
      expect(items[0].body.app).toBe(true)
      expect(items[0].body.revisao).toBe(Date.parse('2026-10-01T14:06:00Z'))
      expect((await novo.flushLeadQueue()).leads).toBe(0)
    } finally {
      delete globalThis.window
      delete globalThis.document
    }
  })

  it('ranking indisponível ou em HTML devolve null', async () => {
    fetch.mockResolvedValue(new Response('<html>', { status: 200, headers: { 'content-type': 'text/html' } }))
    expect(await api.fetchRanking('01', 'corrida')).toBeNull()
    fetch.mockResolvedValue(json(503, { ok: false }))
    expect(await api.fetchRanking('01', 'corrida')).toBeNull()
    fetch.mockResolvedValue(json(200, { ok: true, ranking: [{ nome: 'Ana', pontos: 1 }] }))
    expect(await api.fetchRanking('01', 'corrida')).toEqual([{ nome: 'Ana', pontos: 1 }])
  })
})

describe('respostas ambíguas', () => {
  it('404 em JSON sem retryable (rota ausente) não descarta o item', async () => {
    const { postJson } = await import('../src/core/api.js')
    const r = await postJson('/x', {}, { fetchImpl: async () => json(404, { error: 'NOT_FOUND' }) })
    expect(r).toMatchObject({ ok: false, retryable: true })
  })
})

describe('resultado por versão', () => {
  beforeEach(async () => {
    vi.resetModules()
    globalThis.localStorage = memoryStorage()
    globalThis.fetch = vi.fn(async () => ok())
    api = await import('../src/core/api.js')
  })

  it('recusa antiga do mesmo lead não contamina um envio posterior aceito', async () => {
    fetch.mockResolvedValueOnce(json(400, { ok: false, error: 'invalido', campo: 'posto', retryable: false }))
    expect((await api.sendLead(LEAD)).status).toBe('recusado')
    fetch.mockResolvedValue(ok())
    expect((await api.sendLead({ ...LEAD, app: true })).status).toBe('enviado')
    // A recusa continua registrada para a versão antiga.
    expect(api.queueStatus().recusados).toBe(1)
  })

  it('recusa com localStorage bloqueado continua "recusado", nunca "enviado"', async () => {
    localStorage.broken = true
    fetch.mockResolvedValue(json(400, { ok: false, error: 'invalido', campo: 'telefone', retryable: false }))
    const r = await api.sendLead(LEAD)
    expect(r).toMatchObject({ status: 'recusado', salvo: false, campo: 'telefone' })
    expect(api.queueStatus()).toMatchObject({ leads: 0, recusados: 1, salvo: false })
  })

  it('partida recusada com localStorage bloqueado também fica "recusado"', async () => {
    localStorage.broken = true
    fetch.mockResolvedValue(json(400, { ok: false, error: 'invalido', campo: 'pontos', retryable: false }))
    const r = await api.sendScore({ leadId: ID, nome: 'Ana', posto: '01', jogo: 'sudoku', pontos: 9999 })
    expect(r.status).toBe('recusado')
  })

  it('subscribeQueue avisa confirmação, espera e recusa, e pode ser cancelada', async () => {
    const eventos = []
    const off = api.subscribeQueue((s) => eventos.push({ ...s.evento, leads: s.leads }))
    fetch.mockRejectedValueOnce(new TypeError('offline'))
    await api.sendLead(LEAD)
    await Promise.resolve()
    fetch.mockResolvedValue(ok())
    await api.flushLeadQueue()
    expect(eventos.map((e) => e.status)).toEqual(['na_fila', 'enviado'])
    expect(eventos[1]).toMatchObject({ tipo: 'lead', id: ID })
    off()
    await api.sendLead({ ...LEAD, app: true })
    expect(eventos).toHaveLength(2)
  })

  it('contrato mantido: formatos de sendLead, sendScore e queueStatus', async () => {
    expect(await api.sendLead(LEAD)).toEqual({ status: 'enviado', salvo: true })
    const s = await api.sendScore({ leadId: ID, nome: 'Ana', posto: '01', jogo: 'corrida', pontos: 10, duracao: 12 })
    expect(Object.keys(s).sort()).toEqual(['partidaId', 'salvo', 'status'])
    expect(JSON.parse(fetch.mock.calls[1][1].body).duracao).toBe(12)
    expect(Object.keys(api.queueStatus()).sort()).toEqual(['leads', 'partidas', 'recusados', 'salvo'])
  })
})
