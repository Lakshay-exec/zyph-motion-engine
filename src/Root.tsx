import React from "react";
import { Composition, Still } from "remotion";
import { PokerFaceLong } from "./compositions/PokerFaceLong";
import { PokerFaceShort } from "./compositions/PokerFaceShort";
import { PokerFaceThumb } from "./compositions/PokerFaceThumb";
import { FPS } from "./constants";

export const Root: React.FC = () => {
  return (
    <>
      {/* 9:16 Vertical Short (1080x1920, 60fps, 36 seconds = 2160 frames) */}
      <Composition
        id="PokerFaceShort"
        component={PokerFaceShort}
        durationInFrames={36 * FPS}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* 16:9 Long-Form Masterclass (1920x1080, 60fps, 449 seconds = 26,940 frames - Entire Voiceover!) */}
      <Composition
        id="PokerFaceLong"
        component={PokerFaceLong}
        durationInFrames={449 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* 1280x720 High-CTR Thumbnail (<Still>) matching the iconic POKER slice glitch */}
      <Still
        id="PokerFaceThumb"
        component={PokerFaceThumb}
        width={1280}
        height={720}
      />
    </>
  );
};
