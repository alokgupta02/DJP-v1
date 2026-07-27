# DJP Prototype Frontend Audit Report

**Date:** 2026-07-27
**Status:** Phases 1-5 Active — Deep analysis of broken flows and gaps

---

## Project Overview

- **Framework:** React 19 + TypeScript + Vite 8 + React Router 7 + TanStack Query + Tailwind CSS v4
- **Architecture:** Feature-based folder structure with `src/features/`, `src/shared/`, `src/app/`
- **API Proxy:** Vite proxies `/djp/api/v1` → `http://localhost:8081`
- **Auth:** Dev token via `/auth/dev-login` stored in localStorage

---

## Phases 1-4: Completed ✅

| Phase | Status | Description |
| :--- | :--- | :--- |
| **Phase 1 — Critical Build Fixes** | ✅ | TDZ, sync setState, AuthLayout export, unused imports, Fast Refresh |
| **Phase 2 — TypeScript Hygiene** | ✅ | Replaced all `any` types (116), fixed empty catch blocks, Fast Refresh violations |
| **Phase 3 — Architecture & Security** | ✅ | TanStack Query migration, React.lazy code splitting (539KB → multiple chunks) |
| **Phase 4 — Testing & Quality** | ✅ | Vitest + RTL + Playwright, 6 tests passing, lint 0 errors |

---

## Phase 5: Deep Analysis — API Coverage Map

| Feature | List | Detail | Create | Update | Delete | Vote | Comment | Follow | Share |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Issues** | ✅ | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ✅ | ❌ |
| **Discussions** | ✅ | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ✅ | ❌ |
| **Polls** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **Petitions** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Profile** | ✅ | ✅ | ✅ | — | — | — | — | ✅ | ❌ |
| **Auth/Signup** | — | — | ❌ | — | — | — | — | — | — |
| **Notifications** | ❌ | — | — | ❌ | — | — | — | — | — |
| **Representatives** | ❌ | — | — | — | — | — | — | — | ❌ |
| **Insights** | ❌ | — | — | — | — | — | — | — | — |

(✅ = functional, ⚠️ = broken/partial, ❌ = missing)

---

## 🔴 Critical Broken Flows (10)

### 1. Petitions — Entire Feature Unimplemented
- **File:** `src/features/create/components/CreatePetitionForm.tsx:20-25`
- **Issue:** `// For now we don't have a petitionsApi, just simulating` — uses `setTimeout` mock
- **Files:** No `petitionsApi.ts` exists
- **Backend:** No petition endpoints exist
- **Impact:** Users cannot create or view petitions

### 2. Notifications — API Exists but Page Ignores It
- **File:** `src/features/notifications/NotificationsPage.tsx`
- **Issue:** Uses hardcoded `NOTIFICATIONS` array, never calls `fetchNotifications()` from `notificationsApi.ts`
- **Files:** `notificationsApi.ts` has `fetchNotifications()`, `getUnreadCount()`, `markAsRead()` — all unused
- **Impact:** Users see stale/demo notifications only; unread badge never updates

### 3. IssuesPage Voting — Client-Only, Lost on Refresh
- **File:** `src/features/issues/IssuesPage.tsx:126-133`
- **Issue:** `toggleSupport()` updates local React `Set` only. No `toggleVote` API call.
- **Impact:** All supports reset on page refresh; list page and detail page vote counts are inconsistent

### 4. DiscussionsPage Voting — Client-Only, Lost on Refresh
- **File:** `src/features/discussions/DiscussionsPage.tsx:66-72`
- **Issue:** `handleVote()` updates local `votes` Record only. No `toggleVote` API call.
- **Impact:** Same as IssuesPage; persisted votes from detail page not shown on list

### 5. Poll Option Selection — Not Persisted
- **File:** `src/features/polls/PollDetailPage.tsx:188-192`
- **Issue:** "Vote Now" button has no API call. `toggleVote` is for upvote/downvote, not option selection.
- **Backend:** No poll-casting endpoint exists
- **Impact:** Citizens cannot submit their poll choices

### 6. Signup & OTP — No API Integration
- **File:** `src/features/auth/SignupPage.tsx:24`
- **Issue:** `onSubmit={(e) => e.preventDefault()}` — form does nothing
- **File:** `src/features/auth/OTPPage.tsx:36` — same pattern
- **Impact:** New users cannot register; only dev-login works

### 7. Share Buttons — Non-Functional Everywhere
- **Files:** `FeedPage.tsx` (IssueCard:149, DiscussionCard:247, PollCard:352), `IssueDetailPage.tsx:308`, `DiscussionDetailPage.tsx:318`, `PollDetailPage.tsx:212`
- **Issue:** Share buttons have zero implementation; only `CommentThread.tsx:113` uses `navigator.share()`
- **Impact:** Users cannot share content

### 8. RepresentativesPage — Static Only
- **File:** `src/features/representatives/RepresentativesPage.tsx`
- **Issue:** All data hardcoded, "Contact Representative" button does nothing
- **Backend:** No representative endpoints exist
- **Impact:** No real representative data

### 9. InsightsPage — Static Only
- **File:** `src/features/insights/InsightsPage.tsx`
- **Issue:** All charts, metrics, data are hardcoded. No API integration.
- **Impact:** Users see demo data only

