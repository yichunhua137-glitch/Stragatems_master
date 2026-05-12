const fs = require('fs');
const path = require('path');
const { loadStratagemSections } = require('./lib/stratagem-data');

const logosDir = path.join(__dirname, '..', 'public', 'stratagems logo');
const sections = loadStratagemSections();
const files = fs.readdirSync(logosDir).filter((f) => /\.(png|webp|jpg|jpeg|svg)$/i.test(f));
const fileSet = new Set(files);

const missing = [];
for (const section of sections) {
  for (const item of section.items) {
    if (!item.icon) continue;
    if (!fileSet.has(item.icon)) {
      missing.push({
        name: item.name,
        icon: item.icon,
        section: section.name,
      });
    }
  }
}

console.log(JSON.stringify(missing, null, 2));
