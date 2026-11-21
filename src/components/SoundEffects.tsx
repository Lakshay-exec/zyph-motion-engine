import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { SoundCue } from "../types.js";

interface SoundEffectsProps {
  cues: SoundCue[];
}

export const SoundEffects: React.FC<SoundEffectsProps> = ({ cues }) => {
  return (
    <>
      {cues.map((cue, idx) => (
        <Sequence
          key={`sfx-${cue.src}-${cue.frame}-${idx}`}
          from={cue.frame}
          durationInFrames={30} // Short SFX
        >
          <Audio
            src={staticFile(cue.src)}
            volume={cue.volume ?? 0.6}
          />
        </Sequence>
      ))}
    </>
  );
};
