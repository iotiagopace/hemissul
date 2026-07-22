import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Info } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import caminhaoEstrada from '../assets/fotos-reais/caminhao-estrada-unsplash.jpg'

const oferta = [
  ['Controle multi-veículo', 'Cadastre e acompanhe toda a frota em um único contrato.'],
  ['Rede de assistência 24h', 'Cobertura nacional para reboque, chaveiro, socorro elétrico e mecânico.'],
  ['Rastreamento veicular', 'Monitoramento em tempo real, alertas e histórico de trajetos.'],
  ['Atendimento dedicado', 'Consultor comercial e suporte para gestores de frota.'],
]

export default function ProtecaoFrotas() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Frotas e empresas</p>
            <h1 className="page-header__title">
              Múltiplos veículos, um único ponto de controle.
            </h1>
            <p className="page-header__lede">
              Proteção pensada para operações com mais de um veículo, como locadoras,
              transportadoras, empresas com frota própria e grupos de proprietários.
              Falamos com o gestor, entendemos a rotina e propomos condições
              coerentes com o seu volume.
            </p>
            <div className="home-hero__actions">
              <Link to="/cotacao" className="button-cta">
                Solicitar cotação para frota{' '}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <figure className="figure-frame">
              <img
                src={caminhaoEstrada}
                alt="Frota de veículos em movimento na estrada"
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
              O que a proteção de frota inclui.
            </h2>
            <p className="home-section__copy">
              Base do programa. Coberturas específicas variam conforme o plano
              contratado e o regulamento.
            </p>
          </FadeIn>

          <div className="editorial-list">
            {oferta.map(([title, desc], index) => (
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
        <div className="site-container split">
          <FadeIn className="number-statement">
            <strong>24h</strong>
            <span>de assistência com atendimento dedicado para gestores.</span>
          </FadeIn>

          <FadeIn className="stack--lg" delay={0.1}>
            <p className="pill-tag pill-tag--accent">
              <Info size={14} aria-hidden="true" /> Consultoria personalizada
            </p>
            <h2 className="home-section__title">Fale com a equipe comercial.</h2>
            <p className="home-section__copy">
              Antes da adesão, alinhamos o perfil da frota, os tipos de veículo,
              rotas, uso e eventos incluídos. Assim propomos um plano coerente
              com o seu volume e a sua operação.
            </p>
            <Link to="/contato" className="type-link">
              Falar com a equipe <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="closing-section">
        <div className="site-container closing-section__inner">
          <FadeIn as="h2">Vamos proteger a sua frota?</FadeIn>
          <FadeIn delay={0.1}>
            <Link to="/cotacao" className="button-cta">
              <Building2 size={18} aria-hidden="true" /> Solicitar cotação
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
