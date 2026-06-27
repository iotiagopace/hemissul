import { ExternalLink, Headphones } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import VideoEmbed from '../components/VideoEmbed'
import { YoutubeIcon } from '../components/SocialIcons'

const SPOTIFY_SHOW = '0iauWI52QhbPW7RZ0lRkQK'
const YOUTUBE_PLAYLIST = 'PLKt5O__1Sgakkz-Hy9CWx3R1g1IGngjEe'
const YOUTUBE_CHANNEL = 'https://www.youtube.com/@HemissulProtecaoVeicular'

const episodios = [
  {
    number: '07',
    videoId: '8VSYQa0wgHI',
    title: 'Vida plena é possível',
    date: '2026-04-30',
    description:
      'Conversa sobre escolhas, propósito e qualidade de vida no novo episódio do podcast.',
  },
  {
    number: '06',
    videoId: 'tB8G8nUr2mU',
    title: 'Mobil: mais que venda de carros',
    date: '2026-02-26',
    description:
      'Bate-papo sobre o mercado automotivo em 2026, atendimento e os bastidores de uma concessionária local.',
  },
  {
    number: '05',
    videoId: 'BgLbmZzI_RE',
    title: '+ de 150 milhões de views em menos de um ano · MAVIC Publicidade',
    date: '2025-08-08',
    description:
      'Os fundadores da MAVIC Publicidade contam como vêm transformando o marketing digital em Roraima.',
  },
  {
    number: '04',
    videoId: 'jhpBxdBT5IQ',
    title: 'Como vender imóveis todos os dias',
    date: '2025-07-18',
    description:
      'Estratégias de quem está no topo do mercado imobiliário, com hábitos e mentalidade de alta performance.',
  },
  {
    number: '03',
    videoId: 'MbOW9AmY5S8',
    title: 'Do alcoolismo ao empreendedorismo',
    date: '2025-06-20',
    description:
      'Wilson Oliveira, fundador do Gostoso Açaí, abre o coração sobre superação, família e propósito.',
  },
  {
    number: '02',
    videoId: 'zDAq29ffYhU',
    title: 'Vendas, a profissão que mudou tudo',
    date: '2025-05-23',
    description:
      'Anne Karoline e Carlos Andrade compartilham como o caminho das vendas profissionais transformou suas vidas.',
  },
  {
    number: '01',
    videoId: 'CCIEEKCW8Qg',
    title: 'A história por trás da Hemissul',
    date: '2025-04-22',
    description:
      'Marcos Gomes conta a trajetória de fundador, do início como policial até a construção da Hemissul.',
  },
]

const formatDate = (iso) => {
  const [year, month] = iso.split('-')
  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ]
  return `${months[Number(month) - 1]} de ${year}`
}

export default function Podcast() {
  const [destaque, ...demais] = episodios

  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container split">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Podcast Hemissul</p>
            <h1 className="page-header__title">
              Histórias que inspiram e transformam.
            </h1>
            <p className="page-header__lede">
              Conversas com convidados que compartilham experiências de vida,
              negócios, superação e impacto na comunidade.
            </p>
            <div className="home-hero__actions">
              <a
                className="button-primary"
                href={`https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeIcon style={{ width: 18, height: 18 }} /> Ver no YouTube
              </a>
              <a
                className="button-secondary"
                href={`https://open.spotify.com/show/${SPOTIFY_SHOW}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Headphones size={18} aria-hidden="true" /> Ouvir no Spotify
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <article className="podcast-feature">
              <VideoEmbed
                videoId={destaque.videoId}
                title={`${destaque.title} — Hemissul Podcast #${destaque.number}`}
              />
              <p className="podcast-feature__meta">
                Episódio #{destaque.number} · {formatDate(destaque.date)}
              </p>
              <h2 className="podcast-feature__title">{destaque.title}</h2>
              <p className="podcast-feature__desc">{destaque.description}</p>
            </article>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container">
          <FadeIn className="home-section__intro">
            <h2 className="home-section__title">Todos os episódios.</h2>
            <p className="home-section__copy">
              Mergulhe nas conversas anteriores. Cada episódio com gente real,
              caminhos e aprendizados que ficam.
            </p>
          </FadeIn>

          <div className="podcast-grid">
            {demais.map((ep, index) => (
              <FadeIn
                as="article"
                key={ep.videoId}
                className="podcast-card"
                delay={index * 0.05}
              >
                <VideoEmbed
                  videoId={ep.videoId}
                  title={`${ep.title} — Hemissul Podcast #${ep.number}`}
                />
                <p className="podcast-card__meta">
                  Episódio #{ep.number} · {formatDate(ep.date)}
                </p>
                <h3 className="podcast-card__title">{ep.title}</h3>
                <p className="podcast-card__desc">{ep.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container split">
          <FadeIn className="stack--lg">
            <p className="pill-tag pill-tag--accent">Ouvir também</p>
            <h2 className="home-section__title">
              No formato que você preferir.
            </h2>
            <p className="home-section__copy">
              O Hemissul Podcast está disponível em vídeo no YouTube e em áudio
              no Spotify. Inscreva-se para receber os próximos episódios.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="podcast-embed">
              <iframe
                title="Podcast Hemissul no Spotify"
                src={`https://open.spotify.com/embed/show/${SPOTIFY_SHOW}?utm_source=generator`}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="closing-section">
        <div className="site-container closing-section__inner">
          <FadeIn as="h2">
            Inscreva-se no canal e ative o sininho.
          </FadeIn>
          <FadeIn delay={0.1}>
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              Abrir canal no YouTube{' '}
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
