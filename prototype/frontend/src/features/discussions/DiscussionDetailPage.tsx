import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ThumbsUp, MessageSquare, Share2, ArrowLeft, ExternalLink, Users, ArrowBigUp, ArrowBigDown, Plus, Search } from "lucide-react";
import clsx from "clsx";

type CommentData = {
  id: string;
  initials: string;
  bg: string;
  textColor: string;
  name: string;
  time: string;
  text: string;
  score: number;
  replies?: CommentData[];
};

const DISCUSSIONS_DATA: Record<string, {
  id: string; tags: { label: string; variant: string }[];
  title: string; subtitle: string;
  author: string; time: string; supports: number; commentsCount: number;
  sections: { title: string; content: string[] }[];
  aiSummary: string; aiCommon: string[]; aiAlt: string[];
  comments: CommentData[];
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
    commentsCount: 184,
    sections: [
      {
        title: "Background",
        content: [
          "A chapter discussing allegations of judicial corruption written by Professor Michel Danino and other contributors for NCERT became the subject of legal proceedings, resulting in judicial directions that ultimately prevented its publication and circulation.",
          "Supporters argue that educational material making serious allegations against constitutional institutions should satisfy a very high standard of factual accuracy before being introduced into school curriculum.",
          "Critics contend that restricting such material raises broader concerns regarding academic freedom, open debate and the ability of educational institutions to critically examine constitutional bodies.",
        ],
      },
    ],
    aiSummary: "Most participants agree that educational institutions should be free to discuss constitutional institutions, including the judiciary, provided discussions are supported by credible evidence. At the same time, many participants believe the judiciary has a legitimate interest in preventing inaccurate or misleading educational material from becoming part of school curricula.",
    aiCommon: [
      "✅ Academic criticism should remain protected.",
      "✅ Constitutional institutions should be open to scholarly examination.",
      "✅ Public confidence improves through transparency.",
    ],
    aiAlt: [
      "• School textbooks should avoid politically sensitive topics.",
      "• Judicial reputation deserves stronger institutional protection.",
    ],
    comments: [
      {
        id: "c1", initials: "RS", bg: "bg-blue-100", textColor: "text-blue-700", name: "Rahul Sharma", time: "2 hours ago", text: "Academic freedom loses its meaning if constitutional institutions become immune from criticism. If there are factual inaccuracies, they should be corrected transparently instead of preventing discussion altogether.", score: 47,
        replies: [
          {
            id: "c1a", initials: "SJ", bg: "bg-red-100", textColor: "text-red-700", name: "Sanjay J.", time: "1 hour ago", text: "I agree, but we also have to be careful with how students interpret such complex legal battles. A textbook might oversimplify things.", score: 15,
            replies: [
              {
                id: "c1a1", initials: "RS", bg: "bg-blue-100", textColor: "text-blue-700", name: "Rahul Sharma", time: "45 mins ago", text: "That's exactly why teachers need to provide context, rather than hiding the information.", score: 21
              }
            ]
          }
        ]
      },
      { id: "c2", initials: "NP", bg: "bg-green-100", textColor: "text-green-700", name: "Neha Patel", time: "4 hours ago", text: "Textbooks influence millions of students. I believe educational content should undergo rigorous verification before discussing serious allegations against constitutional offices.", score: 31 },
      { id: "c3", initials: "AK", bg: "bg-purple-100", textColor: "text-purple-700", name: "Amit Kumar", time: "Yesterday", text: "Instead of debating one judgment, perhaps India needs a clearer institutional framework for judicial accountability that preserves both independence and transparency.", score: 62 },
    ],
    status: [
      ["Started", "5 days ago"],
      ["Last Activity", "12 mins ago"],
      ["Supports", "624"],
      ["Comments", "184"],
    ],
    poll: {
      question: "Should educational books be allowed to critically discuss allegations involving constitutional institutions?",
      options: [
        { label: "Yes", percent: 46, color: "bg-blue-200" },
        { label: "No", percent: 34, color: "bg-slate-300" },
      ],
      votes: "8,241",
    },
    related: [
      { title: "Should the Collegium System be Reformed?", meta: "913 supports • 214 comments" },
    ],
    topics: ["Judiciary", "Supreme Court", "NCERT"],
    trending: [
      ["Judge Cash Row", "🔥"],
      ["Collegium Reform", "▲"],
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
    commentsCount: 92,
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
    comments: [
      {
        id: "c1", initials: "MK", bg: "bg-orange-100", textColor: "text-orange-700", name: "Meera Krishnan", time: "1 hour ago", text: "The collegium system needs urgent reform to address perceptions of nepotism. Currently it operates in a black box.", score: 85,
        replies: [
          {
            id: "c1a", initials: "VD", bg: "bg-slate-100", textColor: "text-slate-700", name: "Vikram Das", time: "45 mins ago", text: "So you appreciate the recent amendment bill proposed in the parliament?", score: 35,
            replies: [
              {
                id: "c1a1", initials: "MK", bg: "bg-orange-100", textColor: "text-orange-700", name: "Meera Krishnan", time: "30 mins ago", text: "If it brings data transparency and logical criteria for elevations, then yes.", score: 21,
              }
            ]
          }
        ]
      },
      { id: "c2", initials: "AM", bg: "bg-teal-100", textColor: "text-teal-700", name: "Anil M.", time: "20 mins ago", text: "We need an independent commission, NJAC was struck down but the idea wasn't entirely wrong. It just needed better checks and balances.", score: 42 }
    ],
    status: [
      ["Started", "2 days ago"],
      ["Last Activity", "1 hour ago"],
      ["Supports", "184"],
      ["Comments", "92"],
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
    ],
    topics: ["Judiciary", "Collegium", "Accountability"],
    trending: [
      ["Judge Cash Row", "🔥"],
    ],
  },
};

