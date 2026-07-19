import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
export default function Card({ hoverable = false, noPadding = false, className, children, ...props }) {
    return (_jsx("div", { className: clsx("bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl", "shadow-[var(--shadow-sm)]", !noPadding && "p-6 md:p-7", hoverable &&
            "cursor-pointer transition-shadow duration-200 hover:shadow-[var(--shadow-md)]", className), ...props, children: children }));
}
/** Card with a standard section header — title on left, action on right */
export function SectionCard({ title, action, children, className, ...props }) {
    return (_jsxs(Card, { className: clsx("overflow-hidden", className), ...props, children: [(title || action) && (_jsxs("div", { className: "flex items-center justify-between mb-4", children: [title && (_jsx("h2", { className: "text-base font-semibold text-[var(--color-text-primary)]", children: title })), action && (_jsx("div", { className: "text-sm text-[var(--color-brand)] font-medium", children: action }))] })), children] }));
}
