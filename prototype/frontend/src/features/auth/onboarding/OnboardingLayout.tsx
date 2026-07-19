import { Check } from "lucide-react";
import clsx from "clsx";

export interface StepInfo {
  number: number;
  label: string;
  subtitle: string;
}

const STEPS: StepInfo[] = [
  { number: 1, label: "Basic Information", subtitle: "Who are you?" },
  { number: 2, label: "Location & Constituency", subtitle: "Help us identify your jurisdiction" },
  { number: 3, label: "About You", subtitle: "Interests & profile" },
];

interface OnboardingLayoutProps {
  currentStep: number;
  children: React.ReactNode;
  onContinue?: () => void;
  onBack?: () => void;
  continueLabel?: string;
}

export default function OnboardingLayout({
  currentStep,
  children,
  onContinue,
  onBack,
  continueLabel = "Continue →",
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-page)]">
      <div className="max-w-[1400px] mx-auto px-6 py-8 md:px-10 md:py-10">
        <div className="flex items-center justify-between mb-7">
          <span className="text-[var(--text-heading)] font-extrabold text-[var(--color-brand)]">
            Digital Janata
          </span>
          <span className="text-xs font-bold tracking-widest text-[var(--color-text-secondary)]">
            STEP {String(currentStep).padStart(2, "0")} / 03
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          <aside className="bg-[var(--color-bg-surface)] rounded-xl p-7 shadow-[var(--shadow-sm)] h-fit">
            <p className="text-xs font-bold tracking-widest uppercase text-[var(--color-text-secondary)]">
              Citizen Onboarding
            </p>
            <h2 className="mt-3 mb-8 text-[var(--text-display)] font-bold leading-tight text-[var(--color-text-primary)]">
              Complete your DJ Profile
            </h2>

            <div className="flex flex-col gap-6">
              {STEPS.map((step) => {
                const isDone = currentStep > step.number;
                const isActive = currentStep === step.number;

                return (
                  <div key={step.number} className="flex gap-3.5 items-start">
                    <span
                      className={clsx(
                        "h-[42px] w-[42px] shrink-0 rounded-full flex items-center justify-center font-bold text-sm",
                        isDone && "bg-[var(--color-text-primary)] text-[var(--color-text-inverse)]",
                        isActive && "bg-[var(--color-brand)] text-[var(--color-text-inverse)]",
                        !isDone && !isActive && "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]"
                      )}
                    >
                      {isDone ? <Check size={18} /> : step.number}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-[var(--color-text-primary)]">
                        {isDone ? "Completed" : step.label}
                      </p>
                      <p className="text-xs mt-1 text-[var(--color-text-secondary)]">
                        {isDone ? "" : step.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {onContinue && (
              <button
                onClick={onContinue}
                className="mt-10 w-full py-4 rounded-xl bg-[var(--color-brand)] text-[var(--color-text-inverse)] font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity"
              >
                {continueLabel}
              </button>
            )}

            {onBack && (
              <button
                onClick={onBack}
                className="block w-full text-center mt-4 text-sm text-[var(--color-text-secondary)] hover:underline cursor-pointer bg-transparent border-none"
              >
                ← Back
              </button>
            )}
          </aside>

          <main className="bg-[var(--color-bg-surface)] rounded-xl p-8 md:p-10 shadow-[var(--shadow-sm)]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
