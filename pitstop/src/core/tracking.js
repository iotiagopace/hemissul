/**
 * Eventos no dataLayer do GTM-NGFZ298 (mesmo contêiner do site oficial).
 * Plano completo em docs/EVENTOS.md. Nunca enviar nome ou telefone ao dataLayer.
 */
export function track(event, params = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, pitstop: true, ...params })
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
