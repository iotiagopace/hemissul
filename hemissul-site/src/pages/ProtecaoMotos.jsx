import { Link } from 'react-router-dom'
import { ArrowRight, AlertTriangle, Bike } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import motociclistasImg from '../assets/publicos/motociclistas.png'

const beneficios = [
  ['Colisão, roubo, furto e perda total', 'Conforme o regulamento.'],
  ['Assistência 24 h', 'Emergências previstas no plano contratado.'],
  ['Rastreamento', 'Para modelos e categorias em que o equipamento for exigido ou contratado.'],
  ['Atendimento nacional', 'Pela rede de prestadores Hemissul.'],
]

export default function ProtecaoMotos() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Para motos</p>
            <h1 className="page-header__title">
              Proteção para sua moto acompanhar todos os caminhos.
            </h1>
            <p className="page-header__lede">
              Para trabalho ou mobilidade diária, conte com suporte para os
              imprevistos previstos no programa e assistência quando você
              precisar.
            </p>
            <div className="home-hero__actions">
              <Link to="/cotacao" className="button-primary">
                Cotar proteção para minha moto{' '}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <figure className="figure-frame">
              <img
                src={motociclistasImg}
                alt="Motociclista atendido pela Hemissul"
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
              Cuidado para a moto e apoio para o motociclista.
            </h2>
            <p className="home-section__copy">
              Benefícios voltados para quem depende da motocicleta no dia a dia.
            </p>
          </FadeIn>

          <div className="editorial-list">
            {beneficios.map(([title, desc], index) => (
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
          <FadeIn className="stack--lg">
            <p className="pill-tag pill-tag--accent">
              <AlertTriangle size={14} aria-hidden="true" /> Atenção
            </p>
            <h2 className="home-section__title">
              Condições específicas para motocicletas.
            </h2>
          </FadeIn>

          <FadeIn className="stack--lg" delay={0.1}>
            <p className="home-section__copy">
              Limites de valor, cilindrada, participação e exigência de
              rastreador podem variar. A equipe confirma a elegibilidade da
              motocicleta antes da adesão.
            </p>
            <Link to="/contato" className="type-link">
              Falar com um consultor <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="closing-section">
        <div className="site-container closing-section__inner">
          <FadeIn as="h2">Solicite uma cotação para sua moto.</FadeIn>
          <FadeIn delay={0.1}>
            <Link to="/cotacao" className="button-primary">
              <Bike size={18} aria-hidden="true" /> Fazer cotação
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