### 10. FeedPage "Petitions" Filter — No Data
- **File:** `src/features/feed/FeedPage.tsx:27`
- **Issue:** `CONTENT_TYPES` includes "Petitions" but `feedApi.ts` has no `fetchPetitions()` and no petition rendering logic
- **Impact:** Filter tab shows nothing

---

## 🟡 Medium Issues (9)

### 11. No Loading/Error States for TanStack Query
- **File:** `src/features/feed/FeedPage.tsx:387-389`
- **Issue:** `useQuery` destructures only `data`, ignores `isLoading`, `isError`, `error`
- **Impact:** No loading skeletons or error states; users see blank page during fetch

### 12. Auth Guard Trivially Bypassed
- **File:** `src/shared/components/layout/AppLayout.tsx:29`
- **Issue:** `Boolean(localStorage.getItem("djp_user"))` — any string in localStorage grants access
- **Impact:** No real authentication enforcement

### 13. Hardcoded Dev User ID
- **Files:** `ProfilePage.tsx:22`, `AppLayout.tsx:32`
- **Issue:** `"1f4c2da8-eedd-4523-b541-7c818c237fff"` as fallback user ID
- **Impact:** Breaks for real users; always falls back to dev user

### 14. localStorage Auth — XSS Vulnerable
- **Issue:** Tokens and user data in localStorage readable by any JS
- **Impact:** Session hijacking via XSS

### 15. RichEditor Uses Deprecated `document.execCommand`
- **Issue:** Deprecated API, unreliable in modern browsers
- **Impact:** Rich text editing may break in Chrome/Edge updates

### 16. No Image Upload
- **Files:** All create forms (`CreateIssueForm`, `CreateDiscussionForm`, `CreatePollForm`, `CreatePetitionForm`)
- **Issue:** No file attachment mechanism
- **Impact:** Users cannot attach evidence images

### 17. Sidebar Buttons Don't Navigate
- **File:** `FeedPage.tsx:368,498,527`
- **Issue:** Category buttons, "Explore", "View All" trending use `Link to="#"` or do nothing
- **Impact:** Dead UI elements

### 18. Onboarding Doesn't Redirect
- **Issue:** After completing onboarding, user stays on onboarding page
- **Impact:** Broken user flow

### 19. FeedPage Sidebar Stats Hardcoded
- **File:** `FeedPage.tsx:496,503,508`
- **Issue:** "124 active issues", category counts, trending items are static
- **Impact:** Misleading information

---

## Backend API Endpoints (Spring Boot)

| Endpoint | Method | Status |
| :--- | :---: | :--- |
| `/djp/api/v1/auth/dev-login` | POST | ✅ |
| `/djp/api/v1/auth/me` | GET | ✅ |
| `/djp/api/v1/auth/refresh` | POST | ✅ |
| `/djp/api/v1/auth/google` | GET | ✅ |
| `/djp/api/v1/auth/github` | GET | ✅ |
| `/djp/api/v1/issues` | GET/POST | ✅ |
| `/djp/api/v1/issues/{id}` | GET/PUT/DELETE | ✅ |
| `/djp/api/v1/discussions` | GET/POST | ✅ |
| `/djp/api/v1/discussions/{id}` | GET/PUT/DELETE | ✅ |
| `/djp/api/v1/polls` | GET/POST | ✅ |
| `/djp/api/v1/polls/{id}` | GET/PUT/DELETE | ✅ |
| `/djp/api/v1/profiles/{id}` | GET/PATCH | ✅ |
| `/djp/api/v1/users/{id}` | GET | ✅ |
| `/djp/api/v1/users/{id}/onboarding` | PATCH | ✅ |
| `/djp/api/v1/interactions/comments` | GET/POST | ✅ |
| `/djp/api/v1/interactions/votes` | POST | ✅ |
| `/djp/api/v1/interactions/follows` | POST | ✅ |
| `/djp/api/v1/notifications` | GET | ✅ |
| `/djp/api/v1/notifications/unread-count` | GET | ✅ |
| `/djp/api/v1/notifications/{id}/read` | POST | ✅ |

**Missing BE endpoints needed:** petitions CRUD, representatives CRUD, insights data, poll-cast vote, registration

---

## Historical Resolved Items (Prior Phases)

### Phase 1: Critical Build Fixes ✅
- Fixed RichEditor TDZ error
- Fixed FeedPage sync setState in useEffect
- Exported AuthLayout from `src/app/layouts/index.ts`

### Phase 2: TypeScript Hygiene ✅
- Replaced all `any` types with proper interfaces (feedTypes, discussionTypes, issueTypes, pollTypes, OnboardingTypes)
- Removed unused imports across 15+ files
- Fixed empty catch blocks with proper error logging
- Fixed Fast Refresh violations (OnboardingContext split, TopicFilterBar constants)

### Phase 3: Architecture & Security ✅
- Migrated FeedPage to TanStack Query (`useQuery`)
- Created `feedApi.ts`, `queryClient.ts`, `QueryProvider.tsx`
- Implemented React.lazy + Suspense code splitting for all 22 routes
- Bundle split from 539KB → multiple chunks (~50-150KB each)

### Phase 4: Testing & Quality ✅
- Installed Vitest + React Testing Library + Playwright
- Created test setup with mocks
- Created `FeedPage.test.tsx` (6 tests) and `OnboardingProvider.test.tsx` (1 test)
- Created Playwright config + `e2e/auth.spec.ts`
- Build clean, lint 0 errors, 6/6 tests passing
