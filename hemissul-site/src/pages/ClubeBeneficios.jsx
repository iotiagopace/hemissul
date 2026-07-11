import { Link } from 'react-router-dom'
import { ArrowRight, BadgePercent } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import capa from '../assets/clube/capa.png'

import servEnsino from '../assets/clube/servicos/ensino.jpg'
import servFarmacia from '../assets/clube/servicos/farmacia.jpg'
import servAcademia from '../assets/clube/servicos/academia.jpg'
import servOficina from '../assets/clube/servicos/oficina.jpg'

import logoEstacio from '../assets/clube/parceiros/estacio.png'
import logoUnicesumar from '../assets/clube/parceiros/unicesumar.png'
import logoFarmaFormula from '../assets/clube/parceiros/farma-formula.jpg'
import logoSantoRemedio from '../assets/clube/parceiros/santo-remedio.webp'
import logoRondobras from '../assets/clube/parceiros/rondobras.png'
import logoAprovar from '../assets/clube/parceiros/aprovar-mais.png'
import logoLeticia from '../assets/clube/parceiros/leticia-kerolly.jpg'
import logoBfCarnes from '../assets/clube/parceiros/bf-carnes.jpg'
import logoOip from '../assets/clube/parceiros/oip.jpg'
import logoGasparzinho from '../assets/clube/parceiros/gasparzinho.jpg'
import logoMigos from '../assets/clube/parceiros/migos.png'
import logoChilli from '../assets/clube/parceiros/chilli.jpg'

const categorias = [
  {
    label: 'Educação e idiomas',
    desc: 'Faculdades, cursos e escolas parceiras com desconto para você e sua família.',
    img: servEnsino,
  },
  {
    label: 'Farmácias e saúde',
    desc: 'Medicamentos, manipulados e cuidados com preços especiais.',
    img: servFarmacia,
  },
  {
    label: 'Academia e estética',
    desc: 'Bem-estar, beleza e qualidade de vida com condições exclusivas.',
    img: servAcademia,
  },
  {
    label: 'Oficinas e autopeças',
    desc: 'Manutenção, peças e serviços para manter seu veículo em dia.',
    img: servOficina,
  },
]

const parceiros = [
  { name: 'Estácio', src: logoEstacio },
  { name: 'UniCesumar', src: logoUnicesumar },
  { name: 'Farma Fórmula', src: logoFarmaFormula },
  { name: 'Santo Remédio', src: logoSantoRemedio },
  { name: 'Rondobras Autopeças', src: logoRondobras },
  { name: 'Aprovar+', src: logoAprovar },
  { name: 'Letícia Kerolly Estética', src: logoLeticia },
  { name: 'B&F Carnes', src: logoBfCarnes },
  { name: 'OIP', src: logoOip },
  { name: 'Gasparzinho', src: logoGasparzinho },
  { name: 'Migos Donuts', src: logoMigos },
  { name: 'Chilli Mexican Food', src: logoChilli },
]

export default function ClubeBeneficios() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Clube de Benefícios</p>
            <h1 className="page-header__title">
              Vantagens que vão além do seu veículo.
            </h1>
            <p className="page-header__lede">
              Descontos de até 40% em saúde, educação, bem-estar e serviços
              automotivos — exclusivos para associados Hemissul.
            </p>
            <Link to="/aplicativo" className="button-cta">
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

      <section className="page-section page-section--paper clube-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              Economia em diferentes momentos da rotina.
            </h2>
            <p className="home-section__copy">
              Categorias com parceiros locais e nacionais. Consulte o aplicativo
              antes de utilizar cada benefício.
            </p>
          </FadeIn>

          <div className="service-grid">
            {categorias.map((cat, index) => (
              <FadeIn key={cat.label} delay={index * 0.06}>
                <article className="service-card">
                  <div className="service-card__media">
                    <img src={cat.img} alt={cat.label} loading="lazy" />
                  </div>
                  <div className="service-card__body">
                    <span className="service-card__tag">
                      <BadgePercent size={15} aria-hidden="true" /> Benefício
                    </span>
                    <h3>{cat.label}</h3>
                    <p>{cat.desc}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section clube-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">Parceiros do Clube.</h2>
            <p className="home-section__copy">
              Marcas que oferecem condições especiais aos associados. A relação
              completa e as regras de uso ficam no aplicativo.
            </p>
          </FadeIn>

          <div className="partner-logo-grid">
            {parceiros.map((partner, index) => (
              <FadeIn
                key={partner.name}
                className="partner-logo-cell"
                delay={index * 0.03}
                title={partner.name}
              >
                <img src={partner.src} alt={partner.name} loading="lazy" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="site-container closing-section__inner">
          <FadeIn as="h2">Vantagens que cabem no seu dia a dia.</FadeIn>
          <FadeIn delay={0.1}>
            <Link to="/cotacao" className="button-cta">
              Quero ser associado <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
