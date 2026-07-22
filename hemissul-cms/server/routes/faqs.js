import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', async (req, res) => {
  const rows = await db.all(
    'SELECT * FROM faqs WHERE active=1 ORDER BY group_name ASC, sort_order ASC'
  )
  const groups = {}
  rows.forEach(r => {
    if (!groups[r.group_name]) groups[r.group_name] = []
    groups[r.group_name].push(r)
  })
  res.json(groups)
})

router.get('/flat', requireAuth, async (req, res) => {
  res.json(await db.all('SELECT * FROM faqs ORDER BY group_name, sort_order'))
})

router.post('/', requireAuth, async (req, res) => {
  const { group_name, question, answer, sort_order } = req.body
  if (!question || !answer) return res.status(400).json({ error: 'Pergunta e resposta obrigatórias' })
  const r = await db.run(
    'INSERT INTO faqs (group_name,question,answer,sort_order) VALUES (?,?,?,?)',
    [group_name || 'Geral', question, answer, sort_order || 0]
  )
  res.status(201).json({ id: r.insertId })
})

router.put('/:id', requireAuth, async (req, res) => {
  const cols = ['group_name','question','answer','sort_order','active']
  const fields = []; const vals = []
  cols.forEach(c => { if (req.body[c] !== undefined) { fields.push(`${c}=?`); vals.push(req.body[c]) } })
  vals.push(req.params.id)
  await db.run(`UPDATE faqs SET ${fields.join(',')} WHERE id=?`, vals)
  res.json({ ok: true })
})

router.delete('/:id', requireAuth, async (req, res) => {
  await db.run('DELETE FROM faqs WHERE id=?', [req.params.id])
  res.json({ ok: true })
})

export default router
