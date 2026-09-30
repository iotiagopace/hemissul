import { useEffect, useMemo, useRef, useState } from 'react'
import { currentPosto } from './config/pitstop.js'
import { GAMES } from './games/registry.js'
import { shouldOfferQuote, perfil } from './core/lead.js'
import { load, save, registerVisit } from './core/storage.js'
import {
  fetchRanking,
  flushLeadQueue,
  sendLead,
  sendScore,
  queueStatus,
} from './core/api.js'
import { track, EVENTS } from './core/tracking.js'
import { Header, useChargeTimer } from './components/ui.jsx'
import FlowSheets from './components/FlowSheets.jsx'
import GameIntro from './components/GameIntro.jsx'
import Home from './screens/Home.jsx'
import Play from './screens/Play.jsx'

export default function App() {
  const posto = useMemo(() => currentPosto(), [])
  const charge = useChargeTimer()
  const [screen, setScreen] = useState('home')
  const [gameId, setGameId] = useState('corrida')
  const [runKey, setRunKey] = useState(0)
  const [sheet, setSheet] = useState(null)
  const [lead, setLead] = useState(() => load('lead', null))
  const [records, setRecords] = useState(() => load('records', {}))
  const [partidas, setPartidas] = useState(() => load('partidas', 0))
  const [visitas] = useState(() => registerVisit())
  const [ranking, setRanking] = useState(null)
  const [rankingStatus, setRankingStatus] = useState('loading')
  const [delivery, setDelivery] = useState(() => ({
    queue: queueStatus(),
    localSaved: true,
  }))
  const requestVersions = useRef({ lead: 0, score: 0 })
  const afterProfile = useRef(null)

  const refreshQueue = () => {
    const queue = queueStatus()
    setDelivery((previous) =>
      JSON.stringify(previous.queue) === JSON.stringify(queue)
        ? previous
        : { ...previous, queue },
    )
  }

  useEffect(() => {
    track(EVENTS.view, { posto: posto.id, visitas, cadastrado: !!lead })
    flushLeadQueue().then(refreshQueue)
    // O contrato não oferece assinatura; acompanha também as tentativas automáticas.
    const timer = setInterval(refreshQueue, 1000)
    window.addEventListener('storage', refreshQueue)
    return () => {
      clearInterval(timer)
      window.removeEventListener('storage', refreshQueue)
    }
  }, [])

  const deliver = (kind, send) => {
    const version = ++requestVersions.current[kind]
    setDelivery((previous) => ({ ...previous, [kind]: { status: 'sending' } }))
    send().then((result) => {
      if (version !== requestVersions.current[kind]) return
      setDelivery((previous) => ({
        ...previous,
        [kind]: result,
        queue: queueStatus(),
      }))
    })
  }

  const remember = (key, value) => {
    if (!save(key, value))
      setDelivery((previous) => ({ ...previous, localSaved: false }))
  }

  useEffect(() => {
    if (screen !== 'home') return
    let current = true
    setRankingStatus('loading')
    fetchRanking(posto.id, 'corrida').then((list) => {
      if (!current) return
      setRankingStatus(list ? 'ready' : 'unavailable')
      if (list) setRanking(list)
      else if (lead && records.corrida)
        setRanking([
          {
            nome: `${lead.nome.split(' ')[0]} (você)`,
            pontos: records.corrida,
            me: true,
          },
        ])
    })
    return () => {
      current = false
    }
  }, [screen])

  useEffect(() => {
    if (sheet?.type === 'cotacao') {
      track(EVENTS.quoteView, { perfil: perfil(lead), posto: posto.id })
    }
  }, [sheet?.type])

  const persistLead = (next, extra) => {
    setLead(next)
    remember('lead', next)
    deliver('lead', () => sendLead(next, { partidas, visitas, ...extra }))
  }

  const startGame = (id) => {
    setSheet(null)
    setGameId(id)
    setRunKey((k) => k + 1)
    setScreen('play')
    window.scrollTo(0, 0)
    track(EVENTS.gameStart, { jogo: id, posto: posto.id })
  }

  const play = (id) => {
    setGameId(id)
    setSheet({ type: 'intro' })
  }

  const registerBefore = () => {
    afterProfile.current = 'play'
    setSheet({
      type: lead ? (lead.app == null ? 'app' : 'atividade') : 'cadastro-antes',
    })
  }

  const completeProfile = () => {
    const action = afterProfile.current
    afterProfile.current = null
    if (action === 'play') return startGame(gameId)
    setSheet({ type: action === 'quote' ? 'cotacao' : 'pronto' })
  }

  const requestQuote = () => {
    if (!lead) {
      afterProfile.current = 'quote'
      return setSheet({ type: 'cadastro-proposta', result: sheet?.result })
    }
    if (lead.app == null || (lead.app && !lead.atividade)) {
      afterProfile.current = 'quote'
      return setSheet({ type: lead.app == null ? 'app' : 'atividade' })
    }
    setSheet({ type: 'cotacao' })
  }

  const home = () => {
    setSheet(null)
    setScreen('home')
    window.scrollTo(0, 0)
  }

  const onEnd = (score, duracao) => {
    const game = GAMES[gameId]
    const record = records[gameId] || 0
    const isRecord = score > record
    const total = partidas + 1
    setPartidas(total)
    save('partidas', total)
    track(EVENTS.gameEnd, {
      jogo: gameId,
      pontos: score,
      recorde: isRecord,
      posto: posto.id,
    })
    const result = {
      score,
      duracao,
      unit: game.unit,
      isRecord: !!lead && isRecord,
      record,
    }

    if (lead && isRecord) {
      const next = { ...records, [gameId]: score }
      setRecords(next)
      remember('records', next)
    }
    if (lead)
      deliver('score', () =>
        sendScore({
          leadId: lead.id,
          nome: lead.nome,
          posto: posto.id,
          jogo: gameId,
          pontos: score,
          duracao,
        }),
      )

    setSheet({ type: 'resultado', result })
  }

  const onCadastro = ({ nome, telefone, aceite }) => {
    const result = sheet.result
    const novo = {
      id: crypto.randomUUID(),
      nome,
      telefone,
      aceite,
      app: null,
      atividade: null,
      protecao: null,
      posto: posto.id,
      criadoEm: new Date().toISOString(),
    }
    const nextRecords = result
      ? {
          ...records,
          [gameId]: Math.max(records[gameId] || 0, result.score),
        }
      : records
    setRecords(nextRecords)
    remember('records', nextRecords)
    persistLead(novo, { jogos: Object.keys(nextRecords) })
    if (result)
      deliver('score', () =>
        sendScore({
          leadId: novo.id,
          nome,
          posto: posto.id,
          jogo: gameId,
          pontos: result.score,
          duracao: result.duracao,
        }),
      )
    track(EVENTS.lead, { posto: posto.id, jogo: gameId })
    setSheet({ type: 'app' })
  }

  const onAnswer = (field, value) => {
    if (field === 'app') {
      persistLead({ ...lead, app: value })
      track(EVENTS.profile, { app: value })
      if (value) return setSheet({ type: 'atividade' })
      return completeProfile()
    }
    if (field === 'atividade') {
      persistLead({ ...lead, atividade: value })
      track(EVENTS.profile, { app: true, atividade: value })
      return completeProfile()
    }
    if (field === 'protecao') {
      if (value) {
        persistLead({ ...lead, protecao: value })
        track(EVENTS.protection, { resposta: value, perfil: perfil(lead) })
      } else {
        // "Pular": marca como respondida para não perguntar de novo nesta visita.
        setLead({ ...lead, protecao: lead.protecao ?? 'pulou' })
      }
      if (shouldOfferQuote(value)) {
        return setSheet({ type: 'cotacao' })
      }
      return setSheet({ type: 'combinado' })
    }
  }

  const onProtecao = () => {
    if (!lead) return setSheet({ type: 'primeiro' })
    if (lead.protecao && lead.protecao !== 'pulou') {
      return setSheet({ type: 'cotacao' })
    }
    setSheet({ type: 'protecao' })
  }

  return (
    <>
      <div>
        <Header
          onCharge={() => setSheet({ type: 'charge' })}
          chargeLabel={charge.label}
          chargePct={charge.pct}
        />
        {screen === 'home' ? (
          <Home
            posto={posto}
            records={records}
            ranking={ranking}
            rankingStatus={rankingStatus}
            delivery={delivery}
            lead={lead}
            onPlay={play}
            onProtecao={onProtecao}
          />
        ) : (
          <Play
            key={`${gameId}-${runKey}`}
            gameId={gameId}
            runKey={runKey}
            externalPaused={!!sheet}
            onExit={home}
            onEnd={onEnd}
          />
        )}
      </div>
      {sheet?.type === 'intro' && (
        <GameIntro
          gameId={gameId}
          registered={
            !!lead && lead.app != null && (!lead.app || !!lead.atividade)
          }
          onRegister={registerBefore}
          onPlay={() => startGame(gameId)}
          onClose={() => setSheet(null)}
        />
      )}
      <FlowSheets
        sheet={sheet?.type === 'intro' ? null : sheet}
        lead={lead}
        delivery={delivery}
        posto={posto}
        onClose={() => setSheet(null)}
        onAgain={() => play(sheet?.type === 'primeiro' ? 'corrida' : gameId)}
        onHome={home}
        onCadastro={onCadastro}
        onAnswer={onAnswer}
        onQuote={requestQuote}
        onChargeStart={(m) => {
          charge.start(m)
          setSheet(null)
        }}
      />
    </>
  )
}
