import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#08080c] px-5 py-16 text-white">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[100px]"
      />

      <div className="relative mx-auto max-w-xl text-center">
        <p className="mb-5 text-xs font-bold tracking-[0.35em] text-red-400">
          CINEVERSE
        </p>

        <h1 className="text-[100px] font-black leading-none text-red-600 sm:text-[160px]">
          404
        </h1>

        <h2 className="mt-6 text-2xl font-black sm:text-4xl">
          Scene Not Found
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
          Looks like this scene didn't make the final cut. The page you are
          looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-xl bg-red-600 px-7 py-4 text-sm font-bold text-white transition-all duration-200 hover:bg-red-700 active:scale-[0.98] motion-reduce:transition-none"
          >
            Back to Home
          </Link>

          <Link
            href="/#movies"
            className="rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] motion-reduce:transition-none"
          >
            Explore Movies
          </Link>
        </div>

        <p className="mt-10 text-xs tracking-widest text-gray-500">
          THE SHOW MUST GO ON.
        </p>
      </div>
    </main>
  );
}
