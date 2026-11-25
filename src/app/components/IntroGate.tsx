"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import DeveloperIntro from "./DeveloperIntro";

type IntroGateProps = {
  children: ReactNode;
};

const INTRO_STORAGE_KEY = "cineverse_intro_seen";

export default function IntroGate({ children }: IntroGateProps) {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const hasSeenIntro = sessionStorage.getItem(INTRO_STORAGE_KEY);

      setShowIntro(hasSeenIntro !== "true");
    } catch {
      setShowIntro(true);
    }
  }, []);

  function handleEnter() {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    } catch {
      // Allow visitors to continue if storage is unavailable.
    }

    setShowIntro(false);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }

  // Prevent the homepage from flashing before the introduction.
  if (showIntro === null) {
    return <div className="min-h-[100svh] bg-[#08080c]" aria-busy="true" />;
  }

  // Display the developer introduction.
  if (showIntro) {
    return <DeveloperIntro onEnter={handleEnter} />;
  }

  // Display the existing Cineverse website.
  return <>{children}</>;
}
