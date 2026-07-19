import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, Link } from "react-router-dom";
import { ThumbsUp, MessageSquare, Share2, ArrowLeft, ExternalLink, Users } from "lucide-react";
import clsx from "clsx";
const DISCUSSIONS_DATA = {
    "ncert": {
        id: "ncert",
        tags: [
            { label: "⚖ Debate", variant: "error" },
            { label: "Judiciary", variant: "secondary" },
            { label: "🇮🇳 India", variant: "brand" },
        ],
        title: "Did the Supreme Court's action against the NCERT chapter on judicial corruption strike the right balance between protecting judicial reputation and preserving academic freedom?",
        subtitle: "A debate on judicial accountability, academic freedom and the limits of institutional criticism in educational material.",
        author: "Alok G.",
        time: "Posted 8 hours ago",
        supports: 624,
        comments: 184,
        sections: [
            {
                title: "Background",
                content: [
                    "A chapter discussing allegations of judicial corruption written by Professor Michel Danino and other contributors for NCERT became the subject of legal proceedings, resulting in judicial directions that ultimately prevented its publication and circulation.",
                    "Supporters argue that educational material making serious allegations against constitutional institutions should satisfy a very high standard of factual accuracy before being introduced into school curriculum.",
                    "Critics contend that restricting such material raises broader concerns regarding academic freedom, open debate and the ability of educational institutions to critically examine constitutional bodies.",
                ],
            },
            {
                title: "Why this matters",
                content: [
                    "The debate goes beyond a single publication. It raises important constitutional questions regarding judicial accountability, freedom of expression, academic independence and the balance between protecting institutional reputation and allowing critical public discourse.",
                ],
            },
            {
                title: "Questions for Discussion",
                content: [
                    "Should courts intervene in educational material discussing allegations against the judiciary?",
                    "Where should the line be drawn between institutional reputation and academic freedom?",
                    "Should educational content be allowed to critically examine constitutional institutions?",
                    "How should democracies balance respect for the judiciary with freedom of scholarship?",
                ],
            },
        ],
        aiSummary: "Most participants agree that educational institutions should be free to discuss constitutional institutions, including the judiciary, provided discussions are supported by credible evidence. At the same time, many participants believe the judiciary has a legitimate interest in preventing inaccurate or misleading educational material from becoming part of school curricula.",
        aiCommon: [
            "✅ Academic criticism should remain protected.",
            "✅ Constitutional institutions should be open to scholarly examination.",
            "✅ Public confidence improves through transparency.",
            "✅ Educational material should encourage critical thinking.",
        ],
        aiAlt: [
            "• School textbooks should avoid politically sensitive topics.",
            "• Judicial reputation deserves stronger institutional protection.",
            "• Allegations should only appear after judicial findings become final.",
        ],
        commenters: [
            { initials: "RS", bg: "bg-blue-100", textColor: "text-blue-700", name: "Rahul Sharma", time: "2 hours ago", text: "Academic freedom loses its meaning if constitutional institutions become immune from criticism. If there are factual inaccuracies, they should be corrected transparently instead of preventing discussion altogether.", likes: 47 },
            { initials: "NP", bg: "bg-green-100", textColor: "text-green-700", name: "Neha Patel", time: "4 hours ago", text: "Textbooks influence millions of students. I believe educational content should undergo rigorous verification before discussing serious allegations against constitutional offices.", likes: 31 },
            { initials: "AK", bg: "bg-purple-100", textColor: "text-purple-700", name: "Amit Kumar", time: "Yesterday", text: "Instead of debating one judgment, perhaps India needs a clearer institutional framework for judicial accountability that preserves both independence and transparency.", likes: 62 },
        ],
        status: [
            ["Started", "5 days ago"],
            ["Last Activity", "12 mins ago"],
            ["Supports", "624"],
            ["Comments", "184"],
            ["Polls", "1"],
            ["Petition", "NA"],
        ],
        poll: {
            question: "Should educational books be allowed to critically discuss allegations involving constitutional institutions?",
            options: [
                { label: "Yes", percent: 46, color: "bg-blue-200" },
                { label: "No", percent: 34, color: "bg-slate-300" },
                { label: "Depends on Evidence", percent: 20, color: "bg-orange-200" },
            ],
            votes: "8,241",
        },
        related: [
            { title: "Should the Collegium System be Reformed?", meta: "913 supports • 214 comments" },
            { title: "Who Is the Higher Judiciary Accountable To?", meta: "1.2K supports • 387 comments" },
            { title: "Should Judicial Appointments Become More Transparent?", meta: "742 supports • 139 comments" },
        ],
        topics: ["Judiciary", "Supreme Court", "Constitution", "Academic Freedom", "NCERT"],
        trending: [
            ["Judge Cash Row", "🔥"],
            ["Judicial Vacancies", "▲"],
            ["Collegium Reform", "▲"],
            ["Pending Cases", "▲"],
        ],
    },
    "judiciary": {
        id: "judiciary",
        tags: [
            { label: "❓ Question", variant: "secondary" },
            { label: "Judiciary", variant: "secondary" },
        ],
        title: "To whom is the higher judiciary accountable?",
        subtitle: "Research and public commentary have raised questions about judicial appointments, the collegium system, and the prevalence of family connections in India's higher judiciary.",
        author: "Alok G.",
        time: "Posted 2 hours ago",
        supports: 184,
        comments: 92,
        sections: [
            {
                title: "Background",
                content: [
                    "Unlike the Legislature and Executive, which are politically accountable to voters through elections, what mechanisms ensure accountability of the Judiciary?",
                    "This discussion explores the existing accountability frameworks, their effectiveness, and potential reforms.",
                ],
            },
        ],
        aiSummary: "The community is divided on whether the current accountability mechanisms are sufficient or whether more transparent processes are needed.",
        aiCommon: ["✅ Greater transparency in appointments.", "✅ Public disclosure of case allocations."],
        aiAlt: ["• Current mechanisms are adequate.", "• Independence requires less, not more, oversight."],
        commenters: [
            { initials: "MK", bg: "bg-orange-100", textColor: "text-orange-700", name: "Meera Krishnan", time: "1 hour ago", text: "The collegium system needs urgent reform to address perceptions of nepotism.", likes: 38 },
        ],
        status: [
            ["Started", "2 days ago"],
            ["Last Activity", "1 hour ago"],
            ["Supports", "184"],
            ["Comments", "92"],
            ["Polls", "0"],
            ["Petition", "NA"],
        ],
        poll: {
            question: "Should judicial appointments be made more transparent?",
            options: [
                { label: "Yes", percent: 72, color: "bg-blue-200" },
                { label: "No", percent: 28, color: "bg-slate-300" },
            ],
            votes: "3,421",
        },
        related: [
            { title: "Should the Collegium System be Reformed?", meta: "913 supports • 214 comments" },
            { title: "Did the Supreme Court's action strike the right balance?", meta: "624 supports • 184 comments" },
        ],
        topics: ["Judiciary", "Collegium", "Accountability"],
        trending: [
            ["Judge Cash Row", "🔥"],
            ["Judicial Vacancies", "▲"],
        ],
    },
    "community-park": {
        id: "community-park",
        tags: [
            { label: "📋 Proposal", variant: "brand" },
            { label: "Ward", variant: "secondary" },
        ],
        title: "Convert the Abandoned Plot Near 5th Cross into a Community Park",
        subtitle: "The vacant municipal plot has become an informal dumping ground. This proposal suggests converting it into a low-maintenance public park.",
        author: "Alok G.",
        time: "Posted 3 hours ago",
        supports: 142,
        comments: 56,
        sections: [
            {
                title: "The Proposal",
                content: [
                    "The vacant municipal plot at 5th Cross has been an eyesore for years. This proposal recommends developing it into a public park with walking paths, native trees, children's play equipment, and seating areas for senior citizens.",
                ],
            },
        ],
        aiSummary: "The community largely supports the park proposal with suggestions for including a small dog park and community garden plots.",
        aiCommon: ["✅ Strong community support for green spaces.", "✅ Low-maintenance design is practical."],
        aiAlt: ["• Should prioritize parking instead.", "• Maintenance costs need to be addressed."],
        commenters: [
            { initials: "JD", bg: "bg-yellow-100", textColor: "text-yellow-700", name: "John D.", time: "2 hours ago", text: "A park would greatly improve the neighborhood's quality of life.", likes: 28 },
        ],
        status: [
            ["Started", "3 days ago"],
            ["Last Activity", "2 hours ago"],
            ["Supports", "142"],
            ["Comments", "56"],
            ["Polls", "1"],
            ["Petition", "NA"],
        ],
        poll: {
            question: "Do you support converting the abandoned plot into a community park?",
            options: [
                { label: "Yes", percent: 78, color: "bg-green-200" },
                { label: "No", percent: 22, color: "bg-slate-300" },
            ],
            votes: "1,502",
        },
        related: [
            { title: "How to fund community garden projects?", meta: "89 supports • 23 comments" },
            { title: "Tree plantation drive in Ward 42", meta: "210 supports • 45 comments" },
        ],
        topics: ["Urban Planning", "Environment", "Community"],
        trending: [
            ["Green Spaces", "▲"],
            ["Urban Planning", "—"],
        ],
    },
};
const tagVariantMap = {
    error: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
    secondary: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
    brand: "bg-[var(--color-brand-light)] text-[var(--color-brand)]",
};
export default function DiscussionDetailPage() {
    const { id } = useParams();
    const discussion = id ? DISCUSSIONS_DATA[id] : undefined;
    if (!discussion) {
        return (_jsx("div", { className: "flex-1 p-6 overflow-y-auto", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center py-20", children: [_jsx(MessageSquare, { size: 48, className: "mx-auto text-[var(--color-text-secondary)] mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-[var(--color-text-primary)] mb-2", children: "Discussion Not Found" }), _jsx("p", { className: "text-[var(--color-text-secondary)] mb-6", children: "The discussion you're looking for doesn't exist." }), _jsx(Link, { to: "/discussions", className: "text-[var(--color-brand)] font-semibold hover:underline", children: "\u2190 Back to Discussions" })] }) }));
    }
    return (_jsx("div", { className: "flex-1 p-8 overflow-y-auto", children: _jsxs("div", { className: "w-full", children: [_jsxs(Link, { to: "/discussions", className: "inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] mb-6 transition-colors", children: [_jsx(ArrowLeft, { size: 16 }), "Back to Discussions"] }), _jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-7 shadow-sm", children: [_jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: discussion.tags.map((tag) => (_jsx("span", { className: clsx("px-3 py-1 rounded-full text-xs font-semibold", tagVariantMap[tag.variant]), children: tag.label }, tag.label))) }), _jsx("h1", { className: "text-4xl font-bold leading-tight text-[var(--color-text-primary)]", children: discussion.title }), _jsx("p", { className: "mt-4 text-[var(--color-text-secondary)] leading-7", children: discussion.subtitle }), _jsxs("div", { className: "flex flex-wrap items-center gap-6 mt-6 text-sm text-[var(--color-text-secondary)]", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { size: 16 }), discussion.author] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { size: 16 }), discussion.time] }), _jsxs("button", { className: "flex items-center gap-2 text-[var(--color-brand)] hover:underline", children: [_jsx(Share2, { size: 16 }), "Share"] })] }), _jsx("div", { className: "border-t border-[var(--color-border)] my-6" }), _jsxs("div", { className: "flex flex-wrap gap-8 text-sm", children: [_jsxs("button", { className: "flex items-center gap-2 text-[var(--color-brand)] font-semibold", children: [_jsx(ThumbsUp, { size: 16 }), discussion.supports, " Supports"] }), _jsxs("div", { className: "flex items-center gap-2 text-[var(--color-text-secondary)]", children: [_jsx(MessageSquare, { size: 16 }), discussion.comments, " Comments"] })] })] }), _jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm p-7", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--color-text-primary)] mb-6", children: "Description" }), discussion.sections.map((section) => (_jsxs("section", { className: "mt-8 first:mt-0", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--color-text-primary)] mb-4", children: section.title }), section.content.map((p, i) => (_jsx("p", { className: "text-[var(--color-text-secondary)] leading-8 mt-4 first:mt-0", children: p }, i)))] }, section.title))), _jsxs("section", { className: "mt-8", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--color-text-primary)] mb-4", children: "Reference" }), _jsx("a", { href: "https://www.hindustantimes.com/india-news/ncert-apology-seizure-of-38-books-a-blow-by-blow-timeline-of-judicial-corruption-chapter-101772090436693.html", target: "_blank", rel: "noopener noreferrer", className: "block rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-5 hover:border-[var(--color-brand)] transition-colors", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-[var(--color-text-primary)]", children: "Hindustan Times" }), _jsx("p", { className: "text-sm text-[var(--color-text-secondary)] mt-1", children: "NCERT apology, seizure of books: A blow-by-blow timeline of the judicial corruption chapter" })] }), _jsx(ExternalLink, { size: 16, className: "text-[var(--color-text-secondary)] shrink-0" })] }) })] })] }), _jsxs("div", { className: "bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 shadow-sm p-7", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-3xl", children: "\u2728" }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--color-text-primary)]", children: "AI Community Summary" }), _jsxs("p", { className: "text-sm text-[var(--color-text-secondary)]", children: ["Generated from ", discussion.comments, " comments"] })] })] }), _jsx("span", { className: "text-xs text-[var(--color-text-secondary)]", children: "Updated 18 mins ago" })] }), _jsx("div", { className: "mt-6 text-[var(--color-text-primary)] leading-8", children: discussion.aiSummary }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6 mt-8", children: [_jsxs("div", { className: "rounded-xl bg-white border border-green-200 p-5", children: [_jsx("h3", { className: "font-bold text-green-700 mb-4", children: "Common Viewpoints" }), _jsx("ul", { className: "space-y-3 text-[var(--color-text-primary)]", children: discussion.aiCommon.map((item) => (_jsx("li", { children: item }, item))) })] }), _jsxs("div", { className: "rounded-xl bg-white border border-orange-200 p-5", children: [_jsx("h3", { className: "font-bold text-orange-700 mb-4", children: "Alternative Viewpoints" }), _jsx("ul", { className: "space-y-3 text-[var(--color-text-primary)]", children: discussion.aiAlt.map((item) => (_jsx("li", { children: item }, item))) })] })] })] }), _jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm p-7", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--color-text-primary)]", children: "Join the Discussion" }), _jsx("p", { className: "text-[var(--color-text-secondary)] mt-2", children: "Share your opinion respectfully. Support your arguments with facts whenever possible." }), _jsx("textarea", { rows: 5, placeholder: "What are your thoughts?", className: "w-full mt-5 rounded-xl border border-[var(--color-border)] p-4 resize-none bg-transparent text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]" }), _jsxs("div", { className: "flex justify-between items-center mt-5", children: [_jsxs("button", { className: "flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors", children: [_jsx(ExternalLink, { size: 16 }), "Attach Reference"] }), _jsx("button", { className: "px-6 py-3 rounded-xl bg-[var(--color-brand)] text-[var(--color-text-inverse)] font-semibold hover:opacity-90 transition-opacity", children: "Post Comment" })] })] }), _jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm p-7", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--color-text-primary)]", children: "Discussion" }), _jsxs("select", { className: "rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm bg-transparent text-[var(--color-text-primary)]", children: [_jsx("option", { children: "Top Comments" }), _jsx("option", { children: "Newest" }), _jsx("option", { children: "Oldest" })] })] }), _jsx("div", { className: "space-y-8", children: discussion.commenters.map((c) => (_jsxs("div", { className: "border-b border-[var(--color-border)] pb-8 last:border-0", children: [_jsx("div", { className: "flex justify-between", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: clsx("w-11 h-11 rounded-full flex items-center justify-center font-bold", c.bg, c.textColor), children: c.initials }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-[var(--color-text-primary)]", children: c.name }), _jsx("div", { className: "text-xs text-[var(--color-text-secondary)]", children: c.time })] })] }) }), _jsx("p", { className: "mt-5 leading-8 text-[var(--color-text-primary)]", children: c.text }), _jsxs("div", { className: "flex items-center gap-6 mt-5", children: [_jsxs("button", { className: "flex items-center gap-2 text-[var(--color-brand)]", children: [_jsx(ThumbsUp, { size: 16 }), c.likes] }), _jsx("button", { className: "text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors", children: "Reply" })] })] }, c.name))) })] })] }), _jsxs("aside", { className: "space-y-6 lg:sticky lg:top-6 h-fit", children: [_jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-5", children: [_jsx("span", { className: "text-emerald-600 text-lg", children: "\uD83D\uDCCA" }), _jsx("h3", { className: "font-bold text-lg text-[var(--color-text-primary)]", children: "Discussion Status" })] }), _jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold", children: [_jsx(MessageSquare, { size: 18 }), "Active Discussion"] }), _jsx("div", { className: "mt-6 space-y-4 text-sm", children: discussion.status.map(([label, value]) => (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--color-text-secondary)]", children: label }), _jsx("span", { className: "font-medium text-[var(--color-text-primary)]", children: value })] }, label))) })] }), _jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx("span", { className: "text-blue-600 text-lg", children: "\uD83D\uDDF3" }), _jsx("h3", { className: "font-bold text-lg text-[var(--color-text-primary)]", children: "Attached Poll" })] }), _jsx("h4", { className: "font-semibold leading-6 text-[var(--color-text-primary)]", children: discussion.poll.question }), _jsxs("div", { className: "mt-5 space-y-3", children: [discussion.poll.options.map((opt) => (_jsx("div", { className: "relative", children: _jsxs("div", { className: "h-10 rounded-lg bg-[var(--color-bg-subtle)] overflow-hidden relative", children: [_jsx("div", { className: clsx("absolute h-10 rounded-lg", opt.color), style: { width: `${opt.percent}%` } }), _jsxs("div", { className: "relative flex justify-between items-center h-10 px-4 text-sm", children: [_jsx("span", { className: "text-[var(--color-text-primary)]", children: opt.label }), _jsxs("span", { className: "font-semibold text-[var(--color-text-primary)]", children: [opt.percent, "%"] })] })] }) }, opt.label))), _jsxs("div", { className: "flex justify-between items-center mt-3 text-sm", children: [_jsxs("span", { className: "text-[var(--color-text-secondary)]", children: [discussion.poll.votes, " votes"] }), _jsx(Link, { to: "/polls", className: "font-semibold text-[var(--color-brand)] hover:underline", children: "View Poll \u2192" })] })] })] }), _jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-5", children: [_jsx("span", { className: "text-orange-600 text-lg", children: "\uD83D\uDCAC" }), _jsx("h3", { className: "font-bold text-lg text-[var(--color-text-primary)]", children: "Related Discussions" })] }), _jsx("div", { className: "space-y-4", children: discussion.related.map((r, i) => (_jsxs("div", { children: [i > 0 && _jsx("hr", { className: "border-[var(--color-border)] my-4" }), _jsxs(Link, { to: "#", className: "block hover:text-[var(--color-brand)] transition-colors", children: [_jsx("div", { className: "font-medium text-[var(--color-text-primary)]", children: r.title }), _jsx("div", { className: "text-xs text-[var(--color-text-secondary)] mt-1", children: r.meta })] })] }, r.title))) })] }), _jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx("span", { className: "text-green-600 text-lg", children: "\uD83C\uDFF7" }), _jsx("h3", { className: "font-bold text-lg text-[var(--color-text-primary)]", children: "Topics" })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: discussion.topics.map((topic) => (_jsx("span", { className: "px-3 py-1 rounded-full bg-[var(--color-bg-subtle)] text-sm text-[var(--color-text-primary)]", children: topic }, topic))) })] }), _jsxs("div", { className: "bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-5", children: [_jsx("span", { className: "text-red-600 text-lg", children: "\uD83D\uDD25" }), _jsx("h3", { className: "font-bold text-lg text-[var(--color-text-primary)]", children: "Trending in Judiciary" })] }), _jsx("div", { className: "space-y-4", children: discussion.trending.map(([label, icon]) => (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--color-text-primary)]", children: label }), _jsx("span", { className: clsx("text-sm", icon === "🔥" ? "text-red-500" : "text-orange-500"), children: icon })] }, label))) })] })] })] })] }) }));
}
