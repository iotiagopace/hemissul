import { PITSTOP } from '../config/pitstop.js'
import { GAME_LIST } from '../games/registry.js'
import GameArt from '../components/GameArt.jsx'

const fmt = (n) => n.toLocaleString('pt-BR')

export default function Home({ posto, records, ranking, lead, onPlay, onProtecao }) {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">{posto.name}</p>
        <h1>{PITSTOP.headline}</h1>
        <p>Partidas curtas para a sua espera. A primeira é livre, sem cadastro.</p>
      </section>

      <section aria-labelledby="jogos" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        <h2 id="jogos" className="section-title">Escolha um jogo</h2>
        <div className="games">
          {GAME_LIST.map((g) => (
            <button key={g.id} type="button" className="game-card" onClick={() => onPlay(g.id)}>
              <GameArt id={g.id} />
              <b>{g.name}</b>
              <span>{g.description}</span>
              <span className="game-card__record">{records[g.id] ? `Seu recorde: ${fmt(records[g.id])} ${g.unit}` : 'Sem recorde ainda'}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="ranking">
        <h2 id="ranking" className="section-title">Ranking do dia · Corrida</h2>
        {ranking?.length ? (
          <ol className="ranking">
            {ranking.map((r, i) => (
              <li key={i} className={r.me ? 'is-me' : ''}>
                <span className="pos">{i + 1}º</span>
                <span>{r.nome}</span>
                <span>{fmt(r.pontos)} m</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="note">{lead ? 'Jogue uma Corrida para aparecer no ranking do posto.' : 'Salve seu recorde para aparecer no ranking do posto.'}</p>
        )}
      </section>

      <button type="button" className="btn btn--quiet btn--block" onClick={onProtecao}>
        Minha proteção cobre uso por aplicativo?
      </button>

      <p className="note">
        {PITSTOP.legalName}. Assistência 24h: {PITSTOP.assistancePhone}.
      </p>
    </main>
  )
}
