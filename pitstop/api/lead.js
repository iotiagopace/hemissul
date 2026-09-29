/**
 * Vercel Function: recebe o lead do Pitstop e repassa ao CRM.
 *
 * Variáveis de ambiente (Vercel > Settings > Environment Variables):
 * - LEAD_WEBHOOK_URL: destino do lead (webhook do Power CRM, n8n ou Make).
 * - LEAD_WEBHOOK_TOKEN: opcional, enviado como Authorization: Bearer.
 *
 * Sem LEAD_WEBHOOK_URL a função só valida e responde 202, para não quebrar
 * o protótipo. Os dados pessoais nunca vão para o dataLayer, apenas para cá.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' })

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {}
  const telefone = String(body.telefone || '').replace(/\D/g, '')
  if (!body.nome || String(body.nome).trim().length < 2 || telefone.length < 10 || !body.aceite) {
    return res.status(400).json({ error: 'Nome, WhatsApp e aceite são obrigatórios.' })
  }

  const lead = {
    id: body.id,
    origem: 'Pitstop Hemissul',
    posto: body.posto || 'sem-posto',
    nome: String(body.nome).trim().slice(0, 80),
    telefone,
    roda_por_aplicativo: body.app,
    atividade: body.atividade || null,
    protecao_cobre_app: body.protecao || null,
    jogos: body.jogos || null,
    partidas: body.partidas || 0,
    visitas: body.visitas || 1,
    aceite_lgpd: true,
    criado_em: body.criadoEm,
    enviado_em: new Date().toISOString(),
  }

  const url = process.env.LEAD_WEBHOOK_URL
  if (!url) return res.status(202).json({ ok: true, forwarded: false })

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify(lead),
    })
    if (!r.ok) return res.status(502).json({ error: 'CRM recusou o lead', status: r.status })
    return res.status(200).json({ ok: true, forwarded: true })
  } catch {
    return res.status(502).json({ error: 'Falha ao contatar o CRM' })
  }
}

function safeJson(text) {
  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}
