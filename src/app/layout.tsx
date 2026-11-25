import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://cineverse-mayur.vercel.app"),

  title: {
    default: "Cineverse — Your Ultimate Cinema Experience",
    template: "%s | Cineverse",
  },

  description:
    "Discover movies, explore theatres, select showtimes, choose your seats and experience a cinematic movie ticket booking demo built with Next.js.",

  applicationName: "Cineverse",

  manifest: "/manifest.webmanifest",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Cineverse",
  },

  formatDetection: {
    telephone: false,
  },

  icons: {
    apple: "/icons/icon-192.png",
  },

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
    url: "https://cineverse-mayur.vercel.app",
    title: "Cineverse — Your Ultimate Cinema Experience",
    description:
      "A cinematic movie ticket booking demo featuring interactive seat selection, smooth animations and digital tickets.",
    siteName: "Cineverse",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cineverse — Every Movie. An Experience.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cineverse — Your Ultimate Cinema Experience",
    description:
      "Explore movies and experience an interactive cinema booking platform.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08080c",
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
