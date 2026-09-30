import { useState } from 'react'
import { PITSTOP } from '../config/pitstop.js'
import {
  ATIVIDADE_OPCOES,
  MENSAGENS,
  PROTECAO_OPCOES,
  maskTelefone,
  perfil,
  validateCadastro,
  whatsappText,
  whatsappUrl,
} from '../core/lead.js'
import { track, EVENTS } from '../core/tracking.js'
import { Bubble, Sheet } from './ui.jsx'

const fmt = (n) => n.toLocaleString('pt-BR')

function Score({ result }) {
  if (!result) return null
  return (
    <>
      <div className="big-score">
        {fmt(result.score)}{' '}
        <small>{result.unit === 'pts' ? 'pontos' : result.unit}</small>
      </div>
      {result.isRecord ? (
        <p className="record-note">Novo recorde pessoal.</p>
      ) : result.record ? (
        <p>
          Seu recorde: {fmt(result.record)}{' '}
          {result.unit === 'pts' ? 'pontos' : result.unit}
        </p>
      ) : null}
    </>
  )
}

function Actions({
  onAgain,
  onHome,
  quiet = false,
  againLabel = 'Jogar de novo',
}) {
  return (
    <div className="row">
      <button
        type="button"
        className={`btn ${quiet ? 'btn--quiet' : 'btn--primary'}`}
        onClick={onAgain}
      >
        {againLabel}
      </button>
      <button type="button" className="btn btn--quiet" onClick={onHome}>
        Outros jogos
      </button>
    </div>
  )
}

/**
 * Renderiza a etapa da jornada indicada por `sheet.type`.
 * O App decide a etapa com core/lead.js#nextStep e trata as respostas em `on*`.
 */
