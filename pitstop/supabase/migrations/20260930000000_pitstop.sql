-- Pitstop Hemissul: ranking e (opcional) cópia dos leads.
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

-- Leads (usado só com LEAD_SUPABASE=1) ------------------------------------
create table if not exists public.pitstop_leads (
  id uuid primary key,
  revisao bigint not null,
  posto text not null,
  nome text not null,
  telefone text not null check (telefone ~ '^[0-9]{10,11}$'),
  roda_por_aplicativo boolean,
  atividade text,
  protecao_cobre_app text,
  jogos text[] not null default '{}',
  partidas integer not null default 0,
  visitas integer not null default 1,
  aceite_lgpd boolean not null check (aceite_lgpd),
  criado_em timestamptz,
  atualizado_em timestamptz not null default now()
);
create index if not exists pitstop_leads_telefone on public.pitstop_leads (telefone);
alter table public.pitstop_leads enable row level security;

-- Grava ou atualiza o lead. Uma revisão mais antiga que a salva é ignorada,
-- então reenvios e envios fora de ordem não desfazem respostas mais novas.
create or replace function public.pitstop_upsert_lead(p jsonb)
returns void
language sql
security invoker
set search_path = public
as $$
  insert into public.pitstop_leads as l (
    id, revisao, posto, nome, telefone, roda_por_aplicativo, atividade,
    protecao_cobre_app, jogos, partidas, visitas, aceite_lgpd, criado_em
  ) values (
    (p->>'id')::uuid,
    (p->>'revisao')::bigint,
    p->>'posto',
    p->>'nome',
    p->>'telefone',
    (p->>'roda_por_aplicativo')::boolean,
    p->>'atividade',
    p->>'protecao_cobre_app',
    coalesce(array(select jsonb_array_elements_text(p->'jogos')), '{}'),
    coalesce((p->>'partidas')::integer, 0),
    coalesce((p->>'visitas')::integer, 1),
    (p->>'aceite_lgpd')::boolean,
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
