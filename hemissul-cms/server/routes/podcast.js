import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', async (req, res) => {
  const { all } = req.query
  let sql = 'SELECT * FROM podcast_episodes'
  if (!all) sql += ' WHERE active=1'
  sql += ' ORDER BY sort_order DESC, aired_at DESC'
  res.json(await db.all(sql))
})

router.post('/', requireAuth, async (req, res) => {
  const { number, video_id, title, description, aired_at, sort_order } = req.body
  if (!video_id || !title) return res.status(400).json({ error: 'video_id e título obrigatórios' })
  const r = await db.run(
    'INSERT INTO podcast_episodes (number,video_id,title,description,aired_at,sort_order) VALUES (?,?,?,?,?,?)',
    [number, video_id, title, description, aired_at || null, sort_order || 0]
  )
  res.status(201).json({ id: r.insertId })
})

router.put('/:id', requireAuth, async (req, res) => {
  const cols = ['number','video_id','title','description','aired_at','sort_order','active']
  const fields = []; const vals = []
  cols.forEach(c => { if (req.body[c] !== undefined) { fields.push(`${c}=?`); vals.push(req.body[c]) } })
  vals.push(req.params.id)
  await db.run(`UPDATE podcast_episodes SET ${fields.join(',')} WHERE id=?`, vals)
  res.json({ ok: true })
})

router.delete('/:id', requireAuth, async (req, res) => {
  await db.run('DELETE FROM podcast_episodes WHERE id=?', [req.params.id])
  res.json({ ok: true })
})

export default router
