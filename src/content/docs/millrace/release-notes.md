---
title: "Release notes"
app: "millrace"
order: 8
description: "Release Date: July 2026"
draft: true
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "600113153"
sourceTitle: "Millrace - Release Notes"
---

## Version 1.0

**Release Date:** July 2026

Initial public release of Millrace, Critical Chain Project Management for Jira Cloud.

### Reports & Scopes

Build a CCPM report from a **project**, an **epic**, or any **JQL** query.

Save report definitions and recompute results on demand and automatically as issues change.

Reports are user-owned and can be shared with specific users or groups; shared reports appear in a **Shared with me** section.

### Critical Chain & Buffers

**Automatic resource leveling** that computes the true critical chain from Blocks links and resources, deterministically.

**Documented buffer sizing**: 50% cut-and-paste, RSSM, and adaptive (RSSM scaled by resource tightness), each showing its formula.

**Automatic feeding buffers** placed where feeding paths merge into the chain, each with its own fever status.

**Two-point estimates** (aggressive and safe) via Millrace custom fields, with a Story Points or time-estimate fallback.

### Delivery Risk & Health

**Fever chart** with diagonal zones, the actual trajectory, and a projected finish.

**Monte Carlo delivery forecast**: P50, P80, and P95 completion, on-time confidence, and a sensitivity ranking of the tasks that drive the risk.

**Relay-race "up next"** single-tasking list per resource.

**Bad-multitasking and resource-load detection** with peak parallel tasks and contention time.

**Data-readiness diagnostics** with a schedulability score, plus plain-language explainability on at-risk buffers.

### Home, Views & Organization

**Cards**, **List**, and **Table** views of your reports, with favorites.

**Reorderable, collapsible report sections** so you can arrange and focus each report.

Clickable work item keys open the issue in Jira, and the report scope opens the matching issue search.

### Security & Privacy

Read-only permission scopes: `read:jira-work`, `read:jira-user`, and `storage:app`. The app has no write or manage scopes and cannot create, edit, delete, or transition work items or change any Jira configuration.

Runs entirely on Atlassian Forge with no outbound network calls to external services (charts and fonts are bundled locally), making it eligible for the **Runs on Atlassian** program.

Report definitions, cached results, fever-chart history, preferences, and share grants are stored in Forge storage inside your Atlassian tenant.

Atlassian account IDs and group names are stored only as one-way hashes.

Editing, deleting, and sharing a report are restricted to the report owner. All stored input is validated and size-capped, and text used in JQL is quoted and escaped.

The codebase carries automated engine and security tests, and all stored data is deleted automatically when the app is uninstalled.

### Compatibility

Works with **Jira Cloud**.

Eligible for the Atlassian **Runs on Atlassian** program.

## Support

For help or questions, contact **Numeric Oasis** at [contact@numericoasis.com](mailto:contact@numericoasis.com) or through the [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39).

**Last Updated:** July 14, 2026
