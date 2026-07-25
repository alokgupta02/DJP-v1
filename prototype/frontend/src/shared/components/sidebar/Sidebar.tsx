import { ChevronLeft } from "lucide-react";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import { useSidebar } from "./SidebarContext";
import "./sidebar.css";

export default function Sidebar() {
  const { collapsed, mobileOpen, closeMobile, isMobile, toggleCollapsed } = useSidebar();
  const isCollapsed = collapsed && !isMobile;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 md:hidden
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={closeMobile}
      />

      <aside
        className={`
          relative fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-[var(--color-bg-surface)] border-r border-[var(--color-border)]
          transition-all duration-300 ease-in-out
          md:relative md:z-auto
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${collapsed ? "md:w-20" : "md:w-64"}
        `}
      >
        {/* Border Toggle Button */}
        <button
          onClick={toggleCollapsed}
          className="
            hidden md:flex absolute top-[30px] -right-3.5 z-50 h-7 w-7 items-center justify-center
            rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] shadow-sm
            transition-all duration-300 hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] cursor-pointer
          "
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            size={14}
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>

        <div className={`flex flex-1 flex-col min-h-0 transition-all duration-300 ${collapsed ? "p-3" : "p-6"}`}>
          <SidebarHeader />

          <div className={`mt-6 flex-1 min-h-0 ${isCollapsed ? "overflow-visible" : "overflow-y-auto no-scrollbar"}`}>
            <SidebarNav />
          </div>

          <SidebarFooter />
        </div>
      </aside>
    </>
  );
}