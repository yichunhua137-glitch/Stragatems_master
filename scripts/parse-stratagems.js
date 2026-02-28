const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'src', 'stratagems.txt');
const outputPath = path.join(__dirname, '..', 'src', 'stratagems.js');

const raw = fs.readFileSync(inputPath, 'utf8');
const lines = raw.split(/\r?\n/);

const sections = [];
let currentSection = null;
let pendingSectionName = null;
let inMissionTable = false;
let pendingMissionType = null;

const decodeEntities = (text) => text
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/°/g, '�')
  .replace(/“/g, '"')
  .replace(/”/g, '"')
  .replace(/‘/g, "'")
  .replace(/’/g, "'");

const stripMarkup = (text) => {
  let t = text;
  t = t.replace(/<small>/gi, '');
  t = t.replace(/<\/small>/gi, '');
  t = t.replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, '$1');
  t = t.replace(/\{\{Currency\|([^|}]+)\|([^|}]+)(?:\|[^}]+)?\}\}/gi, '$1 $2');
  t = t.replace(/\{\{Stratagem[_ ]code\|([^}]+)\}\}/gi, '$1');
  t = t.replace(/\{\{Stratagem[_ ]Code\|([^}]+)\}\}/gi, '$1');
  t = t.replace(/\{\{Stratagem code\|([^}]+)\}\}/gi, '$1');
  t = t.replace(/\{\{Stratagem Code\|([^}]+)\}\}/gi, '$1');
  t = t.replace(/\{\{[^}]+\}\}/g, '');
  t = t.replace(/\s+/g, ' ');
  t = t.trim();
  return decodeEntities(t);
};

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

const ensureSection = (name) => {
  if (currentSection && currentSection.name === name) return;
  const existing = sections.find((s) => s.name === name);
  if (existing) {
    currentSection = existing;
    return;
  }
  currentSection = { name, items: [] };
  sections.push(currentSection);
};

let i = 0;
while (i < lines.length) {
  const line = lines[i].trim();

  if (line.includes('Mission Stratagems')) {
    inMissionTable = true;
    pendingMissionType = null;
    ensureSection('Mission Stratagems');
    i += 1;
    continue;
  }

  if (line.startsWith('! rowspan=')) {
    const parts = line.split('|');
    const label = stripMarkup(parts[parts.length - 1] || '').trim();
    if (inMissionTable) {
      pendingMissionType = label;
    } else {
      pendingSectionName = label;
    }
    i += 1;
    continue;
  }

  if (line.startsWith('|-')) {
    i += 1;
    continue;
  }

  if (line.startsWith('|')) {
    const cells = [];
    while (i < lines.length) {
      const cellLine = lines[i].trim();
      if (cellLine.startsWith('|-') || cellLine.startsWith('! rowspan=')) {
        break;
      }
      if (cellLine.startsWith('|')) {
        cells.push(cellLine.slice(1).trim());
      }
      i += 1;
    }

    if (pendingSectionName) {
      ensureSection(pendingSectionName);
      pendingSectionName = null;
    }

    if (!currentSection) {
      continue;
    }

    let icon = '';
    let name = '';
    let code = [];
    let cooldown = '-';
    let unlock = '-';
    let description = '';

    if (inMissionTable) {
      if (cells.length < 4) {
        continue;
      }
      icon = parseIcon(cells[0]);
      name = parseName(cells[1]);
      code = parseCode(cells[2]);
      description = stripMarkup(cells[3] || '');
      unlock = pendingMissionType || '-';
    } else {
      if (cells.length < 6) {
        continue;
      }
      icon = parseIcon(cells[0]);
      name = parseName(cells[1]);
      code = parseCode(cells[2]);
      cooldown = stripMarkup(cells[3]);
      unlock = stripMarkup(cells[4]);
      description = stripMarkup(cells[6] || cells[5] || '');
    }

    const item = {
      id: makeId(name),
      name,
      icon,
      code,
      cooldown,
      unlock,
      description,
      tag: currentSection.name,
    };

    currentSection.items.push(item);
    continue;
  }

  i += 1;
}

const output = `const stratagemSections = ${JSON.stringify(sections, null, 2)};\n\nconst flattenStratagems = (sections) =>\n  sections.flatMap((section) =>\n    section.items.map((item) => ({\n      ...item,\n      section: section.name,\n    }))\n  );\n\nexport { stratagemSections, flattenStratagems };\n`;

fs.writeFileSync(outputPath, output, 'utf8');

console.log(`Wrote ${sections.length} sections to ${outputPath}`);
