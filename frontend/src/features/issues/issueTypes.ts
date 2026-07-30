import type { CommentData } from "../../shared/components/comments";

export interface IssueData {
  id: string;
  category: string;
  severity: string;
  title: string;
  description: string;
  location: string;
  address: string;
  distance: string;
  time: string;
  govLevel: string;
  supports: number;
  commentsCount: number;
  affected: string;
  image: string;
  imageCount: number;
  verified: boolean;
  iconBg: string;
  iconColor: string;
  icon: React.ElementType;
  health: [string, string][];
  related: { title: string; dist: string }[];
  author?: string;
  authorInitials?: string;
  authorBg?: string;
  authorColor?: string;
  timeline: string[];
  comments: CommentData[];
}

export interface IssueMeta {
  author?: string;
  authorInitials?: string;
  authorBg?: string;
  authorColor?: string;
  affected?: string;
  distance?: string;
  govLevel?: string;
  image?: string;
  imageCount?: number;
  verified?: boolean;
}