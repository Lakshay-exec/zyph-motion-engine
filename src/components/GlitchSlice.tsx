import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface GlitchSliceProps {
  imageSrc: string;
  slices?: number; // number of horizontal slices
  intensity?: number; // pixel offset range
  scanlines?: boolean;
  activeGlitch?: boolean;
  style?: React.CSSProperties;
}

export const GlitchSlice: React.FC<GlitchSliceProps> = ({
  imageSrc,
  slices = 4,
  intensity = 22,
  scanlines = true,
  activeGlitch = false,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Predefined or animated horizontal slice offsets
  // Slices: top (0-28%), mid-upper (28-52%), mid-lower (52-74%), bottom (74-100%)
  const sliceConfigs = [
    { top: 0, bottom: 72, offset: -intensity * 0.8 },
    { top: 28, bottom: 48, offset: intensity * 1.05 },
    { top: 52, bottom: 26, offset: -intensity * 0.5 },
    { top: 74, bottom: 0, offset: 0 },
  ];

  // Subtle glitch oscillation if active
  const twitch = activeGlitch
    ? Math.sin(frame * 0.4) * (frame % 15 < 3 ? 1.4 : 0.2)
    : 1;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Horizontal Slices */}
      {sliceConfigs.map((cfg, idx) => {
        const offset = cfg.offset * twitch;

        return (
          <div
            key={`slice-${idx}`}
            style={{
              position: "absolute",
              inset: 0,
              clipPath: `inset(${cfg.top}% 0% ${cfg.bottom}% 0%)`,
              transform: `translateX(${offset}px)`,
              transition: "transform 0.05s ease-out",
            }}
          >
            <Img
              src={imageSrc}
              alt="Glitch Slice"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />

            {/* Scanlines overlay on sliced bands */}
            {scanlines && idx === 1 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0px, rgba(0, 0, 0, 0.75) 3px, transparent 3px, transparent 7px)`,
                  mixBlendMode: "multiply",
                  pointerEvents: "none",
                }}
              />
            )}
            {scanlines && idx === 2 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0px, rgba(0, 0, 0, 0.6) 2px, transparent 2px, transparent 6px)`,
                  mixBlendMode: "multiply",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
