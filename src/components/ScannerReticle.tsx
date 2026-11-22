import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants";

interface ScannerReticleProps {
  top: string | number;
  left?: string | number;
  right?: string | number;
  width?: number;
  height?: number;
  targetLabel?: string;
  statusText?: string;
  probability?: string;
  startFrame?: number;
}

export const ScannerReticle: React.FC<ScannerReticleProps> = ({
  top,
  left,
  right,
  width = 280,
  height = 320,
  targetLabel = "TARGET: SUB-EXPRESSION",
  statusText = "EMOTION: NULL [0.00]",
  probability = "NEUTRAL: 98.4%",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  // Entrance spring
  const scale = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });

  // Vertical scan line bounce (0 to height)
  const scanY = (Math.sin(relFrame * 0.08) * 0.5 + 0.5) * (height - 10);

  // Rotating outer crosshair
  const rot = (relFrame * 1.5) % 360;

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        width: `${width}px`,
        height: `${height}px`,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        pointerEvents: "none",
        zIndex: 45,
      }}
    >
      {/* 4 Tech Corner Brackets */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 20, height: 20, borderTop: "2px solid #00C853", borderLeft: "2px solid #00C853" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 20, height: 20, borderTop: "2px solid #00C853", borderRight: "2px solid #00C853" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 20, height: 20, borderBottom: "2px solid #00C853", borderLeft: "2px solid #00C853" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderBottom: "2px solid #00C853", borderRight: "2px solid #00C853" }} />

      {/* Sweeping Laser Scan Line */}
      <div
        style={{
          position: "absolute",
          top: `${scanY}px`,
          left: 4,
          right: 4,
          height: "2px",
          backgroundColor: "#00C853",
          boxShadow: "0 0 12px rgba(0, 200, 83, 0.8)",
          opacity: 0.85,
        }}
      />

      {/* Center Crosshair Target */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${rot}deg)`,
          width: 50,
          height: 50,
          border: "1.5px dashed rgba(0, 200, 83, 0.6)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 6,
          height: 6,
          backgroundColor: "#00C853",
          borderRadius: "50%",
          boxShadow: "0 0 8px rgba(0, 200, 83, 0.9)",
        }}
      />

      {/* Telemetry Labels */}
      <div
        style={{
          position: "absolute",
          bottom: "-48px",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(8px)",
          padding: "6px 10px",
          borderRadius: "6px",
          border: "1px solid rgba(0, 200, 83, 0.3)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: FONTS.mono, fontSize: "10px", fontWeight: 800, color: COLORS.fg, letterSpacing: "0.1em" }}>
            {targetLabel}
          </span>
          <span style={{ fontFamily: FONTS.mono, fontSize: "10px", fontWeight: 800, color: "#00C853" }}>
            {probability}
          </span>
        </div>
        <span style={{ fontFamily: FONTS.mono, fontSize: "9px", fontWeight: 600, color: COLORS.muted }}>
          {statusText}
        </span>
      </div>
    </div>
  );
};
