const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'public', 'weapons');

const SUPPORTED_EXT = new Set(['.png', '.webp', '.jpg', '.jpeg']);

async function trimImage(filePath) {
  const image = sharp(filePath);
  const trimmed = image.trim({
    threshold: 10,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  const buffer = await trimmed.toBuffer();
  await fs.promises.writeFile(filePath, buffer);
}

async function run() {
  const entries = await fs.promises.readdir(SOURCE_DIR);
  const files = entries.filter((name) =>
    SUPPORTED_EXT.has(path.extname(name).toLowerCase())
  );
  if (!files.length) {
    console.log('No images found in public/weapons');
    return;
  }
  console.log(`Trimming ${files.length} images...`);
  let processed = 0;
  for (const name of files) {
    const filePath = path.join(SOURCE_DIR, name);
    try {
      await trimImage(filePath);
      processed += 1;
    } catch (error) {
      console.error(`Failed to trim ${name}:`, error.message);
    }
  }
  console.log(`Done. Trimmed ${processed}/${files.length} images.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
