import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.25,
  })

  if (reduce) return null

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
