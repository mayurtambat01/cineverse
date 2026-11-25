export type SavedBooking = {
  bookingId: string;
  movieTitle: string;
  theatreName: string;
  selectedScreen: string;
  selectedDate: string;
  selectedTime: string;
  selectedSeats: string[];
  totalAmount: number;
  bookedAt: string;
  status?: "CONFIRMED" | "CANCELLED";
  cancelledAt?: string;
};

const STORAGE_KEY = "cineverse_bookings";

// Retrieve all saved bookings.
export function getBookings(): SavedBooking[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    const bookings: unknown = JSON.parse(stored);

    return Array.isArray(bookings) ? (bookings as SavedBooking[]) : [];
  } catch (error) {
    console.error("Unable to load bookings:", error);
    return [];
  }
}

// Save a confirmed booking.
export function saveBooking(booking: SavedBooking): boolean {
  if (typeof window === "undefined") return false;

  try {
    const existingBookings = getBookings();

    // Avoid duplicate bookings with the same reference.
    const updatedBookings = [
      booking,
      ...existingBookings.filter(
        (item) => item.bookingId !== booking.bookingId,
      ),
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));

    return true;
  } catch (error) {
    console.error("Unable to save booking:", error);
    return false;
  }
}

export function cancelBooking(bookingId: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    const bookings = getBookings();

    const bookingExists = bookings.some(
      (booking) =>
        booking.bookingId === bookingId && booking.status !== "CANCELLED",
    );

    if (!bookingExists) return false;

    const updatedBookings = bookings.map((booking) =>
      booking.bookingId === bookingId
        ? {
            ...booking,
            status: "CANCELLED" as const,
            cancelledAt: new Date().toISOString(),
          }
        : booking,
    );

    localStorage.setItem("cineverse_bookings", JSON.stringify(updatedBookings));

    return true;
  } catch (error) {
    console.error("Unable to cancel booking:", error);
    return false;
  }
}
