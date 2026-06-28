import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { findPost } from '../content/posts'

const DOMAIN = 'https://hemissul.vercel.app'
const OG_IMAGE = `${DOMAIN}/social/hemissul-og.png`
const LOGO = `${DOMAIN}/favicon.png`

const ORG_ID = `${DOMAIN}/#organization`
const WEBSITE_ID = `${DOMAIN}/#website`

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Hemissul',
      legalName: 'Hemissul — Associação de Proteção Patrimonial Mutualista',
      url: `${DOMAIN}/`,
      logo: { '@type': 'ImageObject', url: LOGO },
      foundingDate: '2019',
      description:
        'Associação de proteção patrimonial mutualista com sede em Boa Vista, Roraima. Proteção veicular para carros, motos e caminhões com assistência 24 horas e atendimento nacional.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Mário Homem de Melo, 3999, Buritis',
        addressLocality: 'Boa Vista',
        addressRegion: 'RR',
        postalCode: '69309-198',
        addressCountry: 'BR',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          telephone: '+558009402163',
          availableLanguage: 'Portuguese',
          contactOption: 'TollFree',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+5595991381037',
          availableLanguage: 'Portuguese',
          contactOption: 'WhatsApp',
        },
      ],
      sameAs: [
        'https://www.instagram.com/hemissuloficial/',
        'https://www.facebook.com/hemissuloficial/',
        'https://www.youtube.com/@hemissuloficial',
        'https://wa.me/5595991381037',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${DOMAIN}/`,
      name: 'Hemissul',
      inLanguage: 'pt-BR',
      publisher: { '@id': ORG_ID },
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'A Hemissul é uma seguradora?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. A Hemissul é uma associação de proteção patrimonial mutualista. A relação com o participante segue o termo de adesão, o regulamento e a legislação aplicável.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é proteção patrimonial mutualista?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É um modelo em que participantes vinculados a uma associação compartilham os custos dos eventos previstos, conforme contrato e regulamento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais veículos podem ser protegidos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Há opções para carros, motos e caminhões. A aceitação depende da categoria, uso, valor, vistoria e regras vigentes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais benefícios estão disponíveis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Podem incluir colisão, roubo, furto, perda total, danos materiais a terceiros, assistência 24 horas, rastreamento e outros benefícios previstos no plano.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona o rateio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Os custos dos eventos e as despesas do grupo são compartilhados conforme as regras definidas no contrato e no regulamento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como aciono a assistência 24 horas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ligue para 0800 940 2163 e informe CPF, placa, localização e o problema apresentado pelo veículo.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que fazer em caso de roubo ou furto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Registre a ocorrência policial, acione imediatamente o rastreamento e avise a Hemissul. Não tente recuperar o veículo por conta própria.',
      },
    },
    {
      '@type': 'Question',
      name: 'A assistência funciona fora de Roraima?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O atendimento é nacional, sujeito à rede, aos limites e às condições do plano contratado.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quando a proteção começa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O início ocorre após o cumprimento das etapas de adesão e a confirmação da Hemissul. Consulte o termo de adesão para o prazo aplicável.',
      },
    },
    {
      '@type': 'Question',
      name: 'Onde a Hemissul fica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A sede fica em Boa Vista, Roraima, na Av. Mário Homem de Melo, 3999, Buritis. O atendimento da assistência é nacional.',
      },
    },
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${DOMAIN}/boa-vista-rr#local`,
  name: 'Hemissul — Boa Vista, RR',
  legalName: 'Hemissul — Associação de Proteção Patrimonial Mutualista',
  url: `${DOMAIN}/boa-vista-rr`,
  image: `${DOMAIN}/social/hemissul-og.png`,
  logo: LOGO,
  description:
    'Associação de proteção patrimonial mutualista em Boa Vista, Roraima. Proteção veicular com assistência 24 horas e atendimento nacional.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Mário Homem de Melo, 3999, Buritis',
    addressLocality: 'Boa Vista',
    addressRegion: 'RR',
    postalCode: '69309-198',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 2.8038,
    longitude: -60.6748,
  },
  telephone: '+558009402163',
  email: 'contato@hemissul.com.br',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '12:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'BRL',
  paymentAccepted: 'Pix, Boleto, Cartão',
  areaServed: { '@type': 'Country', name: 'Brazil' },
  parentOrganization: { '@id': ORG_ID },
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${DOMAIN}/contato#page`,
  name: 'Contato | Hemissul',
  url: `${DOMAIN}/contato`,
  description: 'Canais de atendimento Hemissul: assistência 24h, WhatsApp, e-mail e pronta resposta.',
  publisher: { '@id': ORG_ID },
  mainEntity: localBusinessSchema,
}

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  '@id': `${DOMAIN}/aplicativo#app`,
  name: 'Hemissul — Clube de Benefícios',
  operatingSystem: ['Android', 'iOS'],
  applicationCategory: 'UtilitiesApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  downloadUrl: [
    'https://play.google.com/store/apps/details?id=br.com.hinovamobile.hemissul',
    'https://apps.apple.com/br/app/hemissul-clube-de-benef%C3%ADcios/id1525372223',
  ],
  description:
    'Acesse boletos, benefícios, assistência 24h, rastreamento e atendimento Hemissul direto pelo celular.',
  screenshot: OG_IMAGE,
  publisher: { '@id': ORG_ID },
}

