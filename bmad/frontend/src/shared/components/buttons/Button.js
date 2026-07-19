import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import clsx from "clsx";
const variantClasses = {
    primary: "bg-[var(--color-brand)] text-[var(--color-text-inverse)] hover:bg-[var(--color-brand-hover)] shadow-sm",
    secondary: "bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)]",
    ghost: "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]",
    danger: "bg-[var(--color-error)] text-[var(--color-text-inverse)] hover:opacity-90 shadow-sm",
};
const sizeClasses = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-11 px-5 text-base gap-2.5",
};
const Button = forwardRef(({ variant = "primary", size = "md", loading = false, fullWidth = false, leftIcon, rightIcon, disabled, className, children, ...props }, ref) => {
    const isDisabled = disabled || loading;
    return (_jsxs("button", { ref: ref, disabled: isDisabled, className: clsx(
        // Base
        "inline-flex items-center justify-center font-medium rounded-lg", "transition-all duration-150 ease-in-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2", "disabled:opacity-50 disabled:cursor-not-allowed", "cursor-pointer", 
        // Variant
        variantClasses[variant], 
        // Size
        sizeClasses[size], 
        // Full width
        fullWidth && "w-full", className), ...props, children: [loading ? (_jsxs("svg", { className: "animate-spin h-4 w-4 shrink-0", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-hidden": "true", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })] })) : (leftIcon && _jsx("span", { className: "shrink-0", children: leftIcon })), children && _jsx("span", { children: children }), !loading && rightIcon && (_jsx("span", { className: "shrink-0", children: rightIcon }))] }));
});
Button.displayName = "Button";
export default Button;
