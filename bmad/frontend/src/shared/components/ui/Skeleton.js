import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
export default function Skeleton({ variant = "rect", className, width, height, }) {
    return (_jsx("div", { className: clsx("animate-pulse bg-[var(--color-bg-subtle)]", variant === "circle" && "rounded-full", variant === "text" && "rounded h-4", variant === "rect" && "rounded-lg", className), style: { width, height }, "aria-hidden": "true" }));
}
/** Pre-built skeleton for a content card */
export function CardSkeleton() {
    return (_jsxs("div", { className: "bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] p-5 space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Skeleton, { variant: "circle", width: "40px", height: "40px" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx(Skeleton, { variant: "text", width: "60%" }), _jsx(Skeleton, { variant: "text", width: "40%", height: "12px" })] })] }), _jsx(Skeleton, { variant: "rect", height: "16px" }), _jsx(Skeleton, { variant: "rect", height: "16px", width: "80%" }), _jsx(Skeleton, { variant: "rect", height: "16px", width: "60%" })] }));
}
