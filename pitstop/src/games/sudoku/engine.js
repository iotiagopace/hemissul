/**
 * Motor do Sudoku: gera tabuleiros com solução única em três níveis.
 * Índices 0..80 (linha * 9 + coluna). 0 = casa vazia.
 */
import { shuffle } from '../../core/rng.js'

export const LEVELS = {
  facil: { label: 'Fácil', holes: 38, base: 1000, estimate: '5 a 10 min' },
  medio: { label: 'Médio', holes: 46, base: 1500, estimate: '10 a 15 min' },
  dificil: { label: 'Difícil', holes: 52, base: 2000, estimate: '15 min ou mais' },
}

export const SUDOKU_SCORE = { perSecond: 2, perError: 50, min: 100, unit: 'pts' }

export function canPlace(grid, i, v) {
  const r = Math.floor(i / 9)
  const c = i % 9
  const br = r - (r % 3)
  const bc = c - (c % 3)
  for (let k = 0; k < 9; k++) {
    if (grid[r * 9 + k] === v || grid[k * 9 + c] === v) return false
    if (grid[(br + Math.floor(k / 3)) * 9 + bc + (k % 3)] === v) return false
  }
  return true
}

function fillGrid(grid, rng) {
  const i = grid.indexOf(0)
  if (i < 0) return true
  for (const v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng)) {
    if (canPlace(grid, i, v)) {
      grid[i] = v
      if (fillGrid(grid, rng)) return true
      grid[i] = 0
    }
  }
  return false
}

/** Conta soluções até `limit` (usa a casa com menos candidatos primeiro). */
export function countSolutions(grid, limit = 2) {
  let best = -1
  let fewest = 10
  for (let i = 0; i < 81; i++) {
    if (grid[i]) continue
    let n = 0
    for (let v = 1; v <= 9; v++) if (canPlace(grid, i, v)) n++
    if (n < fewest) {
      fewest = n
      best = i
      if (n === 0) return 0
    }
  }
  if (best < 0) return 1
  let total = 0
  for (let v = 1; v <= 9 && total < limit; v++) {
    if (!canPlace(grid, best, v)) continue
    grid[best] = v
    total += countSolutions(grid, limit - total)
    grid[best] = 0
  }
  return total
}

export function generateSudoku(levelKey, rng) {
  const level = LEVELS[levelKey]
  if (!level) throw new Error(`Nível desconhecido: ${levelKey}`)
  const solution = Array(81).fill(0)
  fillGrid(solution, rng)
  const puzzle = solution.slice()
  let removed = 0
  for (const i of shuffle([...Array(81).keys()], rng)) {
    if (removed >= level.holes) break
    const keep = puzzle[i]
    puzzle[i] = 0
    if (countSolutions(puzzle.slice(), 2) !== 1) puzzle[i] = keep
    else removed++
  }
  return {
    level: levelKey,
    solution,
    board: puzzle,
    given: puzzle.map((v) => v > 0),
    errors: 0,
    done: false,
  }
}

/** Coloca `n` (0 apaga) na casa `i`. Retorna `{ ok, error, done }`. */
export function placeNumber(state, i, n) {
  if (state.done || state.given[i]) return { ok: false }
  if (n && state.board[i] === n) return { ok: false }
  state.board[i] = n
  const error = !!n && n !== state.solution[i]
  if (error) state.errors++
  state.done = state.board.every((v, k) => v === state.solution[k])
  return { ok: true, error, done: state.done }
}

export const isWrong = (state, i) => !!state.board[i] && state.board[i] !== state.solution[i]

/** Quantas vezes cada número já está correto no tabuleiro (índice 1..9). */
export function correctCounts(state) {
  const counts = Array(10).fill(0)
  state.board.forEach((v, i) => v && v === state.solution[i] && counts[v]++)
  return counts
}

export function sudokuScore(state, seconds) {
  const base = LEVELS[state.level].base
  return Math.max(SUDOKU_SCORE.min, base - seconds * SUDOKU_SCORE.perSecond - state.errors * SUDOKU_SCORE.perError)
}
