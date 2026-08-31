---
title: "Overview"
app: "millrace"
order: 1
description: "How Millrace brings Critical Chain Project Management to Jira Cloud: buffers, fever charts, and reading a plan by buffer consumption."
draft: true
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "600047618"
sourceTitle: "Millrace - Critical Chain Project Management for Jira"
---

Millrace brings Critical Chain Project Management (CCPM) to Jira Cloud. It reads a project's work items and their dependency links, automatically levels resources to find the true critical chain, sizes CCPM buffers with transparent and documented math, forecasts delivery with Monte Carlo simulation, and tracks execution with a fever chart. It is a paid app built with a Custom UI on Atlassian Forge, and it is eligible for the Atlassian "Runs on Atlassian" program because it runs entirely on Forge, makes no outbound network calls to external services, and bundles its charts and fonts locally.

Millrace lives on a global page in the Jira Apps menu, where you build, save, share, and open CCPM reports. Millrace is read only: it never creates, edits, deletes, or transitions work items, and it makes no changes to Jira configuration.

## What Is Critical Chain?

Classic critical path finds the longest chain of dependent tasks assuming unlimited resources. The critical chain is the longest chain after resolving BOTH dependencies AND resource contention: if two parallel tasks need the same resource, they must run in sequence. That resource-aware chain, not the critical path, sets the real project duration. CCPM strips padding out of individual task estimates and pools it into shared buffers that protect the delivery date, then tracks buffer consumption instead of task dates.

## Why Millrace?

| Challenge | How Millrace Helps |
| --- | --- |
| Jira does not compute a critical path, let alone a resource-aware critical chain. | Millrace levels resources and computes the true critical chain from your Blocks links and estimates. |
| Task-level padding is wasted and deadlines still slip. | Millrace pools safety into project and feeding buffers and sizes them with documented, selectable math. |
| "When will it ship, and how confident are we?" is hard to answer. | A Monte Carlo forecast reports P50, P80, and P95 completion and the probability of finishing within the buffer. |
| Problems are noticed only after the deadline is blown. | A fever chart plots buffer consumption against chain progress with a projected finish, so trouble shows early. |
| Bad multitasking silently delays every project. | Millrace flags resources that are asked to run overlapping work and shows each resource its single next task. |
| Schedules built on messy data mislead. | A data-readiness score flags cycles, missing estimates, unassigned or disconnected tasks before you trust the plan. |
| Reporting tools risk changing your Jira data. | Millrace is read only. It cannot create, edit, delete, or transition work items or change any Jira configuration. |

## Who Is This For?

| Role | Use Case |
| --- | --- |
| Project & Program Managers | Build a critical-chain schedule from existing Jira issues and manage delivery by buffer status. |
| PMO / Delivery Leads | Compare on-time confidence across initiatives and defend schedules with transparent buffer math. |
| Engineering & Team Leads | See the single next task per resource, and catch multitasking and resource overload early. |
| Executives & Stakeholders | Open a shared report for a current, read-only view of schedule health and delivery risk. |

## Key Features

- **Reports on any scope**: build a CCPM report from a project, an epic, or any JQL query, and save, share, and organize it.
- **Automatic resource leveling**: computes the true critical chain by resolving dependencies and resource contention, deterministically.
- **Documented buffer sizing**: choose 50% cut-and-paste, RSSM (root-sum-of-squares), or adaptive (RSSM scaled by resource tightness). Every buffer shows its formula.
- **Automatic feeding buffers**: sized and placed where feeding paths merge into the chain, each with its own fever status.
- **Fever chart with projected path**: percent buffer consumed against percent chain complete, with diagonal zones, the actual trajectory, and a projected finish.
- **Monte Carlo delivery forecast**: P50, P80, and P95 completion, on-time confidence, and the tasks that drive the risk.
- **Relay-race "up next"**: the single next task per resource, with a multitasking flag when single-tasking is broken.
- **Bad-multitasking / resource-load detection**: peak parallel tasks and contention time per resource.
- **Data-readiness diagnostics**: a schedulability score that flags cycles, missing estimates, unassigned or disconnected tasks.
- **Explainability**: every at-risk buffer gets a plain-language reason.
- **Home, views & sharing**: Cards, List, and Table views, favorites, a "Shared with me" section, and reorderable, collapsible report sections.

## Buffer Sizing Methods

| Method | How the Buffer Is Sized |
| --- | --- |
| 50% cut-and-paste | Half of the aggregate aggressive duration of the protected chain (Goldratt's classic rule). |
| RSSM (root-sum-of-squares) | The square root of the sum of squared task safety margins, with a floor so short chains are not under-protected. |
| Adaptive | RSSM scaled up by resource tightness, so a chain dominated by one busy resource is protected more. |

## Delivery Forecast & Health

- **Monte Carlo forecast**: each task's duration is sampled from a lognormal fitted to its aggressive and safe estimates and propagated through the leveled network to a completion distribution, reported as P50, P80, and P95 with on-time confidence and a sensitivity ranking.
- **Fever chart**: buffer consumption against chain progress in green, yellow, and red zones, with a projected finish line based on the current burn rate.
- **Feeding-buffer fever**: each feeding buffer has its own consumption and status.
- **Data readiness**: a 0 to 100 score with blocking and warning findings, so you know whether the plan is trustworthy.

## Two-Point Estimates & Resources

Millrace uses an aggressive (roughly 50% confidence) and a safe (roughly 90% confidence) estimate per task, entered in the Millrace Aggressive Estimate and Millrace Safe Estimate custom fields, with a Story Points or time-estimate fallback when they are not set. The resource that performs a task is the assignee or a configurable Millrace Resource field, so a person, team, or skill pool can be the leveling unit.

## Security & Privacy

- **Read-only scopes**: the app requests only `read:jira-work`, `read:jira-user`, and `storage:app`. It has no write or manage scopes and cannot change any work item or Jira configuration.
- **Runs on Atlassian with no egress**: Millrace runs entirely on Forge and makes no outbound network calls to external services.
- **Access by ownership and sharing**: a report is visible to its owner and to the users and groups it is explicitly shared with.
- **Hashed identifiers**: Atlassian account IDs and group names are stored only as one-way hashes, never in plain text.
- **Minimal, in-tenant storage**: only report definitions, computed results (cached and refreshed from live Jira), fever-chart history, preferences, and share grants are stored, all within your Atlassian tenant.
- **Deleted on uninstall**: all stored data is deleted automatically when the app is uninstalled.

For full detail, see the child **Privacy Policy** and **Security Policy** pages listed at the top of this page.

## Getting Started

Install Millrace from the Atlassian Marketplace.

Ensure your issues use **Blocks** links for dependencies and have estimates (Millrace two-point fields, Story Points, or time estimates).

Open Millrace from the Jira Apps menu in the left sidebar.

Click **New report**, choose a project, epic, or JQL scope, and save.

Open the report to view the critical chain, buffers, fever chart, and forecast, then share it with the users or groups who need it.

## Support

For help or questions, contact **Numeric Oasis** at [contact@numericoasis.com](mailto:contact@numericoasis.com) or through the [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39).
