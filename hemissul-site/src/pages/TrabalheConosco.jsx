import { Mail, Users, Target, Handshake, TrendingUp } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import VideoEmbed from '../components/VideoEmbed'
import equipe from '../assets/fotos-reais/equipe-2.jpg'

const valores = [
  ['Entusiasmo com propósito', 'Energia direcionada para proteger pessoas e apoiar associados.', Target],
  ['Integridade', 'Decisões responsáveis, comunicação clara e respeito às regras.', Handshake],
  ['Mentalidade de crescimento', 'Aprendizado contínuo e disposição para melhorar.', TrendingUp],
  ['Relacionamento saudável', 'Colaboração, respeito e proximidade em cada contato.', Users],
]

export default function TrabalheConosco() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Trabalhe conosco</p>
            <h1 className="page-header__title">Construa uma carreira com impacto.</h1>
            <p className="page-header__lede">
              Nosso crescimento acontece com pessoas que compartilham propósito,
              responsabilidade e vontade de fazer a diferença.
            </p>
            <a
              href="mailto:contato@hemissul.com.br?subject=Currículo%20-%20Trabalhe%20Conosco"
              className="button-primary"
            >
              <Mail size={18} aria-hidden="true" /> Enviar currículo
            </a>
          </FadeIn>
          <FadeIn delay={0.1}>
            <figure className="figure-frame">
              <img src={equipe} alt="Equipe Hemissul reunida" />
            </figure>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container split">
          <FadeIn>
            <VideoEmbed videoId="LaKNvjELpVM" title="Isso é Hemissul" />
          </FadeIn>
          <div className="editorial-list">
            {valores.map(([title, desc, Icon], index) => (
              <FadeIn key={title} className="editorial-list__item" delay={index * 0.06}>
                <span className="channel-card__icon"><Icon size={18} aria-hidden="true" /></span>
                <div>
                  <h2 className="editorial-list__title">{title}</h2>
                  <p className="editorial-list__desc">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
