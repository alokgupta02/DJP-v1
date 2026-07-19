import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useSidebar } from "./SidebarContext";
export default function SidebarNavItem({ item }) {
    const { collapsed, isMobile, closeMobile } = useSidebar();
    const isCollapsed = collapsed && !isMobile;
    const Icon = item.icon;
    return (_jsx(NavLink, { to: item.path, onClick: () => {
            if (isMobile) {
                closeMobile();
            }
        }, className: ({ isActive }) => clsx("group relative flex items-center h-11 rounded-xl transition-all duration-200", isCollapsed ? "justify-center px-0" : "px-3 gap-3", "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]", isActive && "bg-[var(--color-brand)] text-[var(--color-text-inverse)] shadow-sm hover:bg-[var(--color-brand-hover)]"), children: ({ isActive }) => (_jsxs(_Fragment, { children: [_jsx(Icon, { size: 20, strokeWidth: 2, className: "shrink-0" }), _jsxs("div", { className: clsx("flex items-center justify-between flex-1 transition-all duration-300 overflow-hidden whitespace-nowrap", isCollapsed ? "max-w-0 opacity-0 ml-0" : "max-w-48 opacity-100 ml-3"), children: [_jsx("span", { className: "text-sm font-medium", children: item.label }), item.badge && (_jsx("span", { className: clsx("flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold shrink-0 ml-2", isActive
                                ? "bg-[var(--color-bg-surface)] text-[var(--color-brand)]"
                                : "bg-[var(--color-brand)] text-[var(--color-text-inverse)] group-hover:opacity-90"), children: item.badge }))] }), isCollapsed && (_jsxs("div", { className: "\n                absolute left-full ml-4 z-50\n                hidden group-hover:flex items-center\n                pointer-events-none transition-all duration-300\n              ", children: [_jsx("div", { className: "w-2 h-2 bg-[var(--color-text-primary)] rotate-45 -mr-1 shadow-md" }), _jsx("div", { className: "bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap", children: item.label })] }))] })) }));
}
