import { motion, useReducedMotion } from 'framer-motion'

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 48,
  scale = 0.985,
  as = 'div',
  className,
  once = true,
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  const compactMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 39.999rem)').matches
  const entranceY = compactMotion ? Math.min(y, 28) : y
  const entranceX = compactMotion
    ? Math.sign(x) * Math.min(Math.abs(x), 20)
    : x

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        x: entranceX,
        y: entranceY,
        scale: compactMotion ? 0.995 : scale,
        filter: compactMotion ? 'blur(0px)' : 'blur(8px)',
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{
        once,
        margin: compactMotion ? '0px 0px -24px 0px' : '-48px',
        amount: compactMotion ? 0.04 : 0.12,
      }}
      transition={{
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
