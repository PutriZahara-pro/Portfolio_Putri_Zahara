const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PROJECT_ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const OUT_DIR = path.join(IMAGES_DIR, "optimized");

const TARGET_WIDTHS = [640, 1600, 1920];
const WEBP_QUALITY = 80;

function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ext === ".jpg" || ext === ".jpeg" || ext === ".png";
}

async function walkDir(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (fullPath === OUT_DIR) continue;
      results.push(...(await walkDir(fullPath)));
      continue;
    }

    results.push(fullPath);
  }

  return results;
}

function toOutputBasePath(inputFilePath) {
  const relativeFromImages = path.relative(IMAGES_DIR, inputFilePath);
  const relativeDir = path.dirname(relativeFromImages);
  const ext = path.extname(relativeFromImages);
  const baseName = path.basename(relativeFromImages, ext);

  const outDir = path.join(OUT_DIR, relativeDir);
  const outBaseName = path.join(outDir, baseName);

  return { outDir, outBaseName };
}

async function optimizeImage(inputFilePath) {
  if (!isImageFile(inputFilePath)) return { processed: 0, skipped: 0 };

  const { outDir, outBaseName } = toOutputBasePath(inputFilePath);
  await fs.promises.mkdir(outDir, { recursive: true });

  let processed = 0;
  let skipped = 0;

  for (const width of TARGET_WIDTHS) {
    const outFilePath = `${outBaseName}_${width}.webp`;

    if (fs.existsSync(outFilePath)) {
      skipped += 1;
      continue;
    }

    await sharp(inputFilePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outFilePath);

    processed += 1;
  }

  return { processed, skipped };
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Images directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  await fs.promises.mkdir(OUT_DIR, { recursive: true });

  const files = await walkDir(IMAGES_DIR);

  let processed = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    if (file.startsWith(OUT_DIR + path.sep)) continue;

    try {
      const result = await optimizeImage(file);
      processed += result.processed;
      skipped += result.skipped;
    } catch (err) {
      failed += 1;
      console.error(`Failed to optimize: ${file}`);
      console.error(err);
    }
  }

  console.log(`Done. Generated: ${processed} | Skipped: ${skipped} | Failed: ${failed}`);
}

main();
