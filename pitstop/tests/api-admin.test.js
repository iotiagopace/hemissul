import { describe, expect, it, vi } from 'vitest'
import { celula, createAdminLeadsHandler, dataBoaVista, inicioDoDia, parseFiltros, toCsv } from '../api/admin/leads.js'

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.sintetico.assinatura'
const env = {
  SUPABASE_URL: 'https://x.supabase.test',
  SUPABASE_SERVICE_ROLE_KEY: 'service',
  SUPABASE_ANON_KEY: 'anon',
  PITSTOP_ADMIN_EMAILS: 'Comercial@Hemissul.test, outra@hemissul.test',
}
const LINHA = {
  id: '4f9c2b1e-8d3a-4c5b-9e7f-1a2b3c4d5e6f',
  recebido_em: '2026-10-01T18:10:00+00:00',
  criado_em: '2026-10-01T18:09:30+00:00',
  atualizado_em: '2026-10-01T18:12:00+00:00',
  nome: 'Joana Ávila Conceição',
  telefone: '95990000001',
  posto: '01',
  origem: 'pitstop',
  roda_por_aplicativo: true,
  atividade: 'Atividade principal',
  protecao_cobre_app: 'Não sei',
  proposta_solicitada_em: null,
  jogos: ['corrida', 'blocos'],
  partidas: 3,
  visitas: 1,
  aceite_lgpd: true,
  aceite_em: '2026-10-01T18:09:30+00:00',
}

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
    send(b) {
      this.body = b
      return this
    },
  }
}
const json = (status, body, headers = {}) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } })
const silent = { info: vi.fn(), warn: vi.fn(), error: vi.fn() }

function supabase({ user = { id: 'u1', email: 'comercial@hemissul.test', email_confirmed_at: '2026-09-01T00:00:00Z' }, rows = [LINHA], total = rows.length, authStatus = 200 } = {}) {
  return vi.fn(async (url, init) => {
    if (url.endsWith('/auth/v1/user')) return authStatus === 200 ? json(200, user) : json(authStatus, { msg: 'invalid' })
    const [from, to] = init.headers.Range.split('-').map(Number)
    const page = rows.slice(from, to + 1)
    return json(200, page, { 'content-range': `${from}-${from + page.length - 1}/${total}` })
  })
}

async function call(h, { query = {}, auth = `Bearer ${TOKEN}`, method = 'GET' } = {}) {
  const res = mockRes()
  await h({ method, query, headers: auth ? { authorization: auth } : {} }, res)
  return res
}

