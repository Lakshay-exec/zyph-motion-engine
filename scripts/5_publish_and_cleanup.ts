import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, "../out");

export async function publishAndCleanup() {
  console.log("[Pipeline 5] Preparing publish dispatch...");

  const ytSecret = process.env.YOUTUBE_CLIENT_SECRET;
  const igToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  const shortVideo = path.join(OUT_DIR, "poker-face-short.mp4");
  const longVideo = path.join(OUT_DIR, "poker-face-long.mp4");
  const thumbnail = path.join(OUT_DIR, "poker-face-thumb.png");

  console.log("[Pipeline 5] Verifying rendered assets:");
  console.log(`  - Short: ${fs.existsSync(shortVideo) ? "Ready" : "Pending"}`);
  console.log(`  - Long:  ${fs.existsSync(longVideo) ? "Ready" : "Pending"}`);
  console.log(`  - Thumb: ${fs.existsSync(thumbnail) ? "Ready" : "Pending"}`);

  if (!ytSecret && !igToken) {
    console.log(
      "[Pipeline 5] No publish tokens detected in environment. Files are preserved in out/ for review."
    );
    return;
  }

  console.log("[Pipeline 5] Uploading to YouTube & Instagram APIs...");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  publishAndCleanup().catch(console.error);
}
