const fs = require('fs');
const path = require('path');
const {
  loadStratagemSections,
  saveStratagemSections,
} = require('./lib/stratagem-data');

const txtPath = path.join(__dirname, 'source', 'stratagems.txt');
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
  let value = text;
  value = value.replace(/<small>/gi, '');
  value = value.replace(/<\/small>/gi, '');
  value = value.replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, '$1');
  value = value.replace(/\{\{[^}]+\}\}/g, '');
  value = value.replace(/\s+/g, ' ');
  return value.trim();
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

for (let i = 0; i < lines.length; i += 1) {
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
      const current = lines[j].trim();
      if (current.startsWith('|-') || current.startsWith('! rowspan=')) break;
      if (current.startsWith('|')) cells.push(current.slice(1).trim());
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

let sections = loadStratagemSections();
sections = sections.filter((section) => section.name !== 'Common' && section.name !== 'Objectives');

const missionIndex = sections.findIndex((section) => section.name === 'Mission Stratagems');
if (missionIndex >= 0) {
  sections[missionIndex].items = items;
} else {
  sections.push({ name: 'Mission Stratagems', items });
}

saveStratagemSections(sections);
console.log(`Mission stratagems: ${items.length}`);
