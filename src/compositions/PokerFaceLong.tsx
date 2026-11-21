import React from "react";
import {
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Captions } from "../components/Captions";
import { Diagram } from "../components/Diagram";
import { ProgressBar } from "../components/ProgressBar";
import { SoundEffects } from "../components/SoundEffects";
import { ZyphStage } from "../components/ZyphStage";
import { COLORS, FONTS } from "../constants";
import { TRANSCRIPT_SEGMENTS } from "../data/scriptData";
import { SoundCue, WordTimestamp } from "../types";

export const PokerFaceLong: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Words for 0 to 65s
  const words: WordTimestamp[] = React.useMemo(() => {
    const list: WordTimestamp[] = [];
    for (const seg of TRANSCRIPT_SEGMENTS) {
      if (seg.end <= 65) {
        list.push(...seg.words);
      }
    }
    return list;
  }, []);

  const soundCues: SoundCue[] = [
    { src: "sfx/thump.wav", frame: 1, volume: 0.7 },
    { src: "sfx/whoosh.wav", frame: 450, volume: 0.4 },
    { src: "sfx/pop.wav", frame: 460, volume: 0.5 },
    { src: "sfx/whoosh.wav", frame: 1140, volume: 0.4 },
    { src: "sfx/pop.wav", frame: 1150, volume: 0.5 },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* 1. Voiceover Audio */}
      <Audio src={staticFile("audio/voiceover.mp3")} startFrom={0} />

      {/* 2. Synced Procedural Sound Effects */}
      <SoundEffects cues={soundCues} />

      {/* 3. Top Editorial Header */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "64px",
          right: "64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: COLORS.accentRed,
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: "14px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: COLORS.fg,
              textTransform: "uppercase",
            }}
          >
            ZYPH MASTERCLASS // EPISODE 04
          </span>
        </div>

        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: "13px",
            color: COLORS.muted,
            letterSpacing: "0.1em",
          }}
        >
          TOPIC: THE PSYCHOLOGY & STRATEGY OF A POKER FACE
        </div>
      </div>

      {/* 4. Split-Screen Layout: Left Side = Animated Kinetic Diagrams & Rules */}
      <div
        style={{
          flex: 1.1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "80px",
          paddingRight: "40px",
          zIndex: 30,
        }}
      >
        {/* Phase 1: 0 - 15s (frames 0 - 450) */}
        {frame < 450 && (
          <Diagram
            chapter="SECTION 01 // THE PARADOX"
            headline="WHY NEUTRALITY APPEARS HOSTILE"
            subtext="When human observers encounter an emotionless face, the amygdala defaults to threat detection. Blankness is perceived as negative, never neutral."
            metrics={[
              { label: "AMYGDALA THREAT PROJECTION", value: "88%", progress: 88 },
              { label: "PERCEIVED ARROGANCE BIAS", value: "74%", progress: 74 },
              { label: "BASELINE NEUTRAL RECOGNITION", value: "12%", progress: 12 },
            ]}
            startFrame={0}
          />
        )}

        {/* Phase 2: 15s - 38s (frames 450 - 1140) */}
        {frame >= 450 && frame < 1140 && (
          <Diagram
            chapter="SECTION 02 // REAL-LIFE APPLICATION"
            headline="SKIP THE BASICS: TRUE CALM"
            subtext="Generic advice tells you to breathe and freeze. Real strategic mastery lies in controlling cognitive load and eliminating micro-leakage without faking."
            metrics={[
              { label: "MICRO-EXPRESSION SUPPRESSION", value: "95%", progress: 95 },
              { label: "PUPIL DILATION STEADY RATE", value: "91%", progress: 91 },
              { label: "INVOLUNTARY BLINK LATENCY", value: "4.2s", progress: 84 },
            ]}
            startFrame={450}
          />
        )}

        {/* Phase 3: 38s - 65s (frames 1140 - 1950) */}
        {frame >= 1140 && (
          <Diagram
            chapter="SECTION 03 // THE 3-SECOND PROTOCOL"
            headline="THE STEADY EXPRESSION FRAMEWORK"
            subtext="Whether the news is catastrophic or triumphant, your facial state must remain identical. Not frozen blank, but calm and deliberate."
            metrics={[
              { label: "TACTICAL PAUSE DURATION", value: "3.0s", progress: 90 },
              { label: "OPPONENT FRAME ABSORPTION", value: "82%", progress: 82 },
              { label: "INFORMATION ASYMMETRY", value: "HIGH", progress: 96 },
            ]}
            startFrame={1140}
          />
        )}
      </div>

      {/* 5. Split-Screen Layout: Right Side = Zyph Character Stage */}
      <div
        style={{
          flex: 0.9,
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {/* Subtle Background Accent Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            zIndex: 1,
          }}
        />

        {/* Scene 1 (0 - 15s) */}
        <Sequence from={0} durationInFrames={455}>
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_3.png")}
            zoomDirection="subtle-in"
            shadowWidth={520}
            heightPercent={88}
          />
        </Sequence>

        {/* Scene 2 (15s - 38s) */}
        <Sequence from={450} durationInFrames={695}>
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_8.png")}
            zoomDirection="subtle-in"
            shadowWidth={540}
            heightPercent={88}
            entranceFrame={450}
          />
        </Sequence>

        {/* Scene 3 (38s - 65s) */}
        <Sequence from={1140} durationInFrames={810}>
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_11.png")}
            zoomDirection="in"
            shadowWidth={560}
            heightPercent={90}
            entranceFrame={1140}
          />
        </Sequence>
      </div>

      {/* 6. Word-by-Word Kinetic Captions along bottom */}
      <Captions words={words} bottomOffset="60px" maxWordsPerChunk={5} />

      {/* 7. Bottom Animated Progress Bar */}
      <ProgressBar bottom="0px" height={6} color={COLORS.accentRed} />
    </div>
  );
};
