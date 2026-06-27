import { Link } from 'react-router-dom'
import { FileText, Mail, ShieldCheck, ScrollText, BookOpen, Stamp } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const legais = [
  ['Aviso de Privacidade', '/privacidade', ShieldCheck],
  ['Política de Cookies', '/cookies', ShieldCheck],
  ['Termos de Uso do site', '/termos-de-uso', ScrollText],
]

const institucionais = [
  ['Regulamento vigente do programa', ScrollText],
  ['Termo de participação por adesão', FileText],
  ['Estatuto social', BookOpen],
  ['Documentos regulatórios aplicáveis', Stamp],
]

export default function Documentos() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Documentos</p>
            <h1 className="page-header__title">
              Transparência começa pelo acesso à informação.
            </h1>
            <p className="page-header__lede">
              Consulte as políticas do site e solicite à equipe a versão
              oficial dos documentos vinculados à sua adesão.
            </p>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <p className="pill-tag pill-tag--accent">
              <ShieldCheck size={14} aria-hidden="true" /> Políticas do site
            </p>
            <h2 className="home-section__title">
              Como tratamos privacidade, cookies e uso.
            </h2>
            <p className="home-section__copy">
              Documentos que regem a relação digital com a Hemissul. Sujeitos
              à revisão jurídica conforme atualizações regulatórias.
            </p>
          </FadeIn>

          <div className="contact-row-list" style={{ marginTop: '2rem' }}>
            {legais.map(([label, path, Icon], index) => (
              <FadeIn key={path} delay={index * 0.05}>
                <Link to={path} className="contact-row">
                  <span className="contact-row__icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="contact-row__label">Acessar</span>
                    <strong>{label}</strong>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p className="pill-tag pill-tag--accent">
              <FileText size={14} aria-hidden="true" /> Programa
            </p>
            <h2 className="home-section__title">
              Documentos do programa de proteção.
            </h2>
            <p className="home-section__copy">
              Regulamento, estatuto e termo de adesão devem ser fornecidos na
              versão oficial aplicável ao associado. Solicite por e-mail e
              indique o número da sua adesão.
            </p>
            <a
              className="button-primary"
              href="mailto:contato@hemissul.com.br?subject=Solicita%C3%A7%C3%A3o%20de%20documentos%20do%20programa"
            >
              <Mail size={18} aria-hidden="true" /> Solicitar por e-mail
            </a>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="contact-row-list">
              {institucionais.map(([title, Icon]) => (
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
    </div>
  )
}
