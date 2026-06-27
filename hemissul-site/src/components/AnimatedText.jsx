import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

function AnimatedChar({ char, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} aria-hidden="true">
      {char}
    </motion.span>
  )
}

export default function AnimatedText({ children, className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.4'],
  })

  if (reduce) {
    return <p className={`animated-text ${className}`}>{children}</p>
  }

  const text = String(children)
  const chars = Array.from(text)
  const step = 1 / chars.length

  return (
    <p ref={ref} className={`animated-text ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="animated-text__inner">
        {chars.map((char, index) => {
          const start = index * step
          const end = Math.min(1, start + step * 4)
          return (
            <AnimatedChar
              key={`${char}-${index}`}
              char={char}
              progress={scrollYProgress}
              range={[start, end]}
            />
          )
        })}
      </span>
    </p>
  )
}
