import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createIssue } from "../../issues/issuesApi";
import RichEditor from "../../../shared/components/ui/RichEditor";
import LocationPicker, { type LocationData } from "../../../shared/components/ui/LocationPicker";

interface CreateIssueFormProps {
  community: string;
  impactScope: string;
  priorityReason: string;
}

export default function CreateIssueForm({ community, impactScope, priorityReason }: CreateIssueFormProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [descriptionHtml, setDescriptionHtml] = useState("");
  const [locationData, setLocationData] = useState<LocationData>({
    latitude: null,
    longitude: null,
    address: "",
    govLevel: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapPriorityToApi = (reason: string): string => {
    if (reason.includes("Safety") || reason.includes("Public Service")) return "CRITICAL";
    if (reason.includes("Health") || reason.includes("Traffic")) return "HIGH";
    if (reason.includes("Environmental") || reason.includes("Financial")) return "MEDIUM";
    return "LOW";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // HTML might have paragraph tags even if "empty", but we check text in RichEditor
    if (!title.trim()) {
      setError("Please provide a Title.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const locationStr = locationData.address.trim() || "Locality / Ward";
      await createIssue({
        title: title.trim(),
        description: descriptionHtml || "No description provided.",
        category: community || "General",
        priority: mapPriorityToApi(priorityReason),
        location: locationStr,
        latitude: locationData.latitude || undefined,
        longitude: locationData.longitude || undefined,
        govLevel: locationData.govLevel.trim() || undefined,
      });
      navigate("/issues");
    } catch (err: any) {
      setError(err.message || "Failed to submit issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-[var(--color-error-bg)] border border-[var(--color-error)] text-[var(--color-error)] rounded-lg text-sm font-semibold">
          ⚠️ {error}
        </div>
      )}

      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full text-2xl font-bold text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] bg-transparent border-none outline-none p-0 focus:ring-0 mb-4"
          placeholder="Title*"
        />
      </div>

      <RichEditor 
        value={descriptionHtml}
        onChange={setDescriptionHtml}
        placeholder="Describe the issue in detail including duration and impact..."
      />

      <LocationPicker value={locationData} onChange={setLocationData} />

      <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 text-sm"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? "Submitting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