const tagVariantMap: Record<string, string> = {
  error: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
  secondary: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
  brand: "bg-[var(--color-brand-light)] text-[var(--color-brand)]",
};

function CommentInput() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="mb-6">
      {isExpanded ? (
        <div className="border border-[var(--color-brand)] rounded-xl overflow-hidden bg-[var(--color-bg-surface)] shadow-sm focus-within:ring-1 focus-within:ring-[var(--color-brand)]">
          <textarea 
            autoFocus
            placeholder="What are your thoughts?" 
            className="w-full p-4 bg-transparent resize-none text-[var(--color-text-primary)] outline-none min-h-[120px]"
          />
          <div className="flex justify-between items-center bg-[var(--color-bg-subtle)] px-4 py-2 border-t border-[var(--color-border)]">
            <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors"><ExternalLink size={18} /></button>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsExpanded(false)} 
                className="px-4 py-1.5 rounded-full text-sm font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-1.5 rounded-full text-sm font-semibold bg-[var(--color-brand)] text-[var(--color-text-inverse)] hover:opacity-90 transition-opacity">
                Comment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-3 border border-[var(--color-border)] rounded-full px-4 py-3 bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-subtle)] transition-colors cursor-text"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
            U
          </div>
          <span className="text-[var(--color-text-secondary)] text-sm">Join the conversation</span>
        </div>
      )}
    </div>
  );
}

function CommentThread({ comment }: { comment: CommentData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex gap-2 mt-4 text-sm">
      {/* Thread column */}
      <div className="flex flex-col items-center">
        <div className="relative">
          {isCollapsed ? (
             <button onClick={() => setIsCollapsed(false)} className="w-8 h-8 flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] rounded-full transition-colors">
               <Plus size={16} />
             </button>
          ) : (
            <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 cursor-pointer hover:opacity-80 transition-opacity", comment.bg, comment.textColor)} onClick={() => setIsCollapsed(true)}>
              {comment.initials}
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div 
            className="w-[2px] bg-[var(--color-border)] grow mt-2 mb-1 cursor-pointer hover:bg-[var(--color-brand)] transition-colors"
            onClick={() => setIsCollapsed(true)}
          />
        )}
      </div>

      {/* Content column */}
      <div className="flex-1 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-[var(--color-text-primary)] text-xs">{comment.name}</span>
          <span className="text-[var(--color-text-secondary)] text-xs">• {comment.time}</span>
        </div>
        
        {!isCollapsed && (
           <>
             <p className="text-[var(--color-text-primary)] mb-2 leading-relaxed">{comment.text}</p>
             <div className="flex flex-wrap items-center gap-1 -ml-2 text-[var(--color-text-secondary)] font-semibold text-xs">
                <div className="flex items-center rounded-full bg-[var(--color-bg-subtle)] ml-2">
                  <button className="p-1.5 hover:bg-[var(--color-border)] hover:text-orange-500 rounded-l-full transition-colors"><ArrowBigUp size={16} /></button>
                  <span className="px-1 text-[var(--color-text-primary)]">{comment.score}</span>
                  <button className="p-1.5 hover:bg-[var(--color-border)] hover:text-blue-500 rounded-r-full transition-colors"><ArrowBigDown size={16} /></button>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-[var(--color-bg-subtle)] rounded-full transition-colors">
                  <MessageSquare size={16} /> Reply
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-[var(--color-bg-subtle)] rounded-full transition-colors">
                  <Share2 size={16} /> Share
                </button>
             </div>
             
             {/* Nested replies */}
             {comment.replies && comment.replies.length > 0 && (
               <div className="mt-2">
                 {comment.replies.map(reply => (
                   <CommentThread key={reply.id} comment={reply} />
                 ))}
               </div>
             )}
           </>
        )}
      </div>
    </div>
  );
}

