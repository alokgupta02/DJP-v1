import type { CommentData } from "../../shared/components/comments";

export interface DiscussionTag {
  label: string;
  variant: string;
}

export interface DiscussionSection {
  title: string;
  content: string[];
}

export interface DiscussionPoll {
  question: string;
  options: { label: string; percent: number; color: string }[];
  votes: string;
}

export interface DiscussionRelated {
  title: string;
  meta: string;
}

export interface DiscussionTrending {
  0: string;
  1: string;
}

export interface DiscussionMeta {
  author?: string;
  authorInitials?: string;
  authorBg?: string;
  authorColor?: string;
}

export interface DiscussionData {
  id: string;
  tags: DiscussionTag[];
  title: string;
  subtitle: string;
  author: string;
  authorInitials?: string;
  authorBg?: string;
  authorColor?: string;
  time: string;
  supports: number;
  commentsCount: number;
  participants: number;
  sections: DiscussionSection[];
  aiSummary: string;
  aiCommon: string[];
  aiAlt: string[];
  comments: CommentData[];
  status: [string, string][];
  poll: DiscussionPoll;
  related: DiscussionRelated[];
  topics: string[];
  trending: DiscussionTrending[];
}