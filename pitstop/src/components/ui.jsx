import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { track, EVENTS } from '../core/tracking.js'

export function Header({ onCharge, chargeLabel, chargePct }) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <img
          className="topbar__logo"
          src={`${import.meta.env.BASE_URL}brand/logo-azul.png`}
          alt="Hemissul Proteção Veicular"
          width="108"
          height="36"
        />
        <button
          type="button"
          className="charge"
          onClick={onCharge}
          aria-label="Definir tempo de carga"
        >
          <span className="charge__bar" aria-hidden="true">
            <i style={{ width: `${chargePct}%` }} />
          </span>
          {chargeLabel}
        </button>
      </div>
    </header>
  )
}

/** Dialog nativo: contém o foco, torna o fundo inerte e devolve o foco ao fechar. */
export function Sheet({ children, onClose, label }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const dialog = ref.current
    const previous = document.activeElement
    dialog.showModal()
    return () => {
      dialog.close()
      if (previous?.isConnected) previous.focus({ preventScroll: true })
    }
  }, [])
  useEffect(() => {
    ref.current?.querySelector('.sheet__content')?.focus()
    if (ref.current) ref.current.scrollTop = 0
  }, [label])
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])
  return createPortal(
    <dialog
      className="scrim"
      ref={ref}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault()
        onClose?.()
      }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="sheet">
        <div className="sheet__top">
          <span className="eyebrow">Pitstop Hemissul</span>
          {onClose && (
            <button
              type="button"
              className="sheet__close"
              aria-label="Fechar"
              onClick={onClose}
            >
              ×
            </button>
          )}
        </div>
        <div className="sheet__content" tabIndex={-1}>
          {children}
        </div>
      </div>
    </dialog>,
    document.body,
  )
}

/** Fala do personagem da marca. Trocar o símbolo por ilustração quando existir. */
export function Bubble({ children }) {
  return (
    <div className="bubble">
      <img src={`${import.meta.env.BASE_URL}brand/simbolo-azul.png`} alt="" width="40" height="40" />
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
  if (!left) return { label: 'Tempo encerrado', pct: 100, start }
  const m = Math.floor(left / 60000)
  const s = Math.floor((left % 60000) / 1000)
  return { label: `Faltam ${m}:${String(s).padStart(2, '0')}`, pct, start }
}
