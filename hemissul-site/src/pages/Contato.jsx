import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const canais = [
  ['Assistência 24 h', 'Emergências com o veículo', '0800 940 2163', 'tel:08009402163', Phone],
  ['Comercial', 'Cotação e novas adesões', '(95) 99138-1037', 'https://wa.me/5595991381037', MessageSquare],
  ['Pronta resposta', 'Acidente, roubo, furto e eventos', '(95) 99157-4355', 'https://wa.me/5595991574355', Phone],
  ['Financeiro e plano', 'Boletos, pagamentos e benefícios', '(95) 4020-1719', 'tel:+559540201719', MessageSquare],
  ['Marketing', 'Parcerias, imprensa e ações', 'contato@hemissul.com.br', 'mailto:contato@hemissul.com.br', Mail],
]

export default function Contato() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Contato</p>
            <h1 className="page-header__title">Fale diretamente com a equipe certa.</h1>
            <p className="page-header__lede">
              Escolha o assunto para chegar ao canal responsável com mais rapidez.
            </p>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <div className="contact-lines">
            {canais.map(([title, desc, value, href, Icon], index) => (
              <FadeIn key={title} delay={index * 0.05}>
                <a
                  className="contact-line"
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="channel-card__icon"><Icon size={18} aria-hidden="true" /></span>
                  <span>
                    <strong>{title}</strong>
                    <small>{desc}</small>
                  </span>
                  <b>{value}</b>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <MapPin size={28} aria-hidden="true" />
            <h2 className="home-section__title">Atendimento presencial em Boa Vista.</h2>
            <p className="home-section__copy">
              Av. Mário Homem de Melo, 3999, Buritis, Boa Vista — RR,
              CEP 69309-198.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="map-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.0!2d-60.6894!3d2.8235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwNDknMjQuNiJOIDYwwrA0MScyMS44Ilc!5e0!3m2!1spt-BR!2sbr!4v1"
                allowFullScreen
                loading="lazy"
                title="Localização da Hemissul"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
