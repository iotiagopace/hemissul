import { useEffect, useRef, useState } from 'react'
import { createRng } from '../../core/rng.js'
import { BRAND, TRAFFIC_TONES } from '../../config/brand.js'
import { useLoop, roundRect } from '../useLoop.js'
import { CORRIDA, createCorrida, corridaInput, corridaStep, corridaScore } from './engine.js'

const { width: W, height: H, lanes, car, playerY } = CORRIDA

function drawCar(ctx, x, y, color, player) {
  ctx.fillStyle = color
  roundRect(ctx, x - car.w / 2, y, car.w, car.h, 10)
  ctx.fill()
  ctx.fillStyle = 'rgba(28,36,65,.55)'
  roundRect(ctx, x - car.w / 2 + 7, y + (player ? 18 : 52), car.w - 14, 18, 5)
  ctx.fill()
  roundRect(ctx, x - car.w / 2 + 7, y + (player ? 60 : 14), car.w - 14, 12, 4)
  ctx.fill()
  if (player) {
    ctx.fillStyle = BRAND.azul
    ctx.font = '700 17px "Neue Montreal", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('H', x, y + 53)
  }
}

export default function Corrida({ paused, onScore, onEnd }) {
  const canvas = useRef(null)
  const state = useRef(null)
  const [running, setRunning] = useState(true)

  if (!state.current) state.current = createCorrida(createRng())

  const draw = () => {
    const ctx = canvas.current?.getContext('2d')
    if (!ctx) return
    const s = state.current
    ctx.fillStyle = BRAND.navy
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = BRAND.azul
    ctx.fillRect(0, 0, 14, H)
    ctx.fillRect(W - 14, 0, 14, H)
    ctx.fillStyle = BRAND.lavanda
    for (let y = -60 + (s.scroll % 60); y < H; y += 60) {
      ctx.fillRect(123, y, 5, 32)
      ctx.fillRect(232, y, 5, 32)
    }
    s.traffic.forEach((t) => drawCar(ctx, lanes[t.lane], t.y, TRAFFIC_TONES[t.tone], false))
    drawCar(ctx, s.x, playerY, BRAND.branco, true)
  }

  useLoop((dt) => {
    const s = state.current
    corridaStep(s, dt)
    onScore(corridaScore(s))
    draw()
    if (s.over) {
      setRunning(false)
      setTimeout(() => onEnd(corridaScore(s)), 350)
    }
  }, running && !paused)

  useEffect(draw, [])

  useEffect(() => {
    const onKey = (e) => {
      const k = { ArrowLeft: 'left', ArrowRight: 'right' }[e.key]
      if (k && !paused) {
        e.preventDefault()
        corridaInput(state.current, k)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paused])

  const press = (k) => !paused && corridaInput(state.current, k)
  const tap = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    press(e.clientX - r.left < r.width / 2 ? 'left' : 'right')
  }

  return (
    <>
      <div className={`paused-wrap${paused ? ' is-paused' : ''}`}>
        <canvas ref={canvas} className="stage" width={W} height={H} onPointerDown={tap} aria-label="Pista da Corrida Hemissul" />
        {paused && <div className="paused-label">Pausado</div>}
      </div>
      <div className="pad">
        <button type="button" aria-label="Faixa da esquerda" onPointerDown={(e) => (e.preventDefault(), press('left'))}>←</button>
        <button type="button" aria-label="Faixa da direita" onPointerDown={(e) => (e.preventDefault(), press('right'))}>→</button>
      </div>
      <p className="hint">Toque do lado esquerdo ou direito da pista para trocar de faixa.</p>
    </>
  )
}
