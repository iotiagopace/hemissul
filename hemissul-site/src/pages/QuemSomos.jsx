import { Link } from 'react-router-dom'
import { ArrowRight, Building2, MapPin, Scale } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import sedeImg from '../assets/fotos-reais/sede-fachada-2.jpg'
import equipeImg from '../assets/fotos-reais/equipe-1.jpg'

const dados = [
  ['Razão social', 'Hemissul — Associação de Proteção Patrimonial Mutualista', Building2],
  ['CNPJ', '35.224.050/0001-37', Scale],
  ['Sede', 'Boa Vista, Roraima', MapPin],
]

export default function QuemSomos() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Quem somos</p>
            <h1 className="page-header__title">
              Uma comunidade criada para levar mais tranquilidade aos caminhos.
            </h1>
            <p className="page-header__lede">
              A Hemissul nasceu em Boa Vista, em 2019, para oferecer proteção
              patrimonial mutualista e suporte próximo aos associados.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <figure className="figure-frame">
              <img src={sedeImg} alt="Fachada da sede da Hemissul em Boa Vista" />
            </figure>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container split">
          <FadeIn>
            <figure className="figure-frame figure-frame--portrait">
              <img src={equipeImg} alt="Equipe Hemissul em atendimento" loading="lazy" />
            </figure>
          </FadeIn>
          <FadeIn className="stack--lg" delay={0.1}>
            <h2 className="home-section__title">
              Crescimento construído com proximidade.
            </h2>
            <p className="home-section__copy">
              Ao longo da trajetória, ampliamos equipe, rede de prestadores e
              canais digitais. Hoje, reunimos mais de 13 mil veículos protegidos
              e atendimento em todo o território nacional.
            </p>
            <p className="home-section__copy">
              Trabalhamos para que cada associado tenha orientação clara,
              acesso aos benefícios contratados e apoio quando surgir um
              imprevisto.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              Proteção patrimonial mutualista, com regras transparentes.
            </h2>
            <p className="home-section__copy">
              A Hemissul é uma associação privada. Os participantes aderem ao
              programa e compartilham custos conforme contrato, regulamento e
              legislação aplicável.
            </p>
          </FadeIn>
          <div className="editorial-list">
            {dados.map(([label, value, Icon], index) => (
              <FadeIn className="editorial-list__item" key={label} delay={index * 0.05}>
                <span className="channel-card__icon">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="editorial-list__title">{label}</h3>
                  <p className="editorial-list__desc">{value}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="site-container closing-section__inner">
          <FadeIn as="h2">Não conte com a sorte. Conte com a Hemissul.</FadeIn>
          <FadeIn delay={0.1}>
            <Link to="/cotacao" className="button-primary">
              Fazer cotação <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
