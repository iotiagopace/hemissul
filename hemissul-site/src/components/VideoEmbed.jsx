import { useState } from 'react'
import { Play } from 'lucide-react'

export default function VideoEmbed({
  videoId,
  title = 'Vídeo Hemissul',
  poster,
}) {
  const [active, setActive] = useState(false)

  if (!active) {
    const thumb =
      poster ||
      `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

    return (
      <button
        type="button"
        className="video-embed"
        onClick={() => setActive(true)}
        aria-label={`Assistir ${title}`}
      >
        <img
          src={thumb}
          alt=""
          loading="lazy"
          className="video-embed__poster"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
          }}
        />
        <span className="video-embed__label" aria-hidden="true">
          Assista ao vídeo
        </span>
        <span className="video-embed__play" aria-hidden="true">
          <Play size={28} />
        </span>
      </button>
    )
  }

  return (
    <div className="video-embed video-embed--playing">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}
