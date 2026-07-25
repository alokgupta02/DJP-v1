import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, ThumbsUp, MessageSquare, Users, Landmark,
  Clock, CheckCircle2, User, AlertTriangle, Trash2, Droplet,
  Lightbulb, Vote, X
} from "lucide-react";
import clsx from "clsx";

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
    tagVariant: ["brand", "secondary"] as const,
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
    tagVariant: ["brand", "secondary"] as const,
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
    tagVariant: ["error", "secondary", "brand"] as const,
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

function FeedFilterBar() {
  const [activeContent, setActiveContent] = useState("All");

  return (
    <div className="mb-6">
      <div className="inline-flex flex-wrap items-center gap-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-2 rounded-xl">
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

function IssueCard({ issue }: { issue: typeof ISSUES[number] }) {
  return (
    <Link
      to={`/issues/${issue.id}`}
      className="block bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 md:p-7 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300"
    >
      <div className="flex gap-5">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-[var(--color-brand-light)] flex items-center justify-center text-[var(--color-brand)]">
                <IssueIcon category={issue.category} />
              </div>
              {issue.verified && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-brand)]">
                      {issue.category}
                    </span>
                    <SeverityBadge severity={issue.severity} />
                  </div>
                  <h3 className="font-bold text-lg text-[var(--color-text-primary)] leading-snug">
                    {issue.title}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  {issue.location}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  {issue.distance}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {issue.time}
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={16} className="text-[var(--color-success)]" />
                  {issue.status}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-2 text-sm">
                <div className="flex items-center gap-1.5 text-[var(--color-brand)]">
                  <ThumbsUp size={16} />
                  <span className="font-semibold">{issue.supports}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                  <MessageSquare size={16} />
                  {issue.comments}
                </div>
                <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                  <Users size={16} />
                  {issue.affected}
                </div>
                <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                  <Landmark size={16} />
                  {issue.govLevel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function DiscussionCard({ discussion }: { discussion: typeof DISCUSSIONS[number] }) {
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
      <div className="flex items-center gap-2 mb-3">
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

      <h3 className="font-bold text-xl text-[var(--color-text-primary)] leading-snug">
        {discussion.title}
      </h3>

      <p className="text-[var(--color-text-secondary)] mt-3 line-clamp-3 text-sm">
        {discussion.description}
      </p>

      <div className="flex items-center gap-4 mt-4 text-sm text-[var(--color-text-secondary)]">
        <div className="flex items-center gap-1">
          <User size={16} />
          {discussion.author}
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          {discussion.time}
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {discussion.participants.map((p) => (
              <div
                key={p}
                className="w-8 h-8 rounded-full border-2 border-white bg-[var(--color-bg-subtle)] flex items-center justify-center text-[10px] font-bold text-[var(--color-text-primary)]"
              >
                {p}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[var(--color-bg-muted)] flex items-center justify-center text-[10px] font-bold text-[var(--color-text-secondary)]">
              +{discussion.participantCount}
            </div>
          </div>
          <span className="text-sm text-[var(--color-text-secondary)]">discussing</span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5 text-[var(--color-brand)]">
            <ThumbsUp size={16} />
            <span className="font-semibold">{discussion.supports}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
            <MessageSquare size={16} />
            {discussion.comments}
          </div>
        </div>
      </div>
    </Link>
  );
}

function PollCard({ poll }: { poll: typeof POLLS[number] }) {
  return (
    <Link
      to={`/polls/${poll.id}`}
      className="block bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 md:p-7 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-1 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-[11px] font-semibold">
          📊 Poll
        </span>
        <span className="px-2 py-1 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] text-[11px] font-semibold">
          🏛 Ward
        </span>
      </div>

      <h3 className="font-bold text-xl text-[var(--color-text-primary)] leading-snug">
        {poll.question}
      </h3>

      <p className="text-[var(--color-text-secondary)] mt-3 line-clamp-3 text-sm">
        {poll.description}
      </p>

      <div className="mt-5 space-y-3">
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

      <div className="flex items-center gap-4 mt-5 text-sm text-[var(--color-text-secondary)]">
        <div className="flex items-center gap-1">
          <User size={16} />
          {poll.author}
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          {poll.time}
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5 text-[var(--color-brand)]">
            <Vote size={16} />
            <span className="font-semibold">{poll.votes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
            <MessageSquare size={16} />
            {poll.comments}
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
  const [isBannerHidden, setIsBannerHidden] = useState(false);

  useEffect(() => {
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
        <FeedFilterBar />
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden px-8 pb-8 w-full">
        <div className="flex-1 overflow-y-auto min-w-0">
          <div className="space-y-6 pb-32">
            {ISSUES.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
            {DISCUSSIONS.map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
            {POLLS.map((poll) => (
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
