import { Link, useLocation } from 'react-router-dom'
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  LinkedInIcon,
  WhatsappIcon,
} from './SocialIcons'
import { SITE } from '../config/site'

/**
 * Frase de fecho do rodapé. Nas páginas de segmento ela reforça o CTA daquela
 * categoria, em vez de repetir a mesma frase institucional em todo o site.
 */
const STATEMENT_DEFAULT = 'Proteção se constrói com presença, clareza e resposta.'

const STATEMENT_BY_PATH = {
  '/protecao-veicular/carros':
    'Proteja o carro que leva a sua família todos os dias.',
  '/protecao-veicular/motos':
    'Sua moto é liberdade. A proteção não pode ser um peso.',
  '/protecao-veicular/motorista-aplicativo':
    'Seu carro é sua ferramenta de trabalho. Ele não pode parar.',
  '/protecao-veicular/caminhoes':
    'Na estrada, quem anda protegido chega mais longe.',
  '/protecao-veicular/frotas-empresas':
    'Sua operação não para. Sua frota também não pode.',
}

const footerLinks = [
  ['Proteção veicular', '/protecao-veicular'],
  ['Frotas e empresas', '/protecao-veicular/frotas-empresas'],
  ['Assistência 24h', '/assistencia-24h'],
  ['Rastreamento', '/rastreamento-veicular'],
  ['Aplicativo', '/aplicativo'],
  ['Clube de Benefícios', '/clube-de-beneficios'],
  ['Central do associado', '/central-do-associado'],
  ['Quem somos', '/quem-somos'],
  ['Boa Vista/RR', '/boa-vista-rr'],
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
  const { pathname } = useLocation()
  const statement = STATEMENT_BY_PATH[pathname] || STATEMENT_DEFAULT

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__statement">{statement}</p>

        <div className="site-footer__contacts">
          <div className="site-footer__contact">
            <span className="site-footer__label">Assistência 24h</span>
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
          {SITE.units.map((unit) => (
            <div className="site-footer__contact" key={unit.name}>
              <span className="site-footer__label">{unit.name}</span>
              <address>
                {unit.address}
                <br />
                {unit.city}
                {unit.cep ? ` · CEP ${unit.cep}` : ''}
              </address>
            </div>
          ))}
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
            Não somos uma seguradora. Somos uma associação de proteção patrimonial
            mutualista. Nossos benefícios e condições seguem o regulamento vigente.
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
