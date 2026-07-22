// Routes genéricas para: testimonials, before_after, team_members, partners, hero_slides
import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

function crudRouter(table, requiredFields = []) {
  const router = Router()

  router.get('/', async (req, res) => {
    const { all } = req.query
    let sql = `SELECT * FROM ${table}`
    if (!all) sql += ' WHERE active=1'
    sql += ' ORDER BY sort_order ASC, id DESC'
    res.json(await db.all(sql))
  })

  router.get('/:id', async (req, res) => {
    const row = await db.get(`SELECT * FROM ${table} WHERE id=?`, [req.params.id])
    if (!row) return res.status(404).json({ error: 'Não encontrado' })
    res.json(row)
  })

  router.post('/', requireAuth, async (req, res) => {
    const missing = requiredFields.filter(f => !req.body[f])
    if (missing.length) return res.status(400).json({ error: `Campos obrigatórios: ${missing.join(', ')}` })
    const keys = Object.keys(req.body)
    const vals = Object.values(req.body)
    const r = await db.run(
      `INSERT INTO ${table} (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})`,
      vals
    )
    res.status(201).json({ id: r.insertId })
  })

  router.put('/:id', requireAuth, async (req, res) => {
    const keys = Object.keys(req.body)
    if (!keys.length) return res.status(400).json({ error: 'Nenhum campo enviado' })
    const vals = [...Object.values(req.body), req.params.id]
    await db.run(
      `UPDATE ${table} SET ${keys.map(k => `${k}=?`).join(',')} WHERE id=?`,
      vals
    )
    res.json({ ok: true })
  })

  router.delete('/:id', requireAuth, async (req, res) => {
    await db.run(`DELETE FROM ${table} WHERE id=?`, [req.params.id])
    res.json({ ok: true })
  })

  return router
}

export const testimonialsRouter  = crudRouter('testimonials',  ['author_name', 'text'])
export const beforeAfterRouter   = crudRouter('before_after',  ['before_url', 'after_url'])
export const teamRouter          = crudRouter('team_members',  ['name'])
export const partnersRouter      = crudRouter('partners',      ['name'])
export const heroSlidesRouter    = crudRouter('hero_slides',   ['media_url'])
