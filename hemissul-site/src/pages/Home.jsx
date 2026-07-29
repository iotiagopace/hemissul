import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BadgePercent,
  Car,
  CheckCircle2,
  Clock3,
  GraduationCap,
  MapPin,
  PhoneCall,
  Pill,
  Play,
  Radar,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wrench,
} from 'lucide-react'
import FadeIn from '../components/FadeIn'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import VideoEmbed from '../components/VideoEmbed'
import StoreBadges from '../components/StoreBadges'
import AutoMarquee from '../components/AutoMarquee'
import VideoTestimonials from '../components/VideoTestimonials'
import AppMockupStory from '../components/AppMockupStory'
import HomeHero from '../components/HomeHero'
import PartnerLogos from '../components/PartnerLogos'
import { WhatsappIcon } from '../components/SocialIcons'
import { SITE } from '../config/site'
import { HOME_HERO_SLIDES } from '../content/homeHero'
import { posts } from '../content/posts'

const PODCAST_TEASER_VIDEO = '8VSYQa0wgHI'
const RASTREAMENTO_VIDEO_APP = 'qC25dUJfqyQ' // placeholder — trocar quando cliente enviar
const latestPosts = posts.slice(0, 3)

import onixParticular from '../assets/fotos-reais/onix-particular.jpg'
import motoristaApp from '../assets/fotos-reais/motorista-app-real.jpg'
import motoPorDoSol from '../assets/fotos-reais/moto-por-do-sol.jpg'
import caminhaoPorDoSol from '../assets/fotos-reais/caminhao-por-do-sol.jpg'

import antesGol from '../assets/antes-depois/antes-gol.jpeg'
import depoisGol from '../assets/antes-depois/depois-gol.jpeg'
import antesOnix from '../assets/antes-depois/antes-onix.jpeg'
import depoisOnix from '../assets/antes-depois/depois-onix.jpeg'
import antesRanger from '../assets/antes-depois/antes-ranger.jpeg'
import depoisRanger from '../assets/antes-depois/depois-ranger.jpeg'

import indenizacao1 from '../assets/indenizacoes/indenizacao-1.jpeg'
import indenizacao2 from '../assets/indenizacoes/indenizacao-2.jpeg'
import indenizacao3 from '../assets/indenizacoes/indenizacao-3.jpeg'
import indenizacao4 from '../assets/indenizacoes/indenizacao-4.jpeg'
import indenizacao5 from '../assets/indenizacoes/indenizacao-5.jpeg'
import indenizacao6 from '../assets/indenizacoes/indenizacao-6.jpeg'

import logoObjetiva from '../assets/clube/parceiros/objetiva-estetica-automotiva.webp'
import logoSantoRemedio from '../assets/clube/parceiros/santoremedio.webp'
import logoJetfast from '../assets/clube/parceiros/jetfast.webp'
import logoGaspartinho from '../assets/clube/parceiros/gaspartinho-sound-car.webp'

const coberturas = [
  {
    number: '01',
    title: 'Colisão',
    Icon: ShieldCheck,
    bullets: [
      'Reboque para local seguro ou oficina credenciada',
      'Reparo do veículo conforme regulamento',
      'Acompanhamento do processo na oficina',
    ],
  },
  {
    number: '02',
    title: 'Perda total',
    Icon: Car,
    bullets: [
      'Reboque para retirada do local do acidente',
      'Indenização integral pela Tabela FIPE',
      'Acompanhamento em cada etapa do processo',
    ],
  },
  {
    number: '03',
    title: 'Roubo e furto',
    Icon: BadgeCheck,
    bullets: [
      'Busca e localização com apoio do rastreamento',
      'Indenização integral do valor do veículo',
      'Acompanhamento em cada etapa do processo',
    ],
  },
  {
    number: '04',
    title: 'Terceiros',
    Icon: Users,
    bullets: [
      'Suporte para danos materiais causados a terceiros',
      'Acionamento simples pela nossa central',
      'Cobertura conforme o plano contratado',
    ],
  },
  {
    number: '05',
    title: 'Assistência 24h',
    Icon: PhoneCall,
    bullets: [
      'Reboque, chaveiro, socorro elétrico e mecânico',
      'Atendimento em todo o território nacional',
      'Acionamento por 0800 940 2163, a qualquer hora',
    ],
  },
  {
    number: '06',
    title: 'Rastreamento',
    Icon: Radar,
    bullets: [
      'Localização em tempo real do veículo',
      'Alertas de ignição, movimentação e cerca virtual',
      'Pronta resposta em caso de roubo ou furto',
    ],
  },
]

