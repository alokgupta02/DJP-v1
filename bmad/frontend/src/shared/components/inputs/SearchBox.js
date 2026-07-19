import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import clsx from "clsx";
const SearchBox = forwardRef(({ value, onChange, onClear, placeholder = "Search…", className, ...props }, ref) => {
    return (_jsxs("div", { className: clsx("relative flex items-center", className), children: [_jsx(SearchIcon, { size: 16, className: "pointer-events-none absolute left-3 text-[var(--color-text-secondary)]", "aria-hidden": "true" }), _jsx("input", { ref: ref, type: "search", value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, className: clsx("h-9 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)]", "pl-9 pr-8 text-sm text-[var(--color-text-primary)]", "placeholder:text-[var(--color-text-secondary)]", "transition-colors duration-150", "focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-[var(--color-brand)]"), "aria-label": placeholder, ...props }), value && (_jsx("button", { type: "button", onClick: () => {
                    onChange("");
                    onClear?.();
                }, className: "absolute right-2.5 flex items-center justify-center rounded text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors", "aria-label": "Clear search", children: _jsx(XIcon, { size: 14 }) }))] }));
});
SearchBox.displayName = "SearchBox";
export default SearchBox;
