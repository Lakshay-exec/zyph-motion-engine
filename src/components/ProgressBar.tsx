import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

interface ProgressBarProps {
  top?: string;
  bottom?: string;
  height?: number;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  top,
  bottom = "0px",
  height = 5,
  color = COLORS.fg,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = Math.min(100, Math.max(0, (frame / durationInFrames) * 100));

  return (
    <div
      style={{
        position: "absolute",
        top,
        bottom,
        left: 0,
        right: 0,
        height: `${height}px`,
        backgroundColor: "rgba(0, 0, 0, 0.06)",
        zIndex: 60,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: color,
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
};
