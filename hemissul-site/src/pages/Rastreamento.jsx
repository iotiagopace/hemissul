import { Link } from 'react-router-dom'
import {
  Locate,
  Clock,
  Shield,
  Bell,
  Gauge,
  ArrowRight,
  AlertTriangle,
  Map,
} from 'lucide-react'
import FadeIn from '../components/FadeIn'
import mockup from '../assets/mockups/app-rastreamento.png'
import { SITE } from '../config/site'

const recursos = [
  { title: 'Localização em tempo real', icon: Locate },
  { title: 'Histórico de trajetos', icon: Map },
  { title: 'Controle e alertas de velocidade', icon: Gauge },
  { title: 'Cerca virtual', icon: Shield },
  { title: 'Alerta de ignição', icon: Bell },
  { title: 'Outros recursos compatíveis', icon: Clock },
]

export default function Rastreamento() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Rastreamento veicular</p>
            <h1 className="page-header__title">
              Mais controle sobre a localização do seu veículo.
            </h1>
            <p className="page-header__lede">
              Acesse informações do rastreador em tempo real e acompanhe dados
              importantes da sua rotina pelo sistema disponibilizado pela
              Hemissul.
            </p>
            <div className="home-hero__actions">
              <Link to="/aplicativo" className="button-primary">
                Abrir opções do aplicativo <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a
                href={SITE.phone.responseHref}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
              >
                Suporte de rastreamento
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <figure className="figure-frame figure-frame--auto" style={{ background: 'var(--color-accent-dark)', padding: '2rem' }}>
              <img
                src={mockup}
                alt="Tela do aplicativo de rastreamento Hemissul"
                loading="lazy"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </figure>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">O que você pode acompanhar.</h2>
            <p className="home-section__copy">
              Recursos compatíveis com o equipamento instalado no veículo. A
              disponibilidade pode variar conforme o plano e o modelo.
            </p>
          </FadeIn>

          <div className="channel-grid" style={{ marginTop: '3rem' }}>
            {recursos.map(({ title, icon: Icon }, index) => (
              <FadeIn key={title} delay={index * 0.05}>
                <article className="channel-card" style={{ height: '100%' }}>
                  <span className="channel-card__icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <p className="channel-card__title">{title}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--dark">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p
              className="pill-tag"
              style={{ color: 'var(--color-paper)', borderColor: 'var(--color-ink-rule)' }}
            >
              <AlertTriangle size={14} aria-hidden="true" /> Segurança
            </p>
            <h2 className="home-section__title">
              Rastreamento também apoia a resposta a roubo e furto.
            </h2>
          </FadeIn>

          <FadeIn className="stack--lg" delay={0.1}>
            <p
              className="home-section__copy"
              style={{ color: 'var(--color-ink-subtle)' }}
            >
              Em caso de roubo ou furto, acione imediatamente a polícia, a
              central indicada pela Hemissul e a empresa de rastreamento.{' '}
              <strong style={{ color: 'var(--color-paper)' }}>
                Não tente recuperar o veículo por conta própria.
              </strong>
            </p>
            <Link
              to="/comunicar-evento"
              className="type-link"
              style={{ color: 'var(--color-accent-light)' }}
            >
              Como comunicar o evento{' '}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
