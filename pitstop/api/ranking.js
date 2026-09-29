/**
 * Vercel Function: ranking do dia por posto e por jogo (Supabase via REST).
 *
 * Variáveis de ambiente:
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY (só no servidor, nunca com prefixo VITE_)
 *
 * Tabela: ver docs/BACKEND.md. Sem as variáveis, responde 501 e o front usa
 * o recorde local.
 *
 * GET  /api/ranking?posto=01&jogo=corrida  -> top 10 do dia (horário de Boa Vista)
 * POST /api/ranking { leadId, nome, posto, jogo, pontos }
 */
const JOGOS = ['corrida', 'blocos', 'sudoku', 'cruzadas']

export default async function handler(req, res) {
  const base = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!base || !key) return res.status(501).json({ error: 'Ranking sem backend configurado' })
  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }

  if (req.method === 'GET') {
    const { posto = 'sem-posto', jogo = 'corrida' } = req.query
    if (!JOGOS.includes(jogo)) return res.status(400).json({ error: 'Jogo inválido' })
    const inicioDoDia = startOfDayBoaVista()
    const q = new URLSearchParams({
      select: 'nome,pontos',
      posto: `eq.${posto}`,
      jogo: `eq.${jogo}`,
      criado_em: `gte.${inicioDoDia}`,
      order: 'pontos.desc',
      limit: '10',
    })
    const r = await fetch(`${base}/rest/v1/pitstop_partidas?${q}`, { headers })
    if (!r.ok) return res.status(502).json({ error: 'Falha ao ler ranking' })
    const rows = await r.json()
    const ranking = rows.map((x) => ({ nome: primeiroNome(x.nome), pontos: x.pontos }))
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60')
    return res.status(200).json({ ranking })
  }

  if (req.method === 'POST') {
    const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const pontos = Number(b.pontos)
    if (!JOGOS.includes(b.jogo) || !Number.isFinite(pontos) || pontos < 0 || pontos > 100000)
      return res.status(400).json({ error: 'Partida inválida' })
    const r = await fetch(`${base}/rest/v1/pitstop_partidas`, {
      method: 'POST',
      headers: { ...headers, Prefer: 'return=minimal' },
      body: JSON.stringify({
        lead_id: b.leadId || null,
        nome: String(b.nome || '').slice(0, 80),
        posto: String(b.posto || 'sem-posto').slice(0, 40),
        jogo: b.jogo,
        pontos: Math.floor(pontos),
      }),
    })
    if (!r.ok) return res.status(502).json({ error: 'Falha ao gravar partida' })
    return res.status(201).json({ ok: true })
  }

  return res.status(405).json({ error: 'Método não permitido' })
}

// Boa Vista (RR) fica em UTC-4 o ano todo.
function startOfDayBoaVista() {
  const now = new Date(Date.now() - 4 * 3600 * 1000)
  now.setUTCHours(0, 0, 0, 0)
  return new Date(now.getTime() + 4 * 3600 * 1000).toISOString()
}

const primeiroNome = (nome) => String(nome || 'Motorista').trim().split(/\s+/)[0]
