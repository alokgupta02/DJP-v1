# DJP Native Mobile Client (`mobile = android/flutter`)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Quickstart and onboarding SSOT for our root-level native Flutter mobile application (`mobile = android/flutter`). |
| **📅 Last Updated** | 2026-07-19 |
| **🏷️ Status / Version** | Active SSOT / v1.0.0 |
| **👥 Owner / Worker** | `Worker/Who: [Tech Arch Agent | Antigravity (Gemini)]` |
| **🔗 Upstream / Dependencies** | [`mobile/mobile-todo.md`](file:///home/ap/git-repo/DJP-v1/mobile/mobile-todo.md), [`mobile/.djp_rules.md`](file:///home/ap/git-repo/DJP-v1/mobile/.djp_rules.md) |

---

`/mobile/` is our standalone **root-level native Flutter application** (`Flutter 3.44+`, `Dart 3.6+`). It connects dynamically to any backend target (`8082`, `8081`, or `8080`) via our `ApiService`.

## ⚡ Quickstart & Dynamic Target Routing Table

Always `cd mobile` before running Flutter or Dart commands.

| Environment Target | Android Emulator URL | Web / Desktop URL | How to Target |
| :--- | :--- | :--- | :--- |
| **BMAD (`web-app = bmad`)** | `http://10.0.2.2:8082/djp/api/v1` | `http://localhost:8082/djp/api/v1` | Default in `ApiService.getBaseUrl()` |
| **Prototype (`web-app = prototype`)** | `http://10.0.2.2:8081/djp/api/v1` | `http://localhost:8081/djp/api/v1` | Override in `ApiService.getBaseUrl()` |
| **Root Production** | `http://10.0.2.2:8080/djp/api/v1` | `http://localhost:8080/djp/api/v1` | Override in `ApiService.getBaseUrl()` |

### Key Commands:
```bash
cd mobile
flutter pub get        # Install dependencies
flutter analyze        # Run static analysis check
flutter test           # Run widget & unit verification suite
flutter run -d chrome  # Run in Chrome (or select emulator)
```

> [!IMPORTANT]
> **Rules & Task Backlog:** For anti-over-engineering rules and active mobile sprint items, see [`.djp_rules.md`](file:///home/ap/git-repo/DJP-v1/mobile/.djp_rules.md) and [`mobile-todo.md`](file:///home/ap/git-repo/DJP-v1/mobile/mobile-todo.md).