const serviceBase = (name, description, url) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${DOMAIN}${url}#service`,
  name,
  description,
  url: `${DOMAIN}${url}`,
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'Brazil' },
  serviceType: 'Proteção Patrimonial Mutualista',
  termsOfService: `${DOMAIN}/termos-de-uso`,
})

const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${DOMAIN}/`,
    },
    ...items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name,
      item: `${DOMAIN}${path}`,
    })),
  ],
})

const routeMeta = {
  '/': {
    title: 'Hemissul — Proteção Veicular em Boa Vista e no Brasil',
    description:
      'Proteção veicular mutualista para carros, motos e caminhões. Assistência 24 horas, rastreamento e atendimento nacional. Associe-se à Hemissul.',
    schemas: [orgSchema],
  },
  '/protecao-veicular': {
    title: 'Proteção Veicular Mutualista | Hemissul Roraima',
    description:
      'Conheça o programa de proteção patrimonial mutualista da Hemissul para carros, motos e caminhões com assistência 24h em todo o Brasil.',
    schemas: [
      serviceBase(
        'Proteção Veicular Mutualista',
        'Programa de proteção patrimonial mutualista para carros, motos e caminhões com assistência 24 horas.',
        '/protecao-veicular',
      ),
      breadcrumb([['Proteção Veicular', '/protecao-veicular']]),
    ],
  },
  '/protecao-veicular/carros': {
    title: 'Proteção para Carros em Boa Vista | Hemissul',
    description:
      'Proteção veicular e assistência 24h para carros de uso particular. Consulte cobertura, rastreamento e benefícios disponíveis na Hemissul.',
    schemas: [
      serviceBase(
        'Proteção Veicular para Carros',
        'Proteção e assistência 24h para carros de uso particular em todo o Brasil.',
        '/protecao-veicular/carros',
      ),
      breadcrumb([
        ['Proteção Veicular', '/protecao-veicular'],
        ['Carros', '/protecao-veicular/carros'],
      ]),
    ],
  },
  '/protecao-veicular/motos': {
    title: 'Proteção para Motos em Boa Vista | Hemissul',
    description:
      'Proteção e assistência veicular para motocicletas. Cobertura, rastreamento e suporte para quem depende da moto no dia a dia.',
    schemas: [
      serviceBase(
        'Proteção Veicular para Motos',
        'Proteção e assistência 24h para motocicletas em todo o Brasil.',
        '/protecao-veicular/motos',
      ),
      breadcrumb([
        ['Proteção Veicular', '/protecao-veicular'],
        ['Motos', '/protecao-veicular/motos'],
      ]),
    ],
  },
  '/protecao-veicular/caminhoes': {
    title: 'Proteção para Caminhões em Roraima | Hemissul',
    description:
      'Consulte proteção e assistência para caminhões, veículos de trabalho e frotas. Atendimento nacional pela Hemissul.',
    schemas: [
      serviceBase(
        'Proteção Veicular para Caminhões',
        'Proteção e assistência 24h para caminhões e veículos de trabalho em todo o Brasil.',
        '/protecao-veicular/caminhoes',
      ),
      breadcrumb([
        ['Proteção Veicular', '/protecao-veicular'],
        ['Caminhões', '/protecao-veicular/caminhoes'],
      ]),
    ],
  },
  '/assistencia-24h': {
    title: 'Assistência Veicular 24 Horas | Hemissul',
    description:
      'Acione assistência veicular 24 horas em todo o Brasil. Reboque, pane, chaveiro e suporte em qualquer lugar pelo 0800 940 2163.',
    schemas: [
      serviceBase(
        'Assistência Veicular 24 Horas',
        'Assistência veicular 24h com reboque, pane, chaveiro e suporte em todo o território nacional.',
        '/assistencia-24h',
      ),
      breadcrumb([['Assistência 24h', '/assistencia-24h']]),
    ],
  },
  '/rastreamento-veicular': {
    title: 'Rastreamento Veicular em Roraima | Hemissul',
    description:
      'Rastreamento veicular com localização em tempo real, histórico, alertas e suporte. Disponível para associados Hemissul.',
    schemas: [
      serviceBase(
        'Rastreamento Veicular',
        'Rastreamento veicular com localização em tempo real e suporte para associados.',
        '/rastreamento-veicular',
      ),
      breadcrumb([['Rastreamento Veicular', '/rastreamento-veicular']]),
    ],
  },
  '/aplicativo': {
    title: 'Aplicativo Hemissul — Android e iOS',
    description:
      'Baixe o app Hemissul e acesse boletos, benefícios, assistência 24h, rastreamento e atendimento direto pelo celular.',
    schemas: [appSchema, breadcrumb([['Aplicativo', '/aplicativo']])],
  },
  '/central-do-associado': {
    title: 'Área do Associado | Hemissul',
    description:
      'Acesse sua conta Hemissul, consulte boletos, benefícios e fale com o atendimento pelo app ou pelos canais digitais.',
    schemas: [breadcrumb([['Central do Associado', '/central-do-associado']])],
  },
  '/comunicar-evento': {
    title: 'Comunicar Acidente ou Sinistro | Hemissul',
    description:
      'Orientações para comunicar acidente, roubo, furto, perda total ou qualquer evento previsto no seu plano Hemissul.',
    schemas: [breadcrumb([['Comunicar Evento', '/comunicar-evento']])],
  },
  '/quem-somos': {
    title: 'Quem Somos — História e Valores | Hemissul',
    description:
      'Conheça a Hemissul: fundada em 2019 em Boa Vista, com mais de 13 mil veículos protegidos e atendimento em todo o Brasil.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${DOMAIN}/quem-somos#page`,
        name: 'Quem somos | Hemissul',
        url: `${DOMAIN}/quem-somos`,
        description: 'História, valores e dados institucionais da Hemissul.',
        publisher: { '@id': ORG_ID },
        mainEntity: { '@id': ORG_ID },
      },
      breadcrumb([['Quem Somos', '/quem-somos']]),
    ],
  },
  '/boa-vista-rr': {
    title: 'Hemissul em Boa Vista, Roraima — Sede e Contatos',
    description:
      'Sede Hemissul: Av. Mário Homem de Melo, 3999, Buritis, Boa Vista — RR. Horários, mapa e canais de atendimento.',
    schemas: [localBusinessSchema, breadcrumb([['Boa Vista — RR', '/boa-vista-rr']])],
  },
  '/duvidas-frequentes': {
    title: 'Dúvidas Frequentes sobre Proteção Veicular | Hemissul',
    description:
      'Respostas sobre proteção mutualista, assistência 24h, rastreamento, roubo, rateio e adesão à Hemissul.',
    schemas: [faqSchema, breadcrumb([['Dúvidas Frequentes', '/duvidas-frequentes']])],
  },
  '/cotacao': {
    title: 'Cotação de Proteção Veicular | Hemissul',
    description:
      'Faça sua cotação de proteção veicular na Hemissul. Atendimento por WhatsApp e 0800. Rápido, sem consulta de crédito.',
    schemas: [breadcrumb([['Cotação', '/cotacao']])],
  },
  '/contato': {
    title: 'Contato | Hemissul — Assistência, WhatsApp e E-mail',
    description:
      'Fale com a Hemissul: assistência 24h 0800 940 2163, WhatsApp cotação, pronta resposta e e-mail. Todos os canais em um lugar.',
    schemas: [contactPageSchema, breadcrumb([['Contato', '/contato']])],
  },
  '/clube-de-beneficios': {
    title: 'Clube de Benefícios Hemissul — Vantagens para Associados',
    description:
      'Parceiros e vantagens exclusivas para associados Hemissul: academias, saúde, bem-estar, lazer e muito mais.',
    schemas: [breadcrumb([['Clube de Benefícios', '/clube-de-beneficios']])],
  },
  '/podcast': {
    title: 'Podcast Hemissul — Histórias e Negócios',
    description:
      'Conversas sobre empreendedorismo, transformação e vida plena com o Podcast Hemissul. Assista no YouTube ou ouça no Spotify.',
    schemas: [breadcrumb([['Podcast', '/podcast']])],
  },
  '/trabalhe-conosco': {
    title: 'Trabalhe Conosco | Hemissul',
    description:
      'Faça parte da equipe Hemissul. Conheça nossa cultura, valores e envie seu currículo para oportunidades em Boa Vista e no Brasil.',
    schemas: [breadcrumb([['Trabalhe Conosco', '/trabalhe-conosco']])],
  },
  '/blog': {
    title: 'Blog Hemissul — Notícias e Orientações',
    description:
      'Notícias, histórias de atendimento e orientações sobre proteção veicular, assistência e benefícios para associados Hemissul.',
    schemas: [breadcrumb([['Blog', '/blog']])],
  },
  '/documentos': {
    title: 'Documentos e Políticas | Hemissul',
    description:
      'Acesse a Política de Privacidade, Política de Cookies, Termos de Uso e solicite documentos institucionais da Hemissul.',
    schemas: [breadcrumb([['Documentos', '/documentos']])],
  },
  '/privacidade': {
    title: 'Aviso de Privacidade | Hemissul',
    description:
      'Saiba como a Hemissul coleta, usa e protege seus dados pessoais e como exercer seus direitos de titular.',
    schemas: [breadcrumb([['Privacidade', '/privacidade']])],
  },
  '/cookies': {
    title: 'Política de Cookies | Hemissul',
    description:
      'Entenda como e por que a Hemissul usa cookies no site e como gerenciá-los.',
    schemas: [breadcrumb([['Cookies', '/cookies']])],
  },
  '/termos-de-uso': {
    title: 'Termos de Uso | Hemissul',
    description:
      'Condições para utilização do site, do aplicativo e dos canais digitais da Hemissul.',
    schemas: [breadcrumb([['Termos de Uso', '/termos-de-uso']])],
  },
}

