import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MapPin,
  PhoneCall,
  Play,
  Smartphone,
  Star,
} from 'lucide-react'
import FadeIn from '../components/FadeIn'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import VideoEmbed from '../components/VideoEmbed'
import StoreBadges from '../components/StoreBadges'
import AutoMarquee from '../components/AutoMarquee'
import VideoTestimonials from '../components/VideoTestimonials'
import AppMockupStory from '../components/AppMockupStory'
import HomeHero from '../components/HomeHero'
import { WhatsappIcon } from '../components/SocialIcons'
import { SITE } from '../config/site'
import { HOME_HERO_SLIDES } from '../content/homeHero'
import { posts } from '../content/posts'

const PODCAST_TEASER_VIDEO = '8VSYQa0wgHI'
const latestPosts = posts.slice(0, 3)

import iconCarros from '../assets/icon-carros.png'
import iconMotos from '../assets/icon-motos.png'
import iconCaminhoes from '../assets/icon-caminhoes.png'

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

import sedeImg from '../assets/fotos-reais/sede-fachada-2.jpg'

const benefits = [
  {
    title: 'Colisão',
    description:
      'Apoio para reparos decorrentes de colisões previstas no regulamento.',
  },
  {
    title: 'Roubo e furto',
    description:
      'Busca, localização e ressarcimento conforme a Tabela FIPE e o regulamento.',
  },
  {
    title: 'Perda total',
    description:
      'Análise e ressarcimento nos casos e limites previstos no programa.',
  },
  {
    title: 'Proteção para terceiros',
    description:
      'Suporte para danos materiais causados a terceiros, conforme o plano contratado.',
  },
  {
    title: 'Assistência 24 horas',
    description:
      'Apoio emergencial em todo o território nacional, a qualquer hora.',
  },
  {
    title: 'Rastreamento',
    description:
      'Localização em tempo real, alertas e histórico de trajetos do veículo.',
  },
]

