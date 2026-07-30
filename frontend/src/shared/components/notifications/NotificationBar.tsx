import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import clsx from "clsx";
import { getUnreadCount, fetchNotifications, markAsRead, type NotificationDto } from "../../../features/notifications/notificationsApi";

export function NotificationBar() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Polling every 30 seconds
    const fetchCount = async () => {
      try {
        const count = await getUnreadCount();
        setUnreadCount(count);
      } catch (e) {
        console.error("Failed to fetch unread count", e);
      }
    };
    fetchCount();
    const intervalId = setInterval(fetchCount, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpen = async () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      try {
        const notifs = await fetchNotifications();
        setNotifications(notifs);
      } catch (e) {
        console.error("Failed to fetch notifications", e);
      }
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (e) {
      console.error("Failed to mark as read", e);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-full hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] transition mr-1"
        aria-label="Notifications"
      >
        <Bell size={22} className="stroke-[1.5]" />
        {unreadCount > 0 && (
          <span
            className={clsx(
              "absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full",
              "bg-[var(--color-error)] border-2 border-[var(--color-bg-surface)]"
            )}
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-[var(--color-border)] font-semibold text-[var(--color-text-primary)] flex justify-between items-center">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="text-xs bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-2 py-0.5 rounded-full">
                {unreadCount} New
              </span>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-[var(--color-text-secondary)] text-sm">
                No notifications yet.
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={clsx(
                    "p-3 border-b border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-bg-subtle)] transition text-sm",
                    !notif.isRead && "bg-[var(--color-bg-muted)]"
                  )}
                  onClick={() => { if (!notif.isRead) handleMarkAsRead(notif.id); }}
                >
                  <p className="text-[var(--color-text-primary)]">
                    <span className="font-semibold">{notif.actor?.name || "Someone"}</span>
                    {notif.type === "REPLY" ? " replied to your comment." : 
                     notif.type === "FOLLOW" ? " started following you." : 
                     notif.type === "UPVOTE" ? " upvoted your post." : " interacted with you."}
                  </p>
                  <span className="text-[var(--color-text-secondary)] text-xs mt-1 block">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
