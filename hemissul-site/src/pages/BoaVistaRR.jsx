import { Mail, MapPin, Phone, Clock3, Navigation } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { WhatsappIcon } from '../components/SocialIcons'
import sedeImg from '../assets/fotos-reais/sede-fachada.jpg'
import sedeImg2 from '../assets/fotos-reais/sede-fachada-2.jpg'

const horarios = [
  ['Segunda a sexta', '8h às 18h'],
  ['Sábado', '8h às 12h'],
  ['Domingo', 'Fechado para atendimento presencial'],
]

const proximos = [
  ['Zona', 'Buritis, Boa Vista — RR'],
  ['CEP', '69309-198'],
  ['Estacionamento', 'Vagas na via e proximidades'],
  ['Acessibilidade', 'Entrada térrea sem degraus'],
]

export default function BoaVistaRR() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Boa Vista — RR</p>
            <h1 className="page-header__title">
              Atendimento próximo em Roraima. Assistência em todo o Brasil.
            </h1>
            <p className="page-header__lede">
              A sede da Hemissul fica na Avenida Mário Homem de Melo, Buritis,
              e reúne atendimento comercial, administrativo e suporte aos
              associados.
            </p>
            <div className="home-hero__actions">
              <a
                href="https://wa.me/5595991381037"
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
              >
                <WhatsappIcon style={{ width: 18, height: 18 }} /> Falar no
                WhatsApp
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Av.+Mário+Homem+de+Melo,+3999,+Boa+Vista,+RR"
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
              >
                <Navigation size={18} aria-hidden="true" /> Como chegar
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <figure className="figure-frame">
              <img
                src={sedeImg}
                alt="Fachada da Hemissul em Boa Vista"
                loading="eager"
              />
            </figure>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p className="pill-tag pill-tag--accent">
              <MapPin size={14} aria-hidden="true" /> Visite a sede
            </p>
            <h2 className="home-section__title">
              Onde a Hemissul fica em Boa Vista.
            </h2>
            <address className="page-address">
              Av. Mário Homem de Melo, 3999, Buritis
              <br />
              Boa Vista — RR, CEP 69309-198
            </address>

            <div className="contact-row-list">
              <a className="contact-row" href="tel:08009402163">
                <span className="contact-row__icon">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <div>
                  <span className="contact-row__label">Assistência 24 h</span>
                  <strong>0800 940 2163</strong>
                </div>
              </a>
              <a
                className="contact-row"
                href="https://wa.me/5595991381037"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-row__icon">
                  <WhatsappIcon style={{ width: 18, height: 18 }} />
                </span>
                <div>
                  <span className="contact-row__label">Cotação e atendimento</span>
                  <strong>(95) 99138-1037</strong>
                </div>
              </a>
              <a
                className="contact-row"
                href="https://wa.me/5595991574355"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-row__icon">
                  <WhatsappIcon style={{ width: 18, height: 18 }} />
                </span>
                <div>
                  <span className="contact-row__label">Pronta resposta</span>
                  <strong>(95) 99157-4355</strong>
                </div>
              </a>
              <a className="contact-row" href="mailto:contato@hemissul.com.br">
                <span className="contact-row__icon">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <div>
                  <span className="contact-row__label">E-mail</span>
                  <strong>contato@hemissul.com.br</strong>
                </div>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="map-frame">
              <iframe
                src="https://www.google.com/maps?q=Av.+Mario+Homem+de+Melo,+3999,+Boa+Vista,+RR&output=embed"
                allowFullScreen
                loading="lazy"
                title="Localização da Hemissul em Boa Vista"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <p className="pill-tag pill-tag--accent">
              <Clock3 size={14} aria-hidden="true" /> Horários
            </p>
            <h2 className="home-section__title">
              Quando você pode passar por aqui.
            </h2>
            <p className="home-section__copy">
              O atendimento presencial é dedicado para cotação, adesão,
              vistorias e suporte. A assistência 24 h funciona todos os dias
              pelo telefone.
            </p>
          </FadeIn>

          <div className="local-strip">
            {horarios.map(([dia, hora]) => (
              <FadeIn className="local-strip__item" key={dia}>
                <span className="local-strip__label">{dia}</span>
                <span className="local-strip__value">{hora}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-photo">
        <img
          src={sedeImg2}
          alt="Vista da sede da Hemissul em Boa Vista"
          loading="lazy"
        />
        <div className="brand-photo__caption">
          <strong>Uma associação feita em Boa Vista.</strong>
          <span>Atendimento humano e presença próxima desde 2019.</span>
        </div>
      </section>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">A região e a chegada.</h2>
            <p className="home-section__copy">
              Pontos para você se planejar antes de visitar.
            </p>
          </FadeIn>

          <dl className="info-list" style={{ marginTop: '2rem', maxWidth: '32rem' }}>
            {proximos.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  )
}
