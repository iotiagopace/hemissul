import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="page-light not-found">
      <div className="site-container">
        <span>404</span>
        <h1>Página não encontrada.</h1>
        <p>O endereço pode ter mudado ou o conteúdo não está mais disponível.</p>
        <Link to="/" className="button-primary"><ArrowLeft size={17} aria-hidden="true" /> Voltar ao início</Link>
      </div>
    </div>
  )
}
