export interface FeedIssue {
  id: string;
  title: string;
  category: string;
  severity: string;
  location: string;
  time: string;
  status: string;
  supports: number;
  comments: number;
  affected?: number;
  author?: string;
  authorInitials?: string;
  authorBg?: string;
  authorColor?: string;
  latitude?: number;
  longitude?: number;
  distance?: string;
  govLevel?: string;
  // Allow additional properties from metadata
  [key: `meta_${string}`]: unknown;
}

export interface FeedDiscussion {
  id: string;
  title: string;
  description: string;
  time: string;
  supports: number;
  participantCount: number;
  comments: number;
  tags: string[];
  tagVariant: string[];
  participants: string[];
  author: string;
  authorInitials?: string;
  authorBg?: string;
  authorColor?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  distance?: string;
  // Allow additional properties from metadata
  [key: `meta_${string}`]: unknown;
}

export interface FeedPollOption {
  label: string;
  pct: number;
  percent?: number;
  primary?: boolean;
}

export interface FeedPoll {
  id: string;
  question: string;
  description: string;
  options: FeedPollOption[];
  time: string;
  votes: number;
  comments: number;
  author: string;
  location: string;
  latitude?: number;
  longitude?: number;
  govLevel?: string;
  distance?: string;
  authorBg?: string;
  authorColor?: string;
  authorInitials?: string;
  // Allow additional properties from metadata
  [key: `meta_${string}`]: unknown;
}