function upsertMeta(selector, attribute, value) {
  let node = document.head.querySelector(selector)
  if (!node) {
    node = document.createElement('meta')
    const propertyMatch = selector.match(/property="([^"]+)"/)
    const nameMatch = selector.match(/name="([^"]+)"/)
    if (propertyMatch) node.setAttribute('property', propertyMatch[1])
    else if (nameMatch) node.setAttribute('name', nameMatch[1])
    document.head.appendChild(node)
  }
  node.setAttribute(attribute, value)
}

function injectSchemas(schemas) {
  document.head.querySelectorAll('script[data-rseo]').forEach((el) => el.remove())
  schemas.forEach((schema) => {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.setAttribute('data-rseo', '1')
    s.textContent = JSON.stringify(schema)
    document.head.appendChild(s)
  })
}

export default function RouteSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const isLegal = ['/privacidade', '/cookies', '/termos-de-uso'].includes(pathname)
    const isBlogPost = pathname.startsWith('/blog/') && pathname !== '/blog'
    const slug = isBlogPost ? pathname.split('/').filter(Boolean).pop() : null
    const post = slug ? findPost(slug) : null

    let title, description, schemas, noindex

    if (post) {
      title = `${post.title} | Hemissul`
      description = post.excerpt
      schemas = [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': `${DOMAIN}${pathname}#article`,
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          author: { '@id': ORG_ID },
          publisher: { '@id': ORG_ID },
          mainEntityOfPage: `${DOMAIN}${pathname}`,
          inLanguage: 'pt-BR',
        },
        breadcrumb([
          ['Blog', '/blog'],
          [post.title, pathname],
        ]),
      ]
    } else if (routeMeta[pathname]) {
      ;({ title, description, schemas } = routeMeta[pathname])
      noindex = false
    } else {
      title = 'Página não encontrada | Hemissul'
      description = 'A página solicitada não foi encontrada.'
      schemas = []
      noindex = true
    }

    const canonicalUrl = `${DOMAIN}${pathname}`

    document.title = title
    upsertMeta('meta[name="description"]', 'content', description)
    upsertMeta(
      'meta[name="robots"]',
      'content',
      noindex ? 'noindex,follow' : isLegal ? 'noindex,follow' : 'index,follow,max-image-preview:large',
    )
    upsertMeta('meta[property="og:title"]', 'content', title)
    upsertMeta('meta[property="og:description"]', 'content', description)
    upsertMeta('meta[property="og:url"]', 'content', canonicalUrl)
    upsertMeta('meta[property="og:image"]', 'content', OG_IMAGE)
    upsertMeta('meta[property="og:type"]', 'content', post ? 'article' : 'website')
    upsertMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', 'content', title)
    upsertMeta('meta[name="twitter:description"]', 'content', description)
    upsertMeta('meta[name="twitter:image"]', 'content', OG_IMAGE)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    if (schemas && schemas.length) {
      injectSchemas(schemas)
    } else {
      document.head.querySelectorAll('script[data-rseo]').forEach((el) => el.remove())
    }
  }, [pathname])

  return null
}
