import { ChevronLeft } from "lucide-react";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import { useSidebar } from "./SidebarContext";
import "./sidebar.css";

export default function Sidebar() {
  const { collapsed, toggleCollapsed, mobileOpen, closeMobile, isMobile } = useSidebar();
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
          fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out
          md:static md:z-auto
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${collapsed ? "md:w-20" : "md:w-64"}
        `}
      >
        {/* Desktop Collapse Toggle Button */}
        <button
          onClick={toggleCollapsed}
          className={`
            absolute top-6 right-0 translate-x-1/2 z-40
            hidden md:flex h-7 w-7 items-center justify-center
            rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm
            transition-all duration-300 hover:bg-gray-50 hover:text-gray-900 cursor-pointer
          `}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            size={14}
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>

        <div className={`flex flex-1 flex-col min-h-0 transition-all duration-300 ${collapsed ? "p-3" : "p-6"}`}>
          <SidebarHeader />

          <div className={`mt-8 flex-1 min-h-0 ${isCollapsed ? "overflow-visible" : "overflow-y-auto no-scrollbar"}`}>
            <SidebarNav />
          </div>

          <SidebarFooter />
        </div>
      </aside>
    </>
  );
}