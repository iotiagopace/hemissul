import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { posts } from '../content/posts'

export default function Blog() {
  return (
    <div className="page-light">
      <header className="page-header">
        <div className="site-container">
          <FadeIn className="page-header__inner">
            <p className="page-header__eyebrow">Notícias e histórias</p>
            <h1 className="page-header__title">A Hemissul em movimento.</h1>
            <p className="page-header__lede">
              Acompanhe atendimentos, expansão, benefícios e iniciativas na comunidade.
            </p>
          </FadeIn>
        </div>
      </header>

      <section className="page-section page-section--paper">
        <div className="site-container blog-grid">
          {posts.map((post, index) => (
            <FadeIn as="article" className="blog-card" key={post.slug} delay={index * 0.06}>
              <Link to={`/blog/${post.slug}`} className="blog-card__image">
                <img src={post.image} alt="" loading="lazy" />
              </Link>
              <div>
                <small>{post.category} · {post.date}</small>
                <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
                <p>{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="type-link">
                  Ler artigo <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  )
}
