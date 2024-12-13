"use client";

import Realistic from "react-canvas-confetti/dist/presets/realistic"

export function Confetti() {
  return <Realistic autorun={{ speed: .5 }} />;
}