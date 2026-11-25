import type { Metadata } from "next";
import type { ReactNode } from "react";
import { movies } from "../../data/movies";

type BookingLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BookingLayoutProps): Promise<Metadata> {
  const { slug } = await params;

  const movie = movies.find((item) => item.slug === slug);

  return {
    title: movie ? `Book Tickets — ${movie.title}` : "Movie Not Found",

    description: movie
      ? `Explore theatres, select showtimes and choose your seats for ${movie.title} on Cineverse.`
      : "The requested movie could not be found.",

    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function BookingLayout({ children }: BookingLayoutProps) {
  return <>{children}</>;
}
