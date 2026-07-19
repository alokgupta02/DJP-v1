import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapPin, Phone, Mail, Building, Calendar } from "lucide-react";
import clsx from "clsx";
const REPS = [
    {
        name: "Smt. Meera Devi", position: "Ward Councilor", ward: "Ward 42 — South Delhi",
        party: "Independent", since: "2020", phone: "+91 98765 43210", email: "meera.devi@ward42.in",
        image: "MD", bg: "bg-purple-100", textColor: "text-purple-700",
        stats: [
            { label: "Issues Resolved", value: "847" },
            { label: "Meetings Held", value: "124" },
            { label: "Attendance", value: "96%" },
        ],
    },
    {
        name: "Shri. Rajesh Kumar", position: "MLA", ward: "South Delhi Constituency",
        party: "Aam Aadmi Party", since: "2019", phone: "+91 98765 43211", email: "rajesh.kumar@delhi.gov.in",
        image: "RK", bg: "bg-blue-100", textColor: "text-blue-700",
        stats: [
            { label: "Bills Proposed", value: "18" },
            { label: "Constituency Visits", value: "56" },
            { label: "Public Meetings", value: "89" },
        ],
    },
    {
        name: "Adv. Sunita Sharma", position: "Municipal Committee Chairperson", ward: "Zone 3 — South Zone",
        party: "Independent", since: "2021", phone: "+91 98765 43212", email: "sunita.sharma@mcd.gov.in",
        image: "SS", bg: "bg-green-100", textColor: "text-green-700",
        stats: [
            { label: "Budgets Approved", value: "₹2.4Cr" },
            { label: "Projects Initiated", value: "34" },
            { label: "Grievances Addressed", value: "1,203" },
        ],
    },
];
export default function RepresentativesPage() {
    return (_jsx("div", { className: "flex-1 p-8 overflow-y-auto", children: _jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-[var(--text-heading)] font-bold text-[var(--color-text-primary)]", children: "Your Representatives" }), _jsx("p", { className: "text-sm text-[var(--color-text-secondary)] mt-1", children: "Contact and track the performance of your elected representatives." })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: REPS.map((rep) => (_jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow", children: [_jsx("div", { className: "h-2 bg-[var(--color-brand)]" }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-4 mb-5", children: [_jsx("div", { className: clsx("w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0", rep.bg, rep.textColor), children: rep.image }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-[var(--color-text-primary)]", children: rep.name }), _jsx("p", { className: "text-sm text-[var(--color-brand)] font-medium", children: rep.position })] })] }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2 text-[var(--color-text-secondary)]", children: [_jsx(MapPin, { size: 14 }), rep.ward] }), _jsxs("div", { className: "flex items-center gap-2 text-[var(--color-text-secondary)]", children: [_jsx(Building, { size: 14 }), rep.party] }), _jsxs("div", { className: "flex items-center gap-2 text-[var(--color-text-secondary)]", children: [_jsx(Calendar, { size: 14 }), "Since ", rep.since] }), _jsxs("div", { className: "flex items-center gap-2 text-[var(--color-text-secondary)]", children: [_jsx(Phone, { size: 14 }), rep.phone] }), _jsxs("div", { className: "flex items-center gap-2 text-[var(--color-text-secondary)]", children: [_jsx(Mail, { size: 14 }), rep.email] })] }), _jsx("div", { className: "mt-5 pt-4 border-t border-[var(--color-border)] grid grid-cols-3 gap-2", children: rep.stats.map((s) => (_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-lg font-bold text-[var(--color-text-primary)]", children: s.value }), _jsx("p", { className: "text-[10px] text-[var(--color-text-secondary)] leading-tight", children: s.label })] }, s.label))) }), _jsx("button", { className: "w-full mt-5 bg-[var(--color-brand)] text-[var(--color-text-inverse)] py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity", children: "Contact Representative" })] })] }, rep.name))) })] }) }));
}
