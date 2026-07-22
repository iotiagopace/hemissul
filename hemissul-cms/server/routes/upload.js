import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const uploadDir = process.env.UPLOAD_DIR || './uploads'
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const base = Date.now() + '-' + Math.round(Math.random() * 1e6)
    cb(null, base + ext)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: (Number(process.env.MAX_FILE_MB) || 8) * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|mp4|pdf/
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '')
    cb(null, allowed.test(ext))
  },
})

router.post('/', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado ou tipo inválido' })
  const baseUrl = process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 3001}`
  const url = `${baseUrl}/uploads/${req.file.filename}`
  res.json({ url, filename: req.file.filename })
})

// Upload múltiplo
router.post('/multiple', requireAuth, upload.array('files', 10), (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: 'Nenhum arquivo enviado' })
  const baseUrl = process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 3001}`
  const urls = req.files.map(f => ({ url: `${baseUrl}/uploads/${f.filename}`, filename: f.filename }))
  res.json(urls)
})

export default router
