import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeft } from "lucide-react";
import { useSidebar } from "./SidebarContext";
export default function SidebarHeader() {
    const { collapsed, toggleCollapsed } = useSidebar();
    return (_jsxs("div", { className: `flex w-full transition-all duration-300 ${collapsed
            ? "flex-col items-center gap-2.5"
            : "items-center justify-between"}`, children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "\n            flex\n            h-11\n            w-11\n            shrink-0\n            items-center\n            justify-center\n            rounded-full\n            bg-[var(--color-brand)]\n            text-lg\n            font-bold\n            text-[var(--color-text-inverse)]\n          ", children: "DJ" }), _jsxs("div", { className: `
            flex flex-col transition-all duration-300 overflow-hidden whitespace-nowrap
            ${collapsed ? "max-w-0 opacity-0 ml-0" : "max-w-40 opacity-100 ml-3"}
          `, children: [_jsx("h1", { className: "text-lg font-bold text-[var(--color-brand)] leading-tight", children: "Digital Janta" }), _jsx("p", { className: "text-xs text-[var(--color-text-secondary)] leading-none mt-0.5", children: "Political Platform" })] })] }), _jsx("button", { onClick: toggleCollapsed, className: "\n          hidden md:flex h-7 w-7 shrink-0 items-center justify-center\n          rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] shadow-sm\n          transition-all duration-300 hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] cursor-pointer\n        ", "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar", children: _jsx(ChevronLeft, { size: 14, className: `transition-transform duration-300 ${collapsed ? "rotate-180" : ""}` }) })] }));
}
