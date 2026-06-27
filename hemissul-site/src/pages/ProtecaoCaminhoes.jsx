import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Info } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import frotistasImg from '../assets/publicos/frotistas.png'

const oferta = [
  ['Assistência emergencial 24 h', 'Conforme limites de quilometragem e serviços contratados.'],
  ['Proteção para eventos previstos', 'De acordo com o programa contratado.'],
  ['Rede de atendimento', 'Em território nacional.'],
  ['Acompanhamento Hemissul', 'Pelos canais oficiais de comunicação.'],
]

export default function ProtecaoCaminhoes() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Para caminhões</p>
            <h1 className="page-header__title">
              Seu caminhão precisa seguir. A Hemissul ajuda a proteger o caminho.
            </h1>
            <p className="page-header__lede">
              Consulte opções de proteção e assistência para caminhões, com
              atendimento para os imprevistos previstos no plano e no
              regulamento.
            </p>
            <div className="home-hero__actions">
              <Link to="/cotacao" className="button-primary">
                Cotar proteção para caminhão{' '}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <figure className="figure-frame">
              <img
                src={frotistasImg}
                alt="Veículo de frota representando proteção para o trabalho"
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
              Proteção compatível com a rotina da estrada.
            </h2>
            <p className="home-section__copy">
              Para quem trabalha com o veículo todos os dias e precisa seguir.
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
            <strong>24 h</strong>
            <span>de assistência, conforme os limites do plano contratado.</span>
          </FadeIn>

          <FadeIn className="stack--lg" delay={0.1}>
            <p className="pill-tag pill-tag--accent">
              <Info size={14} aria-hidden="true" /> Validação obrigatória
            </p>
            <h2 className="home-section__title">Confirme com a equipe.</h2>
            <p className="home-section__copy">
              Antes da adesão, confirme tipos de veículos aceitos, limites,
              cargas, reboque e eventos incluídos. Esses dados devem vir do
              plano comercial e do regulamento.
            </p>
            <Link to="/contato" className="type-link">
              Falar com a equipe <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="closing-section">
        <div className="site-container closing-section__inner">
          <FadeIn as="h2">Pronto para proteger seu caminhão?</FadeIn>
          <FadeIn delay={0.1}>
            <Link to="/cotacao" className="button-primary">
              <Truck size={18} aria-hidden="true" /> Solicitar cotação
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
