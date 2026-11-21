import React from "react";
import { Img, staticFile } from "remotion";
import { COLORS } from "../constants";

export const PokerFaceThumb: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: 1280,
        height: 720,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 1. Base Master Artwork Sliced Glitch Composite */}
      <Img
        src={staticFile("zyph/poker_glitch.png")}
        alt="Poker Face Slice Glitch Thumbnail"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
};
