import { Link } from 'react-router-dom'
import { ArrowRight, Car, Users, Briefcase, MapPin } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import imgParticulares from '../assets/publicos/carros-particulares.png'
import imgApp from '../assets/publicos/motorista-app.png'
import imgFrota from '../assets/publicos/frotistas.png'
import depoisOnix from '../assets/antes-depois/depois-onix.jpeg'

const coberturas = [
  ['Colisão e perda total', 'Conforme critérios do regulamento.'],
  ['Roubo e furto', 'Com busca e localização quando houver rastreador.'],
  ['Danos a terceiros', 'Conforme limite contratado.'],
  ['Assistência 24 h', 'Para situações emergenciais previstas no plano.'],
  ['Carro reserva e rastreamento', 'De acordo com o plano contratado.'],
]

const publicos = [
  {
    title: 'Carros particulares',
    desc: 'Para uso pessoal e familiar com regras claras.',
    image: imgParticulares,
    icon: Car,
  },
  {
    title: 'Motoristas de aplicativo',
    desc: 'Condições específicas para transporte por aplicativo.',
    image: imgApp,
    icon: Users,
  },
  {
    title: 'Frotistas',
    desc: 'Atendimento dedicado para frota corporativa.',
    image: imgFrota,
    icon: Briefcase,
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
              Seu carro protegido para você seguir em frente.
            </h1>
            <p className="page-header__lede">
              Conte com proteção para os principais imprevistos do trânsito,
              assistência 24 horas e atendimento em todo o Brasil.
            </p>
            <div className="home-hero__actions">
              <Link to="/cotacao" className="button-primary">
                Cotar proteção para meu carro{' '}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <figure className="figure-frame">
              <img
                src={depoisOnix}
                alt="Onix após o reparo Hemissul"
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
              Benefícios que acompanham sua rotina.
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
            {publicos.map(({ title, desc, image, icon: Icon }, index) => (
              <FadeIn key={title} delay={index * 0.06}>
                <article className="channel-card" style={{ height: '100%' }}>
                  <figure
                    className="figure-frame"
                    style={{ aspectRatio: '4/3', marginBottom: '0.75rem' }}
                  >
                    <img src={image} alt={title} loading="lazy" />
                  </figure>
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
              <Link to="/cotacao" className="button-primary">
                Começar cotação <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
