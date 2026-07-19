import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import { useSidebar } from "./SidebarContext";
import "./sidebar.css";
export default function Sidebar() {
    const { collapsed, mobileOpen, closeMobile, isMobile } = useSidebar();
    const isCollapsed = collapsed && !isMobile;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: `
          fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 md:hidden
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `, onClick: closeMobile }), _jsx("aside", { className: `
          relative fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-[var(--color-bg-surface)] border-r border-[var(--color-border)]
          transition-all duration-300 ease-in-out
          md:static md:z-auto
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${collapsed ? "md:w-20" : "md:w-64"}
        `, children: _jsxs("div", { className: `flex flex-1 flex-col min-h-0 transition-all duration-300 ${collapsed ? "p-3" : "p-6"}`, children: [_jsx(SidebarHeader, {}), _jsx("div", { className: `mt-6 flex-1 min-h-0 ${isCollapsed ? "overflow-visible" : "overflow-y-auto no-scrollbar"}`, children: _jsx(SidebarNav, {}) }), _jsx(SidebarFooter, {})] }) })] }));
}
