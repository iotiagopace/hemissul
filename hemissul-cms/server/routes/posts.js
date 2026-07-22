import { Router } from 'express'
import slugify from 'slugify'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/posts — público
router.get('/', async (req, res) => {
  const { status, limit = 20, offset = 0 } = req.query
  let sql = 'SELECT id,slug,title,excerpt,category,cover_url,status,featured,published_at,created_at FROM posts'
  const params = []
  if (status) { sql += ' WHERE status = ?'; params.push(status) }
  sql += ' ORDER BY featured DESC, published_at DESC LIMIT ? OFFSET ?'
  params.push(Number(limit), Number(offset))
  res.json(await db.all(sql, params))
})

// GET /api/posts/:slug — público
router.get('/:slug', async (req, res) => {
  const row = await db.get('SELECT * FROM posts WHERE slug = ?', [req.params.slug])
  if (!row) return res.status(404).json({ error: 'Post não encontrado' })
  res.json(row)
})

// POST /api/posts — admin
router.post('/', requireAuth, async (req, res) => {
  const { title, excerpt, content, category, cover_url, status, featured, published_at } = req.body
  if (!title) return res.status(400).json({ error: 'Título obrigatório' })
  const slug = slugify(title, { lower: true, strict: true })
  const r = await db.run(
    'INSERT INTO posts (slug,title,excerpt,content,category,cover_url,status,featured,published_at) VALUES (?,?,?,?,?,?,?,?,?)',
    [slug, title, excerpt, content, category, cover_url, status || 'draft', featured ? 1 : 0, published_at || null]
  )
  res.status(201).json({ id: r.insertId, slug })
})

// PUT /api/posts/:id — admin
router.put('/:id', requireAuth, async (req, res) => {
  const { title, excerpt, content, category, cover_url, status, featured, published_at } = req.body
  const fields = []
  const vals = []
  if (title !== undefined)        { fields.push('title=?');        vals.push(title) }
  if (excerpt !== undefined)      { fields.push('excerpt=?');      vals.push(excerpt) }
  if (content !== undefined)      { fields.push('content=?');      vals.push(content) }
  if (category !== undefined)     { fields.push('category=?');     vals.push(category) }
  if (cover_url !== undefined)    { fields.push('cover_url=?');    vals.push(cover_url) }
  if (status !== undefined)       { fields.push('status=?');       vals.push(status) }
  if (featured !== undefined)     { fields.push('featured=?');     vals.push(featured ? 1 : 0) }
  if (published_at !== undefined) { fields.push('published_at=?'); vals.push(published_at || null) }
  if (title) {
    const slug = slugify(title, { lower: true, strict: true })
    fields.push('slug=?'); vals.push(slug)
  }
  if (!fields.length) return res.status(400).json({ error: 'Nenhum campo enviado' })
  vals.push(req.params.id)
  await db.run(`UPDATE posts SET ${fields.join(',')} WHERE id=?`, vals)
  res.json({ ok: true })
})

// DELETE /api/posts/:id — admin
router.delete('/:id', requireAuth, async (req, res) => {
  await db.run('DELETE FROM posts WHERE id=?', [req.params.id])
  res.json({ ok: true })
})

export default router
