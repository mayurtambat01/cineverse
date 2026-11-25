export default function Loading() {
  return (
    <main
      className="flex min-h-[65vh] flex-col items-center justify-center gap-5 bg-[#08080c] px-5 text-white"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-red-500"
        aria-hidden="true"
      />

      <p className="animate-pulse text-sm font-medium tracking-widest text-gray-400">
        LOADING MOVIE DETAILS...
      </p>
    </main>
  );
}
