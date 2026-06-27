import { Mail, MapPin, Phone } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import sedeImg from '../assets/fotos-reais/sede-fachada.jpg'

const contatos = [
  ['Endereço', 'Av. Mário Homem de Melo, 3999, Buritis, Boa Vista — RR, CEP 69309-198', MapPin],
  ['WhatsApp comercial', '(95) 99138-1037', Phone],
  ['E-mail', 'contato@hemissul.com.br', Mail],
  ['Assistência 24 h', '0800 940 2163', Phone],
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
              A sede da Hemissul fica em Boa Vista e reúne atendimento
              comercial, administrativo e suporte aos associados.
            </p>
            <div className="home-hero__actions">
              <a
                href="https://wa.me/5595991381037"
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
              >
                Falar no WhatsApp
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <figure className="figure-frame">
              <img src={sedeImg} alt="Sede da Hemissul em Boa Vista" />
            </figure>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container split">
          <div>
            <FadeIn>
              <h2 className="home-section__title">Visite a Hemissul.</h2>
            </FadeIn>
            <div className="editorial-list">
              {contatos.map(([label, value, Icon], index) => (
                <FadeIn className="editorial-list__item" key={label} delay={index * 0.05}>
                  <span className="channel-card__icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="editorial-list__title">{label}</h3>
                    <p className="editorial-list__desc">{value}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <FadeIn delay={0.1}>
            <div className="map-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.0!2d-60.6894!3d2.8235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwNDknMjQuNiJOIDYwwrA0MScyMS44Ilc!5e0!3m2!1spt-BR!2sbr!4v1"
                allowFullScreen
                loading="lazy"
                title="Localização da Hemissul em Boa Vista"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
