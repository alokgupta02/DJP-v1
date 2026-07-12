import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Vote, MessageSquare, Share2, ChevronRight, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import clsx from "clsx";

const FILTER_TABS = ["Open", "Closed", "My Polls", "Following", "Needs Your Vote", "Near Me"];

const POLLS = [
  {
    id: "1", featured: true, category: "High Priority", timeLeft: "2 days remaining",
    question: 'Should Ward 12 implement "No Car Sundays" on the Central Corridor?',
    description: "This proposal aims to reduce local carbon emissions and promote pedestrian activity. The pilot would run for 6 months between 8 AM and 4 PM.",
    options: [
      { label: "Yes, implement it", pct: 64, primary: true },
      { label: "No, maintain current traffic", pct: 36, primary: false },
    ],
    votes: "12,402", comments: 482,
  },
  { id: "2", featured: false, badge: "Environment", badgeClass: "bg-[var(--color-brand)]", timeLeft: "5d", question: "Increase funding for Ward 12 Community Gardens?", pct: 82, votes: "4.1k" },
  { id: "3", featured: false, badge: "Infrastructure", badgeClass: "bg-[var(--color-text-secondary)]", timeLeft: "12h", question: "Upgrade Street Lighting on North Avenue?", pct: 45, votes: "2.8k" },
  { id: "4", featured: false, badge: "Policy", badgeClass: "bg-[var(--color-brand)]", timeLeft: "1w", question: "Mandatory Solar Panels for New Developments?", pct: 58, votes: "9.2k" },
  { id: "5", featured: false, badge: "Services", badgeClass: "bg-[var(--color-brand)]", timeLeft: "2d", question: "Expand Public Library Weekend Hours?", pct: 91, votes: "1.5k" },
];

