"use client";

import Image from "next/image";

type DeveloperIntroProps = {
  onEnter: () => void;
};

export default function DeveloperIntro({ onEnter }: DeveloperIntroProps) {
  return (
    <section className="relative isolate h-[100dvh] overflow-y-auto bg-[#08080c] text-white">
      {/* Cinematic background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,#350b10_0%,#130709_40%,#08080c_75%)]"
      />

      <div className="relative mx-auto flex min-h-full w-full max-w-[1500px] flex-col px-5 sm:px-10 lg:px-16">
        {/* Minimal header */}
        <header className="flex shrink-0 items-center justify-between border-b border-white/10 py-4">
          <div>
            <p className="text-lg font-black tracking-[0.22em] text-red-500">
              CINEVERSE
            </p>

            <p className="mt-1 text-[8px] tracking-[0.25em] text-gray-400">
              DEVELOPER EDITION
            </p>
          </div>

          <span className="text-[10px] tracking-widest text-gray-400">
            2026
          </span>
        </header>

        {/* Main cinematic composition */}
        <main className="relative flex min-h-0 flex-1 flex-col items-center justify-center py-3">
          {/* Developer heading */}
          <div className="premiere-content relative z-20 shrink-0 text-center">
            <p className="mb-3 text-[9px] tracking-[0.3em] text-gray-400 sm:text-xs">
              DESIGNED & DEVELOPED BY
            </p>

            <h1 className="premiere-name font-black leading-[0.85] tracking-[-0.06em]">
              <span className="block text-[clamp(3.5rem,21vw,7rem)] text-[#f5f5f5] lg:text-[clamp(6rem,12vw,11rem)]">
                MAYUR
              </span>

              <span className="mt-2 block text-[clamp(1.8rem,10vw,4rem)] tracking-[0.12em] text-red-500 lg:text-6xl">
                TAMBAT
              </span>
            </h1>
          </div>

          {/* Large developer portrait */}
          <div className="premiere-portrait relative mx-auto h-[clamp(220px,43dvh,420px)] w-full max-w-[460px] shrink-0 lg:h-[42dvh] lg:max-w-[550px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[5%] inset-y-[10%] rounded-full bg-red-700/30 blur-[75px]"
            />

            <Image
              src="/developer/mayur-transparent.png"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
              }}
              alt="Mayur Pradip Tambat holding a laptop"
              width={960}
              height={1559}
              preload
              sizes="(max-width: 1023px) 460px, 550px"
              className="absolute bottom-0 left-1/2 h-full w-auto max-w-full -translate-x-1/2 scale-[1.08] object-contain object-bottom"
            />

            {/* Developer profession */}
            <div className="absolute bottom-3 left-0 z-20 text-left">
              <div className="mb-2 h-px w-8 bg-red-500" />

              <p className="text-[8px] font-bold leading-relaxed tracking-widest text-red-400 sm:text-[10px]">
                FULL STACK
              </p>

              <p className="text-[8px] font-bold tracking-widest text-white sm:text-[10px]">
                DEVELOPER
              </p>
            </div>
          </div>
        </main>

        {/* Minimal project information */}
        <div className="relative z-20 mx-auto w-full max-w-md shrink-0 pb-3 text-center">
          <p className="mb-4 text-xs leading-relaxed text-gray-400">
            An interactive movie ticket booking demo built by Mayur Pradip
            Tambat.
          </p>

          <button
            type="button"
            onClick={onEnter}
            className="premiere-enter-button group flex min-h-12 w-full items-center justify-center gap-4 rounded-full bg-gradient-to-r from-red-700 to-red-500 px-6 py-3 text-sm font-bold tracking-wider shadow-lg shadow-red-900/30 transition hover:brightness-110 active:scale-[0.98] motion-reduce:transition-none"
          >
            <span
              aria-hidden="true"
              className="text-xl transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
            >
              ←
            </span>
            BACK TO CINEVERSE
          </button>
        </div>

        {/* Minimal footer */}
        <footer className="shrink-0 border-t border-white/10 py-3 text-center">
          <p className="text-[9px] tracking-wide text-gray-400">
            PORTFOLIO PROJECT · DEMONSTRATION ONLY
          </p>
        </footer>
      </div>
    </section>
  );
}
