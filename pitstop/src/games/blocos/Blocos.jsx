import { useEffect, useRef, useState } from 'react'
import { createRng } from '../../core/rng.js'
import { BRAND, BLOCK_TONES } from '../../config/brand.js'
import { useLoop } from '../useLoop.js'
import { BLOCOS, createBlocos, blocosInput, blocosStep, blocosScore } from './engine.js'

const SZ = 28
const W = BLOCOS.cols * SZ
const H = BLOCOS.rows * SZ

export default function Blocos({ paused, onScore, onEnd }) {
  const canvas = useRef(null)
  const state = useRef(null)
  const [running, setRunning] = useState(true)
  if (!state.current) state.current = createBlocos(createRng())

  const draw = () => {
    const ctx = canvas.current?.getContext('2d')
    if (!ctx) return
    const s = state.current
    ctx.fillStyle = BRAND.branco
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = BRAND.lavanda
    for (let x = 0; x <= BLOCOS.cols; x++) {
      ctx.beginPath()
      ctx.moveTo(x * SZ, 0)
      ctx.lineTo(x * SZ, H)
      ctx.stroke()
    }
    const cell = (x, y, i) => {
      ctx.fillStyle = BLOCK_TONES[i - 1]
      ctx.fillRect(x * SZ + 1, y * SZ + 1, SZ - 2, SZ - 2)
    }
    s.grid.forEach((row, y) => row.forEach((v, x) => v && cell(x, y, v)))
    if (!s.over) s.piece.m.forEach((row, r) => row.forEach((v, c) => v && s.piece.y + r >= 0 && cell(s.piece.x + c, s.piece.y + r, s.piece.color)))
  }

  const finish = () => {
    setRunning(false)
    setTimeout(() => onEnd(blocosScore(state.current)), 350)
  }

  useLoop((dt) => {
    blocosStep(state.current, dt * 1000)
    onScore(blocosScore(state.current))
    draw()
    if (state.current.over) finish()
  }, running && !paused)

  useEffect(draw, [])

  const press = (k) => {
    if (paused || state.current.over) return
    blocosInput(state.current, k)
    onScore(blocosScore(state.current))
    draw()
    if (state.current.over) finish()
  }

  useEffect(() => {
    const onKey = (e) => {
      const k = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'rotate', ArrowDown: 'down' }[e.key]
      if (k) {
        e.preventDefault()
        press(k)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const btn = (k, label, text) => (
    <button type="button" aria-label={label} onPointerDown={(e) => (e.preventDefault(), press(k))}>
      {text}
    </button>
  )

  return (
    <>
      <div className={`paused-wrap${paused ? ' is-paused' : ''}`}>
        <canvas ref={canvas} className="stage" width={W} height={H} aria-label="Tabuleiro do Blocos Hemissul" style={{ border: `2px solid ${BRAND.navy}` }} />
        {paused && <div className="paused-label">Pausado</div>}
      </div>
      <div className="pad" style={{ '--cols': 4 }}>
        {btn('left', 'Mover para a esquerda', '←')}
        {btn('rotate', 'Girar peça', '⟳')}
        {btn('right', 'Mover para a direita', '→')}
        {btn('down', 'Descer peça', '↓')}
      </div>
      <p className="hint">Mova, gire e desça as peças para fechar linhas.</p>
    </>
  )
}
