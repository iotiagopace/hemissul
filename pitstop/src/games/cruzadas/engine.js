/**
 * Motor das Palavras cruzadas.
 * Uma grade é definida em src/content/cruzadas.js como lista de palavras com
 * posição (linha, coluna), direção ('A' horizontal, 'D' vertical) e dica.
 * Letras sempre em maiúsculas e sem acento na grade.
 */
export const CRUZADAS_SCORE = { base: 2000, perSecond: 2, perHint: 100, min: 100, unit: 'pts' }

const key = (r, c) => `${r},${c}`

/** Valida e monta a grade. Lança erro se duas palavras discordarem numa casa. */
export function buildPuzzle(def) {
  const cells = {}
  const starts = new Set()
  def.words.forEach((w, wi) => {
    ;[...w.answer].forEach((ch, i) => {
      const k = key(w.row + (w.dir === 'D' ? i : 0), w.col + (w.dir === 'A' ? i : 0))
      if (cells[k] && cells[k].letter !== ch)
        throw new Error(`Conflito em ${k}: ${cells[k].letter} x ${ch} (${w.answer})`)
      cells[k] = cells[k] || { letter: ch, words: {} }
      cells[k].words[w.dir] = wi
    })
    starts.add(key(w.row, w.col))
  })
  const numbers = {}
  let n = 0
  for (let r = 0; r < def.size; r++)
    for (let c = 0; c < def.size; c++) if (starts.has(key(r, c))) numbers[key(r, c)] = ++n
  const words = def.words.map((w) => ({
    ...w,
    number: numbers[key(w.row, w.col)],
    cells: [...w.answer].map((_, i) => key(w.row + (w.dir === 'D' ? i : 0), w.col + (w.dir === 'A' ? i : 0))),
  }))
  const order = words
    .map((_, i) => i)
    .sort((a, b) =>
      words[a].dir === words[b].dir ? words[a].number - words[b].number : words[a].dir === 'A' ? -1 : 1,
    )
  return { id: def.id, size: def.size, cells, numbers, words, order }
}

export function createCruzadas(def) {
  const puzzle = buildPuzzle(def)
  const first = puzzle.words[puzzle.order[0]]
  return { puzzle, entries: {}, cursor: first.cells[0], dir: first.dir, hints: 0, done: false }
}

export const currentWord = (s) => s.puzzle.words[s.puzzle.cells[s.cursor].words[s.dir]]
export const isWordSolved = (s, w) => w.cells.every((k) => s.entries[k] === s.puzzle.cells[k].letter)
export const solvedCount = (s) => s.puzzle.words.filter((w) => isWordSolved(s, w)).length
const allSolved = (s) => Object.keys(s.puzzle.cells).every((k) => s.entries[k] === s.puzzle.cells[k].letter)

/** Toque numa casa: seleciona; tocar de novo alterna horizontal/vertical. */
export function selectCell(s, k) {
  const cell = s.puzzle.cells[k]
  if (!cell) return s
  if (s.cursor === k) {
    const other = s.dir === 'A' ? 'D' : 'A'
    if (cell.words[other] != null) s.dir = other
  } else {
    s.cursor = k
    if (cell.words[s.dir] == null) s.dir = s.dir === 'A' ? 'D' : 'A'
  }
  return s
}

/** Vai para a próxima (+1) ou anterior (-1) palavra ainda não resolvida. */
export function moveWord(s, step) {
  const { order, words } = s.puzzle
  let j = order.indexOf(s.puzzle.cells[s.cursor].words[s.dir])
  for (let t = 0; t < order.length; t++) {
    j = (j + step + order.length) % order.length
    if (!isWordSolved(s, words[order[j]])) break
  }
  const w = words[order[j]]
  s.dir = w.dir
  s.cursor = w.cells.find((k) => s.entries[k] !== s.puzzle.cells[k].letter) || w.cells[0]
  return s
}

/**
 * Digita uma letra (A-Z), 'del' para apagar ou 'hint' para revelar a casa.
 * Retorna `{ wordFilledWrong, wordSolved, done }` para a interface reagir.
 */
export function typeKey(s, input) {
  if (s.done) return { done: true }
  const w = currentWord(s)
  const i = w.cells.indexOf(s.cursor)
  if (input === 'del') {
    if (s.entries[s.cursor]) delete s.entries[s.cursor]
    else if (i > 0) {
      s.cursor = w.cells[i - 1]
      delete s.entries[s.cursor]
    }
    return {}
  }
  if (input === 'hint') {
    const letter = s.puzzle.cells[s.cursor].letter
    if (s.entries[s.cursor] !== letter) {
      s.entries[s.cursor] = letter
      s.hints++
    }
  } else if (/^[A-Z]$/.test(input)) {
    s.entries[s.cursor] = input
  } else return {}

  if (i < w.cells.length - 1) s.cursor = w.cells[i + 1]
  const filled = w.cells.every((k) => s.entries[k])
  const wordSolved = isWordSolved(s, w)
  s.done = allSolved(s)
  if (wordSolved && !s.done) moveWord(s, 1)
  return { wordFilledWrong: filled && !wordSolved, wordSolved, wrongCells: filled && !wordSolved ? w.cells : [], done: s.done }
}

export function cruzadasScore(s, seconds) {
  const { base, perSecond, perHint, min } = CRUZADAS_SCORE
  return Math.max(min, base - seconds * perSecond - s.hints * perHint)
}