export default function PollsPage() {
  const [activeTab, setActiveTab] = useState("Open");

  return (
    <div className="flex-1 flex min-h-0">
      <div className="flex-1 p-8 space-y-6 border-r border-[var(--color-border)] overflow-y-auto">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-[var(--text-display)] font-bold text-[var(--color-text-primary)]">Polls</h1>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-xl">Vote on civic decisions that matter to your community. Your voice directly influences policy and administrative actions.</p>
          </div>
          <Link to="/polls/new" className="px-8 py-3 bg-[var(--color-brand)] text-[var(--color-text-inverse)] font-bold rounded-full flex items-center gap-2 hover:opacity-90 transition-all shadow-md">
            <Plus size={18} />
            Create Poll
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors",
                  activeTab === tab
                    ? "bg-[var(--color-brand)] text-[var(--color-text-inverse)]"
                    : "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)]"
                )}
              >
                {tab === "Needs Your Vote" && <AlertTriangle size={14} className="inline mr-1" />}
                {tab === "Near Me" && <Clock size={14} className="inline mr-1" />}
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-full px-4 py-1.5 text-sm text-[var(--color-text-secondary)] focus:ring-[var(--color-brand)] outline-none min-w-[140px]">
              <option>Gov Level</option>
            </select>
            <select className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-full px-4 py-1.5 text-sm text-[var(--color-text-secondary)] focus:ring-[var(--color-brand)] outline-none min-w-[140px]">
              <option>Ward 12</option>
            </select>
            <select className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-full px-4 py-1.5 text-sm text-[var(--color-text-secondary)] focus:ring-[var(--color-brand)] outline-none min-w-[140px]">
              <option>Category</option>
            </select>
            <div className="ml-auto flex items-center gap-2 text-[var(--color-text-secondary)] text-xs">
              <span>Sorted by: Recent</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {POLLS.map((poll) => {
            if (poll.featured) {
              return (
                <div key={poll.id} className="group bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-6 rounded-xl hover:shadow-xl transition-all duration-300 xl:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-[var(--color-brand-light)] text-[var(--color-brand)] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">{poll.category}</span>
                      <span className="text-[var(--color-text-secondary)] text-xs flex items-center gap-1">
                        <Clock size={14} />
                        {poll.timeLeft}
                      </span>
                    </div>
                    <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
                      •••
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-brand)] transition-colors">{poll.question}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-2">{poll.description}</p>

                  <div className="space-y-4 mb-6">
                    {poll.options!.map((opt) => (
                      <div key={opt.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-[var(--color-text-primary)]">{opt.label}</span>
                          <span className={opt.primary ? "text-[var(--color-brand)] font-bold" : "text-[var(--color-text-secondary)]"}>{opt.pct}%</span>
                        </div>
                        <div className="h-3 w-full bg-[var(--color-bg-subtle)] rounded-full overflow-hidden">
                          <div className={clsx("h-full rounded-full", opt.primary ? "bg-[var(--color-brand)]" : "bg-[var(--color-text-secondary)]")} style={{ width: `${opt.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                      <span className="flex items-center gap-1"><Vote size={16} /> {poll.votes} votes</span>
                      <span className="flex items-center gap-1"><MessageSquare size={16} /> {poll.comments} comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-6 py-2 bg-[var(--color-brand)] text-[var(--color-text-inverse)] font-bold rounded-full hover:scale-105 transition-transform text-sm">Vote Now</button>
                      <button className="p-2 border border-[var(--color-border)] rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={poll.id} className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-6 rounded-xl hover:border-[var(--color-brand)] transition-colors flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className={clsx("text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-tight", poll.badgeClass)}>{poll.badge}</span>
                  <span className="text-[var(--color-text-secondary)] text-[11px] ml-auto">{poll.timeLeft} left</span>
                </div>
                <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 line-clamp-2">{poll.question}</h4>
                <div className="mt-auto space-y-4">
                  <div className="h-2 w-full bg-[var(--color-bg-subtle)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-brand)] opacity-80 rounded-full" style={{ width: `${poll.pct}%` }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-secondary)]">{poll.votes} votes</span>
                    <button className="text-[var(--color-brand)] font-bold text-xs flex items-center gap-1 hover:underline">
                      Vote <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <aside className="w-80 shrink-0 p-8 space-y-6 bg-[var(--color-bg-surface)] overflow-y-auto hidden lg:flex flex-col">
        <section>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">Poll Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-brand-light)] p-4 rounded-lg border border-[var(--color-brand)]/20">
              <p className="text-[var(--color-brand)] text-[var(--text-display)] font-bold leading-tight">42k</p>
              <p className="text-[11px] text-[var(--color-text-secondary)]">Total Votes</p>
            </div>
            <div className="bg-[var(--color-bg-subtle)] p-4 rounded-lg border border-[var(--color-border)]">
              <p className="text-[var(--color-text-primary)] text-[var(--text-display)] font-bold leading-tight">24</p>
              <p className="text-[11px] text-[var(--color-text-secondary)]">Active Polls</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">Closing Soon</h3>
          <div className="space-y-3">
            {[
              { title: "Metro Expansion Plan B", time: "Closing in 1h 45m", urgent: true },
              { title: "Youth Center Grant Allocation", time: "Closing in 4h", urgent: false },
            ].map((item) => (
              <div key={item.title} className={clsx("p-3 bg-[var(--color-bg-surface)] rounded-r-lg shadow-sm hover:shadow-md transition-shadow border-l-4", item.urgent ? "border-[var(--color-error)]" : "border-[var(--color-brand)]")}>
                <p className="text-sm font-bold text-[var(--color-text-primary)] line-clamp-1">{item.title}</p>
                <p className={clsx("text-[11px]", item.urgent ? "text-[var(--color-error)]" : "text-[var(--color-text-secondary)]")}>{item.time}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">Trending</h3>
            <TrendingUp size={16} className="text-[var(--color-brand)]" />
          </div>
          <div className="space-y-4">
            {[
              { rank: "01", title: "Property Tax Rebates for Green Energy", trend: "+1.2k today", active: true },
              { rank: "02", title: "New Bypass Road Connectivity", trend: "+850 today", active: false },
            ].map((item) => (
              <div key={item.rank} className="flex gap-3">
                <span className={clsx("font-bold text-lg", item.active ? "text-[var(--color-brand)]" : "text-[var(--color-border)]")}>{item.rank}</span>
                <div>
                  <p className="text-sm font-bold text-[var(--color-text-primary)] leading-snug">{item.title}</p>
                  <p className="text-[11px] text-[var(--color-text-secondary)]">{item.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">Community Sentiment</h3>
          <div className="relative h-48 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand)]/5 to-[var(--color-text-secondary)]/5" />
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-[var(--color-border)] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-2 border-[var(--color-brand)]/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-brand)]/10 animate-pulse" />
                </div>
              </div>
              {["Urban Dev", "Greenery", "Safety", "Tech"].map((label, i) => {
                const positions = [
                  "top-0 left-1/2 -translate-x-1/2",
                  "bottom-0 left-1/2 -translate-x-1/2",
                  "left-0 top-1/2 -translate-y-1/2",
                  "right-0 top-1/2 -translate-y-1/2",
                ];
                return (
                  <span key={label} className={clsx("absolute bg-[var(--color-bg-surface)] px-2 py-1 border border-[var(--color-border)] rounded text-[11px] text-[var(--color-text-secondary)]", positions[i])}>
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] text-center px-4 italic mt-3">Insights gathered from last 30 days of voting activity.</p>
        </section>
      </aside>
    </div>
  );
}
