import { useEffect, useRef, useState } from 'react'
import { GRADES } from '../../content/cruzadas.js'
import { useClock, clock } from '../useLoop.js'
import { createCruzadas, currentWord, isWordSolved, moveWord, selectCell, solvedCount, typeKey, cruzadasScore } from './engine.js'

const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

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
      const solved = Object.values(cell.words).some((wi) => isWordSolved(s, puzzle.words[wi]))
      const cls = [k === s.cursor ? 'is-cursor' : w.cells.includes(k) ? 'is-word' : '', solved ? 'is-solved' : '', wrong.includes(k) ? 'is-wrong' : ''].join(' ')
      cells.push(
        <button
          key={k}
          type="button"
          className={cls}
          onClick={() => {
            if (paused) return
            selectCell(s, k)
            force((x) => x + 1)
          }}
          aria-label={`Casa ${r + 1}, ${c + 1}${s.entries[k] ? `, letra ${s.entries[k]}` : ''}`}
        >
          {puzzle.numbers[k] && <sup>{puzzle.numbers[k]}</sup>}
          {s.entries[k] || ''}
        </button>,
      )
    }

  return (
    <>
      <div className="clue">
        <button type="button" aria-label="Dica anterior" onClick={() => (moveWord(s, -1), force((x) => x + 1))}>‹</button>
        <p aria-live="polite">
          <b>
            {w.number} {w.dir === 'A' ? 'Horizontal' : 'Vertical'}
          </b>
          {w.clue}
        </p>
        <button type="button" aria-label="Próxima dica" onClick={() => (moveWord(s, 1), force((x) => x + 1))}>›</button>
      </div>
      <div className={`paused-wrap${paused ? ' is-paused' : ''}`}>
        <div className="cgrid" style={{ '--size': puzzle.size }}>
          {cells}
        </div>
        {paused && <div className="paused-label">Pausado</div>}
      </div>
      <p className="hint">
        {solvedCount(s)} de {puzzle.words.length} palavras{s.hints ? ` · ${s.hints} dica${s.hints > 1 ? 's' : ''}` : ''}
      </p>
      <div className="keyboard">
        {ROWS.map((row, i) => (
          <div key={row}>
            {i === 2 && (
              <button type="button" className="wide" onPointerDown={(e) => (e.preventDefault(), press('hint'))}>
                Dica
              </button>
            )}
            {[...row].map((ch) => (
              <button key={ch} type="button" onPointerDown={(e) => (e.preventDefault(), press(ch))}>
                {ch}
              </button>
            ))}
            {i === 2 && (
              <button type="button" className="wide" aria-label="Apagar" onPointerDown={(e) => (e.preventDefault(), press('del'))}>
                Apagar
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
