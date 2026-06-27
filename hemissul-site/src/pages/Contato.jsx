import { Mail, Clock3, Phone, ShieldAlert, Banknote, Megaphone } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { WhatsappIcon, InstagramIcon, FacebookIcon, YoutubeIcon, LinkedInIcon } from '../components/SocialIcons'

const canais = [
  {
    title: 'Assistência 24 h',
    desc: 'Pane, reboque, atendimento emergencial.',
    value: '0800 940 2163',
    href: 'tel:08009402163',
    Icon: Phone,
    urgente: true,
  },
  {
    title: 'Pronta resposta',
    desc: 'Acidente, roubo, furto e eventos.',
    value: '(95) 99157-4355',
    href: 'https://wa.me/5595991574355',
    Icon: ShieldAlert,
    urgente: true,
  },
  {
    title: 'Cotação e atendimento',
    desc: 'Para novas adesões e dúvidas comerciais.',
    value: '(95) 99138-1037',
    href: 'https://wa.me/5595991381037',
    Icon: WhatsappIcon,
  },
  {
    title: 'Comercial',
    desc: 'Atendimento por telefone fixo.',
    value: '(95) 4020-1719',
    href: 'tel:+559540201719',
    Icon: Phone,
  },
  {
    title: 'Financeiro e plano',
    desc: 'Boletos, pagamentos e benefícios do associado.',
    value: '(95) 99138-1037',
    href: 'https://wa.me/5595991381037',
    Icon: Banknote,
  },
  {
    title: 'Marketing e parcerias',
    desc: 'Imprensa, conteúdo, eventos.',
    value: 'contato@hemissul.com.br',
    href: 'mailto:contato@hemissul.com.br',
    Icon: Megaphone,
  },
]

const redes = [
  ['Instagram', 'https://www.instagram.com/hemissulprotecaoveicular/', InstagramIcon],
  ['Facebook', 'https://www.facebook.com/Hemissul', FacebookIcon],
  ['YouTube', 'https://www.youtube.com/@HemissulProtecaoVeicular', YoutubeIcon],
  ['LinkedIn', 'https://www.linkedin.com/in/hemissul-prote%C3%A7%C3%A3o-veicular-3349ba292/', LinkedInIcon],
]

export default function Contato() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Contato</p>
            <h1 className="page-header__title">
              Fale diretamente com a equipe certa.
            </h1>
            <p className="page-header__lede">
              Escolha o assunto para chegar ao canal responsável com mais
              rapidez. Em emergências, o 0800 940 2163 atende 24 horas.
            </p>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">Canais por assunto.</h2>
            <p className="home-section__copy">
              Os dois primeiros são urgência: telefone e pronta resposta. Os
              demais cobrem cotação, plano, financeiro e parcerias.
            </p>
          </FadeIn>

          <div className="contact-row-list" style={{ marginTop: '2rem' }}>
            {canais.map(({ title, desc, value, href, Icon, urgente }, index) => (
              <FadeIn key={title} delay={index * 0.04}>
                <a
                  className={`contact-row ${urgente ? 'contact-row--urgent' : ''}`}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="contact-row__icon">
                    {Icon === WhatsappIcon ? (
                      <Icon style={{ width: 18, height: 18 }} />
                    ) : (
                      <Icon size={18} aria-hidden="true" />
                    )}
                  </span>
                  <div>
                    <span className="contact-row__label">{title}</span>
                    <strong>{value}</strong>
                    <p className="contact-row__desc">{desc}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p className="pill-tag pill-tag--accent">
              <Clock3 size={14} aria-hidden="true" /> Horários
            </p>
            <h2 className="home-section__title">
              Atendimento presencial em Boa Vista.
            </h2>
            <address className="page-address">
              Av. Mário Homem de Melo, 3999, Buritis
              <br />
              Boa Vista — RR, CEP 69309-198
            </address>
            <p className="home-section__copy">
              Segunda a sexta, 8h às 18h. Sábado, 8h às 12h. A assistência 24 h
              opera todos os dias.
            </p>
            <a
              className="type-link"
              href="mailto:contato@hemissul.com.br"
            >
              <Mail size={17} aria-hidden="true" /> contato@hemissul.com.br
            </a>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="map-frame">
              <iframe
                src="https://www.google.com/maps?q=Av.+Mario+Homem+de+Melo,+3999,+Boa+Vista,+RR&output=embed"
                allowFullScreen
                loading="lazy"
                title="Localização da Hemissul"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="stack--lg">
            <p className="pill-tag pill-tag--accent">Acompanhe nas redes</p>
            <h2 className="home-section__title">A Hemissul também está por aqui.</h2>
          </FadeIn>

          <div className="social-row" style={{ marginTop: '2rem' }}>
            {redes.map(([label, href, Icon]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-row__item"
              >
                <span className="social-row__icon">
                  <Icon style={{ width: 18, height: 18 }} />
                </span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
