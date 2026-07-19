import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-[3px]",
};
export default function Loader({ size = "md", className, label = "Loading…" }) {
    return (_jsxs("div", { className: clsx("flex flex-col items-center justify-center gap-3", className), role: "status", "aria-label": label, children: [_jsx("div", { className: clsx("rounded-full border-[var(--color-border)] border-t-[var(--color-brand)] animate-spin", sizeClasses[size]) }), _jsx("span", { className: "sr-only", children: label })] }));
}
/** Full-page centered loader */
export function PageLoader() {
    return (_jsx("div", { className: "flex h-full min-h-64 w-full items-center justify-center", children: _jsx(Loader, { size: "lg" }) }));
}
