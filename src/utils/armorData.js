const ARMOR_DATA_BASE = `${process.env.PUBLIC_URL || ''}/armor`;
const ARMOR_IMAGE_BASE = `${process.env.PUBLIC_URL || ''}/armor image`;

const classLabelFromKey = (key) => {
  if (key === 'light') return 'Light';
  if (key === 'medium') return 'Medium';
  if (key === 'heavy') return 'Heavy';
  return 'Unknown';
};

const loadJson = async (path) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
};

export async function loadArmorData() {
  const [lightData, mediumData, heavyData, slotMap, passiveMap] = await Promise.all([
    loadJson(`${ARMOR_DATA_BASE}/light.json`),
    loadJson(`${ARMOR_DATA_BASE}/medium.json`),
    loadJson(`${ARMOR_DATA_BASE}/heavy.json`),
    loadJson(`${ARMOR_DATA_BASE}/slot.json`),
    loadJson(`${ARMOR_DATA_BASE}/passive.json`),
  ]);

  const allByClass = {
    light: lightData?.types || {},
    medium: mediumData?.types || {},
    heavy: heavyData?.types || {},
  };

  const armors = Object.entries(allByClass).flatMap(([classKey, group]) =>
    Object.entries(group).map(([id, armor]) => ({
      id: `${classKey}-${id}`,
      sourceId: id,
      classKey,
      classLabel: classLabelFromKey(classKey),
      name: armor?.name || 'Unknown Armor',
      description: armor?.description || '',
      slot: Number(armor?.slot),
      type: Number(armor?.type),
      armorRating: Number(armor?.armor_rating),
      speed: Number(armor?.speed),
      staminaRegen: Number(armor?.stamina_regen),
      passive: Number(armor?.passive),
    }))
  );

  return {
    armors,
    slotMap: slotMap || {},
    passiveMap: passiveMap || {},
  };
}

export function pickRandomArmors(items, count) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }

  if (!list.length) return [];

  if (count <= list.length) {
    return list.slice(0, count);
  }

  const output = [...list];
  while (output.length < count) {
    output.push(list[Math.floor(Math.random() * list.length)]);
  }
  return output;
}

export function getArmorImageByName(name) {
  if (!name) return '';
  const normalized = name
    .replace(/\s+/g, '_')
    .replace(/[/:]/g, '_')
    .replace(/["']/g, '');
  const file = `123px-${normalized}_Body_Icon.webp`;
  return `${ARMOR_IMAGE_BASE}/${encodeURIComponent(file)}`;
}
