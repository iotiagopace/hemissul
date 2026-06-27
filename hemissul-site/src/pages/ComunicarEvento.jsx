import { AlertTriangle, Car, ShieldAlert, Phone } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const colisaoPassos = [
  'Pare em local seguro, sinalize a via e verifique se alguém precisa de atendimento.',
  'Acione os serviços de emergência quando necessário.',
  'Registre a ocorrência com informações completas: local, data, condutores, veículos, testemunhas, danos.',
  'Não faça acordos ou autorize reparos antes de falar com a Hemissul.',
  'Fotografe o local, veículos, placas e danos com segurança.',
  'Contate o canal de pronta resposta e siga as orientações para envio dos documentos.',
]

const rouboPassos = [
  'Comunique imediatamente a polícia e registre o boletim de ocorrência.',
  'Acione a empresa de rastreamento ou a central indicada pela Hemissul.',
  'Avise a Hemissul pelo canal de pronta resposta.',
  'Não tente localizar ou recuperar o veículo por conta própria.',
  'Envie os documentos solicitados e acompanhe pelos canais oficiais.',
]

export default function ComunicarEvento() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Em caso de evento</p>
            <h1 className="page-header__title">
              O que aconteceu com o seu veículo?
            </h1>
            <p className="page-header__lede">
              Se houver pessoas feridas ou risco no local, acione primeiro os
              serviços públicos de emergência. Em seguida, siga a orientação
              correta para o seu caso.
            </p>
            <div className="home-hero__actions">
              <a href="tel:08009402163" className="button-primary">
                <Phone size={18} aria-hidden="true" /> Assistência 24 h
              </a>
              <a
                href="https://wa.me/5595991574355"
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
              >
                Pronta resposta (WhatsApp)
              </a>
            </div>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p className="pill-tag pill-tag--accent">
              <Car size={14} aria-hidden="true" /> Colisão
            </p>
            <h2 className="home-section__title">Em caso de colisão.</h2>
            <p className="home-section__copy">
              Mantenha a calma e siga os passos. A pronta resposta orienta o
              encaminhamento do reparo.
            </p>
          </FadeIn>

          <FadeIn className="editorial-list" delay={0.05}>
            {colisaoPassos.map((p, index) => (
              <div className="editorial-list__item" key={p}>
                <span className="editorial-list__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="editorial-list__title" style={{ fontSize: 'var(--text-md)' }}>
                    {p}
                  </h3>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p className="pill-tag pill-tag--accent">
              <ShieldAlert size={14} aria-hidden="true" /> Roubo ou furto
            </p>
            <h2 className="home-section__title">Em caso de roubo ou furto.</h2>
            <p className="home-section__copy">
              Atue rápido pelos canais oficiais. Não tente recuperar o veículo
              por conta própria.
            </p>
          </FadeIn>

          <FadeIn className="editorial-list" delay={0.05}>
            {rouboPassos.map((p, index) => (
              <div className="editorial-list__item" key={p}>
                <span className="editorial-list__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="editorial-list__title" style={{ fontSize: 'var(--text-md)' }}>
                    {p}
                  </h3>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="page-section page-section--dark">
        <div className="site-container">
          <FadeIn className="stack--lg">
            <p
              className="pill-tag"
              style={{ color: 'var(--color-paper)', borderColor: 'var(--color-ink-rule)' }}
            >
              <AlertTriangle size={14} aria-hidden="true" /> Pronta resposta
            </p>
            <h2 className="home-section__title">
              Canal direto para situações críticas.
            </h2>
            <p
              className="home-section__copy"
              style={{ color: 'var(--color-ink-subtle)' }}
            >
              WhatsApp de pronta resposta:{' '}
              <a
                href="https://wa.me/5595991574355"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-paper)' }}
              >
                (95) 99157-4355
              </a>
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
