import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants";

interface CountdownCircleProps {
  startFrame: number;
  durationInFrames: number;
  initialSeconds?: number;
}

export const CountdownCircle: React.FC<CountdownCircleProps> = ({
  startFrame,
  durationInFrames,
  initialSeconds = 20,
}) => {
  const frame = useCurrentFrame();
  const relFrame = frame - startFrame;

  if (relFrame < 0 || relFrame > durationInFrames) {
    return null;
  }

  const progress = Math.min(1, Math.max(0, relFrame / durationInFrames));
  const remainingSeconds = Math.max(0, Math.ceil(initialSeconds * (1 - progress)));

  const size = 80;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div
      style={{
        position: "absolute",
        top: "48px",
        right: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        zIndex: 50,
      }}
    >
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(0, 0, 0, 0.08)"
            strokeWidth={strokeWidth}
          />
          {/* Animated Green Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={COLORS.accentGreen}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>

        {/* Number in center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONTS.editorialSerif,
            fontSize: "26px",
            fontWeight: 700,
            color: COLORS.fg,
          }}
        >
          {remainingSeconds}
        </div>
      </div>

      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: COLORS.muted,
          textTransform: "uppercase",
        }}
      >
        SKIP AHEAD
      </span>
    </div>
  );
};
