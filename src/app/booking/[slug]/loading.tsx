export default function BookingLoading() {
  return (
    <main
      className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-[#08080c] px-5 text-white"
      role="status"
      aria-live="polite"
    >
      {/* Animated spinner */}
      <div
        className="h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-red-500"
        aria-hidden="true"
      />

      {/* Loading message */}
      <div className="text-center">
        <h2 className="text-lg font-bold sm:text-xl">Preparing Your Booking</h2>

        <p className="mt-3 animate-pulse text-sm text-gray-400">
          Loading theatres and showtimes...
        </p>
      </div>
    </main>
  );
}
