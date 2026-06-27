import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

export default function ScrollMarquee({ items, direction = 'left', speed = 0.3 }) {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const distance = 700 * speed
  const start = direction === 'right' ? -distance : 0
  const end = direction === 'right' ? 0 : -distance
  const rawX = useTransform(scrollYProgress, [0, 1], [start, end])
  const x = useSpring(rawX, { stiffness: 80, damping: 24, mass: 0.4 })

  const tripled = [...items, ...items, ...items]
  return (
    <div ref={sectionRef} className="scroll-marquee">
      <motion.div className="scroll-marquee__track" style={{ x: reduce ? 0 : x }}>
        {tripled.map((item, index) => (
          <figure className="scroll-marquee__item" key={`${item.src}-${index}`}>
            <img src={item.src} alt={item.alt} loading="lazy" draggable="false" />
            {item.label && <figcaption>{item.label}</figcaption>}
          </figure>
        ))}
      </motion.div>
    </div>
  )
}
