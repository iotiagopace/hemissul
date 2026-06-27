import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const PHOTO_DURATION_MS = 5000

export default function HeroMedia({
  photoSrc,
  photoAlt,
  videoSrc,
  videoPoster,
  caption,
}) {
  const reduce = useReducedMotion()
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef(null)
  const figureRef = useRef(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    if (reduce) return
    const id = setTimeout(() => setShowVideo(true), PHOTO_DURATION_MS)
    return () => clearTimeout(id)
  }, [reduce])

  useEffect(() => {
    const node = figureRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setInView(entry.isIntersecting)
      },
      { threshold: 0.25 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (showVideo && inView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [showVideo, inView])

  const handleVideoEnded = () => {
    setShowVideo(false)
    setTimeout(() => setShowVideo(true), PHOTO_DURATION_MS)
  }

  return (
    <figure ref={figureRef} className="home-hero__figure">
      <div className="hero-media">
        <AnimatePresence initial={false}>
          {!showVideo && (
            <motion.img
              key="photo"
              src={photoSrc}
              alt={photoAlt}
              width="1920"
              height="1280"
              fetchPriority="high"
              className="hero-media__layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          {showVideo && !reduce && (
            <motion.video
              key="video"
              ref={videoRef}
              className="hero-media__layer"
              src={videoSrc}
              poster={videoPoster}
              autoPlay
              muted
              playsInline
              preload="metadata"
              onEnded={handleVideoEnded}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </AnimatePresence>
      </div>

      {caption && (
        <figcaption className="home-hero__caption">{caption}</figcaption>
      )}
    </figure>
  )
}
