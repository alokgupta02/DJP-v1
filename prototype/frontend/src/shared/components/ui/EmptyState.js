import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InboxIcon } from "lucide-react";
import clsx from "clsx";
export default function EmptyState({ title, description, icon, action, className, }) {
    return (_jsxs("div", { className: clsx("flex flex-col items-center justify-center text-center px-6 py-16", className), children: [_jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] mb-4", children: icon ?? _jsx(InboxIcon, { size: 28, strokeWidth: 1.5 }) }), _jsx("h3", { className: "text-base font-semibold text-[var(--color-text-primary)] mb-1", children: title }), description && (_jsx("p", { className: "text-sm text-[var(--color-text-secondary)] max-w-xs leading-relaxed mb-5", children: description })), action && _jsx("div", { children: action })] }));
}
