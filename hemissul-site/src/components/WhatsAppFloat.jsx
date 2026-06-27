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
      <WhatsappIcon size={24} />
      <span>Fale conosco</span>
    </a>
  )
}
