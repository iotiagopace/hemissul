/**
 * Comunicação com o backend. Falhas de rede não podem travar o jogo:
 * o lead fica numa fila local e é reenviado na próxima abertura.
 */
import { PITSTOP } from '../config/pitstop.js'
import { load, save } from './storage.js'

async function post(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json().catch(() => ({}))
}

/** Envia (ou atualiza) o lead. `lead.id` é gerado no cadastro. */
export async function sendLead(lead, extra = {}) {
  const payload = { ...lead, ...extra, enviadoEm: new Date().toISOString() }
  try {
    await post(PITSTOP.leadEndpoint, payload)
    return true
  } catch {
    const queue = load('lead-queue', [])
    queue.push(payload)
    save('lead-queue', queue.slice(-20))
    return false
  }
}

export async function flushLeadQueue() {
  const queue = load('lead-queue', [])
  if (!queue.length) return
  const rest = []
  for (const item of queue) {
    try {
      await post(PITSTOP.leadEndpoint, item)
    } catch {
      rest.push(item)
    }
  }
  save('lead-queue', rest)
}

export async function sendScore({ leadId, nome, posto, jogo, pontos }) {
  try {
    await post(PITSTOP.rankingEndpoint, { leadId, nome, posto, jogo, pontos })
  } catch {
    /* ranking é secundário: sem backend, fica só o recorde local */
  }
}

export async function fetchRanking(posto, jogo) {
  try {
    const res = await fetch(`${PITSTOP.rankingEndpoint}?posto=${encodeURIComponent(posto)}&jogo=${jogo}`)
    if (!res.ok) throw new Error()
    const data = await res.json()
    return Array.isArray(data.ranking) ? data.ranking : null
  } catch {
    return null
  }
}
