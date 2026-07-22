import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Headphones,
  Menu,
  Phone,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'
import logo from '../assets/logo/logo-transparente/hemissul-logo-azul-transparente-800px.png'
import { SITE } from '../config/site'

const navGroups = [
  {
    title: 'Proteção',
    links: [
      ['Proteção veicular', '/protecao-veicular'],
      ['Carros', '/protecao-veicular/carros'],
      ['Motos', '/protecao-veicular/motos'],
      ['Motorista de aplicativo', '/protecao-veicular/motorista-aplicativo'],
      ['Frotas e empresas', '/protecao-veicular/frotas-empresas'],
    ],
  },
  {
    title: 'Serviços',
    links: [
      ['Assistência 24h', '/assistencia-24h'],
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
      ['Cotação', '/cotacao'],
    ],
  },
  {
    title: 'Hemissul',
    links: [
      ['Quem somos', '/quem-somos'],
      ['Boa Vista/RR', '/boa-vista-rr'],
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

  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('nav-open')
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('nav-open')
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`site-nav${open ? ' site-nav--open' : ''}`}>
      <div className="site-nav__bar">
        <Link className="site-nav__logo" to="/" aria-label="Hemissul, página inicial">
          <img src={logo} alt="Hemissul" width="800" height="300" />
        </Link>

        <div className="site-nav__actions">
          <a className="site-nav__phone" href={SITE.phone.assistanceHref}>
            <Phone size={16} aria-hidden="true" />
            {SITE.phone.assistance}
          </a>
          <Link className="site-nav__member" to="/central-do-associado">
            <UserRound size={17} aria-hidden="true" />
            <span>Área do associado</span>
          </Link>
          <div className="site-nav__action-cluster">
            <a
              className="site-nav__quote"
              href={SITE.links.quote}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="site-nav__quote-long">Fazer cotação</span>
              <span className="site-nav__quote-short">Cotação</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <button
              className="site-nav__menu-button"
              type="button"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls="site-navigation"
              onClick={() => setOpen((current) => !current)}
            >
              <span>{open ? 'Fechar' : 'Menu'}</span>
              <span className="site-nav__menu-icon" aria-hidden="true">
                {open ? <X size={19} /> : <Menu size={19} />}
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="site-nav__panel"
            id="site-navigation"
            aria-label="Navegação principal"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="site-nav__panel-inner">
              <div className="site-nav__panel-lead">
                <span>Explore a Hemissul</span>
                <strong>Tudo para seguir protegido.</strong>
              </div>

              <div className="site-nav__panel-grid">
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

              <div className="site-nav__panel-footer">
                <a href={SITE.phone.assistanceHref}>
                  <Headphones size={19} aria-hidden="true" />
                  <span>
                    <small>Assistência 24h</small>
                    <strong>{SITE.phone.assistance}</strong>
                  </span>
                </a>
                <Link to="/protecao-veicular">
                  <ShieldCheck size={19} aria-hidden="true" />
                  <span>
                    <small>Conheça o programa</small>
                    <strong>Proteção veicular</strong>
                  </span>
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
