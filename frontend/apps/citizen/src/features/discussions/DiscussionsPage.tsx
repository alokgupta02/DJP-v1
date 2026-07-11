import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronUp, ChevronDown, Plus } from "lucide-react";
import clsx from "clsx";

interface Discussion {
  id: string;
  category: string;
  time: string;
  title: string;
  description: string;
  votes: number;
  participantCount: number;
  proposalCount: number;
  proposalPreview: string;
  proposalBadge: string;
  proposalBadgeVariant: "primary" | "warning" | "info" | "muted";
}

const DISCUSSIONS: Discussion[] = [
  { id: "1", category: "Infrastructure", time: "Posted 2h ago", title: "Sustainable Multi-level Parking in Hauz Khas Village?", description: "The current congestion is killing local businesses. We need a solution that balances foot traffic with environmental concerns and heritage preservation.", votes: 142, participantCount: 48, proposalCount: 3, proposalPreview: "\"Implement an automated smart-stack parking system integrated with existing greenery to minimize concrete footprint...\"", proposalBadge: "Top Draft", proposalBadgeVariant: "primary" },
  { id: "2", category: "Public Health", time: "Posted 5h ago", title: "Decentralized Waste Composting Units for Ward 42", description: "Moving away from centralized landfills. Proposal for local RWA-managed composting zones to reduce trucking emissions.", votes: 89, participantCount: 22, proposalCount: 1, proposalPreview: "\"Convert the derelict park corner into a modular biogas and composting facility with community education center...\"", proposalBadge: "New", proposalBadgeVariant: "warning" },
  { id: "3", category: "Traffic", time: "Posted Yesterday", title: "Pedestrianization of Inner Circle: Community Impact", description: "Debating the plan to make the market area vehicle-free on weekends. Need to discuss alternate parking and shuttle routes.", votes: 312, participantCount: 156, proposalCount: 5, proposalPreview: "\"Implement an electric golf-cart shuttle system for senior citizens while strictly banning private SUVs...\"", proposalBadge: "Controversial", proposalBadgeVariant: "info" },
  { id: "4", category: "Environment", time: "Posted 2d ago", title: "Solar Roof-top Mandate for Commercial Blocks", description: "Incentivizing the shift to green energy. How can we make the initial cost manageable for small shop owners?", votes: 54, participantCount: 12, proposalCount: 2, proposalPreview: "\"Group procurement model to drive down panel costs by 30% through bulk purchasing for the entire block...\"", proposalBadge: "Drafting", proposalBadgeVariant: "muted" },
];

const badgeVariantStyles: Record<string, string> = {
  primary: "bg-[var(--color-brand)]/10 text-[var(--color-brand)]",
  warning: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  info: "bg-[var(--color-info-bg)] text-[var(--color-info)]",
  muted: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
};

