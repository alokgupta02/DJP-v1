import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Vote, MessageSquare, Share2, ArrowLeft, ArrowBigUp, ArrowBigDown, Users, Search, User } from "lucide-react";
import clsx from "clsx";
import { type CommentData, CommentInput, CommentThread } from "../../shared/components/comments";

const POLLS_DATA: Record<string, {
  id: string; category: string;
  title: string; description: string;
  author: string; time: string;
  supports: number; commentsCount: number; participants: number;
  options: { label: string; pct: number; primary: boolean; color: string }[];
  aiSummary: string; aiCommon: string[];
  topics: string[]; comments: CommentData[];
}> = {
  "1": {
    id: "1", category: "High Priority",
    title: 'Should Ward 12 implement "No Car Sundays" on the Central Corridor?',
    description: "This proposal aims to reduce local carbon emissions and promote pedestrian activity. The pilot would run for 6 months between 8 AM and 4 PM. We want to gather community feedback before the municipal committee makes a final decision on the zoning changes.",
    author: "Ward 12 Office", time: "2 days remaining",
    supports: 12402, commentsCount: 482, participants: 15300,
    options: [
      { label: "Yes, implement it", pct: 64, primary: true, color: "bg-[var(--color-brand)]" },
      { label: "No, maintain current traffic", pct: 36, primary: false, color: "bg-[var(--color-text-secondary)]" },
    ],
    aiSummary: "The majority of Ward 12 residents favor this proposal, citing environmental benefits and increased safety for pedestrians. However, local businesses have raised concerns about delivery logistics during the restricted hours.",
    aiCommon: ["✅ Reduces air and noise pollution", "✅ Safer for children and pedestrians", "⚠️ Concerns about local business deliveries"],
    topics: ["Environment", "Traffic", "Community"],
    comments: [
      { id: "c1", initials: "SM", bg: "bg-green-100", textColor: "text-green-700", name: "Suresh", time: "5 hours ago", text: "Great initiative! It will make Sunday mornings much more peaceful. We really need this for the kids.", score: 85 },
      { id: "c2", initials: "PK", bg: "bg-rose-100", textColor: "text-rose-700", name: "Priya K.", time: "1 day ago", text: "What about elderly residents who depend on cabs? We need to ensure emergency access is not compromised.", score: 42 }
    ]
  }
};

const UUID_TO_MOCK_KEY: Record<string, string> = {
  "1a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a": "1",
  "2b2b2b2b-2b2b-2b2b-2b2b-2b2b2b2b2b2b": "1", // Fallback to 1 for now since we only have one mock
};

