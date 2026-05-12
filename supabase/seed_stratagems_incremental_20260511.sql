insert into public.stratagems (
  slug,
  name,
  code,
  section,
  icon,
  is_active
)
values
('td-220-bastion-mk-xvi', 'TD-220 Bastion MK XVI', '["left","down","right","down","left","down","up","down","up"]'::jsonb, 'Hangar', 'Bastion_MK_XVI_Stratagem_Icon.svg', true),
('a-gm-17-gas-mortar-sentry', 'A/GM-17 Gas Mortar Sentry', '["down","up","right","down","left"]'::jsonb, 'Warbonds', 'Gas_Mortar_Sentry_Stratagem_Icon.svg', true),
('b-flam-80-cremator', 'B/FLAM-80 Cremator', '["down","down","right","down","up","up"]'::jsonb, 'Warbonds', 'Cremator_Stratagem_Icon.svg', true),
('cqc-20-breaching-hammer', 'CQC-20 Breaching Hammer', '["down","left","right","left","up"]'::jsonb, 'Warbonds', 'Breaching_Hammer_Stratagem_Icon.svg', true),
('eat-411-leveller', 'EAT-411 Leveller', '["down","down","left","up","down"]'::jsonb, 'Warbonds', 'Leveller_Stratagem_Icon.svg', true),
('exo-51-lumberer-exosuit', 'EXO-51 Lumberer Exosuit', '["left","down","right","up","right","left","up"]'::jsonb, 'Warbonds', 'Lumberer_Exosuit_Stratagem_Icon.svg', true),
('exo-55-breakthrough-exosuit', 'EXO-55 Breakthrough Exosuit', '["left","down","right","left","right","down","up"]'::jsonb, 'Warbonds', 'Breakthrough_Exosuit_Stratagem_Icon.svg', true),
('gl-28-belt-fed-grenade-launcher', 'GL-28 Belt-Fed Grenade Launcher', '["down","left","up","left","up","up"]'::jsonb, 'Warbonds', 'Belt-Fed_Grenade_Launcher_Stratagem_Icon.svg', true),
('mgx-42-bullet-storm', 'MGX-42 Bullet Storm', '["down","left","down","right","up","left"]'::jsonb, 'Warbonds', 'Bullet_Storm_Stratagem_Icon.svg', true),
('call-in-super-destroyer', 'Call In Super Destroyer', '["up","up","down","down","left","right","left","right"]'::jsonb, 'Mission Stratagems', '120px-Call_In_Super_Destroyer_Stratagem_Icon.png', true),
('link-hellpods-to-destroyer', 'Link Hellpods to Destroyer', '["left","right","up","up","up"]'::jsonb, 'Mission Stratagems', 'Start_Upload_Stratagem_Icon.png', true)
on conflict (slug)
do update set
  name = excluded.name,
  code = excluded.code,
  section = excluded.section,
  icon = excluded.icon,
  is_active = excluded.is_active;
