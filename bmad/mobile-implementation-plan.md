# Setup `bmad/mobile/` as a Bare-Minimum Functional Android/Flutter Project

Mirror our "lean iteration & maximum reuse" philosophy by introducing a bare-minimum, fast-iteration **Android/Flutter mobile client (`bmad/mobile/`)** inside our `bmad/` ecosystem. It will run alongside our React SPA (`bmad/frontend/`) and connect directly to our Spring Boot API (`bmad/backend/` on port 8082).

---

## Overview & Architecture

Currently, `bmad/` consists of:
* **Backend (`bmad/backend/`)**: Spring Boot API on port `8082` (`/djp/api/v1`).
* **Web SPA (`bmad/frontend/`)**: React 19 + Vite on port `5175`.
* **Tests (`bmad/tests/`)**: QA verification scripts.

We will add:
* **Mobile App (`bmad/mobile/`)**: Standalone **Flutter 3.x / Dart / Android SDK** application.

> [!IMPORTANT]
> **Tooling & Environment Setup:**
> The host machine (`/home/ap/`) has the **Android SDK** installed under `/home/ap/Android/Sdk` (with platform-tools, build-tools, and emulator), but **Flutter SDK** (`flutter` binary) is not yet installed in system `PATH`.
> **Phase 0 of this plan will clone/install the Flutter stable SDK locally to `/home/ap/flutter`** (or `bmad/.tools/flutter`) so we can run `flutter create`, `flutter build apk`, and `flutter test` without requiring root/sudo privileges.

---

## Network & API Connectivity Strategy

Mobile apps running on emulators or physical devices cannot access the backend using `http://localhost:8082` directly (because `localhost` inside an Android Emulator points to the virtual Android device itself).

We will implement a clean `ApiService` in Dart with environment detection:
* **Android Emulator:** Connects to `http://10.0.2.2:8082/djp/api/v1` (`10.0.2.2` is the Android emulator's alias to the host machine loopback interface).
* **iOS Simulator / Web / Desktop:** Connects to `http://localhost:8082/djp/api/v1`.
* **Physical Device on Local Wi-Fi:** Configurable via an `API_BASE_URL` override (`http://<HOST_IP>:8082/djp/api/v1`).

---

## Proposed Changes

### Phase 0: Flutter SDK Setup (`/home/ap/flutter`)
* Clone official Flutter stable branch (`git clone https://github.com/flutter/flutter.git -b stable /home/ap/flutter`) or download official stable Linux SDK tarball.
* Add `/home/ap/flutter/bin` to `PATH` for the session and verify `flutter doctor -v`.

### Phase 1: Scaffold `bmad/mobile/` Project
Run `flutter create --org org.djp.citizen bmad/mobile` and clean up default boilerplate.

#### [NEW] `bmad/mobile/pubspec.yaml`
Configured with essential, lightweight dependencies only:
* `http: ^1.2.0` (for REST API communication)
* `shared_preferences: ^2.3.0` (to persist JWT auth token locally)

#### [NEW] `bmad/mobile/lib/main.dart`
App entrypoint initializing `MaterialApp` with DJP theme colors and routing between `LoginScreen` and `IssuesFeedScreen`.

#### [NEW] `bmad/mobile/lib/services/api_service.dart`
Centralized HTTP client handling:
* `getBaseUrl()`: Returns `http://10.0.2.2:8082/djp/api/v1` for Android or `http://localhost:8082/djp/api/v1` otherwise.
* `login(String email)`: Calls `POST /auth/dev-login` with `{"email": email}`, returns and stores JWT token and user profile.
* `getIssues()`: Calls `GET /issues` using `Authorization: Bearer <token>`.
* `createIssue(Issue issue)`: Calls `POST /issues` using JWT token.

#### [NEW] `bmad/mobile/lib/models/user.dart` & `issue.dart`
Dart data models matching our Spring Boot entity JSON schema (`User` and `Issue` with `fromJson` / `toJson` serialization).

#### [NEW] `bmad/mobile/lib/screens/login_screen.dart`
Simple, polished login interface with a **"Dev Login (Citizen)"** quick-action button (`citizen@djp.org`) for instant authentication during iteration.

#### [NEW] `bmad/mobile/lib/screens/issues_feed_screen.dart`
Main dashboard displaying:
* Top bar with user avatar/email and logout button.
* Scrollable list/cards of Civic Issues showing title, category badge, status indicator, and support count.
* Floating Action Button (`+`) to open the `CreateIssueDialog`.

#### [NEW] `bmad/mobile/lib/screens/create_issue_dialog.dart`
Modal form to submit a new issue (Title, Description, Category, Priority) and refresh the feed immediately.

---

### Phase 2: Domain Tracking & Alignment Ecosystem

To maintain our mandatory 100% dev/test/fe/be/mobile alignment across `bmad/`:

#### [NEW] `bmad/mobile/.djp_identity.md`
Profile for the **Mobile / Flutter Agent** specifying Flutter 3.x / Dart standards and strict anti-over-engineering rules.

#### [NEW] `bmad/mobile/.djp_rules.md`
Operational rules governing mobile architecture and local backend port 8082 integration.

#### [NEW] `bmad/mobile/.djp_state.md`
Active mobile session state and task log.

#### [NEW] `bmad/mobile/mobile-todo.md`
Execution backlog specific to mobile feature parity.

#### [MODIFY] `bmad/AGENTIC_WORKFLOW_GUIDE.md`
Add `Mobile / Flutter Agent` (`bmad/mobile/mobile-todo.md`) to our multi-agent workflow diagrams and role table.

#### [MODIFY] `bmad/dashboard.md` & `bmad/todo.md`
Add the **Mobile / Android Client (`bmad/mobile/`)** to the executive dashboard and task intake portal.

---

## Verification Plan

### Automated Verification
1. **Verify Flutter Setup:** `flutter --version` and `flutter analyze` inside `bmad/mobile/` → must pass cleanly with 0 errors.
2. **Automated Unit & Widget Tests:**
   * Create `bmad/mobile/test/api_service_test.dart` and `widget_test.dart` to verify JSON model serialization and login screen rendering.
   * Run `cd bmad/mobile && flutter test` → expect `All tests passed!`.
3. **Android Build Verification:**
   * Run `cd bmad/mobile && flutter build apk --debug` → expect successfully generated `app-debug.apk` proving Android Gradle and SDK integration works.

### Manual / End-to-End Verification
* Boot backend on port `8082`.
* Run `cd bmad/mobile && flutter run -d chrome` (or on Android emulator via `10.0.2.2:8082`) to verify full dev-login, issue retrieval, and issue creation against the live backend.
