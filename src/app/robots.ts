import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/booking/", "/my-bookings"],
    },

    sitemap: "https://cineverse-mayur.vercel.app/sitemap.xml",
  };
}
