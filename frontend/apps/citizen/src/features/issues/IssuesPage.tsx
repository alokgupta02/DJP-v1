import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ThumbsUp, MessageSquare, Plus, ChevronDown,
  Trash2, Droplet, Lightbulb, Users, AlertTriangle, Zap,
} from "lucide-react";
import clsx from "clsx";

const FILTER_TABS = ["Near Me", "My Issues", "Needs Attention", "Resolved", "High Priority"];

interface Issue {
  id: string;
  category: string;
  priority: string;
  priorityLevel: "high" | "medium" | "low" | "critical" | "urgent";
  time: string;
  title: string;
  description: string;
  workflow: number; // 0-4, which step is active
  workflowLabels: string[];
  activeLabel: string;
  comments: number;
  supports: number;
}

const ISSUES: Issue[] = [
  { id: "1", category: "Garbage", priority: "High Priority", priorityLevel: "high", time: "2h ago", title: "Overflowing bin on High St", description: "Main waste collection point hasn't been cleared for 3 days. Foul smell spreading to nearby residential units.", workflow: 0, workflowLabels: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"], activeLabel: "Reported", comments: 12, supports: 45 },
  { id: "2", category: "Pothole", priority: "Medium", priorityLevel: "medium", time: "5h ago", title: "Deep pothole near Junction 4", description: "Hazardous pothole causing traffic slowdowns and extreme risk to two-wheelers especially during nights.", workflow: 1, workflowLabels: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"], activeLabel: "Verified", comments: 8, supports: 102 },
  { id: "3", category: "Water", priority: "Urgent", priorityLevel: "urgent", time: "1d ago", title: "Main pipe burst at Sector 4", description: "Significant water wastage on the road. Authorities have started excavation but supply is cut off.", workflow: 3, workflowLabels: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"], activeLabel: "In Progress", comments: 24, supports: 256 },
  { id: "4", category: "Streetlight", priority: "Low", priorityLevel: "low", time: "2d ago", title: "Faulty lamp post #452", description: "No light for the past week in the park lane area. Security concern for residents.", workflow: 2, workflowLabels: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"], activeLabel: "Assigned", comments: 3, supports: 18 },
  { id: "5", category: "Drainage", priority: "High", priorityLevel: "high", time: "3h ago", title: "Clogged drain on Market Road", description: "Water stagnant after minor rains yesterday. Affecting foot traffic to the local shops.", workflow: 0, workflowLabels: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"], activeLabel: "Reported", comments: 15, supports: 89 },
  { id: "6", category: "Garbage", priority: "Medium", priorityLevel: "medium", time: "6h ago", title: "Illegal dumping near canal", description: "Construction debris being dumped regularly after midnight. Needs strict patrolling.", workflow: 1, workflowLabels: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"], activeLabel: "Verified", comments: 6, supports: 32 },
  { id: "7", category: "Public Park", priority: "Medium", priorityLevel: "medium", time: "12h ago", title: "Broken benches in Central Park", description: "Three benches near the play area have broken slats. Dangerous for children and elderly.", workflow: 2, workflowLabels: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"], activeLabel: "Assigned", comments: 4, supports: 21 },
  { id: "8", category: "Sidewalk", priority: "High", priorityLevel: "high", time: "1d ago", title: "Encroachment on Sector 2 Path", description: "Temporary stalls have blocked the entire walking path. Pedestrians forced to walk on road.", workflow: 0, workflowLabels: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"], activeLabel: "Reported", comments: 31, supports: 142 },
  { id: "9", category: "Traffic", priority: "Medium", priorityLevel: "medium", time: "2d ago", title: "Malfunctioning traffic signal", description: "Signal at Nehru Crossing is stuck on red for North-bound traffic. Chaos during peak hours.", workflow: 3, workflowLabels: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"], activeLabel: "In Progress", comments: 19, supports: 88 },
  { id: "10", category: "Sanitation", priority: "Low", priorityLevel: "low", time: "3d ago", title: "Litter near Metro Exit", description: "High volume of food wrappers and plastic bottles. Need more bins in the vicinity.", workflow: 1, workflowLabels: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"], activeLabel: "Verified", comments: 7, supports: 29 },
  { id: "11", category: "Stray Animals", priority: "Medium", priorityLevel: "medium", time: "4d ago", title: "Aggressive stray pack near School", description: "Residents concerned for children's safety during morning hours. Requesting relocation/vaccination.", workflow: 1, workflowLabels: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"], activeLabel: "Verified", comments: 14, supports: 77 },
  { id: "12", category: "Security", priority: "Critical", priorityLevel: "critical", time: "5d ago", title: "Broken gate at Community Center", description: "Main gate hinge broken. Center is open to unauthorized access during night time.", workflow: 4, workflowLabels: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"], activeLabel: "Resolved", comments: 2, supports: 45 },
];

const priorityColors: Record<string, string> = {
  critical: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
  urgent: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
  high: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
  medium: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
  low: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
};

function WorkflowTracker({ issue }: { issue: Issue }) {
  return (
    <div>
      <div className="relative flex justify-between items-center mb-2 px-2">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[var(--color-border)] -translate-y-1/2 z-0" />
        {issue.workflowLabels.map((label, i) => (
          <div
            key={label}
            className={clsx(
              "w-2 h-2 rounded-full z-[1] relative",
              i <= issue.workflow ? "bg-[var(--color-brand)]" : "bg-[var(--color-border)]",
              i === issue.workflow && "shadow-[0_0_0_4px_rgba(163,22,33,0.15)]"
            )}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-[var(--color-text-secondary)] uppercase font-bold">
        {issue.workflowLabels.map((label, i) => (
          <span key={label} className={i === issue.workflow ? "text-[var(--color-brand)]" : ""}>
            {i === issue.workflow ? label : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

const categoryIcons: Record<string, typeof Trash2> = {
  Garbage: Trash2, Pothole: AlertTriangle, Water: Droplet,
  Streetlight: Lightbulb, Drainage: Droplet, "Public Park": Lightbulb,
  Sidewalk: Users, Traffic: Zap, Sanitation: Trash2,
  "Stray Animals": Users, Security: AlertTriangle,
};

export default function IssuesPage() {
  const [activeTab, setActiveTab] = useState("Near Me");
  const [supported, setSupported] = useState<Set<string>>(new Set());

  function toggleSupport(id: string) {
    setSupported((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex-1 flex gap-8 p-8 min-h-0">
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[var(--text-heading)] font-bold text-[var(--color-text-primary)] mb-1">Issues</h1>
            <p className="text-sm text-[var(--color-text-secondary)]">Join 12,402 citizens in monitoring and fixing ward problems.</p>
          </div>
          <Link to="/issues/new" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-brand)] text-[var(--color-text-inverse)] rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
            <Plus size={18} />
            Report Issue
          </Link>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-sm transition-colors",
                  activeTab === tab
                    ? "bg-[var(--color-brand)] text-[var(--color-text-inverse)]"
                    : "bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {["Ward: All South", "Distance: 5km", "Category: All", "Status: Active", "Priority: Any"].map((f) => (
              <div
                key={f}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-lg text-xs cursor-pointer hover:bg-[var(--color-bg-muted)] transition-colors"
              >
                <span className="text-[var(--color-text-secondary)]">{f.split(":")[0]}:</span>
                <span className="font-bold text-[var(--color-text-primary)]">{f.split(":")[1]}</span>
                <ChevronDown size={12} className="text-[var(--color-text-secondary)]" />
              </div>
            ))}
            <button className="text-[var(--color-brand)] text-xs font-bold ml-auto hover:underline">Clear all filters</button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
          {ISSUES.map((issue) => {
            const isSupported = supported.has(issue.id);
            return (
              <article
                key={issue.id}
                className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5 hover:shadow-md transition-shadow group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 items-center">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white bg-[var(--color-brand)]">
                      {(() => {
                        const CatIcon = categoryIcons[issue.category] || AlertTriangle;
                        return <CatIcon size={12} />;
                      })()}
                      {issue.category}
                    </span>
                    <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", priorityColors[issue.priorityLevel])}>{issue.priority}</span>
                  </div>
                  <span className="text-[11px] text-[var(--color-text-secondary)]">{issue.time}</span>
                </div>

                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-brand)] transition-colors cursor-pointer">{issue.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-2">{issue.description}</p>

                <div className="mb-6">
                  <WorkflowTracker issue={issue} />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                      <MessageSquare size={16} />
                      <span className="text-xs font-bold">{issue.comments}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                      <ThumbsUp size={16} />
                      <span className="text-xs font-bold">{issue.supports + (isSupported ? 1 : 0)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSupport(issue.id)}
                    className={clsx(
                      "px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1",
                      isSupported
                        ? "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                        : "bg-[var(--color-brand)] text-[var(--color-text-inverse)] hover:opacity-90"
                    )}
                  >
                    <ThumbsUp size={14} fill={isSupported ? "currentColor" : "none"} />
                    {isSupported ? "Supported" : "Support"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-[var(--color-bg-muted)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-xl font-bold hover:bg-[var(--color-bg-subtle)] transition-colors">
            Load More Issues
          </button>
        </div>
      </div>

      <aside className="w-80 hidden lg:flex flex-col gap-6">
        <section className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="font-bold text-[var(--color-text-primary)] mb-4">Ward Snapshot</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-secondary)]">Open Issues</span>
              <span className="text-lg font-bold text-[var(--color-brand)]">124</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-secondary)]">Resolved this week</span>
              <span className="text-lg font-bold text-[var(--color-success)]">42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-secondary)]">Avg. Resolution Time</span>
              <span className="text-lg font-bold text-[var(--color-text-primary)]">3 days</span>
            </div>
            <div className="pt-4 mt-4 border-t border-[var(--color-border)]">
              <div className="h-2 w-full bg-[var(--color-bg-subtle)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-brand)] rounded-full" style={{ width: "65%" }} />
              </div>
              <p className="text-[10px] text-[var(--color-text-secondary)] mt-2">65% of monthly goal reached</p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="font-bold text-[var(--color-text-primary)] mb-4">Trending Categories</h2>
          <div className="space-y-3">
            {[
              { icon: Trash2, label: "Waste Management", count: 42 },
              { icon: Droplet, label: "Water Supply", count: 28 },
              { icon: Zap, label: "Roads & Traffic", count: 24 },
            ].map((cat) => (
              <div key={cat.label} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <cat.icon size={18} className="text-[var(--color-text-secondary)]" />
                  <span className="text-sm text-[var(--color-text-primary)]">{cat.label}</span>
                </div>
                <span className="text-xs font-bold bg-[var(--color-bg-subtle)] px-2 py-0.5 rounded text-[var(--color-text-secondary)] group-hover:bg-[var(--color-brand)] group-hover:text-white transition-colors">{cat.count}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="font-bold text-[var(--color-text-primary)] mb-4">Community Champions</h2>
          <div className="space-y-4">
            {[
              { initials: "RK", name: "Rahul Kapoor", detail: "8 issues resolved this month", badge: "verified" },
              { initials: "MS", name: "Meera Singh", detail: "142 supports provided", badge: "star" },
              { initials: "AS", name: "Amit Sharma", detail: "Active in Sector 4 Discussions", badge: null },
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-bg-subtle)] flex items-center justify-center font-bold text-xs text-[var(--color-text-primary)]">{c.initials}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold leading-tight text-[var(--color-text-primary)]">{c.name}</p>
                  <p className="text-[10px] text-[var(--color-text-secondary)]">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 text-xs font-bold text-[var(--color-brand)] hover:underline">View Leaderboard</button>
        </section>
      </aside>
    </div>
  );
}
