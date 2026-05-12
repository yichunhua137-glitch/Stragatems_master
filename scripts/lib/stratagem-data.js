const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', '..', 'src', 'data', 'stratagems.json');

const loadStratagemSections = () =>
  JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const saveStratagemSections = (sections) => {
  fs.writeFileSync(dataPath, `${JSON.stringify(sections, null, 2)}\n`, 'utf8');
};

const flattenStratagems = (sections) =>
  sections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: section.name,
    }))
  );

module.exports = {
  dataPath,
  flattenStratagems,
  loadStratagemSections,
  saveStratagemSections,
};
