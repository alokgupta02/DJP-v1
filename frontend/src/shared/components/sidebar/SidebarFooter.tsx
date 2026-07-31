import clsx from "clsx";
import { useSidebar } from "./SidebarContext";

export default function SidebarFooter() {
  const { collapsed, isMobile } = useSidebar();
  const isCollapsed = collapsed && !isMobile;

  return (
    <div className="border-t border-[var(--color-border)] pt-6">
      <div
        className={clsx(
          "text-center text-xs text-[var(--color-text-secondary)] transition-all duration-300 overflow-hidden whitespace-nowrap",
          isCollapsed ? "max-w-0 opacity-0 h-0 mt-0" : "max-w-full opacity-100 h-10"
        )}
      >
        <p className="font-semibold text-[var(--color-text-primary)]">Digital Janta Platform</p>
        <p className="text-[var(--color-text-secondary)]">Version 1.0</p>
      </div>
    </div>
  );
}