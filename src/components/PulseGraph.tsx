import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants";

interface PulseGraphProps {
  bpm?: number;
  label?: string;
  stressLevel?: string;
  bottom?: string | number;
  left?: string | number;
}

export const PulseGraph: React.FC<PulseGraphProps> = ({
  bpm = 62,
  label = "VAGAL NERVE: STABLE",
  stressLevel = "12% [NOMINAL]",
  bottom = "42px",
  left = "380px",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Create an animated ECG waveform
  const points: string[] = [];
  const width = 240;
  const height = 40;
  const numSamples = 40;

  for (let i = 0; i <= numSamples; i++) {
    const x = (i / numSamples) * width;
    const phase = (i * 0.4 - frame * 0.15) % (Math.PI * 2);
    // ECG peak pattern
    let y = height / 2;
    const sinVal = Math.sin(phase);
    if (sinVal > 0.8) {
      y -= 18; // sharp QRS peak
    } else if (sinVal < -0.8) {
      y += 8;
    } else {
      y += Math.sin(phase * 2) * 2;
    }
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  const pathData = `M ${points.join(" L ")}`;

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left,
        display: "flex",
        alignItems: "center",
        gap: "18px",
        backgroundColor: "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(10px)",
        padding: "8px 16px",
        borderRadius: "10px",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
        pointerEvents: "none",
        zIndex: 42,
      }}
    >
      {/* Animated SVG Waveform */}
      <svg width={width} height={height} style={{ overflow: "visible" }}>
        <path
          d={pathData}
          fill="none"
          stroke="#00C853"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Metric Labels */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: FONTS.mono, fontSize: "12px", fontWeight: 900, color: COLORS.fg }}>
            {bpm} BPM
          </span>
          <span style={{ fontFamily: FONTS.mono, fontSize: "10px", fontWeight: 800, color: "#00C853" }}>
            {stressLevel}
          </span>
        </div>
        <span style={{ fontFamily: FONTS.mono, fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", color: COLORS.muted }}>
          {label}
        </span>
      </div>
    </div>
  );
};
