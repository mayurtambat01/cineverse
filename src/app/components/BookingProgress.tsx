type BookingProgressProps = {
  currentStep: 1 | 2 | 3;
};

const steps = [
  { number: 1, label: "Select Show" },
  { number: 2, label: "Choose Seats" },
  { number: 3, label: "Confirmation" },
];

export default function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <div className="mb-8 w-full">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const completed = step.number < currentStep;
          const active = step.number === currentStep;

          return (
            <div key={step.number} className="flex min-w-0 flex-1 items-start">
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <div
                  aria-current={active ? "step" : undefined}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition ${
                    completed
                      ? "border-green-500 bg-green-600 text-white"
                      : active
                        ? "border-red-500 bg-red-600 text-white"
                        : "border-white/10 bg-white/5 text-gray-500"
                  }`}
                >
                  {completed ? "✓" : step.number}
                </div>

                <p
                  className={`mt-3 text-center text-[10px] font-medium sm:text-sm ${
                    active
                      ? "text-white"
                      : completed
                        ? "text-green-400"
                        : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mt-5 h-[2px] w-6 shrink-0 sm:w-12 ${
                    completed ? "bg-green-500" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
