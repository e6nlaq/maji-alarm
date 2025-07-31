"use client";

import { getSoundFiles } from "@/lib/sounds";
import useSound from "use-sound";
import { forwardRef, useImperativeHandle } from "react";

export function SoundProvider() {
  const _paths = getSoundFiles();
}

export interface SoundRef {
  play: () => void;
  stop: () => void;
}

export const Sound = forwardRef<SoundRef, { path: string }>(({ path }, ref) => {
  const [play, { stop }] = useSound(path);

  useImperativeHandle(ref, () => ({
    play,
    stop,
  }));

  return null;
});

Sound.displayName = "Sound";