---
title: "Overview"
app: "onbudget"
order: 1
description: "OnBudget is a budget and expense reporting app for Jira Cloud and Jira Service Management. It lets teams set a budget for a set of work, choose how spend i"
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "589496323"
sourceTitle: "OnBudget - Budget & Expense Reporting for Jira"
---

OnBudget is a budget and expense reporting app for Jira Cloud and Jira Service Management. It lets teams set a budget for a set of work, choose how spend is measured, and track actual spend against that budget with health thresholds, forecasting, and dashboard gadgets. It is a paid app built with a Custom UI on Atlassian Forge, and it is eligible for the Atlassian "Runs on Atlassian" program because it runs entirely on Forge, makes no outbound network calls to external services, and bundles its charts and fonts locally.

OnBudget lives on a global page in the Jira Apps menu, where you build reports, open their dashboards, and browse the Home list of reports. It also adds a project settings page named "OnBudget worklog roles" where you define per-project worklog rate-card roles.

## Why OnBudget?

| Challenge | How OnBudget Helps |
| --- | --- |
| Teams cannot see how spend is tracking against a budget. | Each report compares actual spend to a budget you set, so you always know where you stand. |
| Problems are only noticed after the budget is blown. | Configurable "At risk" and "Over budget" thresholds surface trouble early, with an amber and red health signal. |
| It is hard to tell whether current pace will overrun the budget. | A forecast projects spend to a chosen end date or horizon and raises the status to "At risk" when an overrun is projected. |
| Costing labor from worklogs is manual and inconsistent. | Worklog and time-tracking costing prices logged time with a flat rate or a rate card that sets rates per user or per project role. |
| Stakeholders lack a shared, current view of budget status. | Share a report with specific users or groups, each of whom sees it in their own "Shared with me" section. |
| Finance works across different currencies and languages. | Configure currency, number format, decimal places, and date format, with the interface available in English, Portuguese, and Spanish. |
| Reporting tools risk changing your Jira data. | OnBudget is read only. It cannot create, edit, delete, or transition issues, and it makes no changes to Jira configuration. |

## Who Is This For?

| Role | Use Case |
| --- | --- |
| Finance / PMO | Track spend against budgets across projects and keep a consistent view of currency, rates, and health thresholds. |
| Project & Program Leads | Set budgets per initiative, forecast to a delivery date, and watch for early "At risk" signals. |
| Delivery / Engineering Managers | Cost effort from worklogs, story points, or a numeric field and see spend over time. |
| Team Leads | Break down spend by status, assignee, project, or issue type to understand where effort is going. |
| Executives & Stakeholders | Open a shared report and dashboard for a current, read-only view of budget health without touching Jira data. |

## Key Features

**Flexible report origins**: build a report from Spaces (projects), Work items (issues), or a JQL query.

**Five reporting methods**: measure spend by Story points, a Number field (cost per unit of a numeric field), Worklogs / time tracking, Items closed or resolved, or Items in a status.

**Worklog rate cards**: price logged time per hour, day, 30 minutes, or 15 minutes, using a flat rate or a rate card that sets rates per user or per project role.

**Budget health and forecast**: configurable "At risk" and "Over budget" thresholds, plus a forecast that projects spend to a chosen end date or horizon.

**Dashboard gadgets**: Insights, Budget summary, Budget health gauge, Planned vs actual, Spend over time, Forecast, Variance, Breakdown, and Compare reports, which can be dragged, resized, and retitled.

**Home views and organization**: Cards, List, and Table views with text search, filters, an ordered multi-key sort, favorites, hide, and duplicate.

**Sharing**: share a report with specific users or groups, with a "Shared with me" section and per-viewer star and hide.

**Formatting and languages**: configurable currency, number format, decimal places, and date format, with the interface in English, Portuguese, and Spanish.

**CSV export**: export report data to CSV for use elsewhere.

## Reporting Methods

| Method | How Cost Is Calculated |
| --- | --- |
| Story points | Spend is derived from the story points on the matched issues. |
| Number field | A cost per unit is applied to the value of a chosen numeric field. |
| Worklogs / time tracking | Logged time is priced per hour, day, 30 minutes, or 15 minutes, using a flat rate or a rate card that sets rates per user or per project role. |
| Items closed or resolved | Spend is based on a count of issues that are closed or resolved. |
| Items in a status | Spend is based on a count of issues currently in a selected status. |

## Budget Health & Forecast

Each report has configurable "At risk" and "Over budget" thresholds that drive a clear health signal. The status reflects actual spend, and the forecast is used to warn you early rather than to declare an overrun on its own.

**Over budget (red)** reflects actual spend reaching the "Over budget" threshold.

**At risk (amber)** is raised when actual spend reaches the "At risk" threshold, or when a forecast projects an overrun. A forecast alone never turns the status red.

**Forecasting** projects spend to a chosen end date or horizon so you can see where the budget is likely to land.

## Dashboard & Gadgets

Every report has a dashboard of gadgets that you can drag, resize, and retitle to fit how you want to read the numbers. The Insights gadget produces rule-based highlights with no AI and no external calls.

**Insights**: rule-based highlights.

**Budget summary**: the headline budget and spend figures.

**Budget health gauge**: the current health status.

**Planned vs actual**: planned budget against actual spend.

**Spend over time**: a burndown of spend.

**Forecast**: projected spend to your chosen end date or horizon.

**Variance**: the gap between budget and actual.

**Breakdown**: spend by status, assignee, project, or issue type.

**Compare reports**: multiple reports side by side.

## Home, Sharing & Organization

**Views**: browse reports in Cards, List, or Table views.

**Search and filters**: use text search and filter by health, currency, and hidden reports.

**Sort**: an ordered multi-key sort whose priority follows the order you pick, saved in your browser.

**Favorites, hide, and duplicate**: star reports as favorites, hide them, or duplicate an existing report.

**Sharing**: share a report with specific users or groups. Shared reports appear in a "Shared with me" section, and each viewer can star or hide them for themselves without affecting others.

## Security & Privacy

**Read-only scopes**: the app requests only `read:jira-work`, `read:jira-user`, and `storage:app`. It has no write or manage scopes and cannot change any issue or Jira configuration.

**Runs on Atlassian with no egress**: OnBudget runs entirely on Forge and makes no outbound network calls to external services.

**Permission-aware**: Jira reads run as the signed-in user, so the app never exposes data you cannot already see. An app-level read is used only to load field and status metadata catalogs.

**Results never stored**: only report definitions and settings are stored. Every report is recalculated from live Jira data each time it is opened.

**Hashed identifiers**: Atlassian account IDs and group IDs are stored only as one-way hashes, never in plain text.

**Deleted on uninstall**: all stored data is deleted automatically when the app is uninstalled.

For full detail, see the child **Privacy Policy** and **Security** pages listed at the top of this page.

## Getting Started

Install OnBudget from the Atlassian Marketplace.

Open OnBudget from the Jira Apps menu in the left sidebar.

Click **New report** and pick an origin, a budget, and a reporting method.

Generate the report and save it.

Open the report to view its dashboard, then share it with the users or groups who need it.

## Support

For help or questions, contact Numeric Oasis by email at [contact@numericoasis.com](mailto:contact@numericoasis.com) or raise a request through the [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39).
