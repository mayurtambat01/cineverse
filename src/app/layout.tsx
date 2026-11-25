import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import AnimationLoader from "./components/AnimationLoader";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cineverse — Your Ultimate Cinema Experience",
    template: "%s | Cineverse",
  },

  description:
    "Discover movies, explore theatres, select showtimes, choose your seats and experience a cinematic movie ticket booking demo built with Next.js.",

  applicationName: "Cineverse",

  keywords: [
    "Cineverse",
    "Movie Ticket Booking",
    "Cinema Experience",
    "Movie Booking Website",
    "Next.js",
    "React.js",
    "TypeScript",
    "Tailwind CSS",
    "GSAP",
    "Frontend Portfolio Project",
  ],

  authors: [
    {
      name: "Mayur Tambat",
      url: "https://mayurtambat.vercel.app",
    },
  ],

  creator: "Mayur Tambat",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Cineverse — Your Ultimate Cinema Experience",
    description:
      "A cinematic movie ticket booking demo featuring interactive seat selection, smooth animations and digital tickets.",
    siteName: "Cineverse",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Cineverse — Your Ultimate Cinema Experience",
    description:
      "Explore movies and experience an interactive cinema booking platform.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll />
        <AnimationLoader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
