# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Primary Users**: Citizens (civilians) looking to report local neighborhood issues, vote on civic polls, and discuss public topics.
- **Secondary/Eligible Leaders**: Active citizens who gain reputation and participate in organizing volunteer cleanup campaigns or presenting petitions.

## Product Purpose
Digital Janta Platform (DJPlatform) is a web application that enables citizens to register local pain points across executive, legislative, and judiciary domains, building community consensus and driving local problem resolution.

## Positioning
A decentralized civic engagement platform open to all citizens, combining social discussion (Reddit-like community threads) with location-verified issue tracking, routing community problems to local citizen action.

## Operating Context
- **Deployment**: Web browser interface.
- **Key Flows**: Onboarding (Profile, OTP, Proximity Location), Civic Feed, Raising Actions (Create Issue, Discussion, Poll), and Proximity-based verification.
- **Scale**: Global/generic model adaptable to any local municipality.

## Capabilities and Constraints
- **Capabilities**: 
  - Issue reporting (Garbage, Potholes, Water, etc.).
  - Discussion threads with nested voting and polls.
  - Location proximity verification (solving/checking status).
  - Reputation points earned for citizen actions (IDPV).
- **Constraints**: 
  - The prototype does not share data directly with government platforms or manage official election campaigns.
  - Prototype runs as a static/client-side web experience.

## Brand Commitments
- **Styling**: Open to new premium color palettes, motion libraries, and modern typography, moving away from simple orange/coral defaults.

## Evidence on Hand
- **Files**: Initial HTML views located in `frontend/prototype/` (`login.html`, `otp.html`, `signup.html`, `admin-dashboard.html`).
- **Flows**: Core directories for onboarding, discussions, issues, stats-view, and user action views.

## Product Principles
1. **Open to All**: App utility is open to every citizen, independent of political party membership.
2. **Proximity Trust**: Verifying issues relies on geographic proximity to prevent bot spam or fake reports.
3. **Citizen Agency**: Focus on community-solvable volunteering campaigns before governmental petitions.
4. **Reputation Merit**: Leadership eligibility is earned through actual, constructive community participation.

## Accessibility & Inclusion
- Core requirement for high-contrast visibility, legible typography, and tap-target sizes suitable for mobile devices in diverse outdoor lighting contexts.
