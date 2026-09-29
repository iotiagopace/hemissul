# Backend

Duas Vercel Functions em `api/` (`lead.js` e `ranking.js`), com validação
compartilhada em `src/core/validation.js`. O app funciona sem elas: cadastro e
partidas esperam numa fila local até o servidor confirmar.

## Publicação

O Pitstop é publicado dentro do projeto Vercel `hemissul` (raiz
`hemissul-site`). A Vercel só publica funções que estão em `hemissul-site/api/`,
então há rotas finas que reaproveitam o código daqui:

| Arquivo | Rota publicada | Chamado pelo app como |
| --- | --- | --- |
| `hemissul-site/api/pitstop/lead.js` | `/api/pitstop/lead` | `/pitstop/api/lead` |
| `hemissul-site/api/pitstop/ranking.js` | `/api/pitstop/ranking` | `/pitstop/api/ranking` |
| `hemissul-site/api/pitstop/[...rota].js` | qualquer outra `/api/pitstop/*` | 404 em JSON |

`hemissul-site/vercel.json` reescreve `/pitstop/api/*` para `/api/pitstop/*` e
deixa `/api/*` fora do fallback para o `index.html`: rota de API ausente
responde 404, nunca o HTML do site com status 200.

As rotas finas importam arquivos de fora da raiz (`../../../pitstop/...`). Isso
depende da opção da Vercel "Include files outside of the Root Directory in the
Build Step", que já é usada pelo build do Pitstop (ativa por padrão).

## Contrato

Toda resposta é JSON (`Content-Type: application/json`, `Cache-Control:
no-store`, exceto o GET do ranking).

```
sucesso  { "ok": true, ... }
erro     { "ok": false, "error": "<código>", "retryable": <bool>, "campo"?: "<campo>", "mensagem"?: "<texto>" }
```

| Status | `error` | `retryable` | Significado | O app faz |
| --- | --- | --- | --- | --- |
| 200 | – | – | Recebido e confirmado por todos os destinos | Tira da fila |
| 400 | `invalido`, `json_invalido` | false | Pedido inválido; `campo` indica o problema | Move para `envios-recusados` |
| 405 / 413 / 415 | `metodo` / `grande_demais` / `content_type` | false | Método, tamanho ou tipo errado | Move para `envios-recusados` |
| 429 | `limite` | true | Muitas partidas do mesmo jogador | Tenta de novo depois |
| 502 | `destino_recusou` | true | CRM ou banco recusou (configuração) | Tenta de novo depois |
| 503 | `nao_configurado` | true | Nenhum destino configurado | Tenta de novo depois |
| 503 | `indisponivel` | true | Timeout, erro 5xx ou rede do destino | Tenta de novo depois |

Qualquer resposta que não seja JSON com `ok: true` (HTML, 404 de proxy, 200 sem
corpo) **não** conta como sucesso: o item continua na fila.

### POST /pitstop/api/lead

Corpo (campos fora desta lista são descartados):

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | uuid | Gerado no cadastro; identifica o lead para sempre |
| `revisao` | inteiro | Cresce a cada envio (timestamp em ms) |
| `nome` | texto | 2 a 80 caracteres, com letra |
| `telefone` | texto | Celular com 11 dígitos (DDD + 9) ou fixo com 10 (DDD + 2 a 5). Aceita máscara e +55; é salvo só com dígitos |
| `aceite` | `true` | Obrigatório (LGPD) |
| `app` | boolean ou null | Roda por aplicativo |
| `atividade` | `Atividade principal`, `Renda complementar` ou null | Só vale com `app: true` |
| `protecao` | `Sim, cobre`, `Não cobre`, `Não sei` ou null | `pulou` vira null |
| `posto` | texto `[A-Za-z0-9-]{1,40}` | Padrão `sem-posto` |
| `criadoEm` | data ISO | Data do cadastro |
| `partidas`, `visitas` | inteiros ≥ 0 | Engajamento |
| `jogos` | lista de ids de jogo | Jogos com recorde |

Resposta 200: `{ "ok": true, "id", "revisao", "destinos": ["supabase", "crm"] }`.

**Cadastro e atualizações de perfil.** O mesmo `id` é enviado de novo a cada
resposta (perfil, proteção), sempre com o perfil completo e uma `revisao` maior.
Não existe "evento de atualização" separado: o destino deve fazer upsert por
`id` e ignorar revisão menor que a salva. No Supabase isso já acontece
(`pitstop_upsert_lead`). No webhook, o cabeçalho `Idempotency-Key: <id>:<revisao>`
permite descartar repetições exatas; o n8n/CRM deve atualizar pelo `id` (ou
pelo telefone).

**Idempotência.** Repetir o mesmo corpo não duplica: mesmo `id` e mesma
`revisao` geram o mesmo upsert e a mesma `Idempotency-Key`.

**Destinos.** Pelo menos um precisa estar configurado. Com os dois, grava
primeiro no Supabase e depois chama o webhook; só responde 200 se os dois
confirmarem. Se o webhook falhar depois da gravação, o app reenvia e o upsert
no Supabase não duplica.

Payload enviado ao webhook:

