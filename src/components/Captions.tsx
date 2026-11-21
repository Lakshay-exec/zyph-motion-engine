import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants";
import { WordTimestamp } from "../types";

interface CaptionsProps {
  words: WordTimestamp[];
  audioStartTime?: number; // offset in seconds if audio has offset
  bottomOffset?: string;
  maxWordsPerChunk?: number;
}

interface Chunk {
  words: WordTimestamp[];
  start: number;
  end: number;
}

export const Captions: React.FC<CaptionsProps> = ({
  words,
  bottomOffset = "18%",
  maxWordsPerChunk = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Group words into short 3-4 word kinetic chunks
  const chunks: Chunk[] = React.useMemo(() => {
    const result: Chunk[] = [];
    if (!words || words.length === 0) return result;

    for (let i = 0; i < words.length; i += maxWordsPerChunk) {
      const slice = words.slice(i, i + maxWordsPerChunk);
      const start = slice[0].start;
      const end = slice[slice.length - 1].end + 0.15;
      result.push({ words: slice, start, end });
    }
    return result;
  }, [words, maxWordsPerChunk]);

  // Find active chunk
  const activeChunk = chunks.find(
    (c) => currentTime >= c.start && currentTime <= c.end + 0.1
  );

  if (!activeChunk) {
    return null;
  }

  const chunkStartFrame = Math.round(activeChunk.start * fps);
  const pop = spring({
    frame: frame - chunkStartFrame,
    fps,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 140,
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: bottomOffset,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
        pointerEvents: "none",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px 14px",
          transform: `scale(${0.9 + 0.1 * pop})`,
          transformOrigin: "center center",
          maxWidth: "900px",
        }}
      >
        {activeChunk.words.map((w, idx) => {
          const isActive = currentTime >= w.start && currentTime <= w.end + 0.08;
          const isPassed = currentTime > w.end + 0.08;

          return (
            <span
              key={`${w.word}-${idx}`}
              style={{
                fontFamily: FONTS.sans,
                fontSize: "44px",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                padding: "4px 14px",
                borderRadius: "8px",
                backgroundColor: isActive ? COLORS.darkPill : "transparent",
                color: isActive
                  ? COLORS.darkPillText
                  : isPassed
                  ? COLORS.fg
                  : "rgba(10, 10, 10, 0.35)",
                transform: isActive ? "scale(1.05)" : "scale(1.0)",
                transition: "all 0.08s ease",
                boxShadow: isActive
                  ? "0 8px 24px rgba(0, 0, 0, 0.22)"
                  : "none",
                display: "inline-block",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
