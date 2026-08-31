---
title: "Privacy policy"
app: "sprint-rollover-tracker"
order: 9
description: "Last Updated: April 28, 2026"
draft: true
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "542375937"
sourceTitle: "Sprint Rollover Tracker - Privacy Policy"
---

**Last Updated:** April 28, 2026 
**App:** Sprint Rollover Tracker 
**Vendor:** Numeric Oasis

## 1. Data We Collect

Sprint Rollover Tracker collects and processes only the minimum data necessary to provide sprint-rollover tracking and reporting:

**Per-Issue Rollover History (App Storage):** When a sprint closes, the app records which issues did not complete. For each, we store a rollover count and a per-sprint history including the sprint name, sprint dates, the sprint completion date, and the Atlassian account ID of the user who closed the sprint.

**Per-Sprint Aggregate Statistics (App Storage):** For every closed sprint, we store aggregate metrics: total issue count, completed count, carried-over count, completion rate, sprint goal text, and dates. These power the report's charts and tables.

**Story Point and Time Tracking Aggregates (App Storage, when applicable):** When your team uses Jira's Story Points or time tracking fields, the app additionally records numeric totals (story points carried over, time logged, time remaining on rolled-over work). If your team does not use these fields, no such data is recorded.

**Issue Metadata (Transient):** When you open the project report, the app reads current issue summaries, statuses, assignees, and types from Jira via the standard REST API. This data is processed in memory only and is never stored.

## 2. Personal Data Processing

Sprint Rollover Tracker processes minimal personal data:

The Atlassian account ID of the user who closed each sprint is recorded so the app can attribute "Closed by" in the report. Display names are resolved on demand via Jira's user lookup at render time and are never stored.

Issue assignee account IDs and display names are read from Jira at render time to populate the per-assignee breakdown. They are not persisted by the app.

We do **not** collect or store email addresses, IP addresses, passwords, authentication tokens, issue summaries, comments, attachments, or any free-text user content.

## 3. Data Storage and Retention

**Where:** All app-stored data resides on Atlassian's Forge infrastructure within your tenant. No data leaves the Atlassian environment.

**Per-Issue Rollover History:** Retained for the lifetime of the install. Capped at the most recent 100 sprint entries per issue.

**Per-Sprint Aggregates:** Retained for the lifetime of the install.

**Issue Metadata Reads:** Not persisted. Re-fetched on each report render.

## 4. Data Sharing

We do not share, sell, or transfer any data to third parties. All data remains within the Atlassian ecosystem. Sprint Rollover Tracker makes no outbound network calls to any external service.

## 5. Security

Runs entirely on Atlassian Forge infrastructure (sandboxed environment).

Read-only with respect to Jira issue content, the app never modifies, deletes, or comments on issues, and never changes your sprint configuration.

Report data respects your Jira permissions. You only see issues, assignees, and sprints you are authorised to view.

Diagnostic logs are sanitised: issue keys, sprint names, project keys, account IDs, email addresses, and display names are never logged.

Your data never leaves the Atlassian Cloud environment.

## 6. Data Deletion

**On Uninstall:** All stored data (rollover history and sprint statistics) is permanently deleted from Atlassian Forge storage when the app is uninstalled from your Jira site.

**Manual Request:** Contact us at [contact@numericoasis.com](mailto:contact@numericoasis.com) to request data deletion at any time.

## 7. GDPR & User Data Requests

The Atlassian account IDs we store are opaque platform identifiers. To remove a specific user's footprint from the app's storage, an admin can submit a deletion request as described above; we will identify and remove all references to that account ID across rollover history and sprint records.

## 8. Contact

For privacy questions, data deletion requests, or any concerns about how Sprint Rollover Tracker handles your data, contact:

Email: [contact@numericoasis.com](mailto:contact@numericoasis.com)

Website: [numericoasis.com](https://numericoasis.com/)
