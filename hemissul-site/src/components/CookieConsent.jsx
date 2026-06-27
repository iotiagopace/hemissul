import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CONSENT_KEY } from '../config/site'

export default function CookieConsent() {
  const [visible, setVisible] = useState(
    () => window.localStorage.getItem(CONSENT_KEY) === null,
  )

  const choose = (value) => {
    window.localStorage.setItem(CONSENT_KEY, value)
    setVisible(false)
    if (value === 'accepted') window.dispatchEvent(new Event('hemissul:consent'))
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
