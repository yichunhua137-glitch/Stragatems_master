const fs = require('fs');
const path = require('path');
const {
  loadStratagemSections,
  saveStratagemSections,
} = require('./lib/stratagem-data');

const logosDir = path.join(__dirname, '..', 'public', 'stratagems logo');
const sections = loadStratagemSections();

const normalizeStrict = (name) => name
  .replace(/\.(png|webp|jpg|jpeg|svg|gif|bmp|tiff)$/i, '')
  .replace(/^\d+px[-_]?/i, '')
  .replace(/[^a-z0-9]+/gi, '')
  .trim();

const files = fs.readdirSync(logosDir)
  .filter((f) => /\.(png|webp|jpg|jpeg|svg)$/i.test(f));

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

saveStratagemSections(sections);

console.log(`Updated icons: ${updated}, missing: ${missing}`);
