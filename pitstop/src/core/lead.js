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
import { cadastroInvalido, PROTECAO_OPCOES, ATIVIDADE_OPCOES } from './validation.js'

export { PROTECAO_OPCOES, ATIVIDADE_OPCOES }
export { normalizeTelefone } from './validation.js'

export function emptyLead() {
  return { nome: '', telefone: '', aceite: false, app: null, atividade: null, protecao: null, posto: null, criadoEm: null }
}

/**
 * Valida o cadastro e diz qual campo corrigir.
 * @returns {{ campo: 'nome' | 'telefone' | 'aceite', mensagem: string } | null}
 */
export const validateCadastroCampo = (dados) => cadastroInvalido(dados)

/** Valida o cadastro. Retorna a mensagem de erro em português ou null. */
export function validateCadastro(dados) {
  return cadastroInvalido(dados)?.mensagem ?? null
}

/**
 * Máscara do WhatsApp durante a digitação.
 * Celular (terceiro dígito 9): (95) 9 9138-1037, até 11 dígitos.
 * Fixo com WhatsApp Business: (95) 3623-1234, até 10 dígitos.
 * Para enviar, use normalizeTelefone (só dígitos).
 */
export function maskTelefone(value) {
  const all = String(value ?? '').replace(/\D/g, '')
  const celular = all.length < 3 || all[2] === '9'
  const d = all.slice(0, celular ? 11 : 10)
  if (d.length <= 2) return d
  const ddd = `(${d.slice(0, 2)}) `
  if (celular) {
    if (d.length <= 3) return ddd + d.slice(2)
    return `${ddd}${d.slice(2, 3)} ${d.slice(3, 7)}${d.length > 7 ? '-' + d.slice(7) : ''}`
  }
  return `${ddd}${d.slice(2, 6)}${d.length > 6 ? '-' + d.slice(6) : ''}`
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
