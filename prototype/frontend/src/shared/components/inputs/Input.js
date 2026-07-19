import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import clsx from "clsx";
const Input = forwardRef(({ label, helperText, error, leftIcon, rightIcon, fullWidth = true, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (_jsxs("div", { className: clsx("flex flex-col gap-1.5", fullWidth && "w-full"), children: [label && (_jsx("label", { htmlFor: inputId, className: "text-sm font-medium text-[var(--color-text-primary)]", children: label })), _jsxs("div", { className: "relative flex items-center", children: [leftIcon && (_jsx("span", { className: "pointer-events-none absolute left-3 text-[var(--color-text-secondary)]", children: leftIcon })), _jsx("input", { ref: ref, id: inputId, className: clsx("h-10 w-full rounded-lg border bg-[var(--color-bg-surface)] text-sm", "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]", "transition-colors duration-150", "focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-[var(--color-brand)]", "disabled:opacity-50 disabled:cursor-not-allowed", error
                            ? "border-[var(--color-error)] focus:ring-[var(--color-error)]"
                            : "border-[var(--color-border)]", leftIcon ? "pl-10" : "pl-3", rightIcon ? "pr-10" : "pr-3", className), "aria-invalid": !!error, "aria-describedby": error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined, ...props }), rightIcon && (_jsx("span", { className: "absolute right-3 text-[var(--color-text-secondary)]", children: rightIcon }))] }), error && (_jsx("p", { id: `${inputId}-error`, className: "text-xs text-[var(--color-error)]", role: "alert", children: error })), !error && helperText && (_jsx("p", { id: `${inputId}-helper`, className: "text-xs text-[var(--color-text-secondary)]", children: helperText }))] }));
});
Input.displayName = "Input";
export default Input;
