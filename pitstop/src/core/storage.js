/**
 * Persistência local (recorde, lead, partidas, visitas). Serve para o jogador
 * reencontrar seu recorde na próxima recarga. A fonte oficial do lead é o
 * backend (api/lead.js); o localStorage é só conveniência e pode falhar.
 */
const PREFIX = 'pitstop-hemissul.'

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* modo privado ou armazenamento bloqueado: segue sem persistir */
  }
}

/** Conta uma visita por dia (usada na métrica de retorno). */
export function registerVisit() {
  const today = new Date().toISOString().slice(0, 10)
  const visits = load('visits', [])
  if (!visits.includes(today)) {
    visits.push(today)
    save('visits', visits.slice(-60))
  }
  return visits.length
}
