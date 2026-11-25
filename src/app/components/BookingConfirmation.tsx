"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { toPng } from "html-to-image";
import { formatDate } from "../utils/formatDate";

type BookingConfirmationProps = {
  movieTitle: string;
  theatreName: string;
  selectedScreen: string;
  selectedDate: string;
  selectedTime: string;
  selectedSeats: string[];
  totalAmount: number;
  bookingId: string;
};

export default function BookingConfirmation({
  movieTitle,
  theatreName,
  selectedScreen,
  selectedDate,
  selectedTime,
  selectedSeats,
  totalAmount,
  bookingId,
}: BookingConfirmationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".booking-success", {
          opacity: 0,
          y: 20,
          duration: 0.5,
          clearProps: "opacity,transform",
        })
        .from(
          ".booking-checkmark",
          {
            scale: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            clearProps: "transform",
          },
          "-=0.3",
        )
        .from(
          ".booking-ticket-reveal",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
            clearProps: "opacity,transform",
          },
          "-=0.3",
        )
        .from(
          ".booking-actions",
          {
            opacity: 0,
            y: 15,
            duration: 0.4,
            stagger: 0.15,
            clearProps: "opacity,transform",
          },
          "-=0.2",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  async function downloadTicket() {
    if (!ticketRef.current || downloading) return;

    try {
      setDownloading(true);

      const dataUrl = await toPng(ticketRef.current, {
        backgroundColor: "#14141c",
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `Cineverse-Ticket-${bookingId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Ticket download failed:", error);
      alert("Unable to download the ticket. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  function printTicket() {
    window.print();
  }

  return (
    <div ref={containerRef} className="mx-auto mt-8 max-w-xl">
      {/* Booking success message */}
      <div
        role="status"
        className="booking-success mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-5 text-center"
      >
        <div className="booking-checkmark mb-2 text-3xl text-green-400">✓</div>

        <h2 className="text-xl font-bold text-green-400">
          Booking Successful!
        </h2>

        <p className="mt-2 text-sm text-gray-300">
          Your demo booking has been generated successfully.
        </p>

        <p className="mt-2 text-xs text-gray-400">Booking ID: {bookingId}</p>
      </div>

      {/* Animated digital ticket wrapper */}
      <div className="booking-ticket-reveal">
        <div
          ref={ticketRef}
          id="cineverse-ticket"
          className="overflow-hidden rounded-3xl border border-white/10 bg-[#14141c] text-white shadow-2xl"
        >
          {/* Premium cinematic header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-600 to-[#360909] px-6 py-10 text-center sm:px-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-black tracking-[0.35em]">CINEVERSE</p>

              <div className="mx-auto mt-7 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/15 text-4xl">
                ✓
              </div>

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                Booking Confirmed!
              </h2>

              <p className="mt-3 text-sm text-white/80">
                Your cinematic experience awaits.
              </p>
            </div>
          </div>

          {/* Movie details */}
          <div className="px-6 py-8 sm:px-8">
            <p className="text-xs font-bold tracking-[0.25em] text-red-400">
              DIGITAL MOVIE TICKET
            </p>

            <h3 className="mt-4 text-2xl font-black sm:text-3xl">
              {movieTitle}
            </h3>

            <div className="mt-5 space-y-2">
              <p className="text-sm font-semibold text-gray-200">
                {theatreName}
              </p>

              <p className="text-sm text-gray-400">{selectedScreen}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7">
              <div>
                <p className="text-xs tracking-widest text-gray-500">DATE</p>
                <p className="mt-2 text-sm font-semibold sm:text-base">
                  {formatDate(selectedDate)}
                </p>
              </div>

              <div>
                <p className="text-xs tracking-widest text-gray-500">
                  SHOWTIME
                </p>
                <p className="mt-2 text-sm font-semibold sm:text-base">
                  {selectedTime}
                </p>
              </div>

              <div>
                <p className="text-xs tracking-widest text-gray-500">SEATS</p>
                <p className="mt-2 break-words text-sm font-semibold sm:text-base">
                  {selectedSeats.join(", ")}
                </p>
              </div>

              <div>
                <p className="text-xs tracking-widest text-gray-500">
                  TOTAL AMOUNT
                </p>
                <p className="mt-2 text-xl font-black text-red-400">
                  ₹{totalAmount}
                </p>
              </div>
            </div>
          </div>

          {/* Cinema-style perforated divider */}
          <div className="flex items-center">
            <div className="-ml-3 h-6 w-6 shrink-0 rounded-full bg-[#08080c]" />

            <div className="flex-1 border-t-2 border-dashed border-white/20" />

            <div className="-mr-3 h-6 w-6 shrink-0 rounded-full bg-[#08080c]" />
          </div>

          {/* Booking reference */}
          <div className="px-6 py-8 text-center sm:px-8">
            <p className="text-xs tracking-[0.2em] text-gray-500">
              BOOKING REFERENCE
            </p>

            <p className="mt-3 break-all text-lg font-black tracking-widest">
              {bookingId}
            </p>

            <div className="mx-auto mt-6 max-w-xs rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
              <p className="text-xs leading-5 text-gray-400">
                Demo ticket only. No payment has been processed and no seat
                reservation has been made.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="booking-actions mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={downloadTicket}
          disabled={downloading}
          className="min-h-14 rounded-xl bg-red-600 px-6 py-4 font-bold text-white transition-all duration-200 hover:bg-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          {downloading ? "Downloading..." : "↓ Download Ticket"}
        </button>

        <button
          type="button"
          onClick={printTicket}
          className="min-h-14 rounded-xl border border-white/20 bg-white/5 px-6 py-4 font-bold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          Print Ticket
        </button>
      </div>

      <Link
        href="/#movies"
        className="booking-actions mt-6 block rounded-xl bg-red-600 px-6 py-4 text-center font-bold transition-all duration-200 hover:bg-red-700 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
      >
        Explore More Movies
      </Link>
    </div>
  );
}
