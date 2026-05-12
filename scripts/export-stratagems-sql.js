const fs = require('fs');
const path = require('path');
const {
  flattenStratagems,
  loadStratagemSections,
} = require('./lib/stratagem-data');

const outputFile = path.join(__dirname, '..', 'supabase', 'seed_stratagems.sql');
const stratagemSections = loadStratagemSections();
const rows = flattenStratagems(stratagemSections);

const escapeText = (value) => String(value || '').replace(/'/g, "''");
const escapeJson = (value) =>
  JSON.stringify(value).replace(/'/g, "''");

const statements = rows.map((item) => {
  const slug = escapeText(item.id);
  const name = escapeText(item.name);
  const code = escapeJson(item.code);
  const section = escapeText(item.section);
  const icon = escapeText(item.icon || '');
  return `('${slug}', '${name}', '${code}'::jsonb, '${section}', '${icon}', true)`;
});

const sql = `insert into public.stratagems (
  slug,
  name,
  code,
  section,
  icon,
  is_active
)
values
${statements.join(',\n')}
on conflict (slug)
do update set
  name = excluded.name,
  code = excluded.code,
  section = excluded.section,
  icon = excluded.icon,
  is_active = excluded.is_active;
`;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, sql);

console.log(`Wrote ${rows.length} stratagem rows to ${outputFile}`);
