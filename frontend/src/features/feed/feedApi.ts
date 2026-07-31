import type { FeedIssue, FeedDiscussion, FeedPoll, FeedPollOption } from "./feedTypes";

function parseMeta(metadata?: string): Record<string, unknown> {
  if (!metadata) return {};
  try { return JSON.parse(metadata); } catch { return {}; }
}

function mapIssue(item: { id: string; title: string; category: string; priority?: string; location?: string; createdAt?: string; status?: string; supportsCount?: number; commentsCount?: number; metadata?: string }): FeedIssue {
  const meta = parseMeta(item.metadata);
  return {
    ...meta,
    id: item.id,
    title: item.title,
    category: item.category,
    severity: item.priority === 'CRITICAL' ? 'Critical' : 'High',
    location: item.location || "Unknown Location",
    time: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently",
    status: item.status || "Open",
    supports: item.supportsCount || 0,
    comments: item.commentsCount || 0,
  };
}

function mapDiscussion(item: { id: string; title: string; description: string; createdAt?: string; votesCount?: number; participantCount?: number; commentsCount?: number; location?: string; latitude?: number; longitude?: number; metadata?: string }): FeedDiscussion {
  const meta = parseMeta(item.metadata);
  return {
    ...meta,
    id: item.id,
    title: item.title,
    description: item.description,
    time: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently",
    supports: item.votesCount || 0,
    participantCount: item.participantCount || 0,
    comments: item.commentsCount || 0,
    tags: (meta.tags as string[]) || ["General"],
    tagVariant: (meta.tagVariant as string[]) || ["secondary"],
    participants: (meta.participants as string[]) || [],
    author: (meta.author as string) || "Anonymous",
    location: item.location || "Unknown Location",
    latitude: item.latitude,
    longitude: item.longitude,
  };
}

function mapPoll(item: { id: string; question: string; description: string; expiresAt?: string; votesCount?: number; commentsCount?: number; location?: string; latitude?: number; longitude?: number; govLevel?: string; metadata?: string; optionsJson?: string }): FeedPoll {
  const meta = parseMeta(item.metadata);
  let options: FeedPollOption[] = [];
  if (item.optionsJson) {
    try { options = JSON.parse(item.optionsJson); } catch (err) { console.warn("Failed to parse poll options:", err); }
  }
  return {
    ...meta,
    id: item.id,
    question: item.question,
    description: item.description,
    options,
    time: item.expiresAt ? "Ends " + new Date(item.expiresAt).toLocaleDateString() : "Ongoing",
    votes: item.votesCount || 0,
    comments: item.commentsCount || 0,
    author: (meta.author as string) || "Anonymous",
    location: item.location || "Unknown Location",
    latitude: item.latitude,
    longitude: item.longitude,
    govLevel: item.govLevel,
  };
}

export async function fetchIssues(): Promise<FeedIssue[]> {
  const res = await fetch("/djp/api/v1/issues");
  if (!res.ok) throw new Error("Failed to fetch issues");
  const json = await res.json();
  const data = json.data ?? json;
  return Array.isArray(data) ? data.map(mapIssue) : [];
}

export async function fetchDiscussions(): Promise<FeedDiscussion[]> {
  const res = await fetch("/djp/api/v1/discussions");
  if (!res.ok) throw new Error("Failed to fetch discussions");
  const json = await res.json();
  const data = json.data ?? json;
  return Array.isArray(data) ? data.map(mapDiscussion) : [];
}

export interface FeedPetition {
  id: string;
  title: string;
  description: string;
  category: string;
  signatures: number;
  goal: number;
  author: string;
  daysLeft: number;
  time: string;
}

export async function fetchPetitions(): Promise<FeedPetition[]> {
  const res = await fetch("/djp/api/v1/petitions");
  if (!res.ok) throw new Error("Failed to fetch petitions");
  const responseJson = await res.json();
  const items = responseJson.data || responseJson;
  return Array.isArray(items) ? items.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category || "General",
    signatures: item.signatures || 0,
    goal: item.signatureGoal || 100,
    author: item.author || "Anonymous",
    daysLeft: item.expiresAt ? Math.max(0, Math.ceil((new Date(item.expiresAt).getTime() - Date.now()) / 86400000)) : 30,
    time: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently",
  })) : [];
}

export async function fetchPolls(): Promise<FeedPoll[]> {
  const res = await fetch("/djp/api/v1/polls");
  if (!res.ok) throw new Error("Failed to fetch polls");
  const json = await res.json();
  const data = json.data ?? json;
  return Array.isArray(data) ? data.map(mapPoll) : [];
}