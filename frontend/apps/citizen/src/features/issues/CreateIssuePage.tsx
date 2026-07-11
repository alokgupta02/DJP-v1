import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateIssuePage() {
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

        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm">
          <div className="h-2 bg-[var(--color-brand)]" />

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Issue Category</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Category *</label>
            <select className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]">
              <option>Select Category</option>
              <option>Garbage</option>
              <option>Pothole</option>
              <option>Water</option>
              <option>Road</option>
              <option>Street Light</option>
              <option>Other</option>
            </select>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Issue Details</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Title *</label>
            <input className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]" placeholder="Short descriptive title" />
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mt-4 mb-2">Description *</label>
            <textarea className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] min-h-[120px]" placeholder="Describe the issue..." />
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Address / Landmark</label>
                <input className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">PIN Code</label>
                <input className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]" />
              </div>
            </div>
            <button className="mt-3 flex items-center gap-2 bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm">
              <MapPin size={16} />
              Use Current Location
            </button>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Who is affected?</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">Estimate the scale of people impacted by this issue.</p>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Impact Scope *</label>
            <select className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]">
              <option disabled selected>Select Impact Scope</option>
              <option>👤 Just me</option>
              <option>👨‍👩‍👧 My household / Family</option>
              <option>🏘️ My neighborhood (10–50 people)</option>
              <option>📍 My locality (50–500 people)</option>
              <option>🏛️ Entire Ward</option>
              <option>🌆 Entire City</option>
              <option>🏢 Entire District</option>
              <option>🌐 Entire State</option>
              <option>🇮🇳 Nationwide</option>
              <option>❓ Not Sure</option>
            </select>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Priority / Impact</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">If this isn't fixed soon, what could happen?</p>
            <select className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]">
              <option>Minor inconvenience</option>
              <option>Health & Hygiene Concern</option>
              <option>Safety Risk</option>
              <option>Environmental Damage</option>
              <option>Traffic Disruption</option>
              <option>Financial Loss</option>
              <option>Public Service Disruption</option>
              <option>Other</option>
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
            <button className="bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Submit Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
