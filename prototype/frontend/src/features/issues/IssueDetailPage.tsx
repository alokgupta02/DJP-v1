import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ThumbsUp, MessageSquare, Users, CheckCircle2, Share2, ImagePlus, ArrowLeft, AlertTriangle, Trash2, Droplet, Search, User } from "lucide-react";
import clsx from "clsx";
import { type CommentData, CommentInput, CommentThread } from "../../shared/components/comments";

const ISSUES_DATA: Record<string, {
  id: string; category: string; severity: string; title: string; description: string;
  location: string; address: string; distance: string; time: string; govLevel: string;
  supports: number; commentsCount: number; affected: string; image: string; imageCount: number;
  verified: boolean; iconBg: string; iconColor: string; icon: React.ElementType;
  timeline: string[]; comments: CommentData[];
  health: [string, string][]; related: { title: string; dist: string }[]; author?: string;
}> = {
  pothole: {
    id: "pothole", category: "Road", severity: "Critical",
    title: "Large Pothole Near Balewadi High Street Junction",
    description: "A deep pothole has formed near the Balewadi High Street junction following recent rainfall. Vehicles frequently swerve to avoid it, increasing the risk of accidents and traffic congestion. Motorcyclists are particularly vulnerable during night hours because of poor visibility.",
    location: "Balewadi High Street • Ward 23", address: "Balewadi High Street Junction, Ward 23, Pune",
    distance: "140 m away", time: "Reported 2 hours ago", govLevel: "Ward",
    supports: 96, commentsCount: 24, affected: "500+",
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
    comments: [
      { id: "c1", initials: "AM", bg: "bg-blue-100", textColor: "text-blue-700", name: "Aman", time: "1 hour ago", text: "This pothole has become much deeper after yesterday's rain.", score: 12 },
      { id: "c2", initials: "PR", bg: "bg-purple-100", textColor: "text-purple-700", name: "Priya", time: "30 mins ago", text: "Several vehicles are suddenly changing lanes to avoid it. It's very dangerous.", score: 8 },
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
    supports: 58, commentsCount: 11, affected: "300–500",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1200",
    imageCount: 9, verified: true,
    iconBg: "bg-cyan-100", iconColor: "text-cyan-700", icon: Droplet,
    timeline: [
      "💧 Additional leakage photo uploaded.",
      "✅ Community verified.",
      "👍 Support crossed 50.",
      "📝 Issue reported.",
    ],
    comments: [
      { id: "c1", initials: "RH", bg: "bg-teal-100", textColor: "text-teal-700", name: "Rahul", time: "2 hours ago", text: "Water pressure has dropped in our apartments.", score: 5 },
      { id: "c2", initials: "SN", bg: "bg-rose-100", textColor: "text-rose-700", name: "Sneha", time: "1 hour ago", text: "The road is becoming slippery for two-wheelers.", score: 3 },
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
    distance: "780 m away", time: "Reported 15h ago", govLevel: "Ward", author: "Priya S.",
    supports: 42, commentsCount: 18, affected: "120–200",
    image: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=1000",
    imageCount: 6, verified: true,
    iconBg: "bg-emerald-100", iconColor: "text-emerald-700", icon: Trash2,
    timeline: [
      "🟢 Community verified by nearby citizens.",
      "📷 Two new evidence photos uploaded.",
      "👍 Support count crossed 40.",
      "📝 Original issue reported.",
    ],
    comments: [
      { id: "c1", initials: "AG", bg: "bg-indigo-100", textColor: "text-indigo-700", name: "Alok G.", time: "4 hours ago", text: "Garbage has increased after the weekend market.", score: 7 },
      { id: "c2", initials: "RK", bg: "bg-amber-100", textColor: "text-amber-700", name: "Riya K.", time: "2 hours ago", text: "The collection truck skipped this street again today.", score: 5 },
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

const UUID_TO_MOCK_KEY: Record<string, string> = {
  "a1111111-1111-1111-1111-111111111111": "pothole",
  "b2222222-2222-2222-2222-222222222222": "garbage",
  "c3333333-3333-3333-3333-333333333333": "water",
};

export default function IssueDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const mockKey = id && UUID_TO_MOCK_KEY[id] ? UUID_TO_MOCK_KEY[id] : "pothole";
  const [issue, setIssue] = useState<any>(ISSUES_DATA[mockKey] || ISSUES_DATA["pothole"]);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8081/djp/api/v1/issues/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        let meta = {};
        if (data.metadata) {
          try { meta = JSON.parse(data.metadata); } catch(e) {}
        }
        
        setIssue((prev: any) => ({
          ...prev,
          title: data.title,
          description: data.description,
          supports: data.supportsCount || 0,
          commentsCount: data.commentsCount || 0,
          category: data.category || prev.category,
          severity: data.priority === 'CRITICAL' ? 'Critical' : (data.priority === 'HIGH' ? 'HIGH' : prev.severity),
          location: data.location || prev.location,
          affected: (meta as any).affected || prev.affected,
          distance: (meta as any).distance || prev.distance,
          govLevel: (meta as any).govLevel || prev.govLevel,
          author: (meta as any).author || prev.author || "Anonymous",
          image: (meta as any).image || prev.image,
          imageCount: (meta as any).imageCount || prev.imageCount,
          verified: (meta as any).verified !== undefined ? (meta as any).verified : prev.verified,
          time: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : prev.time,
        }));
      })
      .catch(console.error);
  }, [id]);

  const Icon = issue?.icon || AlertTriangle;

  if (!issue) {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto text-center py-20">
          <AlertTriangle size={48} className="mx-auto text-[var(--color-text-secondary)] mb-4" />
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Issue Not Found</h2>
          <p className="text-[var(--color-text-secondary)] mb-6">The issue you're looking for doesn't exist.</p>
          <Link to="/issues" className="text-[var(--color-brand)] font-semibold hover:underline">← Back to Issues</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <Link to="/issues" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Issues
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {/* Unified Post Container */}
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
              
              {/* Main Post Area */}
              <div className="p-4 sm:p-5">
                {/* Header (Icon + Status + Tags) */}
                <div className="flex justify-between items-start mb-4">
                  <div className="relative shrink-0">
                    <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center", issue.iconBg)}>
                      <Icon size={22} className={issue.iconColor} />
                    </div>
                    {issue.verified && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center border-2 border-[var(--color-bg-surface)]">
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-[var(--color-bg-subtle)] text-[var(--color-brand)] border border-[var(--color-border)]">
                      {issue.category}
                    </span>
                    <span className={clsx("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border", issue.severity === "Critical" ? "bg-[var(--color-error-bg)] text-[var(--color-error)] border-red-200" : "bg-[var(--color-warning-bg)] text-[var(--color-warning)] border-orange-200")}>
                      {issue.severity}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-bold leading-snug text-[var(--color-text-primary)] mb-2">
                  {issue.title}
                </h1>
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs text-[var(--color-text-secondary)] font-medium mb-4">
                  <div className="flex items-center gap-1.5">
                    <User size={14} /> 
                    <span className="font-semibold text-[var(--color-text-primary)] hover:underline cursor-pointer">{issue.author}</span>
                    <button title="Does it affect you? if yes, then Follow" className="ml-1 px-3 py-0.5 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-surface)] text-[10px] font-bold hover:opacity-80 transition-opacity">Follow</button>
                  </div>
                  <span className="flex items-center gap-1">📍 {issue.location}</span>
                  <span className="flex items-center gap-1">📏 {issue.distance}</span>
                  <span className="flex items-center gap-1">🕒 {issue.time}</span>
                  <span className="flex items-center gap-1">🏛 {issue.govLevel}</span>
                </div>

                {/* Content */}
                <div className="text-[var(--color-text-primary)] text-sm leading-relaxed space-y-4 mb-4">
                  <p>{issue.description}</p>
                </div>

                {/* Evidence embedded in main post */}
                <div className="mb-4">
                  <h3 className="font-semibold text-sm mb-2 text-[var(--color-text-primary)]">Evidence</h3>
                  <div className="rounded-xl overflow-hidden border border-[var(--color-border)] relative">
                     <img src={issue.image} alt="Issue evidence" className="w-full h-64 sm:h-80 object-cover" />
                     {issue.imageCount > 1 && (
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                           +{issue.imageCount - 1} photos
                        </div>
                     )}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex items-center gap-2 mt-4 pt-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-brand)] hover:text-white text-[var(--color-text-primary)] font-semibold text-xs transition-colors border border-[var(--color-border)]">
                    <ThumbsUp size={16} />
                    {issue.supports} Supports
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] font-semibold text-xs transition-colors border border-[var(--color-border)]">
                    <MessageSquare size={16} />
                    {issue.commentsCount}
                  </button>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] font-semibold text-xs border border-[var(--color-border)] cursor-default">
                    <Users size={16} />
                    {issue.affected} Affected
                  </div>
                  <div className="grow" />
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] font-semibold text-xs transition-colors border border-[var(--color-border)]">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>

              {/* Reddit-style comments section */}
              <div className="px-4 sm:px-5 pb-5">
                <CommentInput entityId={id} entityType="ISSUE" />
                
                {/* Comments Header (Sort & Search) */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[var(--color-text-secondary)] text-sm">Sort by:</span>
                      <select className="font-bold text-[var(--color-text-primary)] bg-transparent focus:outline-none cursor-pointer">
                        <option>Top Comments</option>
                        <option>Newest First</option>
                      </select>
                    </div>
                    <div className="relative w-full max-w-xs hidden sm:block">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                      <input 
                        type="text" 
                        placeholder="Search Discussions" 
                        className="w-full pl-9 pr-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)]" 
                      />
                    </div>
                  </div>
                  <hr className="border-[var(--color-border)]" />
                </div>
                
                {/* Threaded Comments List */}
                <div className="space-y-4">
                  {issue.comments.map((comment) => (
                    <CommentThread key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-6 h-fit">
            
            {/* Issue Health Widget */}
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
                <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">Issue Health</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3 text-sm text-[var(--color-text-primary)] font-medium">
                  {issue.health.map(([icon, text]) => (
                    <li key={text} className="flex items-center gap-2">
                      <span className="w-5 text-center">{icon}</span> {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Location Widget */}
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
                <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">Location</h3>
              </div>
              <div className="p-4">
                <div className="h-40 bg-[var(--color-bg-muted)] rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] border border-[var(--color-border)] overflow-hidden">
                   <div className="text-xs font-semibold uppercase tracking-wider">Map Placeholder</div>
                </div>
                <p className="mt-3 text-[var(--color-text-secondary)] text-sm">{issue.address}</p>
              </div>
            </div>

            {/* Citizen Timeline Widget */}
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
                <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">Activity Timeline</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3 text-sm text-[var(--color-text-primary)]">
                  {issue.timeline.map((item, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-[var(--color-text-secondary)] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Related Issues Widget */}
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
                <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">Related Issues</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                  {issue.related.map((r) => (
                    <li key={r.title} className="hover:text-[var(--color-brand)] cursor-pointer transition-colors">
                      {r.title}{r.dist && <span className="opacity-70"> ({r.dist})</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
