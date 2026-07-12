import { Link } from 'react-router-dom'
import { ArrowRight, BadgePercent } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import capa from '../assets/clube/capa.png'

import servEnsino from '../assets/clube/servicos/ensino.jpg'
import servFarmacia from '../assets/clube/servicos/farmacia.jpg'
import servAcademia from '../assets/clube/servicos/academia.jpg'
import servOficina from '../assets/clube/servicos/oficina.jpg'

import logoSkyfit from '../assets/clube/parceiros/skyfit-academia.webp'
import logoVolkswagen from '../assets/clube/parceiros/volkswagen.webp'
import logoEstacio from '../assets/clube/parceiros/estacio.webp'
import logoUnicesumar from '../assets/clube/parceiros/unicesumar.webp'
import logoAprovar from '../assets/clube/parceiros/aprovar-mais.webp'
import logoHapvida from '../assets/clube/parceiros/hapvida.webp'
import logoSantoRemedio from '../assets/clube/parceiros/santoremedio.webp'
import logoNmOficina from '../assets/clube/parceiros/nm-oficina-mecanica.webp'
import logoAcare from '../assets/clube/parceiros/acare-autopecas.webp'
import logoBrasilAuto from '../assets/clube/parceiros/brasil-auto-pecas.webp'
import logoBrunoMoto from '../assets/clube/parceiros/bruno-moto-pecas.webp'
import logoAmazonPneus from '../assets/clube/parceiros/amazon-pneus-manaus.webp'
import logoObjetiva from '../assets/clube/parceiros/objetiva-estetica-automotiva.webp'
import logoGaspartinho from '../assets/clube/parceiros/gaspartinho-sound-car.webp'
import logoGrupoTotal from '../assets/clube/parceiros/grupo-total.webp'
import logoBvLocadora from '../assets/clube/parceiros/bv-locadora.webp'
import logoCrosby from '../assets/clube/parceiros/crosby.webp'
import logoMigo from '../assets/clube/parceiros/migo-donuts.webp'
import logoLoveSports from '../assets/clube/parceiros/love-sports.webp'
import logoJetfast from '../assets/clube/parceiros/jetfast.webp'
import logoBfCarnes from '../assets/clube/parceiros/bf-carnes.webp'
import logoDraHelen from '../assets/clube/parceiros/dra-helen-pereira.webp'
import logoDraAria from '../assets/clube/parceiros/dra-aria-claudia-cavalcante.webp'

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
  { name: 'SkyFit Academia', src: logoSkyfit },
  { name: 'Volkswagen', src: logoVolkswagen },
  { name: 'Estácio', src: logoEstacio },
  { name: 'UniCesumar', src: logoUnicesumar },
  { name: 'Aprovar+', src: logoAprovar },
  { name: 'Hapvida', src: logoHapvida },
  { name: 'Santo Remédio', src: logoSantoRemedio },
  { name: 'NM Oficina Mecânica', src: logoNmOficina },
  { name: 'Açaré Autopeças', src: logoAcare },
  { name: 'Brasil Auto Peças', src: logoBrasilAuto },
  { name: 'Bruno Moto Peças', src: logoBrunoMoto },
  { name: 'Amazon Pneus Manaus', src: logoAmazonPneus },
  { name: 'Objetiva Estética Automotiva', src: logoObjetiva },
  { name: 'Gaspartinho Sound Car', src: logoGaspartinho },
  { name: 'Grupo Total', src: logoGrupoTotal },
  { name: 'BV Locadora', src: logoBvLocadora },
  { name: 'Crosby', src: logoCrosby },
  { name: 'Migo Donuts', src: logoMigo },
  { name: 'Love Sports', src: logoLoveSports },
  { name: 'Jetfast', src: logoJetfast },
  { name: 'B&F Carnes', src: logoBfCarnes },
  { name: 'Dra. Helen Pereira', src: logoDraHelen },
  { name: 'Dra. Aria Claudia Cavalcante', src: logoDraAria },
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
              automotivos, exclusivos para associados Hemissul.
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
          <FadeIn as="h2">Faça sua cotação e comece a usar o clube.</FadeIn>
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
