import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { movies } from "../../data/movies";
import { Suspense } from "react";

type MoviePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return movies.map((movie) => ({
    slug: movie.slug,
  }));
}

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const { slug } = await params;

  const movie = movies.find((item) => item.slug === slug);

  if (!movie) {
    return {
      title: "Movie Not Found",
      description: "The requested movie could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: movie.title,

    description: movie.description,

    keywords: [
      movie.title,
      movie.genre,
      movie.language,
      String(movie.year),
      "Cineverse",
      "Movie Ticket Booking",
      "Cinema Experience",
    ],

    openGraph: {
      title: `${movie.title} | Cineverse`,
      description: movie.description,
      siteName: "Cineverse",
      locale: "en_IN",
      type: "website",
    },

    twitter: {
      card: "summary",
      title: `${movie.title} | Cineverse`,
      description: movie.description,
    },
  };
}

async function MovieDetails({ params }: MoviePageProps) {
  const { slug } = await params;

  const movie = movies.find((item) => item.slug === slug);

  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#08080c] text-white">
      <section className="relative overflow-hidden px-5 py-8 sm:px-8 sm:py-12 md:px-16 md:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-3xl"
          style={{
            backgroundImage: `url("${movie.poster}")`,
          }}
        />

        <div className="relative mx-auto grid max-w-6xl items-start gap-8 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:items-center md:gap-12 lg:gap-16">
          <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 sm:max-w-[360px] md:max-w-none">
            <Image
              src={movie.poster}
              alt={movie.title}
              width={360}
              height={540}
              sizes="(max-width: 639px) 300px, 360px"
              preload
              className="aspect-[2/3] w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <Link
              href="/#movies"
              className="mb-6 inline-flex items-center text-sm text-gray-400 transition hover:text-white"
            >
              ← Back to Movies
            </Link>

            <p className="mb-4 text-xs font-bold tracking-[0.3em] text-red-400">
              NOW SHOWING
            </p>

            <h1 className="break-words text-[clamp(1.9rem,8vw,3rem)] font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              {movie.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-300 sm:mt-6 sm:text-sm">
              <span className="text-yellow-400">★ {movie.rating}</span>
              <span>{movie.duration}</span>
              <span>{movie.language}</span>
              <span>{movie.year}</span>
            </div>

            <p className="mt-5 text-sm text-red-300">{movie.genre}</p>

            <h2 className="mt-8 text-xl font-bold sm:mt-10 sm:text-2xl">
              About the Movie
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
              {movie.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href={`/booking/${movie.slug}`}
                className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-red-500 sm:w-auto"
              >
                Book Tickets →
              </Link>

              <Link
                href="/#movies"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold transition hover:bg-white/10 sm:w-auto"
              >
                Explore More Movies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function MoviePage({ params }: MoviePageProps) {
  return (
    <Suspense
      fallback={
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
      }
    >
      <MovieDetails params={params} />
    </Suspense>
  );
}