```json
{
  "id": "uuid",
  "revisao": 1790000000000,
  "origem": "Pitstop Hemissul",
  "posto": "01",
  "nome": "Nome Sobrenome",
  "telefone": "95900000000",
  "roda_por_aplicativo": true,
  "atividade": "Atividade principal",
  "protecao_cobre_app": "Não sei",
  "jogos": ["corrida"],
  "partidas": 3,
  "visitas": 2,
  "aceite_lgpd": true,
  "criado_em": "2026-10-01T14:02:00.000Z",
  "enviado_em": "2026-10-01T14:05:00.000Z"
}
```

Timeouts: 4 s no Supabase, 5 s no webhook.

### GET /pitstop/api/ranking?posto=01&jogo=corrida

Top 10 do dia no fuso de Boa Vista (UTC-4), por posto e jogo, pela data em que
a partida foi jogada (`jogada_em`). Resposta: `{ "ok": true, "posto", "jogo",
"ranking": [{ "nome", "pontos" }] }`. Cache de 30 s na borda.

### POST /pitstop/api/ranking

| Campo | Regra |
| --- | --- |
| `partidaId` | uuid gerado no aparelho; chave única no banco |
| `leadId` | uuid do lead |
| `nome` | só o primeiro nome é guardado |
| `posto`, `jogo` | como no GET |
| `pontos` | inteiro de 0 ao máximo do jogo (corrida e blocos 100000; sudoku e cruzadas 2000) |
| `duracao` | opcional, segundos. Na corrida, barra mais de 90 m/s |
| `jogadaEm` | data ISO; no máximo 48 h atrás e 5 min à frente |

Resposta 200: `{ "ok": true, "partidaId" }`. Repetir o mesmo `partidaId` responde
200 e não cria outra linha.

**O que o servidor não garante.** A pontuação é calculada no aparelho. O
servidor barra formato errado, valores impossíveis, repetição e excesso de
envios (30 partidas por lead a cada 10 min), mas não prova que a partida
aconteceu. Isso basta enquanto o Pitstop não tiver prêmio. Se um dia tiver,
será preciso validar a partida no servidor (reprodução com semente e entradas).

## Fila no app (`src/core/api.js`)

- `lead-queue`: um item por lead (a versão mais nova substitui a anterior).
  `score-queue`: uma partida por `partidaId`, até 200.
- Sai da fila só com `{ ok: true }`. Erro com `retryable: false` vai para
  `envios-recusados` (até 20 registros), para não sumir sem rastro.
- Novas tentativas ao abrir o app, ao voltar a conexão (`online`), ao voltar
  para a aba e por temporizador, com espera de 5 s dobrando até 10 min.
- Um envio por vez: fila serializada na aba e Web Locks entre abas.
- Cadastro vai antes das partidas.
- Se o localStorage falhar, a fila fica em memória e o retorno traz
  `salvo: false`.
- `sendLead` e `sendScore` devolvem `{ status: 'enviado' | 'na_fila' | 'recusado', salvo }`.
  `queueStatus()` devolve `{ leads, partidas, recusados, salvo }`.

## Variáveis de ambiente

Todas só no servidor (sem prefixo `VITE_`).

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `LEAD_WEBHOOK_URL` | uma das duas opções de destino | Webhook do Power CRM, ou n8n/Make que grava no Power CRM |
| `LEAD_WEBHOOK_TOKEN` | não | Enviado como `Authorization: Bearer` |
| `LEAD_SUPABASE` | uma das duas opções de destino | `1` para gravar os leads no Supabase |
| `SUPABASE_URL` | para ranking e `LEAD_SUPABASE` | URL do projeto |
| `SUPABASE_SERVICE_ROLE_KEY` | para ranking e `LEAD_SUPABASE` | Chave de serviço |

No front, `VITE_LEAD_ENDPOINT` e `VITE_RANKING_ENDPOINT` só mudam o caminho
chamado (padrão do build do site: `/pitstop/api/lead` e `/pitstop/api/ranking`).

## Banco (Supabase)

Migração: `supabase/migrations/20260930000000_pitstop.sql`. Cria:

- `pitstop_partidas`: `partida_id` como chave primária, só o primeiro nome,
  checagens de jogo, posto e pontos, índices para o ranking do dia e para o
  limite por lead.
- `pitstop_leads` (só usada com `LEAD_SUPABASE=1`) e a função
  `pitstop_upsert_lead`, que ignora revisão mais antiga.
- RLS ligado e nenhuma policy pública: só a service role (as funções) acessa.

A tabela do rascunho anterior (`id bigint`, `criado_em`) não chegou a ser
criada; se existir em algum projeto, recrie com a migração.

## Privacidade

- Nome e telefone só trafegam para `api/lead.js` e para os destinos
  configurados. Logs das funções registram destino, status e id do lead, nunca
  nome ou telefone.
- `core/tracking.js` descarta `nome`, `telefone`, `leadId` e qualquer texto com
  cara de telefone antes de enviar ao dataLayer.
- O ranking guarda e mostra só o primeiro nome.
- Definir com a Hemissul o prazo de retenção de `pitstop_leads` antes de ligar
  `LEAD_SUPABASE`.
