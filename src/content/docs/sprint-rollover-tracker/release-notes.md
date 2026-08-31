---
title: "Release notes"
app: "sprint-rollover-tracker"
order: 8
description: "Every Sprint Rollover Tracker release, newest first, with the features and fixes that shipped in each version."
draft: true
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "542343170"
sourceTitle: "Sprint Rollover Tracker - Release Notes"
---

## Version 3.0

**Release Date:** May 2026

Major feature release adding active-sprint forecasting, burndown charts, sprint-goal change tracking, commitment vs delivery visibility, redesigned Compare Sprints tab, and a new Data Export tab. Terminology updated to use Atlassian's current naming ("work items" rather than "issues").

### Active Sprint Forecast (new)

**Live forecast widget** at the top of the project report estimates how many work items will carry over from the currently-active sprint, with confidence (low/medium/high) based on velocity history and elapsed pace.

**Pace tag**, "On track", "Behind pace", or "Ahead of pace" based on time-elapsed vs work-done ratio.

**Story-point forecast**, predicted carryover in SP for teams that use story points.

### Sprint Details Modal (new)

**Burndown chart** of work items remaining over each day the sprint was active, with story-point burndown for SP-using teams. Powered by a daily scheduled trigger that records totals + done counts.

**Per-sprint Completed and Rolled-over lists** with bold work-item keys, summaries, and status lozenges. Click any key to open it in Jira.

### Sprint-Goal Change Tracking (new)

**Goal-changes counter** per sprint, surfaced in the Sprint Health table with a yellow tag for sprints whose goal was edited after start. Powered by Forge sprint-update events.

### Commitment vs Delivery (new)

**Sprint-start snapshot** records each sprint's initial committed scope (work items, story points, goal).

**Two-line trend chart** on the Sprint Health tab compares Committed vs Delivered work items per sprint.

**Scope-change columns** in the Sprint Health table show Committed, Added mid-sprint, and Removed mid-sprint per sprint.

**Avg scope creep % KPI** with severity colours (green at most 10%, yellow 10-25%, red > 25%).

### Compare Sprints Redesign

**Three-column table layout** (Sprint A | Sprint B | Difference) replaces the v1 side-by-side cards.

**Green/red colour coding** on the Difference column reflects whether the change is an improvement or regression for that metric.

**Aligned rows** regardless of whether either sprint had a goal, goal text moved out of the comparison view.

### Data Export Tab (new)

**Stuck work items**, respects the current filter; one row per filtered work item with assignee, status, rollover count, and (where applicable) estimate data.

**Sprint history**, one row per closed sprint with dates, totals, completion %, story points, scope changes, and goal changes.

**Per-work-item rollover history**, one row per (work item x sprint it rolled through), for auditing why specific items keep slipping.

**KPI snapshot**, single-row summary of every KPI plus a generated-at timestamp, for pasting into standup or status updates.

### KPI Strip Improvements

**Worst-offender ties**, when multiple work items share the highest rollover count, the card lists up to three keys instead of silently dropping the others.

**Estimate-mode adaptability**, Velocity KPI shows story points for SP-using teams and hours for time-tracking teams; Stuck-without-estimate adapts the same way.

**Severity colours** on KPI cards (green/yellow/red) for at-a-glance health: avg rollovers, carryover %, predictability, stuck count, scope creep %, worst offender, stuck-without-estimate.

**Tooltips on every KPI card** explaining what the metric means and what its threshold values are.

### Sprint Health Charts, Better Defaults

**Stacked Done + Rolled-over** bar chart per sprint replaces the v1 grouped side-by-side bars, one bar per sprint sums to the total committed work, fits cleanly at any viewport width.

**Commitment vs Delivery** rendered as a two-line trend chart for clearer time-series reading.

**Chart-format toggle** on every chart lets users switch between Bar / Line / Pie / Stacked / Table on the fly, Table mode is the supported way to see exact values without hovering.

**JQL deep-links** beneath each chart aggregate open the underlying work items in a Jira search.

### Stuck Work Items Tab Improvements

**Bulk JQL link** opens all currently-shown stuck work items in Jira in one go, with automatic chunking when too many keys would exceed the URL length budget.

**What-stuck-means tooltip** on the status-breakdown heading explains the threshold and shows a dynamic count of items above it.

### Filter Scope Disclaimers

**Help tooltip on the filter row** explains: time window applies to every tab; min rollovers and status filter only the Stuck Work Items and Team Pulse tabs.

### Terminology & Layout

**"Issues" > "Work items"** across all user-visible labels, headings, tooltips, and CSV column names, matches Atlassian's current naming.

**Responsive layout**, KPI strip, charts, and tables reflow cleanly on narrower viewports. Long table cells and column headers truncate with ellipsis (hover to reveal full text). Wide tables scroll horizontally inside their own boxes rather than forcing the page to scroll.

### Marketplace Icon

Updated icon assets in both the issue panel and project sidebar to match the Marketplace listing.

### Bug Fixes

Sprint Details modal now renders content (was blank in pre-release builds).

"Open all in Jira (JQL)" replaced with a Link element, the previous Button was popup-blocked inside the Forge iframe.

KPI card text now uses a single body text colour with no greyed-out subtitle line.

---

## Version 1.0

**Release Date:** April 2026

Initial public release of Sprint Rollover Tracker for Jira Cloud.

### Issue Visibility

- **Right-Sidebar Rollover Widget:** Every issue automatically shows its rollover count. No admin configuration, no screen wiring.
- **Per-Issue History Modal:** One click opens a full per-sprint history: sprint name, dates, who closed each sprint, and how many other issues rolled with it.
- **Visual Severity:** Color-coded badges (blue for low rollover counts, warning colour for three or more) make stuck work obvious at a glance.

### Project-Sidebar Report

**Dedicated Project Page** alongside Board, Backlog, and Reports.

- **KPI Strip:** Tracked issues, average rollovers, worst offender, sprints closed, carryover %, predictability score, stuck-issue count, and (when applicable) velocity.
- **Sprint Health Tab:** Grouped completion-vs-carryover bar chart, completion-rate trend line, and a sortable per-sprint table including sprint goal and closer.
- **Stuck Issues Tab:** Rollover-count distribution chart and an actionable table with status, assignee, days stuck, and per-row history modal.
- **Team Pulse Tab:** Per-assignee breakdown showing rollover totals, stuck issues, and worst-stuck issue.
- **Compare Sprints Tab:** Side-by-side delta of any two closed sprints with green/red trend tags.

### Filters & Navigation

- **Live Filters:** Minimum rollover count, time window (7/30/90 days or all), status. Instant client-side response.
- **JQL Deep-Links:** Every sprint, assignee, and issue row links to a Jira issue search filtered to that exact scope.
- **CSV Export:** One-click export of the currently filtered view.

### Story Points & Time Tracking

- **Velocity KPI:** Average story points completed per sprint, appears only when your team sets Story Points on issues.
- **Story-Point Aggregates:** Done-SP and Rolled-SP columns appear in the Sprint Health table when in use.
- **Time Tracking Aggregates:** Time logged and time remaining on rolled-over work appear when your team uses Jira's time tracking.
- **Hidden When Not Used:** Teams that don't use these Jira fields see no extra columns or KPIs.

### Built for the Atlassian Cloud

**Runs on Atlassian certified**, built to Atlassian's highest cloud security and reliability standard.

**Zero configuration**, install the app, close a sprint, the data starts flowing within seconds.

Works with team-managed and company-managed Scrum projects.
