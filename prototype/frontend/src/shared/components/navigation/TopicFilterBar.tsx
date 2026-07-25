import { useState } from "react";
import { Flame, ChevronDown } from "lucide-react";
import clsx from "clsx";

export const TOPICS = [
  "All Topics", "Roads", "Garbage", "Water", "Electricity",
  "Judiciary", "Education", "Healthcare", "Police", "Environment",
  "Economy", "More",
];

export default function TopicFilterBar() {
  const [activeTopic, setActiveTopic] = useState("All Topics");

  return (
    <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-4 mb-6 rounded-xl relative">
      <div className="flex items-center justify-end absolute top-4 right-4 z-10">
        <button className="flex items-center gap-2 h-9 px-4 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)] transition-colors text-sm font-medium text-[var(--color-text-primary)]">
          <Flame size={16} />
          Trending
          <ChevronDown size={14} className="text-[var(--color-text-secondary)]" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 pr-40">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => setActiveTopic(topic)}
            className={clsx(
              "px-3 py-1.5 rounded-full text-sm transition-colors",
              activeTopic === topic
                ? "bg-[var(--color-brand-light)] text-[var(--color-brand)] font-semibold"
                : "border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]"
            )}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