const vehicles = [
  {
    title: 'Carros particulares',
    description:
      'Proteção para o veículo que transporta sua família no dia a dia.',
    image: onixParticular,
    to: '/protecao-veicular/carros',
  },
  {
    title: 'Motorista de aplicativo',
    description:
      'Para quem roda de app e depende do veículo para gerar renda todo dia.',
    image: motoristaApp,
    to: '/protecao-veicular/motorista-aplicativo',
  },
  {
    title: 'Motos',
    description:
      'Proteção para motociclistas que dependem da moto todos os dias.',
    image: motoPorDoSol,
    to: '/protecao-veicular/motos',
  },
  {
    title: 'Frotas e empresas',
    description:
      'Proteção para operações com múltiplos veículos e necessidade de controle.',
    image: caminhaoPorDoSol,
    to: '/protecao-veicular/frotas-empresas',
  },
]

const testimonials = [
  {
    quote:
      'Tive meu carro recuperado em menos de 30 minutos graças ao rastreamento Hemissul. Me sinto seguro e amparado sempre.',
    author: 'Ronaldo S.',
    role: 'Associado',
  },
  {
    quote:
      'A assistência 24 horas realmente funciona. Precisei de guincho de madrugada e fui atendido rapidamente.',
    author: 'Maria L.',
    role: 'Associada',
  },
  {
    quote: 'Sou associada desde 2021. Recomendo. Vale a pena demais o serviço!',
    author: 'Sunayra C.',
    role: 'Associada',
  },
]

const beforeAfterCases = [
  { key: 'gol', before: antesGol, after: depoisGol },
  { key: 'ranger', before: antesRanger, after: depoisRanger },
  { key: 'onix', before: antesOnix, after: depoisOnix },
]

const indenizacoesRow = [
  { src: indenizacao1, alt: 'Associada recebendo indenização da Hemissul', label: 'Indenização paga' },
  { src: indenizacao2, alt: 'Associado recebendo indenização da Hemissul', label: 'Indenização paga' },
  { src: indenizacao3, alt: 'Associado recebendo indenização da Hemissul', label: 'Indenização paga' },
  { src: indenizacao4, alt: 'Associado recebendo indenização da Hemissul', label: 'Indenização paga' },
  { src: indenizacao5, alt: 'Associado recebendo indenização da Hemissul', label: 'Indenização paga' },
  { src: indenizacao6, alt: 'Associado recebendo indenização da Hemissul', label: 'Indenização paga' },
]

const clubePerks = [
  { Icon: Pill, label: 'Farmácias', detail: 'até 25% em medicamentos' },
  { Icon: Wrench, label: 'Oficinas e autopeças', detail: 'descontos em manutenção' },
  { Icon: Sparkles, label: 'Salões e estética', detail: 'cuidado com você' },
  { Icon: GraduationCap, label: 'Ensino', detail: 'escolas e cursos parceiros' },
]

// PDF do cliente: "3 a 4 parceiros do clube, gerando curiosidade para a
// pessoa clicar e entender mais" — os mesmos 4 do material de referência.
const clubeParceirosTeaser = [
  { src: logoObjetiva, name: 'Objetiva Estética Automotiva' },
  { src: logoSantoRemedio, name: 'Santo Remédio' },
  { src: logoGaspartinho, name: 'Gaspartinho Sound Car' },
  { src: logoJetfast, name: 'JetFast Lavagem' },
]

const faqPreview = [
  {
    q: 'A Hemissul atende somente em Roraima?',
    a: 'Não. Atendemos em todo o Brasil, com sede em Boa Vista/RR e unidade em Manaus/AM.',
  },
  {
    q: 'A Hemissul faz análise de perfil do condutor?',
    a: 'Não trabalhamos com análise de perfil do condutor. A adesão segue as regras do regulamento.',
  },
  {
    q: 'Tem assistência 24h?',
    a: 'Sim. Reboque, chaveiro e socorro em qualquer lugar do país, todos os dias.',
  },
]

function CtaLink({ children, to = '/cotacao' }) {
  return (
    <Link to={to} className="button-cta home-section__cta">
      {children ?? 'Fazer cotação'} <ArrowRight size={17} aria-hidden="true" />
    </Link>
  )
}

