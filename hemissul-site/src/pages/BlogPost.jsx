import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { findPost } from '../content/posts'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug } = useParams()
  const post = findPost(slug)
  if (!post) return <NotFound />

  return (
    <article className="page-light">
      <header className="article-hero">
        <div className="site-container article-hero__inner">
          <FadeIn>
            <Link to="/blog" className="type-link"><ArrowLeft size={17} aria-hidden="true" /> Voltar ao blog</Link>
            <p className="page-header__eyebrow">{post.category} · {post.date}</p>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <figure className="figure-frame figure-frame--wide">
              <img src={post.image} alt="" />
            </figure>
          </FadeIn>
        </div>
      </header>
      <section className="page-section page-section--paper">
        <div className="site-container article-body">
          {post.paragraphs.map((paragraph, index) => (
            <FadeIn as="p" key={paragraph} delay={index * 0.05}>{paragraph}</FadeIn>
          ))}
          <p className="article-body__note">
            Benefícios, análises e atendimentos seguem o regulamento e as
            condições aplicáveis a cada associado.
          </p>
        </div>
      </section>
    </article>
  )
}
