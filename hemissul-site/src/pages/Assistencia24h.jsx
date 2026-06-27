import { Phone, AlertTriangle, Wrench, Truck, Key, Fuel, Zap } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const servicos = [
  { title: 'Pane elétrica ou mecânica', icon: Zap },
  { title: 'Reboque', desc: 'Quando o veículo não puder se locomover.', icon: Truck },
  { title: 'Troca de pneu', icon: Wrench },
  { title: 'Chaveiro automotivo', icon: Key },
  { title: 'Falta de combustível', icon: Fuel },
]

const passos = [
  ['Nome e CPF do associado', 'Para confirmar a vinculação ao programa.'],
  ['Placa e modelo do veículo', 'Identificação rápida do bem atendido.'],
  ['Localização exata', 'Endereço, ponto de referência ou coordenada.'],
  ['Descrição do problema', 'Conte o que aconteceu para orientar o atendimento.'],
  ['Telefone para retorno', 'Mantenha o aparelho acessível.'],
]

export default function Assistencia24h() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Assistência 24 h</p>
            <h1 className="page-header__title">
              Precisou de assistência? Estamos disponíveis 24 horas.
            </h1>
            <p className="page-header__lede">
              Ligue para 0800 940 2163 e informe seus dados, a localização do
              veículo e o que aconteceu. A equipe orienta cada passo.
            </p>
            <div className="home-hero__actions">
              <a href="tel:08009402163" className="button-primary">
                <Phone size={18} aria-hidden="true" /> Ligar 0800 940 2163
              </a>
              <a
                href="https://wa.me/5595991574355"
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
              >
                Pronta resposta no WhatsApp
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="stack--lg">
            <div className="channel-card" style={{ background: 'var(--color-paper-2)' }}>
              <span className="channel-card__icon">
                <Phone size={18} aria-hidden="true" />
              </span>
              <p className="channel-card__title">Atendimento nacional</p>
              <p className="channel-card__desc">
                A central recebe ligações 24 horas, todos os dias, em qualquer
                estado do Brasil.
              </p>
            </div>
            <div className="channel-card" style={{ background: 'var(--color-paper-2)' }}>
              <span className="channel-card__icon">
                <AlertTriangle size={18} aria-hidden="true" />
              </span>
              <p className="channel-card__title">Em caso de risco</p>
              <p className="channel-card__desc">
                Se houver pessoas feridas ou risco no local, acione antes os
                serviços públicos de emergência.
              </p>
            </div>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              Situações em que a assistência pode ajudar.
            </h2>
            <p className="home-section__copy">
              Os serviços, limites, quilometragem, quantidade de utilizações e
              exclusões dependem do plano e do regulamento vigente.
            </p>
          </FadeIn>

          <div className="channel-grid" style={{ marginTop: '3rem' }}>
            {servicos.map(({ title, desc, icon: Icon }, index) => (
              <FadeIn key={title} delay={index * 0.05}>
                <article className="channel-card" style={{ height: '100%' }}>
                  <span className="channel-card__icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <p className="channel-card__title">{title}</p>
                  {desc && <p className="channel-card__desc">{desc}</p>}
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">Tenha estas informações em mãos.</h2>
            <p className="home-section__copy">
              Com elas, o atendente direciona o atendimento mais rápido.
            </p>
          </FadeIn>

          <div className="editorial-list">
            {passos.map(([title, desc], index) => (
              <FadeIn
                key={title}
                className="editorial-list__item"
                delay={index * 0.05}
              >
                <span className="editorial-list__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="editorial-list__title">{title}</h3>
                  <p className="editorial-list__desc">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="site-container closing-section__inner">
          <FadeIn as="h2">Salve o número da assistência no celular.</FadeIn>
          <FadeIn delay={0.1}>
            <a href="tel:08009402163" className="button-primary">
              <Phone size={18} aria-hidden="true" /> 0800 940 2163
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
