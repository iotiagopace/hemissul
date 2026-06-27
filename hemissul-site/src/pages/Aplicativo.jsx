import { ArrowRight, Smartphone, Receipt, MapPin, Bell, Gift, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import VideoEmbed from '../components/VideoEmbed'
import StoreBadges from '../components/StoreBadges'
import AppMockupStory from '../components/AppMockupStory'
import mockupRastreio from '../assets/mockups/app-rastreamento.png'

const recursos = [
  { title: 'Boletos digitais', desc: 'Acesso e segunda via em qualquer hora.', icon: Receipt },
  { title: 'Assistência 24 h', desc: 'Solicitação rápida e acompanhamento.', icon: Bell },
  { title: 'Vantagens e benefícios', desc: 'Clube de descontos para o associado.', icon: Gift },
  { title: 'Bases e oficinas', desc: 'Rede credenciada com endereço e contato.', icon: MapPin },
  { title: 'Comunicação de eventos', desc: 'Abertura de chamados em poucos passos.', icon: MessageSquare },
  { title: 'Cotação e adesão on-line', desc: 'Simulação direta para você e quem indicar.', icon: Smartphone },
]

export default function Aplicativo() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Aplicativo Hemissul</p>
            <h1 className="page-header__title">A Hemissul no seu celular.</h1>
            <p className="page-header__lede">
              Acesse serviços, informações do plano e canais de atendimento em
              um só lugar. Entre com seu CPF e a senha fornecida pela Hemissul.
            </p>
            <StoreBadges />
          </FadeIn>

          <FadeIn delay={0.1}>
            <VideoEmbed
              videoId="qC25dUJfqyQ"
              title="Conheça o aplicativo Hemissul"
            />
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              O que você encontra no aplicativo.
            </h2>
            <p className="home-section__copy">
              Recursos pensados para resolver o dia a dia do associado em poucos
              toques.
            </p>
          </FadeIn>

          <div className="channel-grid" style={{ marginTop: '3rem' }}>
            {recursos.map(({ title, desc, icon: Icon }, index) => (
              <FadeIn key={title} delay={index * 0.05}>
                <article className="channel-card" style={{ height: '100%' }}>
                  <span className="channel-card__icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <p className="channel-card__title">{title}</p>
                  <p className="channel-card__desc">{desc}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container">
          <AppMockupStory />
          <FadeIn className="app-access-note">
            <div>
              <strong>Primeiro acesso</strong>
              <span>Entre com seu CPF e a senha fornecida pela Hemissul.</span>
            </div>
            <Link to="/contato" className="type-link">
              Preciso de ajuda para acessar{' '}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="page-section page-section--dark">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p
              className="pill-tag"
              style={{ color: 'var(--color-paper)', borderColor: 'var(--color-ink-rule)' }}
            >
              Rastreamento
            </p>
            <h2 className="home-section__title">
              O rastreio do seu veículo na palma da mão.
            </h2>
            <p
              className="home-section__copy"
              style={{ color: 'var(--color-ink-subtle)' }}
            >
              Acompanhe localização, histórico de trajetos, cerca virtual e
              alertas pelo aplicativo de rastreamento Hemissul.
            </p>
            <Link
              to="/rastreamento-veicular"
              className="type-link"
              style={{ color: 'var(--color-accent-light)' }}
            >
              Saber mais sobre o rastreamento{' '}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              className="figure-frame figure-frame--auto"
              style={{
                background: 'var(--color-paper-bright)',
                padding: '2rem',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <img
                src={mockupRastreio}
                alt="Tela do aplicativo de rastreamento Hemissul"
                loading="lazy"
                style={{ maxHeight: '28rem', width: 'auto' }}
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
