"use client";

import { useEffect, useState } from "react";
import SeatSelection from "./SeatSelection";
import BookingProgress from "./BookingProgress";
import { theatres } from "../data/theatres";

const showtimes = ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"];

function isPastShowtime(selectedDate: string, showtime: string, now: Date) {
  if (!selectedDate) return false;

  const [year, month, day] = selectedDate.split("-").map(Number);

  const [time, period] = showtime.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  let hour24 = hours % 12;

  if (period === "PM") {
    hour24 += 12;
  }

  const showDateTime = new Date(year, month - 1, day, hour24, minutes);

  return showDateTime.getTime() <= now.getTime();
}

function getAvailableDates() {
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    dates.push({
      value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0",
      )}-${String(date.getDate()).padStart(2, "0")}`,
      day: date.toLocaleDateString("en-IN", { weekday: "short" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-IN", { month: "short" }),
    });
  }

  return dates;
}

export default function ShowSelector({ movieTitle }: { movieTitle: string }) {
  const [dates] = useState(getAvailableDates);
  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [selectedScreen, setSelectedScreen] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [selectedTime, setSelectedTime] = useState("");
  const [showSeats, setShowSeats] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setNow(new Date());

    updateTime();

    const interval = window.setInterval(updateTime, 30_000);

    return () => window.clearInterval(interval);
  }, []);

  const currentTheatre = theatres.find(
    (theatre) => theatre.id === selectedTheatre,
  );

  const availableScreens = currentTheatre?.screens ?? [];

  const isSelectedShowtimePast =
    now !== null &&
    selectedDate !== "" &&
    selectedTime !== "" &&
    isPastShowtime(selectedDate, selectedTime, now);

  const canContinue =
    selectedTheatre !== "" &&
    selectedScreen !== "" &&
    selectedDate !== "" &&
    selectedTime !== "" &&
    now !== null &&
    !isSelectedShowtimePast;

  if (
    showSeats &&
    currentTheatre &&
    selectedScreen &&
    selectedDate &&
    selectedTime
  ) {
    return (
      <SeatSelection
        movieTitle={movieTitle}
        theatreName={currentTheatre.name}
        selectedScreen={selectedScreen}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onBack={() => setShowSeats(false)}
      />
    );
  }

  return (
    <div className="mt-6 min-w-0 space-y-7 sm:mt-8 sm:space-y-8">
      <BookingProgress currentStep={1} />

      {/* Theatre selection */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Select Theatre</h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {theatres.map((theatre) => (
            <button
              key={theatre.id}
              type="button"
              aria-pressed={selectedTheatre === theatre.id}
              onClick={() => {
                setSelectedTheatre(theatre.id);
                setSelectedScreen("");
                setSelectedDate("");
                setSelectedTime("");
              }}
              className={`min-w-0 rounded-xl border p-4 text-left transition sm:p-5 ${
                selectedTheatre === theatre.id
                  ? "border-red-500 bg-red-600/20 text-white"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-red-500"
              }`}
            >
              <span className="block text-sm font-bold">{theatre.name}</span>

              <span className="mt-2 block text-xs text-gray-400">
                📍 {theatre.location}
              </span>

              {selectedTheatre === theatre.id && (
                <span className="mt-3 block text-xs font-semibold text-red-400">
                  ✓ Selected
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Screen selection */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Select Screen</h3>

        {!selectedTheatre && (
          <p className="mb-4 text-sm text-gray-400">
            Please select a theatre first.
          </p>
        )}

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {availableScreens.map((screen) => (
            <button
              key={screen}
              type="button"
              aria-pressed={selectedScreen === screen}
              onClick={() => {
                setSelectedScreen(screen);
                setSelectedDate("");
                setSelectedTime("");
              }}
              className={`min-h-12 rounded-xl border px-3 py-3 text-sm font-semibold transition sm:px-4 sm:py-4 ${
                selectedScreen === screen
                  ? "border-red-500 bg-red-600 text-white"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-red-500"
              }`}
            >
              {screen}

              {selectedScreen === screen && (
                <span className="mt-1 block text-xs">✓ Selected</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Select Date</h3>

        <div className="flex gap-2 overflow-x-auto pb-3 sm:grid sm:grid-cols-7 sm:gap-3 sm:overflow-visible sm:pb-0">
          {dates.map((item) => (
            <button
              key={item.value}
              type="button"
              disabled={!selectedTheatre || !selectedScreen}
              onClick={() => {
                setSelectedDate(item.value);
                setSelectedTime("");
              }}
              className={`min-w-[68px] shrink-0 rounded-xl border p-3 text-center transition disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-0 ${
                selectedDate === item.value
                  ? "border-red-500 bg-red-600 text-white"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-red-500"
              }`}
            >
              <span className="block text-xs">{item.day}</span>
              <span className="mt-1 block text-xl font-bold">{item.date}</span>
              <span className="block text-xs">{item.month}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Select Showtime</h3>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {showtimes.map((time) => {
            const isPast =
              now !== null && isPastShowtime(selectedDate, time, now);

            const isDisabled = !selectedDate || now === null || isPast;

            return (
              <button
                key={time}
                type="button"
                disabled={isDisabled}
                onClick={() => setSelectedTime(time)}
                title={isPast ? "This showtime has already passed" : undefined}
                className={`min-h-12 rounded-xl border px-3 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:py-4 ${
                  selectedTime === time && !isPast
                    ? "border-red-500 bg-red-600 text-white"
                    : "border-white/10 bg-white/5 text-gray-300 hover:border-red-500"
                }`}
              >
                {time}
                {isPast && (
                  <span className="mt-1 block text-xs text-gray-400">
                    Show ended
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        disabled={!canContinue}
        className="min-h-14 w-full rounded-xl bg-red-600 px-4 py-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:text-base"
        onClick={() => {
          if (
            selectedTheatre &&
            selectedScreen &&
            selectedDate &&
            selectedTime &&
            !isPastShowtime(selectedDate, selectedTime, new Date())
          ) {
            setShowSeats(true);
          }
        }}
      >
        Continue to Seat Selection
      </button>
    </div>
  );
}
