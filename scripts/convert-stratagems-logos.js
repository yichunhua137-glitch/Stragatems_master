const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'public', 'stratagems logo');

if (!fs.existsSync(inputDir)) {
  console.error(`Missing dir: ${inputDir}`);
  process.exit(1);
}

const entries = fs.readdirSync(inputDir, { withFileTypes: true });

const supported = new Set(['.webp', '.jpg', '.jpeg', '.bmp', '.tiff', '.gif', '.svg']);

(async () => {
  let converted = 0;
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (ext === '.png') continue;
    if (!supported.has(ext)) continue;

    const inputPath = path.join(inputDir, entry.name);
    const baseName = path.basename(entry.name, ext);
    const outputPath = path.join(inputDir, `${baseName}.png`);

    try {
      await sharp(inputPath)
        .png({ compressionLevel: 9 })
        .toFile(outputPath);
      converted += 1;
    } catch (err) {
      console.error(`Failed: ${entry.name}`, err.message);
    }
  }

  console.log(`Converted: ${converted}`);
})();
