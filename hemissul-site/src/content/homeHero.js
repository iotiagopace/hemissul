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
    eyebrow: 'Proteção veicular · assistência 24h',
    // Frases-chave que se alternam (reforço de SEO). Todas ficam no HTML.
    rotatingWords: [
      'Proteção veicular',
      'Assistência 24h',
      'Rastreamento veicular',
      'Clube de benefícios',
      'Proteção contra roubo e furto',
    ],
    title: 'Roubo, furto, colisão ou perda total? A Hemissul tem a cobertura completa pra você.',
    description:
      'Proteção para carros, motos e caminhões, assistência 24 horas e atendimento em todo o Brasil.',
    primaryAction: { label: 'Fazer cotação', to: '/cotacao' },
    secondaryAction: { label: 'Conhecer a proteção', to: '/protecao-veicular' },
    emergencyAction: {
      label: 'Em caso de acidente ou emergência, clique aqui',
      to: '/assistencia-24h',
    },
    mediaPosition: 'center center',
    mediaPositionMobile: '56% center',
  },

  // 2) Nova unidade — Manaus/AM
  //    Banner da campanha oficial. A arte já traz a curva azul da marca no
  //    terço esquerdo, que é justamente onde o texto do hero se apoia — por
  //    isso o enquadramento fica no centro no desktop. No mobile puxamos para
  //    a esquerda para não perder essa área de apoio do texto.
  {
    id: 'manaus-nova-unidade',
    type: 'image',
    src: '/banners/banner_1920x1080_03.jpg',
    eyebrow: 'Nova unidade · Manaus/AM',
    title: 'Manaus, a Hemissul chegou.',
    description:
      'Nossa proteção veicular, assistência 24 horas e rastreamento agora atendem também quem vive e trabalha em Manaus.',
    primaryAction: { label: 'Fazer cotação', to: '/cotacao' },
    secondaryAction: { label: 'Conhecer a Hemissul', to: '/quem-somos' },
    mediaPosition: 'center center',
    mediaPositionMobile: '32% center',
  },

  // 3) Institucional — confiança
  {
    id: 'jornada-confianca',
    type: 'image',
    src: '/banners/banner_1920x1080_01.jpg',
    eyebrow: 'Mais do que uma cobertura',
    title: 'Sua jornada merece mais do que proteção. Merece confiança.',
    description:
      'Somos uma associação com sede própria, equipe local e atendimento que responde na hora em que você mais precisa.',
    primaryAction: { label: 'Fazer cotação', to: '/cotacao' },
    secondaryAction: { label: 'Conhecer a proteção', to: '/protecao-veicular' },
    mediaPosition: 'center center',
    mediaPositionMobile: '40% center',
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
