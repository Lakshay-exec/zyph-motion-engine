import React from "react";
import { Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { GlitchSlice } from "../components/GlitchSlice";
import { ZyphStage } from "../components/ZyphStage";
import { COLORS, FONTS } from "../constants";

export const PokerFaceShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig(); // 60 FPS
  const currentSec = frame / fps;

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
      {/* 1. Voiceover Audio */}
      <Audio src={staticFile("audio/voiceover.mp3")} startFrom={0} />

      {/* 2. Top Editorial Header */}
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

      {/* 3. Dynamic Vertical Scenes */}

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

          <div
            style={{
              position: "absolute",
              bottom: "0px",
              left: 0,
              right: 0,
              height: "1280px",
            }}
          >
            <ZyphStage
              imageSrc={staticFile("zyph/zyph_11.png")}
              align="center"
              zoomDirection="subtle-in"
              heightPercent={96}
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

          <div
            style={{
              position: "absolute",
              bottom: "0px",
              left: 0,
              right: 0,
              height: "1280px",
            }}
          >
            <ZyphStage
              imageSrc={staticFile("zyph/zyph_18.png")}
              align="center"
              zoomDirection="subtle-in"
              heightPercent={96}
              entranceFrame={6 * fps}
            />
          </div>
        </>
      )}

      {/* Scene 3: 14s - 21s ("Bored." - Iconic display punch) */}
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

          <div
            style={{
              position: "absolute",
              bottom: "0px",
              left: 0,
              right: 0,
              height: "1350px",
            }}
          >
            <ZyphStage
              imageSrc={staticFile("zyph/zyph_2.png")}
              align="center"
              zoomDirection="subtle-in"
              heightPercent={96}
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
                    height: "5px",
                    width: "100%",
                    backgroundColor: COLORS.accentGreen,
                    borderRadius: "3px",
                  }}
                />
              </span>
            </h1>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "0px",
              left: 0,
              right: 0,
              height: "1320px",
            }}
          >
            <ZyphStage
              imageSrc={staticFile("zyph/zyph_13.png")}
              align="center"
              zoomDirection="subtle-in"
              heightPercent={96}
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
