/**
 * Vercel Function: recebe o lead do Pitstop e grava no banco (Supabase).
 * Contrato completo em docs/BACKEND.md.
 *
 * O Pitstop não envia leads a CRM nem a outra ferramenta comercial: o time da
 * Hemissul consulta e exporta pelo acesso restrito (api/admin/leads.js).
 * Variáveis antigas de webhook (LEAD_WEBHOOK_URL, LEAD_WEBHOOK_TOKEN) são
 * ignoradas.
 *
 * Variáveis (só no servidor): SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.
 * Só responde { ok: true } depois que o banco confirma a gravação. Sem banco
 * configurado, responde 503 e o app mantém o lead na fila.
 * Nome e telefone nunca vão para logs nem para mensagens de erro.
 */
import { parseLead } from '../src/core/validation.js'
import { fail, fetchWithTimeout, isTemporary, readJson, send, supabaseConfig } from './_lib/http.js'

const RETRY_AFTER = { 'Retry-After': '60' }

/** Linha enviada à função pitstop_upsert_lead (nomes de coluna do banco). */
export function leadRow(lead) {
  return {
    id: lead.id,
    revisao: lead.revisao,
    origem: 'pitstop',
    posto: lead.posto,
    nome: lead.nome,
    telefone: lead.telefone,
    roda_por_aplicativo: lead.app,
    atividade: lead.atividade,
    protecao_cobre_app: lead.protecao,
    proposta_solicitada_em: lead.propostaSolicitadaEm,
    jogos: lead.jogos,
    partidas: lead.partidas,
    visitas: lead.visitas,
    aceite_lgpd: true,
    criado_em: lead.criadoEm,
  }
}

export function createLeadHandler({ env = process.env, fetchImpl = globalThis.fetch, log = console, timeout = 5000 } = {}) {
  return async function handler(req, res) {
    if (req.method !== 'POST') return fail(res, 405, 'metodo', {}, { Allow: 'POST' })

    const parsed = readJson(req)
    if (parsed.error) return fail(res, parsed.status, parsed.error)

    const v = parseLead(parsed.body)
    if (!v.ok) return fail(res, 400, 'invalido', { campo: v.campo, mensagem: v.mensagem })
    const lead = v.lead

    const sb = supabaseConfig(env)
    if (!sb) {
      log.warn('[pitstop/lead] banco não configurado')
      return fail(res, 503, 'nao_configurado', {}, { 'Retry-After': '300' })
    }

    const r = await fetchWithTimeout(
      `${sb.url}/rest/v1/rpc/pitstop_upsert_lead`,
      { method: 'POST', headers: sb.headers, body: JSON.stringify({ p: leadRow(lead) }) },
      { timeout, fetchImpl },
    )
    if (!r.ok) {
      // Log sem dados pessoais: só status, erro e id do lead.
      log.error(`[pitstop/lead] gravação status=${r.status} erro=${r.error} lead=${lead.id}`)
      return isTemporary(r)
        ? fail(res, 503, 'indisponivel', {}, RETRY_AFTER)
        : fail(res, 502, 'destino_recusou', { retryable: true }, RETRY_AFTER)
    }

    return send(res, 200, { ok: true, id: lead.id, revisao: lead.revisao })
  }
}

export default createLeadHandler()
