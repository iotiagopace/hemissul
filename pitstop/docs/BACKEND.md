# Backend

Três Vercel Functions em `api/`: `lead.js` (cadastro), `ranking.js`
(pontuações) e `admin/leads.js` (consulta e exportação pelo time da Hemissul).
A validação é compartilhada com o app em `src/core/validation.js`.

**O Pitstop guarda o lead no próprio banco (Supabase) e não envia nada a CRM,
PowerCRM, n8n, Make ou outra ferramenta comercial.** O time da Hemissul
consulta e exporta os leads pelo acesso restrito e faz a integração com o
sistema deles depois. Variáveis antigas de webhook (`LEAD_WEBHOOK_URL`,
`LEAD_WEBHOOK_TOKEN`, `LEAD_SUPABASE`) não são lidas pelo código.

O app funciona sem backend: cadastro e partidas esperam numa fila no aparelho
até o servidor confirmar.

## Publicação

O Pitstop é publicado dentro do projeto Vercel `hemissul` (raiz
`hemissul-site`). A Vercel só publica funções que estão em `hemissul-site/api/`,
então há rotas finas que reaproveitam o código daqui:

| Arquivo | Rota publicada | Chamado como |
| --- | --- | --- |
| `hemissul-site/api/pitstop/lead.js` | `/api/pitstop/lead` | `/pitstop/api/lead` |
| `hemissul-site/api/pitstop/ranking.js` | `/api/pitstop/ranking` | `/pitstop/api/ranking` |
| `hemissul-site/api/pitstop/admin/leads.js` | `/api/pitstop/admin/leads` | `/pitstop/api/admin/leads` |
| `hemissul-site/api/pitstop/[...rota].js` | qualquer outra `/api/pitstop/*` | 404 em JSON |

`hemissul-site/vercel.json` reescreve `/pitstop/api/*` para `/api/pitstop/*` e
deixa `/api/*` fora do fallback para o `index.html`: rota de API ausente
responde 404, nunca o HTML do site com status 200.

As rotas finas importam arquivos de fora da raiz (`../../../pitstop/...`), o
que depende da opção da Vercel "Include files outside of the Root Directory in
the Build Step" (ativa; o build do Pitstop já depende dela).

## Contrato

Toda resposta é JSON (`Content-Type: application/json`, `Cache-Control:
no-store`), exceto o GET do ranking (cache de 30 s) e a exportação CSV.

```
sucesso  { "ok": true, ... }
erro     { "ok": false, "error": "<código>", "retryable": <bool>, "campo"?: "<campo>", "mensagem"?: "<texto>" }
```

Mensagens de erro nunca repetem nome ou telefone recebidos.

| Status | `error` | `retryable` | Significado | O app faz |
| --- | --- | --- | --- | --- |
| 200 | – | – | Gravado e confirmado pelo banco | Tira da fila |
| 400 | `invalido`, `json_invalido` | false | Pedido inválido; `campo` indica o problema | Registra como recusado |
| 405 / 413 / 415 | `metodo` / `grande_demais` / `content_type` | false | Método, tamanho ou tipo errado | Registra como recusado |
| 429 | `limite` | true | Muitas partidas do mesmo jogador | Tenta de novo depois |
| 502 | `destino_recusou` | true | Banco recusou (configuração ou esquema) | Tenta de novo depois |
| 503 | `nao_configurado` | true | Banco não configurado | Tenta de novo depois |
| 503 | `indisponivel` | true | Timeout, erro 5xx ou rede do banco | Tenta de novo depois |

Qualquer resposta que não seja JSON com `ok: true` (HTML, 404 de proxy, 200 sem
corpo) **não** conta como sucesso: o item continua na fila.

### POST /pitstop/api/lead

Grava o lead em `pitstop_leads` pela função `pitstop_upsert_lead` (timeout de
5 s). Só responde 200 depois que o banco confirma.

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
| `propostaSolicitadaEm` | data ISO ou ausente | **Só** quando a pessoa toca na ação explícita de pedir proposta (ver abaixo) |
| `posto` | texto `[A-Za-z0-9-]{1,40}` | Padrão `sem-posto` |
| `criadoEm` | data ISO | Data do cadastro (também registrada como data do aceite) |
| `partidas`, `visitas` | inteiros ≥ 0 | Engajamento |
| `jogos` | lista de ids de jogo | Jogos com recorde |

Resposta 200: `{ "ok": true, "id", "revisao" }`.

**Cadastro e atualizações de perfil.** O mesmo `id` é enviado de novo a cada
resposta (perfil, proteção), sempre com o perfil completo e uma `revisao` maior.
O banco atualiza a mesma linha e ignora revisão menor que a salva, então
reenvios e envios fora de ordem não desfazem respostas mais novas. `aceite_em`,
`recebido_em`, `criado_em` e `proposta_solicitada_em` nunca são apagados por
uma atualização.

