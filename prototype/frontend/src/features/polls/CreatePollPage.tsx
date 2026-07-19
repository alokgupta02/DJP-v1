import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreatePollPage() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <Link to="/polls" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Polls
        </Link>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Digital Janata</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Create a Community Poll</p>
        </div>

        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm">
          <div className="h-2 bg-[var(--color-brand)]" />

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Poll Question</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Question *</label>
            <input className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]" placeholder="Example: Should our ward prioritize road repairs over beautification?" />
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Description</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">Provide context so citizens can make an informed decision.</p>
            <textarea className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] min-h-[100px]" placeholder="Explain why you're creating this poll..." />
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Poll Options</h3>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-3">
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                  Option {i}{i <= 2 ? " *" : ""}
                </label>
                <input className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]" placeholder={i <= 2 ? (i === 1 ? "Yes" : "No") : "Optional"} />
              </div>
            ))}
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Who should vote?</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Audience *</label>
            <select className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]">
              <option>My Ward</option>
              <option>My City</option>
              <option>Entire District</option>
              <option>Entire State</option>
              <option>Nationwide</option>
            </select>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Poll Duration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Start Date</label>
                <input type="date" className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">End Date</label>
                <input type="date" className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]" />
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Visibility</h3>
            <select className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]">
              <option>Public</option>
              <option>Anonymous Creator</option>
            </select>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Supporting Material</h3>
            <input type="file" multiple className="w-full text-[var(--color-text-primary)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[var(--color-brand)] file:text-[var(--color-text-inverse)] file:font-semibold file:text-sm hover:file:opacity-90" />
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Similar Polls</h3>
            <div className="p-4 bg-[var(--color-error-bg)] border-l-4 border-[var(--color-brand)] rounded-lg text-sm text-[var(--color-text-primary)]">
              🤖 Similar polls will be suggested before publishing to avoid duplicates.
            </div>
          </div>

          <div className="p-6 text-right">
            <button className="bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Create Poll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
