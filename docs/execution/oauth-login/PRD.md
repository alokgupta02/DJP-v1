# 🔑 **Product Requirements Document (PRD): OAuth Login & Onboarding**

---

| Metadata | Details |
| :--- | :--- |
| **👑 Document Owner** | Product Management Team |
| **👥 Audience** | Developers, Designers, QA Engineers, AI Agents |
| **📌 Status** | `Stable` |

---

## 1. Goal

Allow users to log into the application securely using their **Google** or **LinkedIn** accounts, auto-register their profile details, and intelligently redirect new citizens to onboarding.

---

## 2. User Stories

### 👤 Citizen Authentication
* **Story 1 (OAuth Options):** As a citizen, I want to see "Continue with Google" and "Continue with LinkedIn" buttons on the landing page so I can sign in quickly.
* **Story 2 (Automatic Registration):** As a first-time user, when I authenticate, the system must auto-save my email, name, and provider profile so I don't fill out a long signup form.

### 🧭 Onboarding Redirection
* **Story 3 (First-Time Redirect):** As a new citizen, when I log in, the system must detect that I haven't completed onboarding and redirect me to the location/ward selection screen.
* **Story 4 (Returning User Bypass):** As a returning citizen, when I log in, the system must detect that onboarding is already completed and route me directly to the main issues feed.
* **Story 5 (Incomplete Profile Nudge):** As a returning citizen who skipped or has an incomplete onboarding profile, when I log in, I want to see a top reminder banner and a profile completion percentage bar on the feed so I can complete it at my own pace.

---

## 3. Acceptance Criteria

| Scenario | Given / When | Expected Outcome |
| :--- | :--- | :--- |
| **First-Time Login** | User logs in successfully via Google/LinkedIn for the first time. | `onboarding_completed` is set to `FALSE` in DB. User is redirected to `/onboarding`. |
| **Returning Login** | User logs in and has already completed onboarding. | `onboarding_completed` is `TRUE`. User is routed straight to `/feed`. |
| **Incomplete Profile Login** | Returning user logs in with `onboarding_completed` as `FALSE` (skipped onboarding). | User enters `/feed` but a top warning banner and a profile progress completion bar are rendered. |
| **Login Cancelled** | User cancels the OAuth authorization screen. | App redirects back to landing page with a clear info toast: *"Authentication cancelled by user."* |
| **Token Expiry** | User leaves the app open or returns after 24 hours. | Token invalidates, session ends, and user is redirected back to the login screen. |

---

## 4. Security & Session Rules
* **Token Strategy:** Backend issues a lightweight JWT. Frontend stores it securely.
* **Session Expiration:** JWT expires after **24 hours**, forcing re-authentication.
