import { Mail } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import VideoEmbed from '../components/VideoEmbed'

export default function TrabalheConosco() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Trabalhe conosco</p>
            <h1 className="page-header__title">Construa uma carreira com impacto.</h1>
            <p className="page-header__lede">
              Nosso crescimento acontece com pessoas que compartilham propósito,
              responsabilidade e vontade de fazer a diferença. Envie seu
              currículo e faça parte da Hemissul.
            </p>
            <a
              href="mailto:contato@hemissul.com.br?subject=Currículo%20-%20Trabalhe%20Conosco"
              className="button-primary"
            >
              <Mail size={18} aria-hidden="true" /> Enviar currículo
            </a>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn>
            <VideoEmbed videoId="LaKNvjELpVM" title="Isso é Hemissul" />
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
