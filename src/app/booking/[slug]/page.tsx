import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { movies } from "../../data/movies";
import ShowSelector from "../../components/ShowSelector";

type BookingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return movies.map((movie) => ({
    slug: movie.slug,
  }));
}

async function BookingContent({ params }: BookingPageProps) {
  const { slug } = await params;

  const movie = movies.find((item) => item.slug === slug);

  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#08080c] px-5 py-10 text-white sm:px-8 md:px-16">
      <Link
        href={`/movies/${movie.slug}`}
        className="text-sm text-gray-400 transition hover:text-white"
      >
        ← Back to Movie
      </Link>

      <div className="mx-auto mt-12 max-w-5xl">
        <p className="text-xs font-bold tracking-[0.3em] text-red-400">
          CINEVERSE BOOKING
        </p>

        <h1 className="mt-4 text-3xl font-black sm:text-5xl">Book Tickets</h1>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">{movie.title}</h2>

          <p className="mt-3 text-sm text-gray-400">
            {movie.genre} • {movie.duration} • {movie.language}
          </p>

          <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 p-6">
            <h3 className="text-lg font-semibold">Select Your Show</h3>

            <ShowSelector movieTitle={movie.title} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BookingPage({ params }: BookingPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#08080c] p-8 text-white">
          Loading booking details...
        </main>
      }
    >
      <BookingContent params={params} />
    </Suspense>
  );
}