**Idempotência.** Repetir o mesmo corpo não duplica: mesmo `id` e mesma
`revisao` geram o mesmo upsert.

**Interesse em proposta.** Cadastro, fim de partida ou tela de cotação aberta
**não** indicam interesse. O banco só registra `proposta_solicitada_em` quando
o app envia `propostaSolicitadaEm` junto com o lead, no momento em que a pessoa
toca no botão de pedir proposta. A primeira data fica registrada. Hoje o
frontend ainda não envia esse campo (ver "Pedidos ao frontend").

### GET /pitstop/api/ranking?posto=01&jogo=corrida

Top 10 do dia no fuso de Boa Vista (UTC-4), por posto e jogo, pela data em que
a partida foi jogada (`jogada_em`). Resposta: `{ "ok": true, "posto", "jogo",
"ranking": [{ "nome", "pontos" }] }`. Só o primeiro nome; nunca telefone.

### POST /pitstop/api/ranking

| Campo | Regra |
| --- | --- |
| `partidaId` | uuid gerado no aparelho; chave única no banco |
| `leadId` | uuid do lead |
| `nome` | só o primeiro nome é guardado |
| `posto`, `jogo` | como no GET |
| `pontos` | inteiro de 0 ao máximo do jogo (corrida e blocos 100000; sudoku e cruzadas 2000) |
| `duracao` | segundos inteiros, descontadas as pausas (o frontend já envia). Na corrida, barra mais de 90 m/s |
| `jogadaEm` | data ISO; no máximo 48 h atrás e 5 min à frente |

Resposta 200: `{ "ok": true, "partidaId" }`. Repetir o mesmo `partidaId` responde
200 e não cria outra linha. As partidas ficam em `pitstop_partidas`, separadas
dos dados privados do lead (sem telefone).

**O que o servidor não garante.** A pontuação é calculada no aparelho. O
servidor barra formato errado, valores impossíveis, repetição e excesso de
envios (30 partidas por lead a cada 10 min), mas não prova que a partida
aconteceu. Isso basta enquanto o Pitstop não tiver prêmio.

## Acesso do time (consulta e exportação)

`GET /pitstop/api/admin/leads`. Fechada por padrão.

**Autenticação (proposta, aguardando aprovação).** Não havia autenticação
administrativa no projeto. A solução mínima proposta usa o Supabase Auth do
mesmo projeto do banco:

1. A Hemissul define quem pode acessar. Cada pessoa é convidada no painel do
   Supabase (Authentication > Users > Invite) e o e-mail entra em
   `PITSTOP_ADMIN_EMAILS`.
2. A pessoa entra numa página restrita (a construir pela frente de frontend,
   ex.: `/pitstop/admin`) com e-mail e código enviado pelo Supabase. A página
   usa só a chave pública (anon) no navegador.
3. A página chama esta rota com `Authorization: Bearer <token da sessão>`. A
   função confirma o token no Supabase (`/auth/v1/user`), exige e-mail
   confirmado e presente em `PITSTOP_ADMIN_EMAILS`, e só então lê o banco com a
   chave de serviço (que nunca vai ao navegador).

Regras:

- Sem `PITSTOP_ADMIN_EMAILS`: ninguém acessa (403 `acesso_nao_configurado`).
- Sem token: 401 `nao_autenticado`. Token inválido ou e-mail não confirmado:
  401 `sessao_invalida`. E-mail fora da lista: 403 `sem_permissao`.
- Token só no cabeçalho. Parâmetros como `?token=` são ignorados.
- Respostas com `Cache-Control: no-store, private` e `X-Robots-Tag: noindex`.
- Log registra o id do usuário do Supabase e a quantidade de linhas, nunca
  nome, telefone ou e-mail.

**Parâmetros**

| Parâmetro | Valores |
| --- | --- |
| `de`, `ate` | `AAAA-MM-DD`, dias de Boa Vista (UTC-4), inclusivos. Filtram `recebido_em` (primeira gravação no servidor) |
| `posto` | id do posto |
| `perfil` | `integral` (app, atividade principal), `complementar` (app, renda complementar), `proprietario` (não roda por app), `sem_perfil` (não respondeu) |
| `pagina`, `por_pagina` | a partir de 1; `por_pagina` de 1 a 100 (padrão 50) |
| `formato` | `json` (padrão) ou `csv` |

**JSON**: `{ ok, fuso, pagina, por_pagina, total, leads: [...] }`. Cada lead traz
as colunas de `pitstop_leads` (datas em ISO/UTC) e `perfil`.

