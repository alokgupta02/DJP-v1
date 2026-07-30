import type { CommentData } from "../../shared/components/comments";

export interface PollOption {
  label: string;
  pct: number;
  primary: boolean;
  color: string;
}

export interface PollData {
  id: string;
  category: string;
  title: string;
  description: string;
  author: string;
  authorInitials?: string;
  authorBg?: string;
  authorColor?: string;
  time: string;
  supports: number;
  commentsCount: number;
  participants: number;
  options: PollOption[];
  aiSummary: string;
  aiCommon: string[];
  topics: string[];
  comments: CommentData[];
}

export interface PollMeta {
  author?: string;
  authorInitials?: string;
  authorBg?: string;
  authorColor?: string;
}