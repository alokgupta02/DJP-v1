# 👤 Digital Janta Platform — User Personas

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Fictional user profiles representing target DJP platform users. Guides feature design, UX decisions, and engineering priorities based on real user behavior patterns and needs. |
| **📅 Last Updated** | `2026-07-25` |
| **🏷️ Status / Version** | `v1.0.0` |
| **👥 Owner / Worker** | `Worker/Who: [PM Agent | Antigravity (Gemini)]` |
| **🔗 Upstream / Dependencies** | [party-vision.md](../vision/party-vision.md), [vision-core-draft.md](../vision/vision-core-draft.md), [DJ Decision Docx.md](./DJ%20Decision%20Docx.md), [design-principles.md](../ux/design-principles.md), [roadmap.md](../vision/roadmap.md) |

---

> [!IMPORTANT]
> These personas are the **primary lens** through which all feature design, UI layout, information hierarchy, and engagement mechanics should be evaluated. Every screen, component, and interaction should answer: *"Does this serve one of these people?"*

---

## How to Use This Document

1. **Designers** — Reference personas when wireframing screens. Ask: "Would Ananya find this button? Would Rajan understand this workflow?"
2. **Developers** — Use persona context to prioritize feature implementation. Ananya's mobile-first need outweighs desktop polish.
3. **Product Managers** — Validate PRD acceptance criteria against persona goals and frustrations.
4. **QA Engineers** — Write test scenarios from each persona's perspective and device context.

---

## Persona Index

| # | Name | Archetype | Role | Primary Device | Key Action |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | **Ananya Sharma** | The Concerned Citizen | Citizen | 📱 Mobile | Reports issues, browses feed |
| 2 | **Rajan Malhotra** | The Civic Watchdog | Citizen (Power User) | 📱 Mobile + 💻 Laptop | Verifies, discusses, tracks progress |
| 3 | **Priya Deshmukh** | The Community Organizer | Leader (Area) | 📱 Mobile | Organizes volunteer campaigns |
| 4 | **Vikram Joshi** | The Policy Thinker | Citizen (Intellectual) | 💻 Desktop | Leads discussions, creates polls |
| 5 | **Sunita Devi** | The First-Time Digital User | Citizen (New) | 📱 Budget Phone | Needs simplest possible UX |
| 6 | **Arjun Patil** | The Aspiring Ward Leader | Leader (Ward) | 📱 Mobile + 💻 Tablet | Coordinates multi-area campaigns |

---

## Persona 1: Ananya Sharma — *"The Concerned Citizen"*

### 📋 Profile Summary

| Attribute | Detail |
| :--- | :--- |
| **Age** | 28 |
| **Gender** | Female |
| **Occupation** | UX Designer at a Pune-based tech startup |
| **Location** | Balewadi, Pune — Ward 23 |
| **Education** | B.Des (NID Ahmedabad) |
| **Digital Literacy** | High |
| **Primary Device** | iPhone 15 (mobile-first user) |
| **Internet** | 4G + Home Wi-Fi |
| **Languages** | English, Hindi, Marathi |
| **Monthly Income** | ₹75,000 |

### 🎯 Goals & Motivations

- **Immediate Goal:** Report the overflowing garbage bin near her society gate that hasn't been cleared for 4 days.
- **Underlying Motivation:** Believes that if enough citizens document problems with evidence, local officials will be forced to act.
- **Long-Term Aspiration:** Wants her neighborhood to be safe, clean, and walkable. Dreams of a community park on the empty plot near her home.
- **Why She Uses DJP:** Traditional complaint portals (311, municipal apps) feel like black holes — submit and forget. DJP shows her that 96 other citizens support the same issue, giving her confidence that collective pressure works.

### 🧠 Behavioral Patterns

