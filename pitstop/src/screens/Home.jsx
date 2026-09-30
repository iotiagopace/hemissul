import { PITSTOP } from '../config/pitstop.js'
import { GAME_LIST } from '../games/registry.js'
import GameArt from '../components/GameArt.jsx'

const fmt = (n) => n.toLocaleString('pt-BR')

export default function Home({
  posto,
  records,
  ranking,
  rankingStatus = 'ready',
  lead,
  leadStatus = 'idle',
  onPlay,
  onProtecao,
}) {
  const localOnly = ranking?.length && ranking.every((r) => r.me)
  return (
    <main className="home">
      <section className="hero">
        <div className="shell hero__inner">
          <p className="eyebrow">Pitstop Hemissul · {posto.name}</p>
          <h1>
            Seu intervalo.
            <br />
            Sua próxima partida.
          </h1>
          <p>
            Escolha um jogo enquanto o carro carrega. A primeira partida é
            livre, sem cadastro.
          </p>
          <a className="hero__link" href="#jogos">
            Escolher jogo <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <div className="shell home__content">
        {leadStatus === 'queued' && (
          <p className="status-note" role="status">
            Cadastro na fila de envio. Abra o Pitstop novamente com conexão para
            tentar enviar.
          </p>
        )}
        <section className="game-selection" aria-labelledby="jogos">
          <div className="section-heading">
            <h2 id="jogos" className="section-title">
              Escolha um jogo
            </h2>
            <span className="note">Sem som</span>
          </div>
          <div className="games">
            {GAME_LIST.map((g, i) => (
              <button
                key={g.id}
                type="button"
                className={`game-card${i === 0 ? ' game-card--featured' : ''}`}
                onClick={() => onPlay(g.id)}
                aria-label={`Jogar ${g.name}`}
              >
                <GameArt id={g.id} />
                <span className="game-card__body">
                  <span className="game-card__title">
                    <b>{g.name}</b>
                    <span aria-hidden="true">↗</span>
                  </span>
                  <span className="game-card__description">
                    {g.description}
                  </span>
                  <span className="game-card__record">
                    {records[g.id]
                      ? `Seu recorde: ${fmt(records[g.id])} ${g.unit === 'pts' ? 'pontos' : g.unit}`
                      : 'Faça seu primeiro recorde'}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
        <button type="button" className="protection-link" onClick={onProtecao}>
          <span>
            <span className="eyebrow">Sua proteção</span>
            <strong>Minha proteção cobre uso por aplicativo?</strong>
          </span>
          <span aria-hidden="true">↗</span>
        </button>
        <section className="panel" aria-labelledby="ranking">
          <p className="eyebrow">{posto.name} · Corrida</p>
          <h2 id="ranking" className="section-title">
            Ranking do dia
          </h2>
          <div aria-live="polite" aria-busy={rankingStatus === 'loading'}>
            {rankingStatus === 'loading' ? (
              <p className="status-note">Carregando ranking do posto…</p>
            ) : (
              <>
                {rankingStatus === 'unavailable' && (
                  <p className="status-note">
                    Não foi possível carregar o ranking do posto. Você pode
                    continuar jogando.
                  </p>
                )}
                {ranking?.length ? (
                  <>
                    {localOnly && rankingStatus === 'unavailable' && (
                      <p className="note">Seu recorde neste aparelho</p>
                    )}
                    <ol className="ranking">
                      {ranking.map((r, i) => (
                        <li key={i} className={r.me ? 'is-me' : ''}>
                          <span className="pos">
                            {localOnly && rankingStatus === 'unavailable'
                              ? '—'
                              : `${i + 1}º`}
                          </span>
                          <span>{r.nome}</span>
                          <strong>{fmt(r.pontos)} m</strong>
                        </li>
                      ))}
                    </ol>
                  </>
                ) : (
                  rankingStatus !== 'unavailable' && (
                    <p className="status-note">
                      Ainda não há recordes por aqui.{' '}
                      {lead
                        ? 'Jogue uma Corrida para começar.'
                        : 'Jogue e salve seu recorde para participar.'}
                    </p>
                  )
                )}
              </>
            )}
          </div>
        </section>
      </div>
      <footer className="pitstop-footer">
        <div className="shell">
          <img
            src={`${import.meta.env.BASE_URL}brand/logo-branca.png`}
            alt="Hemissul Proteção Veicular"
            width="132"
            height="44"
            loading="lazy"
          />
          <p>Proteção para seguir sua jornada.</p>
          <a href="tel:08009402163">
            Assistência 24h · {PITSTOP.assistancePhone}
          </a>
          <div className="footer-links">
            <a href={PITSTOP.siteUrl} target="_blank" rel="noreferrer">
              Conheça a Hemissul ↗
            </a>
            <a href={PITSTOP.privacyUrl} target="_blank" rel="noreferrer">
              Privacidade ↗
            </a>
          </div>
          <small>{PITSTOP.legalName}</small>
        </div>
      </footer>
    </main>
  )
}
