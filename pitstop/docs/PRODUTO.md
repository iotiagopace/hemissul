# Produto · Pitstop Online Hemissul

Resumo da proposta aprovada pela Metry. Documento de referência para decisões
de produto; a regra executável está em `src/core/lead.js`.

## Objetivo

1. Principal: lead qualificado (nome, WhatsApp, perfil de uso) para o comercial.
2. Secundário: hábito de voltar ao Pitstop a cada recarga (recorde, ranking).

## Jornada

| # | Momento | O que acontece |
| --- | --- | --- |
| 1 | QR Code | Abre `/?posto=<id>`. Sem instalar nada |
| 2 | Primeira partida | Livre, sem cadastro |
| 3 | Fim da 1ª partida | Nome + WhatsApp + aceite para salvar o recorde e entrar no ranking |
| 4 | Logo após o cadastro | "Você roda por aplicativo?" (obrigatória) |
| 5 | Se sim | "Atividade principal ou renda complementar?" (obrigatória) |
| 6 | A partir da 2ª partida | "Sua proteção atual cobre uso por aplicativo?" (opcional, uma vez) |
| 7 | Resposta "Não cobre" ou "Não sei" | Tela de cotação com mensagem por perfil |
| 8 | Sempre | Botão da home "Minha proteção cobre uso por aplicativo?" leva à etapa 6 ou 7 |

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

Leads por posto por semana, taxa de cadastro (cadastros / quem jogou a 1ª
partida), partidas por visita, taxa de retorno, perfil do público, cliques em
cotação/WhatsApp, fechamentos (informado pelo comercial no Power CRM).

## Pendências com a Hemissul

- Lista real de postos e ids para os QR Codes.
- Webhook do Power CRM (ou n8n/Make intermediário) para `LEAD_WEBHOOK_URL`.
- Confirmar a oferta de proteção para motorista de aplicativo.
- Aprovar pistas das palavras cruzadas e falas do personagem.
- Subdomínio (ex.: `pitstop.hemissul.com.br`) apontado para a Vercel.