| Behavior | Detail |
| :--- | :--- |
| **Session Frequency** | 3–4 times per week, 5–8 minutes each |
| **Peak Usage** | Morning commute (8:30 AM) and post-dinner (9 PM) |
| **Primary Actions** | Browse feed → Support issues nearby → Occasionally report a new issue with photo evidence |
| **Content Creation** | Reports ~1 issue per month, comments on 3–4 issues weekly |
| **Feed Decision Speed** | **2 seconds** — scans title, location proximity, and support count before deciding to tap |
| **Verification** | Verifies 1–2 resolved issues per month when she walks past them |

### 📱 User Journey (Typical Session)

```
Open App → Feed (What's happening near me?)
  ↓
Scan issue cards → "Is this near me?" → "How many support it?"
  ↓
Tap "Support" on 2 issues → Read comments on 1
  ↓
Notice new pothole on her street → Tap "+ Create" → Select "Issue"
  ↓
Fill title + description → Add 2 photos → Set location (auto-detected)
  ↓
Select category: "Roads" → Priority: auto-suggested "High"
  ↓
Submit → See confirmation toast → Close app (total: 6 minutes)
```

### 😤 Frustrations & Pain Points

- **"I reported a pothole 6 months ago on the municipal app. Zero response."** — Needs visible progress tracking and community validation.
- **"Too many irrelevant issues in my feed from other wards."** — Needs strong location-based filtering.
- **"I don't trust anonymous reports."** — Values verified citizen profiles and evidence photos.
- **"Long forms kill my motivation to report."** — Needs progressive disclosure: minimum viable fields upfront, optional details later.

### 💡 Design Implications for Ananya

| Principle | Implementation |
| :--- | :--- |
| **2-Second Feed Decision** | Issue card must show: Title, Category Icon, Location proximity ("140m away"), Support count, and Status badge — all above the fold. |
| **Mobile-First Issue Reporting** | Camera-first flow: tap photo → auto-fill location → type title → submit. Description and category are secondary. |
| **Progressive Disclosure** | Show 3 required fields first (Title, Photo, Location). Reveal category, priority, and tags only after initial submission. |
| **Trust Signals** | Show "✓ Community Verified" badge, author reputation score, and evidence photo count on every issue card. |

### 📊 Key Metrics to Track for This Persona

- Time from app open to first "Support" action (target: < 15 seconds)
- Issue report completion rate (target: > 80%)
- Return rate within 7 days (target: > 60%)

---

## Persona 2: Rajan Malhotra — *"The Civic Watchdog"*

### 📋 Profile Summary

| Attribute | Detail |
| :--- | :--- |
| **Age** | 45 |
| **Gender** | Male |
| **Occupation** | Retired Army Colonel, now a social activist |
| **Location** | Sector 4, South Delhi — Ward 42 |
| **Education** | MA Political Science (JNU) |
| **Digital Literacy** | Moderate-High |
| **Primary Device** | Samsung Galaxy A54 (mobile) + Lenovo ThinkPad (desktop for deep reading) |
| **Internet** | 4G + Broadband |
| **Languages** | Hindi, English |
| **Monthly Income** | ₹1,20,000 (pension + consultancy) |

### 🎯 Goals & Motivations

- **Immediate Goal:** Track whether the drainage repair promised by Ward 42 councillor has actually been completed — and verify it personally.
- **Underlying Motivation:** Deeply suspicious of government claims. Believes citizens must independently verify every resolution.
- **Long-Term Aspiration:** Build a transparent public record of government performance in his ward that holds officials accountable.
- **Why He Uses DJP:** The Double-Lock Verification system (AI photo comparison + GPS proximity voting) resonates with his military precision. He trusts evidence, not promises.

### 🧠 Behavioral Patterns

| Behavior | Detail |
| :--- | :--- |
| **Session Frequency** | Daily, 15–30 minutes |
| **Peak Usage** | Morning (6:30 AM) and late evening (10 PM) |
| **Primary Actions** | Deep-dive into issue timelines → Verify resolutions on walks → Write detailed discussion posts → Vote in every relevant poll |
| **Content Creation** | Posts 2–3 detailed discussions per week, comments extensively with citations |
| **Feed Decision Speed** | **Deliberate reader** — reads full descriptions, checks evidence gallery, reviews government progress |
| **Verification** | Most active verifier in Ward 42 — verifies 5–8 issues weekly during morning walks |

