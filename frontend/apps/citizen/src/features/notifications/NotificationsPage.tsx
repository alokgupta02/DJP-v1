import { CheckCircle2, AlertTriangle, MessageSquare, Vote, ThumbsUp, User, Clock } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

const NOTIFICATIONS = [
  { id: "1", type: "issue", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-100", title: "Issue Update: Pothole near Balewadi", desc: "Your reported issue has been marked as 'In Progress' by Ward 23 authorities.", time: "12 min ago", unread: true },
  { id: "2", type: "discussion", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-100", title: "New reply in 'Community Park' discussion", desc: "Rahul S. replied to your comment in the park proposal thread.", time: "1 hour ago", unread: true },
  { id: "3", type: "poll", icon: Vote, color: "text-purple-500", bg: "bg-purple-100", title: "Poll closing soon: No-Car Sundays", desc: "Only 2 days left to vote on this civic decision.", time: "3 hours ago", unread: true },
  { id: "4", type: "support", icon: ThumbsUp, color: "text-green-500", bg: "bg-green-100", title: "Your discussion received 50+ supports", desc: "The post on judicial accountability is gaining traction.", time: "5 hours ago", unread: false },
  { id: "5", type: "badge", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-100", title: "You earned 'Civic Hero' badge", desc: "Congratulations! You've reported 10 verified issues.", time: "1 day ago", unread: false },
  { id: "6", type: "mention", icon: User, color: "text-amber-500", bg: "bg-amber-100", title: "You were mentioned in a discussion", desc: "Alok G. mentioned you in the 'Ward 42 Budget' thread.", time: "2 days ago", unread: false },
];

const FILTERS = ["All", "Unread", "Issues", "Discussions", "Polls"];

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? NOTIFICATIONS
    : activeFilter === "Unread" ? NOTIFICATIONS.filter((n) => n.unread)
    : NOTIFICATIONS.filter((n) => n.type === activeFilter.toLowerCase().replace(/s$/, ""));

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[var(--text-heading)] font-bold text-[var(--color-text-primary)]">Notifications</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Stay updated on your civic activity.</p>
          </div>
          <button className="text-sm text-[var(--color-brand)] font-semibold hover:underline">Mark all as read</button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap",
                activeFilter === f
                  ? "bg-[var(--color-brand)] text-[var(--color-text-inverse)]"
                  : "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-muted)]"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((n) => (
            <div
              key={n.id}
              className={clsx(
                "flex gap-4 p-4 rounded-xl border transition-colors cursor-pointer",
                n.unread
                  ? "bg-[var(--color-brand-light)]/10 border-[var(--color-brand)]/20"
                  : "bg-[var(--color-bg-surface)] border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)]"
              )}
            >
              <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center shrink-0", n.bg)}>
                <n.icon size={18} className={n.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--color-text-primary)]">{n.title}</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">{n.desc}</p>
                  </div>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] shrink-0 mt-2" />}
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-[var(--color-text-secondary)]">
                  <Clock size={12} />
                  {n.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
