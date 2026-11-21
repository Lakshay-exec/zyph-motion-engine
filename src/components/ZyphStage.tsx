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
  zoomScale = 1.0,
  zoomDirection = "subtle-in",
  shadowWidth = 460,
  shadowOpacity = 0.32,
  heightPercent = 90,
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
    config: { damping: 14, mass: 0.8, stiffness: 80 },
  });

  // Slow continuous camera drift
  let cameraScale = 1.0;
  if (zoomDirection === "subtle-in") {
    cameraScale = interpolate(relFrame, [0, 400], [1.0, 1.06], {
      extrapolateRight: "clamp",
    });
  } else if (zoomDirection === "in") {
    cameraScale = interpolate(relFrame, [0, 240], [1.0, 1.12], {
      extrapolateRight: "clamp",
    });
  } else if (zoomDirection === "out") {
    cameraScale = interpolate(relFrame, [0, 240], [1.08, 1.0], {
      extrapolateRight: "clamp",
    });
  }

  const finalScale = zoomScale * cameraScale * (0.95 + 0.05 * entrance);
  const opacity = interpolate(relFrame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Justify content based on align
  const justify =
    align === "left"
      ? "flex-start"
      : align === "right"
      ? "flex-end"
      : "center";

  const paddingSide =
    align === "left"
      ? { paddingLeft: "60px" }
      : align === "right"
      ? { paddingRight: "60px" }
      : {};

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: justify,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        opacity,
        ...paddingSide,
      }}
    >
      <div
        style={{
          position: "relative",
          height: `${heightPercent}%`,
          maxWidth: "52%",
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
            bottom: "1%",
            width: `${shadowWidth}px`,
            height: "42px",
            borderRadius: "50%",
            background: `radial-gradient(ellipse at center, rgba(0,0,0,${shadowOpacity}) 0%, rgba(0,0,0,${shadowOpacity * 0.35}) 48%, rgba(0,0,0,0) 72%)`,
            filter: "blur(7px)",
            transform: `scale(${cameraScale}, 0.6)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Zyph Mannequin - Multiply blend over pure white */}
        <Img
          src={imageSrc}
          alt="Zyph Mannequin"
          style={{
            position: "relative",
            maxHeight: "98%",
            maxWidth: "100%",
            objectFit: "contain",
            mixBlendMode: "multiply",
            zIndex: 2,
            filter: "contrast(1.05) brightness(0.99)",
          }}
        />
      </div>
    </div>
  );
};
