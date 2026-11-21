import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants.js";

interface FloatingCardProps {
  tag: string;
  title: string;
  description?: string;
  startFrame: number;
  durationInFrames: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  accent?: boolean;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  tag,
  title,
  description,
  startFrame,
  durationInFrames,
  top,
  left,
  right,
  bottom,
  accent = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame - startFrame;
  if (relFrame < 0 || relFrame > durationInFrames) {
    return null;
  }

  // Spring entrance
  const entrance = spring({
    frame: relFrame,
    fps,
    config: {
      damping: 13,
      mass: 0.6,
      stiffness: 120,
    },
  });

  // Fade out at end
  const exitFrames = 10;
  const exitProgress = Math.max(0, relFrame - (durationInFrames - exitFrames));
  const exitOpacity = interpolate(exitProgress, [0, exitFrames], [1, 0], {
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entrance, [0, 1], [30, 0]);
  const scale = interpolate(entrance, [0, 1], [0.88, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        zIndex: 40,
        opacity: entrance * exitOpacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.cardBg,
          backdropFilter: "blur(16px)",
          border: `1.5px solid ${COLORS.cardBorder}`,
          borderRadius: "14px",
          padding: "16px 22px",
          boxShadow: "0 14px 40px -8px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          minWidth: "220px",
          maxWidth: "340px",
        }}
      >
        {/* Header Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Stark Geometric Red Accent Element */}
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: accent ? COLORS.accentRed : COLORS.fg,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: accent ? COLORS.accentRed : COLORS.muted,
            }}
          >
            {tag}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: "20px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: COLORS.fg,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>

        {/* Optional Description */}
        {description && (
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: "13px",
              fontWeight: 500,
              color: COLORS.muted,
              lineHeight: 1.35,
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
