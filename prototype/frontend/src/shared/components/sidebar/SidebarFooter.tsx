import { useState, useRef, useEffect } from "react";
import { Plus, AlertCircle, MessageSquare, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useSidebar } from "./SidebarContext";

export default function SidebarFooter() {
  const { collapsed, isMobile } = useSidebar();
  const isCollapsed = collapsed && !isMobile;
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
    <div className="border-t border-[var(--color-border)] pt-6" ref={menuRef}>
      <div className="flex justify-center relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={clsx(
            "group relative flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-[var(--color-text-inverse)] transition-all duration-300 hover:bg-[var(--color-brand-hover)] shadow-sm cursor-pointer",
            isCollapsed ? "h-11 w-11" : "h-11 w-full px-4"
          )}
        >
          <Plus size={20} className={clsx("shrink-0 transition-transform duration-300", menuOpen && "rotate-45")} />
          <span
            className={clsx(
              "font-semibold text-sm transition-all duration-300 overflow-hidden whitespace-nowrap",
              isCollapsed ? "max-w-0 opacity-0 ml-0" : "max-w-24 opacity-100 ml-2"
            )}
          >
            Create
          </span>

          {isCollapsed && !menuOpen && (
            <div
              className="
                absolute left-full ml-4 z-50
                hidden group-hover:flex items-center
                pointer-events-none transition-all duration-300
              "
            >
              {/* Tooltip arrow */}
              <div className="w-2 h-2 bg-[var(--color-text-primary)] rotate-45 -mr-1 shadow-md" />
              {/* Tooltip Content */}
              <div className="bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                Create
              </div>
            </div>
          )}
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div 
            className={clsx(
              "absolute bottom-full mb-3 z-50 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-lg flex flex-col py-2 w-48 overflow-hidden animate-in fade-in slide-in-from-bottom-2",
              isCollapsed ? "left-0" : "left-0 right-0 mx-auto"
            )}
          >
            <Link 
              to="/issues/new" 
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] transition-colors"
            >
              <AlertCircle size={18} className="text-[var(--color-brand)]" />
              <span className="text-sm font-semibold">Report Issue</span>
            </Link>
            <Link 
              to="/discussions/new" 
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] transition-colors"
            >
              <MessageSquare size={18} className="text-[var(--color-brand)]" />
              <span className="text-sm font-semibold">New Discussion</span>
            </Link>
            <Link 
              to="/polls/new" 
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] transition-colors"
            >
              <BarChart2 size={18} className="text-[var(--color-brand)]" />
              <span className="text-sm font-semibold">Create Poll</span>
            </Link>
          </div>
        )}
      </div>

      <div
        className={clsx(
          "text-center text-xs text-[var(--color-text-secondary)] transition-all duration-300 overflow-hidden whitespace-nowrap",
          isCollapsed ? "max-w-0 opacity-0 h-0 mt-0" : "max-w-full opacity-100 h-10 mt-6"
        )}
      >
        <p className="font-semibold text-[var(--color-text-primary)]">Digital Janta Platform</p>
        <p className="text-[var(--color-text-secondary)]">Version 1.0</p>
      </div>
    </div>
  );
}