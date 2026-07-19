import { useParams, Link } from "react-router-dom";
import { ThumbsUp, MessageSquare, Share2, ArrowLeft, ExternalLink, Users } from "lucide-react";
import clsx from "clsx";

const DISCUSSIONS_DATA: Record<string, {
  id: string; tags: { label: string; variant: string }[];
  title: string; subtitle: string;
  author: string; time: string; supports: number; comments: number;
  sections: { title: string; content: string[] }[];
  aiSummary: string; aiCommon: string[]; aiAlt: string[];
  commenters: { initials: string; bg: string; textColor: string; name: string; time: string; text: string; likes: number }[];
  status: [string, string][];
  poll: { question: string; options: { label: string; percent: number; color: string }[]; votes: string };
  related: { title: string; meta: string }[];
  topics: string[];
  trending: [string, string][];
}> = {
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

const tagVariantMap: Record<string, string> = {
  error: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
  secondary: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
  brand: "bg-[var(--color-brand-light)] text-[var(--color-brand)]",
};

export default function DiscussionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const discussion = id ? DISCUSSIONS_DATA[id] : undefined;

  if (!discussion) {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto text-center py-20">
          <MessageSquare size={48} className="mx-auto text-[var(--color-text-secondary)] mb-4" />
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Discussion Not Found</h2>
          <p className="text-[var(--color-text-secondary)] mb-6">The discussion you're looking for doesn't exist.</p>
          <Link to="/discussions" className="text-[var(--color-brand)] font-semibold hover:underline">← Back to Discussions</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="w-full">
        <Link to="/discussions" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Discussions
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-7 shadow-sm">
              <div className="flex flex-wrap gap-2 mb-4">
                {discussion.tags.map((tag) => (
                  <span key={tag.label} className={clsx("px-3 py-1 rounded-full text-xs font-semibold", tagVariantMap[tag.variant])}>
                    {tag.label}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold leading-tight text-[var(--color-text-primary)]">{discussion.title}</h1>
              <p className="mt-4 text-[var(--color-text-secondary)] leading-7">{discussion.subtitle}</p>
              <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  {discussion.author}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  {discussion.time}
                </div>
                <button className="flex items-center gap-2 text-[var(--color-brand)] hover:underline">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
              <div className="border-t border-[var(--color-border)] my-6" />
              <div className="flex flex-wrap gap-8 text-sm">
                <button className="flex items-center gap-2 text-[var(--color-brand)] font-semibold">
                  <ThumbsUp size={16} />
                  {discussion.supports} Supports
                </button>
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <MessageSquare size={16} />
                  {discussion.comments} Comments
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm p-7">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Description</h2>
              {discussion.sections.map((section) => (
                <section key={section.title} className="mt-8 first:mt-0">
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">{section.title}</h3>
                  {section.content.map((p, i) => (
                    <p key={i} className="text-[var(--color-text-secondary)] leading-8 mt-4 first:mt-0">{p}</p>
                  ))}
                </section>
              ))}
              <section className="mt-8">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Reference</h3>
                <a
                  href="https://www.hindustantimes.com/india-news/ncert-apology-seizure-of-38-books-a-blow-by-blow-timeline-of-judicial-corruption-chapter-101772090436693.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-5 hover:border-[var(--color-brand)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[var(--color-text-primary)]">Hindustan Times</p>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">NCERT apology, seizure of books: A blow-by-blow timeline of the judicial corruption chapter</p>
                    </div>
                    <ExternalLink size={16} className="text-[var(--color-text-secondary)] shrink-0" />
                  </div>
                </a>
              </section>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 shadow-sm p-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✨</span>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">AI Community Summary</h2>
                    <p className="text-sm text-[var(--color-text-secondary)]">Generated from {discussion.comments} comments</p>
                  </div>
                </div>
                <span className="text-xs text-[var(--color-text-secondary)]">Updated 18 mins ago</span>
              </div>
              <div className="mt-6 text-[var(--color-text-primary)] leading-8">{discussion.aiSummary}</div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="rounded-xl bg-white border border-green-200 p-5">
                  <h3 className="font-bold text-green-700 mb-4">Common Viewpoints</h3>
                  <ul className="space-y-3 text-[var(--color-text-primary)]">
                    {discussion.aiCommon.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-white border border-orange-200 p-5">
                  <h3 className="font-bold text-orange-700 mb-4">Alternative Viewpoints</h3>
                  <ul className="space-y-3 text-[var(--color-text-primary)]">
                    {discussion.aiAlt.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm p-7">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Join the Discussion</h2>
              <p className="text-[var(--color-text-secondary)] mt-2">Share your opinion respectfully. Support your arguments with facts whenever possible.</p>
              <textarea
                rows={5}
                placeholder="What are your thoughts?"
                className="w-full mt-5 rounded-xl border border-[var(--color-border)] p-4 resize-none bg-transparent text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
              />
              <div className="flex justify-between items-center mt-5">
                <button className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
                  <ExternalLink size={16} />
                  Attach Reference
                </button>
                <button className="px-6 py-3 rounded-xl bg-[var(--color-brand)] text-[var(--color-text-inverse)] font-semibold hover:opacity-90 transition-opacity">
                  Post Comment
                </button>
              </div>
            </div>

            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm p-7">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Discussion</h2>
                <select className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm bg-transparent text-[var(--color-text-primary)]">
                  <option>Top Comments</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
              <div className="space-y-8">
                {discussion.commenters.map((c) => (
                  <div key={c.name} className="border-b border-[var(--color-border)] pb-8 last:border-0">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <div className={clsx("w-11 h-11 rounded-full flex items-center justify-center font-bold", c.bg, c.textColor)}>
                          {c.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-[var(--color-text-primary)]">{c.name}</div>
                          <div className="text-xs text-[var(--color-text-secondary)]">{c.time}</div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-5 leading-8 text-[var(--color-text-primary)]">{c.text}</p>
                    <div className="flex items-center gap-6 mt-5">
                      <button className="flex items-center gap-2 text-[var(--color-brand)]">
                        <ThumbsUp size={16} />
                        {c.likes}
                      </button>
                      <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 h-fit">
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-emerald-600 text-lg">📊</span>
                <h3 className="font-bold text-lg text-[var(--color-text-primary)]">Discussion Status</h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                <MessageSquare size={18} />
                Active Discussion
              </div>
              <div className="mt-6 space-y-4 text-sm">
                {discussion.status.map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">{label}</span>
                    <span className="font-medium text-[var(--color-text-primary)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-600 text-lg">🗳</span>
                <h3 className="font-bold text-lg text-[var(--color-text-primary)]">Attached Poll</h3>
              </div>
              <h4 className="font-semibold leading-6 text-[var(--color-text-primary)]">{discussion.poll.question}</h4>
              <div className="mt-5 space-y-3">
                {discussion.poll.options.map((opt) => (
                  <div key={opt.label} className="relative">
                    <div className="h-10 rounded-lg bg-[var(--color-bg-subtle)] overflow-hidden relative">
                      <div className={clsx("absolute h-10 rounded-lg", opt.color)} style={{ width: `${opt.percent}%` }} />
                      <div className="relative flex justify-between items-center h-10 px-4 text-sm">
                        <span className="text-[var(--color-text-primary)]">{opt.label}</span>
                        <span className="font-semibold text-[var(--color-text-primary)]">{opt.percent}%</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-3 text-sm">
                  <span className="text-[var(--color-text-secondary)]">{discussion.poll.votes} votes</span>
                  <Link to="/polls" className="font-semibold text-[var(--color-brand)] hover:underline">View Poll →</Link>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-orange-600 text-lg">💬</span>
                <h3 className="font-bold text-lg text-[var(--color-text-primary)]">Related Discussions</h3>
              </div>
              <div className="space-y-4">
                {discussion.related.map((r, i) => (
                  <div key={r.title}>
                    {i > 0 && <hr className="border-[var(--color-border)] my-4" />}
                    <Link to="#" className="block hover:text-[var(--color-brand)] transition-colors">
                      <div className="font-medium text-[var(--color-text-primary)]">{r.title}</div>
                      <div className="text-xs text-[var(--color-text-secondary)] mt-1">{r.meta}</div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-600 text-lg">🏷</span>
                <h3 className="font-bold text-lg text-[var(--color-text-primary)]">Topics</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {discussion.topics.map((topic) => (
                  <span key={topic} className="px-3 py-1 rounded-full bg-[var(--color-bg-subtle)] text-sm text-[var(--color-text-primary)]">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-red-600 text-lg">🔥</span>
                <h3 className="font-bold text-lg text-[var(--color-text-primary)]">Trending in Judiciary</h3>
              </div>
              <div className="space-y-4">
                {discussion.trending.map(([label, icon]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-[var(--color-text-primary)]">{label}</span>
                    <span className={clsx(
                      "text-sm",
                      icon === "🔥" ? "text-red-500" : "text-orange-500"
                    )}>{icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