### 📱 User Journey (Typical Session)

```
Open App → Navigate to Issues page → Filter: "Ward 42" + "Status: Resolved"
  ↓
Open resolved issue → Inspect Before/After photos → Check verification votes
  ↓
Walk to location → Take "After" photo → Submit verification (GPS auto-confirmed)
  ↓
Switch to Discussions → Read policy debate on traffic → Post detailed counterargument
  ↓
Navigate to Polls → Vote on "Should Ward 42 implement No Car Sundays?"
  ↓
Check representative profile → Note promise fulfillment percentage → Logout (total: 25 min)
```

### 😤 Frustrations & Pain Points

- **"The government marks issues as 'resolved' without any proof."** — Needs robust Before/After evidence with community verification.
- **"Discussions get flooded with low-effort comments."** — Values quality contributions and wants reputation-weighted visibility.
- **"I want to see the full history of an issue — not just the current status."** — Needs a detailed timeline view.
- **"The data should be open and auditable."** — Expects transparency in moderation and resolution decisions.

### 💡 Design Implications for Rajan

| Principle | Implementation |
| :--- | :--- |
| **Issue Detail as Dashboard** | The Issue Detail Page must feel like an "incident dashboard" scannable in under 1 minute: Header → Evidence Gallery → Government Progress → Timeline → Discussion. |
| **Verification Flow** | One-tap "Verify This Fix" button that activates camera, captures GPS coordinates, and submits to AI comparison — all within 30 seconds. |
| **Discussion Quality** | Reputation-based comment sorting. Verified citizen badges. Ability to cite other issues/data in discussions. |
| **Timeline Transparency** | Full chronological audit trail: Reported → Verified → Assigned → In Progress → Resolved → Community Confirmed. |

### 📊 Key Metrics to Track for This Persona

- Verifications submitted per week (target: 5+)
- Average time spent on Issue Detail page (target: > 2 minutes)
- Discussion engagement rate (comments per post)

---

## Persona 3: Priya Deshmukh — *"The Community Organizer"*

### 📋 Profile Summary

| Attribute | Detail |
| :--- | :--- |
| **Age** | 34 |
| **Gender** | Female |
| **Occupation** | School teacher + Resident Welfare Association (RWA) Secretary |
| **Location** | Market Road, Pune — Ward 23 |
| **Education** | B.Ed (Pune University) |
| **Digital Literacy** | Moderate |
| **Primary Device** | Redmi Note 13 Pro (Android, mobile-only) |
| **Internet** | 4G (limited data plan — 2GB/day) |
| **Languages** | Marathi, Hindi, basic English |
| **Monthly Income** | ₹45,000 |

### 🎯 Goals & Motivations

- **Immediate Goal:** Organize a volunteer cleanup drive for the clogged drain on Market Road before the next monsoon rains.
- **Underlying Motivation:** She's the one people in her neighborhood turn to when things go wrong. DJP gives her the tools to scale her grassroots organizing from WhatsApp groups to a structured platform.
- **Long-Term Aspiration:** Become an officially recognized Area Leader in the DJP hierarchy, and eventually represent her locality.
- **Why She Uses DJP:** The reputation system rewards her work visibly. The paid Leader subscription signals that she's serious, not casual. The Dynamic Rank system (rolling 6-month score) keeps her accountable.

### 🧠 Behavioral Patterns

| Behavior | Detail |
| :--- | :--- |
| **Session Frequency** | Multiple times daily, 3–5 minutes each |
| **Peak Usage** | After school hours (3:30 PM) and Sunday mornings |
| **Primary Actions** | Check campaign status → Respond to volunteer messages → Create new campaigns for solvable issues → Monitor reputation score |
| **Content Creation** | Creates 1–2 volunteer campaigns per month, reports 3–4 issues |
| **Leadership Actions** | Coordinates 15–20 local volunteers via the app |
| **Data Sensitivity** | Conscious of mobile data usage — prefers lightweight, text-first UI |

