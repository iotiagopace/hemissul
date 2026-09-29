/**
 * Eventos no dataLayer do GTM-NGFZ298 (mesmo contêiner do site oficial).
 * Plano completo em docs/EVENTOS.md. Nunca enviar nome ou telefone ao dataLayer:
 * `track` descarta esses campos e qualquer valor com cara de telefone, mesmo
 * que alguém os passe por engano.
 */
const BLOQUEADOS = new Set(['nome', 'name', 'telefone', 'phone', 'whatsapp', 'email', 'lead', 'leadid', 'lead_id'])
const PARECE_TELEFONE = /\d[\d\s().-]{8,}\d/

export function sanitizeParams(params = {}) {
  const out = {}
  for (const [k, v] of Object.entries(params)) {
    if (BLOQUEADOS.has(k.toLowerCase())) continue
    if (v !== null && typeof v === 'object') continue
    if (typeof v === 'string' && PARECE_TELEFONE.test(v)) continue
    out[k] = v
  }
  return out
}

export function track(event, params = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, pitstop: true, ...sanitizeParams(params) })
}

export const EVENTS = {
  view: 'pitstop_view',
  gameStart: 'pitstop_game_start',
  gameEnd: 'pitstop_game_end',
  lead: 'pitstop_lead',
  profile: 'pitstop_profile',
  protection: 'pitstop_protection_answer',
  quoteView: 'pitstop_quote_view',
  whatsapp: 'whatsapp_click',
  quote: 'start_quote',
  chargeTimer: 'pitstop_charge_timer',
}
