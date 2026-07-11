import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Título do hero com revelação cinematográfica palavra por palavra
 * (blur + escala + slide), inspirada em heros premium. Usa o Framer Motion
 * que já existe no projeto — sem dependências novas. Respeita reduced-motion
 * e mantém o texto acessível (aria-label no h1, spans aria-hidden).
 */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
}

const wordVariant = {
  hidden: { opacity: 0, y: '0.55em', filter: 'blur(14px)', scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function HeroHeadline({ text, className }) {
  const reduce = useReducedMotion()

  if (reduce || !text) {
    return <h1 className={className}>{text}</h1>
  }

  const words = String(text).split(' ')

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <motion.span
            variants={wordVariant}
            aria-hidden="true"
            style={{ display: 'inline-block', willChange: 'transform, filter' }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </motion.h1>
  )
}
