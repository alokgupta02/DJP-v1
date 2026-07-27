import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ThumbsUp, MessageSquare, Users,
  AlertTriangle, Trash2,
  Lightbulb, Vote, X, Share2, FileText, Clock, Loader2
} from "lucide-react";
import clsx from "clsx";
import { toggleFollow } from "../interactions/interactionsApi";
import type { FeedIssue, FeedDiscussion, FeedPoll, FeedPollOption } from "./feedTypes";
import { fetchIssues, fetchDiscussions, fetchPolls, fetchPetitions, type FeedPetition } from "./feedApi";
import { fetchInsights } from "../insights/insightsApi";
import { shareContent } from "../../shared/lib/share";

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

const ICON_MAP: Record<string, typeof Trash2> = {
  Garbage: Trash2, Trash: Trash2, Waste: Trash2,
  "Potholes & Roads": AlertTriangle, Infrastructure: AlertTriangle,
  "Street Lights": Lightbulb, Electricity: Lightbulb,
  "Water Supply": AlertTriangle,
};

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
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); shareContent(issue.title, window.location.origin + '/issues/' + issue.id); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors text-[var(--color-text-primary)] hidden sm:flex cursor-pointer"
        >
          <Share2 size={14} />
          <span>Share</span>
        </button>
        
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
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); shareContent(discussion.title, window.location.origin + '/discussions/' + discussion.id); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors text-[var(--color-text-primary)] hidden sm:flex cursor-pointer"
        >
          <Share2 size={14} />
          <span>Share</span>
        </button>
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
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); shareContent(poll.question, window.location.origin + '/polls/' + poll.id); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors text-[var(--color-text-primary)] hidden sm:flex cursor-pointer"
        >
          <Share2 size={14} />
          <span>Share</span>
        </button>
      </div>
    </Link>
  );
}

function PetitionCard({ petition }: { petition: FeedPetition }) {
  const pct = petition.goal > 0 ? Math.min(100, Math.round((petition.signatures / petition.goal) * 100)) : 0;
  return (
    <Link
      to={`/petitions/${petition.id}`}
      className="block bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5 md:p-6 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-[var(--color-brand-light)] text-[var(--color-brand)]">
          {petition.category}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-secondary)]">
          <Clock size={12} />
          {petition.daysLeft} days left
        </span>
      </div>
      <h3 className="font-bold text-lg text-[var(--color-text-primary)] leading-snug mb-2">{petition.title}</h3>
      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4">{petition.description}</p>
      <div className="flex justify-between text-xs mb-1">
        <span className="font-semibold">{petition.signatures.toLocaleString()} signatures</span>
        <span className="text-[var(--color-text-secondary)]">Goal: {petition.goal.toLocaleString()}</span>
      </div>
      <div className="w-full h-2 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
        <div className="h-full bg-[var(--color-brand)] rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[var(--color-border)]/40 text-xs font-semibold text-[var(--color-text-secondary)]">
        <FileText size={14} />
        <span>{petition.author}</span>
      </div>
    </Link>
  );
}

