/**
 * Regras de validação compartilhadas entre o navegador (core/lead.js,
 * core/api.js) e as funções do servidor (api/*). Módulo puro: sem DOM, sem
 * import.meta.env e sem dependências, para rodar nos dois lados.
 */

export const JOGOS = ['corrida', 'blocos', 'sudoku', 'cruzadas']
export const PROTECAO_OPCOES = ['Sim, cobre', 'Não cobre', 'Não sei']
export const ATIVIDADE_OPCOES = ['Atividade principal', 'Renda complementar']

export const MENSAGENS_CAMPO = {
  nome: 'Digite seu nome para salvar o recorde.',
  telefone: 'Confira o WhatsApp: use DDD e número.',
  aceite: 'Marque o aceite para salvar o recorde.',
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const POSTO = /^[a-z0-9-]{1,40}$/i

export const isUuid = (v) => typeof v === 'string' && UUID.test(v)
export const isPosto = (v) => typeof v === 'string' && POSTO.test(v)

/** Só os dígitos do telefone, sem o 55 do país. */
export function normalizeTelefone(value) {
  let d = String(value ?? '').replace(/\D/g, '')
  if (d.length > 11 && d.startsWith('55')) d = d.slice(2)
  return d
}

/**
 * Celular: DDD + 9 + 8 dígitos (11 no total).
 * Fixo (WhatsApp Business): DDD + 8 dígitos começando por 2 a 5 (10 no total).
 */
export function isTelefoneValido(value) {
  const d = normalizeTelefone(value)
  if (!/^[1-9][1-9]/.test(d)) return false
  if (d.length === 11) return d[2] === '9'
  if (d.length === 10) return /[2-5]/.test(d[2])
  return false
}

export const normalizeNome = (value) => String(value ?? '').trim().replace(/\s+/g, ' ')

export function isNomeValido(value) {
  const nome = normalizeNome(value)
  return nome.length >= 2 && nome.length <= 80 && /\p{L}/u.test(nome)
}

/** Primeiro campo inválido do cadastro, na ordem do formulário, ou null. */
export function cadastroInvalido({ nome, telefone, aceite } = {}) {
  if (!isNomeValido(nome)) return { campo: 'nome', mensagem: MENSAGENS_CAMPO.nome }
  if (!isTelefoneValido(telefone)) return { campo: 'telefone', mensagem: MENSAGENS_CAMPO.telefone }
  if (aceite !== true) return { campo: 'aceite', mensagem: MENSAGENS_CAMPO.aceite }
  return null
}

const invalido = (campo, mensagem = 'Campo inválido.') => ({ ok: false, campo, mensagem })
const inteiro = (v, min, max) => Number.isInteger(v) && v >= min && v <= max
const dataIso = (v) => typeof v === 'string' && v.length <= 40 && !Number.isNaN(Date.parse(v))

/**
 * Valida o lead recebido pelo servidor e devolve só os campos permitidos.
 * Campos desconhecidos são descartados. `revisao` ordena as atualizações do
 * mesmo lead (ver docs/BACKEND.md).
 * @returns {{ ok: true, lead } | { ok: false, campo, mensagem }}
 */
export function parseLead(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return invalido('body', 'Envie um objeto JSON.')
  if (!isUuid(body.id)) return invalido('id')
  if (!inteiro(body.revisao, 1, Number.MAX_SAFE_INTEGER)) return invalido('revisao')
  const erro = cadastroInvalido(body)
  if (erro) return invalido(erro.campo, erro.mensagem)
  if (body.app != null && typeof body.app !== 'boolean') return invalido('app')
  if (body.atividade != null && !ATIVIDADE_OPCOES.includes(body.atividade)) return invalido('atividade')
  // "pulou" é um estado local da interface: não é resposta.
  const protecao = body.protecao === 'pulou' ? null : body.protecao
  if (protecao != null && !PROTECAO_OPCOES.includes(protecao)) return invalido('protecao')
  if (body.posto != null && !isPosto(body.posto)) return invalido('posto')
  if (body.criadoEm != null && !dataIso(body.criadoEm)) return invalido('criadoEm')
  // Interesse em proposta só existe quando a interface envia a ação explícita
  // (ver docs/BACKEND.md). Nunca é deduzido de cadastro, partida ou tela aberta.
  if (body.propostaSolicitadaEm != null && !dataIso(body.propostaSolicitadaEm)) return invalido('propostaSolicitadaEm')
  if (body.partidas != null && !inteiro(body.partidas, 0, 100000)) return invalido('partidas')
  if (body.visitas != null && !inteiro(body.visitas, 0, 100000)) return invalido('visitas')
  if (body.jogos != null && !(Array.isArray(body.jogos) && body.jogos.length <= JOGOS.length && body.jogos.every((j) => JOGOS.includes(j))))
    return invalido('jogos')

  return {
    ok: true,
    lead: {
      id: body.id.toLowerCase(),
      revisao: body.revisao,
      nome: normalizeNome(body.nome),
      telefone: normalizeTelefone(body.telefone),
      aceite: true,
      app: body.app ?? null,
      atividade: body.app ? (body.atividade ?? null) : null,
      protecao: protecao ?? null,
      posto: body.posto || 'sem-posto',
      criadoEm: body.criadoEm || null,
      propostaSolicitadaEm: body.propostaSolicitadaEm ? new Date(body.propostaSolicitadaEm).toISOString() : null,
      partidas: body.partidas ?? 0,
      visitas: body.visitas ?? 1,
      jogos: body.jogos ? [...new Set(body.jogos)] : [],
    },
  }
}

/**
 * Limites de pontuação por jogo. Servem para barrar valores impossíveis, não
 * para provar que a partida aconteceu: a pontuação é calculada no aparelho.
 * - corrida: metros; velocidade máxima do motor é 90 m/s.
 * - sudoku e cruzadas: a fórmula não passa de 2000.
 */
export const LIMITES = {
  corrida: { max: 100000, porSegundo: 90 },
  blocos: { max: 100000 },
  sudoku: { max: 2000 },
  cruzadas: { max: 2000 },
}

/** Uma partida só entra no ranking do dia em que foi jogada, até 48 h depois. */
export const PARTIDA_VALIDADE_MS = 48 * 3600 * 1000

/**
 * Valida a partida enviada ao ranking.
 * @returns {{ ok: true, partida } | { ok: false, campo, mensagem }}
 */
export function parsePartida(body, agora = Date.now()) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return invalido('body', 'Envie um objeto JSON.')
  if (!isUuid(body.partidaId)) return invalido('partidaId')
  if (!isUuid(body.leadId)) return invalido('leadId')
  if (!JOGOS.includes(body.jogo)) return invalido('jogo')
  if (!isPosto(body.posto)) return invalido('posto')
  if (!isNomeValido(body.nome)) return invalido('nome')
  const limite = LIMITES[body.jogo]
  if (!inteiro(body.pontos, 0, limite.max)) return invalido('pontos')
  if (body.duracao != null) {
    if (!inteiro(body.duracao, 1, 24 * 3600)) return invalido('duracao')
    if (limite.porSegundo && body.pontos > body.duracao * limite.porSegundo + 50) return invalido('pontos')
  }
  if (!dataIso(body.jogadaEm)) return invalido('jogadaEm')
  const jogadaEm = Date.parse(body.jogadaEm)
  if (jogadaEm > agora + 5 * 60 * 1000) return invalido('jogadaEm')
  if (agora - jogadaEm > PARTIDA_VALIDADE_MS) return invalido('jogadaEm', 'Partida antiga demais para o ranking.')

  return {
    ok: true,
    partida: {
      partidaId: body.partidaId.toLowerCase(),
      leadId: body.leadId.toLowerCase(),
      nome: primeiroNome(body.nome),
      posto: body.posto,
      jogo: body.jogo,
      pontos: body.pontos,
      duracao: body.duracao ?? null,
      jogadaEm: new Date(jogadaEm).toISOString(),
    },
  }
}

/** O ranking guarda e mostra só o primeiro nome. */
export const primeiroNome = (nome) => normalizeNome(nome).split(' ')[0].slice(0, 30) || 'Motorista'
