const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'stratagems.js');
const logosDir = path.join(__dirname, '..', 'public', 'stratagems logo');

const raw = fs.readFileSync(dataPath, 'utf8');
const match = raw.match(/const stratagemSections = (.*);\n\nconst flattenStratagems/s);
if (!match) throw new Error('Unable to locate stratagemSections');

const sections = JSON.parse(match[1]);
const files = fs.readdirSync(logosDir).filter((f) => f.toLowerCase().endsWith('.png'));
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
