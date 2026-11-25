"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Cineverse application error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#08080c] px-5 py-16 text-white">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[100px]"
      />

      <div className="relative mx-auto max-w-xl text-center">
        <p className="mb-6 text-xs font-bold tracking-[0.35em] text-red-400">
          CINEVERSE
        </p>

        <div
          aria-hidden="true"
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-5xl font-black text-red-500"
        >
          !
        </div>

        <h1 className="mt-7 text-3xl font-black sm:text-5xl">
          Something Went Wrong
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
          An unexpected error interrupted your cinematic experience. Please try
          again or return to the homepage.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="min-h-14 rounded-xl bg-red-600 px-7 py-4 text-sm font-bold text-white transition-all duration-200 hover:bg-red-700 active:scale-[0.98] motion-reduce:transition-none"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold text-white transition-all duration-200 hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-10 text-xs tracking-widest text-gray-500">
          THE SHOW MUST GO ON.
        </p>
      </div>
    </main>
  );
}
