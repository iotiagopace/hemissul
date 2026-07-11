import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/**
 * Palavras/frases que se alternam com animação — reforço de palavras-chave
 * para indexação (SEO). Todas as palavras ficam no DOM (sr-only), então o
 * Google lê todas; visualmente apenas uma aparece por vez.
 */
export default function RotatingWords({ words = [], interval = 2200 }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce || words.length < 2) return undefined
    const id = window.setInterval(
      () => setIndex((v) => (v + 1) % words.length),
      interval,
    )
    return () => window.clearInterval(id)
  }, [reduce, words.length, interval])

  if (!words.length) return null

  return (
    <span className="rotating-words">
      {/* SEO: todas as palavras-chave presentes no HTML */}
      <span className="sr-only">{words.join(' · ')}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className="rotating-words__word"
          aria-hidden="true"
          initial={{ opacity: 0, y: '0.5em' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-0.5em' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {reduce ? words[0] : words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
