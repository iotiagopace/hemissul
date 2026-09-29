import { Suspense, useState } from 'react'
import { GAMES } from '../games/registry.js'

const fmt = (n) => n.toLocaleString('pt-BR')

export default function Play({ gameId, runKey, onExit, onEnd }) {
  const game = GAMES[gameId]
  const [paused, setPaused] = useState(false)
  const [score, setScore] = useState({ value: 0, label: game.name })
  const { Component } = game

  const onScore = (value, label) => setScore({ value, label: label || game.name })
  const shown = typeof score.value === 'number' ? `${fmt(score.value)} ${game.unit}` : score.value

  return (
    <main className="shell">
      <div className="playbar">
        <button type="button" className="btn btn--quiet" onClick={onExit}>Sair</button>
        <div className="score" aria-live="off">
          {shown}
          <small>{score.label}</small>
        </div>
        <button type="button" className="btn btn--quiet" onClick={() => setPaused((p) => !p)}>
          {paused ? 'Continuar' : 'Pausar'}
        </button>
      </div>
      <Suspense fallback={<p className="hint">Carregando {game.name}…</p>}>
        <Component key={runKey} paused={paused} onScore={onScore} onEnd={onEnd} />
      </Suspense>
    </main>
  )
}
