/**
 * Vercel Function: consulta e exportação dos leads para o time da Hemissul.
 * Rota publicada: GET /pitstop/api/admin/leads
 * Contrato completo em docs/BACKEND.md ("Acesso do time").
 *
 * Fechado por padrão. Só responde dados quando:
 * 1. o pedido traz `Authorization: Bearer <token>` de uma sessão do Supabase
 *    Auth (nunca token na URL);
 * 2. o Supabase confirma o token (GET /auth/v1/user) e o e-mail está
 *    confirmado;
 * 3. o e-mail está em PITSTOP_ADMIN_EMAILS.
 * Sem PITSTOP_ADMIN_EMAILS configurado, ninguém tem acesso.
 *
 * Parâmetros: de, ate (AAAA-MM-DD, dia de Boa Vista, UTC-4), posto,
 * perfil (integral | complementar | proprietario | sem_perfil),
 * pagina (1..), por_pagina (1..100), formato=csv.
 */
import { isPosto } from '../../src/core/validation.js'
import { fail, fetchWithTimeout, isTemporary, send, supabaseConfig } from '../_lib/http.js'

export const FUSO = 'America/Boa_Vista (UTC-4, sem horário de verão)'
const OFFSET_MS = 4 * 3600 * 1000
export const MAX_CSV = 50000
const PAGINA_CSV = 1000
const PRIVADO = { 'Cache-Control': 'no-store, private', 'X-Robots-Tag': 'noindex' }

const COLUNAS = [
  'id',
  'recebido_em',
  'criado_em',
  'atualizado_em',
  'nome',
  'telefone',
  'posto',
  'origem',
  'roda_por_aplicativo',
  'atividade',
  'protecao_cobre_app',
  'proposta_solicitada_em',
  'jogos',
  'partidas',
  'visitas',
  'aceite_lgpd',
  'aceite_em',
]

const PERFIS = {
  integral: [['roda_por_aplicativo', 'is.true'], ['atividade', 'eq.Atividade principal']],
  complementar: [['roda_por_aplicativo', 'is.true'], ['atividade', 'eq.Renda complementar']],
  proprietario: [['roda_por_aplicativo', 'is.false']],
  sem_perfil: [['roda_por_aplicativo', 'is.null']],
}

export const perfilDe = (row) =>
  row.roda_por_aplicativo == null
    ? 'sem_perfil'
    : !row.roda_por_aplicativo
      ? 'proprietario'
      : row.atividade === 'Renda complementar'
        ? 'complementar'
        : row.atividade === 'Atividade principal'
          ? 'integral'
          : 'sem_perfil'

const PERFIL_ROTULO = {
  integral: 'Aplicativo (atividade principal)',
  complementar: 'Aplicativo (renda complementar)',
  proprietario: 'Não roda por aplicativo',
  sem_perfil: 'Sem resposta',
}

/** Início do dia AAAA-MM-DD em Boa Vista, em ISO UTC. */
export function inicioDoDia(dia) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dia)) return null
  const t = Date.parse(`${dia}T00:00:00Z`)
  if (Number.isNaN(t) || new Date(t).toISOString().slice(0, 10) !== dia) return null
  return new Date(t + OFFSET_MS).toISOString()
}

/** "AAAA-MM-DD HH:MM:SS" no horário de Boa Vista, ou vazio. */
export function dataBoaVista(iso) {
  const t = Date.parse(iso || '')
  if (Number.isNaN(t)) return ''
  return new Date(t - OFFSET_MS).toISOString().slice(0, 19).replace('T', ' ')
}

export const telefoneFormatado = (d) => {
  const s = String(d || '')
  if (s.length === 11) return `(${s.slice(0, 2)}) ${s.slice(2, 7)}-${s.slice(7)}`
  if (s.length === 10) return `(${s.slice(0, 2)}) ${s.slice(2, 6)}-${s.slice(6)}`
  return s
}

/**
 * Célula de CSV segura: texto que começa com = + - @ tabulação ou retorno vira
 * texto literal (prefixo '), e aspas são duplicadas.
 */
export function celula(valor) {
  let s = valor == null ? '' : String(valor)
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return `"${s.replace(/"/g, '""')}"`
}

const simNao = (v) => (v == null ? '' : v ? 'Sim' : 'Não')

