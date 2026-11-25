import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Cineverse — Your Ultimate Cinema Experience",
    short_name: "Cineverse",
    description:
      "Discover movies, explore theatres, select showtimes and experience cinematic movie ticket booking.",

    start_url: "/",
    scope: "/",

    display: "standalone",
    orientation: "portrait-primary",

    background_color: "#08080c",
    theme_color: "#08080c",

    lang: "en-IN",

    categories: ["entertainment", "lifestyle"],

    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
