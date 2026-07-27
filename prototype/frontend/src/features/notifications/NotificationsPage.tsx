import { CheckCircle2, AlertTriangle, MessageSquare, Vote, ThumbsUp, User, Clock, Bell } from "lucide-react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { fetchNotifications, markAsRead, type NotificationDto } from "./notificationsApi";

const FILTERS = ["All", "Unread"];

const ICON_MAP: Record<string, typeof Bell> = {
  REPLY: MessageSquare, FOLLOW: User, UPVOTE: ThumbsUp, COMMENT: MessageSquare,
  ISSUE_UPDATE: AlertTriangle, POLL_CLOSING: Vote, BADGE: CheckCircle2,
};

const COLOR_MAP: Record<string, string> = {
  REPLY: "text-blue-500", FOLLOW: "text-amber-500", UPVOTE: "text-green-500",
  COMMENT: "text-blue-500", ISSUE_UPDATE: "text-red-500",
  POLL_CLOSING: "text-purple-500", BADGE: "text-emerald-500",
};

const BG_MAP: Record<string, string> = {
  REPLY: "bg-blue-100", FOLLOW: "bg-amber-100", UPVOTE: "bg-green-100",
  COMMENT: "bg-blue-100", ISSUE_UPDATE: "bg-red-100",
  POLL_CLOSING: "bg-purple-100", BADGE: "bg-emerald-100",
};

function formatTypeTitle(type: string): string {
  const map: Record<string, string> = {
    REPLY: "New Reply", FOLLOW: "New Follower", UPVOTE: "Upvote Received",
    COMMENT: "New Comment", ISSUE_UPDATE: "Issue Update",
    POLL_CLOSING: "Poll Update", BADGE: "Achievement",
  };
  return map[type] || "Notification";
}

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (e) {
      console.error("Failed to load notifications", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (e) {
      console.error("Failed to mark as read", e);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unread = notifications.filter(n => !n.isRead);
    await Promise.all(unread.map(n => handleMarkAsRead(n.id).catch(() => {})));
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const filtered = activeFilter === "All" ? notifications
    : notifications.filter((n) => !n.isRead);

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[var(--text-heading)] font-bold text-[var(--color-text-primary)]">Notifications</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Stay updated on your civic activity.</p>
          </div>
          <button onClick={handleMarkAllAsRead} className="text-sm text-[var(--color-brand)] font-semibold hover:underline">Mark all as read</button>
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

        {loading ? (
          <div className="text-center text-[var(--color-text-secondary)] py-12 text-sm">Loading notifications...</div>
        ) : (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center text-[var(--color-text-secondary)] py-12 text-sm">No notifications yet.</div>
          ) : filtered.map((n) => {
            const Icon = ICON_MAP[n.type] || Bell;
            const color = COLOR_MAP[n.type] || "text-[var(--color-text-secondary)]";
            const bg = BG_MAP[n.type] || "bg-[var(--color-bg-subtle)]";
            return (
            <div
              key={n.id}
              onClick={() => { if (!n.isRead) handleMarkAsRead(n.id); }}
              className={clsx(
                "flex gap-4 p-4 rounded-xl border transition-colors cursor-pointer",
                !n.isRead
                  ? "bg-[var(--color-brand-light)]/10 border-[var(--color-brand)]/20"
                  : "bg-[var(--color-bg-surface)] border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)]"
              )}
            >
              <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center shrink-0", bg)}>
                <Icon size={18} className={color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--color-text-primary)]">{formatTypeTitle(n.type)}</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                      {n.actor?.name ? <span className="font-medium">{n.actor.name} </span> : ""}
                      {n.type === "REPLY" ? "replied to your comment." :
                       n.type === "FOLLOW" ? "started following you." :
                       n.type === "UPVOTE" ? "upvoted your post." :
                       n.type === "COMMENT" ? "commented on your post." :
                       n.type === "ISSUE_UPDATE" ? "your issue was updated." :
                       n.type === "POLL_CLOSING" ? "a poll is closing soon." :
                       n.type === "BADGE" ? "you earned a new badge." :
                       "interacted with you."}
                    </p>
                  </div>
                  {!n.isRead && <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] shrink-0 mt-2" />}
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-[var(--color-text-secondary)]">
                  <Clock size={12} />
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}
