import type { MetadataRoute } from "next";
import { movies } from "./data/movies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cineverse-mayur.vercel.app";

  const moviePages: MetadataRoute.Sitemap = movies.map((movie) => ({
    url: `${baseUrl}/movies/${movie.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/developer`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...moviePages,
  ];
}
