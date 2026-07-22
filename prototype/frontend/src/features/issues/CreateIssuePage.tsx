import { useState } from "react";
import { ArrowLeft, MapPin, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createIssue } from "./issuesApi";

export default function CreateIssuePage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Garbage");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [impactScope, setImpactScope] = useState("🏘️ My neighborhood (10–50 people)");
  const [priorityReason, setPriorityReason] = useState("Health & Hygiene Concern");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Map user priority selection to API enum (HIGH, MEDIUM, LOW, CRITICAL)
  const mapPriorityToApi = (reason: string): string => {
    if (reason.includes("Safety") || reason.includes("Public Service")) return "CRITICAL";
    if (reason.includes("Health") || reason.includes("Traffic")) return "HIGH";
    if (reason.includes("Environmental") || reason.includes("Financial")) return "MEDIUM";
    return "LOW";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Please fill in both Title and Description.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const locationStr = [address.trim(), pincode.trim()].filter(Boolean).join(", ") || "Locality / Ward";
      await createIssue({
        title: title.trim(),
        description: description.trim(),
        category,
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
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <Link to="/issues" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Issues
        </Link>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Digital Janata</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Report a Civic Issue</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[var(--color-error-bg)] border border-[var(--color-error)] text-[var(--color-error)] rounded-xl text-sm font-semibold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm">
          <div className="h-2 bg-[var(--color-brand)]" />

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Issue Category</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]"
            >
              <option value="Garbage">Garbage</option>
              <option value="Pothole">Pothole</option>
              <option value="Water">Water</option>
              <option value="Road">Road</option>
              <option value="Street Light">Street Light</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Issue Details</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]"
              placeholder="Short descriptive title (e.g. Overflowing bin on High St)"
            />
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mt-4 mb-2">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] min-h-[120px]"
              placeholder="Describe the issue in detail including duration and impact..."
            />
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Address / Landmark</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]"
                  placeholder="e.g. Ward 4 High St"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">PIN Code</label>
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]"
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
              className="mt-3 flex items-center gap-2 bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              <MapPin size={16} />
              Use Current Location
            </button>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Who is affected?</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">Estimate the scale of people impacted by this issue.</p>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Impact Scope *</label>
            <select
              value={impactScope}
              onChange={(e) => setImpactScope(e.target.value)}
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]"
            >
              <option value="👤 Just me">👤 Just me</option>
              <option value="👨‍👩‍👧 My household / Family">👨‍👩‍👧 My household / Family</option>
              <option value="🏘️ My neighborhood (10–50 people)">🏘️ My neighborhood (10–50 people)</option>
              <option value="📍 My locality (50–500 people)">📍 My locality (50–500 people)</option>
              <option value="🏛️ Entire Ward">🏛️ Entire Ward</option>
              <option value="🌆 Entire City">🌆 Entire City</option>
              <option value="🏢 Entire District">🏢 Entire District</option>
              <option value="🌐 Entire State">🌐 Entire State</option>
              <option value="🇮🇳 Nationwide">🇮🇳 Nationwide</option>
              <option value="❓ Not Sure">❓ Not Sure</option>
            </select>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Priority / Impact</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">If this isn't fixed soon, what could happen?</p>
            <select
              value={priorityReason}
              onChange={(e) => setPriorityReason(e.target.value)}
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]"
            >
              <option value="Minor inconvenience">Minor inconvenience</option>
              <option value="Health & Hygiene Concern">Health & Hygiene Concern</option>
              <option value="Safety Risk">Safety Risk</option>
              <option value="Environmental Damage">Environmental Damage</option>
              <option value="Traffic Disruption">Traffic Disruption</option>
              <option value="Financial Loss">Financial Loss</option>
              <option value="Public Service Disruption">Public Service Disruption</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Evidence</h3>
            <input type="file" multiple className="w-full text-[var(--color-text-primary)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[var(--color-brand)] file:text-[var(--color-text-inverse)] file:font-semibold file:text-sm hover:file:opacity-90" />
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Similar Issues</h3>
            <div className="p-4 bg-[var(--color-error-bg)] border-l-4 border-[var(--color-brand)] rounded-lg text-sm text-[var(--color-text-primary)]">
              🤖 Similar issues will be checked automatically before submission.
            </div>
          </div>

          <div className="p-6 text-right">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Submitting..." : "Submit Issue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