export default function DiscussionsPage() {
  const [votes, setVotes] = useState<Record<string, "up" | "down" | null>>({});

  function handleVote(id: string, dir: "up" | "down") {
    setVotes((prev) => {
      const current = prev[id];
      if (current === dir) return { ...prev, [id]: null };
      return { ...prev, [id]: dir };
    });
  }

  function getVoteCount(base: number, id: string): number {
    const v = votes[id];
    if (v === "up") return base + 1;
    if (v === "down") return base - 1;
    return base;
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-8 py-8 flex items-end justify-between max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-[var(--text-heading)] font-bold text-[var(--color-text-primary)]">Discussions</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Collaborate with your community to explore civic problems and solutions.</p>
        </div>
        <Link to="/discussions/new" className="bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md">
          <Plus size={18} />
          Start Discussion
        </Link>
      </div>

      <div className="border-y border-[var(--color-border)] bg-[var(--color-bg-surface)] sticky top-0 z-20">
        <div className="px-8 py-4 max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Filters:</span>
            <select className="bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-full px-4 py-1.5 text-sm focus:ring-1 focus:ring-[var(--color-brand)] outline-none text-[var(--color-text-primary)]">
              <option>Category: All</option>
              <option>Infrastructure</option>
              <option>Environment</option>
              <option>Safety</option>
            </select>
            <select className="bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-full px-4 py-1.5 text-sm focus:ring-1 focus:ring-[var(--color-brand)] outline-none text-[var(--color-text-primary)]">
              <option>Gov Level: All</option>
              <option>MCD</option>
              <option>Delhi Govt</option>
              <option>Central</option>
            </select>
            <select className="bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-full px-4 py-1.5 text-sm focus:ring-1 focus:ring-[var(--color-brand)] outline-none text-[var(--color-text-primary)]">
              <option>Status: Open</option>
              <option>Resolved</option>
              <option>Drafting</option>
            </select>
          </div>
          <div className="h-6 w-px bg-[var(--color-border)] mx-2" />
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Sort:</span>
            <select className="bg-transparent border-none text-sm font-bold text-[var(--color-brand)] outline-none cursor-pointer">
              <option>Trending Now</option>
              <option>Newest First</option>
              <option>Most Proposals</option>
            </select>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20">
          {DISCUSSIONS.map((discussion) => (
            <div
              key={discussion.id}
              className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-2xl p-5 hover:shadow-lg transition-shadow cursor-pointer flex flex-col gap-4 group"
            >
              <div className="flex gap-4">
                <div className="flex flex-col items-center bg-[var(--color-bg-subtle)] rounded-xl px-3 py-2 shrink-0 h-fit">
                  <button
                    onClick={(e) => { e.preventDefault(); handleVote(discussion.id, "up"); }}
                    className={clsx("transition-colors", votes[discussion.id] === "up" ? "text-[var(--color-brand)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-brand)]")}
                  >
                    <ChevronUp size={20} />
                  </button>
                  <span className={clsx("text-sm font-bold", votes[discussion.id] === "up" ? "text-[var(--color-brand)]" : votes[discussion.id] === "down" ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-primary)]")}>
                    {getVoteCount(discussion.votes, discussion.id)}
                  </span>
                  <button
                    onClick={(e) => { e.preventDefault(); handleVote(discussion.id, "down"); }}
                    className={clsx("transition-colors", votes[discussion.id] === "down" ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]")}
                  >
                    <ChevronDown size={20} />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] rounded text-[10px] font-bold uppercase">{discussion.category}</span>
                    <span className="text-[11px] text-[var(--color-text-secondary)]">{discussion.time}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors leading-tight mb-2">{discussion.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">{discussion.description}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(discussion.participantCount > 50 ? 3 : 2, 3) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-white bg-[var(--color-bg-subtle)]"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[var(--color-text-secondary)]">{discussion.participantCount} participants</span>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-bg-subtle)] p-3 rounded-xl border-l-4 border-[var(--color-brand)]/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-[var(--color-brand)]">{discussion.proposalCount} Proposals</span>
                  <span className={clsx("text-[10px] px-1.5 rounded uppercase font-bold", badgeVariantStyles[discussion.proposalBadgeVariant])}>{discussion.proposalBadge}</span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] italic line-clamp-2">{discussion.proposalPreview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="hidden lg:flex flex-col w-80 border-l border-[var(--color-border)] bg-[var(--color-bg-surface)] shrink-0 overflow-y-auto">
        <div className="p-6 space-y-8">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-primary)] mb-4">Trending Topics</h4>
            <div className="flex flex-wrap gap-2">
              {["#WasteManagement", "#TrafficPolicy", "#SmartHauzKhas", "#PublicSafety"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-[var(--color-bg-subtle)] rounded-full text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-brand-light)] hover:text-[var(--color-brand)] transition-colors cursor-pointer">{tag}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-primary)] mb-4">Most Active</h4>
            <ul className="space-y-4">
              {[
                { title: "Night Market Security Enhancements", comments: "24 new comments today" },
                { title: "Rethinking Park Lighting Hours", comments: "12 new comments today" },
              ].map((item) => (
                <li key={item.title} className="group cursor-pointer">
                  <p className="text-sm text-[var(--color-text-primary)] line-clamp-2 group-hover:text-[var(--color-brand)] transition-colors">{item.title}</p>
                  <span className="text-[11px] text-[var(--color-text-secondary)]">{item.comments}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-primary)] mb-4">Community Moderators</h4>
            <div className="space-y-3">
              {[
                { initials: "AS", name: "Arjun Singh", role: "Verified Official" },
                { initials: "PS", name: "Priya Sharma", role: "Community Lead" },
              ].map((mod) => (
                <div key={mod.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-bg-subtle)] flex items-center justify-center text-xs font-bold text-[var(--color-text-primary)]">{mod.initials}</div>
                  <div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">{mod.name}</p>
                    <span className="text-[10px] text-[var(--color-brand)] uppercase font-bold tracking-tighter">{mod.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--color-bg-muted)] rounded-2xl p-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-primary)] mb-3">Upcoming Meetings</h4>
            <div className="space-y-4">
              {[
                { month: "OCT", day: "14", title: "Ward 42 Budget Review", detail: "6:00 PM • Community Center" },
                { month: "OCT", day: "16", title: "Waste Policy Draft", detail: "11:00 AM • Zoom" },
              ].map((m) => (
                <div key={m.title} className="flex gap-3">
                  <div className="w-10 h-12 bg-[var(--color-bg-surface)] rounded-lg flex flex-col items-center justify-center border border-[var(--color-border)] shrink-0">
                    <span className="text-[10px] font-bold text-[var(--color-brand)] uppercase">{m.month}</span>
                    <span className="text-lg font-bold leading-none text-[var(--color-text-primary)]">{m.day}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--color-text-primary)] truncate">{m.title}</p>
                    <span className="text-[11px] text-[var(--color-text-secondary)]">{m.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