export default function DiscussionDetailPage() {
  const { id } = useParams<{ id: string }>();
  // default to judiciary if not found for the prototype
  const discussion = id && DISCUSSIONS_DATA[id] ? DISCUSSIONS_DATA[id] : DISCUSSIONS_DATA["judiciary"];

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <Link to="/discussions" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Discussions
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {/* Unified Post Container */}
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
              {/* Main Post Area */}
              <div className="p-4 sm:p-5">
                {/* Author Metadata */}
                <div className="flex items-center gap-2 mb-3 text-xs text-[var(--color-text-secondary)]">
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                    {discussion.author.charAt(0)}
                  </div>
                  <span className="font-semibold text-[var(--color-text-primary)] hover:underline cursor-pointer">{discussion.author}</span>
                  <span>•</span>
                  <span>{discussion.time}</span>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-bold leading-snug text-[var(--color-text-primary)] mb-2">{discussion.title}</h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {discussion.tags.map((tag) => (
                    <span key={tag.label} className={clsx("px-2.5 py-0.5 rounded-full text-xs font-semibold", tagVariantMap[tag.variant])}>
                      {tag.label}
                    </span>
                  ))}
                </div>
                
                {/* Content */}
                <div className="text-[var(--color-text-primary)] text-sm leading-relaxed space-y-4 mb-4">
                  <p>{discussion.subtitle}</p>
                  {discussion.sections.map((section) => (
                    <div key={section.title}>
                      <h3 className="font-semibold mb-1">{section.title}</h3>
                      {section.content.map((p, i) => (
                        <p key={i} className="mb-2 last:mb-0">{p}</p>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Bottom Action Bar */}
                <div className="flex items-center gap-2 mt-2 pt-2">
                   <div className="flex items-center rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] font-semibold text-xs border border-[var(--color-border)]">
                    <button className="p-1.5 px-2 hover:bg-[var(--color-bg-muted)] hover:text-orange-500 rounded-l-full transition-colors"><ArrowBigUp size={18} /></button>
                    <span className="px-1">{discussion.supports}</span>
                    <button className="p-1.5 px-2 hover:bg-[var(--color-bg-muted)] hover:text-blue-500 rounded-r-full transition-colors"><ArrowBigDown size={18} /></button>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] font-semibold text-xs transition-colors border border-[var(--color-border)]">
                    <MessageSquare size={16} />
                    {discussion.commentsCount}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] font-semibold text-xs transition-colors border border-[var(--color-border)]">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>

              {/* Reddit-style comments section */}
              <div className="px-4 sm:px-5 pb-5">
                <CommentInput />
                
                {/* Comments Header (Sort & Search) */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[var(--color-text-secondary)] text-sm">Sort by:</span>
                      <select className="font-bold text-[var(--color-text-primary)] bg-transparent focus:outline-none cursor-pointer">
                        <option>Best</option>
                        <option>Newest</option>
                        <option>Oldest</option>
                      </select>
                    </div>
                    <div className="relative w-full max-w-xs hidden sm:block">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                      <input 
                        type="text" 
                        placeholder="Search Comments" 
                        className="w-full pl-9 pr-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)]" 
                      />
                    </div>
                  </div>
                  <hr className="border-[var(--color-border)]" />
                </div>
                
                {/* Threaded Comments List */}
                <div className="space-y-4">
                  {discussion.comments.map((comment) => (
                    <CommentThread key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-6 h-fit">
            {/* AI Summary Widget */}
            <div className="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
              <div className="bg-orange-50 dark:bg-orange-950/20 px-4 py-3 border-b border-orange-100 dark:border-orange-900/30 flex items-center gap-2">
                <span className="text-lg">✨</span>
                <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">AI Summary</h3>
              </div>
              <div className="p-4">
                <div className="text-[var(--color-text-primary)] text-sm leading-relaxed mb-4">{discussion.aiSummary}</div>
                <div className="space-y-3">
                  <div className="rounded-lg bg-[var(--color-bg-subtle)] p-3">
                    <h4 className="font-bold text-xs text-[var(--color-text-primary)] mb-2 uppercase tracking-wider">Common Viewpoints</h4>
                    <ul className="space-y-2 text-sm text-[var(--color-text-primary)]">
                      {discussion.aiCommon.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
                <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">Attached Poll</h3>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-sm leading-relaxed text-[var(--color-text-primary)]">{discussion.poll.question}</h4>
                <div className="mt-4 space-y-3">
                  {discussion.poll.options.map((opt) => (
                    <div key={opt.label} className="relative">
                      <div className="h-8 rounded-lg bg-[var(--color-bg-subtle)] overflow-hidden relative">
                        <div className={clsx("absolute h-8 rounded-lg", opt.color)} style={{ width: `${opt.percent}%` }} />
                        <div className="relative flex justify-between items-center h-8 px-3 text-xs">
                          <span className="text-[var(--color-text-primary)]">{opt.label}</span>
                          <span className="font-semibold text-[var(--color-text-primary)]">{opt.percent}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
                <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">Topics</h3>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {discussion.topics.map((topic) => (
                  <span key={topic} className="px-3 py-1 rounded-full bg-[var(--color-bg-subtle)] text-xs font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-border)] cursor-pointer transition-colors">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
