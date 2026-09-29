/**
 * Vercel Function: recebe o lead do Pitstop, grava e repassa ao CRM.
 * Contrato completo em docs/BACKEND.md.
 *
 * Destinos (pelo menos um é obrigatório):
 * - LEAD_WEBHOOK_URL (+ LEAD_WEBHOOK_TOKEN opcional): webhook do CRM, n8n ou Make.
 * - LEAD_SUPABASE=1 com SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY: grava na
 *   tabela pitstop_leads pela função pitstop_upsert_lead (migração em
 *   supabase/migrations).
 *
 * Só responde { ok: true } depois que TODOS os destinos configurados
 * confirmarem. Sem destino, responde 503 e o app mantém o lead na fila.
 * Nome e telefone nunca vão para logs.
 */
import { parseLead } from '../src/core/validation.js'
import { fail, fetchWithTimeout, isTemporary, readJson, send, supabaseConfig } from './_lib/http.js'

const RETRY_AFTER = { 'Retry-After': '60' }

export function webhookPayload(lead) {
  return {
    id: lead.id,
    revisao: lead.revisao,
    origem: 'Pitstop Hemissul',
    posto: lead.posto,
    nome: lead.nome,
    telefone: lead.telefone,
    roda_por_aplicativo: lead.app,
    atividade: lead.atividade,
    protecao_cobre_app: lead.protecao,
    jogos: lead.jogos,
    partidas: lead.partidas,
    visitas: lead.visitas,
    aceite_lgpd: true,
    criado_em: lead.criadoEm,
    enviado_em: new Date().toISOString(),
  }
}

function toSupabase(lead, sb, fetchImpl, timeout) {
  return fetchWithTimeout(
    `${sb.url}/rest/v1/rpc/pitstop_upsert_lead`,
    { method: 'POST', headers: sb.headers, body: JSON.stringify({ p: webhookPayload(lead) }) },
    { timeout, fetchImpl },
  )
}

function toWebhook(lead, env, fetchImpl, timeout) {
  const headers = { 'Content-Type': 'application/json', 'Idempotency-Key': `${lead.id}:${lead.revisao}` }
  if (env.LEAD_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${env.LEAD_WEBHOOK_TOKEN}`
  return fetchWithTimeout(
    env.LEAD_WEBHOOK_URL,
    { method: 'POST', headers, body: JSON.stringify(webhookPayload(lead)) },
    { timeout, fetchImpl },
  )
}

export function createLeadHandler({
  env = process.env,
  fetchImpl = globalThis.fetch,
  log = console,
  timeouts = { supabase: 4000, crm: 5000 },
} = {}) {
  return async function handler(req, res) {
    if (req.method !== 'POST') return fail(res, 405, 'metodo', {}, { Allow: 'POST' })

    const parsed = readJson(req)
    if (parsed.error) return fail(res, parsed.status, parsed.error)

    const v = parseLead(parsed.body)
    if (!v.ok) return fail(res, 400, 'invalido', { campo: v.campo, mensagem: v.mensagem })
    const lead = v.lead

    const sb = env.LEAD_SUPABASE === '1' ? supabaseConfig(env) : null
    const hasWebhook = Boolean(env.LEAD_WEBHOOK_URL)
    if (!sb && !hasWebhook) {
      log.warn('[pitstop/lead] nenhum destino configurado')
      return fail(res, 503, 'nao_configurado', {}, { 'Retry-After': '300' })
    }

    // Grava primeiro no banco (quando existe) e depois avisa o CRM.
    const destinos = []
    for (const [nome, run] of [
      ['supabase', sb && (() => toSupabase(lead, sb, fetchImpl, timeouts.supabase))],
      ['crm', hasWebhook && (() => toWebhook(lead, env, fetchImpl, timeouts.crm))],
    ]) {
      if (!run) continue
      const r = await run()
      if (!r.ok) {
        // Log sem dados pessoais: só destino, status e id do lead.
        log.error(`[pitstop/lead] destino=${nome} status=${r.status} erro=${r.error} lead=${lead.id}`)
        return isTemporary(r)
          ? fail(res, 503, 'indisponivel', { destino: nome }, RETRY_AFTER)
          : fail(res, 502, 'destino_recusou', { destino: nome, retryable: true }, RETRY_AFTER)
      }
      destinos.push(nome)
    }

    return send(res, 200, { ok: true, id: lead.id, revisao: lead.revisao, destinos })
  }
}

export default createLeadHandler()
