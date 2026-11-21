import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CountdownCircle } from "../components/CountdownCircle";
import { EditorialText } from "../components/EditorialText";
import { GlitchSlice } from "../components/GlitchSlice";
import { ZyphStage } from "../components/ZyphStage";
import { COLORS, FONTS } from "../constants";

export const PokerFaceLong: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig(); // 60 FPS
  const currentSec = frame / fps;

  // Chapter boundaries in seconds:
  // 01: 0 - 36s (The Mistake)
  // 02: 36 - 75s (The Short Version)
  // 03: 75 - 150s (The Gap / Problem)
  // 04: 150 - 238s (The Fix)
  // 05: 238 - 301s (Stability)
  // 06: 301 - 391s (The 1-Sentence Scripts)
  // 07: 391 - 410s (Kind or Evil?)
  // 08: 410 - 449s (Selective Control)

  let chapterName = "— 01 · THE MISTAKE";
  if (currentSec >= 36 && currentSec < 75) chapterName = "— 02 · THE SHORT VERSION";
  else if (currentSec >= 75 && currentSec < 150) chapterName = "— 03 · THE PROBLEM";
  else if (currentSec >= 150 && currentSec < 238) chapterName = "— 04 · THE SIGNALS";
  else if (currentSec >= 238 && currentSec < 301) chapterName = "— 05 · STABILITY";
  else if (currentSec >= 301 && currentSec < 391) chapterName = "— 06 · THE RESPONSES";
  else if (currentSec >= 391 && currentSec < 410) chapterName = "— 07 · THE QUESTION";
  else if (currentSec >= 410) chapterName = "— 08 · THE CONCLUSION";

  // Overall timeline progress (0 - 100%)
  const overallProgress = Math.min(100, Math.max(0, (frame / durationInFrames) * 100));

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
      }}
    >
      {/* 1. Full Master Voiceover Track */}
      <Audio src={staticFile("audio/voiceover.mp3")} startFrom={0} />

      {/* 2. Top-Left Chapter Header Bar */}
      <div
        style={{
          position: "absolute",
          top: "48px",
          left: "80px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          zIndex: 40,
        }}
      >
        <div
          style={{
            width: "28px",
            height: "4px",
            backgroundColor: COLORS.accentGreen,
            borderRadius: "2px",
          }}
        />
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "14px",
            fontWeight: 800,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: COLORS.muted,
          }}
        >
          {chapterName}
        </span>
      </div>

      {/* 3. Bottom-Left Minimalist Progress Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "80px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          zIndex: 40,
        }}
      >
        <div
          style={{
            width: "120px",
            height: "4px",
            backgroundColor: "rgba(0,0,0,0.06)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${overallProgress}%`,
              height: "100%",
              backgroundColor: COLORS.accentGreen,
              borderRadius: "2px",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "11px",
            fontWeight: 600,
            color: COLORS.subtle,
          }}
        >
          {Math.floor(currentSec / 60)}:{(Math.floor(currentSec % 60)).toString().padStart(2, "0")} / 7:31
        </span>
      </div>

      {/* 4. Interactive Skip Ahead Countdown Circle (38s to 58s) */}
      <CountdownCircle startFrame={38 * fps} durationInFrames={20 * fps} initialSeconds={20} />

      {/* ========================================================================= */}
      {/* CHAPTER 01: THE MISTAKE (0s -> 36s / 0 -> 2160 frames)                   */}
      {/* ========================================================================= */}

      {/* Scene 1.1: 0s - 11s */}
      {currentSec >= 0 && currentSec < 11 && (
        <>
          <EditorialText
            spans={[
              { text: "I spent years building" },
              { text: "the", newline: false },
              { text: "perfect", italic: true, green: true },
              { text: "poker face." },
            ]}
            fontSize={72}
            startFrame={0}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_11.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
          />
        </>
      )}

      {/* Scene 1.2: 11s - 15s (Neutral face doesn't look neutral) */}
      {currentSec >= 11 && currentSec < 15 && (
        <>
          <EditorialText
            spans={[
              { text: "Because a neutral face" },
              { text: "doesn't look neutral", italic: true },
              { text: "to everyone else." },
            ]}
            fontSize={64}
            startFrame={11 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_18.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={90}
            entranceFrame={11 * fps}
          />
        </>
      )}

      {/* Scene 1.3: 15s - 18s (Sad, Angry) */}
      {currentSec >= 15 && currentSec < 18 && (
        <>
          <EditorialText
            spans={[
              { text: "It looks sad," },
              { text: "angry,", italic: true, green: true },
              { text: "bored." },
            ]}
            fontSize={76}
            startFrame={15 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_1.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={90}
            entranceFrame={15 * fps}
          />
        </>
      )}

      {/* Scene 1.4: 18s - 24s ("Bored." - Iconic single word punch) */}
      {currentSec >= 18 && currentSec < 24 && (
        <>
          <EditorialText
            spans={[{ text: "Bored.", italic: true, green: true }]}
            fontSize={140}
            startFrame={18 * fps}
            top="34%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_2.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={18 * fps}
          />
        </>
      )}

      {/* Scene 1.5: 24s - 36s ("Today, no basics." - Strikethrough line) */}
      {currentSec >= 24 && currentSec < 36 && (
        <>
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_13.png")}
            align="left"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={24 * fps}
          />
          <EditorialText
            spans={[
              { text: "Today," },
              { text: "no" },
              { text: "basics.", strikethrough: true },
            ]}
            fontSize={90}
            startFrame={24 * fps}
            top="34%"
            left="960px"
            maxWidth="850px"
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 02: THE SHORT VERSION (36s -> 75s / 2160 -> 4500 frames)          */}
      {/* ========================================================================= */}

      {/* Scene 2.1: 36s - 47s (Already know what a poker face is? Skip ahead) */}
      {currentSec >= 36 && currentSec < 47 && (
        <>
          <EditorialText
            spans={[
              { text: "Already know" },
              { text: "what a poker face is?" },
            ]}
            fontSize={72}
            startFrame={36 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_14.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={36 * fps}
          />
        </>
      )}

      {/* Scene 2.2: 47s - 75s ("same face." with steady definition) */}
      {currentSec >= 47 && currentSec < 75 && (
        <>
          <EditorialText
            spans={[
              { text: "same", italic: true, green: true },
              { text: "face." },
            ]}
            fontSize={120}
            startFrame={47 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_11.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={47 * fps}
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 03: THE PROBLEM (75s -> 150s / 4500 -> 9000 frames)               */}
      {/* ========================================================================= */}

      {/* Scene 3.1: 75s - 92s ("Picture this: you're in a meeting.") */}
      {currentSec >= 75 && currentSec < 92 && (
        <>
          <EditorialText
            spans={[
              { text: "Picture this:" },
              { text: "you're in a meeting." },
            ]}
            fontSize={68}
            startFrame={75 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_3.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={88}
            entranceFrame={75 * fps}
          />
        </>
      )}

      {/* Scene 3.2: 92s - 115s ("Hey, are you okay? Did I do something?") */}
      {currentSec >= 92 && currentSec < 115 && (
        <>
          <EditorialText
            spans={[
              { text: "“Are you okay?" },
              { text: "Did I do something?”", italic: true, green: true },
            ]}
            fontSize={64}
            startFrame={92 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_20.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={88}
            entranceFrame={92 * fps}
          />
        </>
      )}

      {/* Scene 3.3: 115s - 150s (When a face gives no info, they fill the gap) */}
      {currentSec >= 115 && currentSec < 150 && (
        <>
          <EditorialText
            spans={[
              { text: "People don't leave" },
              { text: "the gap empty.", italic: true, green: true },
              { text: "They fill it." },
            ]}
            fontSize={66}
            startFrame={115 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_8.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={115 * fps}
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 04: THE SIGNALS (150s -> 238s / 9000 -> 14280 frames)             */}
      {/* ========================================================================= */}

      {/* Scene 4.1: 150s - 185s (Add signals, not emotion) */}
      {currentSec >= 150 && currentSec < 185 && (
        <>
          <EditorialText
            spans={[
              { text: "Add signals," },
              { text: "not emotion.", italic: true, green: true },
            ]}
            fontSize={84}
            startFrame={150 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_4.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={150 * fps}
          />
        </>
      )}

      {/* Scene 4.2: 185s - 215s (A nod. A brief eyebrow lift) */}
      {currentSec >= 185 && currentSec < 215 && (
        <>
          <EditorialText
            spans={[
              { text: "A nod." },
              { text: "A brief eyebrow lift.", italic: true, green: true },
            ]}
            fontSize={72}
            startFrame={185 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_12.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={185 * fps}
          />
        </>
      )}

      {/* Scene 4.3: 215s - 238s (Tone does the work) */}
      {currentSec >= 215 && currentSec < 238 && (
        <>
          <EditorialText
            spans={[
              { text: "Tone does" },
              { text: "the work.", italic: true, green: true },
            ]}
            fontSize={88}
            startFrame={215 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_16.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={215 * fps}
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 05: STABILITY (238s -> 301s / 14280 -> 18060 frames)              */}
      {/* ========================================================================= */}

      {/* Scene 5.1: 238s - 270s (Steady doesn't mean rigid) */}
      {currentSec >= 238 && currentSec < 270 && (
        <>
          <EditorialText
            spans={[
              { text: "Steady doesn't" },
              { text: "mean rigid.", italic: true, green: true },
            ]}
            fontSize={80}
            startFrame={238 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_17.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={238 * fps}
          />
        </>
      )}

      {/* Scene 5.2: 270s - 301s (Watch it back with sound off) */}
      {currentSec >= 270 && currentSec < 301 && (
        <>
          <EditorialText
            spans={[
              { text: "Record yourself." },
              { text: "Watch silently.", italic: true, green: true },
            ]}
            fontSize={76}
            startFrame={270 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_15.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={270 * fps}
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 06: THE RESPONSES (301s -> 391s / 18060 -> 23460 frames)           */}
      {/* ========================================================================= */}

      {/* Scene 6.1: 301s - 325s (One calm sentence) */}
      {currentSec >= 301 && currentSec < 325 && (
        <>
          <EditorialText
            spans={[
              { text: "One calm sentence." },
              { text: "No over-explaining.", italic: true, green: true },
            ]}
            fontSize={72}
            startFrame={301 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_11.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={301 * fps}
          />
        </>
      )}

      {/* Scene 6.2: 325s - 345s ("My face goes flat when I'm thinking") */}
      {currentSec >= 325 && currentSec < 345 && (
        <>
          <EditorialText
            spans={[
              { text: "“My face goes flat" },
              { text: "when I'm thinking.”", italic: true, green: true },
            ]}
            fontSize={68}
            startFrame={325 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_16.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={325 * fps}
          />
        </>
      )}

      {/* Scene 6.3: 345s - 391s ("Reserved, not cold") */}
      {currentSec >= 345 && currentSec < 391 && (
        <>
          <EditorialText
            spans={[
              { text: "“Reserved," },
              { text: "not cold.”", italic: true, green: true },
            ]}
            fontSize={88}
            startFrame={345 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_6.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={345 * fps}
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 07: THE QUESTION (391s -> 410s / 23460 -> 24600 frames)           */}
      {/* ========================================================================= */}

      {/* Scene 7.1: 391s - 410s (Are you kind or evil? Watch what I do) */}
      {currentSec >= 391 && currentSec < 410 && (
        <>
          <EditorialText
            spans={[
              { text: "“Watch what I do," },
              { text: "not how I look.”", italic: true, green: true },
            ]}
            fontSize={68}
            startFrame={391 * fps}
            top="36%"
            left="80px"
          />
          <div
            style={{
              position: "absolute",
              right: "40px",
              bottom: "0px",
              width: "720px",
              height: "920px",
              zIndex: 20,
            }}
          >
            <GlitchSlice imageSrc={staticFile("zyph/poker_glitch.png")} activeGlitch />
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 08: THE CONCLUSION (410s -> 449s / 24600 -> end)                  */}
      {/* ========================================================================= */}

      {/* Scene 8.1: 410s - 430s (Keep it for high stakes moments) */}
      {currentSec >= 410 && currentSec < 430 && (
        <>
          <EditorialText
            spans={[
              { text: "Keep it for" },
              { text: "high-stakes moments.", italic: true, green: true },
            ]}
            fontSize={74}
            startFrame={410 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_5.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={410 * fps}
          />
        </>
      )}

      {/* Scene 8.2: 430s - end (Drop it everywhere else) */}
      {currentSec >= 430 && (
        <>
          <EditorialText
            spans={[
              { text: "Drop it" },
              { text: "everywhere else.", italic: true, green: true },
            ]}
            fontSize={78}
            startFrame={430 * fps}
            top="36%"
            left="80px"
          />
          <ZyphStage
            imageSrc={staticFile("zyph/zyph_19.png")}
            align="right"
            zoomDirection="subtle-in"
            heightPercent={92}
            entranceFrame={430 * fps}
          />
        </>
      )}
    </div>
  );
};
