export interface WordTimestamp {
  word: string;
  start: number;
  end: number;
}

export interface Segment {
  id: number;
  start: number;
  end: number;
  text: string;
  words: WordTimestamp[];
}

export interface CalloutCardData {
  tag: string;
  title: string;
  description?: string;
  startFrame: number;
  durationInFrames: number;
  position?: "top-left" | "top-right" | "center-right" | "bottom-right";
}

export interface DiagramPoint {
  label: string;
  value: string;
  active?: boolean;
}

export interface SoundCue {
  src: string;
  frame: number;
  volume?: number;
}
