Here’s a clean **agent document creation flow** for building a full app:

1. **Idea Intake Doc**
   Capture raw 1-line idea + intent + problem statement.

2. **Idea Expansion Doc**
   Expand into full concept: users, pain points, goals, assumptions.

3. **Business Plan Doc**
   Define: target market, revenue model, value proposition, competitors, risks.

4. **Product Vision Doc**
   Long-term vision, mission, success metrics.

5. **PRD (Product Requirement Doc)**
   Features, user stories, scope, priorities (MVP vs future).

6. **System Design Doc**
   Architecture, services, database design, APIs.

7. **Tech Specification Doc**
   Stack selection, frameworks, infra, tools.

8. **Execution Plan Doc**
   Sprint planning, task breakdown, timelines, ownership.

9. **UI/UX Doc**
   Screens, flows, wireframes, user journey.

10. **Development Doc**
    Coding standards, module structure, integration plan.

11. **Testing Doc**
    Test cases, QA strategy, automation plan.

12. **Deployment Doc**
    CI/CD, environment setup, release process.

13. **Operations Doc**
    Monitoring, logs, scaling, incident handling.

14. **Iteration Doc**
    Feedback loop, version upgrades, roadmap updates.

=========================================

## Tools

**1. Initiation — `idea.md`, `business_case.md` (Notion/Confluence)**
Starts from raw idea, expanded into problem, users, and ROI. Output feeds planning with clear vision. Accepted when stakeholders approve feasibility and value.

**2. Planning — `project_plan.md`, `risk_log.xlsx` (Jira, MS Project)**
Uses business case to define scope, timeline, resources. Produces roadmap for analysis. Accepted when timeline is realistic and risks are tracked.

**3. Analysis — `srs.md`, `use_cases.md` (Confluence, Draw.io)**
Transforms scope into detailed requirements. Feeds design directly. Accepted when requirements are complete, testable, and signed off.

**4. Design — `hld.md`, `lld.md`, `api_spec.yaml` (Lucidchart, Swagger)**
Converts SRS into architecture, DB, APIs. Guides dev. Accepted when scalable, clear, and review-approved.

**5. Development — `/src`, `dev_guide.md` (Git, VS Code)**
Implements design into code. Outputs working modules for testing. Accepted via code reviews and build success.

**6. Testing — `test_plan.md`, `test_cases.xlsx` (Selenium, Postman)**
Validates against SRS. Feeds deployment readiness. Accepted when critical tests pass.

**7. Deployment — `deploy.md`, `ci_cd.yml` (Docker, GitHub Actions)**
Releases tested build. Feeds ops. Accepted when stable with rollback.

**8. Maintenance — `ops.md`, `changelog.md` (Grafana, ELK)**
Monitors system, logs issues → loops back to SRS for next iteration. Accepted when SLA met.
