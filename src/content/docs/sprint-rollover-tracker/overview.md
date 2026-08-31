---
title: "Overview"
app: "sprint-rollover-tracker"
order: 1
description: "How Sprint Rollover Tracker turns sprint carryover into a measurable signal in Jira Cloud, and what it does with the numbers."
draft: true
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "542244866"
sourceTitle: "Sprint Rollover Tracker for Jira"
---

Sprint Rollover Tracker is an Atlassian Forge app for Jira Cloud that turns sprint carryover from a hidden problem into a metric your team can act on. It automatically counts how many sprints each work item has rolled over, tracks sprint goals and commitment-vs-delivery, captures daily burndown snapshots, and surfaces the data Scrum Masters and Sprint Managers need for retros, standups, and roadmap planning, without any custom fields, screens, or admin configuration.

The app lives in two places where your team already works: a compact widget in every issue's right sidebar, and a dedicated report alongside Board, Backlog, and Reports in your project's left navigation.

## Why Sprint Rollover Tracker?

| Challenge | How Sprint Rollover Tracker Helps |
| --- | --- |
| **"Which work items keep slipping sprint after sprint?"** | Every issue's right sidebar shows its rollover count at a glance. Click for the full per-sprint history. |
| **"Will the active sprint finish on time?"** | The active-sprint forecast widget at the top of the report estimates how many work items will carry over, with confidence based on velocity history and elapsed pace. |
| **"How is our sprint completion trending?"** | The Sprint Health tab shows Done + Rolled-over per sprint as a stacked bar (= total committed work), a Commitment vs Delivery trend, and a per-sprint table sortable by completion %, scope changes, and goal edits. |
| **"What did we commit to, and what did we actually deliver?"** | Commitment-vs-delivery columns plus a two-line trend chart show how each sprint's start commitment compared with its actual completion, and how scope changed mid-sprint (added vs removed). |
| **"How is burndown progressing inside an active sprint?"** | A daily-snapshot trigger records remaining work each day. Open any sprint's Details modal to see a burndown chart of work items remaining (and story points remaining when in use). |
| **"Did the team change the sprint goal mid-flight?"** | Goal-change counter per sprint surfaces how many times the goal was edited after start, with a yellow tag for sprints that lost focus. |
| **"Are we predictable enough for stakeholders to plan around us?"** | A Predictability score (low = consistent, high = erratic) summarises how much your completion rate varies sprint to sprint. |
| **"Who on the team needs unblocking?"** | The Team Pulse tab shows per-assignee rollover totals and worst-stuck work items. |
| **"What changed between this sprint and the last good one?"** | The Compare Sprints tab puts any two closed sprints in a clean three-column table (Sprint A \| Sprint B \| Difference), with green/red colour coding showing improvement or regression on every metric. |
| **"I need this data for an exec report or a retro doc"** | The Data Export tab offers four CSV downloads: stuck work items (current filter), full sprint history, per-work-item rollover history, and a one-row KPI snapshot. |
| **"Old work items quietly survive five or six sprints without anyone noticing"** | The Stuck Work Items tab visually highlights anything carrying over three or more sprints in a warning colour, with a one-click bulk JQL link to triage in Jira. |

## Who Is This For?

| Role | Use Case |
| --- | --- |
| Scrum Masters | Run data-driven retros: instantly see what stuck, who got blocked, which sprints fell short, how many times the goal changed mid-flight, and how delivery compared to commitment. |
| Sprint Managers | Track team health and predictability across sprints; identify regressions before they become trends; forecast active-sprint outcomes mid-flight. |
| Engineering Managers | Monitor velocity, carryover %, and completion-rate trends across multiple teams without spreadsheets. Export full sprint history to CSV for board reporting. |
| Product Owners | Surface ageing backlog items so stories don't quietly survive sprint after sprint. See which work items keep being added or removed mid-sprint. |
| Project Leads | One report covering every active and closed sprint in your project, accessible from the project sidebar. Burndown charts visible per sprint. |

## Key Features

**Auto-visible issue widget.** A compact rollover badge appears in every work item's right sidebar. No screen configuration, no admin step. Click to open the full per-sprint history modal.

