import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Flame, ThumbsUp, MessageSquare, Users, Landmark, Clock, CheckCircle2, User, AlertTriangle, Trash2, Droplet, Lightbulb, Plus, Image, ChevronDown, Vote, } from "lucide-react";
import clsx from "clsx";
const TOPICS = [
    "All Topics", "Roads", "Garbage", "Water", "Electricity",
    "Judiciary", "Education", "Healthcare", "Police", "Environment",
    "Economy", "More",
];
const CONTENT_TYPES = ["All", "Issues", "Discussions", "Polls", "Petitions"];
const ISSUES = [
    {
        id: "pothole",
        category: "Road",
        severity: "Critical",
        title: "Large Pothole Near Balewadi High Street Junction",
        location: "Balewadi High Street • Ward 23",
        distance: "140 m",
        time: "2h",
        status: "Open",
        supports: 96,
        comments: 24,
        affected: "500+",
        govLevel: "Ward",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=350&h=240&fit=crop",
        imageCount: 14,
        verified: true,
    },
    {
        id: "garbage",
        category: "Garbage",
        severity: "High",
        title: "Garbage Dump on Balewadi Street near Parke Serene",
        location: "Balewadi • Ward 23",
        distance: "780 m",
        time: "15h",
        status: "Open",
        supports: 42,
        comments: 18,
        affected: "120–200",
        govLevel: "Ward",
        image: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=350&h=240&fit=crop",
        imageCount: 6,
        verified: true,
    },
    {
        id: "water",
        category: "Water Supply",
        severity: "High",
        title: "Water Main Leakage on Main Street",
        location: "Main Street • Ward 12",
        distance: "320 m",
        time: "5h",
        status: "Open",
        supports: 58,
        comments: 11,
        affected: "300–500",
        govLevel: "Ward",
        image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=350&h=240&fit=crop",
        imageCount: 9,
        verified: true,
    },
];
const DISCUSSIONS = [
    {
        id: "community-park",
        tags: ["Proposal", "Ward"],
        tagVariant: ["brand", "secondary"],
        title: "Convert the Abandoned Plot Near 5th Cross into a Community Park",
        description: "The vacant municipal plot has become an informal dumping ground. This proposal suggests converting it into a low-maintenance public park with walking paths, native trees, children's play equipment and seating areas for senior citizens.",
        author: "Alok G.",
        time: "3h ago",
        participants: ["JD", "MK"],
        participantCount: 21,
        supports: 142,
        comments: 56,
    },
    {
        id: "judiciary",
        tags: ["Question", "Judiciary"],
        tagVariant: ["brand", "secondary"],
        title: "To whom is the higher judiciary accountable?",
        description: "Research and public commentary have raised questions about judicial appointments, the collegium system, and the prevalence of family connections in India's higher judiciary. Unlike the Legislature and Executive, which are politically accountable to voters through elections, what mechanisms ensure accountability of the Judiciary?",
        author: "Alok G.",
        time: "2h ago",
        participants: ["RS", "MK"],
        participantCount: 37,
        supports: 184,
        comments: 92,
    },
    {
        id: "ncert",
        tags: ["Debate", "Judiciary", "India"],
        tagVariant: ["error", "secondary", "brand"],
        title: "Did the Supreme Court's action against the NCERT chapter on judicial corruption strike the right balance?",
        description: "The Supreme Court's intervention regarding an NCERT chapter discussing judicial corruption has revived an important constitutional debate. Should courts be able to restrict educational material concerning the judiciary?",
        author: "Alok G.",
        time: "8h ago",
        participants: ["RS", "NP"],
        participantCount: 52,
        supports: 624,
        comments: 184,
    },
];
const POLLS = [
    {
        id: "no-car-sunday",
        question: "Should Ward 42 implement No-Car Sundays in the Market Area?",
        description: "This poll seeks public opinion on introducing vehicle-free Sundays in the market area to improve pedestrian safety, local business activity and public spaces.",
        options: [
            { label: "Yes", percent: 68, primary: true },
            { label: "No", percent: 32, primary: false },
        ],
        author: "Alok G.",
        time: "Ends in 2 days",
        votes: 1842,
        comments: 63,
    },
    {
        id: "public-transport",
        question: "How should Pune improve its public transport over the next five years?",
        description: "The Maharashtra Government is seeking citizen feedback on which transport initiative should receive the highest priority.",
        options: [
            { label: "Expand Metro Network", percent: 41, primary: true },
            { label: "Increase PMPML Bus Fleet", percent: 29, primary: false },
            { label: "Build More Cycling Tracks", percent: 18, primary: false },
            { label: "Improve Existing Roads First", percent: 12, primary: false },
        ],
        author: "Transport Action Forum",
        time: "Ends in 4 days",
        votes: 5284,
        comments: 147,
    },
];
const CATEGORIES = [
    { label: "Garbage", icon: Trash2, count: 91 },
    { label: "Potholes", icon: AlertTriangle, count: 38 },
    { label: "Streetlights", icon: Lightbulb, count: 14 },
];
const TRENDING = [
    { type: "Issue", label: "Issue", location: "Ward 23", title: "Garbage Dump near Parke Serene", trend: "↑ +42 supports today", variant: "error" },
    { type: "Discussion", label: "Discussion", location: "India", title: "Who is Accountable for the Judiciary?", trend: "↑ +31 supports today", variant: "secondary" },
    { type: "Poll", label: "Poll", location: "Pune", title: "How should Pune improve public transport?", trend: "Ends in 4 days", variant: "brand" },
];
function IssueIcon({ category }) {
    if (category === "Road")
        return _jsx(AlertTriangle, { size: 24 });
    if (category === "Garbage")
        return _jsx(Trash2, { size: 24 });
    if (category === "Water Supply")
        return _jsx(Droplet, { size: 24 });
    return _jsx(AlertTriangle, { size: 24 });
}
function SeverityBadge({ severity }) {
    const color = severity === "Critical"
        ? "bg-[var(--color-error-bg)] text-[var(--color-error)]"
        : "bg-[var(--color-warning-bg)] text-[var(--color-warning)]";
    return (_jsx("span", { className: clsx("inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase leading-none", color), children: severity }));
}
function FeedFilterBar() {
    const [activeTopic, setActiveTopic] = useState("All Topics");
    const [activeContent, setActiveContent] = useState("All");
    return (_jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-4 mb-6 rounded-xl", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("div", { className: "flex-1 min-w-[260px]", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { size: 16, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] pointer-events-none" }), _jsx("input", { type: "text", placeholder: "Search issues, discussions or polls...", className: "h-11 w-full rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)] pl-11 pr-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors" })] }) }), _jsxs("button", { className: "flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)] transition-colors text-sm font-medium text-[var(--color-text-primary)]", children: [_jsx(MapPin, { size: 16, className: "text-[var(--color-brand)]" }), "My Area", _jsx(ChevronDown, { size: 14, className: "text-[var(--color-text-secondary)]" })] }), _jsxs("button", { className: "flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)] transition-colors text-sm font-medium text-[var(--color-text-primary)]", children: [_jsx(Flame, { size: 16 }), "Trending", _jsx(ChevronDown, { size: 14, className: "text-[var(--color-text-secondary)]" })] })] }), _jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: TOPICS.map((topic) => (_jsx("button", { onClick: () => setActiveTopic(topic), className: clsx("px-3 py-1.5 rounded-full text-sm transition-colors", activeTopic === topic
                        ? "bg-[var(--color-brand-light)] text-[var(--color-brand)] font-semibold"
                        : "border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]"), children: topic }, topic))) }), _jsx("div", { className: "mt-4 flex flex-wrap items-center gap-2", children: CONTENT_TYPES.map((type) => (_jsx("button", { onClick: () => setActiveContent(type), className: clsx("px-4 py-2 rounded-full text-sm font-semibold transition-colors", activeContent === type
                        ? "bg-[var(--color-brand)] text-[var(--color-text-inverse)]"
                        : "bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]"), children: type }, type))) }), _jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-secondary)] border-t border-[var(--color-border)] pt-3", children: [_jsx("span", { className: "font-medium text-[var(--color-text-primary)]", children: "Showing:" }), _jsx("span", { className: "px-2 py-1 rounded bg-[var(--color-brand-light)] text-[var(--color-brand)] text-xs font-medium", children: activeContent }), _jsx("span", { className: "px-2 py-1 rounded bg-[var(--color-bg-subtle)] text-xs", children: "\uD83D\uDCCD My Area" }), _jsx("span", { className: "px-2 py-1 rounded bg-[var(--color-bg-subtle)] text-xs", children: activeTopic }), _jsx("span", { className: "px-2 py-1 rounded bg-[var(--color-bg-subtle)] text-xs", children: "\uD83D\uDD25 Trending" }), _jsx("span", { className: "ml-auto text-xs", children: "124 results" })] })] }));
}
function IssueCard({ issue }) {
    return (_jsx(Link, { to: `/issues/${issue.id}`, className: "block bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 md:p-7 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300", children: _jsxs("div", { className: "flex gap-5", children: [_jsx("div", { className: "flex-1 min-w-0", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsxs("div", { className: "relative shrink-0", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-[var(--color-brand-light)] flex items-center justify-center text-[var(--color-brand)]", children: _jsx(IssueIcon, { category: issue.category }) }), issue.verified && (_jsx("div", { className: "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center", children: _jsx(CheckCircle2, { size: 12, className: "text-white" }) }))] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "flex items-start justify-between gap-4", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "text-xs uppercase tracking-wider font-semibold text-[var(--color-brand)]", children: issue.category }), _jsx(SeverityBadge, { severity: issue.severity })] }), _jsx("h3", { className: "font-bold text-lg text-[var(--color-text-primary)] leading-snug", children: issue.title })] }) }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 mt-2 text-sm text-[var(--color-text-secondary)]", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { size: 16 }), issue.location] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { size: 16 }), issue.distance] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { size: 16 }), issue.time] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(CheckCircle2, { size: 16, className: "text-[var(--color-success)]" }), issue.status] })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-6 mt-2 text-sm", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-[var(--color-brand)]", children: [_jsx(ThumbsUp, { size: 16 }), _jsx("span", { className: "font-semibold", children: issue.supports })] }), _jsxs("div", { className: "flex items-center gap-1.5 text-[var(--color-text-secondary)]", children: [_jsx(MessageSquare, { size: 16 }), issue.comments] }), _jsxs("div", { className: "flex items-center gap-1.5 text-[var(--color-text-secondary)]", children: [_jsx(Users, { size: 16 }), issue.affected] }), _jsxs("div", { className: "flex items-center gap-1.5 text-[var(--color-text-secondary)]", children: [_jsx(Landmark, { size: 16 }), issue.govLevel] })] })] })] }) }), _jsxs("div", { className: "relative shrink-0 hidden sm:block", children: [_jsx("img", { src: issue.image, alt: "Issue evidence", className: "w-48 h-36 rounded-xl object-cover border border-[var(--color-border)]", loading: "lazy" }), _jsxs("div", { className: "absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs", children: [_jsx(Image, { size: 14 }), issue.imageCount] })] })] }) }));
}
function DiscussionCard({ discussion }) {
    const variantMap = {
        brand: "bg-[var(--color-brand-light)] text-[var(--color-brand)]",
        secondary: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
        error: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
    };
    return (_jsxs(Link, { to: `/discussions/${discussion.id}`, className: "block bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 md:p-7 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300", children: [_jsx("div", { className: "flex items-center gap-2 mb-3", children: discussion.tags.map((tag, i) => (_jsx("span", { className: clsx("px-2 py-1 rounded-full text-[11px] font-semibold", variantMap[discussion.tagVariant[i]] || "bg-[var(--color-bg-subtle)]"), children: tag }, tag))) }), _jsx("h3", { className: "font-bold text-xl text-[var(--color-text-primary)] leading-snug", children: discussion.title }), _jsx("p", { className: "text-[var(--color-text-secondary)] mt-3 line-clamp-3 text-sm", children: discussion.description }), _jsxs("div", { className: "flex items-center gap-4 mt-4 text-sm text-[var(--color-text-secondary)]", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(User, { size: 16 }), discussion.author] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { size: 16 }), discussion.time] })] }), _jsxs("div", { className: "flex items-center justify-between mt-5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex -space-x-2", children: [discussion.participants.map((p) => (_jsx("div", { className: "w-8 h-8 rounded-full border-2 border-white bg-[var(--color-bg-subtle)] flex items-center justify-center text-[10px] font-bold text-[var(--color-text-primary)]", children: p }, p))), _jsxs("div", { className: "w-8 h-8 rounded-full border-2 border-white bg-[var(--color-bg-muted)] flex items-center justify-center text-[10px] font-bold text-[var(--color-text-secondary)]", children: ["+", discussion.participantCount] })] }), _jsx("span", { className: "text-sm text-[var(--color-text-secondary)]", children: "discussing" })] }), _jsxs("div", { className: "flex items-center gap-6 text-sm", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-[var(--color-brand)]", children: [_jsx(ThumbsUp, { size: 16 }), _jsx("span", { className: "font-semibold", children: discussion.supports })] }), _jsxs("div", { className: "flex items-center gap-1.5 text-[var(--color-text-secondary)]", children: [_jsx(MessageSquare, { size: 16 }), discussion.comments] })] })] })] }));
}
function PollCard({ poll }) {
    return (_jsxs(Link, { to: `/polls/${poll.id}`, className: "block bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 md:p-7 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("span", { className: "px-2 py-1 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-[11px] font-semibold", children: "\uD83D\uDCCA Poll" }), _jsx("span", { className: "px-2 py-1 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] text-[11px] font-semibold", children: "\uD83C\uDFDB Ward" })] }), _jsx("h3", { className: "font-bold text-xl text-[var(--color-text-primary)] leading-snug", children: poll.question }), _jsx("p", { className: "text-[var(--color-text-secondary)] mt-3 line-clamp-3 text-sm", children: poll.description }), _jsx("div", { className: "mt-5 space-y-3", children: poll.options.map((opt) => (_jsx("div", { className: "relative", children: _jsxs("div", { className: "w-full h-11 rounded-lg bg-[var(--color-bg-subtle)] overflow-hidden relative", children: [_jsx("div", { className: clsx("absolute left-0 top-0 h-full rounded-lg", opt.primary ? "bg-[var(--color-brand)]/15" : "bg-[var(--color-text-primary)]/5"), style: { width: `${opt.percent}%` } }), _jsxs("div", { className: "relative flex items-center justify-between h-full px-4 text-sm", children: [_jsx("span", { className: "font-medium text-[var(--color-text-primary)]", children: opt.label }), _jsxs("span", { className: clsx("font-semibold", opt.primary && "text-[var(--color-brand)]"), children: [opt.percent, "%"] })] })] }) }, opt.label))) }), _jsxs("div", { className: "flex items-center gap-4 mt-5 text-sm text-[var(--color-text-secondary)]", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(User, { size: 16 }), poll.author] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { size: 16 }), poll.time] })] }), _jsx("div", { className: "flex items-center justify-between mt-5", children: _jsxs("div", { className: "flex items-center gap-6 text-sm", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-[var(--color-brand)]", children: [_jsx(Vote, { size: 16 }), _jsx("span", { className: "font-semibold", children: poll.votes.toLocaleString() })] }), _jsxs("div", { className: "flex items-center gap-1.5 text-[var(--color-text-secondary)]", children: [_jsx(MessageSquare, { size: 16 }), poll.comments] })] }) })] }));
}
function TrendCard({ item }) {
    const badgeColors = {
        error: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
        secondary: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
        brand: "bg-[var(--color-brand-light)] text-[var(--color-brand)]",
    };
    return (_jsxs(Link, { to: "#", className: "block rounded-lg p-3 hover:bg-[var(--color-bg-subtle)] transition", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: clsx("px-2 py-0.5 rounded-full text-[10px] font-semibold", badgeColors[item.variant]), children: item.label }), _jsxs("span", { className: "text-xs text-[var(--color-text-secondary)]", children: ["\uD83D\uDCCD ", item.location] })] }), _jsx("p", { className: "font-semibold text-sm text-[var(--color-text-primary)] leading-snug", children: item.title }), _jsx("p", { className: "text-xs text-[var(--color-brand)] mt-1", children: item.trend })] }));
}
export default function FeedPage() {
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsx("div", { className: "px-8 pt-8 w-full", children: _jsx(FeedFilterBar, {}) }), _jsxs("div", { className: "flex-1 flex gap-8 overflow-hidden px-8 pb-8 w-full", children: [_jsx("div", { className: "flex-1 overflow-y-auto min-w-0", children: _jsxs("div", { className: "space-y-6 pb-32", children: [ISSUES.map((issue) => (_jsx(IssueCard, { issue: issue }, issue.id))), DISCUSSIONS.map((discussion) => (_jsx(DiscussionCard, { discussion: discussion }, discussion.id))), POLLS.map((poll) => (_jsx(PollCard, { poll: poll }, poll.id)))] }) }), _jsxs("div", { className: "w-80 shrink-0 overflow-y-auto space-y-5 hidden lg:block", children: [_jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h5", { className: "text-xs font-black uppercase tracking-widest text-[var(--color-text-secondary)]", children: "\uD83D\uDCCD Your Area" }), _jsx("p", { className: "text-sm text-[var(--color-text-secondary)] mt-1", children: "Balewadi \u2022 Ward 23" })] }), _jsx("button", { className: "text-[var(--color-brand)] text-sm font-semibold hover:underline", children: "Explore" })] }), _jsxs("div", { className: "bg-[var(--color-bg-subtle)] rounded-xl p-4 mb-4", children: [_jsx("p", { className: "text-xs uppercase tracking-wide font-semibold text-[var(--color-text-secondary)]", children: "Active Issues" }), _jsx("p", { className: "text-4xl font-black text-[var(--color-brand)] mt-1", children: "124" })] }), _jsx("div", { className: "space-y-1", children: CATEGORIES.map((cat) => (_jsxs("button", { className: "w-full flex items-center justify-between rounded-lg px-3 py-3 hover:bg-[var(--color-bg-subtle)] transition", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(cat.icon, { size: 18, className: "text-[var(--color-brand)]" }), _jsx("span", { className: "font-medium text-sm text-[var(--color-text-primary)]", children: cat.label })] }), _jsx("span", { className: "font-bold text-[var(--color-brand)]", children: cat.count })] }, cat.label))) })] }), _jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h5", { className: "text-xs font-black uppercase tracking-widest text-[var(--color-text-secondary)]", children: "\uD83D\uDD25 Trending" }), _jsx("button", { className: "text-[var(--color-brand)] text-sm font-semibold hover:underline", children: "View All" })] }), _jsx("div", { className: "space-y-1", children: TRENDING.map((item) => (_jsx(TrendCard, { item: item }, item.title))) })] })] })] }), _jsxs("div", { className: "fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3 group", children: [_jsxs("div", { className: "flex flex-col items-end gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto mb-4", children: [_jsxs(Link, { to: "/issues/new", className: "flex items-center gap-3 px-4 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors shadow-lg", children: [_jsx("span", { className: "text-sm font-bold text-[var(--color-text-primary)]", children: "Report Issue" }), _jsx("span", { className: "w-8 h-8 rounded-full bg-[var(--color-brand-light)] flex items-center justify-center text-[var(--color-brand)]", children: _jsx(AlertTriangle, { size: 16 }) })] }), _jsxs(Link, { to: "/discussions/new", className: "flex items-center gap-3 px-4 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors shadow-lg", children: [_jsx("span", { className: "text-sm font-bold text-[var(--color-text-primary)]", children: "Start Discussion" }), _jsx("span", { className: "w-8 h-8 rounded-full bg-[var(--color-bg-subtle)] flex items-center justify-center text-[var(--color-text-secondary)]", children: _jsx(MessageSquare, { size: 16 }) })] }), _jsxs(Link, { to: "/polls/new", className: "flex items-center gap-3 px-4 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors shadow-lg", children: [_jsx("span", { className: "text-sm font-bold text-[var(--color-text-primary)]", children: "Create Poll" }), _jsx("span", { className: "w-8 h-8 rounded-full bg-[var(--color-bg-subtle)] flex items-center justify-center text-[var(--color-text-secondary)]", children: _jsx(Vote, { size: 16 }) })] })] }), _jsxs("button", { className: "flex items-center gap-3 h-14 pl-4 pr-6 bg-[var(--color-brand)] text-[var(--color-text-inverse)] rounded-[1.25rem] shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200", children: [_jsx(Plus, { size: 24 }), _jsx("span", { className: "font-bold text-sm tracking-wider", children: "CREATE" })] })] })] }));
}
