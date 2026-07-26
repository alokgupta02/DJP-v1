import { useState } from "react";
import { Plus, Minus, ArrowBigUp, ArrowBigDown, MessageSquare, Share2, ExternalLink } from "lucide-react";
import clsx from "clsx";
import { toggleVote, addComment } from "../../../features/interactions/interactionsApi";

export type CommentData = {
  id: string;
  initials: string;
  bg: string;
  textColor: string;
  name: string;
  time: string;
  text: string;
  score: number;
  replies?: CommentData[];
  entityId?: string; // used for api calls
  entityType?: string;
};

export function CommentInput({ entityId, entityType, parentId, onCommentAdded }: { entityId?: string, entityType?: string, parentId?: string, onCommentAdded?: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (!content.trim() || !entityId || !entityType) return;
    setIsSubmitting(true);
    try {
      await addComment(content, entityId, entityType, parentId);
      setContent("");
      setIsExpanded(false);
      if (onCommentAdded) onCommentAdded();
    } catch (e) {
      console.error(e);
      alert("Failed to submit comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-6">
      {isExpanded ? (
        <div className="border border-[var(--color-brand)] rounded-xl overflow-hidden bg-[var(--color-bg-surface)] shadow-sm focus-within:ring-1 focus-within:ring-[var(--color-brand)]">
          <textarea 
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What are your thoughts?" 
            className="w-full p-4 bg-transparent resize-none text-[var(--color-text-primary)] outline-none min-h-[120px]"
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center bg-[var(--color-bg-subtle)] px-4 py-2 border-t border-[var(--color-border)]">
            <button aria-label="Open in full page" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors"><ExternalLink size={18} /></button>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsExpanded(false)} 
                className="px-4 py-1.5 rounded-full text-sm font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting || !content.trim()}
                className="px-4 py-1.5 rounded-full text-sm font-semibold bg-[var(--color-brand)] text-[var(--color-text-inverse)] hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Posting..." : "Comment"}
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

export function CommentThread({ comment }: { comment: CommentData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [score, setScore] = useState(comment.score || 0);
  const [isReplying, setIsReplying] = useState(false);

  const hasMultipleBranches = (c: CommentData): boolean => {
    if (!c.replies || c.replies.length === 0) return false;
    if (c.replies.length > 1) return true;
    return hasMultipleBranches(c.replies[0]);
  };

  const showTreeUI = hasMultipleBranches(comment);

  const handleVote = async (value: number) => {
    if (!comment.entityId || !comment.entityType) return;
    try {
      // Optimistic
      setScore(score + value);
      await toggleVote(comment.entityId, comment.entityType, value);
    } catch (e) {
      setScore(score); // revert
      console.error(e);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this comment',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="mt-4 text-sm">
      {/* Header Row */}
      <div className="flex items-center gap-2 mb-1">
        <div 
          className={clsx("w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 cursor-pointer hover:opacity-80 transition-opacity", comment.bg || 'bg-gray-200', comment.textColor || 'text-gray-800')} 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {comment.initials || comment.name?.charAt(0) || 'U'}
        </div>
        <span 
          className="font-bold text-[var(--color-text-primary)] text-xs cursor-pointer hover:underline"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {comment.name}
        </span>
        <span className="text-[var(--color-text-secondary)] text-xs">• {comment.time}</span>
        {isCollapsed && (
          <button 
            aria-label="Expand comment"
            onClick={() => setIsCollapsed(false)}
            className="ml-1 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] rounded-full min-w-[32px] min-h-[32px] flex items-center justify-center transition-colors"
          >
            <Plus size={14} />
          </button>
        )}
      </div>

      {/* Body Row */}
      {!isCollapsed && (
        <div className="flex">
          {/* Thread Line Column */}
          <div 
            className={`relative flex flex-col items-center w-7 shrink-0 ${showTreeUI ? "cursor-pointer group" : ""}`}
            onClick={() => showTreeUI && setIsCollapsed(true)}
          >
            {showTreeUI && (
              <>
                <div className="w-[2px] bg-[var(--color-border)] grow mt-1 mb-1 group-hover:bg-[var(--color-brand)] transition-colors" />
                <div className="absolute top-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-brand)] shadow-sm rounded-full p-0.5 transition-all hover:bg-[var(--color-brand)] hover:text-white hover:border-[var(--color-brand)]">
                  <Minus size={12} strokeWidth={3} />
                </div>
              </>
            )}
          </div>

          {/* Content Column */}
          <div className="flex-1 pl-2 pb-2">
             <p className="text-[var(--color-text-primary)] mb-2 leading-relaxed whitespace-pre-wrap">{comment.text}</p>
             
             {/* Action Bar */}
             <div className="flex flex-wrap items-center gap-1 -ml-2 text-[var(--color-text-secondary)] font-bold text-xs">
                <div className="flex items-center rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors ml-2">
                  <button aria-label="Upvote" onClick={() => handleVote(1)} className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-orange-500 rounded-l-full transition-colors"><ArrowBigUp size={16} /></button>
                  <span className="px-1 text-[var(--color-text-primary)]">{score}</span>
                  <button aria-label="Downvote" onClick={() => handleVote(-1)} className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-blue-500 rounded-r-full transition-colors"><ArrowBigDown size={16} /></button>
                </div>
                <button 
                  aria-label="Reply"
                  onClick={() => setIsReplying(!isReplying)}
                  className="flex items-center justify-center gap-1.5 px-4 min-h-[44px] hover:bg-[var(--color-bg-subtle)] rounded-full transition-colors"
                >
                  <MessageSquare size={16} /> Reply
                </button>
                <button aria-label="Share" onClick={handleShare} className="flex items-center justify-center gap-1.5 px-4 min-h-[44px] hover:bg-[var(--color-bg-subtle)] rounded-full transition-colors">
                  <Share2 size={16} /> Share
                </button>
             </div>

             {/* Reply Input Box */}
             {isReplying && (
               <div className="mt-4 pr-4">
                 <CommentInput 
                   entityId={comment.entityId} 
                   entityType={comment.entityType} 
                   parentId={comment.id}
                   onCommentAdded={() => setIsReplying(false)}
                 />
               </div>
             )}
             
             {/* Nested replies */}
             {comment.replies && comment.replies.length > 0 && (
               <div className="mt-1">
                 {comment.replies.map(reply => (
                   <CommentThread key={reply.id} comment={reply} />
                 ))}
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
}
