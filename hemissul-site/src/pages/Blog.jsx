import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { posts } from '../content/posts'

export default function Blog() {
  const [destaque, ...demais] = posts

  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Notícias e histórias</p>
            <h1 className="page-header__title">A Hemissul em movimento.</h1>
            <p className="page-header__lede">
              Acompanhe atendimentos, expansão, benefícios e iniciativas na
              comunidade.
            </p>
          </FadeIn>
        </div>
      </header>

      {destaque && (
        <section className="page-section page-section--paper">
          <div className="site-container">
            <FadeIn>
              <article className="blog-feature">
                <Link
                  to={`/blog/${destaque.slug}`}
                  className="blog-feature__image"
                  aria-label={destaque.title}
                >
                  <img src={destaque.image} alt="" loading="eager" />
                </Link>
                <div className="blog-feature__content">
                  <p className="blog-feature__meta">
                    {destaque.category} · {destaque.date}
                  </p>
                  <h2>
                    <Link to={`/blog/${destaque.slug}`}>{destaque.title}</Link>
                  </h2>
                  <p className="blog-feature__excerpt">{destaque.excerpt}</p>
                  <Link to={`/blog/${destaque.slug}`} className="type-link">
                    Ler artigo <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </FadeIn>
          </div>
        </section>
      )}

      {demais.length > 0 && (
        <section className="page-section">
          <div className="site-container">
            <FadeIn className="home-section__intro">
              <h2 className="home-section__title">Mais histórias.</h2>
            </FadeIn>

            <div className="blog-grid">
              {demais.map((post, index) => (
                <FadeIn
                  as="article"
                  className="blog-card"
                  key={post.slug}
                  delay={index * 0.06}
                >
                  <Link to={`/blog/${post.slug}`} className="blog-card__image">
                    <img src={post.image} alt="" loading="lazy" />
                  </Link>
                  <div>
                    <small>
                      {post.category} · {post.date}
                    </small>
                    <h3>
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p>{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="type-link">
                      Ler artigo <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
