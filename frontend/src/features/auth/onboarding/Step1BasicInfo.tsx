import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import OnboardingLayout from "./OnboardingLayout";
import { useOnboarding } from "./useOnboarding";

const GENDERS = ["Male", "Female", "Non-Binary", "Prefer not to say"];

export default function Step1BasicInfo() {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const [username, setUsername] = useState(data.username);
  const [displayName, setDisplayName] = useState(data.displayName);
  const [email, setEmail] = useState(data.email);
  const [dob, setDob] = useState(data.dob);
  const [gender, setGender] = useState(data.gender);

  const handleContinue = () => {
    updateData({ username, displayName, email, dob, gender });
    navigate("/onboarding/location");
  };

  return (
    <OnboardingLayout
      currentStep={1}
      onContinue={handleContinue}
    >

      <p className="text-xs font-bold tracking-[3px] text-[var(--color-text-secondary)] mb-7">
        01 • BASIC INFORMATION
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Username *
          </label>
          <input
            type="text"
            placeholder="alokgupta"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
          />
          <p className="text-xs font-semibold text-[var(--color-success)]">
            ✓ Username available
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Display Name *
          </label>
          <input
            type="text"
            placeholder="Alok Gupta"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Email *
          </label>
          <input
            type="email"
            placeholder="alok@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Date of Birth *
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Gender
          </label>
          <div className="flex flex-wrap gap-3 mt-1">
            {GENDERS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={clsx(
                  "px-6 py-3.5 rounded-xl border font-semibold text-sm cursor-pointer transition-colors",
                  gender === g
                    ? "bg-[var(--color-brand)] border-[var(--color-brand)] text-[var(--color-text-inverse)]"
                    : "bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-brand)]"
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
