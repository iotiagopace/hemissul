import { useEffect } from 'react'

/**
 * Eventos de conversão no dataLayer.
 *
 * O GTM em si não é carregado aqui: o container GTM-NGFZ298 sobe pelo snippet
 * no <head> do index.html, como o Google recomenda, para o dataLayer existir
 * antes do React montar. Este componente só acrescenta os eventos de clique.
 *
 * Antes este arquivo injetava o container GTM-5C3GN7RM por JS, após o aceite
 * de cookies. Esse caminho saiu: eram dois containers diferentes e, com o
 * snippet no HTML, o window.dataLayer já existe quando o efeito roda — a
 * injeção nunca aconteceria, virando código morto silencioso.
 */
function trackEvent(event, details = {}) {
  window.dataLayer?.push({ event, ...details })
}

export default function Analytics() {
  useEffect(() => {
    const clickHandler = (event) => {
      const target = event.target.closest('a,button')
      if (!target || !window.dataLayer) return
      const href = target.getAttribute('href') || ''
      if (href.includes('cotacao.me')) trackEvent('start_quote', { destination: href })
      if (href.includes('wa.me')) trackEvent('whatsapp_click', { destination: href })
      if (href.startsWith('tel:')) trackEvent('phone_click', { destination: href })
    }

    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [])

  return null
}
