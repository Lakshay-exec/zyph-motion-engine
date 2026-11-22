import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants";

interface TimelineSliderProps {
  startFrame: number;
  durationInFrames: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
}

export const TimelineSlider: React.FC<TimelineSliderProps> = ({
  startFrame,
  durationInFrames,
  top,
  left,
  right,
  bottom,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame - startFrame;
  if (relFrame < 0 || relFrame > durationInFrames) {
    return null;
  }

  const entrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 100 },
  });

  // Slider travels from 0% to 100% over the duration
  const progress = interpolate(relFrame, [0, durationInFrames * 0.75], [0, 100], {
    extrapolateRight: "clamp",
  });

  const currentTime = (progress / 100) * 3.0;

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [24, 0])}px)`,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(14px)",
        border: "1.5px solid rgba(0, 0, 0, 0.08)",
        borderRadius: "16px",
        padding: "20px 28px",
        boxShadow: "0 14px 40px rgba(0, 0, 0, 0.07)",
        minWidth: "520px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        zIndex: 44,
        pointerEvents: "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: COLORS.fg,
          }}
        >
          THE 3-SECOND COGNITIVE PAUSE
        </span>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "16px",
            fontWeight: 900,
            color: COLORS.accentGreen,
          }}
        >
          +{currentTime.toFixed(2)}s
        </span>
      </div>

      {/* Main Track with 3 Milestones */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "8px",
          backgroundColor: "rgba(0, 0, 0, 0.06)",
          borderRadius: "4px",
        }}
      >
        {/* Filled Progress */}
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: COLORS.accentGreen,
            borderRadius: "4px",
            boxShadow: "0 0 10px rgba(0, 200, 83, 0.5)",
          }}
        />

        {/* Moving Cursor */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${progress}%`,
            transform: "translate(-50%, -50%)",
            width: "18px",
            height: "18px",
            backgroundColor: "#FFFFFF",
            border: `3px solid ${COLORS.accentGreen}`,
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>

      {/* Milestones Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2px" }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: "10px", fontWeight: 700, color: COLORS.muted }}>
          0.0s · PROMPT
        </span>
        <span style={{ fontFamily: FONTS.mono, fontSize: "10px", fontWeight: 700, color: COLORS.muted }}>
          1.5s · VAGAL BRAKE
        </span>
        <span style={{ fontFamily: FONTS.mono, fontSize: "10px", fontWeight: 700, color: COLORS.accentGreen }}>
          3.0s · MEASURED RESPONSE
        </span>
      </div>
    </div>
  );
};
