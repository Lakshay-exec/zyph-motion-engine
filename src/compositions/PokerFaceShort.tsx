import React from "react";
import { Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraHUD } from "../components/CameraHUD";
import { FloatingCard } from "../components/FloatingCard";
import { GlitchSlice } from "../components/GlitchSlice";
import { MetricMeter } from "../components/MetricMeter";
import { ScannerReticle } from "../components/ScannerReticle";
import { SoundEffects } from "../components/SoundEffects";
import { ZyphStage } from "../components/ZyphStage";
import { COLORS, FONTS } from "../constants";
import { SoundCue } from "../types";

export const PokerFaceShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig(); // 60 FPS
  const currentSec = frame / fps;

  const sfxCues: SoundCue[] = [
    { frame: 0, src: "sfx/thump.wav", volume: 0.8 },
    { frame: 15, src: "sfx/whoosh.wav", volume: 0.6 },
    { frame: 6 * fps, src: "sfx/shutter.wav", volume: 0.7 },
    { frame: 6 * fps + 10, src: "sfx/whoosh.wav", volume: 0.5 },
    { frame: 14 * fps, src: "sfx/thump.wav", volume: 0.9 },
    { frame: 14 * fps + 8, src: "sfx/glitch.wav", volume: 0.7 },
    { frame: 17 * fps, src: "sfx/ping.wav", volume: 0.6 },
    { frame: 21 * fps, src: "sfx/pop.wav", volume: 0.8 },
    { frame: 21 * fps + 12, src: "sfx/whoosh.wav", volume: 0.6 },
    { frame: 28 * fps, src: "sfx/ping.wav", volume: 0.5 },
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
      {/* 1. Voiceover Audio & Rich Sound FX */}
      <Audio src={staticFile("audio/voiceover.mp3")} startFrom={0} />
      <SoundEffects cues={sfxCues} />

      {/* 2. Technical Camera HUD Overlay (Crosshairs, Grid, REC, Timecode) */}
      <CameraHUD label="VERTICAL METRICS: ACTIVE" showRec />

      {/* 3. Top Editorial Header */}
      <div
        style={{
          position: "absolute",
          top: "88px",
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
              width: "18px",
              height: "4px",
              backgroundColor: COLORS.accentGreen,
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: "15px",
              fontWeight: 800,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: COLORS.muted,
            }}
          >
            01 · THE MISTAKE
          </span>
        </div>

        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "14px",
            fontWeight: 700,
            color: COLORS.subtle,
          }}
        >
          ZYPH LABS
        </span>
      </div>

      {/* 4. Dynamic Kinetic Scenes */}

      {/* Scene 1: 0 - 6s ("I spent years building the perfect poker face.") */}
      {currentSec < 6 && (
        <>
          <div
            style={{
              position: "absolute",
              top: "220px",
              left: "64px",
              right: "64px",
              zIndex: 30,
            }}
          >
            <h1
              style={{
                fontFamily: FONTS.editorialSerif,
                fontSize: "76px",
                fontWeight: 800,
                lineHeight: 1.1,
                color: COLORS.fg,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              I spent years building the{" "}
              <span style={{ fontStyle: "italic", color: COLORS.accentGreen }}>
                perfect
              </span>{" "}
              poker face.
            </h1>
          </div>

          <FloatingCard
            tag="ASSUMPTION"
            title="THE BLANK SLATE"
            description="We believe a flat face shows total emotional control."
            startFrame={40}
            durationInFrames={5 * fps}
            top="540px"
            left="64px"
          />

          {/* Hero Scaled Zyph Stage */}
          <div
            style={{
              position: "absolute",
              bottom: "0px",
              left: 0,
              right: 0,
              height: "1500px",
            }}
          >
            <ZyphStage
              imageSrc={staticFile("zyph/zyph_11.png")}
              align="center"
              zoomScale={1.35}
              heightPercent={100}
              shadowWidth={720}
              zoomDirection="subtle-in"
            />
          </div>
        </>
      )}

      {/* Scene 2: 6s - 14s ("Neutral face doesn't look neutral to everyone else.") */}
      {currentSec >= 6 && currentSec < 14 && (
        <>
          <div
            style={{
              position: "absolute",
              top: "220px",
              left: "64px",
              right: "64px",
              zIndex: 30,
            }}
          >
            <h1
              style={{
                fontFamily: FONTS.editorialSerif,
                fontSize: "68px",
                fontWeight: 800,
                lineHeight: 1.15,
                color: COLORS.fg,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Because a neutral face{" "}
              <span style={{ fontStyle: "italic", color: COLORS.accentGreen }}>
                doesn't look neutral
              </span>{" "}
              to everyone else.
            </h1>
          </div>

          {/* Live Facial Scanner HUD over Zyph */}
          <ScannerReticle
            top="460px"
            left="360px"
            width={360}
            height={380}
            targetLabel="NEUTRALITY SCAN"
            probability="OBSERVER GAP: 88%"
            statusText="DETECTED: SENSORY DEFENSE"
            startFrame={6 * fps}
          />

          <div
            style={{
              position: "absolute",
              bottom: "0px",
              left: 0,
              right: 0,
              height: "1500px",
            }}
          >
            <ZyphStage
              imageSrc={staticFile("zyph/zyph_18.png")}
              align="center"
              zoomScale={1.35}
              heightPercent={100}
              shadowWidth={720}
              zoomDirection="subtle-in"
              entranceFrame={6 * fps}
            />
          </div>
        </>
      )}

      {/* Scene 3: 14s - 21s ("Bored." - Display punch) */}
      {currentSec >= 14 && currentSec < 21 && (
        <>
          <div
            style={{
              position: "absolute",
              top: "200px",
              left: "64px",
              right: "64px",
              zIndex: 30,
            }}
          >
            <h1
              style={{
                fontFamily: FONTS.editorialSerif,
                fontSize: "150px",
                fontStyle: "italic",
                fontWeight: 900,
                color: COLORS.accentGreen,
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              Bored.
            </h1>
          </div>

          <MetricMeter
            label="PERCEPTION GAP"
            value={94}
            startFrame={15 * fps}
            top="480px"
            left="64px"
            color="#E53935"
          />

          <div
            style={{
              position: "absolute",
              bottom: "0px",
              left: 0,
              right: 0,
              height: "1520px",
            }}
          >
            <ZyphStage
              imageSrc={staticFile("zyph/zyph_2.png")}
              align="center"
              zoomScale={1.38}
              heightPercent={100}
              shadowWidth={740}
              zoomDirection="subtle-in"
              entranceFrame={14 * fps}
            />
          </div>
        </>
      )}

      {/* Scene 4: 21s - 36s ("Today, no basics." with strikethrough & pointer) */}
      {currentSec >= 21 && (
        <>
          <div
            style={{
              position: "absolute",
              top: "220px",
              left: "64px",
              right: "64px",
              zIndex: 30,
            }}
          >
            <h1
              style={{
                fontFamily: FONTS.editorialSerif,
                fontSize: "88px",
                fontWeight: 800,
                lineHeight: 1.1,
                color: COLORS.fg,
                margin: 0,
              }}
            >
              Today, no{" "}
              <span
                style={{
                  position: "relative",
                  color: COLORS.muted,
                  display: "inline-block",
                }}
              >
                basics.
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "55%",
                    height: "6px",
                    width: "100%",
                    backgroundColor: COLORS.accentGreen,
                    borderRadius: "3px",
                  }}
                />
              </span>
            </h1>
          </div>

          <FloatingCard
            tag="FRAMEWORK"
            title="SELECTIVE EXPRESSION"
            description="Control what they perceive, not what you suppress."
            startFrame={22 * fps}
            durationInFrames={12 * fps}
            top="480px"
            left="64px"
          />

          <div
            style={{
              position: "absolute",
              bottom: "0px",
              left: 0,
              right: 0,
              height: "1520px",
            }}
          >
            <ZyphStage
              imageSrc={staticFile("zyph/zyph_13.png")}
              align="center"
              zoomScale={1.35}
              heightPercent={100}
              shadowWidth={720}
              zoomDirection="subtle-in"
              entranceFrame={21 * fps}
            />
          </div>
        </>
      )}

      {/* Bottom Progress Line */}
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: 0,
          right: 0,
          height: "6px",
          backgroundColor: "rgba(0,0,0,0.06)",
          zIndex: 50,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(100, (currentSec / 36) * 100)}%`,
            backgroundColor: COLORS.accentGreen,
          }}
        />
      </div>
    </div>
  );
};
