import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ChevronDown, Check } from "lucide-react";

import CreateIssueForm from "./components/CreateIssueForm";
import CreateDiscussionForm from "./components/CreateDiscussionForm";
import CreatePollForm from "./components/CreatePollForm";
import CreatePetitionForm from "./components/CreatePetitionForm";

const COMMUNITIES = [
  "Executive Branch",
  "Legislative Branch",
  "Judiciary Branch",
  "Ward 12 (North Delhi)",
  "Ward 45 (Central Delhi)",
];

const TABS = [
  { id: "issue", label: "Issue", icon: "📢" },
  { id: "poll", label: "Poll", icon: "📊" },
  { id: "discussion", label: "Discussion", icon: "💬" },
  { id: "petition", label: "Petition", icon: "📝" },
];

export default function CreatePostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse '?type=' from URL to set initial tab if desired
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get("type") || "issue";

  const [activeTab, setActiveTab] = useState(
    TABS.find((t) => t.id === initialType)?.id || "issue"
  );
  
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);

  // Close dropdown on outside click (simplified for prototype)
  useEffect(() => {
    const handleClick = () => setCommunityDropdownOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-[var(--color-bg-default)]">
      <div className="max-w-4xl mx-auto">
        
        {/* Header line */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[var(--color-border)]">
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Create post</h1>
        </div>

        {/* Top bar: Community Selector */}
        <div className="mb-6 relative w-64" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => setCommunityDropdownOpen(!communityDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold text-sm shadow-sm hover:border-[var(--color-brand)] transition-all cursor-pointer"
          >
            <span className="truncate">{selectedCommunity || "Select Community"}</span>
            <ChevronDown size={16} className="text-[var(--color-text-secondary)] shrink-0" />
          </button>

          {communityDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-xl z-50 py-1 max-h-64 overflow-y-auto">
              <div className="px-3 py-1.5 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Branches
              </div>
              {COMMUNITIES.slice(0, 3).map((comm) => (
                <button
                  key={comm}
                  type="button"
                  onClick={() => {
                    setSelectedCommunity(comm);
                    setCommunityDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{comm}</span>
                  {selectedCommunity === comm && <Check size={15} className="text-[var(--color-brand)]" />}
                </button>
              ))}
              <div className="px-3 py-1.5 mt-2 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Local
              </div>
              {COMMUNITIES.slice(3).map((comm) => (
                <button
                  key={comm}
                  type="button"
                  onClick={() => {
                    setSelectedCommunity(comm);
                    setCommunityDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{comm}</span>
                  {selectedCommunity === comm && <Check size={15} className="text-[var(--color-brand)]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Unified Form Area (Reddit style tabs) */}
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm">
          
          {/* Tabs */}
          <div className="flex items-center border-b border-[var(--color-border)] overflow-x-auto">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 flex-1 px-4 py-3.5 text-sm font-bold transition-colors cursor-pointer ${
                    isActive 
                      ? "text-[var(--color-brand)] border-b-2 border-[var(--color-brand)] bg-[var(--color-brand-light)]/20" 
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] border-b-2 border-transparent"
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Form */}
          <div className="p-6">
            {activeTab === "issue" && <CreateIssueForm community={selectedCommunity} />}
            {activeTab === "discussion" && <CreateDiscussionForm community={selectedCommunity} />}
            {activeTab === "poll" && <CreatePollForm community={selectedCommunity} />}
            {activeTab === "petition" && <CreatePetitionForm community={selectedCommunity} />}
          </div>
        </div>
      </div>
    </div>
  );
}
