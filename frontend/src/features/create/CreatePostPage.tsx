import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check, ChevronDown } from "lucide-react";

import CreateIssueForm from "./components/CreateIssueForm";
import CreateDiscussionForm from "./components/CreateDiscussionForm";
import CreatePollForm from "./components/CreatePollForm";
import CreatePetitionForm from "./components/CreatePetitionForm";

const ISSUE_TYPES = [
  "Garbage & Waste",
  "Roads & Potholes",
  "Water Supply",
  "Streetlights & Power",
  "Public Safety",
  "Parks & Recreation",
  "Public Transport",
];

const TABS = [
  { id: "issue", label: "Issue", icon: "📢" },
  { id: "poll", label: "Poll", icon: "📊" },
  { id: "discussion", label: "Discussion", icon: "💬" },
  { id: "petition", label: "Petition", icon: "📝" },
];

export default function CreatePostPage() {
  const location = useLocation();
  
  // Parse '?type=' from URL to set initial tab if desired
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get("type") || "issue";

  const [activeTab, setActiveTab] = useState(
    TABS.find((t) => t.id === initialType)?.id || "issue"
  );
  
  const [selectedIssueType, setSelectedIssueType] = useState("");
  const [issueTypeDropdownOpen, setIssueTypeDropdownOpen] = useState(false);

  const [impactScope, setImpactScope] = useState("🏘️ Neighborhood (10–50 people)");
  const [priorityReason, setPriorityReason] = useState("Health & Hygiene Concern");

  // Close dropdown on outside click (simplified for prototype)
  useEffect(() => {
    const handleClick = () => setIssueTypeDropdownOpen(false);
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

        {/* Top bar: Selectors */}
        <div className="mb-6 flex flex-col md:flex-row gap-8 items-end" onClick={(e) => e.stopPropagation()}>
          
          {/* Issue Type */}
          <div className="relative w-full md:w-72 shrink-0">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Issue Type</h3>
            <button
              type="button"
              onClick={() => setIssueTypeDropdownOpen(!issueTypeDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold text-sm shadow-sm hover:border-[var(--color-brand)] transition-all cursor-pointer"
            >
              <span className="truncate">{selectedIssueType || "Select Issue Type"}</span>
              <ChevronDown size={16} className="text-[var(--color-text-secondary)] shrink-0" />
            </button>

            {issueTypeDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-xl z-50 py-1 max-h-64 overflow-y-auto">
                <div className="px-3 py-1.5 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                  Categories
                </div>
                {ISSUE_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setSelectedIssueType(type);
                      setIssueTypeDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{type}</span>
                    {selectedIssueType === type && <Check size={15} className="text-[var(--color-brand)]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Impact & Priority */}
          <div className="flex-1 w-full">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Impact & Priority</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1">Impact Scope *</label>
                <select
                  value={impactScope}
                  onChange={(e) => setImpactScope(e.target.value)}
                  className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] cursor-pointer focus:ring-1 focus:ring-[var(--color-brand)] outline-none"
                >
                  <option value="🏘️ Neighborhood (10–50 people)">🏘️ Neighborhood (10–50 people)</option>
                  <option value="📍 Locality (50–500 people)">📍 Locality (50–500 people)</option>
                  <option value="🏛️ Ward">🏛️ Ward</option>
                  <option value="🌆 City">🌆 City</option>
                  <option value="🏢 District">🏢 District</option>
                  <option value="🌐 State">🌐 State</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1">Priority / Risk</label>
                <select
                  value={priorityReason}
                  onChange={(e) => setPriorityReason(e.target.value)}
                  className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] cursor-pointer focus:ring-1 focus:ring-[var(--color-brand)] outline-none"
                >
                  <option value="Minor inconvenience">Minor inconvenience</option>
                  <option value="Health & Hygiene Concern">Health & Hygiene Concern</option>
                  <option value="Safety Risk">Safety Risk</option>
                  <option value="Environmental Damage">Environmental Damage</option>
                  <option value="Traffic Disruption">Traffic Disruption</option>
                  <option value="Financial Loss">Financial Loss</option>
                  <option value="Public Service Disruption">Public Service Disruption</option>
                </select>
              </div>
            </div>
          </div>
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
            {activeTab === "issue" && <CreateIssueForm community={selectedIssueType} priorityReason={priorityReason} />}
            {activeTab === "discussion" && <CreateDiscussionForm community={selectedIssueType} />}
            {activeTab === "poll" && <CreatePollForm community={selectedIssueType} />}
            {activeTab === "petition" && <CreatePetitionForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
