import { useState, useRef, useEffect } from "react";
import { 
  Search, Bell, ChevronDown, Menu, TriangleAlert, 
  MessagesSquare, Vote, Sparkles, MessageCircleMore, 
  Megaphone, PlusSquare 
} from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useSidebar } from "../sidebar";
import { Avatar } from "../ui";
import { NotificationBar } from "../notifications/NotificationBar";

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
  searchPlaceholder = "Find anything",
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
        "h-[56px] bg-[var(--color-bg-surface)] border-b border-[var(--color-border)]",
        "flex items-center justify-between px-4 md:px-8 shrink-0 z-30 shadow-sm"
      )}
    >
      {/* Left: Mobile Toggle */}
      <div className="md:hidden flex items-center shrink-0 pl-1">
        <button
          onClick={toggleMobile}
          className="p-1.5 -ml-1.5 rounded-full hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] transition"
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Center: Search Bar (Sleek Reddit Style) */}
      <div className="hidden md:flex flex-1 max-w-[660px] mr-4">
        <div className="flex items-center h-[42px] w-full rounded-full border border-[var(--color-brand)] bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-subtle)] focus-within:bg-[var(--color-bg-surface)] focus-within:ring-1 focus-within:ring-[var(--color-brand)] transition-all overflow-hidden group shadow-sm">
          {/* Left Icon inside Search (simulate reddit brand face) */}
          <div className="pl-3 pr-2 flex items-center justify-center">
            <div className="h-[26px] w-[26px] rounded-full bg-[var(--color-brand)] text-[var(--color-text-inverse)] flex items-center justify-center">
              <Search size={14} className="stroke-[3]" />
            </div>
          </div>
          
          {/* Input */}
          <input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="flex-1 h-full bg-transparent text-[15px] font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] placeholder:font-normal focus:outline-none text-center"
            aria-label={searchPlaceholder}
          />
          
          {/* Right Action */}
          <div className="flex items-center h-full pr-1.5 py-1.5">
            <div className="h-full w-[1px] bg-[var(--color-border)] mx-1.5" />
            <button className="flex items-center gap-1.5 px-3 h-full rounded-full hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] font-semibold text-sm transition">
              <Sparkles size={16} className="text-[var(--color-brand)]" />
              <span>Ask</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center justify-end gap-1 sm:gap-2 shrink-0">
        
        {/* Desktop Ward Selector */}
        {ward && (
          <button
            className={clsx(
              "hidden lg:flex items-center gap-1.5 px-3 h-9 rounded-full",
              "hover:bg-[var(--color-bg-subtle)]",
              "transition-colors text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            )}
            aria-label="Select ward"
          >
            <span className="truncate max-w-[110px]">{ward}</span>
            <ChevronDown size={14} className="shrink-0" />
          </button>
        )}

        {/* Action Icons (Like Reddit) */}
        <div className="hidden sm:flex items-center gap-0.5 mr-1">
          <button className="p-2 rounded-full hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] transition" title="Announcements">
            <Megaphone size={22} className="stroke-[1.5]" />
          </button>
          <button className="p-2 rounded-full hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] transition" title="Chat">
            <MessageCircleMore size={22} className="stroke-[1.5]" />
          </button>
        </div>

        {/* Create Button */}
        <Link
          to="/submit"
          className="flex items-center gap-1.5 h-10 px-3 rounded-full hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] transition font-semibold text-[15px]"
        >
          <PlusSquare size={22} className="stroke-[1.5]" />
          <span className="hidden xl:inline">Create</span>
        </Link>

        {/* Notifications */}
        <NotificationBar />

        {/* User avatar with status dot */}
        <div className="relative cursor-pointer hover:opacity-80 transition">
          <Avatar initials={userInitials} src={userAvatar} size="sm" />
          <span className="absolute bottom-0 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-[var(--color-bg-surface)]" />
        </div>
      </div>
    </header>
  );
}
