import { Link } from 'react-router-dom'
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  LinkedInIcon,
  WhatsappIcon,
} from './SocialIcons'
import { SITE } from '../config/site'

const footerLinks = [
  ['Proteção veicular', '/protecao-veicular'],
  ['Assistência 24 h', '/assistencia-24h'],
  ['Rastreamento', '/rastreamento-veicular'],
  ['Aplicativo', '/aplicativo'],
  ['Clube de Benefícios', '/clube-de-beneficios'],
  ['Central do associado', '/central-do-associado'],
  ['Quem somos', '/quem-somos'],
  ['Boa Vista — RR', '/boa-vista-rr'],
  ['Dúvidas frequentes', '/duvidas-frequentes'],
  ['Blog', '/blog'],
  ['Podcast', '/podcast'],
  ['Trabalhe conosco', '/trabalhe-conosco'],
  ['Documentos', '/documentos'],
  ['Cotação', '/cotacao'],
  ['Contato', '/contato'],
]

const socialLinks = [
  [SITE.links.instagram, 'Instagram', InstagramIcon],
  [SITE.links.facebook, 'Facebook', FacebookIcon],
  [SITE.links.youtube, 'YouTube', YoutubeIcon],
  [SITE.links.linkedin, 'LinkedIn', LinkedInIcon],
  [SITE.phone.responseHref, 'WhatsApp', WhatsappIcon],
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__statement">
          Proteção se constrói com presença, clareza e resposta.
        </p>

        <div className="site-footer__contacts">
          <div className="site-footer__contact">
            <span className="site-footer__label">Assistência 24 h</span>
            <a href={SITE.phone.assistanceHref}>{SITE.phone.assistance}</a>
          </div>
          <div className="site-footer__contact">
            <span className="site-footer__label">Pronta resposta</span>
            <a
              href={SITE.phone.responseHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE.phone.response}
            </a>
          </div>
          <div className="site-footer__contact">
            <span className="site-footer__label">Comercial</span>
            <a href={SITE.phone.commercialHref}>{SITE.phone.commercial}</a>
          </div>
          <div className="site-footer__contact">
            <span className="site-footer__label">Cotação · WhatsApp</span>
            <a
              href={SITE.phone.quoteHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE.phone.quote}
            </a>
          </div>
          <div className="site-footer__contact">
            <span className="site-footer__label">E-mail</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className="site-footer__contact">
            <span className="site-footer__label">Sede</span>
            <address>
              {SITE.address}
            </address>
          </div>
        </div>

        <div className="site-footer__social" aria-label="Redes sociais">
          {socialLinks.map(([href, label, Icon]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Hemissul no ${label}`}
            >
              <Icon style={{ width: 20, height: 20 }} />
            </a>
          ))}
        </div>

        <nav className="site-footer__links" aria-label="Links do rodapé">
          {footerLinks.map(([label, path]) => (
            <Link to={path} key={path}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="site-footer__meta">
          <p>
            © {new Date().getFullYear()} Hemissul · CNPJ {SITE.cnpj}
          </p>
          <p>
            A Hemissul não é seguradora. É uma associação de proteção patrimonial
            mutualista. Benefícios e condições seguem o regulamento vigente.
          </p>
        </div>

        <nav className="site-footer__legal" aria-label="Links legais">
          <Link to="/privacidade">Privacidade</Link>
          <Link to="/cookies">Cookies</Link>
          <Link to="/termos-de-uso">Termos de Uso</Link>
        </nav>

        <p className="site-footer__credit">
          Desenvolvido por{' '}
          <a href="https://metry.cc" target="_blank" rel="noopener noreferrer">
            metry.cc
          </a>
        </p>
      </div>
    </footer>
  )
}
