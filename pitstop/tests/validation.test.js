import { describe, expect, it } from 'vitest'
import { cadastroInvalido, isTelefoneValido, normalizeTelefone, parseLead, parsePartida } from '../src/core/validation.js'
import { maskTelefone, validateCadastro, validateCadastroCampo } from '../src/core/lead.js'
import { sanitizeParams } from '../src/core/tracking.js'

const ID = '4f9c2b1e-8d3a-4c5b-9e7f-1a2b3c4d5e6f'
const LEAD_ID = '0b7c9d2e-1f3a-4b5c-8d6e-7f8091a2b3c4'

describe('telefone', () => {
  it('celular com 11 dígitos e fixo com 10', () => {
    expect(isTelefoneValido('(95) 9 9138-1037')).toBe(true)
    expect(isTelefoneValido('(95) 3623-1234')).toBe(true)
    expect(isTelefoneValido('+55 95 99138-1037')).toBe(true)
  })
  it('recusa formatos impossíveis', () => {
    expect(isTelefoneValido('9591381037')).toBe(false) // 10 dígitos começando por 9 (celular sem o 9 extra)
    expect(isTelefoneValido('95 8913 81037')).toBe(false) // 11 dígitos sem o 9
    expect(isTelefoneValido('05991381037')).toBe(false) // DDD inválido
    expect(isTelefoneValido('9512')).toBe(false)
  })
  it('normaliza para dígitos sem o 55', () => {
    expect(normalizeTelefone('+55 (95) 9 9138-1037')).toBe('95991381037')
    expect(normalizeTelefone('(95) 3623-1234')).toBe('9536231234')
  })
  it('máscara acompanha a validação: celular até 11, fixo até 10', () => {
    expect(maskTelefone('95991381037')).toBe('(95) 9 9138-1037')
    expect(maskTelefone('959913810379999')).toBe('(95) 9 9138-1037')
    expect(maskTelefone('9536231234')).toBe('(95) 3623-1234')
    expect(maskTelefone('95362312349')).toBe('(95) 3623-1234')
    expect(maskTelefone('959')).toBe('(95) 9')
    expect(maskTelefone('95')).toBe('95')
    expect(isTelefoneValido(maskTelefone('9536231234'))).toBe(true)
  })
})

describe('cadastro', () => {
  it('identifica o campo inválido na ordem do formulário', () => {
    expect(validateCadastroCampo({ nome: ' ', telefone: '', aceite: false }).campo).toBe('nome')
    expect(validateCadastroCampo({ nome: 'Ana', telefone: '95', aceite: false }).campo).toBe('telefone')
    expect(validateCadastroCampo({ nome: 'Ana', telefone: '95991381037', aceite: false }).campo).toBe('aceite')
    expect(validateCadastroCampo({ nome: 'Ana', telefone: '95991381037', aceite: true })).toBeNull()
  })
  it('validateCadastro continua devolvendo a mensagem', () => {
    expect(validateCadastro({ nome: 'Ana', telefone: '95', aceite: true })).toBe(cadastroInvalido({ nome: 'Ana', telefone: '95', aceite: true }).mensagem)
  })
  it('nome precisa ter letra', () => {
    expect(validateCadastroCampo({ nome: '123', telefone: '95991381037', aceite: true }).campo).toBe('nome')
  })
})

describe('parseLead', () => {
  const base = { id: ID, revisao: 1, nome: '  Ana   Souza ', telefone: '(95) 9 9138-1037', aceite: true }
  it('aceita, normaliza e descarta campos desconhecidos', () => {
    const r = parseLead({ ...base, app: true, atividade: 'Renda complementar', protecao: 'pulou', admin: true, enviadoEm: 'x' })
    expect(r.ok).toBe(true)
    expect(r.lead.nome).toBe('Ana Souza')
    expect(r.lead.telefone).toBe('95991381037')
    expect(r.lead.protecao).toBeNull()
    expect(r.lead).not.toHaveProperty('admin')
  })
  it('recusa tipos e valores fora da lista', () => {
    expect(parseLead([]).campo).toBe('body')
    expect(parseLead({ ...base, id: 'abc' }).campo).toBe('id')
    expect(parseLead({ ...base, revisao: '1' }).campo).toBe('revisao')
    expect(parseLead({ ...base, aceite: 'true' }).campo).toBe('aceite')
    expect(parseLead({ ...base, app: 'sim' }).campo).toBe('app')
    expect(parseLead({ ...base, protecao: 'Talvez' }).campo).toBe('protecao')
    expect(parseLead({ ...base, posto: '<script>' }).campo).toBe('posto')
    expect(parseLead({ ...base, jogos: ['xadrez'] }).campo).toBe('jogos')
  })
  it('atividade só vale para quem roda por aplicativo', () => {
    expect(parseLead({ ...base, app: false, atividade: 'Atividade principal' }).lead.atividade).toBeNull()
  })
})

describe('parsePartida', () => {
  const agora = Date.parse('2026-10-01T15:00:00Z')
  const base = { partidaId: ID, leadId: LEAD_ID, nome: 'Carlos Souza', posto: '01', jogo: 'corrida', pontos: 1200, jogadaEm: '2026-10-01T14:59:00Z' }
  it('aceita e guarda só o primeiro nome', () => {
    const r = parsePartida(base, agora)
    expect(r.ok).toBe(true)
    expect(r.partida.nome).toBe('Carlos')
  })
  it('barra pontuação impossível para o jogo', () => {
    expect(parsePartida({ ...base, jogo: 'sudoku', pontos: 2500 }, agora).campo).toBe('pontos')
    expect(parsePartida({ ...base, pontos: 5000, duracao: 10 }, agora).campo).toBe('pontos')
    expect(parsePartida({ ...base, pontos: 1.5 }, agora).campo).toBe('pontos')
    expect(parsePartida({ ...base, pontos: -1 }, agora).campo).toBe('pontos')
  })
  it('barra partida antiga ou no futuro', () => {
    expect(parsePartida({ ...base, jogadaEm: '2026-09-28T10:00:00Z' }, agora).campo).toBe('jogadaEm')
    expect(parsePartida({ ...base, jogadaEm: '2026-10-01T16:00:00Z' }, agora).campo).toBe('jogadaEm')
  })
})

describe('tracking', () => {
  it('não deixa nome ou telefone chegar ao dataLayer', () => {
    const out = sanitizeParams({ jogo: 'corrida', nome: 'Ana', telefone: '95991381037', leadId: ID, obs: '(95) 9 9138-1037', pontos: 1234567 })
    expect(out).toEqual({ jogo: 'corrida', pontos: 1234567 })
  })
})
