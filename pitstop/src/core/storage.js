/**
 * Persistência local (recorde, lead, partidas, visitas, filas de envio).
 * Serve para o jogador reencontrar seu recorde na próxima recarga. A fonte
 * oficial do lead é o backend (api/lead.js); o localStorage é conveniência e
 * pode falhar (modo privado, cota cheia, bloqueio do navegador).
 *
 * `save` e `remove` devolvem `true` só quando a gravação aconteceu. Quem
 * depende da gravação (a fila de envio) precisa checar o retorno.
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
    return true
  } catch {
    return false
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(PREFIX + key)
    return true
  } catch {
    return false
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