### 📱 User Journey (Typical Session)

```
Open App → Check notification: "3 new volunteers joined your Drain Cleanup drive"
  ↓
Open campaign → View volunteer roster → Send group update message
  ↓
Browse Issues (nearby, solvable) → Spot new garbage issue on Market Road
  ↓
AI suggests: "Solvable — Community Cleanup Recommended"
  ↓
Create Volunteer Campaign → Set date (Sunday 7 AM) → Set meeting point
  ↓
Share campaign link to WhatsApp RWA group → Close app (total: 5 min)
```

### 😤 Frustrations & Pain Points

- **"WhatsApp groups are chaotic. I can't track who showed up and what got done."** — Needs structured campaign management with volunteer check-ins and photo evidence.
- **"My data plan is limited — the app can't be image-heavy by default."** — Needs lazy-loaded images and text-first card layouts.
- **"I need to know if my reputation is enough to maintain my Leader status."** — Wants clear, visible reputation score and threshold indicators.
- **"I'm doing all this work and nobody knows. My RWA president gets all the credit."** — Values public recognition, badges, and a permanent lifetime profile score.

### 💡 Design Implications for Priya

| Principle | Implementation |
| :--- | :--- |
| **Campaign Dashboard** | Dedicated Leader view showing active campaigns, volunteer count, completion status, and AI-categorized "Solvable Issues Near You" feed. |
| **Data-Lite Mode** | Lazy-load all images. Text-first issue cards. Compress photos before upload. Show data usage estimate before uploading evidence. |
| **Reputation Transparency** | Always-visible reputation badge with progress bar toward next rank threshold. Clear "6-month rolling score" vs "Lifetime score" distinction. |
| **WhatsApp Integration** | One-tap "Share to WhatsApp" for campaigns with a deep link back to the app. |

### 📊 Key Metrics to Track for This Persona

- Campaign creation-to-completion rate (target: > 70%)
- Volunteer retention across campaigns (target: > 50% return volunteers)
- Reputation growth velocity (points/month)

---

## Persona 4: Vikram Joshi — *"The Policy Thinker"*

### 📋 Profile Summary

| Attribute | Detail |
| :--- | :--- |
| **Age** | 52 |
| **Gender** | Male |
| **Occupation** | Retired IAS officer, now a policy researcher and columnist |
| **Location** | Civil Lines, New Delhi |
| **Education** | IIT Delhi (B.Tech) + IIM Ahmedabad (MBA) |
| **Digital Literacy** | High |
| **Primary Device** | MacBook Pro (desktop-first user) + iPad for reading |
| **Internet** | Broadband (unlimited) |
| **Languages** | English, Hindi |
| **Monthly Income** | ₹2,50,000 |

### 🎯 Goals & Motivations

- **Immediate Goal:** Start a public discussion on whether Delhi should mandate solar rooftop panels for all commercial buildings, with an attached poll to measure citizen sentiment.
- **Underlying Motivation:** Believes that good policy emerges from informed public debate, not closed-door bureaucratic decisions. Wants to bring his governance expertise to the common citizen.
- **Long-Term Aspiration:** Build a repository of well-reasoned civic policy proposals that any ward leader or elected official can adopt.
- **Why He Uses DJP:** The Discussion + Poll system allows him to present nuanced policy ideas and instantly gauge public response — something no other Indian platform offers.

### 🧠 Behavioral Patterns

| Behavior | Detail |
| :--- | :--- |
| **Session Frequency** | 4–5 times per week, 20–40 minutes each |
| **Peak Usage** | Late evening (9 PM – 11 PM) |
| **Primary Actions** | Write long-form discussion posts → Attach polls → Read and respond to citizen comments → Analyze poll results |
| **Content Creation** | Posts 1 detailed discussion per week (800–1500 words), creates 2–3 polls per month |
| **Discussion Tags Used** | 💡 Proposal, 📄 Policy, 📈 Analysis, 🗣 Debate |
| **Reading Pattern** | Desktop-first, reads full discussion threads, values data and citations |

