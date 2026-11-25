"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CinematicAnimations() {
  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    const frame = window.requestAnimationFrame(() => {
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      ctx = gsap.context(() => {
        // 1. Navbar entrance animation
        gsap.fromTo(
          ".cine-navbar",
          {
            opacity: 0,
            y: -20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
        );

        // 2. Hero cinematic animations
        const heroElements = [
          ".hero-label",
          ".hero-heading",
          ".hero-description",
          ".hero-button",
        ];

        heroElements.forEach((selector, index) => {
          const element = document.querySelector(selector);

          if (!element) return;

          gsap.fromTo(
            element,
            {
              opacity: 1,
              y: 15,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.08,
              ease: "power2.out",
            },
          );
        });

        // 3. Movie card scroll animations
        const movieCards = gsap.utils.toArray<HTMLElement>(".movie-card");

        movieCards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      });

      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      ctx?.revert();
    };
  }, []);

  return null;
}
