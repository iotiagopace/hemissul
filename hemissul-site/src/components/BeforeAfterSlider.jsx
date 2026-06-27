import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Antes',
  afterLabel = 'Depois',
  alt = 'Comparação antes e depois',
}) {
  const containerRef = useRef(null)
  const [position, setPosition] = useState(50)

  const updatePosition = useCallback((clientX) => {
    const node = containerRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, next)))
  }, [])

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    updatePosition(event.clientX)
  }

  const handlePointerMove = (event) => {
    if (event.buttons !== 1 && event.pointerType !== 'touch') return
    if (event.pointerType === 'touch') event.preventDefault()
    updatePosition(event.clientX)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      setPosition((current) => Math.max(0, current - 4))
      event.preventDefault()
    } else if (event.key === 'ArrowRight') {
      setPosition((current) => Math.min(100, current + 4))
      event.preventDefault()
    } else if (event.key === 'Home') {
      setPosition(0)
      event.preventDefault()
    } else if (event.key === 'End') {
      setPosition(100)
      event.preventDefault()
    }
  }

  return (
    <figure
      ref={containerRef}
      className="before-after"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <img
        src={afterSrc}
        alt={`${alt} — depois`}
        loading="lazy"
        draggable="false"
        className="before-after__image"
      />
      <div
        className="before-after__overlay"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden="true"
      >
        <img
          src={beforeSrc}
          alt=""
          loading="lazy"
          draggable="false"
          className="before-after__image"
        />
      </div>

      <span className="before-after__label before-after__label--left">
        {beforeLabel}
      </span>
      <span className="before-after__label before-after__label--right">
        {afterLabel}
      </span>

      <motion.button
        type="button"
        className="before-after__handle"
        style={{ left: `${position}%` }}
        onKeyDown={handleKeyDown}
        aria-label="Arraste para revelar antes e depois"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        role="slider"
        whileTap={{ scale: 1.06 }}
      >
        <span className="before-after__line" aria-hidden="true" />
        <span className="before-after__knob" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 3 12 9 6" />
            <polyline points="15 6 21 12 15 18" />
          </svg>
        </span>
      </motion.button>
    </figure>
  )
}
