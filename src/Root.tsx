import React from "react";
import { Composition, Still } from "remotion";
import { PokerFaceLong } from "./compositions/PokerFaceLong";
import { PokerFaceShort } from "./compositions/PokerFaceShort";
import { PokerFaceThumb } from "./compositions/PokerFaceThumb";

export const Root: React.FC = () => {
  return (
    <>
      {/* 9:16 Vertical Short (1080x1920, 30fps, 37 seconds = 1110 frames) */}
      <Composition
        id="PokerFaceShort"
        component={PokerFaceShort}
        durationInFrames={1110}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 16:9 Long-Form Masterclass (1920x1080, 30fps, 65 seconds = 1950 frames) */}
      <Composition
        id="PokerFaceLong"
        component={PokerFaceLong}
        durationInFrames={1950}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 1280x720 High-CTR Thumbnail (<Still>) */}
      <Still
        id="PokerFaceThumb"
        component={PokerFaceThumb}
        width={1280}
        height={720}
      />
    </>
  );
};
