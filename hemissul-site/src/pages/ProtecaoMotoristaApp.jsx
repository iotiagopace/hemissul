import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import motoristaApp from '../assets/fotos-reais/motorista-app-real.jpg'

const coberturas = [
  ['Colisão, roubo, furto e perda total', 'Conforme o regulamento e o plano contratado.'],
  ['Assistência 24h', 'Guincho, chaveiro e apoio na estrada a qualquer hora.'],
  ['Carro reserva', 'Para você não ficar parado enquanto o veículo é reparado.'],
  ['Rastreamento', 'Localização e recuperação em caso de roubo ou furto.'],
]

export default function ProtecaoMotoristaApp() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Para motoristas de aplicativo</p>
            <h1 className="page-header__title">
              Seu carro é seu ganha-pão. Proteja quem trabalha rodando.
            </h1>
            <p className="page-header__lede">
              Uber, 99, entregas ou transporte por app: quem passa o dia no
              trânsito corre mais risco. A Hemissul cobre colisão, roubo e furto
              com assistência 24 horas em todo o Brasil.
            </p>
            <div className="home-hero__actions">
              <Link to="/cotacao" className="button-cta">
                Cotar proteção para meu carro{' '}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <figure className="figure-frame">
              <img
                src={motoristaApp}
                alt="Motorista de aplicativo dirigindo pela cidade"
                loading="lazy"
              />
            </figure>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              Proteção para quem depende do carro para trabalhar.
            </h2>
            <p className="home-section__copy">
              Rodar mais horas significa mais exposição a batidas e imprevistos.
              O plano acompanha o ritmo de quem dirige por app.
            </p>
          </FadeIn>

          <div className="editorial-list">
            {coberturas.map(([title, desc], index) => (
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

      <section className="page-section">
        <div className="site-container split split--start">
          <FadeIn>
            <h2 className="home-section__title">
              Categoria de uso conta na hora da cotação.
            </h2>
          </FadeIn>
          <FadeIn className="stack--lg" delay={0.1}>
            <p className="home-section__copy">
              Informe que o carro roda por aplicativo. Assim a equipe monta uma
              proposta certa para o seu uso, sem surpresa depois.
            </p>
            <Link to="/contato" className="type-link">
              Falar com um consultor <ArrowRight size={17} aria-hidden="true" />
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
              <MapPin size={14} aria-hidden="true" /> Atendimento
            </p>
            <h2 className="home-section__title">
              Faça uma cotação para o seu carro de app.
            </h2>
          </FadeIn>

          <FadeIn className="stack--lg" delay={0.1}>
            <p
              className="home-section__copy"
              style={{ color: 'var(--color-ink-subtle)' }}
            >
              Modelo, ano, cidade e uso por aplicativo. A equipe responde com as
              opções e explica cada condição.
            </p>
            <div className="home-hero__actions">
              <Link to="/cotacao" className="button-cta">
                Começar cotação <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
