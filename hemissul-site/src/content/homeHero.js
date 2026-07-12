import caminhaoEstrada from '../assets/fotos-reais/caminhao-por-do-sol.jpg'
import sedeFachada from '../assets/fotos-reais/sede-fachada-2.jpg'
import rangerImage from '../assets/antes-depois/depois-ranger.jpeg'
import { SITE } from '../config/site'

/**
 * BANNERS DA HOME (carrossel do topo)
 * ----------------------------------------------------------------------------
 * A Home aceita QUANTOS banners você quiser — não só o vídeo. Basta adicionar
 * um objeto neste array. O carrossel troca sozinho, com bolinhas e botão pausar.
 *
 * Campos de cada banner:
 *   id            → identificador único (obrigatório)
 *   type          → 'video' ou 'image'
 *   src           → caminho do vídeo (mp4) ou da imagem
 *   poster        → imagem de fallback do vídeo (recomendado)
 *   eyebrow       → linha fina acima do título
 *   title         → manchete principal (H1 no 1º banner)
 *   description   → texto de apoio
 *   primaryAction → botão verde de conversão { label, to } ou { label, href, external }
 *   secondaryAction → botão secundário (mesmo formato)
 *   mediaPosition / mediaPositionMobile → enquadramento da mídia (object-position)
 *   enabled       → false esconde o banner (útil para campanhas agendadas)
 *   expiresAt     → data ISO em que o banner some sozinho (ex.: fim de promoção)
 * ----------------------------------------------------------------------------
 */
export const HOME_HERO_SLIDES = [
  // 1) Institucional em vídeo
  {
    id: 'protecao-em-movimento',
    type: 'video',
    src: '/video/hero-protecao.mp4',
    poster: '/video/hero-protecao-poster.jpg',
    eyebrow: 'Proteção veicular · assistência 24 horas',
    // Frases-chave que se alternam (reforço de SEO). Todas ficam no HTML.
    rotatingWords: [
      'Proteção veicular',
      'Assistência 24 horas',
      'Rastreamento veicular',
      'Clube de benefícios',
      'Proteção contra roubo e furto',
    ],
    title: 'Roubo, colisão ou perda total? A Hemissul resolve. Sem letra miúda.',
    description:
      'Proteção para carros, motos e caminhões, assistência 24h e atendimento em todo o Brasil.',
    primaryAction: { label: 'Fazer cotação', to: '/cotacao' },
    secondaryAction: { label: 'Conhecer a proteção', to: '/protecao-veicular' },
    mediaPosition: 'center center',
    mediaPositionMobile: '56% center',
  },

  // 2) Prova social — valor devolvido em reparos e indenizações
  {
    id: 'reparos-indenizacoes',
    type: 'image',
    src: sedeFachada,
    eyebrow: 'Resultado que dá pra medir',
    title: `${SITE.metrics.repairsInvested} pagos em reparos e indenizações.`,
    description:
      'Dinheiro que voltou para quem teve o carro batido, roubado ou com perda total.',
    primaryAction: { label: 'Quero proteger meu veículo', to: '/cotacao' },
    secondaryAction: { label: 'Conhecer a Hemissul', to: '/quem-somos' },
    mediaPosition: 'center center',
    mediaPositionMobile: '50% center',
  },

  // 3) Segmento — estrada / caminhões / frotistas
  {
    id: 'estrada-caminhoes',
    type: 'image',
    src: caminhaoEstrada,
    eyebrow: 'Para quem vive na estrada',
    title: 'Seu trabalho não pode parar. Sua proteção também não.',
    description:
      'Cobertura e assistência 24h para caminhoneiros, frotistas e motoristas de aplicativo.',
    primaryAction: { label: 'Fazer cotação', to: '/cotacao' },
    secondaryAction: { label: 'Proteção para caminhões', to: '/protecao-veicular/caminhoes' },
    mediaPosition: '50% center',
    mediaPositionMobile: '58% center',
  },

  // 4) MODELO de banner de campanha (desativado). Ative com enabled: true e
  //    defina expiresAt para a promoção sumir sozinha ao fim da vigência.
  {
    id: 'campanha-promocional-modelo',
    type: 'image',
    src: rangerImage,
    eyebrow: SITE.campaign.eyebrow,
    title: SITE.campaign.title,
    description: SITE.campaign.note,
    primaryAction: { label: 'Quero aproveitar', to: '/cotacao' },
    secondaryAction: { label: 'Proteção para carros', to: '/protecao-veicular/carros' },
    mediaPosition: '58% center',
    mediaPositionMobile: '53% center',
    enabled: false,
    expiresAt: SITE.campaign.endsAt,
  },
]
