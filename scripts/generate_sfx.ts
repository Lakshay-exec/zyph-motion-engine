import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SFX_DIR = path.resolve(__dirname, "../public/sfx");

function generateWavFile(filename: string, samples: number[], sampleRate = 44100) {
  if (!fs.existsSync(SFX_DIR)) {
    fs.mkdirSync(SFX_DIR, { recursive: true });
  }
  const filePath = path.join(SFX_DIR, filename);
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  const maxVal = Math.max(...samples.map((s) => Math.abs(s))) || 1;
  const scale = 30000 / maxVal;

  for (const s of samples) {
    let intVal = Math.round(s * scale);
    intVal = Math.max(-32767, Math.min(32767, intVal));
    buffer.writeInt16LE(intVal, offset);
    offset += 2;
  }

  fs.writeFileSync(filePath, buffer);
  console.log(`[SFX] Created ${filename}`);
}

export function buildAudioEffects() {
  const sampleRate = 44100;

  // 1. Thump
  const thumpSamples: number[] = [];
  const thumpLen = Math.floor(0.35 * sampleRate);
  for (let i = 0; i < thumpLen; i++) {
    const t = i / sampleRate;
    const freq = 120.0 * Math.exp(-t * 9.0) + 42.0;
    const phase = 2 * Math.PI * freq * t;
    const env = Math.exp(-t * 11.0);
    thumpSamples.push((Math.sin(phase) + 0.3 * Math.sin(phase * 0.5)) * env);
  }
  generateWavFile("thump.wav", thumpSamples, sampleRate);

  // 2. Whoosh
  const whooshSamples: number[] = [];
  const whooshLen = Math.floor(0.28 * sampleRate);
  let lastVal = 0;
  for (let i = 0; i < whooshLen; i++) {
    const t = i / sampleRate;
    const normT = t / 0.28;
    const env = Math.pow(Math.sin(normT * Math.PI), 2.2);
    const cf = 400.0 + 1200.0 * Math.sin(normT * Math.PI);
    const noise = Math.random() * 2 - 1;
    const filtered = 0.7 * lastVal + 0.3 * noise * Math.sin(2 * Math.PI * cf * t);
    lastVal = filtered;
    whooshSamples.push(filtered * env);
  }
  generateWavFile("whoosh.wav", whooshSamples, sampleRate);

  // 3. Pop
  const popSamples: number[] = [];
  const popLen = Math.floor(0.09 * sampleRate);
  for (let i = 0; i < popLen; i++) {
    const t = i / sampleRate;
    const freq = 1100.0 * Math.exp(-t * 35.0) + 450.0;
    const phase = 2 * Math.PI * freq * t;
    const env = Math.exp(-t * 40.0);
    popSamples.push(Math.sin(phase) * env);
  }
  generateWavFile("pop.wav", popSamples, sampleRate);

  // 4. Click
  const clickSamples: number[] = [];
  const clickLen = Math.floor(0.04 * sampleRate);
  for (let i = 0; i < clickLen; i++) {
    const t = i / sampleRate;
    const freq = 2400.0 * Math.exp(-t * 60.0) + 800.0;
    const env = Math.exp(-t * 85.0);
    clickSamples.push(Math.sin(2 * Math.PI * freq * t) * env);
  }
  generateWavFile("click.wav", clickSamples, sampleRate);
}

buildAudioEffects();