export default function PollDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const mockKey = id && UUID_TO_MOCK_KEY[id] ? UUID_TO_MOCK_KEY[id] : "1";
  const [poll, setPoll] = useState<any>(POLLS_DATA[mockKey] || POLLS_DATA["1"]);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8081/djp/api/v1/polls/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        let meta = {};
        if (data.metadata) {
          try { meta = JSON.parse(data.metadata); } catch(e) {}
        }
        
        let parsedOptions = prev => prev.options;
        if (data.optionsJson) {
           try {
              parsedOptions = JSON.parse(data.optionsJson);
           } catch(e) {}
        }

        setPoll((prev: any) => ({
          ...prev,
          title: data.question,
          description: data.description,
          supports: data.votesCount || 0, // In polls, votes are mapped to supports mostly, or participants
          participants: data.votesCount || 0,
          commentsCount: data.commentsCount || 0,
          category: data.category || prev.category,
          author: (meta as any).author || prev.author,
          options: parsedOptions !== prev?.options ? parsedOptions.map((opt: any, i: number) => ({
             ...opt,
             color: i === 0 ? "bg-[var(--color-brand)]" : "bg-[var(--color-text-secondary)]"
          })) : prev.options
        }));
      })
      .catch(console.error);
  }, [id]);

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <Link to="/polls" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Polls
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {/* Unified Post Container */}
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
              
              {/* Main Post Area */}
              <div className="p-4 sm:p-5">
                {/* Author Metadata */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                    <User size={16} />
                    <span className="font-semibold text-[var(--color-text-primary)] hover:underline cursor-pointer">{poll.author}</span>
                    <span>•</span>
                    <span className="text-[var(--color-brand)] font-semibold">{poll.time}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-brand-light)] text-[var(--color-brand)] uppercase">
                    {poll.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-bold leading-snug text-[var(--color-text-primary)] mb-2">
                  {poll.title}
                </h1>
                
                {/* Content */}
                <div className="text-[var(--color-text-primary)] text-sm leading-relaxed space-y-4 mb-6">
                  <p>{poll.description}</p>
                </div>

                {/* Poll Interactive Area */}
                <div className="mb-6 p-5 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg-subtle)]">
                  <h3 className="font-bold text-[var(--color-text-primary)] mb-4">Cast your vote</h3>
                  <div className="space-y-4 mb-6">
                    {poll.options.map((opt) => (
                      <div key={opt.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-[var(--color-text-primary)]">{opt.label}</span>
                          <span className={opt.primary ? "text-[var(--color-brand)] font-bold" : "text-[var(--color-text-secondary)]"}>{opt.pct}%</span>
                        </div>
                        <div className="h-4 w-full bg-white border border-[var(--color-border)] rounded-full overflow-hidden shadow-sm">
                          <div className={clsx("h-full rounded-full transition-all duration-500", opt.color)} style={{ width: `${opt.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <button className="px-8 py-2.5 bg-[var(--color-brand)] text-[var(--color-text-inverse)] font-bold rounded-full hover:scale-105 transition-transform text-sm shadow-md">
                      Vote Now
                    </button>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex items-center gap-2 mt-4 pt-2">
                   <div className="flex items-center rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] font-semibold text-xs border border-[var(--color-border)]">
                    <button className="p-1.5 px-2 hover:bg-[var(--color-bg-muted)] hover:text-orange-500 rounded-l-full transition-colors"><ArrowBigUp size={18} /></button>
                    <span className="px-1">{poll.supports}</span>
                    <button className="p-1.5 px-2 hover:bg-[var(--color-bg-muted)] hover:text-blue-500 rounded-r-full transition-colors"><ArrowBigDown size={18} /></button>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] font-semibold text-xs transition-colors border border-[var(--color-border)]">
                    <MessageSquare size={16} />
                    {poll.commentsCount}
                  </button>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] font-semibold text-xs border border-[var(--color-border)] cursor-default">
                    <Vote size={16} />
                    {poll.participants.toLocaleString()} Votes
                  </div>
                  <div className="grow" />
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
                        <option>Top Comments</option>
                        <option>Newest First</option>
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
                  {poll.comments.map((comment) => (
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
                <div className="text-[var(--color-text-primary)] text-sm leading-relaxed mb-4">{poll.aiSummary}</div>
                <div className="space-y-3">
                  <div className="rounded-lg bg-[var(--color-bg-subtle)] p-3">
                    <h4 className="font-bold text-xs text-[var(--color-text-primary)] mb-2 uppercase tracking-wider">Common Viewpoints</h4>
                    <ul className="space-y-2 text-sm text-[var(--color-text-primary)]">
                      {poll.aiCommon.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Voting Demographics (Faked) */}
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
                <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">Voter Demographics</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-[var(--color-text-secondary)] font-semibold">18-30 Years</span>
                      <span className="text-[var(--color-text-primary)] font-bold">42%</span>
                   </div>
                   <div className="h-2 w-full bg-[var(--color-bg-subtle)] rounded-full overflow-hidden">
                     <div className="h-full bg-[var(--color-brand)] opacity-60 rounded-full" style={{ width: '42%' }} />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-[var(--color-text-secondary)] font-semibold">31-50 Years</span>
                      <span className="text-[var(--color-text-primary)] font-bold">35%</span>
                   </div>
                   <div className="h-2 w-full bg-[var(--color-bg-subtle)] rounded-full overflow-hidden">
                     <div className="h-full bg-[var(--color-brand)] opacity-80 rounded-full" style={{ width: '35%' }} />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-[var(--color-text-secondary)] font-semibold">50+ Years</span>
                      <span className="text-[var(--color-text-primary)] font-bold">23%</span>
                   </div>
                   <div className="h-2 w-full bg-[var(--color-bg-subtle)] rounded-full overflow-hidden">
                     <div className="h-full bg-[var(--color-brand)] rounded-full" style={{ width: '23%' }} />
                   </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
                <h3 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wide">Topics</h3>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {poll.topics.map((topic) => (
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
