import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants";

interface MetricMeterProps {
  label: string;
  value: number; // 0 to 100
  unit?: string;
  startFrame: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  color?: string;
}

export const MetricMeter: React.FC<MetricMeterProps> = ({
  label,
  value,
  unit = "%",
  startFrame,
  top,
  left,
  right,
  bottom,
  color = "#00C853",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  const entrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 100 },
  });

  const progress = interpolate(relFrame, [0, 45], [0, value], {
    extrapolateRight: "clamp",
  });

  const displayVal = Math.round(progress);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [20, 0])}px)`,
        backgroundColor: "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(12px)",
        border: "1.5px solid rgba(0, 0, 0, 0.08)",
        borderRadius: "14px",
        padding: "16px 20px",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: "260px",
        pointerEvents: "none",
        zIndex: 44,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: COLORS.fg,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "16px",
            fontWeight: 900,
            color,
          }}
        >
          {displayVal}{unit}
        </span>
      </div>

      {/* Progress Bar Track */}
      <div
        style={{
          width: "100%",
          height: "6px",
          backgroundColor: "rgba(0, 0, 0, 0.06)",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: "3px",
          }}
        />
      </div>
    </div>
  );
};
