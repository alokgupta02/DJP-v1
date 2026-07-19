import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { FileText, Clock, Plus } from "lucide-react";
import clsx from "clsx";
const PETITIONS = [
    {
        id: "1", title: "Repair the Main Street Bridge Access Road",
        description: "We the residents of Ward 12 request immediate repair of the access road leading to the Main Street Bridge. The road has been in disrepair for over 6 months.",
        category: "Infrastructure", signatures: 1284, goal: 2500, deadline: "Jan 15, 2025",
        author: "Ward 12 Residents Welfare Assoc.", daysLeft: 12,
    },
    {
        id: "2", title: "Install Speed Bumps Near Balewadi School Zone",
        description: "Petitioning the Municipal Corporation to install speed bumps on the road passing Balewadi High School to ensure student safety during peak hours.",
        category: "Road Safety", signatures: 843, goal: 1500, deadline: "Feb 28, 2025",
        author: "Parent-Teacher Association", daysLeft: 56,
    },
    {
        id: "3", title: "Restore Weekly Farmers Market in Sector 7",
        description: "Request to the District Administration to restore the weekly farmers market that was discontinued last quarter, affecting local farmers and residents.",
        category: "Markets", signatures: 2156, goal: 3000, deadline: "Mar 10, 2025",
        author: "Sector 7 Market Committee", daysLeft: 66,
    },
];
const FILTER_TABS = ["Trending", "Recent", "Near Me", "Signed", "Created"];
export default function PetitionsPage() {
    const [activeTab, setActiveTab] = useState("Trending");
    return (_jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "p-8 pb-0", children: [_jsxs("div", { className: "flex items-end justify-between w-full mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-[var(--text-heading)] font-bold text-[var(--color-text-primary)]", children: "Petitions" }), _jsx("p", { className: "text-sm text-[var(--color-text-secondary)] mt-1", children: "Add your voice to community petitions or start a new one." })] }), _jsxs("button", { className: "flex items-center gap-2 px-6 py-2.5 bg-[var(--color-brand)] text-[var(--color-text-inverse)] rounded-full font-bold hover:opacity-90 transition-all shadow-md text-sm", children: [_jsx(Plus, { size: 18 }), "Start Petition"] })] }), _jsx("div", { className: "flex gap-2 overflow-x-auto pb-4", children: FILTER_TABS.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab), className: clsx("px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap", activeTab === tab
                                ? "bg-[var(--color-brand)] text-[var(--color-text-inverse)]"
                                : "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-muted)]"), children: tab }, tab))) })] }), _jsx("div", { className: "px-8 pb-8", children: _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 w-full", children: PETITIONS.map((p) => {
                        const pct = Math.round((p.signatures / p.goal) * 100);
                        return (_jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("span", { className: "px-2 py-1 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-[11px] font-semibold", children: p.category }), _jsxs("span", { className: "flex items-center gap-1 text-[11px] text-[var(--color-text-secondary)]", children: [_jsx(Clock, { size: 12 }), p.daysLeft, " days left"] })] }), _jsx("h3", { className: "font-bold text-lg text-[var(--color-text-primary)] leading-snug", children: p.title }), _jsx("p", { className: "text-sm text-[var(--color-text-secondary)] mt-2 line-clamp-2", children: p.description }), _jsxs("div", { className: "mt-5", children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsxs("span", { className: "font-semibold text-[var(--color-text-primary)]", children: [p.signatures.toLocaleString(), " signatures"] }), _jsxs("span", { className: "text-[var(--color-text-secondary)]", children: ["Goal: ", p.goal.toLocaleString()] })] }), _jsx("div", { className: "w-full h-2.5 bg-[var(--color-bg-muted)] rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-[var(--color-brand)] rounded-full", style: { width: `${pct}%` } }) })] }), _jsxs("div", { className: "flex items-center justify-between mt-5 pt-4 border-t border-[var(--color-border)]", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-[var(--color-text-secondary)]", children: [_jsx(FileText, { size: 14 }), p.author] }), _jsx("button", { className: "bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity", children: "Sign" })] })] }, p.id));
                    }) }) })] }));
}
