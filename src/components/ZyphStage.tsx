import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

interface ZyphStageProps {
  imageSrc: string;
  align?: "left" | "right" | "center";
  zoomScale?: number;
  zoomDirection?: "subtle-in" | "in" | "out" | "static";
  shadowWidth?: number;
  shadowOpacity?: number;
  heightPercent?: number;
  entranceFrame?: number;
  horizontalOffset?: number; // percent
}

export const ZyphStage: React.FC<ZyphStageProps> = ({
  imageSrc,
  align = "right",
  zoomScale = 1.20, // Scaled up significantly for heroic presence
  zoomDirection = "subtle-in",
  shadowWidth = 620,
  shadowOpacity = 0.38,
  heightPercent = 100, // Fills full vertical canvas
  entranceFrame = 0,
  horizontalOffset = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - entranceFrame);

  // Smooth spring entrance
  const entrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 75 },
  });

  // Slow continuous camera drift
  let cameraScale = 1.0;
  if (zoomDirection === "subtle-in") {
    cameraScale = interpolate(relFrame, [0, 500], [1.0, 1.05], {
      extrapolateRight: "clamp",
    });
  } else if (zoomDirection === "in") {
    cameraScale = interpolate(relFrame, [0, 300], [1.0, 1.10], {
      extrapolateRight: "clamp",
    });
  } else if (zoomDirection === "out") {
    cameraScale = interpolate(relFrame, [0, 300], [1.08, 1.0], {
      extrapolateRight: "clamp",
    });
  }

  const finalScale = zoomScale * cameraScale * (0.96 + 0.04 * entrance);
  const opacity = interpolate(relFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const justify =
    align === "left"
      ? "flex-start"
      : align === "right"
      ? "flex-end"
      : "center";

  const paddingSide =
    align === "left"
      ? { paddingLeft: "40px" }
      : align === "right"
      ? { paddingRight: "40px" }
      : {};

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: justify,
        overflow: "hidden",
        opacity,
        pointerEvents: "none",
        ...paddingSide,
      }}
    >
      <div
        style={{
          position: "relative",
          height: `${heightPercent}%`,
          maxWidth: "70%", // Expanded so arms and posture breathe
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          transform: `translateX(${horizontalOffset}%) scale(${finalScale})`,
          transformOrigin: "bottom center",
        }}
      >
        {/* Soft 3D Ground Shadow */}
        <div
          style={{
            position: "absolute",
            bottom: "0%",
            width: `${shadowWidth}px`,
            height: "48px",
            borderRadius: "50%",
            background: `radial-gradient(ellipse at center, rgba(0,0,0,${shadowOpacity}) 0%, rgba(0,0,0,${shadowOpacity * 0.4}) 45%, rgba(0,0,0,0) 72%)`,
            filter: "blur(9px)",
            transform: `scale(${cameraScale}, 0.55)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Zyph Mannequin - True Transparent Alpha Cutout */}
        <Img
          src={imageSrc}
          alt="Zyph Mannequin"
          style={{
            position: "relative",
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            zIndex: 2,
            filter: "contrast(1.04) brightness(0.99)",
          }}
        />
      </div>
    </div>
  );
};
