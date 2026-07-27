import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ThumbsUp, MessageSquare, Users,
  AlertTriangle, Trash2,
  Lightbulb, Vote, X, Share2, Flame
} from "lucide-react";
import clsx from "clsx";
import { toggleFollow } from "../interactions/interactionsApi";
import type { FeedIssue, FeedDiscussion, FeedPoll, FeedPollOption } from "./feedTypes";

// Haversine distance helper
function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}

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

function SeverityBadge({ severity }: { severity: string }) {
  const s = severity?.toLowerCase() || "";
  let color = "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]";
  if (s === "critical") color = "bg-[var(--color-error-bg)] text-[var(--color-error)]";
  else if (s === "high" || s === "urgent") color = "bg-orange-100 text-orange-700";
  else if (s === "medium") color = "bg-yellow-100 text-yellow-700";
  else if (s === "low") color = "bg-green-100 text-green-700";
  return (
    <span className={clsx("inline-flex items-center justify-center px-2 py-1 rounded-full text-[10px] font-bold uppercase leading-none tracking-wider", color)}>
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

function IssueCard({ issue }: { issue: FeedIssue }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!issue.id) return;
    try {
      await toggleFollow(issue.id, "ISSUE");
      setIsFollowing(!isFollowing);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Link
      to={`/issues/${issue.id}`}
      className="block bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5 md:p-6 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300"
    >
      {/* Header (Metadata Line) */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-[var(--color-text-secondary)]">
          <div className={clsx("w-4 h-4 rounded-full flex items-center justify-center shrink-0 font-bold text-[7px]", issue.authorBg || "bg-blue-100", issue.authorColor || "text-blue-700")}>
            {issue.authorInitials || "AG"}
          </div>
          <span className="text-[var(--color-text-primary)]">{issue.author || "Anonymous"}</span>
          <span className="opacity-50">•</span>
          <span>{issue.time}</span>
          <span className="opacity-50">•</span>
          <span>📍 {issue.location} {issue.distance ? `(${issue.distance})` : ""}</span>
        </div>
        <button
          onClick={handleFollow}
          title="Does it affect you? if yes, then Follow"
          className="shrink-0 ml-1 px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-bg-subtle)] text-[11px] font-bold transition-colors"
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>

      {/* Body */}
      <h3 className="font-bold text-lg md:text-xl text-[var(--color-text-primary)] leading-snug mb-2">
        {issue.title}
      </h3>
      
      {/* Post Flairs */}
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]">
          🗑️ {issue.category}
        </span>
        <SeverityBadge severity={issue.severity || "Medium"} />
        {issue.govLevel && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]">
            🏛️ {issue.govLevel}
          </span>
        )}
      </div>

      {/* Footer (Pill Actions) */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[var(--color-border)]/40 text-xs font-semibold">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors text-[var(--color-text-primary)]">
          <ThumbsUp size={14} className="text-[var(--color-brand)]" />
          <span>{issue.supports}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors text-[var(--color-text-primary)]">
          <MessageSquare size={14} />
          <span>{issue.comments}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors text-[var(--color-text-primary)] hidden sm:flex">
          <Share2 size={14} />
          <span>Share</span>
        </div>
        
        <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]">
          <Users size={14} />
          <span>{issue.affected || 0} Affected</span>
        </div>
      </div>
    </Link>
  );
}

