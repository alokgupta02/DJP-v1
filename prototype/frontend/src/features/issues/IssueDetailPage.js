import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, Link } from "react-router-dom";
import { ThumbsUp, MessageSquare, Users, CheckCircle2, Share2, ImagePlus, ArrowLeft, AlertTriangle, Trash2, Droplet } from "lucide-react";
import clsx from "clsx";
const ISSUES_DATA = {
    pothole: {
        id: "pothole", category: "Road", severity: "Critical",
        title: "Large Pothole Near Balewadi High Street Junction",
        description: "A deep pothole has formed near the Balewadi High Street junction following recent rainfall. Vehicles frequently swerve to avoid it, increasing the risk of accidents and traffic congestion. Motorcyclists are particularly vulnerable during night hours because of poor visibility.",
        location: "Balewadi High Street • Ward 23", address: "Balewadi High Street Junction, Ward 23, Pune",
        distance: "140 m away", time: "Reported 2 hours ago", govLevel: "Ward",
        supports: 96, comments: 24, affected: "500+",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200",
        imageCount: 14, verified: true,
        iconBg: "bg-amber-100", iconColor: "text-amber-700", icon: AlertTriangle,
        timeline: [
            "📷 Three new evidence photos uploaded.",
            "🚴 Citizen reported a minor bike accident near the pothole.",
            "👍 Support crossed 90 citizens.",
            "✅ Community verification completed.",
            "📝 Issue reported.",
        ],
        commenters: [
            { name: "Aman", text: "This pothole has become much deeper after yesterday's rain." },
            { name: "Priya", text: "Several vehicles are suddenly changing lanes to avoid it." },
        ],
        health: [
            ["✅", "Community Verified"], ["👍", "96 Citizens Support"],
            ["📷", "14 Evidence Photos"], ["👥", "500+ Citizens Affected"],
            ["🕒", "Active for 2 hours"],
        ],
        related: [
            { title: "Pothole near Balewadi Stadium", dist: "350 m" },
            { title: "Damaged Road Surface near NICMAR", dist: "900 m" },
            { title: "Road Crack near Ganesh Temple", dist: "1.2 km" },
        ],
    },
    water: {
        id: "water", category: "Water Supply", severity: "HIGH",
        title: "Water Main Leakage on Main Street",
        description: "A continuous leak from an underground water main has been observed on Main Street since early morning. Water is flowing across the carriageway, creating slippery conditions, wasting treated water and reducing water pressure in nearby residential buildings.",
        location: "Main Street • Ward 12", address: "Main Street, Ward 12",
        distance: "320 m away", time: "5h ago", govLevel: "Ward",
        supports: 58, comments: 11, affected: "300–500",
        image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1200",
        imageCount: 9, verified: true,
        iconBg: "bg-cyan-100", iconColor: "text-cyan-700", icon: Droplet,
        timeline: [
            "💧 Additional leakage photo uploaded.",
            "✅ Community verified.",
            "👍 Support crossed 50.",
            "📝 Issue reported.",
        ],
        commenters: [
            { name: "Rahul", text: "Water pressure has dropped in our apartments." },
            { name: "Sneha", text: "The road is becoming slippery for two-wheelers." },
        ],
        health: [
            ["✅", "Community Verified"], ["👍", "58 Support"],
            ["📷", "9 Photos"], ["👥", "300–500 Affected"],
            ["🕒", "Active 5 hours"],
        ],
        related: [
            { title: "Water logging near Market Road", dist: "" },
            { title: "Pipeline leak near School", dist: "" },
            { title: "Broken valve at Ward Office", dist: "" },
        ],
    },
    garbage: {
        id: "garbage", category: "Garbage", severity: "HIGH",
        title: "Garbage Dump on Balewadi Street near Parke Serene",
        description: "A large pile of household and construction waste has accumulated beside the entrance to Parke Serene Society over the past week. The garbage obstructs pedestrians, emits foul odor, and attracts stray animals. Residents report that municipal collection has been missed multiple times.",
        location: "Balewadi • Ward 23", address: "Near Parke Serene Society, Balewadi, Pune.",
        distance: "780 m away", time: "Reported 15h ago", govLevel: "Ward",
        supports: 42, comments: 18, affected: "120–200",
        image: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=1000",
        imageCount: 6, verified: true,
        iconBg: "bg-emerald-100", iconColor: "text-emerald-700", icon: Trash2,
        timeline: [
            "🟢 Community verified by nearby citizens.",
            "📷 Two new evidence photos uploaded.",
            "👍 Support count crossed 40.",
            "📝 Original issue reported.",
        ],
        commenters: [
            { name: "Alok G.", text: "Garbage has increased after the weekend market." },
            { name: "Riya K.", text: "The collection truck skipped this street again today." },
        ],
        health: [
            ["✅", "Community Verified"], ["👍", "42 Citizens Support"],
            ["📷", "6 Evidence Photos"], ["👥", "120–200 Affected"],
            ["🕒", "Active for 5 days"],
        ],
        related: [
            { title: "Garbage near Balewadi Bus Stop", dist: "620 m" },
            { title: "Overflowing Dustbin near Ganesh Temple", dist: "1.1 km" },
            { title: "Construction Waste Dump", dist: "900 m" },
        ],
    },
};
export default function IssueDetailPage() {
    const { id } = useParams();
    const issue = id ? ISSUES_DATA[id] : undefined;
    const Icon = issue?.icon || AlertTriangle;
    if (!issue) {
        return (_jsx("div", { className: "flex-1 p-6 overflow-y-auto", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center py-20", children: [_jsx(AlertTriangle, { size: 48, className: "mx-auto text-[var(--color-text-secondary)] mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-[var(--color-text-primary)] mb-2", children: "Issue Not Found" }), _jsx("p", { className: "text-[var(--color-text-secondary)] mb-6", children: "The issue you're looking for doesn't exist." }), _jsx(Link, { to: "/issues", className: "text-[var(--color-brand)] font-semibold hover:underline", children: "\u2190 Back to Issues" })] }) }));
    }
    return (_jsx("div", { className: "flex-1 p-8 overflow-y-auto", children: _jsxs("div", { className: "w-full", children: [_jsxs(Link, { to: "/issues", className: "inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] mb-4 transition-colors", children: [_jsx(ArrowLeft, { size: 16 }), "Back to Issues"] }), _jsx("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "relative shrink-0", children: [_jsx("div", { className: clsx("w-14 h-14 rounded-full flex items-center justify-center", issue.iconBg), children: _jsx(Icon, { size: 24, className: issue.iconColor }) }), issue.verified && (_jsx("div", { className: "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center", children: _jsx(CheckCircle2, { size: 12, className: "text-white" }) }))] }), _jsxs("div", { children: [_jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx("span", { className: "text-xs uppercase tracking-wider font-semibold text-[var(--color-brand)]", children: issue.category }), _jsx("span", { className: clsx("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", issue.severity === "Critical" ? "bg-[var(--color-error-bg)] text-[var(--color-error)]" : "bg-[var(--color-warning-bg)] text-[var(--color-warning)]"), children: issue.severity })] }), _jsx("h1", { className: "text-3xl font-bold text-[var(--color-text-primary)]", children: issue.title }), _jsx("p", { className: "mt-3 text-[var(--color-text-secondary)] max-w-4xl leading-relaxed", children: issue.description }), _jsxs("div", { className: "flex flex-wrap gap-6 mt-4 text-sm text-[var(--color-text-secondary)]", children: [_jsxs("span", { children: ["\uD83D\uDCCD ", issue.location] }), _jsxs("span", { children: ["\uD83D\uDCCF", issue.distance] }), _jsxs("span", { children: ["\uD83D\uDD52", issue.time] }), _jsxs("span", { children: ["\uD83C\uDFDB", issue.govLevel] })] }), _jsxs("div", { className: "flex gap-6 mt-4", children: [_jsxs("button", { className: "flex items-center gap-1.5 text-[var(--color-brand)] font-semibold hover:underline", children: [_jsx(ThumbsUp, { size: 16 }), " ", issue.supports] }), _jsxs("button", { className: "flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors", children: [_jsx(MessageSquare, { size: 16 }), " ", issue.comments] }), _jsxs("div", { className: "flex items-center gap-1.5 text-[var(--color-text-secondary)]", children: [_jsx(Users, { size: 16 }), " ", issue.affected] })] })] })] }), _jsxs("button", { className: "flex items-center gap-2 border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors shrink-0", children: [_jsx(Share2, { size: 16 }), "Share"] })] }) }), _jsxs("div", { className: "grid grid-cols-3 gap-6 mt-6", children: [_jsxs("div", { className: "col-span-3 lg:col-span-2 space-y-6", children: [_jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5", children: [_jsx("h2", { className: "text-xl font-bold text-[var(--color-text-primary)] mb-4", children: "Evidence" }), _jsx("img", { src: issue.image, alt: "Issue evidence", className: "w-full h-96 rounded-lg object-cover" }), _jsxs("div", { className: "grid grid-cols-5 gap-3 mt-4", children: [Array.from({ length: 4 }).map((_, i) => (_jsx("div", { className: "bg-[var(--color-bg-muted)] h-20 rounded" }, i))), _jsx("button", { className: "border-2 border-dashed border-[var(--color-border)] rounded flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] transition-colors", children: _jsx(ImagePlus, { size: 20 }) })] })] }), _jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5", children: [_jsx("h2", { className: "text-xl font-bold text-[var(--color-text-primary)] mb-3", children: "Location" }), _jsx("div", { className: "h-72 bg-[var(--color-bg-muted)] rounded flex items-center justify-center text-[var(--color-text-secondary)]", children: "Map Placeholder" }), _jsx("p", { className: "mt-3 text-[var(--color-text-secondary)]", children: issue.address })] }), _jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5", children: [_jsx("h2", { className: "text-xl font-bold text-[var(--color-text-primary)] mb-3", children: "Citizen Activity Timeline" }), _jsx("ul", { className: "space-y-3 text-[var(--color-text-primary)]", children: issue.timeline.map((item, i) => (_jsx("li", { children: item }, i))) })] }), _jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5", children: [_jsx("h2", { className: "text-xl font-bold text-[var(--color-text-primary)] mb-4", children: "Discussion" }), issue.commenters.map((c) => (_jsxs("div", { className: "border-b border-[var(--color-border)] pb-3 mb-3", children: [_jsx("b", { className: "text-[var(--color-text-primary)]", children: c.name }), _jsx("p", { className: "text-[var(--color-text-secondary)] mt-1", children: c.text })] }, c.name))), _jsx("textarea", { className: "w-full border border-[var(--color-border)] rounded-lg p-3 bg-transparent text-[var(--color-text-primary)] mt-4 resize-none", rows: 4, placeholder: "Join the discussion..." }), _jsx("button", { className: "mt-3 bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity", children: "Post Comment" })] })] }), _jsxs("div", { className: "col-span-3 lg:col-span-1 space-y-6", children: [_jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5", children: [_jsx("h3", { className: "font-bold text-[var(--color-text-primary)] mb-3", children: "Issue Health" }), _jsx("ul", { className: "space-y-2 text-sm text-[var(--color-text-primary)]", children: issue.health.map(([icon, text]) => (_jsxs("li", { children: [icon, " ", text] }, text))) })] }), _jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5", children: [_jsx("h3", { className: "font-bold text-[var(--color-text-primary)] mb-3", children: "Related Issues" }), _jsx("ul", { className: "space-y-3 text-sm text-[var(--color-text-secondary)]", children: issue.related.map((r) => (_jsxs("li", { children: [r.title, r.dist && _jsxs("span", { children: [" (", r.dist, ")"] })] }, r.title))) })] })] })] })] }) }));
}
