import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Users, ShieldAlert, Clock3 } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import antesGol from '../assets/antes-depois/antes-gol.jpeg'
import depoisGol from '../assets/antes-depois/depois-gol.jpeg'
import antesOnix from '../assets/antes-depois/antes-onix.jpeg'
import depoisOnix from '../assets/antes-depois/depois-onix.jpeg'
import onixHeader from '../assets/fotos-reais/onix-particular.jpg'

const coberturas = [
  ['Colisão e perda total', 'Conforme critérios do regulamento.'],
  ['Roubo e furto', 'Com busca e localização quando houver rastreador.'],
  ['Danos a terceiros', 'Conforme limite contratado.'],
  ['Assistência 24h', 'Para situações emergenciais previstas no plano.'],
  ['Carro reserva e rastreamento', 'De acordo com o plano contratado.'],
]

// Dores de quem usa o carro no dia a dia da família — apelo emocional, não técnico.
const dores = [
  {
    Icon: Users,
    title: 'É a sua família dentro do carro',
    desc: 'A maior parte dos nossos associados leva filhos para a escola, faz o mercado e viaja no fim de semana com o mesmo veículo. Proteger o carro é proteger a rotina de quem você ama.',
  },
  {
    Icon: ShieldAlert,
    title: 'O medo de roubo não deveria dominar o trajeto',
    desc: 'Com rastreamento e pronta resposta, você acompanha o veículo em tempo real e conta com apoio imediato se algo acontecer no caminho.',
  },
  {
    Icon: Clock3,
    title: 'Um imprevisto não pode parar a sua semana',
    desc: 'Reboque, chaveiro e socorro a qualquer hora, com carro reserva conforme o plano, para você não ficar a pé enquanto o seu carro é reparado.',
  },
]

const reparosParticulares = [
  { key: 'gol', before: antesGol, after: depoisGol },
  { key: 'onix', before: antesOnix, after: depoisOnix },
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
            <p className="page-header__eyebrow">Por que proteger</p>
            <h2 className="home-section__title">
              O carro da família merece esse cuidado.
            </h2>
          </FadeIn>

          <div className="pain-grid">
            {dores.map(({ Icon, title, desc }, index) => (
              <FadeIn
                as="article"
                className="pain-card"
                key={title}
                delay={index * 0.06}
              >
                <Icon className="pain-card__icon" size={26} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <p className="page-header__eyebrow">Reparos feitos com compromisso</p>
            <h2 className="home-section__title">
              Carros de associados, antes e depois.
            </h2>
            <p className="home-section__copy">
              Arraste a imagem para ver o antes e o depois. Cada caso segue os
              limites e as condições do plano contratado.
            </p>
          </FadeIn>

          <div className="results-grid results-grid--pair">
            {reparosParticulares.map((item) => (
              <FadeIn key={item.key}>
                <BeforeAfterSlider
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  alt="Carro particular antes e depois do reparo"
                />
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
