import { Link } from 'react-router-dom'
import { ArrowRight, Shield, ScrollText, ListChecks, Search } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import equipeImg from '../assets/fotos-reais/equipe-2.jpg'

const etapas = [
  ['Solicite a cotação', 'Informe os dados do veículo e o uso.'],
  ['Conheça o plano', 'Apresentamos condições, regulamento e valores aplicáveis.'],
  ['Envie documentos', 'Envio das informações solicitadas e vistoria do veículo.'],
  ['Conclua a adesão', 'Aguarde a confirmação de início da proteção.'],
  ['Use o aplicativo', 'Acompanhe boletos, benefícios e canais de atendimento.'],
]

const inclui = [
  'Colisão, perda total, roubo e furto',
  'Danos materiais a terceiros',
  'Assistência 24 h e reboque',
  'Carro reserva',
  'Rastreamento veicular',
  'Outros benefícios, quando incluídos no plano',
]

export default function ProtecaoVeicular() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Proteção veicular</p>
            <h1 className="page-header__title">
              Proteção para cuidar do seu patrimônio todos os dias.
            </h1>
            <p className="page-header__lede">
              A Hemissul reúne associados em um programa de proteção patrimonial
              mutualista, com benefícios para situações como colisão, roubo,
              furto e outros imprevistos previstos no regulamento.
            </p>
            <div className="home-hero__actions">
              <Link to="/cotacao" className="button-primary">
                Fazer cotação <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/documentos" className="button-secondary">
                Consultar regulamento
              </Link>
            </div>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p className="pill-tag pill-tag--accent">
              <Shield size={14} aria-hidden="true" /> Conceito
            </p>
            <h2 className="home-section__title">
              Como funciona a proteção patrimonial mutualista.
            </h2>
            <p className="home-section__copy">
              Os participantes integram uma associação e compartilham os custos
              dos eventos cobertos de acordo com as regras do grupo. A adesão, o
              rateio, os benefícios, os limites e as participações são definidos
              no contrato e no regulamento do programa.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <figure className="figure-frame">
              <img
                src={equipeImg}
                alt="Equipe Hemissul atendendo associados em Boa Vista"
                loading="lazy"
              />
            </figure>
          </FadeIn>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              Da cotação à ativação da proteção.
            </h2>
            <p className="home-section__copy">
              Cinco passos para entrar no programa com clareza sobre direitos,
              deveres e benefícios.
            </p>
          </FadeIn>

          <div className="editorial-list">
            {etapas.map(([title, desc], index) => (
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

      <section className="page-section page-section--dark">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p
              className="pill-tag"
              style={{ color: 'var(--color-paper)', borderColor: 'var(--color-ink-rule)' }}
            >
              <ListChecks size={14} aria-hidden="true" /> Benefícios
            </p>
            <h2 className="home-section__title">
              O que pode fazer parte da sua proteção.
            </h2>
            <p
              className="home-section__copy"
              style={{ color: 'var(--color-ink-subtle)' }}
            >
              A lista final reproduz exatamente os planos comercializados no
              momento da cotação. A adesão é simplificada, mas depende de
              elegibilidade, vistoria, documentos e confirmação da Hemissul.
            </p>
          </FadeIn>

          <FadeIn className="editorial-list editorial-list--dark">
            {inclui.map((item, index) => (
              <div className="editorial-list__item" key={item}>
                <span className="editorial-list__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="editorial-list__title"
                    style={{ color: 'var(--color-paper)' }}
                  >
                    {item}
                  </h3>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="page-section page-section--paper">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p className="pill-tag pill-tag--accent">
              <Search size={14} aria-hidden="true" /> Transparência
            </p>
            <h2 className="home-section__title">
              Antes de aderir, confira as condições.
            </h2>
          </FadeIn>

          <FadeIn className="stack--lg" delay={0.1}>
            <p className="home-section__copy">
              Leia o regulamento e confirme limites, participação do associado,
              carências, exigência de rastreador, documentos, hipóteses de
              exclusão e regras de acionamento.
            </p>
            <div className="home-hero__actions">
              <Link to="/documentos" className="button-primary">
                <ScrollText size={18} aria-hidden="true" /> Acessar documentos
              </Link>
              <Link to="/contato" className="button-secondary">
                Falar com um consultor
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="closing-section">
        <div className="site-container closing-section__inner">
          <FadeIn as="h2">
            Pronto para conhecer as opções para o seu veículo?
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link to="/cotacao" className="button-primary">
              Solicitar cotação <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
