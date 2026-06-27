import { useEffect } from 'react'
import { CONSENT_KEY, SITE } from '../config/site'

function installGtm() {
  if (window.dataLayer || !SITE.analytics.gtmId) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${SITE.analytics.gtmId}`
  document.head.appendChild(script)
}

function trackEvent(event, details = {}) {
  window.dataLayer?.push({ event, ...details })
}

export default function Analytics() {
  useEffect(() => {
    if (window.localStorage.getItem(CONSENT_KEY) === 'accepted') installGtm()

    const consentHandler = () => installGtm()
    const clickHandler = (event) => {
      const target = event.target.closest('a,button')
      if (!target || !window.dataLayer) return
      const href = target.getAttribute('href') || ''
      if (href.includes('cotacao.me')) trackEvent('start_quote', { destination: href })
      if (href.includes('wa.me')) trackEvent('whatsapp_click', { destination: href })
      if (href.startsWith('tel:')) trackEvent('phone_click', { destination: href })
    }

    window.addEventListener('hemissul:consent', consentHandler)
    document.addEventListener('click', clickHandler)
    return () => {
      window.removeEventListener('hemissul:consent', consentHandler)
      document.removeEventListener('click', clickHandler)
    }
  }, [])

  return null
}
