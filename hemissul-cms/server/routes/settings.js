import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/settings — público (leitura pelo site)
router.get('/', async (req, res) => {
  const rows = await db.all('SELECT `key`, `value` FROM site_settings')
  const obj = Object.fromEntries(rows.map(r => [r.key, r.value]))
  res.json(obj)
})

// PUT /api/settings — admin
router.put('/', requireAuth, async (req, res) => {
  const entries = Object.entries(req.body)
  if (!entries.length) return res.status(400).json({ error: 'Nenhum dado enviado' })
  await db.upsertSettings(entries)
  res.json({ ok: true })
})

export default router
