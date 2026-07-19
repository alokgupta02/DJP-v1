import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useEffect } from "react";
const SidebarContext = createContext(undefined);
export function SidebarProvider({ children }) {
    const [collapsed, setCollapsed] = useState(() => {
        try {
            const saved = localStorage.getItem("djp-sidebar-collapsed");
            return saved ? JSON.parse(saved) : false;
        }
        catch {
            return false;
        }
    });
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        try {
            localStorage.setItem("djp-sidebar-collapsed", JSON.stringify(collapsed));
        }
        catch (e) {
            console.warn("localStorage item set failed:", e);
        }
    }, [collapsed]);
    const toggleCollapsed = () => setCollapsed((prev) => !prev);
    const toggleMobile = () => setMobileOpen((prev) => !prev);
    const closeMobile = () => setMobileOpen(false);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
                const target = e.target;
                if (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable) {
                    return;
                }
                e.preventDefault();
                setCollapsed((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
    return (_jsx(SidebarContext.Provider, { value: {
            collapsed,
            setCollapsed,
            toggleCollapsed,
            mobileOpen,
            setMobileOpen,
            toggleMobile,
            closeMobile,
            isMobile,
        }, children: children }));
}
// eslint-disable-next-line react-refresh/only-export-components
export function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
