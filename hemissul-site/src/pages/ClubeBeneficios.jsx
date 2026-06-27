import { Link } from 'react-router-dom'
import { ArrowRight, BadgePercent, CheckCircle2 } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import capa from '../assets/clube/capa.png'
import ensino from '../assets/clube/ensino.png'
import farmacias from '../assets/clube/farmacias.png'
import estetica from '../assets/clube/estetica.png'
import oficinas from '../assets/clube/oficinas.png'

const categorias = [
  ['Ensino bilíngue', ensino],
  ['Farmácias', farmacias],
  ['Salões e estética', estetica],
  ['Oficinas e autopeças', oficinas],
]

const parceiros = ['Sky Fit Ville Roy', 'Farma Fórmula', 'Santo Remédio', 'OIP', 'B&F Carnes', 'Gasparzinho']

export default function ClubeBeneficios() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Clube de Benefícios</p>
            <h1 className="page-header__title">Vantagens que acompanham o associado além do veículo.</h1>
            <p className="page-header__lede">
              Condições especiais em saúde, educação, bem-estar e serviços
              automotivos, com descontos que podem chegar a 40%.
            </p>
            <Link to="/aplicativo" className="button-primary">
              Consultar benefícios no app <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <figure className="figure-frame figure-frame--wide">
              <img src={capa} alt="Clube de Benefícios Hemissul" />
            </figure>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">Economia em diferentes momentos da rotina.</h2>
            <p className="home-section__copy">
              Parceiros, percentuais e condições podem mudar. Consulte o
              aplicativo antes de utilizar cada benefício.
            </p>
          </FadeIn>
          <div className="benefit-category-grid">
            {categorias.map(([title, image], index) => (
              <FadeIn key={title} delay={index * 0.06}>
                <figure className="benefit-category">
                  <img src={image} alt="" loading="lazy" />
                  <figcaption><BadgePercent size={18} aria-hidden="true" /> {title}</figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container split split--start">
          <FadeIn>
            <h2 className="home-section__title">Parceiros divulgados pela Hemissul.</h2>
            <p className="home-section__copy">
              A relação completa e as regras de uso ficam disponíveis nos canais oficiais.
            </p>
          </FadeIn>
          <div className="partner-list">
            {parceiros.map((partner, index) => (
              <FadeIn key={partner} className="partner-list__item" delay={index * 0.04}>
                <CheckCircle2 size={18} aria-hidden="true" /> {partner}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
