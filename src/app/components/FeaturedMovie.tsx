import Image from "next/image";
import Link from "next/link";
import { movies } from "../data/movies";

export default function FeaturedMovie() {
  const featuredMovie = movies.find(
    (movie) => movie.slug === "ramayana-part-1",
  );

  if (!featuredMovie) return null;

  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-[#08080c] px-5 py-16 sm:px-8 md:px-16 md:py-24"
    >
      <div className="relative min-h-[520px] overflow-hidden rounded-2xl border border-white/10 bg-[#14121b] sm:min-h-[520px] sm:rounded-3xl lg:min-h-[560px]">
        {/* Cinematic background */}
        <Image
          src={featuredMovie.poster}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-top sm:object-center"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Movie information */}
        <div className="relative z-10 flex min-h-[520px] flex-col justify-end p-5 sm:min-h-[520px] sm:p-10 lg:min-h-[560px] lg:p-16">
          <span className="mb-5 w-fit rounded-full border border-red-500/40 bg-red-600/20 px-4 py-2 text-xs font-bold tracking-widest text-red-300">
            FEATURED MOVIE
          </span>

          <h2 className="max-w-3xl text-[clamp(2rem,9vw,3rem)] font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
            RAMAYANA:
            <span className="block text-red-500">PART 1</span>
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-300 sm:mt-5 sm:text-sm">
            {featuredMovie.rating !== "N/A" && (
              <span className="text-yellow-400">★ {featuredMovie.rating}</span>
            )}

            <span>{featuredMovie.genre}</span>
            <span>{featuredMovie.year}</span>
          </div>

          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
            {featuredMovie.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link
              href={`/movies/${featuredMovie.slug}`}
              className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-6 py-3.5 text-sm font-bold transition hover:bg-red-500 sm:w-auto"
            >
              Explore Movie
            </Link>

            <a
              href="#movies"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/20 sm:w-auto"
            >
              Browse Movies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