### 📱 User Journey (Typical Session)

```
Open App (Desktop) → Navigate to Discussions → Click "+ Start Discussion"
  ↓
Select tags: "💡 Proposal" + "📄 Policy" → Set scope: "State — Delhi"
  ↓
Write detailed post on solar mandate → Add data sources and cost analysis
  ↓
Attach Poll: "Should Delhi mandate solar rooftops for commercial blocks?"
  → Options: "Yes, fully subsidized" / "Yes, partial subsidy" / "No, voluntary only" / "Need more data"
  ↓
Publish → Share to LinkedIn → Return in 2 hours to respond to comments (total: 35 min)
```

### 😤 Frustrations & Pain Points

- **"Twitter/X is noise. Reddit India is anonymous trolls."** — Wants a platform where verified citizens engage with real civic issues.
- **"My policy analysis posts get lost in a generic feed."** — Needs topic-based filtering (the TopicFilterBar!) and discussion type tags.
- **"I can't attach a poll to my discussion on any other platform."** — Values the integrated Discussion + Poll mechanism.
- **"I need to write long-form content comfortably."** — Needs a desktop-optimized rich-text editor with markdown support.

### 💡 Design Implications for Vikram

| Principle | Implementation |
| :--- | :--- |
| **Discussion Type Tags** | Prominent tag system (💡 Proposal, ❓ Question, 🗣 Debate, 📄 Policy, 📈 Analysis) with filtering in the TopicFilterBar. |
| **Scope Selector** | Clear governance scope selector: Ward → City → State → National, with ELJ sphere indicators (Executive, Legislative, Judiciary). |
| **Rich Discussion Editor** | Desktop-optimized editor supporting markdown, inline citations, embedded data, and attached polls. |
| **AI Community Summary** | AI-generated summary of discussion threads showing key arguments, sentiment breakdown, and consensus status. |

### 📊 Key Metrics to Track for This Persona

- Discussion engagement depth (avg. comments per discussion: target > 15)
- Poll participation rate on attached polls (target: > 200 votes within 48 hours)
- Content quality score (reputation earned per post)

---

## Persona 5: Sunita Devi — *"The First-Time Digital User"*

### 📋 Profile Summary

| Attribute | Detail |
| :--- | :--- |
| **Age** | 55 |
| **Gender** | Female |
| **Occupation** | Homemaker + runs a small tailoring business from home |
| **Location** | Sector 7, Dwarka, New Delhi — Ward 38 |
| **Education** | 10th standard |
| **Digital Literacy** | Low — uses phone primarily for WhatsApp calls and YouTube |
| **Primary Device** | Samsung Galaxy M14 (budget Android, 4GB RAM) |
| **Internet** | 4G (1.5GB/day Jio plan) |
| **Languages** | Hindi (primary), can read Devanagari only |
| **Monthly Income** | ₹15,000 |

### 🎯 Goals & Motivations

- **Immediate Goal:** Report that the streetlight outside her lane has been broken for 2 weeks and it's dangerous for women walking at night.
- **Underlying Motivation:** She has never filed a formal government complaint in her life. Her son showed her this app and said "Mummy, bas photo lo aur bhej do" (Just take a photo and send it).
- **Long-Term Aspiration:** Wants to feel that her voice matters — that a housewife in Dwarka can actually get a streetlight fixed.
- **Why She Uses DJP:** It's simpler than any government portal. She doesn't need to know file numbers, department names, or complaint categories. Just take a photo.

### 🧠 Behavioral Patterns

| Behavior | Detail |
| :--- | :--- |
| **Session Frequency** | Once a week (when something bothers her enough) |
| **Peak Usage** | Evening (7 PM) — after dinner, when she has free time |
| **Primary Actions** | Open app → Tap big "Create" button → Take photo → Send |
| **Content Creation** | Reports 1 issue every 2–3 months |
| **Navigation Comfort** | Gets confused by multiple tabs, filters, and dropdowns. Prefers large buttons with Hindi labels. |
| **Trust Mechanism** | Trusts the app more if her neighbor (Geeta ji) also uses it |

