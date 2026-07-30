// Auto-generated from backend OpenAPI spec. Do not edit manually.
// Run: python3 scripts/generate-types.py
// Source: openapi-spec.json

export interface Pollupdaterequestdto {
  question?: string;
  description?: string;
  category?: string;
  options?: string[];
  expiresat?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  govlevel?: string;
}

export interface Pollresponsedto {
  id?: string;
  authorid?: string;
  question?: string;
  description?: string;
  category?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  govlevel?: string;
  optionsjson?: string;
  votescount?: number;
  commentscount?: number;
  expiresat?: string;
  createdat?: string;
  updatedat?: string;
}

export interface Issueupdaterequestdto {
  title?: string;
  description?: string;
  category?: string;
  priority?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  govlevel?: string;
}

export interface Issueresponsedto {
  id?: string;
  authorid?: string;
  title?: string;
  description?: string;
  category?: string;
  priority?: string;
  status?: string;
  workflowstep?: number;
  location?: string;
  latitude?: number;
  longitude?: number;
  govlevel?: string;
  supportscount?: number;
  commentscount?: number;
  createdat?: string;
  updatedat?: string;
}

export interface Discussionupdaterequestdto {
  title?: string;
  content?: string;
  category?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  govlevel?: string;
}

export interface Discussionresponsedto {
  id?: string;
  authorid?: string;
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  govlevel?: string;
  votescount?: number;
  participantcount?: number;
  proposalcount?: number;
  proposalpreview?: string;
  proposalbadge?: string;
  proposalbadgevariant?: string;
  commentscount?: number;
  createdat?: string;
  updatedat?: string;
}

export interface Pollcreaterequestdto {
  question: string;
  description: string;
  category: string;
  optionsjson?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  govlevel?: string;
}

export interface Castvoterequest {
  optionindex?: number;
}

export interface Petitioncreaterequestdto {
  title: string;
  description: string;
  category?: string;
  signaturegoal?: number;
  targetauthority: string;
}

export interface Petitionresponsedto {
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  targetauthority?: string;
  signaturegoal?: number;
  signaturecount?: number;
  author?: string;
  createdat?: string;
  expiresat?: string;
}

export interface Issuecreaterequestdto {
  title: string;
  description: string;
  category: string;
  priority: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  govlevel?: string;
}

export interface Togglevoterequest {
  entityid: string;
  entitytype: string;
  value?: number;
}

export interface User {
  id?: string;
  email?: string;
  name?: string;
  dob?: string;
  gender?: string;
  phonenumber?: string;
  country?: string;
  state?: string;
  district?: string;
  city?: string;
  locality?: string;
  ward?: string;
  constituency?: string;
  provider?: string;
  providerid?: string;
  location?: string;
  pincode?: string;
  occupation?: string;
  bio?: string;
  topics?: string;
  reputationscore?: number;
  subscriptionstatus?: string;
  subscriptionendsat?: string;
  graceperiodendsat?: string;
  onboardingcompleted?: boolean;
  privacyconsentgiven?: boolean;
  privacyconsenttimestamp?: string;
  joineddate?: string;
  role?: string;
}

export interface Vote {
  id?: string;
  user?: User;
  entitytype?: string;
  entityid?: string;
  votevalue?: number;
}

export interface Togglefollowrequest {
  targetid: string;
  targettype: string;
}

export interface Follow {
  id?: string;
  follower?: User;
  targettype?: string;
  targetid?: string;
  createdat?: string;
}

export interface Addcommentrequest {
  content: string;
  entityid: string;
  entitytype: string;
  parentid?: string;
}

export interface Comment {
  id?: string;
  content?: string;
  author?: User;
  parentcomment?: Comment;
  entitytype?: string;
  entityid?: string;
  score?: number;
  createdat?: string;
  updatedat?: string;
}

export interface Discussioncreaterequestdto {
  title: string;
  description: string;
  category: string;
  proposalpreview?: string;
  proposalbadge?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  govlevel?: string;
}

export interface Refreshtokenrequestdto {
  refreshtoken: string;
}

export interface Authresponsedto {
  accesstoken?: string;
  refreshtoken?: string;
  user?: Userdto;
}

export interface Userdto {
  id?: string;
  email?: string;
  fullname?: string;
  avatarurl?: string;
  role?: string;
  dob?: string;
  gender?: string;
  phonenumber?: string;
  location?: string;
  pincode?: string;
  country?: string;
  state?: string;
  district?: string;
  city?: string;
  locality?: string;
  ward?: string;
  constituency?: string;
  occupation?: string;
  bio?: string;
  topics?: string;
  onboardingcompleted?: boolean;
  reputationscore?: number;
}

export interface Onboardingupdaterequestdto {
  name?: string;
  dob?: string;
  gender?: string;
  phonenumber?: string;
  location?: string;
  pincode?: string;
  country?: string;
  state?: string;
  district?: string;
  city?: string;
  locality?: string;
  ward?: string;
  constituency?: string;
  occupation?: string;
  bio?: string;
  topics?: string[];
  privacyconsentgiven?: boolean;
}

export interface Profileupdaterequestdto {
  name?: string;
  dob?: string;
  gender?: string;
  phonenumber?: string;
  location?: string;
  pincode?: string;
  country?: string;
  state?: string;
  district?: string;
  city?: string;
  locality?: string;
  ward?: string;
  constituency?: string;
  occupation?: string;
  bio?: string;
  topics?: string[];
}

export interface Profiledto {
  id?: string;
  fullname?: string;
  dob?: string;
  gender?: string;
  phonenumber?: string;
  location?: string;
  pincode?: string;
  country?: string;
  state?: string;
  district?: string;
  city?: string;
  locality?: string;
  ward?: string;
  constituency?: string;
  occupation?: string;
  bio?: string;
  topics?: string;
  onboardingcompleted?: boolean;
}

export interface Representativeresponsedto {
  id?: string;
  name?: string;
  position?: string;
  ward?: string;
  party?: string;
  since?: string;
  phone?: string;
  email?: string;
  imageinitials?: string;
  avatarbg?: string;
  avatartextcolor?: string;
  issuesresolved?: number;
  meetingsheld?: number;
  attendance?: string;
  biography?: string;
}

export interface Pageable {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface Notification {
  id?: string;
  recipient?: User;
  actor?: User;
  type?: string;
  entityid?: string;
  createdat?: string;
  read?: boolean;
}

export interface Categorybreakdown {
  label?: string;
  count?: number;
  pct?: number;
}

export interface Departmentefficiency {
  dept?: string;
  rate?: number;
  trend?: string;
}

export interface Insightsresponsedto {
  resolutionrate?: number;
  avgresponsetimedays?: number;
  citizensatisfaction?: number;
  issuesreported?: number;
  resolutiontrends?: number[];
  categorybreakdown?: Categorybreakdown[];
  departmentefficiency?: Departmentefficiency[];
  aiinsights?: string[];
  topwards?: Topward[];
  volunteerhours?: number;
  activeprojects?: number;
}

export interface Topward {
  rank?: number;
  name?: string;
  interactions?: string;
}
