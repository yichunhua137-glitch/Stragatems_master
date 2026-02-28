const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'stratagems.js');
const logosDir = path.join(__dirname, '..', 'public', 'stratagems logo');

const raw = fs.readFileSync(dataPath, 'utf8');
const match = raw.match(/const stratagemSections = (.*);\n\nconst flattenStratagems/s);
if (!match) {
  throw new Error('Unable to locate stratagemSections');
}

const sections = JSON.parse(match[1]);

const normalizeStrict = (name) => name
  .replace(/\.(png|webp|jpg|jpeg|svg|gif|bmp|tiff)$/i, '')
  .replace(/^\d+px[-_]?/i, '')
  .replace(/[^a-z0-9]+/gi, '')
  .trim();

const files = fs.readdirSync(logosDir)
  .filter((f) => f.toLowerCase().endsWith('.png'));

const indexLower = new Map();
for (const file of files) {
  const key = normalizeStrict(file).toLowerCase();
  if (!indexLower.has(key)) {
    indexLower.set(key, file);
  }
}

let updated = 0;
let missing = 0;

for (const section of sections) {
  for (const item of section.items) {
    if (!item.icon) continue;
    const key = normalizeStrict(item.icon).toLowerCase();
    const mapped = indexLower.get(key);
    if (mapped) {
      if (item.icon !== mapped) {
        item.icon = mapped;
        updated += 1;
      }
    } else {
      missing += 1;
    }
  }
}

const output = `const stratagemSections = ${JSON.stringify(sections, null, 2)};\n\nconst flattenStratagems = (sections) =>\n  sections.flatMap((section) =>\n    section.items.map((item) => ({\n      ...item,\n      section: section.name,\n    }))\n  );\n\nexport { stratagemSections, flattenStratagems };\n`;

fs.writeFileSync(dataPath, output, 'utf8');

console.log(`Updated icons: ${updated}, missing: ${missing}`);
