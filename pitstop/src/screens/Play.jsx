import {
  Component as ReactComponent,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react'
import { GAMES } from '../games/registry.js'

const fmt = (n) => n.toLocaleString('pt-BR')

class GameBoundary extends ReactComponent {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed)
      return (
        <section className="game-status" role="alert">
          <h2>Não foi possível abrir o jogo.</h2>
          <p>Confira sua conexão e tente novamente.</p>
          <button
            className="btn btn--primary"
            onClick={() => window.location.reload()}
          >
            Recarregar o Pitstop
          </button>
          <button className="btn btn--quiet" onClick={this.props.onExit}>
            Voltar aos jogos
          </button>
        </section>
      )
    return this.props.children
  }
}

export default function Play({
  gameId,
  runKey,
  externalPaused = false,
  onExit,
  onEnd,
}) {
  const game = GAMES[gameId]
  const [paused, setPaused] = useState(false)
  const [score, setScore] = useState({ value: 0, label: game.name })
  const [announcement, setAnnouncement] = useState('')
  const latest = useRef('')
  const { Component } = game
  const onScore = (value, label) =>
    setScore({ value, label: label || game.name })
  const shown =
    typeof score.value === 'number'
      ? `${fmt(score.value)} ${game.unit === 'pts' ? 'pontos' : game.unit}`
      : score.value
  latest.current = `${shown}. ${score.label}`
  useEffect(() => {
    // A pista atualiza por quadro; o leitor de tela recebe um resumo a cada 5 s.
    const timer = setInterval(() => setAnnouncement(latest.current), 5000)
    return () => clearInterval(timer)
  }, [])
  useEffect(() => {
    const hide = () => {
      if (document.hidden) setPaused(true)
    }
    document.addEventListener('visibilitychange', hide)
    return () => document.removeEventListener('visibilitychange', hide)
  }, [])
  return (
    <main className={`shell play play--${gameId}`}>
      <div className="play-heading">
        <button type="button" className="text-button" onClick={onExit}>
          ← Outros jogos
        </button>
        <h1>{game.name}</h1>
      </div>
      <div className="playbar">
        <div className="score">
          {shown}
          <small>{score.label}</small>
        </div>
        <span
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {announcement}
        </span>
        <button
          type="button"
          className="btn btn--quiet"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? 'Continuar' : 'Pausar'}
        </button>
      </div>
      <GameBoundary onExit={onExit}>
        <Suspense
          fallback={
            <div className="game-status" role="status" aria-live="polite">
              <p className="eyebrow">Preparando sua partida</p>
              <h2>Carregando {game.name}…</h2>
              <p>Você já pode pausar ou voltar aos jogos.</p>
            </div>
          }
        >
          <Component
            key={runKey}
            paused={paused || externalPaused}
            onScore={onScore}
            onEnd={onEnd}
          />
        </Suspense>
      </GameBoundary>
    </main>
  )
}
