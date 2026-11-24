---
title: "Release notes"
app: "onbudget"
order: 8
description: "Every OnBudget release, newest first, with the features and fixes that shipped in each version."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "589791233"
sourceTitle: "OnBudget - Release Notes"
---

## Version 2.8

**Release Date:** October 6, 2026

Labels, saved filters, a Tracking tab, report owner changes, a faster Home page, and the fixes released since 1.0.

### Labels

**Report labels**, set by the report owner, are seen by everyone with access to the report. **My labels** are personal, and only you see them.

Up to 10 labels per report, each up to 40 characters.

Add labels from a report's menu, on the report page, or in the report builder, and edit labels on up to 100 selected reports at once.

Home search matches labels, and the **Labels** filter shows reports with any or all of the labels you pick.

### Saved Filters

Save a Home filter (name or label text, health, labels, currency, scope, and hidden reports) and apply it again from **Saved filters**. Each person can keep up to 50.

Edit, rename, delete, or share a filter with users or groups. Filters shared with you appear under **Shared with me**, where you can save your own copy. A shared filter only shows each person the reports they can already access.

### Tracking Tab

A new **Tracking** tab on Home shows how many reports are over budget, at risk, or on track, for all reports, for each saved filter, and for each label.

Show the counts as stacked bars, bars, columns, a pie, a donut, or a table. Click a segment to open those reports in the Reports tab.

**Key numbers** show, for all reports or for the saved filters you pick, the report counts by health and, per currency, planned, spent, remaining, budget used, and projected overrun. Amounts are never added up across currencies.

### Report Ownership

**Change owner** hands a report to another person after a confirmation step. Existing shares stay, and you can keep view-only access under **Shared with me**.

### Home

The report list appears first, and each report's numbers fill in as they are calculated.

Coming back to Home restores your tab, filters, saved filter, and page. Reports calculated in the last two minutes show their numbers straight away.

Your choice of Cards, List, or Table view is remembered across devices.

Each report shows its health: Over budget, At risk, On track, Not calculated, Data deleted, or No budget set. A report whose spaces or work items were deleted says so.

Long report titles wrap onto two lines beside the star.

### Fixes

Failed actions (saving a layout, starring, hiding, deleting, duplicating, or sharing a report, and saving or deleting a worklog role) now show an error message.

When a report cannot refresh, its last results stay on screen with a message.

A failed Jira search now shows an error instead of zero spend.

Reports with very large numbers of worklogs no longer fail to calculate.

Reports that return no rows keep their number and date formats.

A report with exactly 5,000 work items is no longer rejected as over the limit.

Jira rate limits are retried briefly before a report gives up.

CSV files keep accented characters intact when opened in Excel on Windows.

Charts load only when a report or a preview is shown, so Home and the project settings page load faster.

### Security

Reading a project's worklog roles requires permission to browse that project.

Space (project) IDs in a report's origin are checked before they are used in JQL.

CSV export guards against spreadsheet formula injection.

Dependencies were updated to clear known vulnerabilities.

## Version 1.0

**Release Date:** July 2026

Initial public release of OnBudget for Jira Cloud and Jira Service Management.

### Report Builder & Data Origins

A guided report builder that walks you through choosing a data origin, a reporting method, a time frame, a budget, and health thresholds.

Three data origins for any report: **Spaces** (projects), **Work items** (issues), or a **JQL query**.

Input validation at each step, so a report cannot be saved with missing or inconsistent settings.

Save a report definition once and regenerate its results on demand from live Jira data whenever it is opened.

### Reporting Methods

Five reporting methods: **Story points**, **Number field** (a cost per unit of a numeric field), **Worklogs / time tracking**, **Items closed or resolved** (count), and **Items in a status** (count).

Worklog time bases can be priced per hour, per day, per 30 minutes, or per 15 minutes.

Worklog pricing uses either a flat rate or a rate card that sets rates per user or per project role.

Per-project worklog rate-card roles are defined on the **OnBudget worklog roles** project settings page.

### Budget Health & Forecast

Configurable **At risk** and **Over budget** thresholds for each report.

**Over budget** (red) reflects actual spend reaching the Over threshold.

A forecast that projects an overrun raises the status only to **At risk** (amber), never to red on its own.

Forecasts project spend to a chosen end date or horizon.

### Dashboard & Gadgets

Open a report as a dashboard with these gadgets: **Insights** (rule-based highlights, with no AI and no external calls), **Budget summary**, **Budget health gauge**, **Planned vs actual**, **Spend over time** (burndown), **Forecast**, **Variance**, **Breakdown** (by status, assignee, project, or issue type), and **Compare reports**.

Gadgets can be dragged, resized, and retitled to arrange the dashboard.

Export report data to CSV.

### Home, Views & Organization

**Cards**, **List**, and **Table** views of your reports on the Home list.

Text search across your reports.

Filters for health, currency, and hidden reports.

An ordered multi-key sort whose priority follows the order you pick and is saved in your browser.

Mark reports as favorites (star), hide them, or duplicate them.

### Sharing & Collaboration

Share a report with specific users or groups.

A **Shared with me** section for reports others have shared with you.

Each viewer can star or hide a shared report for themselves without affecting anyone else.

### Formatting & Localization

Configurable currency, number format, decimal places, and date format.

The interface is available in **English**, **Portuguese**, and **Spanish**.

### Security & Privacy

Read-only permission scopes: `read:jira-work`, `read:jira-user`, and `storage:app`. The app has no write or manage scopes and cannot create, edit, delete, or transition issues or change any Jira configuration.

Permission-aware: Jira reads run as the signed-in user, so the app never exposes data you cannot already see. An app-level read is used only to load field and status metadata catalogs.

Runs entirely on Atlassian Forge with no outbound network calls to external services (charts and fonts are bundled locally), making it eligible for the **Runs on Atlassian** program.

Report definitions and related data are stored in Atlassian Forge storage inside your Atlassian tenant. Report results are never stored; every report is recalculated from live Jira data each time it is opened.

Storage keys use one-way hashes of Atlassian account IDs and group IDs. The stored records keep the report owner's account ID and display name, the account or group ID and name of each share, and the account or group IDs, names, and rates in worklog rate cards.

Editing, deleting, and sharing a report are restricted to the report owner, and writing project-role rate cards requires the Jira **Administer projects** permission.

The backend enforces the app license, all stored input is validated and size-capped before it is written, text used in JQL is quoted and escaped, and errors are returned as structured messages without leaking internal detail.

The codebase carries automated security tests, and all stored data is deleted automatically when the app is uninstalled.

### Compatibility

Works with **Jira Cloud** and **Jira Service Management**.

Eligible for the Atlassian **Runs on Atlassian** program.

## Support

For help or questions, contact **Numeric Oasis** at [contact@numericoasis.com](mailto:contact@numericoasis.com) or through the [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39).

**Last Updated:** November 24, 2026
