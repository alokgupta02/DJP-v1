import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";
import { useOnboarding } from "./useOnboarding";

export default function Step2Location() {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const [pincode, setPincode] = useState(data.pincode);
  const [occupation, setOccupation] = useState(data.occupation);

  const handleContinue = () => {
    updateData({
      pincode,
      occupation,
      // Full location string formatted for backend
      country: "India",
      state: "Madhya Pradesh",
      district: "Bhopal",
      city: "Bhopal",
      locality: "Arera Colony",
      ward: "Ward 53, Bhopal",
      constituency: "Bhopal South-West (Vidhan Sabha)"
    });
    navigate("/onboarding/about");
  };

  const handleBack = () => {
    updateData({ pincode, occupation });
    navigate("/onboarding/basic-info");
  };

  return (
    <OnboardingLayout
      currentStep={2}
      onContinue={handleContinue}
      onBack={handleBack}
    >

      <p className="text-xs font-bold tracking-[3px] text-[var(--color-text-secondary)] mb-7">
        02 • LOCATION & CONSTITUENCY
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Pincode *
          </label>
          <input
            type="text"
            placeholder="462016"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
          />
          <p className="text-xs font-semibold text-[var(--color-success)]">
            ✓ Address detected automatically
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Country *
          </label>
          <input
            type="text"
            value="India"
            readOnly
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 text-sm text-[var(--color-text-secondary)] cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            State *
          </label>
          <input
            type="text"
            value="Madhya Pradesh"
            readOnly
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 text-sm text-[var(--color-text-secondary)] cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            District *
          </label>
          <input
            type="text"
            value="Bhopal"
            readOnly
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 text-sm text-[var(--color-text-secondary)] cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            City *
          </label>
          <input
            type="text"
            value="Bhopal"
            readOnly
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 text-sm text-[var(--color-text-secondary)] cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Locality / Area *
          </label>
          <input
            type="text"
            value="Arera Colony"
            readOnly
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 text-sm text-[var(--color-text-secondary)] cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Ward (Auto)
          </label>
          <input
            type="text"
            value="Ward 53"
            readOnly
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 text-sm text-[var(--color-text-secondary)] cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Assembly Constituency
          </label>
          <input
            type="text"
            value="Govindpura"
            readOnly
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 text-sm text-[var(--color-text-secondary)] cursor-not-allowed"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Full Address
          </label>
          <textarea
            placeholder="House No, Street, Landmark..."
            rows={3}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors resize-vertical min-h-[110px]"
          />
          <p className="text-xs text-[var(--color-text-secondary)]">
            Only used for identifying the correct civic jurisdiction. Your exact address will never be shown publicly.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Occupation
          </label>
          <input
            type="text"
            placeholder="Software Engineer"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
          />

        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Organization (Optional)
          </label>
          <input
            type="text"
            placeholder="OpenAI"
            className="h-[54px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
          />
        </div>
      </div>
    </OnboardingLayout>
  );
}
