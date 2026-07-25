import { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronDown, Menu, Plus, TriangleAlert, MessagesSquare, Vote } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useSidebar } from "../sidebar";
import { Avatar } from "../ui";

export interface TopbarProps {
  ward?: string;
  notificationCount?: number;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  userInitials?: string;
  userAvatar?: string;
}

export default function Topbar({
  ward = "Ward 42 — South Delhi",
  notificationCount = 0,
  searchPlaceholder = "Search issues, discussions or polls...",
  searchValue = "",
  onSearchChange,
  userInitials = "U",
  userAvatar,
}: TopbarProps) {
  const { toggleMobile } = useSidebar();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header
      className={clsx(
        "h-16 bg-[var(--color-bg-surface)] border-b border-[var(--color-border)]",
        "flex items-center justify-between px-4 md:px-6 shrink-0 z-30"
      )}
    >
      {/* Mobile: logo + menu toggle */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={toggleMobile}
          className="p-2 rounded-lg hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] transition"
          aria-label="Toggle Menu"
        >
          <Menu size={22} />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-bold text-[var(--color-text-inverse)]">
          DJ
        </div>
        <span className="text-md font-bold text-[var(--color-brand)] tracking-wide">
          Digital Janta
        </span>
      </div>

      {/* Desktop: search */}
      <div className="hidden md:flex items-center gap-4 flex-1 min-w-0 pl-2">
        <div className="relative w-full max-w-lg">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
          />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder || "Search issues, discussions or polls..."}
            className={clsx(
              "h-10 w-full rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)]",
              "pl-10 pr-4 text-sm text-[var(--color-text-primary)]",
              "placeholder:text-[var(--color-text-secondary)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent",
              "transition-all duration-150"
            )}
            aria-label={searchPlaceholder}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Create Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 h-9 px-4 rounded-full bg-[var(--color-brand)] text-[var(--color-text-inverse)] hover:bg-[var(--color-brand-hover)] transition-colors shadow-sm font-semibold text-sm"
          >
            <Plus size={16} className={clsx("shrink-0 transition-transform duration-300", menuOpen && "rotate-45")} />
            <span className="hidden sm:inline">Create</span>
          </button>
          
          {menuOpen && (
            <div 
              className="absolute top-full mt-2 right-0 z-50 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-lg flex flex-col py-2 w-48 overflow-hidden animate-in fade-in slide-in-from-top-2"
            >
              <Link 
                to="/issues/new" 
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] transition-colors group"
              >
                <TriangleAlert size={18} className="shrink-0" />
                <span className="text-sm font-semibold">Report Issue</span>
              </Link>
              <Link 
                to="/discussions/new" 
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] transition-colors group"
              >
                <MessagesSquare size={18} className="shrink-0" />
                <span className="text-sm font-semibold">New Discussion</span>
              </Link>
              <Link 
                to="/polls/new" 
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] transition-colors group"
              >
                <Vote size={18} className="shrink-0" />
                <span className="text-sm font-semibold">Create Poll</span>
              </Link>
            </div>
          )}
        </div>

        {/* Desktop: ward selector */}
        {ward && (
          <button
            className={clsx(
              "hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full",
              "bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)]",
              "transition-colors text-sm font-medium text-[var(--color-text-primary)]"
            )}
            aria-label="Select ward"
          >
            <span className="truncate max-w-36">{ward}</span>
            <ChevronDown size={14} className="shrink-0 text-[var(--color-text-secondary)]" />
          </button>
        )}

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg hover:bg-[var(--color-bg-subtle)] transition"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-[var(--color-text-secondary)]" />
          {notificationCount > 0 && (
            <span
              className={clsx(
                "absolute top-1.5 right-1.5 h-2 w-2 rounded-full",
                "bg-[var(--color-error)] ring-2 ring-[var(--color-bg-surface)]"
              )}
            />
          )}
        </button>

        {/* User avatar */}
        <Avatar initials={userInitials} src={userAvatar} size="sm" />
      </div>
    </header>
  );
}
