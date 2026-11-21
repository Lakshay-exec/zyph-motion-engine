import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants";

export interface TextSpan {
  text: string;
  italic?: boolean;
  green?: boolean;
  strikethrough?: boolean;
  newline?: boolean;
}

interface EditorialTextProps {
  chapter?: string;
  spans: TextSpan[];
  fontSize?: number;
  startFrame: number;
  align?: "left" | "right";
  top?: string;
  left?: string;
  right?: string;
  maxWidth?: string;
}

export const EditorialText: React.FC<EditorialTextProps> = ({
  chapter,
  spans,
  fontSize = 68,
  startFrame,
  align = "left",
  top = "35%",
  left = "80px",
  right,
  maxWidth = "750px",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  const entrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 100 },
  });

  const translateY = interpolate(entrance, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        maxWidth,
        zIndex: 30,
        opacity: entrance,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        textAlign: align,
      }}
    >
      {/* Chapter Tag with Green Dash */}
      {chapter && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: align === "right" ? "flex-end" : "flex-start",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "3px",
              backgroundColor: COLORS.accentGreen,
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: COLORS.muted,
            }}
          >
            {chapter}
          </span>
        </div>
      )}

      {/* Main Editorial Serif Display Text */}
      <h1
        style={{
          fontFamily: FONTS.editorialSerif,
          fontSize: `${fontSize}px`,
          fontWeight: 700,
          lineHeight: 1.15,
          color: COLORS.fg,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        {spans.map((s, idx) => {
          // Strikethrough line progress
          const strikeProgress = s.strikethrough
            ? interpolate(relFrame, [15, 35], [0, 100], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              })
            : 0;

          return (
            <React.Fragment key={`span-${idx}`}>
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  fontStyle: s.italic ? "italic" : "normal",
                  color: s.green ? COLORS.accentGreen : COLORS.fg,
                  fontWeight: s.italic ? 800 : 700,
                }}
              >
                {s.text}
                {s.strikethrough && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "55%",
                      height: "4px",
                      width: `${strikeProgress}%`,
                      backgroundColor: COLORS.accentGreen,
                      borderRadius: "2px",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </span>
              {s.newline ? <br /> : " "}
            </React.Fragment>
          );
        })}
      </h1>
    </div>
  );
};
