import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import depoisGol from '../assets/antes-depois/depois-gol.jpeg'
import depoisHb20 from '../assets/antes-depois/depois-hb20.jpeg'
import depoisS10 from '../assets/antes-depois/depois-s10.jpeg'
import onixHeader from '../assets/fotos-reais/onix-particular.jpg'

const coberturas = [
  ['Colisão e perda total', 'Conforme critérios do regulamento.'],
  ['Roubo e furto', 'Com busca e localização quando houver rastreador.'],
  ['Danos a terceiros', 'Conforme limite contratado.'],
  ['Assistência 24h', 'Para situações emergenciais previstas no plano.'],
  ['Carro reserva e rastreamento', 'De acordo com o plano contratado.'],
]

const publicos = [
  {
    title: 'Carros particulares',
    desc: 'Para uso pessoal e familiar com regras claras.',
    image: depoisGol,
    alt: 'Gol após reparo registrado no acervo real da Hemissul',
  },
  {
    title: 'Motoristas de aplicativo',
    desc: 'Condições específicas para transporte por aplicativo.',
    image: depoisHb20,
    alt: 'HB20 após reparo registrado no acervo real da Hemissul',
  },
  {
    title: 'Frotistas',
    desc: 'Atendimento dedicado para frota corporativa.',
    image: depoisS10,
    alt: 'S10 após reparo registrado no acervo real da Hemissul',
  },
]

export default function ProtecaoCarros() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Para carros</p>
            <h1 className="page-header__title">
              Proteção para o seu carro particular.
            </h1>
            <p className="page-header__lede">
              Conte com proteção para os principais imprevistos do trânsito,
              assistência 24 horas e atendimento em todo o Brasil.
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
                src={onixHeader}
                alt="Carro particular protegido pela Hemissul"
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
              O que o plano do seu carro cobre.
            </h2>
            <p className="home-section__copy">
              O plano para carros reúne os benefícios mais utilizados pelos
              associados em situações reais.
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
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              Proteção para diferentes usos do veículo.
            </h2>
            <p className="home-section__copy">
              A aceitação e as condições podem variar. Informe o uso correto na
              cotação para receber a proposta adequada.
            </p>
          </FadeIn>

          <div className="channel-grid" style={{ marginTop: '3rem' }}>
            {publicos.map(({ title, desc, image, alt }, index) => (
              <FadeIn key={title} delay={index * 0.06}>
                <article className="channel-card" style={{ height: '100%' }}>
                  <figure
                    className="figure-frame"
                    style={{ aspectRatio: '4/3', marginBottom: '0.75rem' }}
                  >
                    <img src={image} alt={alt} loading="lazy" />
                  </figure>
                  <p className="page-header__eyebrow">Registro real Hemissul</p>
                  <p className="channel-card__title">{title}</p>
                  <p className="channel-card__desc">{desc}</p>
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
              <MapPin size={14} aria-hidden="true" /> Atendimento
            </p>
            <h2 className="home-section__title">
              Faça uma cotação para o seu carro.
            </h2>
          </FadeIn>

          <FadeIn className="stack--lg" delay={0.1}>
            <p
              className="home-section__copy"
              style={{ color: 'var(--color-ink-subtle)' }}
            >
              Informe modelo, ano, cidade e uso do veículo. A equipe Hemissul
              apresenta as opções disponíveis e explica cada condição.
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
