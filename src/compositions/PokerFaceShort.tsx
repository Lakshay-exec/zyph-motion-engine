import React from "react";
import {
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Captions } from "../components/Captions";
import { FloatingCard } from "../components/FloatingCard";
import { ProgressBar } from "../components/ProgressBar";
import { SoundEffects } from "../components/SoundEffects";
import { ZyphStage } from "../components/ZyphStage";
import { COLORS, FONTS } from "../constants";
import { TRANSCRIPT_SEGMENTS } from "../data/scriptData";
import { SoundCue, WordTimestamp } from "../types";

export const PokerFaceShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Words for 0 to 36.5s
  const words: WordTimestamp[] = React.useMemo(() => {
    const list: WordTimestamp[] = [];
    for (const seg of TRANSCRIPT_SEGMENTS) {
      if (seg.end <= 37) {
        list.push(...seg.words);
      }
    }
    return list;
  }, []);

  // Hook Slam Animation (frames 0 - 60)
  const hookSpring = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.5, stiffness: 140 },
  });
  const hookScale = interpolate(hookSpring, [0, 1], [1.5, 1.0]);
  const hookOpacity = interpolate(frame, [0, 8, 55, 68], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  // Sound cues synced to key visual moments
  const soundCues: SoundCue[] = [
    { src: "sfx/thump.wav", frame: 1, volume: 0.8 }, // Opening Slam
    { src: "sfx/pop.wav", frame: 220, volume: 0.5 }, // Perception Gap card
    { src: "sfx/whoosh.wav", frame: 335, volume: 0.4 }, // Pose transition
    { src: "sfx/pop.wav", frame: 450, volume: 0.5 }, // Neutrality trap
    { src: "sfx/whoosh.wav", frame: 650, volume: 0.4 }, // Camera sweep
    { src: "sfx/pop.wav", frame: 855, volume: 0.6 }, // 3-Second Pause
    { src: "sfx/click.wav", frame: 980, volume: 0.5 }, // Emotional neutrality
  ];

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
      }}
    >
      {/* 1. Primary Voiceover Audio */}
      <Audio src={staticFile("audio/voiceover.mp3")} startFrom={0} />

      {/* 2. Synced Procedural Sound Effects */}
      <SoundEffects cues={soundCues} />

      {/* 3. Zyph Dynamic Stages (Transitions across the narrative) */}
      {/* Scene 1: 0 - 11s (frames 0 - 330) */}
      <Sequence from={0} durationInFrames={335}>
        <ZyphStage
          imageSrc={staticFile("zyph/zyph_1.png")}
          zoomDirection="subtle-in"
          shadowWidth={420}
          heightPercent={82}
        />
      </Sequence>

      {/* Scene 2: 11.2s - 21.6s (frames 335 - 650) */}
      <Sequence from={335} durationInFrames={315}>
        <ZyphStage
          imageSrc={staticFile("zyph/zyph_7.png")}
          zoomDirection="subtle-in"
          shadowWidth={440}
          heightPercent={82}
          entranceFrame={335}
        />
      </Sequence>

      {/* Scene 3: 21.6s - 37s (frames 650 - 1110) */}
      <Sequence from={650} durationInFrames={460}>
        <ZyphStage
          imageSrc={staticFile("zyph/zyph_10.png")}
          zoomDirection="in"
          shadowWidth={460}
          heightPercent={85}
          entranceFrame={650}
        />
      </Sequence>

      {/* 4. Top Editorial Brand Badge */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 64px",
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: COLORS.accentRed,
              borderRadius: "50%",
            }}
          />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: COLORS.fg,
            }}
          >
            ZYPH / LABS
          </span>
        </div>

        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "14px",
            fontWeight: 600,
            color: COLORS.muted,
          }}
        >
          PSYCHOLOGY & STRATEGY
        </span>
      </div>

      {/* 5. Hook Title Slam (First 2.2 seconds) */}
      {frame < 70 && (
        <div
          style={{
            position: "absolute",
            top: "24%",
            left: "60px",
            right: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 45,
            opacity: hookOpacity,
            transform: `scale(${hookScale})`,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.darkPill,
              color: COLORS.darkPillText,
              fontFamily: FONTS.mono,
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.25em",
              padding: "8px 20px",
              borderRadius: "6px",
              marginBottom: "16px",
            }}
          >
            THE STRATEGY FLAW
          </div>
          <h1
            style={{
              fontFamily: FONTS.sans,
              fontSize: "76px",
              fontWeight: 950,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              textAlign: "center",
              color: COLORS.fg,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            I WAS WRONG ABOUT POKER FACE
          </h1>
        </div>
      )}

      {/* 6. Floating Minimalist Psychological Callout Cards */}
      {/* Card 1: The Perception Gap */}
      <FloatingCard
        tag="RULE 01 // PARADOX"
        title="PERCEPTION GAP"
        description="A neutral face doesn't look neutral to others. It projects hostility."
        startFrame={220}
        durationInFrames={120}
        top="320px"
        left="64px"
        accent
      />

      {/* Card 2: Neutrality Trap */}
      <FloatingCard
        tag="BIOLOGICAL BIAS"
        title="THE NEUTRAL TRAP"
        description="Human brains fill blank expressions with projected insecurity."
        startFrame={450}
        durationInFrames={150}
        top="420px"
        right="64px"
      />

      {/* Card 3: The 3-Second Pause */}
      <FloatingCard
        tag="TACTICAL RESPONSE"
        title="THE 3-SECOND PAUSE"
        description="Never answer instantly. Silence absorbs your opponent's frame."
        startFrame={855}
        durationInFrames={140}
        top="340px"
        left="64px"
        accent
      />

      {/* Card 4: Emotional Neutrality */}
      <FloatingCard
        tag="ENDGAME"
        title="EMOTIONAL NEUTRALITY"
        description="Control internal pulse without faking outward masks."
        startFrame={980}
        durationInFrames={130}
        top="460px"
        right="64px"
      />

      {/* 7. Bold Word-by-Word Kinetic Captions (Lower third) */}
      <Captions words={words} bottomOffset="17%" maxWordsPerChunk={4} />

      {/* 8. Animated Top Progress Bar */}
      <ProgressBar top="0px" height={6} color={COLORS.accentRed} />
    </div>
  );
};
