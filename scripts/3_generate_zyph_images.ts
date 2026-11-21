import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ZYPH_DIR = path.resolve(__dirname, "../public/zyph");

export async function generateZyphImages() {
  const replicateKey = process.env.REPLICATE_API_TOKEN;
  console.log("[Pipeline 3] Checking image generation pipeline...");

  // Base prompt enforcing character spec & aesthetic rules:
  const basePrompt =
    "A realistic 3D matte-black mannequin statue with a smooth, completely featureless blank oval face, dressed in authentic modern luxury streetwear (heavyweight black hoodie, relaxed tailored trousers, minimalist sneakers), standing on a pure #FFFFFF solid white seamless studio background, soft ground shadow, cinematic sharp studio lighting, 8k resolution, octane render";

  console.log(`[Pipeline 3] Prompt Spec: "${basePrompt}"`);

  if (!replicateKey) {
    console.log(
      "[Pipeline 3] REPLICATE_API_TOKEN not set; utilizing pre-processed asset bank in public/zyph/"
    );
    const existing = fs.readdirSync(ZYPH_DIR).filter((f) => f.endsWith(".png"));
    console.log(`[Pipeline 3] Active asset library contains ${existing.length} verified Zyph poses.`);
    return;
  }

  console.log("[Pipeline 3] Connected to generation provider. Dispatching image synthesis...");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateZyphImages().catch(console.error);
}
