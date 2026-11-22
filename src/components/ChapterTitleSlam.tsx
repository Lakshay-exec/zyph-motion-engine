import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants";

interface ChapterTitleSlamProps {
  number: string;
  title: string;
  subtitle?: string;
  startFrame: number;
  durationInFrames?: number; // default ~70 frames (1.15s)
}

export const ChapterTitleSlam: React.FC<ChapterTitleSlamProps> = ({
  number,
  title,
  subtitle = "ZYPH STRATEGIC PROTOCOL",
  startFrame,
  durationInFrames = 72,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame - startFrame;
  if (relFrame < 0 || relFrame > durationInFrames) {
    return null;
  }

  // Slam entrance spring
  const scale = spring({
    frame: relFrame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 140 },
  });

  // Fade out transition
  const fadeOutStart = durationInFrames - 14;
  const opacity = interpolate(
    relFrame,
    [0, 6, fadeOutStart, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const translateY = interpolate(scale, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 55,
        opacity,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          transform: `translateY(${translateY}px) scale(${0.92 + 0.08 * scale})`,
        }}
      >
        {/* Top Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
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
              color: COLORS.muted,
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </span>
        </div>

        {/* Big Roman / Number Headline */}
        <span
          style={{
            fontFamily: FONTS.editorialSerif,
            fontSize: "130px",
            fontWeight: 900,
            lineHeight: 0.9,
            color: COLORS.fg,
            letterSpacing: "-0.04em",
          }}
        >
          {number}
        </span>

        {/* Animated Green Divider Line */}
        <div
          style={{
            width: `${scale * 160}px`,
            height: "4px",
            backgroundColor: COLORS.accentGreen,
            borderRadius: "2px",
          }}
        />

        {/* Chapter Title */}
        <span
          style={{
            fontFamily: FONTS.sans,
            fontSize: "26px",
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: COLORS.fg,
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
};
