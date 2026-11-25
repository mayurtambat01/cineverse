"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CinematicAnimations = dynamic(() => import("./CinematicAnimations"), {
  ssr: false,
});

export default function AnimationLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return <CinematicAnimations />;
}
