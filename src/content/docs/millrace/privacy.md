---
title: "Privacy policy"
app: "millrace"
order: 9
description: "What Millrace reads from Jira and what it stores. The privacy policy for the app, in full."
draft: true
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "600080385"
sourceTitle: "Millrace - Privacy Policy"
---

**Last Updated:** July 14, 2026

**App:** Millrace

**Vendor:** Numeric Oasis

This Privacy Policy explains what data the Millrace app for Jira Cloud collects, how it is processed and stored, and the choices available to you. Millrace is a Critical Chain Project Management app built on Atlassian Forge. It runs entirely on Atlassian infrastructure and makes no outbound network calls to external services.

## 1. Data We Collect

Millrace collects only the data required to build, compute, and display your CCPM reports. This falls into two categories: a set of report and preference data held in app storage, and transient Jira data that is read and processed to compute a schedule.

### App Storage (persisted within your Atlassian tenant)

**Report definitions:** the parameters and metadata that describe a report (scope, buffer method and factors, dependency link type, section layout, plus metadata such as name and timestamps).

**Computed results (cached):** the output of the scheduling engine for a report, including work item keys and summaries used as task labels, computed schedule values (leveled start and finish, buffer sizes and consumption, fever-chart data, and the Monte Carlo forecast), and resource identifiers. Results are cached and recomputed from live Jira data when the underlying issues change and on a nightly schedule.

**Fever-chart history:** a capped series of buffer-consumption snapshots per report, used to draw the trajectory over time.

**User preferences:** your favorites and Home view choice.

**Share grants:** records of which users or groups a report has been shared with, stored as one-way hashes of the account ID or group name plus the display label so the sharing dialog can show it.

### Transient Data (read and processed to compute a report)

Work items, issue links, estimates (Story Points, time tracking, and the Millrace estimate fields), worklog totals, assignees, statuses, projects, and issue link types read from Jira.

User and group lookups from Jira, used only to populate the sharing dialog.

## 2. Personal Data Processing

Millrace is designed to minimize the personal data it retains.

Atlassian account IDs and group names are converted to **one-way hashes** before storage, wherever they are used to record report ownership, sharing, or per-user preferences. They are never stored in plain text.

For sharing, the display name of a user or group you select is stored so it can be shown in the sharing dialog. Display names are not collected for any other purpose.

A resource identifier (an assignee account ID or a Millrace Resource field value) may appear in a computed result as the label of the resource that performs a task.

Millrace does **not** collect email addresses, IP addresses, passwords, authentication tokens, issue descriptions, comments, worklog comments, or attachments.

## 3. Data Storage and Retention

All persisted data is stored on Atlassian Forge storage within your own Atlassian tenant.

Computed results are a cache: they are refreshed from live Jira data when the underlying issues change and on a nightly schedule.

Report definitions, cached results, fever-chart history, preferences, and share grants are retained for the life of the installation.

## 4. Data Sharing

Millrace does not share your data with any third parties.

There is no sale or transfer of data to third parties.

The app makes no outbound network calls to external services.

All data stays within Atlassian. Within your tenant, a report is visible to its owner and to the users and groups it is explicitly shared with.

## 5. Security

Millrace applies a layered security posture. A summary follows; see the Millrace Security Policy page for detail.

The app runs inside the Atlassian Forge sandbox and requests only read scopes (read:jira-work, read:jira-user, and storage:app). It has no write or manage scopes and cannot change any work item or Jira configuration.

Editing, deleting, and sharing a report are restricted to the report owner.

Account identifiers and group names are stored only as one-way hashes.

All stored input is validated and size-capped before it is written, and text used in JQL is quoted and escaped.

The scheduling engine runs asynchronously and only ever reads Jira; it never writes.

## 6. Data Deletion

When the app is uninstalled, all stored data is deleted automatically and permanently.

For manual data requests, contact us at [contact@numericoasis.com](mailto:contact@numericoasis.com).

## 7. GDPR Compliance

Millrace is built with privacy by default.

**Data minimization:** only report definitions, cached results, fever-chart history, preferences, and share grants are stored; issue descriptions, comments, and attachments are never read or stored.

**Pseudonymization:** account IDs and group names are stored only as one-way hashes.

**Purpose limitation:** data is used solely to build, compute, and display your CCPM reports, and is never sold or transferred to third parties.

**Data residency:** all persisted data remains within your Atlassian tenant on Forge storage, with no outbound calls to external services.

**Right to erasure:** all stored data is deleted automatically and permanently on uninstall, and manual requests can be made by contacting us.

## 8. Contact

For any questions about this Privacy Policy or your data, contact **Numeric Oasis**.

**Email:** [contact@numericoasis.com](mailto:contact@numericoasis.com)

**Support Portal:** [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39)

## 9. Changes to This Policy

We may update this Privacy Policy from time to time. When we do, we will revise the **Last Updated** date shown at the top of this page. We encourage you to review this policy periodically to stay informed about how Millrace handles your data.
