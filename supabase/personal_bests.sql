create table if not exists public.stratagem_personal_bests (
  user_id uuid not null references public.profiles(id) on delete cascade,
  stratagem_id bigint not null references public.stratagems(id) on delete cascade,
  best_ms integer not null check (best_ms > 0),
  achieved_at timestamptz not null default now(),
  primary key (user_id, stratagem_id)
);

alter table public.stratagem_personal_bests enable row level security;

create policy "personal bests select own"
on public.stratagem_personal_bests
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "personal bests insert own"
on public.stratagem_personal_bests
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "personal bests update own"
on public.stratagem_personal_bests
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