**Project-sidebar report.** A dedicated entry alongside Board, Backlog, and Reports. One click from anywhere in the project.

**Active sprint forecast.** A live forecast widget at the top of the report predicts how many work items will carry over from the currently-active sprint, with low/medium/high confidence based on pace and historical velocity.

**KPI strip.** Tracked work items, average rollovers, worst offender (with multi-key support when multiple items tie), sprints closed with avg completion %, carryover %, predictability score, velocity (auto-shown for story-point teams; in hours for time-tracking teams), avg scope creep %, stuck-without-estimate count, and total work items completed in window.

**Sprint Health view.** A stacked Done + Rolled-over bar chart per sprint (= total committed work), a Commitment vs Delivery two-line trend chart (when sprint snapshots are available), a Completion-rate trend, and a sortable per-sprint table including goal text, scope changes (Added / Removed mid-sprint), and a Goal-changes counter showing how many times the goal was edited.

**Sprint Details modal.** Click "Details" on any sprint to see its burndown chart (work items remaining over each day, story points remaining when in use), plus per-sprint Completed / Rolled-over work-item lists with summaries and status lozenges.

**Stuck Work Items view.** Distribution pie chart, status-aware table with assignee, days stuck, and per-row history. Bulk JQL link opens all currently-shown stuck items in Jira at once. Color-coded warning tags above three rollovers.

**Team Pulse view.** Per-assignee breakdown showing where work is piling up, with deep-link JQL for each assignee's scope.

**Compare Sprints view.** A clean three-column table (Sprint A | Sprint B | Difference) showing every metric side-by-side, with green/red colour coding for improvement or regression. Drop the &Delta; symbols, drop the goal misalignment, just an honest comparison.

**Data Export tab.** Four CSV exports for retros, board reports, and audits: stuck work items (respects current filter), full sprint history (one row per sprint with dates/totals/scope/goal changes), per-work-item rollover history (one row per item x sprint it rolled through), and a one-row KPI snapshot for pasting into standup notes.

**Goal-change tracking.** A daily trigger captures sprint-goal edits made after a sprint starts. The closed-sprint view shows a Goal-changes counter so retros can flag sprints that lost focus mid-flight.

**Daily burndown snapshots.** A scheduled trigger records totals + done counts each day for every active sprint. Burndown charts render in the Sprint Details modal once snapshots accumulate.

**Live filters.** Min rollovers, time window, status. The time-window filter applies to every tab; min-rollovers and status filter only the Stuck Work Items + Team Pulse tabs, clearly indicated by a help tooltip.

**JQL deep-links.** Every sprint, assignee, and issue row links to a Jira work-item search filtered to that exact scope. Bulk JQL links beneath each chart open the items in the chart's aggregate.

**Chart-format toggle.** Every chart on the report offers a Bar / Line / Pie / Stacked / Table toggle so users can switch to a tabular view to see exact values without hovering.

**Story Points and time tracking** appear automatically when your team uses them, stay hidden when they don't. Velocity adapts to whichever estimate type the project actually uses (SP or hours).

Works with team-managed and company-managed Scrum projects.

**Runs on Atlassian certified**, your data never leaves your Atlassian Cloud environment.

## How It Works for Your Team

After you install Sprint Rollover Tracker on your Jira site, the app passively listens for sprint-close events, sprint-start events, sprint-update (goal edit) events, and runs a daily snapshot scheduled trigger. When a sprint closes, the app records which work items did not complete and increments their per-issue rollover counter. Within seconds:

Each affected work item's right-sidebar widget updates to show the new count.

The project report's KPIs, charts, and tables refresh on next view.

Closed sprints appear in the Sprint Health and Compare Sprints tabs, with completion stats, scope-change counts, goal-change counts, and (where applicable) story-point and time-tracking aggregates.

The Sprint Details modal's burndown chart populates from accumulated daily snapshots.

No custom fields are created, no automation rules need to be written, and no admin must add the app to issue screens or card layouts. Install the app, close a sprint, and the data starts flowing.

## Pricing

See the Atlassian Marketplace listing for current pricing tiers.
