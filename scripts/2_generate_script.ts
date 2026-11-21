import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, "../generated");

export async function generateScript() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
  console.log("[Pipeline 2] Generating high-retention video script...");

  const topicFile = path.join(OUT_DIR, "topic.json");
  let topic = {
    title: "The Psychology & Strategy of a Poker Face",
    hook: "I spent years building the perfect poker face, and I was wrong about it.",
  };

  if (fs.existsSync(topicFile)) {
    topic = JSON.parse(fs.readFileSync(topicFile, "utf-8"));
  }

  const scriptOutput = {
    topic: topic.title,
    fullVoiceoverText: `${topic.hook} Not about what it is, about what it does to the people around you, because a neutral face doesn't look neutral to everyone else. It looks sad, angry, bored, sometimes even arrogant. Today we're skipping the basics everyone already knows. No, stay calm and breathe. We're covering what happens in real life when your face stays blank, and how to fix it without faking a single emotion.`,
    pacingSegments: [
      {
        section: "Hook Slam",
        startSec: 0,
        endSec: 6.2,
        visualCue: "Zyph standing rigid, bold title slam",
        callout: null,
      },
      {
        section: "Perception Gap",
        startSec: 7.2,
        endSec: 14.5,
        visualCue: "Zyph holding mask, thoughtful pose",
        callout: "THE PERCEPTION GAP",
      },
      {
        section: "The Biological Trap",
        startSec: 14.9,
        endSec: 24.8,
        visualCue: "Multi-pose quick cuts (sad, angry, bored)",
        callout: "NEUTRALITY TRAP",
      },
      {
        section: "Tactical Execution",
        startSec: 25.0,
        endSec: 36.5,
        visualCue: "Zyph confident stance, forward push-in",
        callout: "THE 3-SECOND PAUSE",
      },
    ],
  };

  const outPath = path.join(OUT_DIR, "script.json");
  fs.writeFileSync(outPath, JSON.stringify(scriptOutput, null, 2));
  console.log(`[Pipeline 2] Script generated and saved to ${outPath}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateScript().catch(console.error);
}
