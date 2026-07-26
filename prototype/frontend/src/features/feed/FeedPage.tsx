import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, ThumbsUp, MessageSquare, Users, Landmark,
  Clock, CheckCircle2, User, AlertTriangle, Trash2, Droplet,
  Lightbulb, Vote, X, Share2, AlertCircle, MessageCircle, BarChart2, Flame
} from "lucide-react";
import clsx from "clsx";

const CONTENT_TYPES = ["All", "Issues", "Discussions", "Polls", "Petitions"];

// Removed hardcoded ISSUES, DISCUSSIONS, POLLS arrays

const CATEGORIES = [
  { label: "Garbage", icon: Trash2, count: 91 },
  { label: "Potholes", icon: AlertTriangle, count: 38 },
  { label: "Streetlights", icon: Lightbulb, count: 14 },
];

const TRENDING = [
  { type: "Issue", label: "Issue", location: "Ward 23", title: "Garbage Dump near Parke Serene", trend: "↑ +42 supports today", variant: "error" as const },
  { type: "Discussion", label: "Discussion", location: "India", title: "Who is Accountable for the Judiciary?", trend: "↑ +31 supports today", variant: "secondary" as const },
  { type: "Poll", label: "Poll", location: "Pune", title: "How should Pune improve public transport?", trend: "Ends in 4 days", variant: "brand" as const },
];

function IssueIcon({ category }: { category: string }) {
  if (category === "Road") return <AlertTriangle size={24} />;
  if (category === "Garbage") return <Trash2 size={24} />;
  if (category === "Water Supply") return <Droplet size={24} />;
  return <AlertTriangle size={24} />;
}

function SeverityBadge({ severity }: { severity: string }) {
  const color = severity === "Critical"
    ? "bg-[var(--color-error-bg)] text-[var(--color-error)]"
    : "bg-[var(--color-warning-bg)] text-[var(--color-warning)]";
  return (
    <span className={clsx("inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase leading-none", color)}>
      {severity}
    </span>
  );
}

function FeedFilterBar({ activeContent, setActiveContent }: { activeContent: string, setActiveContent: (val: string) => void }) {

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-2 rounded-xl">
        {CONTENT_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setActiveContent(type)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
              activeContent === type
                ? "bg-[var(--color-brand)] text-[var(--color-text-inverse)]"
                : "bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]"
            )}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

function IssueCard({ issue }: { issue: any }) {
  return (
    <Link
      to={`/issues/${issue.id}`}
      className="block bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 md:p-7 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--color-error-bg)] text-[var(--color-error)] text-[11px] font-semibold">
            <AlertCircle size={12} /> Issue
          </span>
          <span className="px-2 py-1 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] text-[11px] font-semibold">
            {issue.category}
          </span>
          <SeverityBadge severity={issue.severity} />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--color-text-secondary)]">
            <div className={clsx("w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 font-bold text-[6px]", issue.authorBg || "bg-blue-100", issue.authorColor || "text-blue-700")}>
              {issue.authorInitials || "AG"}
            </div>
            {issue.author || "Anonymous"}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[var(--color-text-secondary)]">
            <Clock size={12} />
            {issue.time}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            title="Does it affect you? if yes, then Follow"
            className="ml-1 px-3 py-1 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-surface)] text-[11px] font-bold hover:opacity-80 transition-opacity"
          >
            Follow
          </button>
        </div>
      </div>

      {/* Body */}
      <h3 className="font-bold text-xl text-[var(--color-text-primary)] leading-snug mb-3">
        {issue.title}
      </h3>
      <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-[var(--color-text-secondary)]">
        <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--color-bg-subtle)]">
          <MapPin size={14} />
          <span className="text-xs">{issue.location} ({issue.distance})</span>
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--color-bg-subtle)]">
          <Landmark size={14} />
          <span className="text-xs">{issue.govLevel}</span>
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--color-border)]/50">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5 text-[var(--color-brand)]">
            <ThumbsUp size={16} />
            <span className="font-semibold">{issue.supports}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
            <MessageSquare size={16} />
            <span>{issue.comments}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
            <Share2 size={16} />
            <span className="hidden sm:inline">Share</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)]">
          <Users size={14} />
          <span>{issue.affected} Affected</span>
        </div>
      </div>
    </Link>
  );
}

