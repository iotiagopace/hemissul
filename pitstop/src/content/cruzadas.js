/**
 * Grades de palavras cruzadas. Para publicar uma grade nova (evolução mensal),
 * acrescente um objeto em GRADES e rode `npm test`: o teste valida conflitos.
 *
 * Regras de conteúdo:
 * - resposta em MAIÚSCULAS, sem acento e sem espaço;
 * - dica curta, em linguagem de motorista;
 * - dica que cite a Hemissul só pode usar fatos confirmados pela Hemissul
 *   (hoje: assistência 24h, cobertura nacional, rastreamento);
 * - nunca usar "seguro", "apólice" ou "seguradora": a Hemissul é proteção
 *   veicular mutualista.
 */
export const GRADES = [
  {
    id: 'estrada-01',
    title: 'Na estrada',
    size: 12,
    words: [
      { answer: 'NACIONAL', row: 0, col: 2, dir: 'A', clue: 'A cobertura da proteção Hemissul é ________.' },
      { answer: 'FAROL', row: 2, col: 0, dir: 'A', clue: 'Ilumina a pista à noite.' },
      { answer: 'ESTRADA', row: 4, col: 3, dir: 'A', clue: 'Via que liga uma cidade a outra.' },
      { answer: 'MOTORISTA', row: 6, col: 1, dir: 'A', clue: 'Quem dirige para aplicativos de transporte.' },
      { answer: 'PNEU', row: 9, col: 1, dir: 'A', clue: 'Calibrado, ajuda a economizar e a rodar com segurança.' },
      { answer: 'FREIO', row: 11, col: 0, dir: 'A', clue: 'Pedal que faz o carro parar.' },
      { answer: 'CARGA', row: 11, col: 7, dir: 'A', clue: 'O que o carro elétrico recebe no eletroposto.' },
      { answer: 'COLISAO', row: 0, col: 4, dir: 'D', clue: 'Batida entre veículos, frequente no trânsito da região.' },
      { answer: 'CORRIDA', row: 2, col: 6, dir: 'D', clue: 'Viagem feita para um passageiro de aplicativo.' },
      { answer: 'PLACA', row: 2, col: 9, dir: 'D', clue: 'Identificação do veículo, com letras e números.' },
      { answer: 'VOLANTE', row: 5, col: 2, dir: 'D', clue: 'Peça que o motorista segura para guiar o carro.' },
      { answer: 'BATERIA', row: 5, col: 11, dir: 'D', clue: 'Guarda a energia que move o carro elétrico.' },
      { answer: 'TOMADA', row: 6, col: 8, dir: 'D', clue: 'Ponto de energia onde se liga um carregador.' },
    ],
  },
]
