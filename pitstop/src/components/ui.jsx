import { useEffect, useRef, useState } from 'react'
import { track, EVENTS } from '../core/tracking.js'

export function Header({ onCharge, chargeLabel, chargePct }) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <img className="topbar__logo" src="/brand/logo-azul.png" alt="Hemissul Proteção Veicular" width="108" height="36" />
        <button type="button" className="charge" onClick={onCharge} aria-label="Definir tempo de carga">
          <span className="charge__bar" aria-hidden="true">
            <i style={{ width: `${chargePct}%` }} />
          </span>
          {chargeLabel}
        </button>
      </div>
    </header>
  )
}

/** Bottom sheet modal. Foca o primeiro controle ao abrir. */
export function Sheet({ children, onClose, label }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.querySelector('input, button')?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="scrim" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={label} ref={ref}>
        {children}
      </div>
    </div>
  )
}

/** Fala do personagem da marca. Trocar o símbolo por ilustração quando existir. */
export function Bubble({ children }) {
  return (
    <div className="bubble">
      <img src="/brand/simbolo-azul.png" alt="" width="40" height="40" />
      <p>{children}</p>
    </div>
  )
}

/** Contador do carregamento: o motorista informa quanto falta. */
export function useChargeTimer() {
  const [charge, setCharge] = useState(null)
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    if (!charge) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [charge])
  const start = (minutes) => {
    setCharge({ end: Date.now() + minutes * 60000, total: minutes * 60000 })
    setNow(Date.now())
    track(EVENTS.chargeTimer, { minutes })
  }
  if (!charge) return { label: 'Tempo de carga', pct: 0, start }
  const left = Math.max(0, charge.end - now)
  const pct = Math.min(100, 100 * (1 - left / charge.total))
  if (!left) return { label: 'Carga concluída', pct: 100, start }
  const m = Math.floor(left / 60000)
  const s = Math.floor((left % 60000) / 1000)
  return { label: `Faltam ${m}:${String(s).padStart(2, '0')}`, pct, start }
}
