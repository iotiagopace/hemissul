import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlertTriangle, ArrowRight, Pause, Play } from 'lucide-react'
import RotatingWords from './RotatingWords'
import HeroHeadline from './HeroHeadline'

function HeroAction({ action, className }) {
  if (!action) return null

  if (action.href) {
    return (
      <a
        className={className}
        href={action.href}
        target={action.external ? '_blank' : undefined}
        rel={action.external ? 'noopener noreferrer' : undefined}
      >
        {action.label} <ArrowRight size={18} aria-hidden="true" />
      </a>
    )
  }

  return (
    <Link className={className} to={action.to}>
      {action.label} <ArrowRight size={18} aria-hidden="true" />
    </Link>
  )
}

export default function HomeHero({ slides }) {
  const reduceMotion = useReducedMotion()
  const videoRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [clock, setClock] = useState(() => Date.now())
  const visibleSlides = useMemo(
    () =>
      slides.filter(
        (slide) =>
          slide.enabled !== false &&
          (!slide.expiresAt || clock < new Date(slide.expiresAt).getTime()),
      ),
    [clock, slides],
  )
  const activeSlide = visibleSlides[activeIndex] || visibleSlides[0]
  const hasMultipleSlides = visibleSlides.length > 1

  useEffect(() => {
    const nextExpiration = slides
      .filter((slide) => slide.enabled !== false && slide.expiresAt)
      .map((slide) => new Date(slide.expiresAt).getTime())
      .filter((timestamp) => timestamp > clock)
      .sort((a, b) => a - b)[0]

    if (!nextExpiration) return undefined

    const timeout = window.setTimeout(
      () => setClock(Date.now()),
      Math.min(nextExpiration - Date.now() + 100, 2_147_483_647),
    )

    return () => window.clearTimeout(timeout)
  }, [clock, slides])

  useEffect(() => {
    if (activeIndex >= visibleSlides.length) setActiveIndex(0)
  }, [activeIndex, visibleSlides.length])

  useEffect(() => {
    if (!hasMultipleSlides || reduceMotion || paused) return undefined

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % visibleSlides.length)
    }, 9000)

    return () => window.clearInterval(interval)
  }, [
    activeIndex,
    hasMultipleSlides,
    paused,
    reduceMotion,
    visibleSlides.length,
  ])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (paused) {
      video.pause()
      return
    }

    video.play().catch(() => {})
  }, [activeIndex, paused])

  const togglePlayback = () => {
    setPaused((current) => !current)
  }

  if (!activeSlide) return null

  return (
    <section
      className="home-banner"
      role="region"
      aria-roledescription={hasMultipleSlides ? 'carrossel' : undefined}
      aria-label="Destaque Hemissul"
      style={{
        '--hero-media-position': activeSlide.mediaPosition,
        '--hero-media-position-mobile':
          activeSlide.mediaPositionMobile || activeSlide.mediaPosition,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="home-banner__media"
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          {activeSlide.type === 'video' && !reduceMotion ? (
            <video
              ref={videoRef}
              src={activeSlide.src}
              poster={activeSlide.poster}
              autoPlay
              muted
              loop={!hasMultipleSlides}
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={activeSlide.poster || activeSlide.src}
              alt=""
              width="1920"
              height="1080"
              fetchPriority="high"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="home-banner__veil" aria-hidden="true" />

      <div className="site-container home-banner__inner">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="home-banner__content"
            key={`${activeSlide.id}-content`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="home-banner__eyebrow">
              {activeSlide.rotatingWords ? (
                <RotatingWords words={activeSlide.rotatingWords} />
              ) : (
                activeSlide.eyebrow
              )}
            </p>
            <HeroHeadline key={`${activeSlide.id}-title`} text={activeSlide.title} />
            <p className="home-banner__description">{activeSlide.description}</p>
            <div className="home-banner__actions">
              <HeroAction
                action={activeSlide.primaryAction}
                className="home-banner__primary"
              />
              <HeroAction
                action={activeSlide.secondaryAction}
                className="home-banner__secondary"
              />
            </div>
            {activeSlide.emergencyAction ? (
              <Link
                to={activeSlide.emergencyAction.to}
                className="home-banner__emergency"
              >
                <AlertTriangle size={16} aria-hidden="true" />
                <span>{activeSlide.emergencyAction.label}</span>
              </Link>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="site-container home-banner__controls">
        {hasMultipleSlides && (
          <div className="home-banner__pagination" aria-label="Selecionar destaque">
            {visibleSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                aria-label={`Exibir destaque ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}

        {(hasMultipleSlides || activeSlide.type === 'video') && !reduceMotion && (
          <button
            type="button"
            className="home-banner__playback"
            onClick={togglePlayback}
            aria-label={
              paused
                ? 'Reproduzir destaques da Home'
                : 'Pausar destaques da Home'
            }
          >
            {paused ? (
              <Play size={17} aria-hidden="true" />
            ) : (
              <Pause size={17} aria-hidden="true" />
            )}
            <span>{paused ? 'Reproduzir' : 'Pausar'}</span>
          </button>
        )}
      </div>
    </section>
  )
}
