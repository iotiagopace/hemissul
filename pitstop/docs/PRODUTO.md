# Produto · Pitstop Online Hemissul

Resumo da proposta aprovada pela Metry. Documento de referência para decisões
de produto. A apresentação da jornada está em `src/App.jsx`; validação,
perfis e mensagens aprovadas continuam em `src/core/lead.js`.

## Objetivo

1. Principal: lead qualificado (nome, WhatsApp, perfil de uso) para o comercial.
2. Secundário: hábito de voltar ao Pitstop a cada recarga (recorde, ranking).

## Jornada

Refino solicitado: apresentar o contexto de cada jogo e convidar ao cadastro
antes de começar. O cadastro permanece opcional nesta versão de revisão.

| # | Momento | O que acontece |
| --- | --- | --- |
| 1 | QR Code | Abre `/pitstop?posto=<id>`. Sem instalar nada |
| 2 | Escolha do jogo | Introdução própria, instruções e informação honesta sobre duração |
| 3 | Antes da partida | Convite para nome + WhatsApp + aceite, com opção "Jogar sem cadastrar" |
| 4 | Após o cadastro | "Você roda por aplicativo?" e, se sim, atividade principal ou renda complementar |
| 5 | Partida | Começa após o perfil ou pela opção sem cadastro; quem já tem cadastro completo não repete os campos |
| 6 | Fim da partida | Resultado, estado dos envios e convite explícito para proposta personalizada ou conhecer a proteção veicular |
| 7 | Pedido de proposta | Visitante sem cadastro preenche contato e perfil; cadastrado segue para a cotação com a mensagem aprovada |
| 8 | Sempre | Atalho de proteção na Home e opção de continuar jogando; nenhum envio confirmado é presumido pela fila vazia |

O helper `nextStep` em `core/lead.js` descreve a ordem anterior e não é usado
por esta apresentação. Foi preservado para a frente de lógica; alterações
futuras devem considerar a jornada acima, sem reintroduzir cadastro obrigatório
após a primeira partida.

Duração média ainda não medida com jogadores reais. Corrida e Blocos não têm
limite de tempo; Cruzadas termina ao completar a grade. O Sudoku 9×9 informa
estimativas de 5–10 min, 10–15 min e 15 min ou mais conforme o nível. O modo
Rápido 6×6 continua pendente da frente de inteligência dos jogos.

## Perfis e mensagens

| Perfil | Regra | Mensagem |
| --- | --- | --- |
| integral | roda por app, atividade principal | Carro como ferramenta de trabalho, assistência 24h na jornada |
| complementar | roda por app, renda complementar | Proteção que considera uso pessoal e por app |
| proprietario | não roda por app | Proteção do elétrico, assistência 24h, cobertura nacional |

Mensagens em `core/lead.js#MENSAGENS`. Alterações de texto passam pela Hemissul.

## Jogos

| Jogo | Fase da proposta | Pontuação |
| --- | --- | --- |
| Corrida | V1 | metros percorridos |
| Blocos | V1 | 100/300/500/800 por 1-4 linhas + 1 por descida |
| Sudoku | V1 | base por nível (1000/1500/2000) menos 2/s e 50/erro, mínimo 100 |
| Cruzadas | V2 | 2000 menos 2/s e 100/dica, mínimo 100 |

## Métricas (ver docs/EVENTOS.md)

Leads por posto por semana, taxa de cadastro por visitante (o convite agora precede a partida), partidas por visita, taxa de retorno, perfil do público, cliques em
cotação/WhatsApp, fechamentos (informado pelo comercial no Power CRM).

## Pendências com a Hemissul

- Lista real de postos e ids para os QR Codes.
- Webhook do Power CRM (ou n8n/Make intermediário) para `LEAD_WEBHOOK_URL`.
- Confirmar a oferta de proteção para motorista de aplicativo.
- Aprovar pistas das palavras cruzadas e falas do personagem.
- Subdomínio (ex.: `pitstop.hemissul.com.br`) apontado para a Vercel.
