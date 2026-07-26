import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPoll } from "../../polls/pollsApi";
import RichEditor from "../../../shared/components/ui/RichEditor";
import LocationPicker, { type LocationData } from "../../../shared/components/ui/LocationPicker";

interface CreatePollFormProps {
  community: string;
}

export default function CreatePollForm({ community }: CreatePollFormProps) {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [descriptionHtml, setDescriptionHtml] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [locationData, setLocationData] = useState<LocationData>({
    latitude: null,
    longitude: null,
    address: "",
    govLevel: ""
  });
  const [visibility, setVisibility] = useState("Public");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setStatusMessage("Please provide a question.");
      return;
    }
    if (!opt1.trim() || !opt2.trim()) {
      setStatusMessage("Please provide at least 2 options.");
      return;
    }

    setLoading(true);
    setStatusMessage(null);
    try {
      const optionsArray = [
        { label: opt1, pct: 50, primary: true },
        { label: opt2, pct: 50, primary: false }
      ];
      await createPoll({
        question,
        description: descriptionHtml || "Community poll for " + (community || "General"),
        category: community || "General",
        optionsJson: JSON.stringify(optionsArray),
        location: locationData.address.trim() || undefined,
        latitude: locationData.latitude || undefined,
        longitude: locationData.longitude || undefined,
        govLevel: locationData.govLevel.trim() || undefined,
      });
      navigate("/polls");
    } catch (err) {
      console.error("Failed to create poll:", err);
      setStatusMessage("Failed to create poll");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {statusMessage && (
        <div className="p-3 bg-[var(--color-error-bg)] border border-[var(--color-error)] text-[var(--color-error)] rounded-lg text-sm font-semibold">
          ⚠️ {statusMessage}
        </div>
      )}

      <div>
        <input 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          className="w-full text-2xl font-bold text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] bg-transparent border-none outline-none p-0 focus:ring-0 mb-4" 
          placeholder="Poll Question*" 
        />
      </div>

      <RichEditor 
        value={descriptionHtml}
        onChange={setDescriptionHtml}
        placeholder="Provide context so citizens can make an informed decision... (optional)"
        minHeight="min-h-[120px]"
      />

      <div className="pt-4 border-t border-[var(--color-border)]">
        <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Poll Options *</h3>
        <div className="space-y-3">
          <input 
            required
            value={opt1}
            onChange={(e) => setOpt1(e.target.value)}
            className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]" 
            placeholder="Option 1 (e.g., Yes, support proposal)" 
          />
          <input 
            required
            value={opt2}
            onChange={(e) => setOpt2(e.target.value)}
            className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]" 
            placeholder="Option 2 (e.g., No, maintain current status)" 
          />
        </div>
      </div>

      <LocationPicker value={locationData} onChange={setLocationData} />

      <div className="pt-4 border-t border-[var(--color-border)]">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">Duration</h3>
            <div className="grid grid-cols-2 gap-2">
              <input type="date" className="w-full p-2 text-sm border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]" />
              <input type="date" className="w-full p-2 text-sm border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">Visibility</h3>
            <select 
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]"
            >
              <option>Public</option>
              <option>Anonymous Creator</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--color-border)] flex justify-end">
        <button 
          type="submit" 
          disabled={loading}
          className="px-6 py-2 rounded-full bg-[var(--color-brand)] text-[var(--color-text-inverse)] font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-sm"
        >
          {loading ? "Creating..." : "Create Poll"}
        </button>
      </div>
    </form>
  );
}
