import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/banners — público (só ativos e não expirados)
router.get('/', async (req, res) => {
  const { all } = req.query
  let sql = 'SELECT * FROM banners'
  if (!all) sql += ' WHERE active=1 AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)'
  sql += ' ORDER BY sort_order ASC, created_at DESC'
  res.json(await db.all(sql))
})

router.post('/', requireAuth, async (req, res) => {
  const { title, text, cta_label, cta_url, bg_color, text_color, position, active, expires_at, sort_order } = req.body
  if (!title) return res.status(400).json({ error: 'Título obrigatório' })
  const r = await db.run(
    'INSERT INTO banners (title,text,cta_label,cta_url,bg_color,text_color,position,active,expires_at,sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [title, text, cta_label, cta_url, bg_color || '#1267a8', text_color || '#ffffff', position || 'all', active ?? 1, expires_at || null, sort_order || 0]
  )
  res.status(201).json({ id: r.insertId })
})

router.put('/:id', requireAuth, async (req, res) => {
  const cols = ['title','text','cta_label','cta_url','bg_color','text_color','position','active','expires_at','sort_order']
  const fields = []; const vals = []
  cols.forEach(c => { if (req.body[c] !== undefined) { fields.push(`${c}=?`); vals.push(req.body[c]) } })
  if (!fields.length) return res.status(400).json({ error: 'Nenhum campo' })
  vals.push(req.params.id)
  await db.run(`UPDATE banners SET ${fields.join(',')} WHERE id=?`, vals)
  res.json({ ok: true })
})

router.delete('/:id', requireAuth, async (req, res) => {
  await db.run('DELETE FROM banners WHERE id=?', [req.params.id])
  res.json({ ok: true })
})

export default router
