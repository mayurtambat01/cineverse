import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Bookings",

  description:
    "View your Cineverse demo bookings, manage booking history and download your digital movie tickets.",

  robots: {
    index: false,
    follow: false,
  },
};

export default function MyBookingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
