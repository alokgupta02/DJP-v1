import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateDiscussionPage() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <Link to="/discussions" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Discussions
        </Link>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Digital Janata</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Start a Civic Discussion</p>
        </div>

        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm">
          <div className="h-2 bg-[var(--color-brand)]" />

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Discussion Category</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Category *</label>
            <select className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]">
              <option>Infrastructure</option>
              <option>Education</option>
              <option>Healthcare</option>
              <option>Governance</option>
              <option>Environment</option>
              <option>Economy</option>
              <option>Other</option>
            </select>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Title</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Discussion Title *</label>
            <input className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]" placeholder="Example: Should our ward prioritize road repairs over beautification?" />
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Your Discussion</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Body *</label>
            <textarea className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] min-h-[130px]" placeholder="Share your thoughts, context and invite constructive discussion..." />
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Objective</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">What do you want from this discussion?</label>
            <select className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]">
              <option>Gather opinions</option>
              <option>Find solutions</option>
              <option>Raise awareness</option>
              <option>Ask a question</option>
              <option>Policy discussion</option>
            </select>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Geographic Scope</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Discussion applies to</label>
            <select className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]">
              <option>My Ward</option>
              <option>My City</option>
              <option>District</option>
              <option>State</option>
              <option>Nationwide</option>
            </select>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Supporting Material</h3>
            <input type="file" multiple className="w-full text-[var(--color-text-primary)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[var(--color-brand)] file:text-[var(--color-text-inverse)] file:font-semibold file:text-sm hover:file:opacity-90" />
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Tags</h3>
            <input className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]" placeholder="roads, traffic, municipality" />
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Visibility</h3>
            <select className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]">
              <option>Public</option>
              <option>Anonymous</option>
            </select>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Similar Discussions</h3>
            <div className="p-4 bg-[var(--color-error-bg)] border-l-4 border-[var(--color-brand)] rounded-lg text-sm text-[var(--color-text-primary)]">
              🤖 Similar discussions will be suggested before publishing.
            </div>
          </div>

          <div className="p-6 text-right">
            <button className="bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Publish Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
