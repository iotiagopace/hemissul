import { ExternalLink, Check, MessageCircle, FileText, ClipboardList, ShieldCheck } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { SITE } from '../config/site'

const etapas = [
  ['Você preenche', 'Nome, telefone, e-mail e placa do veículo.'],
  ['A equipe retorna', 'Apresenta as condições do plano e tira dúvidas.'],
  ['Documentos e vistoria', 'Envio dos arquivos solicitados e vistoria do veículo.'],
  ['Início da proteção', 'Após confirmação, a proteção começa conforme o regulamento.'],
]

const documentos = [
  ['CNH do condutor principal', ClipboardList],
  ['CRLV do veículo', FileText],
  ['Comprovante de residência', FileText],
  ['Vistoria do veículo', ShieldCheck],
]

export default function Cotacao() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Cotação</p>
            <h1 className="page-header__title">
              Comece sua cotação pelo canal oficial da Hemissul.
            </h1>
            <p className="page-header__lede">
              Seus dados seguem diretamente para o sistema comercial usado pela
              equipe. A cotação não garante adesão nem início de proteção.
            </p>
            <ul className="check-list" aria-label="Como funciona">
              <li>
                <Check size={17} aria-hidden="true" /> Cadastro seguro no PowerCRM
              </li>
              <li>
                <Check size={17} aria-hidden="true" /> Retorno da equipe comercial
              </li>
              <li>
                <Check size={17} aria-hidden="true" /> Condições explicadas antes da
                adesão
              </li>
            </ul>
          </FadeIn>

          <FadeIn className="quote-panel" delay={0.1}>
            <span>Canal oficial de cotação</span>
            <h2>Leva menos de dois minutos para começar.</h2>
            <p>
              Informe nome, telefone, e-mail e placa. O formulário será aberto
              em uma nova guia no ambiente integrado ao CRM da Hemissul.
            </p>
            <a
              href={SITE.links.quote}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              Iniciar cotação <ExternalLink size={18} aria-hidden="true" />
            </a>
            <a
              href={SITE.phone.quoteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="type-link"
            >
              <MessageCircle size={17} aria-hidden="true" /> Prefiro falar no
              WhatsApp
            </a>
            <small>
              Ao continuar, você também estará sujeito aos termos e ao aviso de
              privacidade exibidos no formulário de cotação.
            </small>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">
              Como funciona, do primeiro contato à proteção ativa.
            </h2>
            <p className="home-section__copy">
              Quatro etapas claras para você saber exatamente o que vem antes
              e depois da cotação.
            </p>
          </FadeIn>

          <div className="editorial-list">
            {etapas.map(([title, desc], index) => (
              <FadeIn
                className="editorial-list__item"
                key={title}
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

      <section className="page-section">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p className="pill-tag pill-tag--accent">
              <ClipboardList size={14} aria-hidden="true" /> O que ter à mão
            </p>
            <h2 className="home-section__title">
              Documentos que aceleram a adesão.
            </h2>
            <p className="home-section__copy">
              Não é preciso enviar tudo na cotação inicial — esses são os
              documentos solicitados ao longo do processo.
            </p>
          </FadeIn>

          <FadeIn className="stack" delay={0.1}>
            <div className="contact-row-list">
              {documentos.map(([title, Icon]) => (
                <div key={title} className="contact-row">
                  <span className="contact-row__icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{title}</strong>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="closing-section">
        <div className="site-container closing-section__inner">
          <FadeIn as="h2">Tudo pronto? Comece em menos de 2 minutos.</FadeIn>
          <FadeIn delay={0.1}>
            <a
              href={SITE.links.quote}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              Iniciar cotação <ExternalLink size={18} aria-hidden="true" />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
