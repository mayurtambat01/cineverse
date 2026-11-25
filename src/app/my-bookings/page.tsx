"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getBookings,
  cancelBooking,
  type SavedBooking,
} from "../utils/bookingStorage";
import { formatDate } from "../utils/formatDate";
import BookingConfirmation from "../components/BookingConfirmation";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<SavedBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<SavedBooking | null>(
    null,
  );
  const [bookingToCancel, setBookingToCancel] = useState<SavedBooking | null>(
    null,
  );

  const [todayString, setTodayString] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [bookingFilter, setBookingFilter] = useState<
    "all" | "upcoming" | "past"
  >("all");

  const [statusFilter, setStatusFilter] = useState<
    "all" | "confirmed" | "cancelled"
  >("all");

  useEffect(() => {
    setBookings(getBookings());

    const today = new Date();

    const currentDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    setTodayString(currentDate);
    setLoading(false);
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      booking.movieTitle.toLowerCase().includes(query) ||
      booking.theatreName.toLowerCase().includes(query) ||
      booking.bookingId.toLowerCase().includes(query) ||
      booking.selectedScreen.toLowerCase().includes(query);

    const matchesFilter =
      bookingFilter === "all" ||
      (bookingFilter === "upcoming" && booking.selectedDate >= todayString) ||
      (bookingFilter === "past" && booking.selectedDate < todayString);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "confirmed" && booking.status !== "CANCELLED") ||
      (statusFilter === "cancelled" && booking.status === "CANCELLED");

    return matchesSearch && matchesFilter && matchesStatus;
  });

  const handleCancelBooking = () => {
    if (!bookingToCancel) return;

    const success = cancelBooking(bookingToCancel.bookingId);

    if (success) {
      setBookings(getBookings());
      setBookingToCancel(null);
    } else {
      alert("Unable to cancel this booking. Please try again.");
    }
  };

  if (selectedBooking) {
    return (
      <main className="min-h-screen bg-[#08080c] px-4 py-8 text-white sm:px-8 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => setSelectedBooking(null)}
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Back to My Bookings
          </button>

          <BookingConfirmation
            movieTitle={selectedBooking.movieTitle}
            theatreName={selectedBooking.theatreName}
            selectedScreen={selectedBooking.selectedScreen}
            selectedDate={selectedBooking.selectedDate}
            selectedTime={selectedBooking.selectedTime}
            selectedSeats={selectedBooking.selectedSeats}
            totalAmount={selectedBooking.totalAmount}
            bookingId={selectedBooking.bookingId}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08080c] px-4 py-10 text-white sm:px-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-10">
          <Link
            href="/#movies"
            className="mb-6 inline-block text-sm text-gray-400 transition hover:text-white"
          >
            ← Explore Movies
          </Link>

          <h1 className="text-3xl font-black sm:text-4xl">
            My <span className="text-red-500">Bookings</span>
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            View your previously confirmed Cineverse demo bookings.
          </p>
        </div>

        {/* Booking search and filters */}
        {!loading && bookings.length > 0 && (
          <div className="mb-8 space-y-4">
            <div>
              <label
                htmlFor="booking-search"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Search Bookings
              </label>

              <input
                id="booking-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search movie, theatre, screen or booking ID..."
                className="min-h-12 w-full min-w-0 rounded-xl border border-white/10 bg-[#15151e] px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-red-500 sm:px-5 sm:py-4"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              {(["all", "upcoming", "past"] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setBookingFilter(filter)}
                  aria-pressed={bookingFilter === filter}
                  className={`min-w-0 rounded-full border px-2 py-3 text-xs font-semibold capitalize transition sm:px-5 sm:py-2.5 sm:text-sm ${
                    bookingFilter === filter
                      ? "border-red-500 bg-red-600 text-white"
                      : "border-white/10 bg-white/5 text-gray-300 hover:border-red-500"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Booking status filters */}
            <div>
              <p className="mb-3 text-sm font-medium text-gray-300">
                Booking Status
              </p>

              <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                {(["all", "confirmed", "cancelled"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setStatusFilter(filter)}
                    aria-pressed={statusFilter === filter}
                    className={`min-w-0 rounded-full border px-2 py-3 text-[11px] font-semibold transition sm:px-5 sm:py-2.5 sm:text-sm ${
                      statusFilter === filter
                        ? "border-red-500 bg-red-600 text-white"
                        : "border-white/10 bg-white/5 text-gray-300 hover:border-red-500"
                    }`}
                  >
                    {filter === "all"
                      ? "All Statuses"
                      : filter === "confirmed"
                        ? "Confirmed"
                        : "Cancelled"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div
            role="status"
            aria-live="polite"
            aria-busy="true"
            className="space-y-5"
          >
            <span className="sr-only">Loading your bookings...</span>

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                aria-hidden="true"
                className="animate-pulse rounded-2xl border border-white/10 bg-[#15151e] p-4 motion-reduce:animate-none sm:p-7"
              >
                {/* Movie title and status skeleton */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="h-6 w-3/4 rounded-lg bg-white/10" />
                    <div className="h-4 w-1/2 rounded-lg bg-white/5" />
                  </div>

                  <div className="h-6 w-24 shrink-0 rounded-full bg-white/10" />
                </div>

                {/* Booking details skeleton */}
                <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
                  {[1, 2, 3, 4].map((detail) => (
                    <div key={detail} className="space-y-3">
                      <div className="h-3 w-12 rounded bg-white/5" />
                      <div className="h-4 w-3/4 rounded bg-white/10" />
                    </div>
                  ))}
                </div>

                {/* Booking reference and amount skeleton */}
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="space-y-3">
                    <div className="h-3 w-24 rounded bg-white/5" />
                    <div className="h-4 w-28 rounded bg-white/10" />
                  </div>

                  <div className="space-y-3">
                    <div className="h-3 w-20 rounded bg-white/5" />
                    <div className="ml-auto h-6 w-16 rounded bg-white/10" />
                  </div>
                </div>

                {/* Action buttons skeleton */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="h-12 rounded-xl bg-white/10" />
                  <div className="h-12 rounded-xl bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          /* Empty state */
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <div className="mb-4 text-5xl">🎟️</div>

            <h2 className="text-xl font-bold">No Bookings Yet</h2>

            <p className="mt-3 text-sm text-gray-400">
              You haven't made any demo bookings yet.
            </p>

            <Link
              href="/#movies"
              className="mt-6 inline-block rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          /* Booking history */
          <div className="space-y-5">
            <p className="text-sm text-gray-400">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>

            {/* No matching bookings */}
            {filteredBookings.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
                <h2 className="text-xl font-bold">No Matching Bookings</h2>

                <p className="mt-3 text-sm text-gray-400">
                  Try another search term or change your booking filter.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setBookingFilter("all");
                    setStatusFilter("all");
                  }}
                  className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {filteredBookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="min-w-0 rounded-2xl border border-white/10 bg-[#15151e] p-4 transition hover:border-red-500/30 sm:p-7"
              >
                {/* Movie name and status */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h2 className="break-words text-lg font-bold sm:text-xl">
                      {booking.movieTitle}
                    </h2>

                    <p className="mt-2 break-words text-xs leading-5 text-gray-400 sm:text-sm">
                      {booking.theatreName}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      booking.status === "CANCELLED"
                        ? "border-gray-500/30 bg-gray-500/10 text-gray-400"
                        : "border-green-500/30 bg-green-500/10 text-green-400"
                    }`}
                  >
                    {booking.status === "CANCELLED"
                      ? "Cancelled"
                      : "Demo Confirmed"}
                  </span>
                </div>

                {/* Booking details */}
                <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-5 text-xs sm:mt-6 sm:grid-cols-4 sm:gap-5 sm:text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="mt-2 font-semibold">
                      {formatDate(booking.selectedDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Showtime</p>
                    <p className="mt-2 font-semibold">{booking.selectedTime}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Screen</p>
                    <p className="mt-2 font-semibold">
                      {booking.selectedScreen}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Seats</p>
                    <p className="mt-2 font-semibold text-red-400">
                      {booking.selectedSeats.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Booking reference and total */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-xs text-gray-500">Booking Reference</p>

                    <p className="mt-1 break-all text-sm font-semibold">
                      {booking.bookingId}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total Amount</p>

                    <p className="mt-1 text-2xl font-black text-red-400">
                      ₹{booking.totalAmount}
                    </p>
                  </div>
                </div>

                {/* Booking actions */}
                {booking.status !== "CANCELLED" && (
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBooking(booking);
                        window.scrollTo({
                          top: 0,
                          behavior: "instant",
                        });
                      }}
                      className="min-h-12 flex-1 rounded-xl border border-red-500/30 bg-red-600/10 px-4 py-3.5 text-sm font-bold text-red-400 transition hover:border-red-500 hover:bg-red-600 hover:text-white sm:px-5"
                    >
                      View Ticket →
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingToCancel(booking)}
                      className="min-h-12 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-bold text-gray-300 transition hover:border-red-500 hover:text-red-400 sm:px-5"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}

                {booking.status === "CANCELLED" && (
                  <p className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm text-gray-400">
                    This booking has been cancelled.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="mt-10 text-center text-xs text-gray-500">
          Demo bookings are saved in this browser only. No real payment or seat
          reservation is made.
        </p>

        {/* Cancellation confirmation dialog */}
        {bookingToCancel && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-6"
            role="presentation"
          >
            <div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="cancel-dialog-title"
              aria-describedby="cancel-dialog-description"
              className="my-auto max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-[#15151e] p-5 shadow-2xl sm:p-6"
            >
              <h2
                id="cancel-dialog-title"
                className="text-xl font-bold text-white"
              >
                Cancel Booking?
              </h2>

              <p
                id="cancel-dialog-description"
                className="mt-3 text-sm leading-6 text-gray-400"
              >
                Are you sure you want to cancel your booking for{" "}
                <span className="font-semibold text-white">
                  {bookingToCancel.movieTitle}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setBookingToCancel(null)}
                  className="flex-1 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/10"
                >
                  Keep Booking
                </button>

                <button
                  type="button"
                  onClick={handleCancelBooking}
                  className="flex-1 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Yes, Cancel Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
