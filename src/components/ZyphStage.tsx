import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

interface ZyphStageProps {
  imageSrc: string;
  panX?: number; // percentage offset
  panY?: number;
  zoomScale?: number;
  zoomDirection?: "in" | "out" | "subtle-in" | "static";
  shadowWidth?: number; // px or %
  shadowOpacity?: number;
  heightPercent?: number; // e.g. 75% of container
  entranceFrame?: number;
}

export const ZyphStage: React.FC<ZyphStageProps> = ({
  imageSrc,
  panX = 0,
  panY = 0,
  zoomScale = 1.0,
  zoomDirection = "subtle-in",
  shadowWidth = 380,
  shadowOpacity = 0.35,
  heightPercent = 78,
  entranceFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring entrance
  const entrance = spring({
    frame: frame - entranceFrame,
    fps,
    config: {
      damping: 14,
      mass: 0.8,
      stiffness: 90,
    },
  });

  // Slow cinematic camera push-in / pan
  const relativeFrame = Math.max(0, frame - entranceFrame);
  let cameraScale = 1.0;
  if (zoomDirection === "subtle-in") {
    cameraScale = interpolate(relativeFrame, [0, 300], [1.0, 1.07], {
      extrapolateRight: "clamp",
    });
  } else if (zoomDirection === "in") {
    cameraScale = interpolate(relativeFrame, [0, 180], [1.0, 1.15], {
      extrapolateRight: "clamp",
    });
  } else if (zoomDirection === "out") {
    cameraScale = interpolate(relativeFrame, [0, 180], [1.12, 1.0], {
      extrapolateRight: "clamp",
    });
  }

  const finalScale = zoomScale * cameraScale * (0.92 + 0.08 * entrance);
  const opacity = interpolate(relativeFrame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: COLORS.bg,
        overflow: "hidden",
      }}
    >
      {/* Container with camera pan & scale */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: `${heightPercent}%`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          transform: `translate(${panX}%, ${panY}%) scale(${finalScale})`,
          transformOrigin: "bottom center",
          opacity,
        }}
      >
        {/* Soft 3D Ground Shadow beneath feet */}
        <div
          style={{
            position: "absolute",
            bottom: "2%",
            width: `${shadowWidth}px`,
            height: "44px",
            borderRadius: "50%",
            background: `radial-gradient(ellipse at center, rgba(0, 0, 0, ${shadowOpacity}) 0%, rgba(0, 0, 0, ${shadowOpacity * 0.4}) 45%, rgba(0, 0, 0, 0) 72%)`,
            filter: "blur(6px)",
            transform: `scale(${cameraScale * 0.98}, 0.65)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Zyph Mannequin Image with CSS mix-blend-mode: multiply */}
        <Img
          src={imageSrc}
          alt="Zyph Mannequin"
          style={{
            position: "relative",
            maxHeight: "96%",
            maxWidth: "92%",
            objectFit: "contain",
            mixBlendMode: "multiply", // Zero box borders over pure #FFFFFF
            zIndex: 2,
            filter: "contrast(1.05) brightness(0.98)",
          }}
        />
      </div>
    </div>
  );
};
