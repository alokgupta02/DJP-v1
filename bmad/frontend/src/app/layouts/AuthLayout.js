import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
export default function AuthLayout() {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-[var(--color-bg-page)] px-4 py-8", children: _jsx(Outlet, {}) }));
}
