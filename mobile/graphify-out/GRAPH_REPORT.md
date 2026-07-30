# Graph Report - mobile  (2026-07-20)

## Corpus Check
- 56 files · ~17,862 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 313 nodes · 377 edges · 35 communities (26 shown, 9 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `468737bd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Win32Window
- Flutter
- my_application.cc
- api_service.dart
- FlutterWindow
- AppDelegate
- issue.dart
- create_issue_dialog.dart
- issues_feed_screen.dart
- wWinMain
- manifest.json
- main.dart
- login_screen.dart
- user.dart
- CreateIssueDialog
- handle_new_rx_page
- GeneratedPluginRegistrant.java
- gradlew
- DJP Mobile Task & Execution Tracker (`mobile = android/flutter`)
- widget_test.dart
- DJP Native Mobile Client (`mobile = android/flutter`)
- MainActivity
- DJP MOBILE USER IDENTITY (`mobile = android/flutter`)
- DJP MOBILE OPERATIONAL RULES (`mobile = android/flutter`)
- DJP MOBILE ACTIVE STATE (`mobile = android/flutter`)
- PackageDescription
- flutter_export_environment.sh
- README.md
- flutter_export_environment.sh
- String?

## God Nodes (most connected - your core abstractions)
1. `Win32Window` - 22 edges
2. `MessageHandler` - 12 edges
3. `FlutterWindow` - 10 edges
4. `Create` - 10 edges
5. `WndProc` - 10 edges
6. `MessageHandler` - 9 edges
7. `_MyApplication` - 7 edges
8. `OnCreate` - 7 edges
9. `WindowClassRegistrar` - 7 edges
10. `Destroy` - 7 edges

## Surprising Connections (you probably didn't know these)
- `wWinMain()` --calls--> `CreateAndAttachConsole()`  [INFERRED]
  windows/runner/main.cpp → windows/runner/utils.cpp
- `Win32Window::Win32Window()` --calls--> `Destroy`  [INFERRED]
  windows/runner/win32_window.cpp → windows/runner/win32_window.h
- `my_application_activate()` --calls--> `fl_register_plugins()`  [INFERRED]
  linux/runner/my_application.cc → linux/flutter/generated_plugin_registrant.cc
- `main()` --calls--> `my_application_new()`  [INFERRED]
  linux/runner/main.cc → linux/runner/my_application.cc
- `OnCreate` --calls--> `RegisterPlugins()`  [INFERRED]
  windows/runner/flutter_window.h → windows/flutter/generated_plugin_registrant.cc

## Import Cycles
- None detected.

## Communities (35 total, 9 thin omitted)

### Community 0 - "Win32Window"
Cohesion: 0.09
Nodes (40): PluginRegistry, Point, RECT, Size, RegisterPlugins(), OnCreate, OnDestroy, HWND (+32 more)

### Community 1 - "Flutter"
Cohesion: 0.08
Nodes (20): Cocoa, Flutter, FlutterMacOS, FlutterPluginRegistry, FlutterSceneDelegate, FlutterViewController, Foundation, GeneratedPluginRegistrant (+12 more)

### Community 2 - "my_application.cc"
Cohesion: 0.09
Nodes (22): FlPluginRegistry, FlView, GApplication, gboolean, gchar, GObject, GtkApplication, fl_register_plugins() (+14 more)

### Community 3 - "api_service.dart"
Cohesion: 0.09
Nodes (21): dart:convert, dart:io, ApiService, createIssue, _currentUser, devLogin, getBaseUrl, getIssues (+13 more)

### Community 4 - "FlutterWindow"
Cohesion: 0.13
Nodes (13): unique_ptr, DartProject, HWND, LPARAM, LRESULT, UINT, WPARAM, FlutterWindow (+5 more)

### Community 5 - "AppDelegate"
Cohesion: 0.16
Nodes (10): Any, FlutterAppDelegate, FlutterImplicitEngineBridge, FlutterImplicitEngineDelegate, AppDelegate, Bool, AppDelegate, Bool (+2 more)

### Community 6 - "issue.dart"
Cohesion: 0.14
Nodes (13): authorId, category, commentsCount, description, fromJson, id, Issue, location (+5 more)

### Community 7 - "create_issue_dialog.dart"
Cohesion: 0.15
Nodes (12): build, _categories, _category, createState, _descController, _isSubmitting, _locationController, _priorities (+4 more)

### Community 8 - "issues_feed_screen.dart"
Cohesion: 0.17
Nodes (11): create_issue_dialog.dart, Future, build, createState, _getCategoryColor, _handleLogout, initState, _issuesFuture (+3 more)

### Community 9 - "wWinMain"
Cohesion: 0.24
Nodes (9): _In_, _In_opt_, vector, wWinMain(), string, wchar_t, CreateAndAttachConsole(), GetCommandLineArguments() (+1 more)

### Community 10 - "manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, prefer_related_applications, short_name (+2 more)

### Community 11 - "main.dart"
Cohesion: 0.20
Nodes (9): BmadMobileApp, build, init, main, package:flutter/material.dart, screens/issues_feed_screen.dart, screens/login_screen.dart, ../services/api_service.dart (+1 more)

### Community 12 - "login_screen.dart"
Cohesion: 0.22
Nodes (8): issues_feed_screen.dart, build, createState, _emailController, _errorMessage, _handleLogin, _isLoading, TextEditingController

### Community 13 - "user.dart"
Cohesion: 0.22
Nodes (8): email, fromJson, id, name, reputationScore, role, toJson, User

### Community 14 - "CreateIssueDialog"
Cohesion: 0.32
Nodes (8): CreateIssueDialog, _CreateIssueDialogState, IssuesFeedScreen, _IssuesFeedScreenState, LoginScreen, _LoginScreenState, State, StatefulWidget

### Community 15 - "handle_new_rx_page"
Cohesion: 0.33
Nodes (5): handle_new_rx_page(), __lldb_init_module(), Intercept NOTIFY_DEBUGGER_ABOUT_RX_PAGES and touch the pages., SBDebugger, SBFrame

### Community 16 - "GeneratedPluginRegistrant.java"
Cohesion: 0.60
Nodes (3): GeneratedPluginRegistrant, FlutterEngine, Keep

### Community 17 - "gradlew"
Cohesion: 0.60
Nodes (3): gradlew script, die(), warn()

### Community 18 - "DJP Mobile Task & Execution Tracker (`mobile = android/flutter`)"
Cohesion: 0.40
Nodes (4): ✍️ Active Sprint & Tasks, DJP Mobile Task & Execution Tracker (`mobile = android/flutter`), 🟢 Phase 1: Core Mobile Setup (COMPLETED), 🚀 Phase 2: Progressive Feature Parity Backlog

### Community 19 - "widget_test.dart"
Cohesion: 0.40
Nodes (4): package:bmad_mobile/models/issue.dart, package:bmad_mobile/models/user.dart, package:flutter_test/flutter_test.dart, main

### Community 20 - "DJP Native Mobile Client (`mobile = android/flutter`)"
Cohesion: 0.50
Nodes (3): DJP Native Mobile Client (`mobile = android/flutter`), Key Commands:, ⚡ Quickstart & Dynamic Target Routing Table

## Knowledge Gaps
- **89 isolated node(s):** `flutter_export_environment.sh script`, `+registerWithRegistry`, `main`, `init`, `build` (+84 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `FlutterWindow` connect `FlutterWindow` to `Win32Window`, `Flutter`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `Win32Window` connect `Win32Window` to `FlutterWindow`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `MessageHandler` (e.g. with `Destroy` and `GetClientArea`) actually correct?**
  _`MessageHandler` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Create` (e.g. with `Destroy` and `UpdateTheme`) actually correct?**
  _`Create` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `WndProc` (e.g. with `GetThisFromHandle` and `MessageHandler`) actually correct?**
  _`WndProc` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Intercept NOTIFY_DEBUGGER_ABOUT_RX_PAGES and touch the pages.`, `flutter_export_environment.sh script`, `+registerWithRegistry` to the rest of the system?**
  _90 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Win32Window` be split into smaller, more focused modules?**
  _Cohesion score 0.08502415458937199 - nodes in this community are weakly interconnected._