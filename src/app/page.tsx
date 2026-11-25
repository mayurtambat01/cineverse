import FeaturedMovie from "./components/FeaturedMovie";
import Image from "next/image";
import Link from "next/link";
import { movies } from "./data/movies";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08080c] text-white">
      <section
        id="home"
        className="relative flex min-h-[65svh] flex-col justify-center overflow-hidden bg-gradient-to-br from-[#34101c] via-[#11111b] to-black px-5 py-16 sm:min-h-[70svh] sm:px-8 sm:py-20 md:min-h-[75vh] md:px-16"
      >
        <div className="pointer-events-none absolute -right-28 top-20 h-64 w-64 rounded-full bg-red-600/15 blur-[100px] md:h-96 md:w-96" />

        <div className="relative z-10">
          <p className="hero-label mb-6 text-[10px] font-bold tracking-[0.25em] text-red-400 sm:text-xs md:text-base md:tracking-[0.35em]">
            WELCOME TO THE FUTURE OF CINEMA
          </p>

          <h1 className="hero-heading max-w-6xl text-[clamp(1.75rem,7.5vw,3rem)] font-black leading-[1.12] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
            EVERY MOVIE.
            <span className="mt-3 block text-red-500 md:mt-5">
              AN EXPERIENCE.
            </span>
          </h1>

          <p className="hero-description mt-6 max-w-xl text-sm leading-6 text-gray-400 sm:mt-7 sm:text-base sm:leading-7 md:text-lg">
            Discover extraordinary stories, explore upcoming releases, and
            experience a new way to book your cinema tickets.
          </p>

          <div className="hero-button mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
            {/* Explore Movies */}
            <a
              href="#movies"
              className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-7 py-4 text-sm font-bold shadow-lg shadow-red-900/30 transition hover:bg-red-500 sm:w-auto sm:px-8"
            >
              Explore Movies
              <span className="ml-3">→</span>
            </a>

            {/* Meet the Developer */}
            <Link
              href="/developer"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-red-500/60 hover:bg-red-500/10 hover:shadow-lg hover:shadow-red-900/20 sm:w-auto sm:px-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-400"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
              </svg>
              Meet the Developer
              <span
                aria-hidden="true"
                className="text-red-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      <FeaturedMovie />

      <section id="movies" className="px-5 py-16 sm:px-8 md:px-16 md:py-20">
        <p className="mb-2 text-sm tracking-[0.3em] text-red-500">
          YOUR NEXT EXPERIENCE
        </p>

        <h2 className="mb-8 text-3xl font-bold sm:text-4xl">Now Showing</h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {movies.map((movie) => (
            <article
              key={movie.slug}
              className="movie-card group overflow-hidden rounded-2xl border border-white/10 bg-[#15151e] transition duration-300 hover:-translate-y-1 hover:border-red-500/40"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  width={400}
                  height={600}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  loading="lazy"
                  className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full border border-red-500/30 bg-red-600/90 px-3 py-1.5 text-xs font-bold text-white">
                  NOW SHOWING
                </span>

                <span className="absolute bottom-4 right-4 rounded-lg bg-black/80 px-3 py-1.5 text-sm font-semibold text-yellow-400 backdrop-blur-sm">
                  ★ {movie.rating}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-bold">{movie.title}</h3>

                <p className="mt-2 text-sm text-gray-400">{movie.genre}</p>

                <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-400">
                  <span>◷ {movie.duration}</span>
                  <span>•</span>
                  <span>{movie.language}</span>
                </div>

                <Link
                  href={`/movies/${movie.slug}`}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-5 py-3.5 text-sm font-bold transition hover:bg-red-500"
                >
                  View Details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-500">
        © 2026 Cineverse. Crafted for movie lovers.
      </footer>
    </main>
  );
}
