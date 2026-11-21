import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ZYPH_DIR = path.resolve(__dirname, "../public/zyph");

async function processImage(filePath: string) {
  const fileName = path.basename(filePath);
  console.log(`[Sharp] Processing ${fileName}...`);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    const origWidth = metadata.width || 1000;
    const origHeight = metadata.height || 1000;

    // 1. Trim 6% from bottom and right edges to remove any corner watermark
    const trimRight = Math.round(origWidth * 0.06);
    const trimBottom = Math.round(origHeight * 0.06);
    const cropWidth = origWidth - trimRight;
    const cropHeight = origHeight - trimBottom;

    // Extract cropped region (removing bottom-right watermark)
    const croppedBuffer = await sharp(filePath)
      .extract({ left: 0, top: 0, width: cropWidth, height: cropHeight })
      .toBuffer();

    // Re-center on canvas with pure white padding
    const padX = Math.round(trimRight / 2);
    const padY = Math.round(trimBottom / 2);

    const recenteredBuffer = await sharp(croppedBuffer)
      .extend({
        top: padY,
        bottom: trimBottom - padY,
        left: padX,
        right: trimRight - padX,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = recenteredBuffer;
    const channels = info.channels;
    const len = data.length;

    // 2. Normalize near-white pixels (RGB > 245) to pure #FFFFFF (255, 255, 255)
    // In CSS mix-blend-mode: multiply, (255, 255, 255) multiplied with white results in 0 box border artifact
    for (let i = 0; i < len; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (r > 245 && g > 245 && b > 245) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        if (channels === 4) {
          data[i + 3] = 255;
        }
      }
    }

    // Save final cleaned image
    const tempOut = filePath.replace(/\.png$/i, "_temp.png");
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels,
      },
    })
      .png({ compressionLevel: 8 })
      .toFile(tempOut);

    fs.renameSync(tempOut, filePath);
    console.log(`[Sharp] Successfully normalized & recentered: ${fileName}`);
  } catch (err) {
    console.error(`[Sharp] Error processing ${fileName}:`, err);
  }
}

async function main() {
  if (!fs.existsSync(ZYPH_DIR)) {
    console.error(`Directory not found: ${ZYPH_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(ZYPH_DIR)
    .filter((f) => /^zyph_\d+\.png$/i.test(f))
    .sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ""), 10);
      const numB = parseInt(b.replace(/\D/g, ""), 10);
      return numA - numB;
    });

  console.log(`Found ${files.length} Zyph character images to process.`);

  for (const file of files) {
    await processImage(path.join(ZYPH_DIR, file));
  }

  console.log(`\nAll ${files.length} images preprocessed and ready for Remotion!`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
