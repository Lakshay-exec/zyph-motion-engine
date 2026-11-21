import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, "../generated");

interface TopicIdea {
  title: string;
  hook: string;
  coreConcepts: string[];
  targetAudience: string;
  thumbnailHeadline: string;
}

export async function fetchYoutubeIdeas(): Promise<TopicIdea> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  console.log("[Pipeline 1] Fetching viral psychology & strategy topics...");

  // Example structured topic idea
  const idea: TopicIdea = {
    title: "The Psychology & Strategy of a Poker Face",
    hook: "I spent years building the perfect poker face, and I was wrong about it.",
    coreConcepts: [
      "The Neutrality Trap",
      "Perceived Arrogance Bias",
      "The 3-Second Tactical Pause",
      "Internal Pulse Control vs Outer Faking",
    ],
    targetAudience: "High-performance strategists, founders, negotiators",
    thumbnailHeadline: "NEVER SHOW FEAR",
  };

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const outPath = path.join(OUT_DIR, "topic.json");
  fs.writeFileSync(outPath, JSON.stringify(idea, null, 2));
  console.log(`[Pipeline 1] Topic idea generated and saved to ${outPath}`);
  return idea;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchYoutubeIdeas().catch(console.error);
}
