import React from "react";
import { useCurrentFrame } from "remotion";

export const FilmGrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  // Procedural jitter seed
  const jitterX = (frame % 3) * 2;
  const jitterY = ((frame + 1) % 3) * 2;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 60,
        overflow: "hidden",
      }}
    >
      {/* Subtle Scanline Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0, 0, 0, 0.015) 3px, rgba(0, 0, 0, 0.015) 4px)",
          opacity: 0.75,
        }}
      />

      {/* Ambient Vignette - Soft Eggshell edge falloff */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0) 65%, rgba(0,0,0,0.035) 100%)",
        }}
      />
    </div>
  );
};
