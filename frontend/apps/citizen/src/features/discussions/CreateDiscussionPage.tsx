import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Tag as TagIcon,
  Link2,
  Image as ImageIcon,
  List,
  ListOrdered,
  AlertCircle,
  Table,
  MoreHorizontal,
  X,
  Check,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const COMMUNITIES = [
  "Ward 12 (North Delhi)",
  "Ward 45 (Central Delhi)",
  "Infrastructure & Roads",
  "Civic Governance",
  "Education & Schools",
  "Public Healthcare",
  "Environment & Parks",
];

const DRAFT_STORAGE_KEY = "djp_citizen_discussion_draft";

export default function CreateDiscussionPage() {
  const navigate = useNavigate();
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [editorEmpty, setEditorEmpty] = useState(true);
  const [editorFocused, setEditorFocused] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInputOpen, setTagInputOpen] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Track active formatting states for toolbar highlighting (just like Reddit)
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    strikeThrough: false,
    superscript: false,
    unorderedList: false,
    orderedList: false,
  });

  const checkEditorEmpty = () => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText.trim();
    const html = editorRef.current.innerHTML.trim();
    const hasTags = /<(ul|ol|li|img|blockquote|table|h[1-6])/i.test(html);
    setEditorEmpty(text === "" && !hasTags);
  };

  const checkActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      superscript: document.queryCommandState("superscript"),
      unorderedList: document.queryCommandState("insertUnorderedList"),
      orderedList: document.queryCommandState("insertOrderedList"),
    });
    checkEditorEmpty();
  };

  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.selectedCommunity) setSelectedCommunity(parsed.selectedCommunity);
        if (parsed.tags && Array.isArray(parsed.tags)) setTags(parsed.tags);
        if (parsed.html && editorRef.current) {
          editorRef.current.innerHTML = parsed.html;
          setEditorEmpty(editorRef.current.innerText.trim() === "");
        }
      } catch {
        // ignore invalid JSON
      }
    }
  }, []);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage(null);
    }, 3500);
  };

  const handleAddTag = () => {
    const trimmed = newTag.trim().replace(/^#/, "");
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setNewTag("");
      setTagInputOpen(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Live WYSIWYG command execution
  const executeCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    checkActiveFormats();
    checkEditorEmpty();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleInsertLink = () => {
    const url = window.prompt("Enter link URL:", "https://");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const imgHtml = `<div class="my-3"><img src="${dataUrl}" alt="Uploaded image" class="max-h-80 rounded-xl border border-[var(--color-border)] shadow-sm object-contain" /></div><br/>`;
      executeCommand("insertHTML", imgHtml);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleInsertTable = () => {
    const tableHtml = `
      <table class="w-full border-collapse border border-[var(--color-border)] my-3 text-sm">
        <thead>
          <tr class="bg-[var(--color-bg-subtle)]">
            <th class="border border-[var(--color-border)] p-2 text-left font-bold">Header 1</th>
            <th class="border border-[var(--color-border)] p-2 text-left font-bold">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-[var(--color-border)] p-2">Data 1</td>
            <td class="border border-[var(--color-border)] p-2">Data 2</td>
          </tr>
        </tbody>
      </table><br/>`;
    document.execCommand("insertHTML", false, tableHtml);
  };

  const handleInsertAlert = () => {
    const alertHtml = `
      <blockquote class="border-l-4 border-[var(--color-brand)] bg-[var(--color-bg-subtle)] p-3 my-2 rounded-r text-sm font-medium">
        ℹ️ <strong>Note:</strong> Type important context here...
      </blockquote><br/>`;
    document.execCommand("insertHTML", false, alertHtml);
  };

  const handleSaveDraft = () => {
    const draft = {
      title,
      html: editorRef.current?.innerHTML || "",
      selectedCommunity,
      tags,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    showStatus("Draft saved locally");
  };

  const handleLoadDraft = () => {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!saved) {
      showStatus("No saved draft found");
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      if (parsed.title !== undefined) setTitle(parsed.title);
      if (parsed.selectedCommunity !== undefined) setSelectedCommunity(parsed.selectedCommunity);
      if (parsed.tags && Array.isArray(parsed.tags)) setTags(parsed.tags);
      if (parsed.html !== undefined && editorRef.current) {
        editorRef.current.innerHTML = parsed.html;
        setEditorEmpty(editorRef.current.innerText.trim() === "");
      }
      showStatus("Draft restored!");
    } catch {
      showStatus("Failed to restore draft");
    }
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    navigate("/discussions");
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/discussions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Discussions
          </Link>

          {statusMessage && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-xs font-bold animate-fade-in">
              <CheckCircle2 size={14} />
              {statusMessage}
            </div>
          )}
        </div>

        {/* Top Header Row: Select Community pill dropdown & Drafts button */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <button
              type="button"
              onClick={() => setCommunityDropdownOpen(!communityDropdownOpen)}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] font-bold text-sm shadow-sm hover:border-[var(--color-brand)] transition-all cursor-pointer"
            >
              <span>{selectedCommunity || "Select Community"}</span>
              <ChevronDown
                size={16}
                className="text-[var(--color-text-secondary)]"
              />
            </button>

            {communityDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-xl z-50 py-1">
                {COMMUNITIES.map((comm) => (
                  <button
                    key={comm}
                    type="button"
                    onClick={() => {
                      setSelectedCommunity(comm);
                      setCommunityDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{comm}</span>
                    {selectedCommunity === comm && (
                      <Check size={15} className="text-[var(--color-brand)]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleLoadDraft}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-text-primary)] hover:text-[var(--color-brand)] transition-colors cursor-pointer"
          >
            <FileText size={15} className="text-[var(--color-text-secondary)]" />
            Drafts
          </button>
        </div>

        {/* Main Post Editor Form — Clean Reddit Open Layout */}
        <form onSubmit={handlePost} className="space-y-4">
          {/* Title Field */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title*"
              className="w-full text-2xl font-bold text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] bg-transparent border-none outline-none p-0 focus:ring-0"
              required
            />
          </div>

          {/* Add Tags Pill & Selected Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-bg-subtle)] text-xs font-semibold text-[var(--color-text-primary)] border border-[var(--color-border)]"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-[var(--color-brand)] transition-colors cursor-pointer"
                >
                  <X size={13} />
                </button>
              </span>
            ))}

            {!tagInputOpen ? (
              <button
                type="button"
                onClick={() => setTagInputOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-xs font-semibold text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-text-primary)] transition-all cursor-pointer shadow-2xs"
              >
                <TagIcon size={13} />
                Add tags
              </button>
            ) : (
              <div className="inline-flex items-center gap-1 bg-[var(--color-bg-surface)] border border-[var(--color-brand)] rounded-full px-2.5 py-1">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="tag name..."
                  autoFocus
                  className="text-xs font-semibold bg-transparent border-none outline-none w-24 text-[var(--color-text-primary)]"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="text-xs font-bold text-[var(--color-brand)] hover:opacity-80 px-1 cursor-pointer"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setTagInputOpen(false)}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
                >
                  <X size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Hidden File Input for Image Upload */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Clean Open WYSIWYG Editor Area (No Box Border, matching Reddit Image 1) */}
          <div className="pt-4 relative min-h-[220px]">
            {editorEmpty && !editorFocused && (
              <div className="absolute top-4 left-0 text-base text-[var(--color-text-secondary)] pointer-events-none select-none">
                Body text (optional)
              </div>
            )}
            <div
              ref={editorRef}
              contentEditable
              onFocus={() => setEditorFocused(true)}
              onBlur={() => {
                setEditorFocused(false);
                checkEditorEmpty();
              }}
              onInput={() => {
                checkEditorEmpty();
                checkActiveFormats();
              }}
              onKeyUp={checkActiveFormats}
              onMouseUp={checkActiveFormats}
              className="w-full min-h-[200px] text-base text-[var(--color-text-primary)] outline-none prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-brand)] [&_blockquote]:pl-4 [&_h3]:text-xl [&_h3]:font-bold"
            />
          </div>

          {/* Divider & Reddit-Style Active Toolbar at Bottom */}
          <div className="pt-3 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3">
            {/* Left Toolbar Icons with Active Pill Highlights matching Reddit */}
            <div className="flex flex-wrap items-center gap-1.5 text-[var(--color-text-secondary)]">
              <button
                type="button"
                onClick={handleInsertLink}
                title="Insert link"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              >
                <Link2 size={18} />
              </button>
              <button
                type="button"
                onClick={handleImageClick}
                title="Upload image"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              >
                <ImageIcon size={18} />
              </button>

              <span className="h-4 w-px bg-[var(--color-border)] mx-1" />

              <button
                type="button"
                onClick={() => executeCommand("bold")}
                title="Bold (Ctrl+B)"
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base leading-none transition-colors cursor-pointer ${
                  activeFormats.bold
                    ? "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)]"
                    : "hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                B
              </button>
              <button
                type="button"
                onClick={() => executeCommand("italic")}
                title="Italic (Ctrl+I)"
                className={`w-8 h-8 rounded-full flex items-center justify-center italic font-serif text-base leading-none transition-colors cursor-pointer ${
                  activeFormats.italic
                    ? "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)]"
                    : "hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                i
              </button>
              <button
                type="button"
                onClick={() => executeCommand("strikeThrough")}
                title="Strikethrough"
                className={`w-8 h-8 rounded-full flex items-center justify-center line-through font-semibold text-sm leading-none transition-colors cursor-pointer ${
                  activeFormats.strikeThrough
                    ? "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)]"
                    : "hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                S
              </button>
              <button
                type="button"
                onClick={() => executeCommand("superscript")}
                title="Superscript"
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs leading-none transition-colors cursor-pointer ${
                  activeFormats.superscript
                    ? "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)]"
                    : "hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                X²
              </button>
              <button
                type="button"
                onClick={() => executeCommand("formatBlock", "<h3>")}
                title="Heading"
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs tracking-tight leading-none hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              >
                TT
              </button>

              <span className="h-4 w-px bg-[var(--color-border)] mx-1" />

              <button
                type="button"
                onClick={() => executeCommand("insertUnorderedList")}
                title="Bullet list"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  activeFormats.unorderedList
                    ? "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)]"
                    : "hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <List size={18} />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("insertOrderedList")}
                title="Numbered list"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  activeFormats.orderedList
                    ? "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)]"
                    : "hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <ListOrdered size={18} />
              </button>
              <button
                type="button"
                onClick={handleInsertAlert}
                title="Alert box"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              >
                <AlertCircle size={18} />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("formatBlock", "<blockquote>")}
                title="Quote"
                className="w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-sm leading-none hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              >
                66
              </button>
              <button
                type="button"
                onClick={() => executeCommand("formatBlock", "<pre>")}
                title="Code block"
                className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs leading-none hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              >
                &lt;/&gt;
              </button>
              <button
                type="button"
                onClick={handleInsertTable}
                title="Insert table"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              >
                <Table size={18} />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("insertHorizontalRule")}
                title="Insert horizontal divider"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer ml-1"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Right Bottom Actions */}
            <div className="flex items-center gap-2.5 ml-auto">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-5 py-2 rounded-full bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] font-bold text-sm transition-colors cursor-pointer"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-[var(--color-brand)] text-[var(--color-text-inverse)] font-bold text-sm hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
