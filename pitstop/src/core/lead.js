/**
 * Regras da jornada de captação. Nada aqui toca a interface: o App consulta
 * estas funções para decidir qual etapa mostrar depois de cada partida.
 *
 * Ordem da jornada
 * 1. Primeira partida livre, sem cadastro.
 * 2. Ao fim da partida: nome + WhatsApp + aceite salvam o recorde (cadastro).
 * 3. Logo após o cadastro: "Roda por aplicativo?" (obrigatória).
 * 4. Se sim: "Atividade principal ou renda complementar?" (obrigatória).
 * 5. A partir da 2ª partida: "Sua proteção atual cobre uso por aplicativo?"
 *    (opcional, feita uma vez). "Não" ou "Não sei" abre a cotação.
 * 6. Cotação: mensagem por perfil + WhatsApp com texto preenchido.
 */
import { PITSTOP } from '../config/pitstop.js'

export const PROTECAO_OPCOES = ['Sim, cobre', 'Não cobre', 'Não sei']
export const ATIVIDADE_OPCOES = ['Atividade principal', 'Renda complementar']

export function emptyLead() {
  return { nome: '', telefone: '', aceite: false, app: null, atividade: null, protecao: null, posto: null, criadoEm: null }
}

/** Valida o cadastro. Retorna mensagem de erro em português ou null. */
export function validateCadastro({ nome, telefone, aceite }) {
  if (!nome || nome.trim().length < 2) return 'Digite seu nome para salvar o recorde.'
  const digits = (telefone || '').replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 11) return 'Confira o WhatsApp: use DDD e número.'
  if (!aceite) return 'Marque o aceite para salvar o recorde.'
  return null
}

export function maskTelefone(value) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length > 6) return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}${d.length > 7 ? '-' + d.slice(7) : ''}`
  if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return d
}

/**
 * Próxima etapa depois de uma partida.
 * @returns 'cadastro' | 'app' | 'atividade' | 'protecao' | 'resultado'
 */
export function nextStep(lead, partidas) {
  if (!lead || !lead.criadoEm) return 'cadastro'
  if (lead.app == null) return 'app'
  if (lead.app && !lead.atividade) return 'atividade'
  if (lead.protecao == null && partidas >= 2) return 'protecao'
  return 'resultado'
}

export const shouldOfferQuote = (protecao) => protecao === 'Não cobre' || protecao === 'Não sei'

export function perfil(lead) {
  if (!lead?.app) return 'proprietario'
  return lead.atividade === 'Renda complementar' ? 'complementar' : 'integral'
}

/** Mensagens aprovadas por perfil. Nunca prometer cobertura não confirmada. */
export const MENSAGENS = {
  integral:
    'Seu carro é sua ferramenta de trabalho. Veja a proteção da Hemissul para quem roda por aplicativo, com assistência 24h durante a jornada.',
  complementar: 'Você usa o carro para você e para o aplicativo. Veja uma proteção que considera os dois usos.',
  proprietario: 'Proteção para o seu elétrico, com assistência 24h e cobertura nacional.',
}

export function whatsappText(lead, postoName) {
  const uso = lead.app ? `Rodo por aplicativo (${(lead.atividade || '').toLowerCase()})` : 'Não rodo por aplicativo'
  return `Olá, sou ${lead.nome}. Vim pelo Pitstop Hemissul (${postoName}). ${uso} e quero uma cotação de proteção para o meu elétrico.`
}

export const whatsappUrl = (lead, postoName) =>
  `https://wa.me/${PITSTOP.whatsappQuote}?text=${encodeURIComponent(whatsappText(lead, postoName))}`
