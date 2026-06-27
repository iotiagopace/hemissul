import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Phone, X } from 'lucide-react'
import logo from '../assets/logo/logo-transparente/hemissul-logo-azul-transparente-800px.png'
import { SITE } from '../config/site'

const navGroups = [
  {
    title: 'Proteção',
    links: [
      ['Proteção veicular', '/protecao-veicular'],
      ['Carros', '/protecao-veicular/carros'],
      ['Motos', '/protecao-veicular/motos'],
      ['Caminhões', '/protecao-veicular/caminhoes'],
    ],
  },
  {
    title: 'Serviços',
    links: [
      ['Assistência 24 h', '/assistencia-24h'],
      ['Rastreamento', '/rastreamento-veicular'],
      ['Aplicativo', '/aplicativo'],
      ['Clube de Benefícios', '/clube-de-beneficios'],
      ['Comunicar evento', '/comunicar-evento'],
    ],
  },
  {
    title: 'Associado',
    links: [
      ['Central do associado', '/central-do-associado'],
      ['Dúvidas frequentes', '/duvidas-frequentes'],
      ['Documentos', '/documentos'],
      ['Cotação', '/cotacao'],
    ],
  },
  {
    title: 'Hemissul',
    links: [
      ['Quem somos', '/quem-somos'],
      ['Boa Vista — RR', '/boa-vista-rr'],
      ['Blog', '/blog'],
      ['Podcast', '/podcast'],
      ['Trabalhe conosco', '/trabalhe-conosco'],
      ['Contato', '/contato'],
    ],
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="site-nav">
      <div className="site-nav__bar">
        <Link className="site-nav__logo" to="/" aria-label="Hemissul — início">
          <img src={logo} alt="Hemissul" width="800" height="300" />
        </Link>

        <div className="site-nav__actions">
          <Link className="site-nav__quick-link" to="/clube-de-beneficios">
            Benefícios
          </Link>
          <Link className="site-nav__quick-link" to="/central-do-associado">
            Associado
          </Link>
          <a className="site-nav__phone" href={SITE.phone.assistanceHref}>
            <Phone size={16} aria-hidden="true" />
            {SITE.phone.assistance}
          </a>
          <a
            className="site-nav__quote"
            href={SITE.links.quote}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotação
          </a>
          <button
            className="site-nav__menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="site-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            <span>{open ? 'Fechar' : 'Menu'}</span>
            {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="site-nav__panel" id="site-navigation" aria-label="Navegação principal">
          <div className="site-nav__panel-inner">
            {navGroups.map((group) => (
              <div className="site-nav__group" key={group.title}>
                <p className="site-nav__group-title">{group.title}</p>
                {group.links.map(([label, path]) => (
                  <Link
                    className="site-nav__link"
                    to={path}
                    aria-current={location.pathname === path ? 'page' : undefined}
                    key={path}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