const vehicles = [
  {
    title: 'Carros',
    description: 'Uso particular e famílias, com cobertura contra colisão, roubo e furto.',
    image: iconCarros,
    to: '/protecao-veicular/carros',
  },
  {
    title: 'Motos',
    description: 'Para quem usa a moto no trabalho ou para se locomover.',
    image: iconMotos,
    to: '/protecao-veicular/motos',
  },
  {
    title: 'Caminhões',
    description: 'Cobertura e assistência na estrada para quem vive de rodar.',
    image: iconCaminhoes,
    to: '/protecao-veicular/caminhoes',
  },
  {
    title: 'Motorista de aplicativo',
    description: 'Uber, 99 e entregas: proteção para quem trabalha o dia todo no trânsito.',
    Icon: Smartphone,
    to: '/protecao-veicular/motorista-aplicativo',
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
      'A assistência 24 h realmente funciona. Precisei de guincho de madrugada e fui atendido rapidamente.',
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
  { label: 'Gol', before: antesGol, after: depoisGol },
  { label: 'Ranger', before: antesRanger, after: depoisRanger },
  { label: 'Onix', before: antesOnix, after: depoisOnix },
]

const indenizacoesRow = [
  { src: indenizacao1, alt: 'Associada recebendo indenização da Hemissul', label: 'Indenização paga' },
  { src: indenizacao2, alt: 'Associado recebendo indenização da Hemissul', label: 'Indenização paga' },
  { src: indenizacao3, alt: 'Associado recebendo indenização da Hemissul', label: 'Indenização paga' },
  { src: indenizacao4, alt: 'Associado recebendo indenização da Hemissul', label: 'Indenização paga' },
  { src: indenizacao5, alt: 'Associado recebendo indenização da Hemissul', label: 'Indenização paga' },
  { src: indenizacao6, alt: 'Associado recebendo indenização da Hemissul', label: 'Indenização paga' },
]

export default function Home() {
  return (
    <div className="home-page">
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
            <strong className="home-proof__value">Desde 2019</strong>
            <span className="home-proof__label">presença e atendimento próximo</span>
          </FadeIn>
          <FadeIn className="home-proof__item" delay={0.15}>
            <strong className="home-proof__value">24 h</strong>
            <span className="home-proof__label">
              assistência em todo o Brasil
            </span>
          </FadeIn>
        </div>
      </section>

      <section className="home-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              O que a proteção cobre.
            </h2>
            <p className="home-section__copy">
              Colisão, roubo, furto, perda total, danos a terceiros, assistência
              24h e rastreamento — tudo conforme as regras do regulamento.
            </p>
          </FadeIn>

          <div className="benefit-list">
            {benefits.map((benefit, index) => (
              <FadeIn
                as="article"
                className="benefit-list__item"
                key={benefit.title}
                delay={index * 0.05}
              >
                <span className="benefit-list__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="benefit-list__content">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <Link
            to="/protecao-veicular"
            className="type-link home-section__link"
          >
            Entender o programa <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="vehicle-section">
        <div className="site-container">
          <FadeIn className="vehicle-section__head">
            <h2>Escolha pelo seu tipo de veículo.</h2>
          </FadeIn>

          <div>
            {vehicles.map((vehicle, index) => (
              <FadeIn key={vehicle.title} delay={index * 0.06}>
                <Link className="vehicle-row" to={vehicle.to}>
                  <span className="vehicle-row__number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {vehicle.image ? (
                    <img
                      className="vehicle-row__icon"
                      src={vehicle.image}
                      alt=""
                      width="64"
                      height="64"
                      loading="lazy"
                    />
                  ) : (
                    <span className="vehicle-row__icon vehicle-row__icon--glyph">
                      <vehicle.Icon size={32} aria-hidden="true" />
                    </span>
                  )}
                  <div className="vehicle-row__content">
                    <h3>{vehicle.title}</h3>
                    <p>{vehicle.description}</p>
                  </div>
                  <ArrowUpRight size={24} aria-hidden="true" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section results-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              Antes e depois dos reparos.
            </h2>
            <p className="home-section__copy">
              Arraste a imagem para ver o antes e o depois. Cada caso segue os
              limites e condições do plano contratado.
            </p>
          </FadeIn>

          <div className="results-grid">
            {beforeAfterCases.map((item) => (
              <FadeIn key={item.label}>
                <BeforeAfterSlider
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  alt={item.label}
                />
                <p className="results-grid__caption">{item.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section indemnity-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              Indenizações que a gente paga.
            </h2>
            <p className="home-section__copy">
              Quem teve o veículo roubado ou com perda total e recebeu o valor
              combinado, dentro das regras do regulamento.
            </p>
          </FadeIn>
        </div>

        <AutoMarquee items={indenizacoesRow} className="indemnity-marquee" seconds={48} />
      </section>

      <section className="home-section app-section">
        <div className="site-container app-layout">
          <FadeIn className="app-layout__visual">
            <VideoEmbed
              videoId="qC25dUJfqyQ"
              title="Conheça o aplicativo Hemissul"
            />
          </FadeIn>
          <FadeIn className="app-layout__content" delay={0.1}>
            <h2>Tudo do seu plano no aplicativo.</h2>
            <p>
              Consulte boletos, benefícios, oficinas credenciadas, assistência
              24 h e comunicação de eventos pelo aplicativo Hemissul.
            </p>
            <StoreBadges />
            <Link to="/aplicativo" className="type-link">
              Conhecer o aplicativo <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>

        <div className="site-container app-mockup-row">
          <AppMockupStory />
        </div>
      </section>

      <section className="testimonials-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              O que os associados falam.
            </h2>
            <p className="home-section__copy">
              Comentários de quem já é associado e usou a proteção.
            </p>
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

      <section className="home-section video-testimonials-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              Depoimentos de quem é associado.
            </h2>
            <p className="home-section__copy">
              Associados falando do atendimento que receberam. Toque para
              assistir.
            </p>
          </FadeIn>
        </div>
        <div className="site-container">
          <FadeIn>
            <VideoTestimonials />
          </FadeIn>
        </div>
      </section>

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
                    <img src={post.image} alt="" loading="lazy" />
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

      <section className="brand-photo">
        <img
          src={sedeImg}
          alt="Sede da Hemissul na Avenida Mário Homem de Melo, em Boa Vista"
          width="1920"
          height="1280"
          loading="lazy"
        />
        <div className="brand-photo__caption">
          <strong>Uma associação feita em Boa Vista.</strong>
          <span>
            Atendimento local, rede de prestadores e assistência em todo o
            Brasil.
          </span>
        </div>
      </section>

      <section className="home-section home-section--compact">
        <div className="site-container home-section__intro">
          <FadeIn as="h2" className="home-section__title">
            Atendimento perto. Assistência em todo o Brasil.
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="home-section__copy">
              A Hemissul protege veículos desde 2019, com sede em Boa Vista e
              rede de prestadores em todo o país. Regras claras, sem letra miúda.
            </p>
            <Link to="/quem-somos" className="type-link home-section__link">
              Conhecer a Hemissul <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="location-section">
        <div className="site-container location-layout">
          <FadeIn className="location-layout__content">
            <h2>Boa Vista é a nossa casa.</h2>
            <address>
              {SITE.address}
            </address>
            <p>
              <PhoneCall size={18} aria-hidden="true" /> Assistência 24 h:{' '}
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
            <a
              href="https://www.google.com/maps/search/?api=1&query=Av.+Mário+Homem+de+Melo,+3999,+Boa+Vista,+RR"
              target="_blank"
              rel="noopener noreferrer"
              className="type-link"
            >
              <MapPin size={17} aria-hidden="true" /> Abrir no mapa
            </a>
          </FadeIn>

          <FadeIn className="location-layout__map" delay={0.1}>
            <iframe
              src="https://www.google.com/maps?q=Av.+Mario+Homem+de+Melo,+3999,+Boa+Vista,+RR&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da sede Hemissul"
            />
          </FadeIn>
        </div>
      </section>

      <section className="closing-section">
        <div className="site-container closing-section__inner">
          <FadeIn as="h2">
            Faça a cotação e proteja seu veículo hoje.
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link to="/cotacao" className="button-cta">
              Solicitar cotação <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
