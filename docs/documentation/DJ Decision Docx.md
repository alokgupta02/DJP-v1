

| People scrolling a feed make decisions in about 2 seconds: Is this near me? Is this affecting many people? Is it already being solved? Is this real? Can I help? First: What is the purpose of the feed? Before adding components, define the job. For DJ, an issue card should allow a citizen to decide: Should I open this? Should I support it? Should I ignore it? Should I report duplicate? Should I contribute evidence? Think about user intent A citizen scrolling the feed is usually in one of these modes: Browsing ("What's happening around me?") Supporting ("Yes, this affects me.") Opening an issue ("I want to know more.") |
| :---- |

| Issue Category: |
| :---- |
| Proposal Question Suggestion Feedback Announcement Discussion Survey |

| Government level: |
| :---- |
| Ward Municipality State National Legislative Judiciary Executive |

				

| Engagement actions: |
| :---- |
| Support Comment Add Photo Confirm Share Track Report Duplicate |

| Impact:  🚶 Pedestrian Safety 🚗 Traffic Disruption 🌧 Monsoon Damage 🏥 Emergency Route |
| :---- |

| Progress: ● Report Submitted ● Community Verified ● Assigned to Sanitation Dept ○ Inspection Scheduled ○ Cleanup In Progress ○ Resolved |
| :---- |

**don't create separate card designs for potholes, garbage, streetlights, water leaks, etc.** Use a **single generic `IssueCard` component** and only swap the data (icon, category, priority color, status, counts). That will make the UI consistent and much easier to maintain as you add dozens of issue types later.

I think the top of every issue page should answer these five questions, in order:

1. **What is the issue?** (Title)  
2. **What exactly is happening?** (Description)  
3. **Where is it?** (Location)  
4. **How serious is it?** (Priority, Status, Verification)  
5. **Who is affected?** (Impact summary \+ affected citizens)

## Issue Detail Page:

| That should include components like: `IssueCard			 IssueHeader IssueDescription IssueMetadata IssueHealth EvidenceGallery AddEvidenceCard DiscussionThread CommentCard Timeline LocationCard RelatedIssues SupportButton` |
| :---- |

The Issue Detail Page should not feel like a long form. It should feel like an incident dashboard—something a citizen, government official, or journalist can scan in under a minute. reusable **Issue Design System**:  

# **Recommended Layout**

**┌─────────────────────────────────────────────────────────────────────┐**  
**│ Breadcrumb                                                          						 │**  
**├─────────────────────────────────────────────────────────────────────┤**  
**│ Title \+ Category \+ Priority \+ Verification \+ Support               					 │**  
**│ Brief Description                                                 						 │**  
**├──────────────────────┬──────────────────────────────────────────────┤**  
**│ Evidence Gallery     │ Location Map                                						 │**  
**├──────────────────────┴──────────────────────────────────────────────┤**  
**│ Current Status / Government Progress                               					 │**  
**├─────────────────────────────────────────────────────────────────────┤**  
**│ Timeline                                                          							 │**  
**├─────────────────────────────────────────────────────────────────────┤**  
**│ Citizen Discussion                                                  						 │**  
**├─────────────────────────────────────────────────────────────────────┤**  
**│ Related Issues                                                     						 │**  
**└─────────────────────────────────────────────────────────────────────┘**

| State (status languages) | Icon Halo | Status Badge |
| :---- | :---- | :---- |
| Newly Reported | Gray | Open |
| Community Verified | Green | Open |
| Under Government Review | Blue | In Review |
| Work Started | Orange | In Progress |
| Resolved | Green \+ Check | Resolved |
| Rejected | Red | Rejected |

									    

| Information hierarchy The page should answer these questions in this exact order: What is the issue? Why is it important? Where is it? Is it verified? What evidence exists? What is the government doing? What has happened so far? What are citizens saying? Are similar issues nearby? What action can I take? |
| :---- |

| Issue Something objectively wrong. Garbage Pothole Broken light  | Discussion Open-ended conversation. A Debate without a predefined solution. Should schools ban plastic? Should roads become one-way? How can traffic improve? "Why are court cases increasing?" → Discussion. | Proposal A concrete suggestion. A suggested solution that people can support and refine. "Digitize district court records nationwide." → Proposal. Build park Install CCTV Paint cycle lane Plant trees | Polls Structured opinion gathering. "Should district courts remain open on Saturdays?" → Poll.  |
| :---- | :---- | :---- | :---- |

| Meaning (Icon consistency) | Icon |
| ----- | :---: |
| Support | 👍 |
| Comment | 💬 |
| Citizens affected / interested | 👥 |
| Government Level | 🏛 |
| Location | 📍 |
| Time | 🕒 |
| Share | ↗ |
| Evidence | 📷 |

## 

| One primary object, Discussion, Then attach one or more tags. Examples: \<TAGS\> 💡 Proposal ❓ Question 🗣 Debate 📢 Announcement 📚 Awareness 📄 Policy 📈 Analysis 📝 Feedback 💡 Proposal: Should Balewadi Convert the Empty Plot into a Community Park? ❓ Question: Why are pending court cases continuously increasing? 🗣 Debate: Should India adopt compulsory voting? 📄 Policy: Draft Parking Policy for Ward 23 📢 Awareness: Property tax payment deadline extended. 📈 Analysis: Inflation has increased by 6% over the last year... |
| :---- |

		  
			

| Single Discussion Page: ├── Title ├── Description ├── Author ├── Scope (Ward / State / National) ├── Tags (Proposal, Question, Policy...) ├── 👍 Support ├── 💬 Comments ├── Participants (JD MK \+21 discussing) └── Created At |
| :---- |

## 

| I think every submission in DJ should answer three questions immediately What is this? Issue Discussion Poll What governance area? Garbage Judiciary Transport Education Where does it apply? Ward 23 Balewadi Pune Maharashtra India | How data in sidebar is different from main feed view ? (which also has issues, discussion and polls) Feed \=  browsing content; Sidebar \= highlighting what's currently important or relevant. If the sidebar is just another view of the feed, it shouldn't exist.Main Feed \= Primary Content The feed is where users consume and interact. It is designed for reading. Feed answers What exists? Sidebar \= Navigation The sidebar should answer: "What should I look at next?" Sidebar answers Which ones deserve my attention? The feed is for discovery. The detail page is for participation. |
| :---- | :---- |

## 

| Discussion Detail Page: Discussion Header ────────────────────────── Type • Domain • Scope Title Description Author • Date Support • Comments • Share ────────────────────────── Community Summary (AI) ────────────────────────── Discussion / Comments ────────────────────────── Sidebar ────────────── 📊 Attached Poll ✍ Petition (Future) 💬 Related Discussions ────────────── Discussion Type (Question / Proposal / Debate / Suggestion / AMA) Governance Domain (Judiciary, Transport, Economy, Education, etc.) Geographic Scope (Ward / City / State / India)  |  |
| :---- | :---- |

