import { describe, expect, it } from 'vitest'
import { createRng } from '../core/rng.js'
import { createCorrida, corridaInput, corridaStep } from './corrida/engine.js'
import { createBlocos, blocosInput, blocosStep, collides, rotate } from './blocos/engine.js'
import { generateSudoku, countSolutions, placeNumber, sudokuScore, LEVELS } from './sudoku/engine.js'
import { buildPuzzle, createCruzadas, typeKey, currentWord, cruzadasScore } from './cruzadas/engine.js'
import { GRADES } from '../content/cruzadas.js'
import { nextStep, validateCadastro, perfil, shouldOfferQuote, maskTelefone } from '../core/lead.js'

describe('Corrida', () => {
  it('troca de faixa dentro dos limites', () => {
    const s = createCorrida(createRng(1))
    corridaInput(s, 'left')
    corridaInput(s, 'left')
    expect(s.lane).toBe(0)
    corridaInput(s, 'right')
    corridaInput(s, 'right')
    corridaInput(s, 'right')
    expect(s.lane).toBe(2)
  })
  it('sempre deixa uma faixa livre e termina ao bater', () => {
    const s = createCorrida(createRng(2))
    for (let i = 0; i < 20000 && !s.over; i++) corridaStep(s, 1 / 60)
    expect(s.over).toBe(true)
    expect(s.distance).toBeGreaterThan(0)
  })
})

describe('Blocos', () => {
  it('rotaciona e detecta colisão com a borda', () => {
    const s = createBlocos(createRng(3))
    expect(rotate([[1, 1, 1]])).toEqual([[1], [1], [1]])
    expect(collides(s.grid, [[1]], -1, 0)).toBe(true)
  })
  it('limpa linha completa e pontua', () => {
    const s = createBlocos(createRng(4))
    s.grid[17] = Array(10).fill(1)
    s.grid[17][9] = 0
    s.piece = { m: [[1]], x: 9, y: 16, color: 1 }
    blocosInput(s, 'down')
    blocosInput(s, 'down')
    expect(s.lines).toBe(1)
    expect(s.score).toBeGreaterThanOrEqual(100)
  })
  it('termina quando as peças chegam ao topo', () => {
    const s = createBlocos(createRng(5))
    for (let i = 0; i < 100000 && !s.over; i++) blocosStep(s, 700)
    expect(s.over).toBe(true)
  })
})

describe('Sudoku', () => {
  for (const level of Object.keys(LEVELS)) {
    it(`gera tabuleiro ${level} com solução única`, () => {
      const g = generateSudoku(level, createRng(7))
      expect(countSolutions(g.board.slice(), 2)).toBe(1)
      expect(g.board.filter((v) => v === 0).length).toBeLessThanOrEqual(LEVELS[level].holes)
    })
  }
  it('conta erros, conclui e pontua', () => {
    const g = generateSudoku('facil', createRng(8))
    const empty = g.board.findIndex((v) => v === 0)
    const wrong = (g.solution[empty] % 9) + 1
    placeNumber(g, empty, wrong)
    expect(g.errors).toBe(1)
    g.board.forEach((v, i) => !g.given[i] && placeNumber(g, i, g.solution[i]))
    expect(g.done).toBe(true)
    expect(sudokuScore(g, 100)).toBe(1000 - 200 - 50)
  })
})

describe('Cruzadas', () => {
  it('todas as grades são válidas', () => {
    GRADES.forEach((def) => {
      const p = buildPuzzle(def)
      expect(p.words.length).toBe(def.words.length)
      def.words.forEach((w) => expect(w.answer).toMatch(/^[A-Z]+$/))
    })
  })
  it('resolve a grade digitando as respostas', () => {
    const s = createCruzadas(GRADES[0])
    let guard = 0
    while (!s.done && guard++ < 500) {
      const w = currentWord(s)
      typeKey(s, s.puzzle.cells[s.cursor].letter)
      expect(w).toBeTruthy()
    }
    expect(s.done).toBe(true)
    expect(cruzadasScore(s, 60)).toBe(2000 - 120)
  })
  it('dica revela a letra e custa pontos', () => {
    const s = createCruzadas(GRADES[0])
    typeKey(s, 'hint')
    expect(s.hints).toBe(1)
  })
})

describe('Jornada do lead', () => {
  it('ordem das etapas', () => {
    expect(nextStep(null, 1)).toBe('cadastro')
    const lead = { criadoEm: 'x', app: null }
    expect(nextStep(lead, 1)).toBe('app')
    expect(nextStep({ ...lead, app: true }, 1)).toBe('atividade')
    expect(nextStep({ ...lead, app: false }, 1)).toBe('resultado')
    expect(nextStep({ ...lead, app: false, protecao: null }, 2)).toBe('protecao')
    expect(nextStep({ ...lead, app: false, protecao: 'Sim, cobre' }, 3)).toBe('resultado')
  })
  it('valida cadastro e máscara', () => {
    expect(validateCadastro({ nome: 'A', telefone: '', aceite: false })).toMatch(/nome/)
    expect(validateCadastro({ nome: 'Ana', telefone: '9512', aceite: true })).toMatch(/WhatsApp/)
    expect(validateCadastro({ nome: 'Ana', telefone: '95991381037', aceite: false })).toMatch(/aceite/)
    expect(validateCadastro({ nome: 'Ana', telefone: '(95) 9 9138-1037', aceite: true })).toBeNull()
    expect(maskTelefone('95991381037')).toBe('(95) 9 9138-1037')
  })
  it('perfil e cotação', () => {
    expect(perfil({ app: false })).toBe('proprietario')
    expect(perfil({ app: true, atividade: 'Renda complementar' })).toBe('complementar')
    expect(perfil({ app: true, atividade: 'Atividade principal' })).toBe('integral')
    expect(shouldOfferQuote('Não sei')).toBe(true)
    expect(shouldOfferQuote('Sim, cobre')).toBe(false)
  })
})
