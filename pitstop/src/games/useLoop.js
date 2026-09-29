import { useEffect, useRef } from 'react'

/** requestAnimationFrame com dt em segundos. Para quando `running` é false. */
export function useLoop(callback, running) {
  const cb = useRef(callback)
  cb.current = callback
  useEffect(() => {
    if (!running) return
    let raf = 0
    let last = 0
    const frame = (t) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0
      last = t
      cb.current(dt)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [running])
}

/** Relógio em segundos inteiros, pausável. */
export function useClock(running, onTick) {
  const tick = useRef(onTick)
  tick.current = onTick
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => tick.current(), 1000)
    return () => clearInterval(id)
  }, [running])
}

export const clock = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

export function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
