import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar, { SidebarProvider } from "../sidebar";
import { Topbar } from "../navigation";
function AppLayoutContent() {
    // Ponytail: Simple auth guard via localStorage
    const isAuthenticated = Boolean(localStorage.getItem("djp_user"));
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return (_jsxs("div", { className: "flex h-screen flex-col md:flex-row bg-[var(--color-bg-page)] overflow-hidden", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex flex-1 flex-col min-w-0", children: [_jsx(Topbar, {}), _jsx("main", { className: "flex-1 overflow-auto", children: _jsx(Outlet, {}) })] })] }));
}
export default function AppLayout() {
    return (_jsx(SidebarProvider, { children: _jsx(AppLayoutContent, {}) }));
}
