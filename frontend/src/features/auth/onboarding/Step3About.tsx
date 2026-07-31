import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import OnboardingLayout from "./OnboardingLayout";
import { useOnboarding } from "./useOnboarding";
import { completeUserOnboarding } from "./onboardingApi";

const TOPICS = [
  "Roads", "Garbage", "Water Supply", "Electricity",
  "Public Transport", "Education", "Healthcare", "Environment",
  "Women's Safety", "Corruption", "Judiciary", "Employment",
  "Digital Governance", "Taxes", "Housing", "Traffic",
];

export default function Step3About() {
  const navigate = useNavigate();
  const { data, updateData, resetData } = useOnboarding();
  const [bio, setBio] = useState(data.bio);
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set(data.topics));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function toggleTopic(topic: string) {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  }

  const handleFinish = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError("");

    const topicsList = Array.from(selectedTopics);
    updateData({ bio, topics: topicsList });

    try {
      await completeUserOnboarding({
        name: data.displayName || "Citizen",
        location: data.ward || data.city || "Bhopal",
        pincode: data.pincode || "462016",
        occupation: data.occupation || "Citizen",
        bio,
        topics: topicsList,
        privacyConsentGiven: true,
      });
      resetData();
      navigate("/feed");
    } catch (err) {
      console.error("Onboarding finish failed:", err);
      setError(err instanceof Error ? err.message : "Failed to save your profile. Please try again.");
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    updateData({ bio, topics: Array.from(selectedTopics) });
    navigate("/onboarding/location");
  };

  return (
    <OnboardingLayout
      currentStep={3}
      onContinue={handleFinish}
      onBack={handleBack}
      continueLabel={submitting ? "Finishing Setup..." : "Finish Setup →"}
    >
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-[var(--color-error)]/10 border border-[var(--color-error)] text-sm font-semibold text-[var(--color-error)]">
          {error}
        </div>
      )}
      <p className="text-xs font-bold tracking-[3px] text-[var(--color-text-secondary)] mb-7">
        03 • ABOUT YOU
      </p>


      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Short Bio
          </label>
          <textarea
            placeholder="Tell your fellow citizens a little about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors resize-vertical min-h-[130px]"
          />
          <p className="text-xs text-[var(--color-text-secondary)]">
            Visible on your public profile.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">
            Topics You Care About
          </label>
          <div className="flex flex-wrap gap-3">
            {TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => toggleTopic(topic)}
                className={clsx(
                  "px-4 py-3 rounded-full border font-semibold text-sm cursor-pointer transition-colors",
                  selectedTopics.has(topic)
                    ? "bg-[var(--color-brand)] border-[var(--color-brand)] text-[var(--color-text-inverse)]"
                    : "bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-brand)]"
                )}
              >
                {topic}
              </button>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            These help personalize your feed and recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          <div className="bg-[var(--color-bg-page)] rounded-xl p-6 border border-[var(--color-border-subtle)]">
            <h4 className="text-sm font-bold mb-4 text-[var(--color-text-primary)]">
              Social Links (Optional)
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">LinkedIn</label>
                <input type="text" placeholder="https://linkedin.com/in/username"
                  className="h-[50px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">Twitter / X</label>
                <input type="text" placeholder="@username"
                  className="h-[50px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">Website</label>
                <input type="text" placeholder="https://yourwebsite.com"
                  className="h-[50px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors" />
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-bg-page)] rounded-xl p-6 border border-[var(--color-border-subtle)]">
            <h4 className="text-sm font-bold mb-4 text-[var(--color-text-primary)]">Privacy</h4>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">Display Name</label>
                <input type="text" value="Visible to everyone" readOnly
                  className="h-[50px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 text-sm text-[var(--color-text-secondary)] cursor-not-allowed" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">Location Visibility</label>
                <input type="text" value="Ward only" readOnly
                  className="h-[50px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 text-sm text-[var(--color-text-secondary)] cursor-not-allowed" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-wide text-[var(--color-text-secondary)]">Email Visibility</label>
                <input type="text" value="Hidden" readOnly
                  className="h-[50px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 text-sm text-[var(--color-text-secondary)] cursor-not-allowed" />
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-3">
              Exact address is never shown publicly. Only your civic jurisdiction (Ward/City) is used for issue routing.
            </p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
