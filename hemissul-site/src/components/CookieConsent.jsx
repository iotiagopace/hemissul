import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CONSENT_KEY } from '../config/site'

function loadMarketingScripts() {
  if (document.querySelector('script[data-hemissul-marketing]')) return
  const script = document.createElement('script')
  script.async = true
  script.dataset.hemissulMarketing = 'true'
  script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-NGFZ298'
  document.head.appendChild(script)
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(
    () => window.localStorage.getItem(CONSENT_KEY) === null,
  )

  useEffect(() => {
    document.body.classList.toggle('cookie-open', visible)
    if (!visible && window.localStorage.getItem(CONSENT_KEY) === 'accepted') {
      loadMarketingScripts()
    }
    return () => document.body.classList.remove('cookie-open')
  }, [visible])

  const choose = (value) => {
    window.localStorage.setItem(CONSENT_KEY, value)
    setVisible(false)
    // O Consent Mode entra negado por padrão no index.html. Só o "Aceitar
    // opcionais" libera a medição; "Somente necessários" não precisa de nada,
    // o padrão já é o estado negado.
    if (value === 'accepted') {
      window.gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      })
      loadMarketingScripts()
    }
  }

  if (!visible) return null

  return (
    <aside className="cookie-consent" aria-label="Preferências de cookies">
      <div>
        <strong>Sua privacidade importa.</strong>
        <p>
          Usamos cookies opcionais para medir o desempenho do site. Você pode
          recusar sem perder as funções essenciais. <Link to="/cookies">Saiba mais</Link>.
        </p>
      </div>
      <div className="cookie-consent__actions">
        <button type="button" className="button-secondary" onClick={() => choose('necessary')}>
          Somente necessários
        </button>
        <button type="button" className="button-primary" onClick={() => choose('accepted')}>
          Aceitar opcionais
        </button>
      </div>
    </aside>
  )
}
