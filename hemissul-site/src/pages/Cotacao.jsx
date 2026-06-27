import { ExternalLink, Check, MessageCircle } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { SITE } from '../config/site'

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
              <li><Check size={17} aria-hidden="true" /> Cadastro seguro no PowerCRM</li>
              <li><Check size={17} aria-hidden="true" /> Retorno da equipe comercial</li>
              <li><Check size={17} aria-hidden="true" /> Condições explicadas antes da adesão</li>
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
              <MessageCircle size={17} aria-hidden="true" /> Prefiro falar no WhatsApp
            </a>
            <small>
              Ao continuar, você também estará sujeito aos termos e ao aviso de
              privacidade exibidos no formulário de cotação.
            </small>
          </FadeIn>
        </div>
      </header>
    </div>
  )
}