**CSV**: `pitstop-leads-AAAAMMDD.csv`, UTF-8 com BOM (Excel abre os acentos),
separador `;` (padrão do Excel em português), todas as células entre aspas,
linhas `CRLF`. Cabeçalhos em português, datas `AAAA-MM-DD HH:MM:SS` no
horário de Boa Vista (UTC-4, sem horário de verão), WhatsApp formatado.
Células que começam com `=`, `+`, `-`, `@`, tabulação ou retorno recebem `'`
na frente para não virarem fórmula. Limite de 50 000 linhas por exportação
(acima disso, 422 `muitos_resultados`: reduza o período).

## Fila no app (`src/core/api.js`)

- `lead-queue`: um item por lead (a versão mais nova substitui a anterior).
  `score-queue`: uma partida por `partidaId`, até 200.
- Sai da fila só com `{ ok: true }`. Erro com `retryable: false` vai para
  `envios-recusados` (até 20 registros), para não sumir sem rastro.
- Novas tentativas ao abrir o app, ao voltar a conexão (`online`), ao voltar
  para a aba e por temporizador, com espera de 5 s dobrando até 10 min.
- Um envio por vez: fila serializada na aba e Web Locks entre abas.
- Cadastro vai antes das partidas.
- Se o localStorage falhar, filas e recusas ficam em memória e o retorno traz
  `salvo: false`.

Contrato (inalterado):

- `sendLead(lead, extra)` e `sendScore({ ..., duracao })` devolvem
  `{ status: 'enviado' | 'na_fila' | 'recusado', salvo }` (`sendScore` também
  traz `partidaId`; recusa pode trazer `campo`).
- `queueStatus()` devolve `{ leads, partidas, recusados, salvo }`.

O resultado é calculado para a **versão exata** enviada (`id` + `revisao`),
com o registro em memória da sessão como fonte principal. Assim, uma recusa de
uma versão antiga do mesmo lead não transforma um envio novo em "recusado", e
uma recusa com o localStorage bloqueado não vira "enviado".

**Novo (opcional): `subscribeQueue(fn)`.** Chama `fn` a cada envio confirmado,
recusado ou adiado, com `queueStatus()` mais
`evento: { tipo: 'lead' | 'partida', id, versao, status, campo? }`. Devolve a
função que cancela a inscrição. Serve para a interface atualizar o status sem
ler o localStorage nem depender só das contagens.

## Variáveis de ambiente

Todas só no servidor (sem prefixo `VITE_`), no projeto Vercel `hemissul`.

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `SUPABASE_URL` | sim | URL do projeto Supabase do Pitstop |
| `SUPABASE_SERVICE_ROLE_KEY` | sim | Chave de serviço (grava leads e partidas, lê para o time) |
| `SUPABASE_ANON_KEY` | para o acesso do time | Chave pública usada para validar a sessão (a página de acesso também usa) |
| `PITSTOP_ADMIN_EMAILS` | para o acesso do time | E-mails autorizados, separados por vírgula |

Nenhuma dessas variáveis é lida pelo site institucional.

## Banco (Supabase)

Migração: `supabase/migrations/20260930000000_pitstop.sql` (ainda não aplicada
em nenhum banco). Cria:

- `pitstop_leads`: id estável, revisão, origem, posto, nome, telefone só com
  dígitos, perfil, resposta de proteção, `proposta_solicitada_em`, aceite e
  `aceite_em`, `criado_em`, `recebido_em`, `atualizado_em`. Checagens de
  formato no próprio banco.
- `pitstop_upsert_lead(p jsonb)`: grava ou atualiza pelo `id`, ignora revisão
  mais antiga e nunca apaga datas de aceite, recebimento e pedido de proposta.
  Execução só pela service role.
- `pitstop_partidas`: `partida_id` como chave primária, só o primeiro nome.
- RLS ligado e nenhuma policy pública nas duas tabelas.

Validada localmente num Postgres descartável (PGlite): envio repetido não
duplica, revisão fora de ordem é ignorada, telefone inválido e aceite falso são
barrados, `partida_id` repetido não duplica.

## Privacidade

- Nome e telefone só trafegam para `api/lead.js` e para o banco. Não aparecem
  em dataLayer, logs, URLs, mensagens de erro nem no ranking público.
- Consulta e exportação só com sessão autorizada, sem token na URL.
- `core/tracking.js` descarta `nome`, `telefone`, `leadId` e qualquer texto com
  cara de telefone antes de enviar ao dataLayer.
- **A definir com a Hemissul:** quem recebe acesso e o prazo de retenção dos
  leads. Nenhum dos dois foi decidido; não há exclusão automática.
