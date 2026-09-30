/**
 * Configuração do Pitstop. Contatos e links vêm do site oficial
 * (hemissul-site/src/config/site.js). Se mudarem lá, atualize aqui.
 */
export const PITSTOP = {
  name: 'Pitstop Hemissul',
  headline: 'Enquanto seu carro carrega, veja se sua proteção acompanha sua jornada.',
  legalName: 'Hemissul - Associação de Proteção Patrimonial Mutualista',
  siteUrl: 'https://www.hemissul.com.br',
  privacyUrl: 'https://www.hemissul.com.br/privacidade',
  quoteUrl: 'https://cotacao.me/B5G8N1Qk',
  // WhatsApp de cotação do site oficial: (95) 99138-1037
  whatsappQuote: '5595991381037',
  assistancePhone: '0800 940 2163',
  gtmId: 'GTM-NGFZ298',
  // Endpoint serverless que recebe o lead (api/lead.js). Pode ser trocado por env.
  leadEndpoint: import.meta.env.VITE_LEAD_ENDPOINT || '/api/lead',
  // Ranking compartilhado (api/ranking.js). Sem backend, cai no ranking local.
  rankingEndpoint: import.meta.env.VITE_RANKING_ENDPOINT || '/api/ranking',
}

/**
 * Postos parceiros. O QR Code de cada posto aponta para `/?posto=<id>`.
 * Os nomes abaixo são exemplos até a Hemissul enviar a lista real.
 */
export const POSTOS = {
  '01': { id: '01', name: 'Posto parceiro 01' },
  '02': { id: '02', name: 'Posto parceiro 02' },
}

export function currentPosto(search = window.location.search) {
  const id = new URLSearchParams(search).get('posto')
  return POSTOS[id] || { id: id || 'sem-posto', name: id ? `Posto ${id}` : 'Acesso direto' }
}
