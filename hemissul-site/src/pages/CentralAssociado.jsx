import { Link } from 'react-router-dom'
import { LockKeyhole, FileText, Smartphone, ArrowRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import StoreBadges from '../components/StoreBadges'
import { HINOVA_LOGIN_KEY, SITE } from '../config/site'

export default function CentralAssociado() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split split--start">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Área do associado</p>
            <h1 className="page-header__title">Acesse sua conta Hemissul.</h1>
            <p className="page-header__lede">
              Entre com CPF e senha para consultar informações vinculadas ao seu
              cadastro no ambiente seguro da Hinova.
            </p>
            <div className="associated-services">
              <span><FileText size={18} aria-hidden="true" /> Boletos e pagamentos</span>
              <span><Smartphone size={18} aria-hidden="true" /> Dados do plano</span>
              <span><LockKeyhole size={18} aria-hidden="true" /> Ambiente autenticado</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form
              className="form-card associate-login"
              action={SITE.links.associateLogin}
              method="post"
              target="_blank"
            >
              <h2>Entrar na área do associado</h2>
              <div className="form-field">
                <label htmlFor="dfsCpf">CPF</label>
                <input
                  id="dfsCpf"
                  name="dfsCpf"
                  inputMode="numeric"
                  autoComplete="username"
                  maxLength="14"
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="dfsSenha">Senha</label>
                <input
                  id="dfsSenha"
                  name="dfsSenha"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>
              <input type="hidden" name="dfsChave" value={HINOVA_LOGIN_KEY} />
              <button type="submit" name="pbEntrar" className="button-primary">
                Entrar com segurança <ArrowRight size={17} aria-hidden="true" />
              </button>
              <a
                href={SITE.links.forgotPassword}
                target="_blank"
                rel="noopener noreferrer"
                className="type-link"
              >
                Esqueci minha senha
              </a>
              <small>
                O acesso é processado diretamente pela plataforma Hinova.
              </small>
            </form>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p className="pill-tag pill-tag--accent">
              <Smartphone size={14} aria-hidden="true" /> Aplicativo
            </p>
            <h2 className="home-section__title">Prefere acessar pelo celular?</h2>
            <p className="home-section__copy">
              O aplicativo reúne boletos, benefícios, assistência e canais de atendimento.
            </p>
          </FadeIn>
          <FadeIn className="stack--lg" delay={0.1}>
            <StoreBadges />
            <Link to="/aplicativo" className="type-link">Conhecer os recursos do app</Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
