import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createIssue } from "../../issues/issuesApi";
import RichEditor from "../../../shared/components/ui/RichEditor";

interface CreateIssueFormProps {
  community: string;
}

export default function CreateIssueForm({ community }: CreateIssueFormProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [descriptionHtml, setDescriptionHtml] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [impactScope, setImpactScope] = useState("🏘️ Neighborhood (10–50 people)");
  const [priorityReason, setPriorityReason] = useState("Health & Hygiene Concern");
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
      const locationStr = [address.trim(), pincode.trim()].filter(Boolean).join(", ") || "Locality / Ward";
      await createIssue({
        title: title.trim(),
        description: descriptionHtml || "No description provided.",
        category: community || "General",
        priority: mapPriorityToApi(priorityReason),
        location: locationStr,
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

      <div className="pt-4 mt-4 border-t border-[var(--color-border)]">
        <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Location</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1">Address / Landmark</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"
              placeholder="e.g. Ward 4 High St"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1">PIN Code</label>
            <input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"
              placeholder="e.g. 560001"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setAddress("High St Ward 4 near Market");
            setPincode("560001");
          }}
          className="mt-2 flex items-center gap-1.5 text-[var(--color-brand)] font-semibold hover:opacity-80 transition-opacity text-xs"
        >
          <MapPin size={14} />
          Use Current Location
        </button>
      </div>

      <div className="pt-4 border-t border-[var(--color-border)]">
        <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Impact & Priority</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1">Impact Scope *</label>
            <select
              value={impactScope}
              onChange={(e) => setImpactScope(e.target.value)}
              className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"
            >
              <option value="🏘️ Neighborhood (10–50 people)">🏘️ Neighborhood (10–50 people)</option>
              <option value="📍 Locality (50–500 people)">📍 Locality (50–500 people)</option>
              <option value="🏛️ Ward">🏛️ Ward</option>
              <option value="🌆 City">🌆 City</option>
              <option value="🏢 District">🏢 District</option>
              <option value="🌐 State">🌐 State</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1">Priority / Risk</label>
            <select
              value={priorityReason}
              onChange={(e) => setPriorityReason(e.target.value)}
              className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"
            >
              <option value="Minor inconvenience">Minor inconvenience</option>
              <option value="Health & Hygiene Concern">Health & Hygiene Concern</option>
              <option value="Safety Risk">Safety Risk</option>
              <option value="Environmental Damage">Environmental Damage</option>
              <option value="Traffic Disruption">Traffic Disruption</option>
              <option value="Financial Loss">Financial Loss</option>
              <option value="Public Service Disruption">Public Service Disruption</option>
            </select>
          </div>
        </div>
      </div>

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
