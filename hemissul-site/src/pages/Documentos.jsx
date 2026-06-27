import { Link } from 'react-router-dom'
import { FileText, Mail, ShieldCheck } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const legais = [
  ['Aviso de Privacidade', '/privacidade'],
  ['Política de Cookies', '/cookies'],
  ['Termos de Uso do site', '/termos-de-uso'],
]

const institucionais = [
  'Regulamento vigente do programa',
  'Termo de participação por adesão',
  'Estatuto social',
  'Comprovantes e documentos regulatórios aplicáveis',
]

export default function Documentos() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Documentos</p>
            <h1 className="page-header__title">Transparência começa pelo acesso à informação.</h1>
            <p className="page-header__lede">
              Consulte as políticas do site e solicite à equipe a versão oficial
              dos documentos vinculados à sua adesão.
            </p>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container split split--start">
          <div className="document-list">
            {legais.map(([label, path], index) => (
              <FadeIn key={path} delay={index * 0.04}>
                <Link className="document-row" to={path}>
                  <ShieldCheck size={20} aria-hidden="true" />
                  <span>{label}</span>
                  <small>Acessar</small>
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="privacy-note" delay={0.1}>
            <FileText size={28} aria-hidden="true" />
            <h2>Documentos do programa</h2>
            <p>
              Regulamento, estatuto e termo de adesão devem ser fornecidos na
              versão oficial aplicável ao associado.
            </p>
            <ul className="plain-list">
              {institucionais.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a href="mailto:contato@hemissul.com.br?subject=Solicitação%20de%20documentos">
              <Mail size={16} aria-hidden="true" /> Solicitar por e-mail
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
