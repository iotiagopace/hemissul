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

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y, scale, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-48px', amount: 0.12 }}
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
