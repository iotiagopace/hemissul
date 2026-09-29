import { useState } from 'react'
import { PITSTOP } from '../config/pitstop.js'
import { ATIVIDADE_OPCOES, MENSAGENS, PROTECAO_OPCOES, maskTelefone, perfil, validateCadastro, whatsappText, whatsappUrl } from '../core/lead.js'
import { track, EVENTS } from '../core/tracking.js'
import { Bubble, Sheet } from './ui.jsx'

const fmt = (n) => n.toLocaleString('pt-BR')

function Score({ result }) {
  if (!result) return null
  return (
    <>
      <div className="big-score">
        {fmt(result.score)} <small>{result.unit}</small>
      </div>
      {result.isRecord ? <p style={{ color: 'var(--color-cta-dark)' }}>Novo recorde pessoal.</p> : result.record ? <p>Seu recorde: {fmt(result.record)} {result.unit}</p> : null}
    </>
  )
}

function Actions({ onAgain, onHome, againLabel = 'Jogar de novo' }) {
  return (
    <div className="row">
      <button type="button" className="btn btn--primary" onClick={onAgain}>{againLabel}</button>
      <button type="button" className="btn btn--quiet" onClick={onHome}>Outros jogos</button>
    </div>
  )
}

/**
 * Renderiza a etapa da jornada indicada por `sheet.type`.
 * O App decide a etapa com core/lead.js#nextStep e trata as respostas em `on*`.
 */
export default function FlowSheets({ sheet, lead, posto, onClose, onAgain, onHome, onCadastro, onAnswer, onChargeStart }) {
  const [form, setForm] = useState({ nome: '', telefone: '', aceite: false })
  const [error, setError] = useState(null)
  if (!sheet) return null
  const { type, result } = sheet
  const primeiroNome = lead?.nome?.split(' ')[0]

  if (type === 'charge')
    return (
      <Sheet label="Tempo de carga" onClose={onClose}>
        <h2>Quanto falta para a carga?</h2>
        <p>O tempo fica no topo enquanto você joga.</p>
        <div className="row">
          {[20, 40, 60, 90].map((m) => (
            <button key={m} type="button" className="btn btn--quiet" onClick={() => onChargeStart(m)}>{m} min</button>
          ))}
        </div>
        <button type="button" className="btn btn--quiet btn--block" onClick={onClose}>Agora não</button>
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
        <p>Jogue uma rodada e salve seu recorde. Depois a gente fala da sua proteção.</p>
        <button type="button" className="btn btn--primary btn--block" onClick={onAgain}>Jogar Corrida</button>
      </Sheet>
    )

  if (type === 'cadastro') {
    const submit = (e) => {
      e.preventDefault()
      const err = validateCadastro(form)
      setError(err)
      if (!err) onCadastro({ ...form, nome: form.nome.trim() })
    }
    return (
      <Sheet label="Salvar recorde" onClose={onHome}>
        <h2>Salve seu recorde</h2>
        <Score result={{ ...result, record: 0, isRecord: false }} />
        <p>Informe nome e WhatsApp para guardar a pontuação e entrar no ranking do posto.</p>
        <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input id="nome" autoComplete="given-name" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="telefone">WhatsApp</label>
            <input id="telefone" inputMode="tel" autoComplete="tel" placeholder="(95) 9 0000-0000" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: maskTelefone(e.target.value) })} />
          </div>
          <label className="consent" htmlFor="aceite">
            <input id="aceite" type="checkbox" checked={form.aceite} onChange={(e) => setForm({ ...form, aceite: e.target.checked })} />
            <span>
              Aceito que a Hemissul use estes dados para salvar meu recorde e entrar em contato, conforme a{' '}
              <a href={PITSTOP.privacyUrl} target="_blank" rel="noreferrer">política de privacidade</a>.
            </span>
          </label>
          {error && <p className="error" role="alert">{error}</p>}
          <button type="submit" className="btn btn--primary btn--block">Salvar recorde</button>
          <button type="button" className="btn btn--quiet btn--block" onClick={onHome}>Agora não</button>
        </form>
      </Sheet>
    )
  }

  if (type === 'app')
    return (
      <Sheet label="Pergunta rápida">
        <h2>Recorde salvo</h2>
        <Bubble>Boa, {primeiroNome}! Uma pergunta rápida: você roda por aplicativo?</Bubble>
        <button type="button" className="btn btn--option" onClick={() => onAnswer('app', true)}>Sim, rodo por aplicativo</button>
        <button type="button" className="btn btn--option" onClick={() => onAnswer('app', false)}>Não</button>
      </Sheet>
    )

  if (type === 'atividade')
    return (
      <Sheet label="Mais uma pergunta">
        <h2>Mais uma</h2>
        <Bubble>O aplicativo é sua atividade principal ou uma renda complementar?</Bubble>
        {ATIVIDADE_OPCOES.map((o) => (
          <button key={o} type="button" className="btn btn--option" onClick={() => onAnswer('atividade', o)}>{o}</button>
        ))}
      </Sheet>
    )

  if (type === 'pronto')
    return (
      <Sheet label="Pronto" onClose={onHome}>
        <h2>Pronto</h2>
        <Bubble>Você já está no ranking do posto. Bom jogo e boa recarga.</Bubble>
        <Actions onAgain={onAgain} onHome={onHome} />
      </Sheet>
    )

  if (type === 'protecao')
    return (
      <Sheet label="Sua proteção" onClose={onHome}>
        <h2>{result ? 'Fim da partida' : 'Sua proteção'}</h2>
        <Score result={result} />
        <Bubble>Antes da próxima: sua proteção atual cobre o uso do carro por aplicativo?</Bubble>
        {PROTECAO_OPCOES.map((o) => (
          <button key={o} type="button" className="btn btn--option" onClick={() => onAnswer('protecao', o)}>{o}</button>
        ))}
        <button type="button" className="btn btn--quiet btn--block" onClick={() => onAnswer('protecao', null)}>Pular pergunta</button>
      </Sheet>
    )

  if (type === 'combinado')
    return (
      <Sheet label="Combinado" onClose={onHome}>
        <h2>Combinado</h2>
        <Bubble>A cotação fica aqui no Pitstop quando você quiser.</Bubble>
        <Actions onAgain={onAgain} onHome={onHome} />
      </Sheet>
    )

  if (type === 'cotacao') {
    const p = perfil(lead)
    return (
      <Sheet label="Cotação" onClose={onHome}>
        <h2>Cotação em um toque</h2>
        <Bubble>{MENSAGENS[p]}</Bubble>
        <p className="eyebrow">Mensagem que já vai preenchida</p>
        <div className="quote-preview">{whatsappText(lead, posto.name)}</div>
        <a className="btn btn--cta btn--block" href={whatsappUrl(lead, posto.name)} target="_blank" rel="noreferrer" onClick={() => track(EVENTS.whatsapp, { perfil: p, posto: posto.id, origem: 'pitstop' })}>
          Pedir cotação pelo WhatsApp
        </a>
        <a className="btn btn--quiet btn--block" href={PITSTOP.quoteUrl} target="_blank" rel="noreferrer" onClick={() => track(EVENTS.quote, { perfil: p, posto: posto.id, origem: 'pitstop' })}>
          Fazer cotação online
        </a>
        <Actions onAgain={onAgain} onHome={onHome} againLabel="Continuar jogando" />
      </Sheet>
    )
  }

  return null
}
