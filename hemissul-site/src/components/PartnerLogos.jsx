import { useReducedMotion } from 'framer-motion'

/**
 * Carrossel infinito de logos de parceiros (Clube de Benefícios).
 * Passe um array de { src, name }. Com "prefers-reduced-motion" ligado,
 * vira uma grade estática centralizada (sem animação).
 *
 * O loop anima o trilho em -50% e reinicia, então METADE do trilho precisa
 * ser mais larga que o container — com poucas logos (ex.: 4 no teaser da
 * Home) a sequência-base é repetida até cobrir telas largas, senão o
 * carrossel "corre e não volta" (abre um vão vazio antes de reiniciar).
 */
const MIN_ITEMS_PER_HALF = 14

export default function PartnerLogos({ logos = [] }) {
  const reduce = useReducedMotion()
  if (!logos.length) return null

  const repeats = Math.max(1, Math.ceil(MIN_ITEMS_PER_HALF / logos.length))
  const half = Array.from({ length: repeats }, () => logos).flat()
  // Duplicamos a metade para o loop de -50% parecer contínuo.
  const items = reduce ? logos : [...half, ...half]

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
