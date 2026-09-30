import { lazy } from 'react'

/**
 * Catálogo de jogos. Cada jogo é carregado só quando escolhido (lazy), para
 * não gastar o pacote de dados do motorista com o que ele não usa.
 *
 * Contrato de um jogo: componente React com props
 *   paused: boolean
 *   onScore(valor: number | string, legenda?: string)
 *   onEnd(pontos: number)
 */
export const GAMES = {
  corrida: {
    id: 'corrida',
    name: 'Corrida',
    description: 'Troque de faixa e desvie do trânsito',
    unit: 'm',
    Component: lazy(() => import('./corrida/Corrida.jsx')),
  },
  blocos: {
    id: 'blocos',
    name: 'Blocos',
    description: 'Encaixe as peças e feche linhas',
    unit: 'pts',
    Component: lazy(() => import('./blocos/Blocos.jsx')),
  },
  sudoku: {
    id: 'sudoku',
    name: 'Sudoku',
    description: 'Três níveis, desafio novo a cada partida',
    unit: 'pts',
    Component: lazy(() => import('./sudoku/Sudoku.jsx')),
  },
  cruzadas: {
    id: 'cruzadas',
    name: 'Cruzadas',
    description: 'Grade sobre carro, estrada e trânsito',
    unit: 'pts',
    Component: lazy(() => import('./cruzadas/Cruzadas.jsx')),
  },
}

export const GAME_LIST = Object.values(GAMES)
