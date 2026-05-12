const fs = require('fs');
const path = require('path');
const {
  loadStratagemSections,
  saveStratagemSections,
} = require('./lib/stratagem-data');

const logosDir = path.join(__dirname, '..', 'public', 'stratagems logo');
const sections = loadStratagemSections();

const normalize = (name) => name
  .toLowerCase()
  .replace(/\.(png|webp|jpg|jpeg|svg|gif|bmp|tiff)$/i, '')
  .replace(/^\d+px[-_]?/i, '')
  .replace(/[^a-z0-9]+/g, '')
  .trim();

const files = fs.readdirSync(logosDir)
  .filter((f) => /\.(png|webp|jpg|jpeg|svg)$/i.test(f));

const index = new Map();
for (const file of files) {
  const key = normalize(file);
  if (!index.has(key)) {
    index.set(key, file);
  }
}

let updated = 0;
let missing = 0;

for (const section of sections) {
  for (const item of section.items) {
    if (!item.icon) continue;
    const key = normalize(item.icon);
    const mapped = index.get(key);
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
