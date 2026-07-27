import { useState } from "react";
import { FileText, Clock } from "lucide-react";
import clsx from "clsx";

const PETITIONS = [
  {
    id: "1", title: "Repair the Main Street Bridge Access Road",
    description: "We the residents of Ward 12 request immediate repair of the access road leading to the Main Street Bridge. The road has been in disrepair for over 6 months.",
    category: "Infrastructure", signatures: 1284, goal: 2500, deadline: "Jan 15, 2025",
    author: "Ward 12 Residents Welfare Assoc.", daysLeft: 12,
  },
  {
    id: "2", title: "Install Speed Bumps Near Balewadi School Zone",
    description: "Petitioning the Municipal Corporation to install speed bumps on the road passing Balewadi High School to ensure student safety during peak hours.",
    category: "Road Safety", signatures: 843, goal: 1500, deadline: "Feb 28, 2025",
    author: "Parent-Teacher Association", daysLeft: 56,
  },
  {
    id: "3", title: "Restore Weekly Farmers Market in Sector 7",
    description: "Request to the District Administration to restore the weekly farmers market that was discontinued last quarter, affecting local farmers and residents.",
    category: "Markets", signatures: 2156, goal: 3000, deadline: "Mar 10, 2025",
    author: "Sector 7 Market Committee", daysLeft: 66,
  },
];

const FILTER_TABS = ["Trending", "Recent", "Near Me", "Signed", "Created"];

export default function PetitionsPage() {
  const [activeTab, setActiveTab] = useState("Trending");

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8 pb-0">
        <div className="flex items-end justify-between w-full mb-6">
          <div>
            <h1 className="text-[var(--text-heading)] font-bold text-[var(--color-text-primary)]">Petitions</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Add your voice to community petitions or start a new one.</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap",
                activeTab === tab
                  ? "bg-[var(--color-brand)] text-[var(--color-text-inverse)]"
                  : "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-muted)]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {PETITIONS.map((p) => {
            const pct = Math.round((p.signatures / p.goal) * 100);
            return (
              <div key={p.id} className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-[11px] font-semibold">
                    {p.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-secondary)]">
                    <Clock size={12} />
                    {p.daysLeft} days left
                  </span>
                </div>

                <h3 className="font-bold text-lg text-[var(--color-text-primary)] leading-snug">{p.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2 line-clamp-2">{p.description}</p>

                <div className="mt-5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-[var(--color-text-primary)]">{p.signatures.toLocaleString()} signatures</span>
                    <span className="text-[var(--color-text-secondary)]">Goal: {p.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2.5 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-brand)] rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                    <FileText size={14} />
                    {p.author}
                  </div>
                  <button className="bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
                    Sign
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