function DiscussionCard({ discussion }: { discussion: any }) {
  const variantMap: Record<string, string> = {
    brand: "bg-[var(--color-brand-light)] text-[var(--color-brand)]",
    secondary: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
    error: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
  };

  return (
    <Link
      to={`/discussions/${discussion.id}`}
      className="block bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 md:p-7 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-[11px] font-semibold">
            <MessageCircle size={12} /> Discussion
          </span>
          {discussion.tags.map((tag, i) => (
            <span
              key={tag}
              className={clsx(
                "px-2 py-1 rounded-full text-[11px] font-semibold",
                variantMap[discussion.tagVariant[i]] || "bg-[var(--color-bg-subtle)]"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--color-text-secondary)]">
            <div className={clsx("w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 font-bold text-[6px]", discussion.authorBg || "bg-blue-100", discussion.authorColor || "text-blue-700")}>
              {discussion.authorInitials || "AG"}
            </div>
            {discussion.author || "Anonymous"}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[var(--color-text-secondary)]">
            <Clock size={12} />
            {discussion.time}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            title="Does it affect you? if yes, then Follow"
            className="ml-1 px-3 py-1 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-surface)] text-[11px] font-bold hover:opacity-80 transition-opacity"
          >
            Follow
          </button>
        </div>
      </div>

      {/* Body */}
      <h3 className="font-bold text-xl text-[var(--color-text-primary)] leading-snug">
        {discussion.title}
      </h3>
      <p className="text-[var(--color-text-secondary)] mt-3 line-clamp-3 text-sm">
        {discussion.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--color-border)]/50">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5 text-[var(--color-brand)]">
            <ThumbsUp size={16} />
            <span className="font-semibold">{discussion.supports}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
            <MessageSquare size={16} />
            <span>{discussion.comments}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
            <Share2 size={16} />
            <span className="hidden sm:inline">Share</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-500">
          <Flame size={14} />
          <span>{discussion.participantCount.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  );
}

function PollCard({ poll }: { poll: any }) {
  return (
    <Link
      to={`/polls/${poll.id}`}
      className="block bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 md:p-7 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-[11px] font-semibold">
            <BarChart2 size={12} /> Poll
          </span>
          <span className="px-2 py-1 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] text-[11px] font-semibold">
            🏛 Ward
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--color-text-secondary)]">
            <div className={clsx("w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 font-bold text-[6px]", poll.authorBg || "bg-blue-100", poll.authorColor || "text-blue-700")}>
              {poll.authorInitials || "AG"}
            </div>
            {poll.author || "Anonymous"}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[var(--color-text-secondary)]">
            <Clock size={12} />
            {poll.time}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            title="Does it affect you? if yes, then Follow"
            className="ml-1 px-3 py-1 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-surface)] text-[11px] font-bold hover:opacity-80 transition-opacity"
          >
            Follow
          </button>
        </div>
      </div>

      {/* Body */}
      <h3 className="font-bold text-xl text-[var(--color-text-primary)] leading-snug">
        {poll.question}
      </h3>
      <p className="text-[var(--color-text-secondary)] mt-3 line-clamp-3 text-sm mb-4">
        {poll.description}
      </p>

      <div className="space-y-3">
        {poll.options.map((opt) => (
          <div key={opt.label} className="relative">
            <div className="w-full h-11 rounded-lg bg-[var(--color-bg-subtle)] overflow-hidden relative">
              <div
                className={clsx(
                  "absolute left-0 top-0 h-full rounded-lg",
                  opt.primary ? "bg-[var(--color-brand)]/15" : "bg-[var(--color-text-primary)]/5"
                )}
                style={{ width: `${opt.percent}%` }}
              />
              <div className="relative flex items-center justify-between h-full px-4 text-sm">
                <span className="font-medium text-[var(--color-text-primary)]">{opt.label}</span>
                <span className={clsx("font-semibold", opt.primary && "text-[var(--color-brand)]")}>
                  {opt.percent}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--color-border)]/50">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5 text-[var(--color-brand)]">
            <Vote size={16} />
            <span className="font-semibold">{poll.votes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
            <MessageSquare size={16} />
            <span>{poll.comments}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
            <Share2 size={16} />
            <span className="hidden sm:inline">Share</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function TrendCard({ item }: { item: typeof TRENDING[number] }) {
  const badgeColors: Record<string, string> = {
    error: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
    secondary: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
    brand: "bg-[var(--color-brand-light)] text-[var(--color-brand)]",
  };

  return (
    <Link to="#" className="block rounded-lg p-3 hover:bg-[var(--color-bg-subtle)] transition">
      <div className="flex items-center gap-2 mb-1">
        <span className={clsx("px-2 py-0.5 rounded-full text-[10px] font-semibold", badgeColors[item.variant])}>
          {item.label}
        </span>
        <span className="text-xs text-[var(--color-text-secondary)]">📍 {item.location}</span>
      </div>
      <p className="font-semibold text-sm text-[var(--color-text-primary)] leading-snug">{item.title}</p>
      <p className="text-xs text-[var(--color-brand)] mt-1">{item.trend}</p>
    </Link>
  );
}

export default function FeedPage() {
  const [activeContent, setActiveContent] = useState("All");
  const [isBannerHidden, setIsBannerHidden] = useState(false);
  const [issues, setIssues] = useState<any[]>([]);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [polls, setPolls] = useState<any[]>([]);

  useEffect(() => {
    // Fetch issues
    fetch("http://localhost:8081/djp/api/v1/issues")
      .then(res => res.json())
      .then(data => {
        setIssues(data.map((item: any) => {
          let meta = {};
          if (item.metadata) {
             try { meta = JSON.parse(item.metadata); } catch(e) {}
          }
          return {
            ...meta,
            id: item.id,
            title: item.title,
            category: item.category,
            severity: item.priority === 'CRITICAL' ? 'Critical' : 'High', // Mapping from priority
            location: item.location || "Unknown Location",
            time: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently",
            status: item.status || "Open",
            supports: item.supportsCount || 0,
            comments: item.commentsCount || 0,
          };
        }));
      })
      .catch(console.error);

    // Fetch discussions
    fetch("http://localhost:8081/djp/api/v1/discussions")
      .then(res => res.json())
      .then(data => {
        setDiscussions(data.map((item: any) => {
          let meta = {};
          if (item.metadata) {
             try { meta = JSON.parse(item.metadata); } catch(e) {}
          }
          return {
            ...meta,
            id: item.id,
            title: item.title,
            description: item.description,
            time: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently",
            supports: item.votesCount || 0,
            participantCount: item.participantCount || 0,
            comments: item.commentsCount || 0,
            tags: (meta as any).tags || ["General"],
            tagVariant: (meta as any).tagVariant || ["secondary"],
            participants: (meta as any).participants || [],
            author: (meta as any).author || "Anonymous"
          };
        }));
      })
      .catch(console.error);

    // Fetch polls
    fetch("http://localhost:8081/djp/api/v1/polls")
      .then(res => res.json())
      .then(data => {
        setPolls(data.map((item: any) => {
          let meta = {};
          if (item.metadata) {
             try { meta = JSON.parse(item.metadata); } catch(e) {}
          }
          let options = [];
          if (item.optionsJson) {
             try { options = JSON.parse(item.optionsJson); } catch(e) {}
          }
          return {
            ...meta,
            id: item.id,
            question: item.question,
            description: item.description,
            options: options,
            time: item.expiresAt ? "Ends " + new Date(item.expiresAt).toLocaleDateString() : "Ongoing",
            votes: item.votesCount || 0,
            comments: item.commentsCount || 0,
            author: (meta as any).author || "Anonymous"
          };
        }));
      })
      .catch(console.error);

    if (sessionStorage.getItem("djp_hide_completion_banner") === "true") {
      setIsBannerHidden(true);
    }
  }, []);

  const handleDismissBanner = () => {
    setIsBannerHidden(true);
    sessionStorage.setItem("djp_hide_completion_banner", "true");
  };

  const userStr = localStorage.getItem("djp_user");
  const user = userStr ? JSON.parse(userStr) : null;
  
  let completion = 100;
  if (user) {
    const fields = [
      'fullName', 'email', 'dob', 'gender', 'phoneNumber',
      'location', 'country', 'state', 'city',
      'ward', 'occupation', 'bio', 'topics'
    ];
    let filled = 0;
    fields.forEach(f => {
      if (user[f] && String(user[f]).trim() !== "" && String(user[f]) !== "null") filled++;
    });
    completion = Math.round((filled / fields.length) * 100);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-8 w-full">
        {user && completion < 100 && !isBannerHidden && (
          <div className="bg-[var(--color-brand-light)] border border-[var(--color-brand)] rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm relative pr-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow text-[var(--color-brand)]">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--color-brand)]">Complete your Civic Profile</h3>
                <p className="text-xs text-[var(--color-brand)] mt-1">
                  You are at {completion}% completion. Unlock full participation by finishing your profile.
                </p>
              </div>
            </div>
            <Link to="/profile" className="bg-[var(--color-brand)] text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:shadow-lg transition">
              Complete Now
            </Link>
            <button 
              onClick={handleDismissBanner}
              className="absolute top-2 right-2 text-[var(--color-brand)] hover:text-black transition-colors"
              aria-label="Dismiss banner"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden px-8 pb-8 w-full">
        <div className="flex-1 overflow-y-auto min-w-0">
          <FeedFilterBar activeContent={activeContent} setActiveContent={setActiveContent} />
          <div className="space-y-6 pb-32">
            {(activeContent === "All" || activeContent === "Issues") && issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
            {(activeContent === "All" || activeContent === "Discussions") && discussions.map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
            {(activeContent === "All" || activeContent === "Polls") && polls.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        </div>

        <div className="w-80 shrink-0 overflow-y-auto space-y-5 hidden lg:block">
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h5 className="text-xs font-black uppercase tracking-widest text-[var(--color-text-secondary)]">
                  📍 Your Area
                </h5>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">Balewadi • Ward 23</p>
              </div>
              <button className="text-[var(--color-brand)] text-sm font-semibold hover:underline">Explore</button>
            </div>

            <div className="bg-[var(--color-bg-subtle)] rounded-xl p-4 mb-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-[var(--color-text-secondary)]">Active Issues</p>
              <p className="text-4xl font-black text-[var(--color-brand)] mt-1">124</p>
            </div>

            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-3 hover:bg-[var(--color-bg-subtle)] transition"
                >
                  <div className="flex items-center gap-3">
                    <cat.icon size={18} className="text-[var(--color-brand)]" />
                    <span className="font-medium text-sm text-[var(--color-text-primary)]">{cat.label}</span>
                  </div>
                  <span className="font-bold text-[var(--color-brand)]">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xs font-black uppercase tracking-widest text-[var(--color-text-secondary)]">
                🔥 Trending
              </h5>
              <button className="text-[var(--color-brand)] text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="space-y-1">
              {TRENDING.map((item) => (
                <TrendCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
