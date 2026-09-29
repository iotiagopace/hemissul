/**
 * Motor da Corrida Hemissul.
 * Rodovia de 3 faixas vista de cima. O jogador troca de faixa para desviar do
 * trânsito. Pontuação = distância em metros. Sem DOM: o componente desenha o
 * estado num <canvas> a cada frame.
 */
import { pick } from '../../core/rng.js'

export const CORRIDA = {
  width: 360,
  height: 540,
  lanes: [70, 180, 290],
  car: { w: 54, h: 88 },
  playerY: 420,
  speed: { start: 280, max: 720, accel: 14 },
  spawn: { start: 1.25, min: 0.55, rampDistance: 5000 },
  doubleTrafficMax: 0.5,
  doubleTrafficRamp: 4000,
  trafficSpeedFactor: 0.62,
  unit: 'm',
}

export function createCorrida(rng) {
  return {
    rng,
    lane: 1,
    x: CORRIDA.lanes[1],
    traffic: [],
    distance: 0,
    speed: CORRIDA.speed.start,
    spawnIn: 0,
    scroll: 0,
    over: false,
  }
}

export function corridaInput(state, key) {
  if (state.over) return state
  if (key === 'left') state.lane = Math.max(0, state.lane - 1)
  if (key === 'right') state.lane = Math.min(2, state.lane + 1)
  return state
}

/** Avança a simulação `dt` segundos. Retorna o estado (mutado). */
export function corridaStep(state, dt) {
  if (state.over) return state
  const { lanes, car, playerY, speed, spawn } = CORRIDA
  const s = state
  s.speed = Math.min(speed.max, s.speed + speed.accel * dt)
  s.distance += (s.speed * dt) / 8
  s.scroll += s.speed * dt
  s.x += (lanes[s.lane] - s.x) * Math.min(1, dt * 14)

  s.spawnIn -= dt
  if (s.spawnIn <= 0) {
    const free = Math.floor(s.rng() * 3)
    const chanceDouble = Math.min(CORRIDA.doubleTrafficMax, s.distance / CORRIDA.doubleTrafficRamp)
    const count = s.rng() < chanceDouble ? 2 : 1
    const options = [0, 1, 2].filter((l) => l !== free)
    const chosen = count === 2 ? options : [pick(options, s.rng)]
    chosen.forEach((lane) =>
      s.traffic.push({ lane, y: -car.h - s.rng() * 30, tone: Math.floor(s.rng() * 5) }),
    )
    s.spawnIn = Math.max(spawn.min, spawn.start - s.distance / spawn.rampDistance)
  }

  s.traffic.forEach((t) => (t.y += s.speed * CORRIDA.trafficSpeedFactor * dt))
  s.traffic = s.traffic.filter((t) => t.y < CORRIDA.height + 10)

  for (const t of s.traffic) {
    const sameLane = Math.abs(lanes[t.lane] - s.x) < car.w - 8
    const overlap = t.y + car.h - 10 > playerY && t.y < playerY + car.h - 10
    if (sameLane && overlap) {
      s.over = true
      break
    }
  }
  return s
}

export const corridaScore = (state) => Math.floor(state.distance)
