import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants.js";

interface DiagramProps {
  chapter: string;
  headline: string;
  subtext: string;
  metrics: { label: string; value: string; progress: number }[];
  startFrame: number;
}

export const Diagram: React.FC<DiagramProps> = ({
  chapter,
  headline,
  subtext,
  metrics,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  const entrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 100 },
  });

  const translateY = interpolate(entrance, [0, 1], [40, 0]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        padding: "48px 56px",
        backgroundColor: COLORS.cardBg,
        border: `1.5px solid ${COLORS.border}`,
        borderRadius: "24px",
        boxShadow: "0 20px 60px -15px rgba(0, 0, 0, 0.08)",
        opacity: entrance,
        transform: `translateY(${translateY}px)`,
        maxWidth: "680px",
        width: "100%",
      }}
    >
      {/* Chapter Tag with Red Accent Square */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: COLORS.accentRed,
            borderRadius: "2px",
          }}
        />
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: COLORS.accentRed,
          }}
        >
          {chapter}
        </span>
      </div>

      {/* Headline & Subtext */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2
          style={{
            fontFamily: FONTS.sans,
            fontSize: "38px",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: COLORS.fg,
            textTransform: "uppercase",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: "17px",
            fontWeight: 500,
            color: COLORS.muted,
            lineHeight: 1.45,
            margin: 0,
          }}
        >
          {subtext}
        </p>
      </div>

      {/* Kinetic Metrics / Strategy Bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {metrics.map((m, idx) => {
          const itemSpring = spring({
            frame: relFrame - idx * 6,
            fps,
            config: { damping: 15, mass: 0.6, stiffness: 120 },
          });

          return (
            <div
              key={m.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                opacity: itemSpring,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: FONTS.mono,
                  fontSize: "13px",
                  fontWeight: 600,
                  color: COLORS.fg,
                }}
              >
                <span>{m.label}</span>
                <span style={{ color: COLORS.accentRed }}>{m.value}</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  backgroundColor: "rgba(0,0,0,0.06)",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${m.progress * itemSpring}%`,
                    height: "100%",
                    backgroundColor: COLORS.fg,
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