export default function FlowSheets({
  sheet,
  lead,
  leadStatus = 'idle',
  posto,
  onClose,
  onAgain,
  onHome,
  onCadastro,
  onAnswer,
  onChargeStart,
}) {
  const [form, setForm] = useState({ nome: '', telefone: '', aceite: false })
  const [error, setError] = useState(null)
  const [errorField, setErrorField] = useState(null)
  if (!sheet) return null
  const { type, result } = sheet
  const status = ['sending', 'queued'].includes(leadStatus) && (
    <p className="status-note" role="status">
      {leadStatus === 'sending'
        ? 'Enviando seu cadastro…'
        : 'Cadastro na fila de envio. Abra o Pitstop novamente com conexão para tentar enviar.'}
    </p>
  )

  if (type === 'charge')
    return (
      <Sheet label="Tempo de carga" onClose={onClose}>
        <h2>Quanto falta para a carga?</h2>
        <p>O tempo fica no topo enquanto você joga.</p>
        <div className="row">
          {[20, 40, 60, 90].map((m) => (
            <button
              key={m}
              type="button"
              className="btn btn--quiet"
              onClick={() => onChargeStart(m)}
            >
              {m} min
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn btn--quiet btn--block"
          onClick={onClose}
        >
          Agora não
        </button>
      </Sheet>
    )

  if (type === 'resultado')
    return (
      <Sheet label="Fim da partida" onClose={onHome}>
        <h2>Fim da partida</h2>
        <Score result={result} />
        <Actions onAgain={onAgain} onHome={onHome} />
      </Sheet>
    )

  if (type === 'primeiro')
    return (
      <Sheet label="Primeira partida" onClose={onClose}>
        <h2>Primeiro, uma partida</h2>
        <p>
          Jogue uma rodada e salve seu recorde. Depois a gente fala da sua
          proteção.
        </p>
        <button
          type="button"
          className="btn btn--primary btn--block"
          onClick={onAgain}
        >
          Jogar Corrida
        </button>
      </Sheet>
    )

  if (type === 'cadastro') {
    const submit = (e) => {
      e.preventDefault()
      const err = validateCadastro(form)
      setError(err)
      // O validador continua sendo a única fonte das regras e mensagens.
      const valid = { nome: 'Nome', telefone: '95900000000', aceite: true }
      const field =
        err &&
        Object.keys(valid).find(
          (key) => validateCadastro({ ...valid, [key]: form[key] }) === err,
        )
      setErrorField(field)
      if (field) e.currentTarget.elements.namedItem(field)?.focus()
      if (!err) onCadastro({ ...form, nome: form.nome.trim() })
    }
    return (
      <Sheet label="Salvar recorde" onClose={onHome}>
        <h2>Salve seu recorde</h2>
        <Score result={{ ...result, record: 0, isRecord: false }} />
        <p>
          Informe nome e WhatsApp para guardar a pontuação e entrar no ranking
          do posto.
        </p>
        <form onSubmit={submit} noValidate className="registration-form">
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              name="nome"
              required
              aria-invalid={errorField === 'nome'}
              aria-describedby={
                errorField === 'nome' ? 'nome-error' : undefined
              }
              autoComplete="name"
              value={form.nome}
              onChange={(e) => (
                setForm({ ...form, nome: e.target.value }),
                setError(null),
                setErrorField(null)
              )}
            />
            {errorField === 'nome' && (
              <p
                id="nome-error"
                className="error"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="telefone">WhatsApp</label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              required
              aria-invalid={errorField === 'telefone'}
              aria-describedby={
                errorField === 'telefone' ? 'telefone-error' : 'telefone-hint'
              }
              inputMode="tel"
              autoComplete="tel"
              placeholder="(95) 9 0000-0000"
              value={form.telefone}
              onChange={(e) => (
                setForm({ ...form, telefone: maskTelefone(e.target.value) }),
                setError(null),
                setErrorField(null)
              )}
            />
            <p id="telefone-hint" className="note">
              Informe o DDD e o número.
            </p>
            {errorField === 'telefone' && (
              <p
                id="telefone-error"
                className="error"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </p>
            )}
          </div>
          <label className="consent" htmlFor="aceite">
            <input
              id="aceite"
              name="aceite"
              required
              aria-invalid={errorField === 'aceite'}
              aria-describedby={
                errorField === 'aceite' ? 'aceite-error' : undefined
              }
              type="checkbox"
              checked={form.aceite}
              onChange={(e) => (
                setForm({ ...form, aceite: e.target.checked }),
                setError(null),
                setErrorField(null)
              )}
            />
            <span>
              Aceito que a Hemissul use estes dados para salvar meu recorde e
              entrar em contato, conforme a{' '}
              <a href={PITSTOP.privacyUrl} target="_blank" rel="noreferrer">
                política de privacidade
              </a>
              .
            </span>
          </label>
          {errorField === 'aceite' && (
            <p
              id="aceite-error"
              className="error"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          )}
          <button type="submit" className="btn btn--primary btn--block">
            Salvar recorde
          </button>
          <button
            type="button"
            className="btn btn--quiet btn--block"
            onClick={onHome}
          >
            Agora não
          </button>
        </form>
      </Sheet>
    )
  }

  if (type === 'app')
    return (
      <Sheet label="Pergunta rápida">
        <p className="eyebrow">Seu perfil</p>
        <h2>Você roda por aplicativo?</h2>
        <p>Seu recorde foi registrado neste aparelho.</p>
        {status}
        <button
          type="button"
          className="btn btn--option"
          onClick={() => onAnswer('app', true)}
        >
          Sim, rodo por aplicativo
        </button>
        <button
          type="button"
          className="btn btn--option"
          onClick={() => onAnswer('app', false)}
        >
          Não
        </button>
      </Sheet>
    )

  if (type === 'atividade')
    return (
      <Sheet label="Mais uma pergunta">
        <p className="eyebrow">Seu perfil</p>
        <h2>Como o aplicativo faz parte da sua rotina?</h2>
        {status}
        {ATIVIDADE_OPCOES.map((o) => (
          <button
            key={o}
            type="button"
            className="btn btn--option"
            onClick={() => onAnswer('atividade', o)}
          >
            {o}
          </button>
        ))}
      </Sheet>
    )

  if (type === 'pronto')
    return (
      <Sheet label="Pronto" onClose={onHome}>
        <h2>Tudo pronto para a próxima.</h2>
        <p>
          Seu recorde fica neste aparelho. O ranking do posto depende do envio
          com conexão.
        </p>
        {status}
        <Actions onAgain={onAgain} onHome={onHome} />
      </Sheet>
    )

  if (type === 'protecao')
    return (
      <Sheet label="Sua proteção" onClose={onHome}>
        <h2>{result ? 'Fim da partida' : 'Sua proteção'}</h2>
        <Score result={result} />
        <p className="question">
          Sua proteção atual cobre o uso do carro por aplicativo?
        </p>
        {PROTECAO_OPCOES.map((o) => (
          <button
            key={o}
            type="button"
            className="btn btn--option"
            onClick={() => onAnswer('protecao', o)}
          >
            {o}
          </button>
        ))}
        <button
          type="button"
          className="btn btn--quiet btn--block"
          onClick={() => onAnswer('protecao', null)}
        >
          Pular pergunta
        </button>
      </Sheet>
    )

  if (type === 'combinado')
    return (
      <Sheet label="Combinado" onClose={onHome}>
        <h2>Combinado</h2>
        <p>A cotação fica aqui no Pitstop quando você quiser.</p>
        {status}
        <Actions onAgain={onAgain} onHome={onHome} />
      </Sheet>
    )

  if (type === 'cotacao') {
    const p = perfil(lead)
    return (
      <Sheet label="Cotação" onClose={onHome}>
        <h2>Cotação em um toque</h2>
        <Bubble>{MENSAGENS[p]}</Bubble>
        <details className="quote-details">
          <summary>Ver mensagem para o WhatsApp</summary>
          <div className="quote-preview">{whatsappText(lead, posto.name)}</div>
        </details>
        <a
          className="btn btn--cta btn--block"
          href={whatsappUrl(lead, posto.name)}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            track(EVENTS.whatsapp, {
              perfil: p,
              posto: posto.id,
              origem: 'pitstop',
            })
          }
        >
          Pedir cotação pelo WhatsApp
        </a>
        <a
          className="btn btn--quiet btn--block"
          href={PITSTOP.quoteUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            track(EVENTS.quote, {
              perfil: p,
              posto: posto.id,
              origem: 'pitstop',
            })
          }
        >
          Fazer cotação online
        </a>
        <Actions
          quiet
          onAgain={onAgain}
          onHome={onHome}
          againLabel="Continuar jogando"
        />
      </Sheet>
    )
  }

  return null
}
