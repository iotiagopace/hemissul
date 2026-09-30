import { GAMES } from '../games/registry.js'
import GameArt from './GameArt.jsx'
import { Sheet } from './ui.jsx'

const STORIES = {
  corrida: {
    title: 'Um novo trajeto a cada partida.',
    story:
      'Enquanto seu carro recarrega, sua atenção entra em pista. Observe o trânsito e encontre espaço para seguir.',
    instruction:
      'Toque à esquerda ou à direita para mudar de faixa. A partida termina ao encostar em outro carro.',
    time: 'Sem tempo fixo. A duração depende do seu percurso.',
  },
  blocos: {
    title: 'Um espaço para cada peça.',
    story:
      'Entre uma saída e outra, coloque as ideias em ordem. Encaixe as peças e abra espaço para o que vem a seguir.',
    instruction:
      'Mova e gire as peças. Complete uma linha para liberar espaço antes que a pilha chegue ao topo.',
    time: 'Sem tempo fixo. A partida termina quando não há espaço para a próxima peça.',
  },
  sudoku: {
    title: 'Uma pausa para pensar.',
    story:
      'Tire o pé da pressa. Observe os números, encontre as possibilidades e resolva uma casa de cada vez.',
    instruction:
      'Preencha de 1 a 9, sem repetir números na linha, na coluna ou no bloco. Você escolhe o nível antes de começar.',
    time: 'Estimativa do jogo: 5 a 10 min no Fácil; 10 a 15 no Médio; 15 min ou mais no Difícil.',
  },
  cruzadas: {
    title: 'Seu dia a dia, em palavras.',
    story:
      'Carro, caminho e rotina. Use o que você conhece da estrada para encontrar as respostas desta grade.',
    instruction:
      'Leia a pista, toque nas letras e complete a palavra. Use as setas para escolher outra pista.',
    time: 'No seu ritmo. A partida termina quando a grade está completa.',
  },
}

export default function GameIntro({
  gameId,
  registered,
  onRegister,
  onPlay,
  onClose,
}) {
  const game = GAMES[gameId]
  const story = STORIES[gameId]
  return (
    <Sheet label={`Antes de jogar ${game.name}`} onClose={onClose}>
      <div className="game-intro">
        <p className="eyebrow">{game.name} · Seu intervalo na recarga</p>
        <h2>{story.title}</h2>
        <GameArt id={gameId} />
        <p>{story.story}</p>
        <p className="game-intro__instruction">{story.instruction}</p>
        <p className="note">{story.time}</p>
        {!registered && (
          <p>
            Cadastre nome e WhatsApp para guardar seu recorde. A proposta da
            Hemissul fica para depois, se você quiser.
          </p>
        )}
        <button
          className="btn btn--primary btn--block"
          onClick={registered ? onPlay : onRegister}
        >
          {registered ? `Começar ${game.name}` : 'Cadastrar e jogar'}
        </button>
        {!registered && (
          <button className="btn btn--quiet btn--block" onClick={onPlay}>
            Jogar sem cadastrar
          </button>
        )}
      </div>
    </Sheet>
  )
}
