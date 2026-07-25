import { useState } from "react";
import { Tag as TagIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createDiscussion } from "../../discussions/discussionsApi";
import RichEditor from "../../../shared/components/ui/RichEditor";

interface CreateDiscussionFormProps {
  community: string;
}

export default function CreateDiscussionForm({ community }: CreateDiscussionFormProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [descriptionHtml, setDescriptionHtml] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInputOpen, setTagInputOpen] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleAddTag = () => {
    const trimmed = newTag.trim().replace(/^#/, "");
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setNewTag("");
      setTagInputOpen(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatusMessage("Please provide a Title.");
      return;
    }

    try {
      await createDiscussion({
        title,
        description: descriptionHtml || "No description provided.",
        category: community || "General",
        proposalPreview: "Drafting community proposal...",
        proposalBadge: "New"
      });
      navigate("/discussions");
    } catch (err) {
      console.error("Failed to post discussion:", err);
      setStatusMessage("Error posting discussion");
    }
  };

  return (
    <form onSubmit={handlePost} className="space-y-4">
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
          placeholder="Title*"
          className="w-full text-2xl font-bold text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] bg-transparent border-none outline-none p-0 focus:ring-0"
          required
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-bg-subtle)] text-xs font-semibold text-[var(--color-text-primary)] border border-[var(--color-border)]"
          >
            #{tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="hover:text-[var(--color-brand)] transition-colors cursor-pointer"
            >
              <X size={13} />
            </button>
          </span>
        ))}

        {!tagInputOpen ? (
          <button
            type="button"
            onClick={() => setTagInputOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-xs font-semibold text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-text-primary)] transition-all cursor-pointer shadow-2xs"
          >
            <TagIcon size={13} />
            Add tags
          </button>
        ) : (
          <div className="inline-flex items-center gap-1 bg-[var(--color-bg-surface)] border border-[var(--color-brand)] rounded-full px-2.5 py-1">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="tag name..."
              autoFocus
              className="text-xs font-semibold bg-transparent border-none outline-none w-24 text-[var(--color-text-primary)]"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="text-xs font-bold text-[var(--color-brand)] hover:opacity-80 px-1 cursor-pointer"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setTagInputOpen(false)}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
            >
              <X size={13} />
            </button>
          </div>
        )}
      </div>

      <RichEditor 
        value={descriptionHtml}
        onChange={setDescriptionHtml}
        placeholder="Body text (optional)"
      />

      <div className="pt-4 flex items-center justify-end">
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-[var(--color-brand)] text-[var(--color-text-inverse)] font-bold text-sm hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
        >
          Post
        </button>
      </div>
    </form>
  );
}