export const CABECALHO = [
  'ID do lead',
  'Recebido em (horário de Boa Vista)',
  'Cadastro em (horário de Boa Vista)',
  'Atualizado em (horário de Boa Vista)',
  'Nome',
  'WhatsApp',
  'Posto',
  'Origem',
  'Perfil',
  'Roda por aplicativo',
  'Atividade',
  'Proteção atual cobre aplicativo',
  'Pediu proposta em (horário de Boa Vista)',
  'Jogos',
  'Partidas',
  'Visitas',
  'Aceite LGPD',
  'Aceite em (horário de Boa Vista)',
]

export function linhaCsv(r) {
  return [
    r.id,
    dataBoaVista(r.recebido_em),
    dataBoaVista(r.criado_em),
    dataBoaVista(r.atualizado_em),
    r.nome,
    telefoneFormatado(r.telefone),
    r.posto,
    r.origem,
    PERFIL_ROTULO[perfilDe(r)],
    simNao(r.roda_por_aplicativo),
    r.atividade,
    r.protecao_cobre_app,
    dataBoaVista(r.proposta_solicitada_em),
    (r.jogos || []).join(', '),
    r.partidas,
    r.visitas,
    simNao(r.aceite_lgpd),
    dataBoaVista(r.aceite_em),
  ]
    .map(celula)
    .join(';')
}

/** CSV em UTF-8 com BOM (Excel reconhece acentos) e ponto e vírgula como separador. */
export const toCsv = (rows) => '﻿' + [CABECALHO.map(celula).join(';'), ...rows.map(linhaCsv)].join('\r\n') + '\r\n'

export function parseFiltros(q = {}) {
  const f = { filtros: [], pagina: 1, porPagina: 50, csv: q.formato === 'csv' }
  if (q.formato != null && q.formato !== 'csv' && q.formato !== 'json') return { campo: 'formato' }
  if (q.de != null && q.de !== '') {
    const de = inicioDoDia(String(q.de))
    if (!de) return { campo: 'de' }
    f.filtros.push(['recebido_em', `gte.${de}`])
  }
  if (q.ate != null && q.ate !== '') {
    const ate = inicioDoDia(String(q.ate))
    if (!ate) return { campo: 'ate' }
    f.filtros.push(['recebido_em', `lt.${new Date(Date.parse(ate) + 24 * 3600 * 1000).toISOString()}`])
  }
  if (q.posto != null && q.posto !== '') {
    if (!isPosto(String(q.posto))) return { campo: 'posto' }
    f.filtros.push(['posto', `eq.${q.posto}`])
  }
  if (q.perfil != null && q.perfil !== '') {
    if (!PERFIS[q.perfil]) return { campo: 'perfil' }
    f.filtros.push(...PERFIS[q.perfil])
  }
  if (q.pagina != null) {
    const n = Number(q.pagina)
    if (!Number.isInteger(n) || n < 1 || n > 100000) return { campo: 'pagina' }
    f.pagina = n
  }
  if (q.por_pagina != null) {
    const n = Number(q.por_pagina)
    if (!Number.isInteger(n) || n < 1 || n > 100) return { campo: 'por_pagina' }
    f.porPagina = n
  }
  return f
}

export const adminEmails = (env) =>
  String(env.PITSTOP_ADMIN_EMAILS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)

/** Confere a sessão no Supabase Auth. Devolve { user } ou { status, error }. */
async function autenticar(req, env, sb, fetchImpl, timeout) {
  const header = String(req.headers?.authorization || '')
  const m = header.match(/^Bearer ([A-Za-z0-9._-]{20,4096})$/)
  if (!m) return { status: 401, error: 'nao_autenticado' }
  const permitidos = adminEmails(env)
  if (!permitidos.length) return { status: 403, error: 'acesso_nao_configurado' }
  const apikey = env.SUPABASE_ANON_KEY || env.SUPABASE_SERVICE_ROLE_KEY
  const r = await fetchWithTimeout(
    `${sb.url}/auth/v1/user`,
    { headers: { apikey, Authorization: `Bearer ${m[1]}` } },
    { fetchImpl, timeout, expectJson: true },
  )
  if (!r.ok) {
    if (r.status === 401 || r.status === 403) return { status: 401, error: 'sessao_invalida' }
    return { status: 503, error: 'indisponivel' }
  }
  const email = String(r.data?.email || '').toLowerCase()
  if (!email || !r.data?.email_confirmed_at) return { status: 401, error: 'sessao_invalida' }
  if (!permitidos.includes(email)) return { status: 403, error: 'sem_permissao' }
  return { user: { id: r.data.id } }
}

