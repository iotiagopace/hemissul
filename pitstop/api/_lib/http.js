/**
 * Utilitários das Vercel Functions do Pitstop. A pasta começa com "_" para a
 * Vercel não publicar este arquivo como rota.
 *
 * Contrato de resposta (sempre JSON):
 * - sucesso:  { ok: true, ... }
 * - erro:     { ok: false, error, retryable, campo?, mensagem? }
 *   retryable=false  pedido inválido: reenviar igual não adianta
 *   retryable=true   indisponibilidade ou falha temporária: tentar de novo
 */
export const MAX_BODY_BYTES = 16 * 1024

export function send(res, status, payload, headers = {}) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', headers['Cache-Control'] || 'no-store')
  for (const [k, v] of Object.entries(headers)) if (k !== 'Cache-Control') res.setHeader(k, v)
  return res.status(status).json(payload)
}

export const fail = (res, status, error, extra = {}, headers = {}) =>
  send(res, status, { ok: false, error, retryable: status >= 500 || status === 429, ...extra }, headers)

/**
 * Lê o corpo JSON. A Vercel já faz o parse; se o JSON vier quebrado, o acesso
 * a `req.body` lança erro. Devolve `{ body }` ou `{ status, error }`.
 */
export function readJson(req) {
  const type = String(req.headers?.['content-type'] || '')
  if (!type.includes('application/json')) return { status: 415, error: 'content_type' }
  const length = Number(req.headers?.['content-length'] || 0)
  if (length > MAX_BODY_BYTES) return { status: 413, error: 'grande_demais' }
  let body
  try {
    body = req.body
  } catch {
    return { status: 400, error: 'json_invalido' }
  }
  if (typeof body === 'string') {
    if (body.length > MAX_BODY_BYTES) return { status: 413, error: 'grande_demais' }
    try {
      body = JSON.parse(body)
    } catch {
      return { status: 400, error: 'json_invalido' }
    }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { status: 400, error: 'json_invalido' }
  return { body }
}

/**
 * fetch com timeout. Nunca lança: devolve `{ ok, status, data, headers, error }`.
 * `error` é 'timeout', 'rede', 'http' ou 'resposta_invalida'.
 */
export async function fetchWithTimeout(url, init = {}, { timeout = 4000, fetchImpl = globalThis.fetch, expectJson = false } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetchImpl(url, { ...init, signal: controller.signal })
    const text = await res.text().catch(() => '')
    let data = null
    if (text) {
      try {
        data = JSON.parse(text)
      } catch {
        if (expectJson && res.ok) return { ok: false, status: res.status, error: 'resposta_invalida' }
      }
    } else if (expectJson && res.ok) return { ok: false, status: res.status, error: 'resposta_invalida' }
    const headers = res.headers
    return res.ok ? { ok: true, status: res.status, data, headers } : { ok: false, status: res.status, data, headers, error: 'http' }
  } catch (err) {
    return { ok: false, status: 0, error: err?.name === 'AbortError' ? 'timeout' : 'rede' }
  } finally {
    clearTimeout(timer)
  }
}

/** Falha do destino que vale tentar de novo mais tarde. */
export const isTemporary = (r) => r.status === 0 || r.status === 408 || r.status === 429 || r.status >= 500

export function supabaseConfig(env = process.env) {
  const url = env.SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return {
    url: url.replace(/\/+$/, ''),
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
  }
}