function DiscussionCard({ discussion }: { discussion: FeedDiscussion }) {
  const variantMap: Record<string, string> = {
    brand: "bg-[var(--color-brand-light)] text-[var(--color-brand)]",
    secondary: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
    error: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
  };
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!discussion.id) return;
    try {
      await toggleFollow(discussion.id, "DISCUSSION");
      setIsFollowing(!isFollowing);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Link
      to={`/discussions/${discussion.id}`}
      className="block bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5 md:p-6 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-[var(--color-text-secondary)]">
          <div className={clsx("w-4 h-4 rounded-full flex items-center justify-center shrink-0 font-bold text-[7px]", discussion.authorBg || "bg-blue-100", discussion.authorColor || "text-blue-700")}>
            {discussion.authorInitials || "AG"}
          </div>
          <span className="text-[var(--color-text-primary)]">{discussion.author || "Anonymous"}</span>
          <span className="opacity-50">•</span>
          <span>{discussion.time}</span>
          <span className="opacity-50">•</span>
          <span>📍 {discussion.location || "Unknown"} {discussion.distance ? `(${discussion.distance})` : ""}</span>
        </div>
        <button
          onClick={handleFollow}
          title="Does it affect you? if yes, then Follow"
          className="shrink-0 ml-1 px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-bg-subtle)] text-[11px] font-bold transition-colors"
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>

      {/* Body */}
      <h3 className="font-bold text-lg md:text-xl text-[var(--color-text-primary)] leading-snug">
        {discussion.title}
      </h3>
      
      {/* Post Flairs */}
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-700">
          💬 Discussion
        </span>
        {discussion.tags?.map((tag: string, i: number) => (
          <span
            key={tag}
            className={clsx(
              "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide",
              variantMap[discussion.tagVariant?.[i]] || "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]"
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-[var(--color-text-secondary)] mt-3 line-clamp-3 text-sm">
        {discussion.description}
      </p>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[var(--color-border)]/40 text-xs font-semibold">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors text-[var(--color-text-primary)]">
          <ThumbsUp size={14} className="text-[var(--color-brand)]" />
          <span>{discussion.supports}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors text-[var(--color-text-primary)]">
          <MessageSquare size={14} />
          <span>{discussion.comments}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors text-[var(--color-text-primary)] hidden sm:flex">
          <Share2 size={14} />
          <span>Share</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]">
          <Flame size={14} className="text-orange-500" />
          <span>{discussion.participantCount?.toLocaleString() || 0} Participating</span>
        </div>
      </div>
    </Link>
  );
}

function PollCard({ poll }: { poll: FeedPoll }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!poll.id) return;
    try {
      await toggleFollow(poll.id, "POLL");
      setIsFollowing(!isFollowing);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Link
      to={`/polls/${poll.id}`}
      className="block bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5 md:p-6 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-[var(--color-text-secondary)]">
          <div className={clsx("w-4 h-4 rounded-full flex items-center justify-center shrink-0 font-bold text-[7px]", poll.authorBg || "bg-blue-100", poll.authorColor || "text-blue-700")}>
            {poll.authorInitials || "AG"}
          </div>
          <span className="text-[var(--color-text-primary)]">{poll.author || "Anonymous"}</span>
          <span className="opacity-50">•</span>
          <span>{poll.time}</span>
          <span className="opacity-50">•</span>
          <span>📍 {poll.location || "Unknown"} {poll.distance ? `(${poll.distance})` : ""}</span>
        </div>
        <button
          onClick={handleFollow}
          title="Does it affect you? if yes, then Follow"
          className="shrink-0 ml-1 px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-bg-subtle)] text-[11px] font-bold transition-colors"
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>

      {/* Body */}
      <h3 className="font-bold text-lg md:text-xl text-[var(--color-text-primary)] leading-snug">
        {poll.question}
      </h3>
      
      {/* Post Flairs */}
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-purple-50 text-purple-700">
          📊 Poll
        </span>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]">
          🏛️ {poll.govLevel || "Ward"}
        </span>
      </div>

      <p className="text-[var(--color-text-secondary)] mt-3 line-clamp-3 text-sm mb-4">
        {poll.description}
      </p>

      <div className="space-y-3">
        {poll.options?.map((opt: FeedPollOption) => (
          <div key={opt.label} className="relative">
            <div className="w-full h-10 rounded-lg bg-[var(--color-bg-subtle)] overflow-hidden relative">
              <div
                className={clsx(
                  "absolute left-0 top-0 h-full rounded-lg transition-all",
                  opt.primary ? "bg-[var(--color-brand)]/15" : "bg-[var(--color-text-primary)]/5"
                )}
                style={{ width: `${opt.percent || opt.pct || 0}%` }}
              />
              <div className="relative flex items-center justify-between h-full px-4 text-xs sm:text-sm">
                <span className="font-medium text-[var(--color-text-primary)]">{opt.label}</span>
                <span className={clsx("font-semibold", opt.primary && "text-[var(--color-brand)]")}>
                  {opt.percent || opt.pct || 0}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[var(--color-border)]/40 text-xs font-semibold">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors text-[var(--color-text-primary)]">
          <Vote size={14} className="text-[var(--color-brand)]" />
          <span>{poll.votes?.toLocaleString() || 0} Votes</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors text-[var(--color-text-primary)]">
          <MessageSquare size={14} />
          <span>{poll.comments}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors text-[var(--color-text-primary)] hidden sm:flex">
          <Share2 size={14} />
          <span>Share</span>
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
  const [isBannerHidden, setIsBannerHidden] = useState(() => sessionStorage.getItem("djp_hide_completion_banner") === "true");
  const [issues, setIssues] = useState<FeedIssue[]>([]);
  const [discussions, setDiscussions] = useState<FeedDiscussion[]>([]);
  const [polls, setPolls] = useState<FeedPoll[]>([]);
  const [userCoords, setUserCoords] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => console.log("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    // Fetch issues
    fetch("/djp/api/v1/issues")
      .then(res => res.json())
      .then(data => {
        setIssues(data.map((item: { id: string; title: string; category: string; priority?: string; location?: string; createdAt?: string; status?: string; supportsCount?: number; commentsCount?: number; metadata?: string }) => {
          let meta: Record<string, unknown> = {};
          if (item.metadata) {
            try { meta = JSON.parse(item.metadata); } catch (e) { console.warn("Failed to parse issue metadata:", e); }
          }
          return {
            ...meta,
            id: item.id,
            title: item.title,
            category: item.category,
            severity: item.priority === 'CRITICAL' ? 'Critical' : 'High',
            location: item.location || "Unknown Location",
            time: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently",
            status: item.status || "Open",
            supports: item.supportsCount || 0,
            comments: item.commentsCount || 0,
          };
        }));
      })
      .catch((err) => console.error("Failed to fetch issues:", err));

    // Fetch discussions
    fetch("/djp/api/v1/discussions")
      .then(res => res.json())
      .then(data => {
        setDiscussions(data.map((item: { id: string; title: string; description: string; createdAt?: string; votesCount?: number; participantCount?: number; commentsCount?: number; location?: string; latitude?: number; longitude?: number; metadata?: string }) => {
          let meta: Record<string, unknown> = {};
          if (item.metadata) {
            try { meta = JSON.parse(item.metadata); } catch (e) { console.warn("Failed to parse discussion metadata:", e); }
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
            tags: (meta.tags as string[]) || ["General"],
            tagVariant: (meta.tagVariant as string[]) || ["secondary"],
            participants: (meta.participants as string[]) || [],
            author: (meta.author as string) || "Anonymous",
            location: item.location || "Unknown Location",
            latitude: item.latitude,
            longitude: item.longitude,
          };
        }));
      })
      .catch((err) => console.error("Failed to fetch discussions:", err));

    // Fetch polls
    fetch("/djp/api/v1/polls")
      .then(res => res.json())
      .then(data => {
        setPolls(data.map((item: { id: string; question: string; description: string; expiresAt?: string; votesCount?: number; commentsCount?: number; location?: string; latitude?: number; longitude?: number; govLevel?: string; metadata?: string; optionsJson?: string }) => {
          let meta: Record<string, unknown> = {};
          if (item.metadata) {
            try { meta = JSON.parse(item.metadata); } catch (e) { console.warn("Failed to parse poll metadata:", e); }
          }
          let options: Array<{ label: string; pct: number; primary?: boolean }> = [];
          if (item.optionsJson) {
            try { options = JSON.parse(item.optionsJson); } catch (e) { console.warn("Failed to parse poll options:", e); }
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
            author: (meta.author as string) || "Anonymous",
            location: item.location || "Unknown Location",
            latitude: item.latitude,
            longitude: item.longitude,
            govLevel: item.govLevel,
          };
        }));
      })
      .catch((err) => console.error("Failed to fetch polls:", err));
  }, [userCoords]); // Re-fetch or re-evaluate when userCoords changes so we can attach distance

  const processWithDistance = <T extends { latitude?: number; longitude?: number }>(items: T[]) => {
    return items.map(item => {
      let distanceStr = "";
      if (userCoords && item.latitude && item.longitude) {
        const d = getDistanceInKm(userCoords.lat, userCoords.lng, item.latitude, item.longitude);
        if (d < 1) distanceStr = Math.round(d * 1000) + " m away";
        else distanceStr = d.toFixed(1) + " km away";
      }
      return { ...item, distance: distanceStr };
    }).sort((a, b) => {
      // Sort by distance if available
      if (a.distance && b.distance) {
        const distA = getDistanceInKm(userCoords!.lat, userCoords!.lng, a.latitude!, a.longitude!);
        const distB = getDistanceInKm(userCoords!.lat, userCoords!.lng, b.latitude!, b.longitude!);
        return distA - distB;
      }
      return 0;
    });
  };

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
            {(activeContent === "All" || activeContent === "Issues") && processWithDistance(issues).map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
            {(activeContent === "All" || activeContent === "Discussions") && processWithDistance(discussions).map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
            {(activeContent === "All" || activeContent === "Polls") && processWithDistance(polls).map((poll) => (
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
