import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RichEditor from "../../../shared/components/ui/RichEditor";

export default function CreatePetitionForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [descriptionHtml, setDescriptionHtml] = useState("");
  const [targetGoal, setTargetGoal] = useState("");
  const [signatureTarget, setSignatureTarget] = useState("100");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatusMessage("Please provide a Title.");
      return;
    }
    
    // For now we don't have a petitionsApi, just simulating
    setStatusMessage("Creating petition...");
    setTimeout(() => {
      navigate("/petitions");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {statusMessage && (
        <div className="p-3 bg-[var(--color-error-bg)] border border-[var(--color-error)] text-[var(--color-error)] rounded-lg text-sm font-semibold">
          {statusMessage}
        </div>
      )}

      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Petition Title*"
          className="w-full text-2xl font-bold text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] bg-transparent border-none outline-none p-0 focus:ring-0 mb-4"
          required
        />
      </div>

      <RichEditor 
        value={descriptionHtml}
        onChange={setDescriptionHtml}
        placeholder="Explain why this petition is important and what you hope to achieve..."
      />

      <div className="pt-4 border-t border-[var(--color-border)]">
        <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Petition Goals</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1">Target Authority</label>
            <input
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]"
              placeholder="e.g. Municipal Commissioner"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1">Signature Target *</label>
            <select
              value={signatureTarget}
              onChange={(e) => setSignatureTarget(e.target.value)}
              className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"
            >
              <option value="50">50 Signatures</option>
              <option value="100">100 Signatures</option>
              <option value="500">500 Signatures</option>
              <option value="1000">1,000 Signatures</option>
              <option value="5000">5,000 Signatures</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-end">
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-[var(--color-brand)] text-[var(--color-text-inverse)] font-bold text-sm hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
        >
          Start Petition
        </button>
      </div>
    </form>
  );
}
