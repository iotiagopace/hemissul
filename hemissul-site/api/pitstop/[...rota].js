// Qualquer outra rota /api/pitstop/* responde 404 em JSON, nunca o HTML do site.
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.status(404).json({ ok: false, error: 'rota_inexistente', retryable: false })
}
