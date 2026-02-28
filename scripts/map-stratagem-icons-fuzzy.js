const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'stratagems.js');
const logosDir = path.join(__dirname, '..', 'public', 'stratagems logo');

const raw = fs.readFileSync(dataPath, 'utf8');
const match = raw.match(/const stratagemSections = (.*);\n\nconst flattenStratagems/s);
if (!match) throw new Error('Unable to locate stratagemSections');

const sections = JSON.parse(match[1]);

const files = fs.readdirSync(logosDir)
  .filter((f) => f.toLowerCase().endsWith('.png'));

const normalize = (s) => s
  .toLowerCase()
  .replace(/\.(png|webp|jpg|jpeg|svg|gif|bmp|tiff)$/i, '')
  .replace(/^\d+px[-_]?/i, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const tokenSet = (s) => new Set(normalize(s).split(/\s+/).filter(Boolean));

const fileTokens = files.map((f) => ({
  file: f,
  tokens: tokenSet(f),
  norm: normalize(f),
}));

const scoreMatch = (itemTokens, file) => {
  let score = 0;
  for (const t of itemTokens) {
    if (file.tokens.has(t)) score += 2;
    else if (file.norm.includes(t)) score += 1;
  }
  return score;
};

let updated = 0;
let missing = 0;
let fuzzy = 0;

for (const section of sections) {
  for (const item of section.items) {
    if (!item.icon) continue;
    const originalIcon = item.icon;
    const exact = files.find((f) => f === originalIcon);
    if (exact) continue;

    const itemTokens = tokenSet(item.icon + ' ' + item.name);
    if (itemTokens.size === 0) { missing += 1; continue; }

    let best = null;
    let bestScore = 0;

    for (const f of fileTokens) {
      const score = scoreMatch(itemTokens, f);
      if (score > bestScore) {
        bestScore = score;
        best = f.file;
      }
    }

    const minScore = Math.max(3, Math.floor(itemTokens.size * 1.2));
    if (best && bestScore >= minScore) {
      item.icon = best;
      updated += 1;
      fuzzy += 1;
    } else {
      missing += 1;
    }
  }
}

const output = `const stratagemSections = ${JSON.stringify(sections, null, 2)};\n\nconst flattenStratagems = (sections) =>\n  sections.flatMap((section) =>\n    section.items.map((item) => ({\n      ...item,\n      section: section.name,\n    }))\n  );\n\nexport { stratagemSections, flattenStratagems };\n`;

fs.writeFileSync(dataPath, output, 'utf8');
console.log(`Updated icons: ${updated} (fuzzy: ${fuzzy}), missing: ${missing}`);
