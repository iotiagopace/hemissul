import { useState } from 'react'
import { Play } from 'lucide-react'

const videos = [1, 2, 3, 4, 5].map((n) => ({
  src: `/videos/depoimentos/depoimento-${n}.mp4`,
  poster: `/videos/depoimentos/depoimento-${n}.jpg`,
}))

export default function VideoTestimonials() {
  const [active, setActive] = useState(null)

  return (
    <div className="video-testimonials">
      {videos.map((video, index) => (
        <div className="video-testimonial" key={video.src}>
          {active === index ? (
            <video
              className="video-testimonial__media"
              src={video.src}
              poster={video.poster}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <button
              type="button"
              className="video-testimonial__poster"
              onClick={() => setActive(index)}
              aria-label={`Reproduzir depoimento de associado ${index + 1}`}
            >
              <img src={video.poster} alt="" loading="lazy" width="270" height="480" />
              <span className="video-testimonial__play" aria-hidden="true">
                <Play size={22} fill="currentColor" />
              </span>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
