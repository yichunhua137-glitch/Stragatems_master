const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'stratagems.js');
const raw = fs.readFileSync(dataPath, 'utf8');
const match = raw.match(/const stratagemSections = (.*);\n\nconst flattenStratagems/s);
if (!match) throw new Error('Unable to locate stratagemSections');

const sections = JSON.parse(match[1]);

const overrides = {
  'StA-X3 W.A.S.P. Launcher': '120px-StA-X3_W.png',
  'M-102 Fast Recon Vehicle': '120px-M-102_Fast_Recon_Vehicle_Stratagem_Icon.png',
  'MD-I4 Incendiary Mines': '120px-Incendiary_Mines_Stratagem_Icon.png',
  'MD-8 Gas Mines': '120px-Gas_Minefield_Stratagem_Icon.png',
  'LIFT-860 Hover Pack': 'Hover_Pack_Stratagem_Icon.png',
  'GL-52 De-Escalator': 'GL-52_De-Escalator_Stratagem_Icon.png',
  'AX/ARC-3 "Guard Dog" K-9': 'AX_ARC-3__Guard_Dog__K-9_Stratagem_Icon.png',
  'PLAS-45 Epoch': 'PLAS-45_Epoch_Stratagem_Icon.png',
  'LIFT-182 Warp Pack': 'LIFT-182_Warp_Pack_Stratagem_Icon.png',
  'M-1000 Maxigun': 'M-1000_Maxigun_Stratagem_Icon.png',
  'CQC-9 Defoliation Tool': 'CQC-9_Defoliation_Tool_Stratagem_Icon.png',
  'AX/FLAM-75 "Guard Dog" Hot Dog': 'AX_FLAM-75_“Guard_Dog”_Hot_Dog_Stratagem_Icon.png'
};

let updated = 0;
for (const section of sections) {
  for (const item of section.items) {
    if (overrides[item.name]) {
      item.icon = overrides[item.name];
      updated += 1;
    }
  }
}

const output = `const stratagemSections = ${JSON.stringify(sections, null, 2)};\n\nconst flattenStratagems = (sections) =>\n  sections.flatMap((section) =>\n    section.items.map((item) => ({\n      ...item,\n      section: section.name,\n    }))\n  );\n\nexport { stratagemSections, flattenStratagems };\n`;

fs.writeFileSync(dataPath, output, 'utf8');
console.log(`Overrides applied: ${updated}`);
