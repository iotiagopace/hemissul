import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

function StackedCard({ children, index, total, progress }) {
  const targetScale = 1 - (total - 1 - index) * 0.04
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <motion.div
      className="sticky-stack__card"
      style={{
        scale,
        top: `calc(var(--space-2xl) + ${index * 22}px)`,
      }}
    >
      {children}
    </motion.div>
  )
}

export default function StickyStack({ children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const cards = Array.isArray(children) ? children : [children]

  if (reduce) {
    return (
      <div className="sticky-stack sticky-stack--static">
        {cards.map((card, index) => (
          <div className="sticky-stack__card" key={index}>
            {card}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className="sticky-stack">
      {cards.map((card, index) => (
        <StackedCard
          key={index}
          index={index}
          total={cards.length}
          progress={scrollYProgress}
        >
          {card}
        </StackedCard>
      ))}
    </div>
  )
}