export default function FeedPage() {
  const [activeContent, setActiveContent] = useState("All");
  const [isBannerHidden, setIsBannerHidden] = useState(() => sessionStorage.getItem("djp_hide_completion_banner") === "true");
  const [userCoords, setUserCoords] = useState<{lat: number, lng: number} | null>(null);

  // TanStack Query - data fetching with caching, deduping, retries
  const { data: issues = [], isLoading: loadingIssues, error: errIssues } = useQuery({ queryKey: ["feed", "issues"], queryFn: fetchIssues });
  const { data: discussions = [], isLoading: loadingDiscs, error: errDiscs } = useQuery({ queryKey: ["feed", "discussions"], queryFn: fetchDiscussions });
  const { data: polls = [], isLoading: loadingPolls, error: errPolls } = useQuery({ queryKey: ["feed", "polls"], queryFn: fetchPolls });
  const { data: petitions = [], isLoading: loadingPetitions, error: errPetitions } = useQuery({ queryKey: ["feed", "petitions"], queryFn: fetchPetitions });
  const { data: insights, isLoading: loadingInsights, error: errInsights } = useQuery({ queryKey: ["insights"], queryFn: fetchInsights });
  const feedLoading = loadingIssues || loadingDiscs || loadingPolls || loadingPetitions || loadingInsights;
  const feedError = errIssues || errDiscs || errPolls || errPetitions || errInsights;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); },
        (err) => console.log("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

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
          {feedError && (
            <div className="p-4 mb-4 rounded-xl bg-[var(--color-error)]/10 border border-[var(--color-error)] text-sm text-[var(--color-error)]">
              Failed to load feed data. Please try again later.
            </div>
          )}
          <div className="space-y-6 pb-32">
            {feedLoading && issues.length === 0 && discussions.length === 0 && polls.length === 0 && petitions.length === 0 && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-[var(--color-brand)]" size={32} />
              </div>
            )}
            {(activeContent === "All" || activeContent === "Issues") && processWithDistance(issues).map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
            {(activeContent === "All" || activeContent === "Discussions") && processWithDistance(discussions).map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
            {(activeContent === "All" || activeContent === "Polls") && processWithDistance(polls).map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
            {(activeContent === "All" || activeContent === "Petitions") && petitions.map((petition) => (
              <PetitionCard key={petition.id} petition={petition} />
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
                <p className="text-4xl font-black text-[var(--color-brand)] mt-1">{issues.length || insights?.issuesReported || 0}</p>
              </div>

              <div className="space-y-1">
                {(insights?.categoryBreakdown ?? []).length > 0
                  ? insights!.categoryBreakdown.slice(0, 5).map((cat) => {
                      const Icon = ICON_MAP[cat.label] || AlertTriangle;
                      return (
                        <div key={cat.label} className="flex items-center justify-between rounded-lg px-3 py-3">
                          <div className="flex items-center gap-3">
                            <Icon size={18} className="text-[var(--color-brand)]" />
                            <span className="font-medium text-sm text-[var(--color-text-primary)]">{cat.label}</span>
                          </div>
                          <span className="font-bold text-[var(--color-brand)]">{cat.count.toLocaleString()}</span>
                        </div>
                      );
                    })
                  : [
                      { label: "Garbage", icon: Trash2, count: 91 },
                      { label: "Potholes", icon: AlertTriangle, count: 38 },
                      { label: "Streetlights", icon: Lightbulb, count: 14 },
                    ].map((cat) => (
                      <div key={cat.label} className="flex items-center justify-between rounded-lg px-3 py-3">
                        <div className="flex items-center gap-3">
                          <cat.icon size={18} className="text-[var(--color-brand)]" />
                          <span className="font-medium text-sm text-[var(--color-text-primary)]">{cat.label}</span>
                        </div>
                        <span className="font-bold text-[var(--color-brand)]">{cat.count}</span>
                      </div>
                    ))
                }
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
                {issues.slice(0, 2).map((issue) => (
                  <Link key={issue.id} to={`/issues/${issue.id}`} className="block rounded-xl p-3 hover:bg-[var(--color-bg-subtle)] transition">
                    <p className="text-xs font-semibold text-[var(--color-error)] uppercase tracking-wide">Issue</p>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)] mt-0.5">{issue.title}</p>
                    <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">{issue.location} ↑ {issue.supports} supports</p>
                  </Link>
                ))}
                {discussions.slice(0, 2).map((d) => (
                  <Link key={d.id} to={`/discussions/${d.id}`} className="block rounded-xl p-3 hover:bg-[var(--color-bg-subtle)] transition">
                    <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">Discussion</p>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)] mt-0.5">{d.title}</p>
                    <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">{d.location} ↑ {d.supports} supports</p>
                  </Link>
                ))}
                {polls.slice(0, 1).map((poll) => (
                  <Link key={poll.id} to={`/polls/${poll.id}`} className="block rounded-xl p-3 hover:bg-[var(--color-bg-subtle)] transition">
                    <p className="text-xs font-semibold text-[var(--color-brand)] uppercase tracking-wide">Poll</p>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)] mt-0.5">{poll.question}</p>
                    <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">{poll.time}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
      </div>

    </div>
  );
}
