import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants";

interface CameraHUDProps {
  label?: string;
  showRec?: boolean;
}

export const CameraHUD: React.FC<CameraHUDProps> = ({
  label = "ANALYTICS: ACTIVE",
  showRec = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const isBlink = Math.floor(frame / 30) % 2 === 0;
  const currentSec = frame / fps;
  const mm = Math.floor(currentSec / 60).toString().padStart(2, "0");
  const ss = Math.floor(currentSec % 60).toString().padStart(2, "0");
  const ff = Math.floor(frame % fps).toString().padStart(2, "0");

  const cornerSize = 24;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* Subtle Technical Grid Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.045) 1px, transparent 0)
          `,
          backgroundSize: "48px 48px",
          opacity: 0.8,
        }}
      />

      {/* 4 Corner Crosshairs */}
      {/* Top Left */}
      <div style={{ position: "absolute", top: "24px", left: "24px", width: cornerSize, height: cornerSize, borderTop: "2px solid rgba(0,0,0,0.18)", borderLeft: "2px solid rgba(0,0,0,0.18)" }} />
      {/* Top Right */}
      <div style={{ position: "absolute", top: "24px", right: "24px", width: cornerSize, height: cornerSize, borderTop: "2px solid rgba(0,0,0,0.18)", borderRight: "2px solid rgba(0,0,0,0.18)" }} />
      {/* Bottom Left */}
      <div style={{ position: "absolute", bottom: "24px", left: "24px", width: cornerSize, height: cornerSize, borderBottom: "2px solid rgba(0,0,0,0.18)", borderLeft: "2px solid rgba(0,0,0,0.18)" }} />
      {/* Bottom Right */}
      <div style={{ position: "absolute", bottom: "24px", right: "24px", width: cornerSize, height: cornerSize, borderBottom: "2px solid rgba(0,0,0,0.18)", borderRight: "2px solid rgba(0,0,0,0.18)" }} />

      {/* Top Right Live Telemetry */}
      <div
        style={{
          position: "absolute",
          top: "48px",
          right: "64px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {showRec && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: isBlink ? COLORS.accentRed : "transparent",
                boxShadow: isBlink ? "0 0 8px rgba(229,57,53,0.8)" : "none",
              }}
            />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: isBlink ? COLORS.accentRed : COLORS.subtle,
              }}
            >
              REC
            </span>
          </div>
        )}

        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: COLORS.muted,
          }}
        >
          TC [{mm}:{ss}:{ff}]
        </span>

        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: COLORS.subtle,
          }}
        >
          60.00 FPS
        </span>
      </div>
    </div>
  );
};
