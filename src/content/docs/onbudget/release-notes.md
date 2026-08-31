---
title: "Release notes"
app: "onbudget"
order: 8
description: "Release Date: July 2026"
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "589791233"
sourceTitle: "OnBudget - Release Notes"
---

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

Atlassian account IDs and group IDs are stored only as one-way hashes, never in plain text.

Editing, deleting, and sharing a report are restricted to the report owner, and writing project-role rate cards requires the Jira **Administer projects** permission.

The backend enforces the app license, all stored input is validated and size-capped before it is written, text used in JQL is quoted and escaped, and errors are returned as structured messages without leaking internal detail.

The codebase carries automated security tests, and all stored data is deleted automatically when the app is uninstalled.

### Compatibility

Works with **Jira Cloud** and **Jira Service Management**.

Eligible for the Atlassian **Runs on Atlassian** program.

## Support

For help or questions, contact **Numeric Oasis** at [contact@numericoasis.com](mailto:contact@numericoasis.com) or through the [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39).

**Last Updated:** July 2, 2026
