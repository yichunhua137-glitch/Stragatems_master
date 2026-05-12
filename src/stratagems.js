import stratagemSections from './data/stratagems.json';

const flattenStratagems = (sections) =>
  sections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: section.name,
    }))
  );

export { stratagemSections, flattenStratagems };
