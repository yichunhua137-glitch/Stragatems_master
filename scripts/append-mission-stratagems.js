const fs = require('fs');
const path = require('path');

const txtPath = path.join(__dirname, '..', 'src', 'stratagems.txt');
const dataPath = path.join(__dirname, '..', 'src', 'stratagems.js');

const rawTxt = fs.readFileSync(txtPath, 'utf8');
const lines = rawTxt.split(/\r?\n/);

const parseCode = (text) => {
  const match = text.match(/\{\{Stratagem[_ ]code\|([^}]+)\}\}/i) ||
    text.match(/\{\{Stratagem[_ ]Code\|([^}]+)\}\}/i) ||
    text.match(/\{\{Stratagem code\|([^}]+)\}\}/i) ||
    text.match(/\{\{Stratagem Code\|([^}]+)\}\}/i);
  if (!match) return [];
  return match[1]
    .split('|')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => ['up', 'down', 'left', 'right'].includes(s));
};

const stripMarkup = (text) => {
  let t = text;
  t = t.replace(/<small>/gi, '');
  t = t.replace(/<\/small>/gi, '');
  t = t.replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, '$1');
  t = t.replace(/\{\{[^}]+\}\}/g, '');
  t = t.replace(/\s+/g, ' ');
  return t.trim();
};

const parseIcon = (text) => {
  const match = text.match(/\[\[File:([^\]|]+)(?:\|[^\]]*)?\]\]/i);
  return match ? match[1].trim() : '';
};

const parseName = (text) => {
  const match = text.match(/\[\[(?:[^\]|]+\|)?([^\]]+)\]\]/);
  return match ? match[1].trim() : stripMarkup(text);
};

const makeId = (name) => name
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

let inMission = false;
let type = null;
const items = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.includes('Mission Stratagems')) {
    inMission = true;
    continue;
  }
  if (!inMission) continue;

  if (line.startsWith('! rowspan=')) {
    type = stripMarkup(line.split('|').slice(-1)[0].trim());
    continue;
  }
  if (line.startsWith('|-')) {
    continue;
  }
  if (line.startsWith('|')) {
    const cells = [];
    let j = i;
    while (j < lines.length) {
      const cl = lines[j].trim();
      if (cl.startsWith('|-') || cl.startsWith('! rowspan=')) break;
      if (cl.startsWith('|')) cells.push(cl.slice(1).trim());
      j += 1;
    }
    i = j - 1;
    if (cells.length < 4) continue;

    const icon = parseIcon(cells[0]);
    const name = parseName(cells[1]);
    const code = parseCode(cells[2]);
    const description = stripMarkup(cells[3] || '');

    items.push({
      id: makeId(name),
      name,
      icon,
      code,
      cooldown: '-',
      unlock: type || '-',
      description,
      tag: 'Mission Stratagems',
    });
  }
}

const rawData = fs.readFileSync(dataPath, 'utf8');
const match = rawData.match(/const stratagemSections = (.*);\n\nconst flattenStratagems/s);
if (!match) throw new Error('Unable to locate stratagemSections');

let sections = JSON.parse(match[1]);
sections = sections.filter((s) => s.name !== 'Common' && s.name !== 'Objectives');

const missionIndex = sections.findIndex((s) => s.name === 'Mission Stratagems');
if (missionIndex >= 0) {
  sections[missionIndex].items = items;
} else {
  sections.push({ name: 'Mission Stratagems', items });
}

const output = `const stratagemSections = ${JSON.stringify(sections, null, 2)};\n\nconst flattenStratagems = (sections) =>\n  sections.flatMap((section) =>\n    section.items.map((item) => ({\n      ...item,\n      section: section.name,\n    }))\n  );\n\nexport { stratagemSections, flattenStratagems };\n`;

fs.writeFileSync(dataPath, output, 'utf8');
console.log(`Mission stratagems: ${items.length}`);
