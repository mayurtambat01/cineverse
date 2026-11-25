"use client";

import { useEffect, useRef, useState } from "react";
import BookingConfirmation from "./BookingConfirmation";
import BookingProgress from "./BookingProgress";
import { formatDate } from "../utils/formatDate";
import { saveBooking } from "../utils/bookingStorage";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const seatsPerRow = 10;
const ticketPrice = 250;
const maxSeats = 6;

// Demonstration seats only; not actual reservations.
const bookedSeats = ["A3", "A4", "C5", "D6", "F2", "G8"];

type SeatSelectionProps = {
  movieTitle: string;
  theatreName: string;
  selectedScreen: string;
  selectedDate: string;
  selectedTime: string;
  onBack: () => void;
};

export default function SeatSelection({
  movieTitle,
  theatreName,
  selectedScreen,
  selectedDate,
  selectedTime,
  onBack,
}: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const [bookingError, setBookingError] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const confirmingRef = useRef(false);

  useEffect(() => {
    if (bookingId) {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [bookingId]);

  function toggleSeat(seat: string) {
    if (bookedSeats.includes(seat)) return;

    setBookingError("");

    setSelectedSeats((previous) => {
      // Allow users to deselect an already selected seat.
      if (previous.includes(seat)) {
        return previous.filter((item) => item !== seat);
      }

      // Prevent selecting more than 6 seats.
      if (previous.length >= maxSeats) {
        return previous;
      }

      return [...previous, seat];
    });
  }

  const totalAmount = selectedSeats.length * ticketPrice;

  function isShowtimeValid(): boolean {
    const dateMatch = selectedDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    const timeMatch = selectedTime
      .trim()
      .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

    if (!dateMatch || !timeMatch) return false;

    const year = Number(dateMatch[1]);
    const month = Number(dateMatch[2]);
    const day = Number(dateMatch[3]);

    let hours = Number(timeMatch[1]);
    const minutes = Number(timeMatch[2]);
    const period = timeMatch[3].toUpperCase();

    if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
      return false;
    }

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    const showDateTime = new Date(year, month - 1, day, hours, minutes, 0, 0);

    if (
      showDateTime.getFullYear() !== year ||
      showDateTime.getMonth() !== month - 1 ||
      showDateTime.getDate() !== day
    ) {
      return false;
    }

    return showDateTime.getTime() > Date.now();
  }

  function confirmBooking() {
    if (bookingId || confirmingRef.current) return;

    setBookingError("");

    // Validate booking details.
    if (
      !movieTitle.trim() ||
      !theatreName.trim() ||
      !selectedScreen.trim() ||
      !selectedDate.trim() ||
      !selectedTime.trim()
    ) {
      setBookingError(
        "Booking details are incomplete. Please select your show again.",
      );
      return;
    }

    // Validate selected seat count.
    if (selectedSeats.length === 0 || selectedSeats.length > maxSeats) {
      setBookingError(`Please select between 1 and ${maxSeats} seats.`);
      return;
    }

    // Validate seat numbers and availability.
    const validSeats = rows.flatMap((row) =>
      Array.from({ length: seatsPerRow }, (_, index) => `${row}${index + 1}`),
    );

    const hasInvalidSeats = selectedSeats.some(
      (seat) => !validSeats.includes(seat) || bookedSeats.includes(seat),
    );

    const hasDuplicateSeats =
      new Set(selectedSeats).size !== selectedSeats.length;

    if (hasInvalidSeats || hasDuplicateSeats) {
      setBookingError(
        "Your seat selection is invalid. Please select your seats again.",
      );
      return;
    }

    // Validate showtime immediately before confirmation.
    if (!isShowtimeValid()) {
      setBookingError(
        "This showtime has expired or is invalid. Please select another showtime.",
      );
      return;
    }

    // Prevent multiple confirmation clicks.
    confirmingRef.current = true;
    setIsConfirming(true);

    try {
      const reference = `CV-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

      const booking = {
        bookingId: reference,
        movieTitle,
        theatreName,
        selectedScreen,
        selectedDate,
        selectedTime,
        selectedSeats: [...selectedSeats],
        totalAmount,
        bookedAt: new Date().toISOString(),
      };

      const saved = saveBooking(booking);

      if (!saved) {
        setBookingError(
          "Unable to save your booking. Please check your browser storage and try again.",
        );

        confirmingRef.current = false;
        return;
      }

      setBookingId(reference);
    } catch (error) {
      console.error("Booking confirmation failed:", error);

      setBookingError(
        "Something went wrong while confirming your booking. Please try again.",
      );

      confirmingRef.current = false;
    } finally {
      setIsConfirming(false);
    }
  }

  if (bookingId) {
    return (
      <>
        <BookingProgress currentStep={3} />

        <BookingConfirmation
          movieTitle={movieTitle}
          theatreName={theatreName}
          selectedScreen={selectedScreen}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedSeats={selectedSeats}
          totalAmount={totalAmount}
          bookingId={bookingId}
        />
      </>
    );
  }

  return (
    <div className="mt-6 min-w-0 sm:mt-8">
      <BookingProgress currentStep={2} />
      <button
        type="button"
        onClick={onBack}
        className="mb-8 text-sm text-gray-400 hover:text-white"
      >
        ← Change Date or Showtime
      </button>

      <div className="mb-8">
        <h3 className="text-xl font-bold sm:text-2xl">Choose Your Seats</h3>
        <p className="mt-2 break-words text-xs leading-6 text-gray-400 sm:text-sm">
          {movieTitle} • {formatDate(selectedDate)} • {selectedTime}
        </p>
      </div>

      {/* Seat selection feedback */}
      <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-4 text-center">
        <p className="text-sm font-medium text-gray-300">Selected Seats</p>

        <p
          className="mt-2 text-2xl font-bold text-red-400 transition-colors duration-200"
          aria-live="polite"
        >
          {selectedSeats.length} / {maxSeats}
        </p>

        <p className="mt-2 text-xs text-gray-400">
          You can select up to {maxSeats} seats per booking.
        </p>

        {selectedSeats.length === maxSeats && (
          <p className="mt-3 text-sm font-medium text-amber-400">
            Maximum seat limit reached. Deselect a seat to choose another.
          </p>
        )}
      </div>

      {/* Seat legend */}
      <div className="mb-10 flex flex-wrap justify-center gap-5 text-xs text-gray-300">
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-white/15" />
          Available
        </span>
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-red-600" />
          Selected
        </span>
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-gray-600" />
          Booked
        </span>
      </div>

      {/* Cinema screen */}
      <div className="mx-auto mb-12 max-w-2xl">
        <div className="h-3 rounded-t-[100%] bg-red-500 shadow-[0_12px_35px_rgba(239,68,68,0.35)]" />
        <p className="mt-4 text-center text-xs tracking-[0.3em] text-gray-500">
          SCREEN THIS WAY
        </p>
      </div>

      {/* Responsive cinema seating layout */}
      <div className="mt-8 w-full">
        <p className="mb-4 text-center text-xs text-gray-500 sm:hidden">
          Swipe left or right to view all seats
        </p>

        <div
          className="w-full max-w-full overflow-x-auto overscroll-x-contain rounded-xl pb-5"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="mx-auto w-max min-w-max space-y-2 px-2 sm:space-y-4">
            {rows.map((row) => (
              <div key={row} className="flex items-center justify-center gap-3">
                {/* Left row label */}
                <span className="w-5 shrink-0 text-center text-xs font-semibold text-gray-500">
                  {row}
                </span>

                {/* Seats */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {Array.from({ length: seatsPerRow }, (_, index) => {
                    const seat = `${row}${index + 1}`;
                    const isBooked = bookedSeats.includes(seat);
                    const isSelected = selectedSeats.includes(seat);
                    const isLimitReached = selectedSeats.length >= maxSeats;
                    const isUnavailable =
                      isBooked || (isLimitReached && !isSelected);

                    return (
                      <div
                        key={seat}
                        className={index === 5 ? "ml-5 sm:ml-8" : ""}
                      >
                        <button
                          type="button"
                          title={
                            isBooked
                              ? `Seat ${seat} is booked`
                              : isLimitReached && !isSelected
                                ? "Maximum 6 seats allowed"
                                : `Seat ${seat}`
                          }
                          aria-label={`Seat ${seat}${
                            isBooked
                              ? ", booked"
                              : isSelected
                                ? ", selected"
                                : isUnavailable
                                  ? ", unavailable, maximum seat limit reached"
                                  : ", available"
                          }`}
                          aria-pressed={isSelected}
                          disabled={isUnavailable}
                          onClick={() => toggleSeat(seat)}
                          className={`flex h-9 w-9 touch-manipulation select-none items-center justify-center rounded-t-xl rounded-b-md border text-xs font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-90 motion-reduce:transition-none sm:h-11 sm:w-11 ${
                            isBooked
                              ? "cursor-not-allowed border-gray-600 bg-gray-600 text-gray-300"
                              : isSelected
                                ? "scale-105 border-red-500 bg-red-600 text-white shadow-lg shadow-red-500/30"
                                : isUnavailable
                                  ? "cursor-not-allowed border-white/10 bg-white/5 text-gray-500 opacity-40"
                                  : "border-white/15 bg-white/10 text-gray-300 hover:border-red-500 hover:bg-red-500/20"
                          }`}
                        >
                          {index + 1}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Right row label */}
                <span className="w-5 shrink-0 text-center text-xs font-semibold text-gray-500">
                  {row}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking summary */}
      <div className="mt-8 min-w-0 rounded-2xl border border-white/10 bg-[#15151e] p-4 transition-colors duration-300 sm:mt-10 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold sm:text-xl">Booking Summary</h3>

          <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
            {selectedSeats.length}{" "}
            {selectedSeats.length === 1 ? "Ticket" : "Tickets"}
          </span>
        </div>

        <div className="mt-6 space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <span className="shrink-0 text-gray-400">Movie</span>
            <span className="min-w-0 break-words text-right font-semibold">
              {movieTitle}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="shrink-0 text-gray-400">Theatre</span>
            <span className="min-w-0 break-words text-right font-semibold">
              {theatreName}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Screen</span>
            <span className="font-medium">{selectedScreen}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Date</span>
            <span className="font-medium">{formatDate(selectedDate)}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Showtime</span>
            <span className="font-medium">{selectedTime}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Selected Seats</span>
            <span className="max-w-[65%] text-right font-semibold text-red-400">
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "No seats selected"}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Price per Ticket</span>
            <span className="font-medium">₹{ticketPrice}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Number of Tickets</span>
            <span className="font-medium">{selectedSeats.length}</span>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-6">
          <div>
            <p className="text-sm font-semibold">Total Amount</p>
            <p className="mt-1 text-xs text-gray-500">
              {selectedSeats.length} × ₹{ticketPrice}
            </p>
          </div>

          <span className="text-3xl font-black text-red-400">
            ₹{totalAmount}
          </span>
        </div>

        {selectedSeats.length === 0 && (
          <p className="mt-5 text-center text-xs text-amber-400">
            Please select at least one available seat to continue.
          </p>
        )}

        {bookingError && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4"
          >
            <p className="text-sm font-bold text-red-400">
              Unable to Confirm Booking
            </p>

            <p className="mt-2 text-xs leading-6 text-gray-300 sm:text-sm">
              {bookingError}
            </p>

            <button
              type="button"
              onClick={onBack}
              className="mt-3 text-sm font-semibold text-red-400 transition-colors hover:text-red-300"
            >
              ← Change Date or Showtime
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={confirmBooking}
          disabled={selectedSeats.length === 0}
          className="mt-6 min-h-14 w-full rounded-xl bg-red-600 px-4 py-4 text-sm font-bold text-white transition-all duration-200 ease-out hover:bg-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none sm:px-6 sm:text-base"
        >
          {selectedSeats.length === 0
            ? "Select Seats to Continue"
            : `Confirm Booking • ₹${totalAmount}`}
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          Demo booking only. No real payment or seat reservation.
        </p>
      </div>
    </div>
  );
}
