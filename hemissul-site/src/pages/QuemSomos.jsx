import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Users, MapPinned, Sparkles } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import AnimatedText from '../components/AnimatedText'
import sedeImg from '../assets/fotos-reais/sede-fachada-2.jpg'
import equipeImg from '../assets/fotos-reais/equipe-1.jpg'
import equipe2 from '../assets/fotos-reais/equipe-2.jpg'
import equipe3 from '../assets/fotos-reais/equipe-3.jpg'

const valores = [
  {
    icon: Shield,
    title: 'Transparência',
    desc:
      'Regulamento aberto, comunicação clara e nenhuma promessa que não esteja prevista no plano contratado.',
  },
  {
    icon: Users,
    title: 'Proximidade',
    desc:
      'Atendimento humano que conhece o associado, da adesão à utilização dos benefícios.',
  },
  {
    icon: MapPinned,
    title: 'Presença local',
    desc:
      'Boa Vista é o nosso ponto de partida. Atendemos em todo o Brasil sem perder o jeito de Roraima.',
  },
  {
    icon: Sparkles,
    title: 'Resposta rápida',
    desc:
      'Pronta resposta 24 h, rede de prestadores acionada e processos pensados para destravar a rotina.',
  },
]

const marcos = [
  ['2019', 'Fundação', 'A Hemissul nasce em Boa Vista com o propósito de oferecer proteção patrimonial mutualista.'],
  ['2021', 'Crescimento da rede', 'Ampliação da rede de prestadores e do atendimento em todo o território nacional.'],
  ['2023', 'Aplicativo do associado', 'Lançamento do app com boletos, benefícios, oficinas, assistência e comunicação de eventos.'],
  ['2025', 'Mais de 13 mil veículos', 'A comunidade ultrapassa 13 mil veículos protegidos e R$ 12 mi investidos em reparos.'],
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
              patrimonial mutualista e suporte próximo aos associados — em
              qualquer canto do país.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <figure className="figure-frame">
              <img
                src={sedeImg}
                alt="Fachada da sede da Hemissul em Boa Vista"
                loading="eager"
              />
            </figure>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container split">
          <FadeIn>
            <figure className="figure-frame figure-frame--portrait">
              <img
                src={equipeImg}
                alt="Equipe Hemissul em atendimento"
                loading="lazy"
              />
            </figure>
          </FadeIn>
          <FadeIn className="stack--lg" delay={0.1}>
            <p className="pill-tag pill-tag--accent">Propósito</p>
            <h2 className="home-section__title">
              Crescimento construído com proximidade.
            </h2>
            <AnimatedText className="home-section__copy">
              Ampliamos equipe, rede de prestadores e canais digitais ao longo da trajetória. Hoje, reunimos mais de 13 mil veículos protegidos e atendimento em todo o território nacional.
            </AnimatedText>
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
              O que orienta cada decisão.
            </h2>
            <p className="home-section__copy">
              Quatro valores que guiam o atendimento, o produto e as escolhas
              do dia a dia.
            </p>
          </FadeIn>

          <div className="values-grid">
            {valores.map(({ icon: Icon, title, desc }, index) => (
              <FadeIn
                as="article"
                className="value-item"
                key={title}
                delay={index * 0.05}
              >
                <span className="value-item__icon">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--dark">
        <div className="site-container">
          <FadeIn className="stack--lg" style={{ maxWidth: '44rem' }}>
            <p
              className="pill-tag"
              style={{
                color: 'var(--color-paper)',
                borderColor: 'var(--color-ink-rule)',
              }}
            >
              Linha do tempo
            </p>
            <h2 className="home-section__title">
              Da primeira adesão à comunidade nacional.
            </h2>
          </FadeIn>

          <div className="timeline">
            {marcos.map(([year, title, desc], index) => (
              <FadeIn
                as="article"
                className="timeline__item"
                key={year}
                delay={index * 0.06}
              >
                <span className="timeline__year">{year}</span>
                <div>
                  <h3 className="timeline__title">{title}</h3>
                  <p className="timeline__desc">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--paper">
        <div className="site-container split">
          <FadeIn>
            <figure className="figure-frame figure-frame--wide">
              <img
                src={equipe2}
                alt="Equipe Hemissul reunida"
                loading="lazy"
              />
            </figure>
          </FadeIn>

          <FadeIn className="stack--lg" delay={0.1}>
            <p className="pill-tag pill-tag--accent">Modelo</p>
            <h2 className="home-section__title">
              Associação privada, com regras transparentes.
            </h2>
            <p className="home-section__copy">
              A Hemissul não é seguradora. Os participantes aderem ao programa
              e compartilham custos dos eventos cobertos conforme o contrato,
              o regulamento e a legislação aplicável.
            </p>

            <dl className="info-list">
              <div>
                <dt>Razão social</dt>
                <dd>Hemissul — Associação de Proteção Patrimonial Mutualista</dd>
              </div>
              <div>
                <dt>CNPJ</dt>
                <dd>35.224.050/0001-37</dd>
              </div>
              <div>
                <dt>Fundação</dt>
                <dd>2019, em Boa Vista — RR</dd>
              </div>
              <div>
                <dt>Endereço</dt>
                <dd>Av. Mário Homem de Melo, 3999, Buritis</dd>
              </div>
            </dl>
          </FadeIn>
        </div>
      </section>

      <section className="brand-photo">
        <img
          src={equipe3}
          alt="Equipe Hemissul em ação"
          loading="lazy"
        />
        <div className="brand-photo__caption">
          <strong>Pessoas reais, próximas, todos os dias.</strong>
          <span>O time que atende você no telefone, no app e na sede.</span>
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
