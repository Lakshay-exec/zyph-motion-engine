import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants";

interface AudioVisualizerProps {
  label?: string;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  numBars?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  label = "TONAL FREQUENCY SPECTRUM",
  top,
  left,
  right,
  bottom = "42px",
  numBars = 20,
}) => {
  const frame = useCurrentFrame();

  const bars = Array.from({ length: numBars }).map((_, i) => {
    // Generate organic pseudo-audio frequency heights based on frame and index
    const wave1 = Math.sin(frame * 0.2 + i * 0.4);
    const wave2 = Math.cos(frame * 0.15 + i * 0.8);
    const wave3 = Math.sin(frame * 0.35 + i * 0.2);
    const raw = (wave1 + wave2 + wave3) / 3;
    const height = Math.max(6, Math.min(42, Math.abs(raw) * 44 + 6));
    const isPeak = height > 32;

    return (
      <div
        key={`bar-${i}`}
        style={{
          width: "4px",
          height: `${height}px`,
          backgroundColor: isPeak ? COLORS.accentGreen : COLORS.fg,
          borderRadius: "2px",
          transition: "height 0.05s ease",
          opacity: 0.85,
        }}
      />
    );
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        display: "flex",
        alignItems: "center",
        gap: "14px",
        backgroundColor: "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(10px)",
        padding: "8px 18px",
        borderRadius: "10px",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.04)",
        pointerEvents: "none",
        zIndex: 42,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "3px",
          height: "44px",
        }}
      >
        {bars}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "11px",
            fontWeight: 800,
            color: COLORS.fg,
            letterSpacing: "0.08em",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "9px",
            fontWeight: 700,
            color: COLORS.accentGreen,
          }}
        >
          AUDIO SPECTRUM: LIVE
        </span>
      </div>
    </div>
  );
};
