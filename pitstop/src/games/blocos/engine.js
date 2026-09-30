/**
 * Motor do Blocos Hemissul (peças que caem e fecham linhas).
 * Nome e visual próprios da Hemissul: não usar o nome nem a identidade de
 * jogos de terceiros.
 */
export const BLOCOS = {
  cols: 10,
  rows: 18,
  lineScore: [0, 100, 300, 500, 800],
  softDropPoint: 1,
  fallMs: { start: 650, min: 140, perLine: 25 },
  unit: 'pts',
}

export const SHAPES = [
  [[1, 1, 1, 1]],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
]

const emptyGrid = () => Array.from({ length: BLOCOS.rows }, () => Array(BLOCOS.cols).fill(0))

export function createBlocos(rng) {
  const s = { rng, grid: emptyGrid(), piece: null, score: 0, lines: 0, acc: 0, over: false }
  spawn(s)
  return s
}

export function collides(grid, m, x, y) {
  for (let r = 0; r < m.length; r++)
    for (let c = 0; c < m[r].length; c++) {
      if (!m[r][c]) continue
      const X = x + c
      const Y = y + r
      if (X < 0 || X >= BLOCOS.cols || Y >= BLOCOS.rows) return true
      if (Y >= 0 && grid[Y][X]) return true
    }
  return false
}

export const rotate = (m) => m[0].map((_, i) => m.map((row) => row[i]).reverse())

function spawn(s) {
  const i = Math.floor(s.rng() * SHAPES.length)
  s.piece = { m: SHAPES[i].map((r) => r.slice()), x: 3, y: 0, color: i + 1 }
  if (collides(s.grid, s.piece.m, s.piece.x, s.piece.y)) s.over = true
}

/** Fixa a peça, limpa linhas completas e devolve quantas foram limpas. */
function lock(s) {
  const { m, x, y, color } = s.piece
  m.forEach((row, r) => row.forEach((v, c) => v && y + r >= 0 && (s.grid[y + r][x + c] = color)))
  const kept = s.grid.filter((row) => !row.every(Boolean))
  const cleared = BLOCOS.rows - kept.length
  while (kept.length < BLOCOS.rows) kept.unshift(Array(BLOCOS.cols).fill(0))
  s.grid = kept
  if (cleared) {
    s.lines += cleared
    s.score += BLOCOS.lineScore[cleared]
  }
  spawn(s)
  return cleared
}

function drop(s) {
  if (!collides(s.grid, s.piece.m, s.piece.x, s.piece.y + 1)) {
    s.piece.y++
    return 0
  }
  return lock(s)
}

export function blocosInput(s, key) {
  if (s.over) return s
  const p = s.piece
  if (key === 'left' && !collides(s.grid, p.m, p.x - 1, p.y)) p.x--
  if (key === 'right' && !collides(s.grid, p.m, p.x + 1, p.y)) p.x++
  if (key === 'down') {
    drop(s)
    s.score += BLOCOS.softDropPoint
  }
  if (key === 'rotate') {
    const m = rotate(p.m)
    for (const dx of [0, -1, 1, -2, 2]) {
      if (!collides(s.grid, m, p.x + dx, p.y)) {
        p.m = m
        p.x += dx
        break
      }
    }
  }
  return s
}

export const fallInterval = (s) =>
  Math.max(BLOCOS.fallMs.min, BLOCOS.fallMs.start - s.lines * BLOCOS.fallMs.perLine)

/** Avança `dtMs` milissegundos. */
export function blocosStep(s, dtMs) {
  if (s.over) return s
  s.acc += dtMs
  if (s.acc >= fallInterval(s)) {
    s.acc = 0
    drop(s)
  }
  return s
}

export const blocosScore = (s) => s.score
