import { useReducedMotion } from 'framer-motion'

/**
 * Carrossel de auto-rolagem contínua (não depende do scroll da página).
 * Anda sozinho da direita para a esquerda em loop infinito e pausa no hover.
 * Com reduced-motion, vira uma faixa estática rolável.
 */
export default function AutoMarquee({ items = [], seconds = 40, className = '' }) {
  const reduce = useReducedMotion()
  if (!items.length) return null

  const list = reduce ? items : [...items, ...items]

  return (
    <div className={`auto-marquee ${className}`.trim()}>
      <ul
        className="auto-marquee__track"
        style={reduce ? undefined : { animationDuration: `${seconds}s` }}
      >
        {list.map((item, index) => (
          <li
            className="auto-marquee__item"
            key={`${item.src}-${index}`}
            aria-hidden={index >= items.length ? 'true' : undefined}
          >
            <figure>
              <img
                src={item.src}
                alt={item.alt || ''}
                loading="lazy"
                draggable="false"
                width="225"
                height="300"
              />
              {item.label && <figcaption>{item.label}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
    </div>
  )
}
