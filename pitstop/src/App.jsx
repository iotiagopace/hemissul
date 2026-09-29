import { useEffect, useMemo, useState } from 'react'
import { currentPosto } from './config/pitstop.js'
import { GAMES } from './games/registry.js'
import { nextStep, shouldOfferQuote, perfil } from './core/lead.js'
import { load, save, registerVisit } from './core/storage.js'
import { fetchRanking, flushLeadQueue, sendLead, sendScore } from './core/api.js'
import { track, EVENTS } from './core/tracking.js'
import { Header, useChargeTimer } from './components/ui.jsx'
import FlowSheets from './components/FlowSheets.jsx'
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

  useEffect(() => {
    track(EVENTS.view, { posto: posto.id, visitas, cadastrado: !!lead })
    flushLeadQueue()
  }, [])

  useEffect(() => {
    if (screen !== 'home') return
    fetchRanking(posto.id, 'corrida').then((list) => {
      if (list) setRanking(list)
      else if (lead && records.corrida) setRanking([{ nome: `${lead.nome.split(' ')[0]} (você)`, pontos: records.corrida, me: true }])
    })
  }, [screen])

  const persistLead = (next, extra) => {
    setLead(next)
    save('lead', next)
    sendLead(next, { partidas, visitas, ...extra })
  }

  const play = (id) => {
    setSheet(null)
    setGameId(id)
    setRunKey((k) => k + 1)
    setScreen('play')
    window.scrollTo(0, 0)
    track(EVENTS.gameStart, { jogo: id, posto: posto.id })
  }

  const home = () => {
    setSheet(null)
    setScreen('home')
    window.scrollTo(0, 0)
  }

  const onEnd = (score) => {
    const game = GAMES[gameId]
    const record = records[gameId] || 0
    const isRecord = score > record
    const total = partidas + 1
    setPartidas(total)
    save('partidas', total)
    track(EVENTS.gameEnd, { jogo: gameId, pontos: score, recorde: isRecord, posto: posto.id })
    const result = { score, unit: game.unit, isRecord: !!lead && isRecord, record }

    if (lead && isRecord) {
      const next = { ...records, [gameId]: score }
      setRecords(next)
      save('records', next)
    }
    if (lead) sendScore({ leadId: lead.id, nome: lead.nome, posto: posto.id, jogo: gameId, pontos: score })

    const step = nextStep(lead, total)
    setSheet({ type: step, result })
  }

  const onCadastro = ({ nome, telefone, aceite }) => {
    const result = sheet.result
    const novo = { id: crypto.randomUUID(), nome, telefone, aceite, app: null, atividade: null, protecao: null, posto: posto.id, criadoEm: new Date().toISOString() }
    const nextRecords = { ...records, [gameId]: Math.max(records[gameId] || 0, result.score) }
    setRecords(nextRecords)
    save('records', nextRecords)
    persistLead(novo, { jogos: Object.keys(nextRecords) })
    sendScore({ leadId: novo.id, nome, posto: posto.id, jogo: gameId, pontos: result.score })
    track(EVENTS.lead, { posto: posto.id, jogo: gameId })
    setSheet({ type: 'app' })
  }

  const onAnswer = (field, value) => {
    if (field === 'app') {
      persistLead({ ...lead, app: value })
      track(EVENTS.profile, { app: value })
      return setSheet({ type: value ? 'atividade' : 'pronto' })
    }
    if (field === 'atividade') {
      persistLead({ ...lead, atividade: value })
      track(EVENTS.profile, { app: true, atividade: value })
      return setSheet({ type: 'pronto' })
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
        track(EVENTS.quoteView, { perfil: perfil(lead), posto: posto.id })
        return setSheet({ type: 'cotacao' })
      }
      return setSheet({ type: 'combinado' })
    }
  }

  const onProtecao = () => {
    if (!lead) return setSheet({ type: 'primeiro' })
    if (lead.protecao && lead.protecao !== 'pulou') {
      track(EVENTS.quoteView, { perfil: perfil(lead), posto: posto.id })
      return setSheet({ type: 'cotacao' })
    }
    setSheet({ type: 'protecao' })
  }

  return (
    <>
      <Header onCharge={() => setSheet({ type: 'charge' })} chargeLabel={charge.label} chargePct={charge.pct} />
      {screen === 'home' ? (
        <Home posto={posto} records={records} ranking={ranking} lead={lead} onPlay={play} onProtecao={onProtecao} />
      ) : (
        <Play key={`${gameId}-${runKey}`} gameId={gameId} runKey={runKey} onExit={home} onEnd={onEnd} />
      )}
      <FlowSheets
        sheet={sheet}
        lead={lead}
        posto={posto}
        onClose={() => setSheet(null)}
        onAgain={() => play(sheet?.type === 'primeiro' ? 'corrida' : gameId)}
        onHome={home}
        onCadastro={onCadastro}
        onAnswer={onAnswer}
        onChargeStart={(m) => {
          charge.start(m)
          setSheet(null)
        }}
      />
    </>
  )
}
