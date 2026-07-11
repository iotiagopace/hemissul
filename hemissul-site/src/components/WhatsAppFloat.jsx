import { WhatsappIcon } from './SocialIcons'
import { SITE } from '../config/site'

export default function WhatsAppFloat() {
  const message = encodeURIComponent(
    'Olá, vim pelo site e quero saber mais sobre a proteção veicular Hemissul.',
  )

  return (
    <a
      className="whatsapp-float"
      href={`${SITE.phone.quoteHref}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Hemissul pelo WhatsApp"
    >
      <span className="whatsapp-float__pulse" aria-hidden="true" />
      <WhatsappIcon size={28} />
      <span className="whatsapp-float__label">Fale conosco</span>
    </a>
  )
}
