import { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPoll } from "./pollsApi";

export default function CreatePollPage() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Ward 12");
  const [opt1, setOpt1] = useState("Yes, support proposal");
  const [opt2, setOpt2] = useState("No, maintain current status");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const optionsArray = [
        { label: opt1 || "Yes", pct: 50, primary: true },
        { label: opt2 || "No", pct: 50, primary: false }
      ];
      await createPoll({
        question,
        description: description || "Community poll for " + category,
        category,
        optionsJson: JSON.stringify(optionsArray)
      });
      setStatusMessage("Poll created successfully!");
      setTimeout(() => navigate("/polls"), 1000);
    } catch (err) {
      console.error("Failed to create poll:", err);
      setStatusMessage("Failed to create poll");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/polls" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
            <ArrowLeft size={16} />
            Back to Polls
          </Link>
          {statusMessage && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-xs font-bold animate-fade-in">
              <CheckCircle2 size={14} />
              {statusMessage}
            </div>
          )}
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Digital Janata</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Create a Community Poll</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm">
          <div className="h-2 bg-[var(--color-brand)]" />

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Poll Question</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Question *</label>
            <input 
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]" 
              placeholder="Example: Should our ward prioritize road repairs over beautification?" 
            />
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Description</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">Provide context so citizens can make an informed decision.</p>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] min-h-[100px]" 
              placeholder="Explain why you're creating this poll..." 
            />
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Poll Options</h3>
            <div className="mb-3">
              <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Option 1 *</label>
              <input 
                required
                value={opt1}
                onChange={(e) => setOpt1(e.target.value)}
                className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]" 
                placeholder="Yes" 
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Option 2 *</label>
              <input 
                required
                value={opt2}
                onChange={(e) => setOpt2(e.target.value)}
                className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]" 
                placeholder="No" 
              />
            </div>
          </div>

          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Who should vote?</h3>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Audience *</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-transparent text-[var(--color-text-primary)]"
            >
              <option value="Ward 12">My Ward (Ward 12)</option>
              <option value="City">My City</option>
              <option value="District">Entire District</option>
              <option value="State">Entire State</option>
              <option value="National">Nationwide</option>
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

          <div className="p-6 text-right">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Poll"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
