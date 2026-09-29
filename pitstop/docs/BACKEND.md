# Backend

Duas Vercel Functions em `api/`. O front funciona sem elas (fila local de leads
e recorde local), então dá para publicar a interface antes do backend.

## api/lead.js

Recebe o lead e repassa ao CRM.

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `LEAD_WEBHOOK_URL` | sim, em produção | Webhook de entrada no Power CRM, ou n8n/Make que grava no Power CRM |
| `LEAD_WEBHOOK_TOKEN` | não | Enviado como `Authorization: Bearer` |

Payload enviado ao webhook:

```json
{
  "id": "uuid",
  "origem": "Pitstop Hemissul",
  "posto": "01",
  "nome": "Carlos Souza",
  "telefone": "95991112222",
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

O mesmo `id` é reenviado a cada resposta nova (perfil, proteção). O CRM ou o
n8n deve fazer upsert por `id` (ou por telefone).

## api/ranking.js (Supabase)

| Variável | Descrição |
| --- | --- |
| `SUPABASE_URL` | URL do projeto |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço (só servidor) |

Tabela:

```sql
create table public.pitstop_partidas (
  id bigint generated always as identity primary key,
  lead_id uuid,
  nome text not null,
  posto text not null,
  jogo text not null check (jogo in ('corrida','blocos','sudoku','cruzadas')),
  pontos integer not null check (pontos >= 0 and pontos <= 100000),
  criado_em timestamptz not null default now()
);
create index on public.pitstop_partidas (posto, jogo, criado_em desc, pontos desc);
alter table public.pitstop_partidas enable row level security;
-- Sem policies públicas: só a função (service role) lê e grava.
```

O ranking mostra só o primeiro nome. Ele é "do dia" no fuso de Boa Vista (UTC-4).

## Antifraude (próximos passos)

A pontuação é calculada no navegador. Para um ranking com premiação isso não
bastaria, mas o Pitstop não tem prêmio. Se um dia tiver, mover a validação da
partida para o servidor (replay de entradas com semente).
