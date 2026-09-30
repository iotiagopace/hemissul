import { useEffect, useRef, useState } from 'react'
import { GRADES } from '../../content/cruzadas.js'
import { useClock, clock } from '../useLoop.js'
import {
  createCruzadas,
  currentWord,
  isWordSolved,
  moveWord,
  selectCell,
  solvedCount,
  typeKey,
  cruzadasScore,
} from './engine.js'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/** Escolhe a grade da semana (gira pelas grades cadastradas). */
function gradeDaSemana() {
  const week = Math.floor(Date.now() / (7 * 24 * 3600 * 1000))
  return GRADES[week % GRADES.length]
}

export default function Cruzadas({ paused, onScore, onEnd }) {
  const state = useRef(null)
  if (!state.current) state.current = createCruzadas(gradeDaSemana())
  const [seconds, setSeconds] = useState(0)
  const [wrong, setWrong] = useState([])
  const [, force] = useState(0)
  const s = state.current
  const { puzzle } = s

  useEffect(() => onScore('0:00', 'Cruzadas'), [])
  useClock(!paused && !s.done, () =>
    setSeconds((x) => {
      onScore(clock(x + 1), 'Cruzadas')
      return x + 1
    }),
  )

  const press = (k) => {
    if (paused || s.done) return
    const r = typeKey(s, k)
    if (r.wordFilledWrong) {
      setWrong(r.wrongCells)
      setTimeout(() => setWrong([]), 700)
    }
    force((x) => x + 1)
    if (r.done) setTimeout(() => onEnd(cruzadasScore(s, seconds)), 450)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault()
        press(e.key.toUpperCase())
      } else if (e.key === 'Backspace') {
        e.preventDefault()
        press('del')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const w = currentWord(s)
  const cells = []
  for (let r = 0; r < puzzle.size; r++)
    for (let c = 0; c < puzzle.size; c++) {
      const k = `${r},${c}`
      const cell = puzzle.cells[k]
      if (!cell) {
        cells.push(<div key={k} />)
        continue
      }
      const solved = Object.values(cell.words).some((wi) =>
        isWordSolved(s, puzzle.words[wi]),
      )
      const cls = [
        k === s.cursor ? 'is-cursor' : w.cells.includes(k) ? 'is-word' : '',
        solved ? 'is-solved' : '',
        wrong.includes(k) ? 'is-wrong' : '',
      ].join(' ')
      cells.push(
        <span key={k} className={cls}>
          {puzzle.numbers[k] && <sup>{puzzle.numbers[k]}</sup>}
          {s.entries[k] || ''}
        </span>,
      )
    }

  return (
    <>
      <div className="clue">
        <button
          type="button"
          aria-label="Dica anterior"
          disabled={paused}
          onClick={() => (moveWord(s, -1), force((x) => x + 1))}
        >
          ‹
        </button>
        <p aria-live="polite">
          <b>
            {w.number} {w.dir === 'A' ? 'Horizontal' : 'Vertical'}
          </b>
          {w.clue}
        </p>
        <button
          type="button"
          aria-label="Próxima dica"
          disabled={paused}
          onClick={() => (moveWord(s, 1), force((x) => x + 1))}
        >
          ›
        </button>
      </div>
      <details className="crossword-map" open>
        <summary>Grade completa</summary>
        <div className={`paused-wrap${paused ? ' is-paused' : ''}`}>
          <div
            className="cgrid"
            aria-hidden="true"
            style={{ '--size': puzzle.size }}
          >
            {cells}
          </div>
          {paused && <div className="paused-label">Pausado</div>}
        </div>
      </details>
      <p className="hint" aria-live="polite">
        {solvedCount(s)} de {puzzle.words.length} palavras
        {s.hints ? ` · ${s.hints} dica${s.hints > 1 ? 's' : ''}` : ''}
      </p>
      <div
        className="word-entry"
        role="group"
        aria-label="Casas da palavra atual"
      >
        {w.cells.map((k, i) => (
          <button
            key={k}
            type="button"
            disabled={paused}
            className={k === s.cursor ? 'is-current' : ''}
            aria-pressed={k === s.cursor}
            aria-label={`Letra ${i + 1}${s.entries[k] ? `, ${s.entries[k]}` : ', vazia'}`}
            onClick={() => {
              if (s.cursor !== k) selectCell(s, k)
              force((x) => x + 1)
            }}
          >
            {s.entries[k] || <span aria-hidden="true">·</span>}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {wrong.length
          ? 'Confira as letras da palavra. Há uma resposta incorreta.'
          : ''}
      </p>
      <div className="keyboard" role="group" aria-label="Teclado de letras">
        {[...LETTERS].map((ch) => (
          <button
            key={ch}
            type="button"
            disabled={paused}
            onClick={() => press(ch)}
          >
            {ch}
          </button>
        ))}
        <button
          type="button"
          className="wide"
          disabled={paused}
          onClick={() => press('hint')}
        >
          Dica
        </button>
        <button
          type="button"
          className="wide"
          disabled={paused}
          onClick={() => press('del')}
        >
          Apagar
        </button>
      </div>
    </>
  )
}