async function buscar(sb, filtros, { offset, limit }, fetchImpl, timeout) {
  const q = new URLSearchParams({ select: COLUNAS.join(','), order: 'recebido_em.desc,id.asc' })
  for (const [k, v] of filtros) q.append(k, v)
  return fetchWithTimeout(
    `${sb.url}/rest/v1/pitstop_leads?${q}`,
    {
      headers: {
        ...sb.headers,
        Prefer: 'count=exact',
        'Range-Unit': 'items',
        Range: `${offset}-${offset + limit - 1}`,
      },
    },
    { fetchImpl, timeout, expectJson: true },
  )
}

const totalDe = (r) => {
  const n = Number(String(r.headers?.get?.('content-range') || '').split('/')[1])
  return Number.isFinite(n) ? n : null
}

export function createAdminLeadsHandler({ env = process.env, fetchImpl = globalThis.fetch, log = console, timeout = 8000, now = () => Date.now() } = {}) {
  return async function handler(req, res) {
    if (req.method !== 'GET') return fail(res, 405, 'metodo', {}, { Allow: 'GET', ...PRIVADO })
    const sb = supabaseConfig(env)
    if (!sb) return fail(res, 503, 'nao_configurado', {}, PRIVADO)

    const auth = await autenticar(req, env, sb, fetchImpl, timeout)
    if (auth.error) {
      const extra = auth.status === 401 ? { 'WWW-Authenticate': 'Bearer' } : {}
      return fail(res, auth.status, auth.error, {}, { ...PRIVADO, ...extra })
    }

    const f = parseFiltros(req.query)
    if (f.campo) return fail(res, 400, 'invalido', { campo: f.campo }, PRIVADO)

    if (!f.csv) {
      const offset = (f.pagina - 1) * f.porPagina
      const r = await buscar(sb, f.filtros, { offset, limit: f.porPagina }, fetchImpl, timeout)
      if (!r.ok && r.status !== 416) {
        log.error(`[pitstop/admin] leitura status=${r.status} erro=${r.error}`)
        return isTemporary(r) ? fail(res, 503, 'indisponivel', {}, PRIVADO) : fail(res, 502, 'destino_recusou', {}, PRIVADO)
      }
      const leads = Array.isArray(r.data) ? r.data.map((x) => ({ ...x, perfil: perfilDe(x) })) : []
      const total = totalDe(r)
      log.info?.(`[pitstop/admin] consulta usuario=${auth.user.id} pagina=${f.pagina} linhas=${leads.length}`)
      return send(
        res,
        200,
        { ok: true, fuso: FUSO, pagina: f.pagina, por_pagina: f.porPagina, total, leads },
        PRIVADO,
      )
    }

    const rows = []
    for (let offset = 0; offset < MAX_CSV + 1; offset += PAGINA_CSV) {
      const r = await buscar(sb, f.filtros, { offset, limit: PAGINA_CSV }, fetchImpl, timeout)
      if (!r.ok && r.status !== 416) {
        log.error(`[pitstop/admin] exportação status=${r.status} erro=${r.error}`)
        return isTemporary(r) ? fail(res, 503, 'indisponivel', {}, PRIVADO) : fail(res, 502, 'destino_recusou', {}, PRIVADO)
      }
      const page = Array.isArray(r.data) ? r.data : []
      rows.push(...page)
      if (rows.length > MAX_CSV) return fail(res, 422, 'muitos_resultados', { mensagem: `Mais de ${MAX_CSV} leads. Reduza o período.` }, PRIVADO)
      if (page.length < PAGINA_CSV) break
    }
    log.info?.(`[pitstop/admin] exportação usuario=${auth.user.id} linhas=${rows.length}`)
    const dia = dataBoaVista(new Date(now()).toISOString()).slice(0, 10).replace(/-/g, '')
    for (const [k, v] of Object.entries(PRIVADO)) res.setHeader(k, v)
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="pitstop-leads-${dia}.csv"`)
    return res.status(200).send(toCsv(rows))
  }
}

export default createAdminLeadsHandler()
