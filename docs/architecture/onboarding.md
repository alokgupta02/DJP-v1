# 👋 **Conversational Onboarding & Progressive Disclosure**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Define the conversational onboarding flow and progressive disclosure UX patterns |
| **👥 Audience** | Developers, Designers, Contributors |
| **📌 Status** | `Stable` |

---

## 🌟 Overview

The onboarding process uses **Progressive Disclosure** to gradually introduce users to the platform's features and civic capabilities, reducing cognitive load and maximizing citizen adoption.

---

## 🔄 6-Step Onboarding Sequence

```
 [ 1. Welcome ] ──► [ 2. Location ] ──► [ 3. Interests ] ──► [ 4. Account ] ──► [ 5. Tour ] ──► [ 6. Ready ]
```

### 1️⃣ Step 1: Welcome Screen
* Warm conversational introduction to the Digital Janata platform
* Clear civic value proposition ("Participate as easily as sending a message")
* Primary Action: **Get Started**

### 2️⃣ Step 2: Location Selection
* Users select their geographic jurisdiction (State, District, Municipality, Ward)
* Automatically personalizes local feeds, representatives, and issues

### 3️⃣ Step 3: Interest & Preference Gathering
* Select civic focus areas (Education, Healthcare, Infrastructure, Sanitation, Law)
* Set preferred notification & summary frequency (Daily / Weekly / Monthly)

### 4️⃣ Step 4: Account Creation (Optional / Progressive)
* Seamless anonymous exploration or instant OTP/Social login
* Account creation enables persistent reputation scoring and voting rights

### 5️⃣ Step 5: Interactive Platform Tour
* Quick interactive tooltips highlighting the Dashboard, Issue Reporting, and Polls

### 6️⃣ Step 6: Confirmation & Access
* Summary card of selected preferences
* Immediate redirect to personalized Citizen Dashboard

---

## 🗃️ State Management & Integration

| State Layer | Responsibility | Storage |
| :--- | :--- | :--- |
| **User State** | Tracks active onboarding step & completion | Session Storage / User Profile |
| **Preferences** | Stores location and topic interests | Local Storage / Database Profile |
| **Civic Context** | Filters API queries by selected jurisdiction | URL Params / Redux/Zustand Store |

---

## ✅ Quality & Edge-Case Checklist

* [ ] **Interrupted Flow:** Users can resume exactly from the last completed onboarding step.
* [ ] **User Cancellation:** Users can skip onboarding and explore default public views.
* [ ] **Dynamic Location Updates:** Users can update their geographic location anytime from settings.
* [ ] **Accessibility:** Every onboarding step is fully navigable via keyboard (`Tab` / `Enter`).

---

## 📚 Related Documentation

* **[Submission Model](submission-model.md)** — User Profile entity schema
* **[Design Principles](../ux/design-principles.md)** — Progressive disclosure philosophy

---