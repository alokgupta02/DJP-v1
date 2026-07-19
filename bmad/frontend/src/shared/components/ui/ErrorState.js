import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";
import clsx from "clsx";
import Button from "../buttons/Button";
export default function ErrorState({ title = "Something went wrong", description = "An error occurred while loading this content. Please try again.", onRetry, className, }) {
    return (_jsxs("div", { className: clsx("flex flex-col items-center justify-center text-center px-6 py-16", className), role: "alert", children: [_jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-error-bg)] text-[var(--color-error)] mb-4", children: _jsx(AlertTriangleIcon, { size: 28, strokeWidth: 1.5 }) }), _jsx("h3", { className: "text-base font-semibold text-[var(--color-text-primary)] mb-1", children: title }), _jsx("p", { className: "text-sm text-[var(--color-text-secondary)] max-w-xs leading-relaxed mb-5", children: description }), onRetry && (_jsx(Button, { variant: "secondary", size: "sm", onClick: onRetry, leftIcon: _jsx(RefreshCwIcon, { size: 14 }), children: "Try Again" }))] }));
}