export default function Home() {
  return (
    <div className="home-page">
      {/* 01 · Hero + stats + selo SUSEP */}
      <HomeHero slides={HOME_HERO_SLIDES} />

      <section className="home-proof" aria-label="Números da Hemissul">
        <div className="home-proof__grid">
          <FadeIn className="home-proof__item">
            <strong className="home-proof__value">{SITE.metrics.protectedVehicles}</strong>
            <span className="home-proof__label">veículos protegidos</span>
          </FadeIn>
          <FadeIn className="home-proof__item" delay={0.05}>
            <strong className="home-proof__value">{SITE.metrics.repairsInvested}</strong>
            <span className="home-proof__label">em reparos e indenizações</span>
          </FadeIn>
          <FadeIn className="home-proof__item" delay={0.1}>
            <strong className="home-proof__value">Sem análise</strong>
            <span className="home-proof__label">de perfil do condutor</span>
          </FadeIn>
          <FadeIn className="home-proof__item" delay={0.15}>
            <strong className="home-proof__value">24h</strong>
            <span className="home-proof__label">
              assistência em todo o Brasil
            </span>
          </FadeIn>
        </div>
        <FadeIn className="home-proof__badge" delay={0.2}>
          <span className="home-proof__badge-pill">
            <ShieldCheck size={22} aria-hidden="true" />
            Cadastrada na SUSEP
          </span>
        </FadeIn>
      </section>

      {/* 02 · Apresentação das coberturas — cards estilo LP */}
      <section className="home-section coverage-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <p className="page-header__eyebrow">O que a nossa proteção cobre</p>
            <h2 className="home-section__title">
              Tudo o que você precisa para proteger o seu veículo.
            </h2>
            <p className="home-section__copy">
              Escolha o plano que faz sentido para a sua necessidade e conte com
              uma proteção pensada para dar mais tranquilidade no dia a dia.
            </p>
          </FadeIn>

          <div className="coverage-grid">
            {coberturas.map((item, index) => (
              <FadeIn
                as="article"
                className="coverage-card"
                key={item.title}
                delay={index * 0.06}
              >
                <div className="coverage-card__head" aria-hidden="true">
                  <span className="coverage-card__number">{item.number}</span>
                </div>
                <div className="coverage-card__body">
                  <item.Icon
                    className="coverage-card__icon"
                    size={26}
                    aria-hidden="true"
                  />
                  <h3 className="coverage-card__title">{item.title}</h3>
                  <ul className="coverage-card__list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>
                        <CheckCircle2 size={17} aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                    <li className="coverage-card__more">
                      <CheckCircle2 size={17} aria-hidden="true" />
                      <span>E muito mais</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <CtaLink>Fazer cotação</CtaLink>
        </div>
      </section>

      {/* 03 · Antes e depois — copy nova + sem legenda de modelo */}
      <section className="home-section results-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <p className="page-header__eyebrow">Reparos feitos com compromisso</p>
            <h2 className="home-section__title">
              Antes e depois dos reparos.
            </h2>
            <p className="home-section__copy">
              Quando um imprevisto acontece, nossa missão é recuperar o seu
              patrimônio e ajudar você a voltar à sua rotina com segurança.
            </p>
          </FadeIn>

          <div className="results-grid">
            {beforeAfterCases.map((item) => (
              <FadeIn key={item.key}>
                <BeforeAfterSlider
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  alt="Antes e depois de um reparo Hemissul"
                />
              </FadeIn>
            ))}
          </div>

          <CtaLink>Fazer cotação</CtaLink>
        </div>
      </section>

      {/* 04 · Indenizações — foto (marquee) + vídeos (histórias reais) */}
      <section className="home-section indemnity-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <p className="page-header__eyebrow">Histórias reais</p>
            <h2 className="home-section__title">
              Indenizações que a gente paga.
            </h2>
            <p className="home-section__copy">
              Assista aos depoimentos de associados que indenizamos e veja como
              transformamos nosso compromisso em segurança, confiança e
              tranquilidade.
            </p>
          </FadeIn>
        </div>

        <AutoMarquee items={indenizacoesRow} className="indemnity-marquee" seconds={48} />

        <div className="site-container">
          <FadeIn>
            <VideoTestimonials />
          </FadeIn>
          <div className="home-section__cta-wrap">
            <CtaLink>Fazer cotação</CtaLink>
          </div>
        </div>
      </section>

      {/* 05 · Proteção por tipo de veículo — cards estilo LP */}
      <section className="home-section vehicle-cards-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <p className="page-header__eyebrow">Planos sob medida</p>
            <h2 className="home-section__title">
              Proteção para cada maneira de usar o veículo.
            </h2>
            <p className="home-section__copy">
              Carro particular, ferramenta de trabalho, moto ou frota: cada
              rotina pede uma cotação com coberturas e condições bem explicadas.
            </p>
          </FadeIn>

          <div className="vehicle-cards">
            {vehicles.map((vehicle, index) => (
              <FadeIn key={vehicle.title} delay={index * 0.05}>
                <Link className="vehicle-card" to={vehicle.to}>
                  <figure className="vehicle-card__media">
                    <img
                      src={vehicle.image}
                      alt=""
                      loading="lazy"
                      width="480"
                      height="320"
                    />
                  </figure>
                  <div className="vehicle-card__body">
                    <h3>{vehicle.title}</h3>
                    <p>{vehicle.description}</p>
                    <span className="vehicle-card__cta">
                      Ver detalhes <ArrowUpRight size={18} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <CtaLink>Fazer cotação</CtaLink>
        </div>
      </section>

      {/* 06 · Rastreamento */}
      <section className="home-section tracking-section">
        <div className="site-container tracking-layout">
          <FadeIn className="tracking-layout__content">
            <p className="page-header__eyebrow">Rastreamento Veicular</p>
            <h2 className="home-section__title">
              Rastreamento 24 horas em tempo real.
            </h2>
            <p className="home-section__copy">
              Seu carro, moto ou frota sempre sob seu controle, com suporte
              imediato em qualquer situação. Localização em tempo real, alertas
              inteligentes, cerca virtual e pronta resposta em caso de roubo.
            </p>
            <ul className="tracking-features">
              <li>
                <Radar size={18} aria-hidden="true" />
                Localização em tempo real
              </li>
              <li>
                <AlertTriangle size={18} aria-hidden="true" />
                Alertas de ignição e movimentação
              </li>
              <li>
                <ShieldCheck size={18} aria-hidden="true" />
                Cerca virtual e pronta resposta
              </li>
            </ul>
            <div className="tracking-actions">
              <CtaLink>Fazer cotação</CtaLink>
              <Link to="/rastreamento-veicular" className="type-link">
                Conhecer o rastreamento{' '}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn className="tracking-layout__video" delay={0.1}>
            <VideoEmbed
              videoId={RASTREAMENTO_VIDEO_APP}
              title="Como funciona o rastreamento Hemissul"
            />
          </FadeIn>
        </div>
      </section>

      {/* 07 · Clube de Benefícios — banner de destaque */}
      <section className="home-section clube-section">
        <div className="site-container">
          <FadeIn className="clube-banner">
            <div className="clube-banner__content">
              <span className="clube-banner__badge">
                <BadgePercent size={16} aria-hidden="true" /> Até 40% de desconto
              </span>
              <h2>Vantagens exclusivas para associados Hemissul.</h2>
              <p>
                Economia no seu dia a dia em farmácias, oficinas, autopeças,
                salões de beleza e muito mais em Boa Vista e região. Você
                garante proteção para o veículo e economia no bolso.
              </p>
              <Link to="/clube-de-beneficios" className="button-cta">
                Quero economizar com o Clube{' '}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <ul className="clube-banner__perks">
              {clubePerks.map(({ Icon, label, detail }) => (
                <li key={label}>
                  <Icon size={22} aria-hidden="true" />
                  <div>
                    <strong>{label}</strong>
                    <span>{detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <PartnerLogos logos={clubeParceirosTeaser} />
      </section>

      {/* 08 · App do associado */}
      <section className="home-section app-section">
        <div className="site-container app-layout">
          <FadeIn className="app-layout__visual">
            <VideoEmbed
              videoId="qC25dUJfqyQ"
              title="Conheça o aplicativo Hemissul"
            />
          </FadeIn>
          <FadeIn className="app-layout__content" delay={0.1}>
            <p className="page-header__eyebrow">Sua proteção na palma da mão</p>
            <h2>Tudo do seu plano no aplicativo.</h2>
            <p>
              Consulte boletos, benefícios, oficinas credenciadas, assistência
              24 horas e comunicação de eventos pelo aplicativo Hemissul.
            </p>
            <StoreBadges />
            <div className="app-layout__actions">
              <CtaLink>Fazer cotação</CtaLink>
              <Link to="/aplicativo" className="type-link">
                Conhecer o aplicativo{' '}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>

        <div className="site-container app-mockup-row">
          <AppMockupStory />
        </div>
      </section>

      {/* 09 · O que falam nossos associados */}
      <section className="testimonials-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <p className="page-header__eyebrow">
              Comentários de quem já é associado
            </p>
            <h2 className="home-section__title">
              O que os associados falam.
            </h2>
          </FadeIn>

          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <FadeIn
                as="figure"
                className="testimonial-card"
                key={item.author}
                delay={index * 0.07}
              >
                <div className="testimonial-card__stars" aria-label="5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <blockquote>{item.quote}</blockquote>
                <figcaption>
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                </figcaption>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 10 · Onde estamos + Dúvidas frequentes */}
      <section className="home-section presence-section">
        <div className="site-container presence-grid">
          <FadeIn className="presence-locations">
            <p className="page-header__eyebrow">Onde estamos</p>
            <h2 className="home-section__title">
              Perto de você em Roraima e Amazonas.
            </h2>
            <div className="presence-cards">
              {SITE.units.map((unit) => (
                <article className="presence-card" key={unit.name}>
                  <h3>{unit.name}</h3>
                  <address>
                    {unit.address}
                    <br />
                    {unit.city}
                    {unit.cep ? ` · CEP ${unit.cep}` : ''}
                  </address>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${unit.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-link"
                  >
                    <MapPin size={16} aria-hidden="true" /> Abrir no mapa
                  </a>
                </article>
              ))}
            </div>
            <div className="presence-contacts">
              <p>
                <PhoneCall size={18} aria-hidden="true" /> Assistência 24h:{' '}
                <a href={SITE.phone.assistanceHref}>{SITE.phone.assistance}</a>
              </p>
              <p>
                <WhatsappIcon style={{ width: 18, height: 18 }} /> Atendimento e
                cotação:{' '}
                <a
                  href={SITE.phone.quoteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SITE.phone.quote}
                </a>
              </p>
              <p>
                <Clock3 size={18} aria-hidden="true" /> {SITE.hours}
              </p>
            </div>
          </FadeIn>

          <FadeIn className="presence-faq" delay={0.1}>
            <p className="page-header__eyebrow">Dúvidas frequentes</p>
            <h3 className="home-section__title">
              Respostas para decidir com segurança.
            </h3>
            <ul className="faq-preview-list">
              {faqPreview.map((item) => (
                <li key={item.q}>
                  <strong>{item.q}</strong>
                  <span>{item.a}</span>
                </li>
              ))}
            </ul>
            <Link to="/duvidas-frequentes" className="type-link">
              Ver todas as dúvidas{' '}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 11 · Redes sociais e blog */}
      <section className="home-section home-teasers">
        <div className="site-container">
          <FadeIn className="home-teasers__head">
            <div>
              <p className="page-header__eyebrow">Acompanhe a Hemissul</p>
              <h2 className="home-section__title">
                Notícias, bastidores e podcast.
              </h2>
            </div>
            <Link to="/blog" className="type-link">
              Ver todas as notícias <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeIn>

          <div className="teaser-grid">
            {latestPosts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 0.06}>
                <Link to={`/blog/${post.slug}`} className="teaser-card">
                  <figure className="teaser-card__media">
                    <img src={post.image} alt="" loading="lazy" width="400" height="250" />
                  </figure>
                  <div className="teaser-card__body">
                    <p className="teaser-card__meta">
                      {post.category} · {post.date}
                    </p>
                    <h3 className="teaser-card__title">{post.title}</h3>
                  </div>
                </Link>
              </FadeIn>
            ))}

            <FadeIn delay={0.18}>
              <Link to="/podcast" className="teaser-card teaser-card--podcast">
                <figure className="teaser-card__media">
                  <img
                    src={`https://img.youtube.com/vi/${PODCAST_TEASER_VIDEO}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    width="400"
                    height="250"
                  />
                  <span className="teaser-card__play" aria-hidden="true">
                    <Play size={22} fill="currentColor" />
                  </span>
                </figure>
                <div className="teaser-card__body">
                  <p className="teaser-card__meta">Podcast Hemissul</p>
                  <h3 className="teaser-card__title">
                    Conversas sobre propósito, rotina e proteção.
                  </h3>
                </div>
              </Link>
            </FadeIn>
          </div>

          <FadeIn className="home-teasers__social" delay={0.24}>
            <a href={SITE.links.instagram} target="_blank" rel="noopener noreferrer">
              Instagram <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <Link to="/podcast">
              Ver o podcast <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
