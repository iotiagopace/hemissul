import { useMemo, useState } from 'react'
import { createRng } from '../../core/rng.js'
import { useClock, clock } from '../useLoop.js'
import {
  LEVELS,
  generateSudoku,
  placeNumber,
  isWrong,
  correctCounts,
  sudokuScore,
} from './engine.js'

export default function Sudoku({ paused, onScore, onEnd }) {
  const [game, setGame] = useState(null)
  const [sel, setSel] = useState(-1)
  const [seconds, setSeconds] = useState(0)
  const [, force] = useState(0)

  useClock(!!game && !paused && !game.done, () =>
    setSeconds((s) => {
      onScore(
        `${clock(s + 1)}`,
        `${LEVELS[game.level].label} · ${game.errors} erro${game.errors === 1 ? '' : 's'}`,
      )
      return s + 1
    }),
  )

  const start = (level) => {
    const g = generateSudoku(level, createRng())
    setGame(g)
    setSel(g.given.indexOf(false))
    setSeconds(0)
    onScore('0:00', `${LEVELS[level].label} · 0 erros`)
  }

  const counts = useMemo(
    () => (game ? correctCounts(game) : []),
    [game, game?.board.join('')],
  )

  if (!game) {
    return (
      <div className="levels">
        <h2 className="section-title">Escolha o nível</h2>
        {Object.entries(LEVELS).map(([key, l]) => (
          <button
            key={key}
            type="button"
            className="btn btn--option"
            disabled={paused}
            onClick={() => start(key)}
          >
            {l.label}
            <small>
              {l.estimate} · até {l.base.toLocaleString('pt-BR')} pontos
            </small>
          </button>
        ))}
      </div>
    )
  }

  const put = (n) => {
    if (paused || sel < 0) return
    const r = placeNumber(game, sel, n)
    if (!r.ok) return
    force((x) => x + 1)
    onScore(
      clock(seconds),
      `${LEVELS[game.level].label} · ${game.errors} erro${game.errors === 1 ? '' : 's'}`,
    )
    if (r.done) setTimeout(() => onEnd(sudokuScore(game, seconds)), 400)
  }

  const sr = Math.floor(sel / 9)
  const sc = sel % 9
  const sv = game.board[sel]

  return (
    <>
      <div className={`paused-wrap${paused ? ' is-paused' : ''}`}>
        <div
          className="board-scroll"
          role="region"
          aria-label="Tabuleiro de Sudoku, deslize para ver as nove colunas"
          tabIndex={0}
        >
          <div className="sgrid">
            {game.board.map((v, i) => {
              const r = Math.floor(i / 9)
              const c = i % 9
              const peer =
                i !== sel &&
                (r === sr ||
                  c === sc ||
                  (Math.floor(r / 3) === Math.floor(sr / 3) &&
                    Math.floor(c / 3) === Math.floor(sc / 3)))
              const cls = [
                c === 2 || c === 5 ? 'b-r' : '',
                r === 2 || r === 5 ? 'b-b' : '',
                game.given[i] ? 'is-given' : '',
                isWrong(game, i) ? 'is-wrong' : '',
                i === sel ? 'is-selected' : peer ? 'is-peer' : '',
                i !== sel && sv && v === sv ? 'is-same' : '',
              ].join(' ')
              return (
                <button
                  key={i}
                  type="button"
                  className={cls}
                  disabled={paused}
                  aria-pressed={i === sel}
                  aria-invalid={isWrong(game, i)}
                  onClick={() => !paused && setSel(i)}
                  aria-label={`Linha ${r + 1}, coluna ${c + 1}${v ? `, ${v}` : ', vazia'}`}
                >
                  {v || ''}
                </button>
              )
            })}
          </div>
        </div>
        {paused && <div className="paused-label">Pausado</div>}
      </div>
      <div className="pad numpad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            type="button"
            disabled={paused}
            aria-label={`Preencher com ${n}`}
            className={counts[n] >= 9 ? 'is-complete' : ''}
            onClick={() => put(n)}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          className="erase"
          disabled={paused}
          onClick={() => put(0)}
        >
          Apagar
        </button>
      </div>
      <p className="hint">
        Deslize o tabuleiro para ver as nove colunas. Toque em uma casa e
        escolha o número.
      </p>
    </>
  )
}
