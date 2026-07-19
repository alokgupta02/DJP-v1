import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
const sizeClasses = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
};
export default function Avatar({ initials, src, alt = "", size = "md", gradient = "from-[#667eea] to-[#764ba2]", className, }) {
    const base = clsx("relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white overflow-hidden", sizeClasses[size], className);
    if (src) {
        return (_jsx("span", { className: base, children: _jsx("img", { src: src, alt: alt, className: "h-full w-full object-cover", loading: "lazy" }) }));
    }
    return (_jsx("span", { className: clsx(base, `bg-gradient-to-br ${gradient}`), children: initials ?? "?" }));
}
