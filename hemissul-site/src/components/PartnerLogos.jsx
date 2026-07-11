import { useReducedMotion } from 'framer-motion'

/**
 * Carrossel infinito de logos de parceiros (Clube de Benefícios).
 * Passe um array de { src, name }. Com "prefers-reduced-motion" ligado,
 * vira uma grade estática centralizada (sem animação).
 */
export default function PartnerLogos({ logos = [] }) {
  const reduce = useReducedMotion()
  if (!logos.length) return null

  // Duplicamos a lista para o loop parecer contínuo.
  const items = reduce ? logos : [...logos, ...logos]

  return (
    <div
      className={`logo-marquee${reduce ? ' logo-marquee--static' : ''}`}
      role="list"
      aria-label="Parceiros do Clube de Benefícios"
    >
      <div className="logo-marquee__track">
        {items.map((logo, index) => (
          <div
            className="logo-marquee__item"
            role="listitem"
            key={`${logo.name}-${index}`}
            aria-hidden={index >= logos.length ? 'true' : undefined}
          >
            <img src={logo.src} alt={logo.name} loading="lazy" draggable="false" />
          </div>
        ))}
      </div>
    </div>
  )
}
