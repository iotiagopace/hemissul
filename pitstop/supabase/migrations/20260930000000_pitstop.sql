-- Pitstop Hemissul: ranking e leads.
-- Ainda não aplicada em nenhum banco (revisada no lugar em 2026-10-01).
-- Rodar no SQL Editor do projeto Supabase escolhido pela Hemissul/Metry.
-- As tabelas não têm policies públicas: só as Vercel Functions (service role)
-- leem e gravam. O navegador nunca fala direto com o Supabase.

-- Ranking -----------------------------------------------------------------
create table if not exists public.pitstop_partidas (
  partida_id uuid primary key,            -- gerado no aparelho; repetir o envio não duplica
  lead_id uuid not null,
  nome text not null check (char_length(nome) between 1 and 30),  -- só o primeiro nome
  posto text not null check (posto ~ '^[A-Za-z0-9-]{1,40}$'),
  jogo text not null check (jogo in ('corrida','blocos','sudoku','cruzadas')),
  pontos integer not null check (pontos between 0 and 100000),
  duracao integer check (duracao between 1 and 86400),
  jogada_em timestamptz not null,          -- quando a partida terminou (define o dia do ranking)
  recebido_em timestamptz not null default now()
);
create index if not exists pitstop_partidas_ranking on public.pitstop_partidas (posto, jogo, jogada_em desc, pontos desc);
create index if not exists pitstop_partidas_lead on public.pitstop_partidas (lead_id, recebido_em desc);
alter table public.pitstop_partidas enable row level security;

-- Leads ---------------------------------------------------------------------
-- Fonte oficial dos leads do Pitstop. O time da Hemissul consulta e exporta
-- pela função restrita api/admin/leads.js; não há envio a CRM.
create table if not exists public.pitstop_leads (
  id uuid primary key,                     -- gerado no cadastro, estável
  revisao bigint not null,                 -- cresce a cada envio do aparelho
  origem text not null default 'pitstop',
  posto text not null check (posto ~ '^[A-Za-z0-9-]{1,40}$'),
  nome text not null check (char_length(nome) between 2 and 80),
  telefone text not null check (telefone ~ '^[0-9]{10,11}$'),  -- DDD + número, só dígitos
  roda_por_aplicativo boolean,
  atividade text check (atividade in ('Atividade principal', 'Renda complementar')),
  protecao_cobre_app text check (protecao_cobre_app in ('Sim, cobre', 'Não cobre', 'Não sei')),
  proposta_solicitada_em timestamptz,      -- só com ação explícita da interface; nunca volta a null
  jogos text[] not null default '{}',
  partidas integer not null default 0,
  visitas integer not null default 1,
  aceite_lgpd boolean not null check (aceite_lgpd),
  aceite_em timestamptz not null,          -- momento do aceite (cadastro); não muda depois
  criado_em timestamptz,                   -- data do cadastro informada pelo aparelho
  recebido_em timestamptz not null default now(),   -- primeira gravação no servidor
  atualizado_em timestamptz not null default now()
);
create index if not exists pitstop_leads_recebido on public.pitstop_leads (recebido_em desc);
create index if not exists pitstop_leads_posto on public.pitstop_leads (posto, recebido_em desc);
create index if not exists pitstop_leads_telefone on public.pitstop_leads (telefone);
alter table public.pitstop_leads enable row level security;

-- Grava ou atualiza o lead. Uma revisão mais antiga que a salva é ignorada,
-- então reenvios e envios fora de ordem não desfazem respostas mais novas.
-- Datas de aceite, recebimento e pedido de proposta nunca são apagadas.
create or replace function public.pitstop_upsert_lead(p jsonb)
returns void
language sql
security invoker
set search_path = public
as $$
  insert into public.pitstop_leads as l (
    id, revisao, origem, posto, nome, telefone, roda_por_aplicativo, atividade,
    protecao_cobre_app, proposta_solicitada_em, jogos, partidas, visitas,
    aceite_lgpd, aceite_em, criado_em
  ) values (
    (p->>'id')::uuid,
    (p->>'revisao')::bigint,
    coalesce(p->>'origem', 'pitstop'),
    p->>'posto',
    p->>'nome',
    p->>'telefone',
    (p->>'roda_por_aplicativo')::boolean,
    p->>'atividade',
    p->>'protecao_cobre_app',
    (p->>'proposta_solicitada_em')::timestamptz,
    coalesce(array(select jsonb_array_elements_text(p->'jogos')), '{}'),
    coalesce((p->>'partidas')::integer, 0),
    coalesce((p->>'visitas')::integer, 1),
    (p->>'aceite_lgpd')::boolean,
    coalesce((p->>'criado_em')::timestamptz, now()),
    (p->>'criado_em')::timestamptz
  )
  on conflict (id) do update set
    revisao = excluded.revisao,
    posto = excluded.posto,
    nome = excluded.nome,
    telefone = excluded.telefone,
    roda_por_aplicativo = excluded.roda_por_aplicativo,
    atividade = excluded.atividade,
    protecao_cobre_app = excluded.protecao_cobre_app,
    proposta_solicitada_em = coalesce(l.proposta_solicitada_em, excluded.proposta_solicitada_em),
    jogos = excluded.jogos,
    partidas = excluded.partidas,
    visitas = excluded.visitas,
    aceite_lgpd = excluded.aceite_lgpd,
    criado_em = coalesce(l.criado_em, excluded.criado_em),
    atualizado_em = now()
  where excluded.revisao >= l.revisao;
$$;
revoke all on function public.pitstop_upsert_lead(jsonb) from public, anon, authenticated;
grant execute on function public.pitstop_upsert_lead(jsonb) to service_role;
