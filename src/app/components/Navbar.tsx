"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <nav className="cine-navbar border-b border-white/10 bg-[#08080c]/95 px-5 py-4 text-white sm:px-8 md:px-16 md:py-5">
      <div className="flex items-center justify-between gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-xl font-black tracking-[0.12em] text-red-500 sm:text-2xl"
        >
          CINEVERSE
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
          <Link href="/" className="transition hover:text-red-400">
            Home
          </Link>

          <Link href="/#movies" className="transition hover:text-red-400">
            Movies
          </Link>

          <Link href="/#movies" className="transition hover:text-red-400">
            Now Showing
          </Link>

          <Link
            href="/my-bookings"
            aria-current={pathname === "/my-bookings" ? "page" : undefined}
            className={`transition hover:text-red-400 ${
              pathname === "/my-bookings" ? "text-red-400" : ""
            }`}
          >
            My Bookings
          </Link>
        </div>

        {/* Mobile My Bookings */}
        <Link
          href="/my-bookings"
          aria-current={pathname === "/my-bookings" ? "page" : undefined}
          className="rounded-full border border-white/20 px-3 py-2.5 text-xs font-semibold text-gray-200 transition hover:border-red-500 hover:text-red-400 md:hidden"
        >
          My Bookings
        </Link>

        {/* Desktop Explore Movies */}
        <Link
          href={isHomePage ? "#movies" : "/#movies"}
          className="hidden rounded-full bg-red-600 px-4 py-2.5 text-xs font-bold transition hover:bg-red-500 lg:inline-flex lg:px-5 lg:text-sm"
        >
          Explore Movies
        </Link>
      </div>

      {/* Mobile navigation */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-gray-300 sm:justify-start sm:gap-8 md:hidden">
        <Link href="/" className="transition hover:text-red-400">
          Home
        </Link>

        <Link href="/#movies" className="transition hover:text-red-400">
          Movies
        </Link>

        <Link href="/#movies" className="transition hover:text-red-400">
          Now Showing
        </Link>
      </div>
    </nav>
  );
}
