import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'

import authRouter     from './routes/auth.js'
import settingsRouter from './routes/settings.js'
import postsRouter    from './routes/posts.js'
import bannersRouter  from './routes/banners.js'
import faqsRouter     from './routes/faqs.js'
import podcastRouter  from './routes/podcast.js'
import uploadRouter   from './routes/upload.js'
import {
  testimonialsRouter,
  beforeAfterRouter,
  teamRouter,
  partnersRouter,
  heroSlidesRouter,
} from './routes/content.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

// ── CORS ──────────────────────────────────────────────────────
const origins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
app.use(cors({
  origin: origins.length ? origins : true,
  credentials: true,
}))

// ── Parsing ───────────────────────────────────────────────────
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Uploads estáticos ─────────────────────────────────────────
const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads')
app.use('/uploads', express.static(uploadDir))

// ── Admin estático ────────────────────────────────────────────
app.use('/admin', express.static(path.join(__dirname, '../admin')))

// ── Rate limit no login ───────────────────────────────────────
app.use('/api/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }))

// ── Rotas ─────────────────────────────────────────────────────
app.use('/api/auth',         authRouter)
app.use('/api/settings',     settingsRouter)
app.use('/api/posts',        postsRouter)
app.use('/api/banners',      bannersRouter)
app.use('/api/faqs',         faqsRouter)
app.use('/api/podcast',      podcastRouter)
app.use('/api/upload',       uploadRouter)
app.use('/api/testimonials', testimonialsRouter)
app.use('/api/before-after', beforeAfterRouter)
app.use('/api/team',         teamRouter)
app.use('/api/partners',     partnersRouter)
app.use('/api/hero-slides',  heroSlidesRouter)

// ── Health check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ ok: true, ts: new Date() }))

// ── Error handler ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Erro interno' })
})

app.listen(PORT, () => {
  console.log(`✓ Hemissul CMS API rodando em http://localhost:${PORT}`)
})