describe('acesso restrito', () => {
  it('sem token: 401, sem consultar o banco', async () => {
    const fetchImpl = supabase()
    const res = await call(createAdminLeadsHandler({ env, fetchImpl, log: silent }), { auth: null })
    expect(res.statusCode).toBe(401)
    expect(res.body).toMatchObject({ ok: false, error: 'nao_autenticado' })
    expect(res.headers['cache-control']).toContain('no-store')
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('token só no cabeçalho: token na URL não autentica', async () => {
    const fetchImpl = supabase()
    const res = await call(createAdminLeadsHandler({ env, fetchImpl, log: silent }), { auth: null, query: { token: TOKEN, access_token: TOKEN } })
    expect(res.statusCode).toBe(401)
  })

  it('sem lista de pessoas autorizadas: ninguém acessa', async () => {
    const fetchImpl = supabase()
    const res = await call(createAdminLeadsHandler({ env: { ...env, PITSTOP_ADMIN_EMAILS: '' }, fetchImpl, log: silent }))
    expect(res.statusCode).toBe(403)
    expect(res.body.error).toBe('acesso_nao_configurado')
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('sessão inválida: 401', async () => {
    const res = await call(createAdminLeadsHandler({ env, fetchImpl: supabase({ authStatus: 401 }), log: silent }))
    expect(res.statusCode).toBe(401)
    expect(res.body.error).toBe('sessao_invalida')
  })

  it('e-mail fora da lista ou não confirmado: sem dados', async () => {
    const fora = await call(createAdminLeadsHandler({ env, fetchImpl: supabase({ user: { id: 'u2', email: 'x@y.test', email_confirmed_at: 'x' } }), log: silent }))
    expect(fora.statusCode).toBe(403)
    expect(JSON.stringify(fora.body)).not.toContain('Joana')
    const naoConfirmado = await call(createAdminLeadsHandler({ env, fetchImpl: supabase({ user: { id: 'u3', email: 'comercial@hemissul.test' } }), log: silent }))
    expect(naoConfirmado.statusCode).toBe(401)
  })

  it('sem banco configurado: 503', async () => {
    const res = await call(createAdminLeadsHandler({ env: { PITSTOP_ADMIN_EMAILS: 'a@b.test' }, fetchImpl: vi.fn(), log: silent }))
    expect(res.statusCode).toBe(503)
  })

  it('só GET', async () => {
    const res = await call(createAdminLeadsHandler({ env, fetchImpl: supabase(), log: silent }), { method: 'POST' })
    expect(res.statusCode).toBe(405)
  })
})

describe('consulta', () => {
  it('lista paginada com perfil e total', async () => {
    const rows = Array.from({ length: 7 }, (_, i) => ({ ...LINHA, id: `${i}` }))
    const fetchImpl = supabase({ rows })
    const res = await call(createAdminLeadsHandler({ env, fetchImpl, log: silent }), { query: { pagina: '2', por_pagina: '3' } })
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ ok: true, pagina: 2, por_pagina: 3, total: 7 })
    expect(res.body.leads.map((x) => x.id)).toEqual(['3', '4', '5'])
    expect(res.body.leads[0].perfil).toBe('integral')
    expect(res.body.fuso).toContain('UTC-4')
    const [, init] = fetchImpl.mock.calls.find(([url]) => url.includes('pitstop_leads'))
    expect(init.headers.Range).toBe('3-5')
    expect(init.headers.Authorization).toBe('Bearer service')
  })

  it('filtros de período (Boa Vista), posto e perfil viram filtros do banco', async () => {
    const fetchImpl = supabase()
    await call(createAdminLeadsHandler({ env, fetchImpl, log: silent }), { query: { de: '2026-10-01', ate: '2026-10-01', posto: '01', perfil: 'complementar' } })
    const url = new URL(fetchImpl.mock.calls.find(([u]) => u.includes('pitstop_leads'))[0])
    expect(url.searchParams.getAll('recebido_em')).toEqual(['gte.2026-10-01T04:00:00.000Z', 'lt.2026-10-02T04:00:00.000Z'])
    expect(url.searchParams.get('posto')).toBe('eq.01')
    expect(url.searchParams.get('roda_por_aplicativo')).toBe('is.true')
    expect(url.searchParams.get('atividade')).toBe('eq.Renda complementar')
  })

  it('filtro inválido: 400 com o campo', async () => {
    for (const [query, campo] of [
      [{ de: '2026-02-30' }, 'de'],
      [{ posto: '../x' }, 'posto'],
      [{ perfil: 'vip' }, 'perfil'],
      [{ por_pagina: '500' }, 'por_pagina'],
      [{ formato: 'xls' }, 'formato'],
    ]) {
      const res = await call(createAdminLeadsHandler({ env, fetchImpl: supabase(), log: silent }), { query })
      expect(res.statusCode).toBe(400)
      expect(res.body.campo).toBe(campo)
    }
  })

  it('banco fora do ar: 503 sem dados', async () => {
    const fetchImpl = vi.fn(async (url) => (url.endsWith('/auth/v1/user') ? json(200, { id: 'u1', email: 'comercial@hemissul.test', email_confirmed_at: 'x' }) : json(500, {})))
    const res = await call(createAdminLeadsHandler({ env, fetchImpl, log: silent }))
    expect(res.statusCode).toBe(503)
  })

  it('logs registram o acesso sem nome, telefone nem e-mail', async () => {
    const log = { info: vi.fn(), warn: vi.fn(), error: vi.fn() }
    await call(createAdminLeadsHandler({ env, fetchImpl: supabase(), log }))
    const text = JSON.stringify(log.info.mock.calls)
    expect(text).toContain('usuario=u1')
    expect(text).not.toMatch(/Joana|9900|comercial@/)
  })
})

describe('exportação CSV', () => {
  it('UTF-8 com BOM, cabeçalho em português, acentos e datas de Boa Vista', async () => {
    const fetchImpl = supabase()
    const res = await call(createAdminLeadsHandler({ env, fetchImpl, log: silent, now: () => Date.parse('2026-10-02T02:00:00Z') }), { query: { formato: 'csv' } })
    expect(res.statusCode).toBe(200)
    expect(res.headers['content-type']).toBe('text/csv; charset=utf-8')
    expect(res.headers['content-disposition']).toBe('attachment; filename="pitstop-leads-20261001.csv"')
    expect(res.headers['cache-control']).toContain('no-store')
    const csv = res.body
    expect(csv.charCodeAt(0)).toBe(0xfeff)
    const [head, linha] = csv.slice(1).split('\r\n')
    expect(head).toContain('"Recebido em (horário de Boa Vista)"')
    expect(head).toContain('"Proteção atual cobre aplicativo"')
    expect(linha).toContain('"Joana Ávila Conceição"')
    expect(linha).toContain('"(95) 99000-0001"')
    expect(linha).toContain('"2026-10-01 14:10:00"')
    expect(linha).toContain('"Aplicativo (atividade principal)"')
    expect(linha).toContain('"Não sei"')
    expect(Buffer.from(csv, 'utf8').toString('utf8')).toBe(csv)
  })

  it('neutraliza fórmulas e aspas', () => {
    expect(celula('=HYPERLINK("http://x")')).toBe(`"'=HYPERLINK(""http://x"")"`)
    for (const v of ['+1', '-2', '@SOMA(A1)', '\tx', '\rx']) expect(celula(v).startsWith(`"'`)).toBe(true)
    expect(celula('Ana')).toBe('"Ana"')
    expect(celula(null)).toBe('""')
    const csv = toCsv([{ ...LINHA, nome: '=cmd|"/c calc"!A1', posto: '01' }])
    expect(csv).toContain(`"'=cmd|""/c calc""!A1"`)
  })

  it('percorre todas as páginas do banco', async () => {
    const rows = Array.from({ length: 2500 }, (_, i) => ({ ...LINHA, id: `${i}` }))
    const fetchImpl = supabase({ rows })
    const res = await call(createAdminLeadsHandler({ env, fetchImpl, log: silent }), { query: { formato: 'csv' } })
    expect(res.body.trim().split('\r\n')).toHaveLength(2501)
    expect(fetchImpl.mock.calls.filter(([u]) => u.includes('pitstop_leads'))).toHaveLength(3)
  })
})

describe('datas', () => {
  it('dia de Boa Vista e formatação', () => {
    expect(inicioDoDia('2026-10-01')).toBe('2026-10-01T04:00:00.000Z')
    expect(inicioDoDia('2026-13-01')).toBeNull()
    expect(dataBoaVista('2026-10-01T03:59:00Z')).toBe('2026-09-30 23:59:00')
    expect(dataBoaVista(null)).toBe('')
    expect(parseFiltros({}).porPagina).toBe(50)
  })
})
