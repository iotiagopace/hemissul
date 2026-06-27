import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MapPin,
  PhoneCall,
  Star,
} from 'lucide-react'
import FadeIn from '../components/FadeIn'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import VideoEmbed from '../components/VideoEmbed'
import StoreBadges from '../components/StoreBadges'
import ScrollMarquee from '../components/ScrollMarquee'
import AppMockupStory from '../components/AppMockupStory'
import HeroMedia from '../components/HeroMedia'
import { WhatsappIcon } from '../components/SocialIcons'
import { SITE } from '../config/site'

import heroImg from './../assets/fotos-reais/sede-fachada.jpg'
import iconCarros from '../assets/icon-carros.png'
import iconMotos from '../assets/icon-motos.png'
import iconCaminhoes from '../assets/icon-caminhoes.png'

import antesGol from '../assets/antes-depois/antes-gol.jpeg'
import depoisGol from '../assets/antes-depois/depois-gol.jpeg'
import depoisHb20 from '../assets/antes-depois/depois-hb20.jpeg'
import antesOnix from '../assets/antes-depois/antes-onix.jpeg'
import depoisOnix from '../assets/antes-depois/depois-onix.jpeg'
import depoisOroch from '../assets/antes-depois/depois-oroch.jpg'
import antesRanger from '../assets/antes-depois/antes-ranger.jpeg'
import depoisRanger from '../assets/antes-depois/depois-ranger.jpeg'
import depoisS10 from '../assets/antes-depois/depois-s10.jpeg'

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
    description:
      'Proteção para uso particular e outras categorias aceitas pelo programa.',
    image: iconCarros,
    to: '/protecao-veicular/carros',
  },
  {
    title: 'Motos',
    description:
      'Benefícios para quem depende da motocicleta todos os dias.',
    image: iconMotos,
    to: '/protecao-veicular/motos',
  },
  {
    title: 'Caminhões',
    description:
      'Assistência e proteção para veículos que mantêm o trabalho em movimento.',
    image: iconCaminhoes,
    to: '/protecao-veicular/caminhoes',
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

const marqueeRow = [
  { src: depoisGol, alt: 'Gol restaurado', label: 'Gol · reparo concluído' },
  { src: depoisHb20, alt: 'HB20 restaurado', label: 'HB20 · reparo concluído' },
  { src: depoisOnix, alt: 'Onix restaurado', label: 'Onix · reparo concluído' },
  { src: depoisOroch, alt: 'Oroch restaurada', label: 'Oroch · reparo concluído' },
  { src: depoisRanger, alt: 'Ranger restaurada', label: 'Ranger · reparo concluído' },
  { src: depoisS10, alt: 'S10 restaurada', label: 'S10 · reparo concluído' },
]

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <FadeIn as="p" className="home-hero__kicker" delay={0.05}>
            Proteção veicular, assistência 24 horas e atendimento em todo o Brasil.
          </FadeIn>
          <FadeIn as="h1" className="home-hero__title" delay={0.1}>
            Não conte com a sorte. Conte com a Hemissul.
          </FadeIn>
          <FadeIn as="p" className="home-hero__lede" delay={0.2}>
            Proteção para carros, motos e caminhões, com uma equipe próxima
            quando você mais precisa.
          </FadeIn>
          <FadeIn className="home-hero__actions" delay={0.3}>
            <Link to="/cotacao" className="button-primary">
              Fazer cotação <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/central-do-associado" className="button-secondary">
              Acessar área do associado
            </Link>
          </FadeIn>
        </div>

        <HeroMedia
          photoSrc={heroImg}
          photoAlt="Sede da Hemissul em Boa Vista, Roraima"
          videoSrc="/video/hero-antes-depois.mp4"
          videoPoster={heroImg}
          caption="Boa Vista, Roraima · Desde 2019"
        />
      </section>

      <section className="home-proof" aria-label="Números da Hemissul">
        <div className="home-proof__grid">
          <FadeIn className="home-proof__item">
            <strong className="home-proof__value">{SITE.metrics.protectedVehicles}</strong>
            <span className="home-proof__label">veículos protegidos</span>
          </FadeIn>
          <FadeIn className="home-proof__item" delay={0.05}>
            <strong className="home-proof__value">Desde 2019</strong>
            <span className="home-proof__label">presença e atendimento próximo</span>
          </FadeIn>
          <FadeIn className="home-proof__item" delay={0.1}>
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
              Proteção que funciona na vida real.
            </h2>
            <p className="home-section__copy">
              Imprevistos não seguem horário. O programa reúne proteção
              patrimonial, assistência e tecnologia para apoiar o associado
              dentro das condições previstas no regulamento.
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
            <h2>Uma proteção para cada maneira de seguir.</h2>
          </FadeIn>

          <div>
            {vehicles.map((vehicle, index) => (
              <FadeIn key={vehicle.title} delay={index * 0.06}>
                <Link className="vehicle-row" to={vehicle.to}>
                  <span className="vehicle-row__number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <img
                    className="vehicle-row__icon"
                    src={vehicle.image}
                    alt=""
                    width="64"
                    height="64"
                    loading="lazy"
                  />
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
              Reparos reais. Veículos de volta à rua.
            </h2>
            <p className="home-section__copy">
              Arraste para revelar como cada veículo voltou a rodar.
              Cada atendimento segue análise, limites e condições do plano
              contratado.
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

        <ScrollMarquee items={marqueeRow} direction="left" speed={0.25} />
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
            <h2>Seu plano e seus serviços no mesmo lugar.</h2>
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
              O que dizem os associados.
            </h2>
            <p className="home-section__copy">
              Histórias compartilhadas por quem confia no programa todos os
              dias.
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

      <section className="social-presence">
        <div className="site-container social-presence__inner">
          <FadeIn>
            <p className="page-header__eyebrow">Acompanhe a Hemissul</p>
            <h2>Notícias, bastidores e ações da comunidade.</h2>
          </FadeIn>
          <FadeIn className="social-presence__links" delay={0.1}>
            <a href={SITE.links.instagram} target="_blank" rel="noopener noreferrer">
              Instagram <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <Link to="/blog">Últimas notícias <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link to="/podcast">Podcast <ArrowRight size={17} aria-hidden="true" /></Link>
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
            Próxima no atendimento. Ampla na assistência.
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="home-section__copy">
              Desde 2019, a Hemissul trabalha para levar conforto, segurança e
              tranquilidade aos associados, sempre com regras claras e
              atendimento humano.
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
            Seu veículo merece um plano para os imprevistos.
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