### 📱 User Journey (Typical Session)

```
Son opens app for her → She sees the big red "+ Create" button
  ↓
Taps "Issue" (shown with icon + Hindi label: "शिकायत दर्ज करें")
  ↓
Camera opens → Takes photo of broken streetlight
  ↓
Location auto-detected → Title suggested by AI: "Broken Streetlight" (in Hindi)
  ↓
She taps "Submit" → Green confirmation: "✅ आपकी शिकायत दर्ज हो गई है"
  ↓
Done. Total: 90 seconds. She hands the phone back to her son.
```

### 😤 Frustrations & Pain Points

- **"Itne saare button hain, kaunsa dabaun?"** (So many buttons, which one to press?) — Overwhelmed by complex UI.
- **"English mein sab kuch hai"** (Everything is in English) — Needs full Hindi (Devanagari) interface.
- **"Phone slow ho jaata hai"** (Phone becomes slow) — App must be lightweight, < 5MB initial load.
- **"Mujhe pata nahi category kya select karni hai"** (I don't know what category to select) — Needs AI-suggested categories based on photo analysis.

### 💡 Design Implications for Sunita

| Principle | Implementation |
| :--- | :--- |
| **Zero-Knowledge Reporting** | AI should auto-categorize issues from photo analysis. User should never need to select from a dropdown of 12 categories. |
| **Conversational UI** | Step-by-step guided flow: "📷 Photo le → 📍 Location set → ✅ Bhej do" — three screens maximum. |
| **Hindi-First Interface** | Full Devanagari labels, toasts, and confirmations. No English-only UI elements in the critical path. |
| **Performance Budget** | < 3 second initial load on 4G. Lazy-load all non-essential content. Compress images client-side before upload. |
| **Large Touch Targets** | All interactive elements ≥ 48px × 48px (exceeding WCAG minimum of 44px for low-dexterity users). |

### 📊 Key Metrics to Track for This Persona

- Issue report completion rate for first-time users (target: > 90%)
- Time from app open to successful submission (target: < 2 minutes)
- Drop-off rate at each step of the reporting flow (target: < 10% per step)

---

## Persona 6: Arjun Patil — *"The Aspiring Ward Leader"*

### 📋 Profile Summary

| Attribute | Detail |
| :--- | :--- |
| **Age** | 31 |
| **Gender** | Male |
| **Occupation** | Small business owner (hardware store) + active community volunteer |
| **Location** | Shivaji Nagar, Pune — Ward 15 |
| **Education** | B.Com (Pune University) |
| **Digital Literacy** | Moderate-High |
| **Primary Device** | OnePlus Nord CE 4 (mobile) + Samsung Tab A9 (tablet for campaign planning) |
| **Internet** | 4G + shop Wi-Fi |
| **Languages** | Marathi, Hindi, English |
| **Monthly Income** | ₹60,000 |

### 🎯 Goals & Motivations

- **Immediate Goal:** Build enough reputation to qualify for Ward Leader status and eventually become the DJP nominee for Ward 15 in the upcoming municipal elections.
- **Underlying Motivation:** Comes from a family that has been politically active but always sidelined by party dynasties. DJP's merit-based, reputation-driven system gives him a genuine shot at leadership.
- **Long-Term Aspiration:** Win the Ward 15 councillor seat and implement the 5-point ward improvement plan he's been drafting.
- **Why He Uses DJP:** The transparent reputation system, DJ Ceremony selection process (50% public vote + 25% peer + 25% council), and the paid subscription gate ensure that only serious, proven leaders rise — not those with the most money or connections.

### 🧠 Behavioral Patterns

| Behavior | Detail |
| :--- | :--- |
| **Session Frequency** | Multiple times daily, 10–20 minutes each |
| **Peak Usage** | Early morning (6 AM — planning) and after shop closes (8 PM — engagement) |
| **Primary Actions** | Create and manage volunteer campaigns → Engage in discussions → Build reputation through consistent IDPV actions → Monitor rank progress → Connect with other ward leaders |
| **Content Creation** | Reports 5–8 issues per month, creates 2 campaigns, posts weekly discussions |
| **Leadership Actions** | Coordinates 30+ volunteers across 3 active campaigns simultaneously |
| **Competitive Awareness** | Actively monitors other leaders' reputation scores in his ward |

### 📱 User Journey (Typical Session — Campaign Day)

```
5:30 AM → Open app → Check campaign: "Shivaji Nagar Sunday Cleanup"
  ↓
View: 22 volunteers confirmed → 3 new sign-ups overnight
  ↓
Post campaign update: "Meeting at temple corner, 7 AM. Bring gloves."
  ↓
7:00 AM → At cleanup site → Take "Before" photos of garbage dump
  ↓
10:00 AM → Cleanup complete → Take "After" photos → Submit to AI verification
  ↓
Citizens within 500m get notification → They vote to confirm resolution
  ↓
5:00 PM → Check reputation dashboard → +42 points earned today
  ↓
Rolling 6-month rank: "Area Leader" → 850 points from "Locality Leader" threshold
  ↓
Browse other ward leaders' profiles → Send connection request to leader in adjacent area
```

### 😤 Frustrations & Pain Points

- **"I've organized 12 cleanups but my rank hasn't changed."** — Needs crystal-clear visibility into the rolling 6-month score calculation and rank thresholds.
- **"I'm paying ₹499/month for Leader status — I need to see the value."** — Expects exclusive leader features: campaign tools, peer networking, analytics dashboard.
- **"I don't know who my competition is for the DJ Ceremony nomination."** — Wants a ward leaderboard showing top leaders by reputation.
- **"My volunteers use WhatsApp. Getting them to also use DJP is hard."** — Needs seamless cross-platform volunteer coordination.

### 💡 Design Implications for Arjun

| Principle | Implementation |
| :--- | :--- |
| **Leader Dashboard** | Dedicated leadership view: Active campaigns (status, volunteer count), Reputation trajectory graph (rolling 6-month), Rank progress bar with threshold markers, Ward leaderboard. |
| **Campaign Management** | Full campaign lifecycle: Create → Recruit → Execute → Document (Before/After) → Verify → Earn Reputation. |
| **Peer Networking** | Leader-to-leader connection system within the same ward. Shared campaign coordination for cross-area issues. |
| **Subscription Value** | Clear "Leader Benefits" section in profile: Campaign tools, Priority support, Peer network access, DJ Ceremony eligibility badge. |
| **Ward Leaderboard** | Transparent, public ranking of leaders by rolling 6-month reputation. Updated weekly. |

### 📊 Key Metrics to Track for This Persona

- Campaigns created per month (target: 2+)
- Reputation growth rate (target: consistent month-over-month increase)
- Volunteer-to-leader conversion funnel (citizens who become leaders)
- Leader subscription retention rate (target: > 85% monthly)

---

## Cross-Persona Feature Priority Matrix

| Feature | Ananya 🙋 | Rajan 🔍 | Priya 👑 | Vikram 📝 | Sunita 🌸 | Arjun 🏆 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Issue Reporting** | 🔴 Critical | 🟡 Medium | 🔴 Critical | 🟢 Low | 🔴 Critical | 🔴 Critical |
| **Feed Browsing** | 🔴 Critical | 🔴 Critical | 🟡 Medium | 🟡 Medium | 🟢 Low | 🟡 Medium |
| **Issue Verification** | 🟡 Medium | 🔴 Critical | 🟡 Medium | 🟢 Low | 🟢 Low | 🔴 Critical |
| **Discussions** | 🟡 Medium | 🔴 Critical | 🟡 Medium | 🔴 Critical | 🟢 Low | 🟡 Medium |
| **Polls** | 🟡 Medium | 🔴 Critical | 🟢 Low | 🔴 Critical | 🟢 Low | 🟡 Medium |
| **Volunteer Campaigns** | 🟢 Low | 🟡 Medium | 🔴 Critical | 🟢 Low | 🟢 Low | 🔴 Critical |
| **Reputation System** | 🟡 Medium | 🟡 Medium | 🔴 Critical | 🟡 Medium | 🟢 Low | 🔴 Critical |
| **Leader Dashboard** | — | — | 🔴 Critical | — | — | 🔴 Critical |
| **Hindi/Multilingual** | 🟢 Low | 🟢 Low | 🟡 Medium | 🟢 Low | 🔴 Critical | 🟡 Medium |
| **TopicFilterBar** | 🟡 Medium | 🔴 Critical | 🟡 Medium | 🔴 Critical | 🟢 Low | 🟡 Medium |
| **Mobile Performance** | 🔴 Critical | 🟡 Medium | 🔴 Critical | 🟢 Low | 🔴 Critical | 🟡 Medium |
| **Desktop Rich Editor** | 🟢 Low | 🟡 Medium | 🟢 Low | 🔴 Critical | — | 🟢 Low |

---

## Persona-to-Content Type Mapping

This maps each persona to the four core content types defined in the [DJ Decision Docx](./DJ%20Decision%20Docx.md):

| Content Type | Definition | Primary Persona | Secondary Persona |
| :--- | :--- | :--- | :--- |
| **Issue** | Something objectively wrong (garbage, pothole, broken light) | Ananya, Sunita | Rajan, Priya, Arjun |
| **Discussion** | Open-ended conversation, debate without a predefined solution | Vikram | Rajan |
| **Proposal** | A concrete suggestion that people can support and refine | Vikram, Arjun | Rajan |
| **Poll** | Structured opinion gathering | Vikram | Rajan, Ananya |

---

## Persona Alignment with DJ Decision Docx Principles

| DJ Decision Principle | Persona Validation |
| :--- | :--- |
| *"People scrolling a feed make decisions in about 2 seconds"* | **Ananya** — scans title, location, support count. Card design must answer "Is this near me? Is this real? Can I help?" instantly. |
| *"A single generic IssueCard component — only swap the data"* | All personas benefit. **Sunita** especially — consistent card layout reduces cognitive load regardless of issue type. |
| *"The Issue Detail Page should feel like an incident dashboard"* | **Rajan** — the civic watchdog who deep-dives into every issue. Needs Header → Evidence → Progress → Timeline → Discussion flow. |
| *"Feed = Discovery. Detail Page = Participation."* | **Ananya** browses the feed for discovery. **Rajan** dives into detail pages for participation. Two distinct UX zones. |
| *"Sidebar answers: Which ones deserve my attention?"* | **Rajan** and **Vikram** use the sidebar for trending topics, closing polls, and community champions. **Sunita** ignores it completely (mobile, no sidebar). |
| *"Every submission must answer: What is this? What governance area? Where does it apply?"* | All personas. **Vikram** cares deeply about governance scope (Ward → State → National). **Priya** focuses on "Where" (her neighborhood). |

---

## Appendix: Icon Consistency Reference (from DJ Decision Docx)

All UI elements across the platform must use these consistent icon meanings:

| Meaning | Icon | Used By |
| :--- | :---: | :--- |
| Support | 👍 | All personas (primary engagement action) |
| Comment | 💬 | Rajan, Vikram (heavy commenters) |
| Citizens affected | 👥 | Ananya (trust signal), Arjun (impact metric) |
| Government Level | 🏛 | Vikram (ELJ scope), Rajan (accountability) |
| Location | 📍 | Ananya, Sunita (proximity), Priya (campaign area) |
| Time | 🕒 | All personas (recency of issues) |
| Share | ↗ | Priya (WhatsApp sharing), Vikram (LinkedIn sharing) |
| Evidence | 📷 | Rajan (verification), Ananya (reporting), Arjun (Before/After) |

---

> [!TIP]
> **Living Document:** These personas should be updated quarterly as user research data comes in. After v1 MVP launch, validate personas against real analytics (session recordings, heatmaps, funnel data) and adjust behavioral patterns accordingly.
