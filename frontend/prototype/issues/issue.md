reusable Issue Design System.

That should include components like:

IssueCard
IssueHeader
IssueDescription
IssueMetadata
IssueHealth
EvidenceGallery
AddEvidenceCard
DiscussionThread
CommentCard
Timeline
LocationCard
RelatedIssues
SupportButton

Then every issue type (garbage, pothole, water leakage, streetlight, etc.) simply passes different data into the same components. This will make your frontend significantly easier to maintain as DJ grows beyond the pilot.