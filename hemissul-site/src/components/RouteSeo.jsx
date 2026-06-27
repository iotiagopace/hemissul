import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { findPost } from '../content/posts'

const routeMeta = {
  '/': ['Proteção Veicular em Boa Vista e no Brasil | Hemissul', 'Proteção veicular para carros, motos e caminhões, com assistência 24 horas e atendimento nacional.'],
  '/protecao-veicular': ['Proteção veicular | Hemissul', 'Conheça o programa de proteção patrimonial mutualista da Hemissul.'],
  '/protecao-veicular/carros': ['Proteção para carros | Hemissul', 'Proteção veicular e assistência para carros de uso particular, aplicativo e outras categorias aceitas.'],
  '/protecao-veicular/motos': ['Proteção para motos | Hemissul', 'Proteção e assistência para quem depende da motocicleta todos os dias.'],
  '/protecao-veicular/caminhoes': ['Proteção para caminhões | Hemissul', 'Consulte proteção e assistência para caminhões e veículos de trabalho.'],
  '/assistencia-24h': ['Assistência 24 horas | Hemissul', 'Acione assistência veicular 24 horas em todo o território nacional.'],
  '/rastreamento-veicular': ['Rastreamento veicular | Hemissul', 'Localização, histórico, alertas e suporte de rastreamento veicular.'],
  '/aplicativo': ['Aplicativo Hemissul', 'Baixe o aplicativo Hemissul e acesse boletos, benefícios e atendimento.'],
  '/central-do-associado': ['Área do associado | Hemissul', 'Entre na sua conta Hemissul, consulte boletos e acesse serviços do associado.'],
  '/comunicar-evento': ['Comunicar evento | Hemissul', 'Orientações para comunicar acidente, roubo, furto ou outro evento.'],
  '/quem-somos': ['Quem somos | Hemissul', 'Conheça a história, a atuação e os dados institucionais da Hemissul.'],
  '/boa-vista-rr': ['Hemissul em Boa Vista — RR', 'Endereço, atendimento e contatos da sede Hemissul em Boa Vista.'],
  '/duvidas-frequentes': ['Dúvidas frequentes | Hemissul', 'Respostas sobre proteção veicular, assistência, rastreamento e associação.'],
  '/cotacao': ['Cotação de proteção veicular | Hemissul', 'Inicie uma cotação de proteção veicular pelo canal oficial Hemissul.'],
  '/contato': ['Contato | Hemissul', 'Fale com assistência, pronta resposta, comercial e atendimento Hemissul.'],
  '/clube-de-beneficios': ['Clube de Benefícios | Hemissul', 'Parceiros e vantagens exclusivas para associados Hemissul.'],
  '/podcast': ['Podcast Hemissul', 'Histórias de transformação e conversas com convidados no Podcast Hemissul.'],
  '/trabalhe-conosco': ['Trabalhe conosco | Hemissul', 'Conheça a cultura Hemissul e envie seu currículo.'],
  '/blog': ['Blog | Hemissul', 'Notícias, orientações e histórias da comunidade Hemissul.'],
  '/documentos': ['Documentos | Hemissul', 'Acesse políticas e solicite documentos institucionais da Hemissul.'],
  '/privacidade': ['Aviso de Privacidade | Hemissul', 'Saiba como a Hemissul trata dados pessoais e como exercer seus direitos.'],
  '/cookies': ['Política de Cookies | Hemissul', 'Entenda os cookies utilizados no site Hemissul.'],
  '/termos-de-uso': ['Termos de Uso | Hemissul', 'Condições para utilização do site e dos canais digitais Hemissul.'],
}

function setMeta(selector, attribute, value) {
  let node = document.head.querySelector(selector)
  if (!node) {
    node = document.createElement('meta')
    const [name, property] = selector.includes('property=')
      ? [null, selector.match(/property="([^"]+)"/)?.[1]]
      : [selector.match(/name="([^"]+)"/)?.[1], null]
    if (name) node.setAttribute('name', name)
    if (property) node.setAttribute('property', property)
    document.head.appendChild(node)
  }
  node.setAttribute(attribute, value)
}

export default function RouteSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const slug = pathname.startsWith('/blog/') ? pathname.split('/').filter(Boolean).pop() : null
    const post = slug ? findPost(slug) : null
    const [title, description] = post
      ? [`${post.title} | Hemissul`, post.excerpt]
      : routeMeta[pathname] || ['Página não encontrada | Hemissul', 'A página solicitada não foi encontrada.']
    const origin = window.location.origin
    const canonicalUrl = `${origin}${pathname === '/' ? '/' : pathname}`

    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[name="robots"]', 'content', routeMeta[pathname] || post ? 'index,follow' : 'noindex,follow')
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', canonicalUrl)
    setMeta('meta[property="og:image"]', 'content', `${origin}/social/hemissul-og.png`)
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
  }, [pathname])

  return null
}
