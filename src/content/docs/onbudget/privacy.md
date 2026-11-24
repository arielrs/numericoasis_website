---
title: "Privacy policy"
app: "onbudget"
order: 9
description: "What OnBudget reads from Jira and what it stores: report settings, the people they name, labels and saved filters. The privacy policy, in full."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "589758465"
sourceTitle: "OnBudget - Privacy Policy"
---

- **Last Updated:** November 24, 2026
- **App:** OnBudget
- **Vendor:** Numeric Oasis

This Privacy Policy explains what data the OnBudget app for Jira Cloud (and Jira Service Management) collects, how it is processed and stored, and the choices available to you. OnBudget is a budget and expense reporting app built on Atlassian Forge. It runs entirely on Atlassian infrastructure and makes no outbound network calls to external services.

## 1. Data We Collect

OnBudget collects only the data required to build and display your budget reports. This falls into two categories: report settings and related records held in app storage, and transient Jira data that is read and processed in memory but never stored.

### App Storage (persisted within your Atlassian tenant)

- **Report definitions:** the parameters and metadata that describe a report (origin, budget, currency, method, time frame, thresholds, and gadget layout, plus metadata such as name, timestamps, and the report labels the owner sets), and the owner's Atlassian account ID and display name. Report **results** are never stored.
- **User preferences:** your display and organization settings, such as view choices, filters, and sort order.
- **Share grants:** records of which users or groups a report has been shared with, each holding the account ID or group ID and the display name or group name. Each record also keeps the report's name and its owner's account ID and display name, so the report can be listed for the people it is shared with.
- **Per-user star and hide records:** your personal favorites (stars) and hidden-report choices, which affect only your own view.
- **Personal labels:** the labels you add to reports for yourself, which only you see.
- **Saved filters and filter shares:** each saved filter's name and criteria (search text, health, labels, currency, scope, and visibility), and records of which users or groups it is shared with, holding their account or group IDs and names.
- **Rate cards:** worklog rate cards saved with a report or on their own, and the per-project worklog rate-card roles defined for pricing time-tracking data. Each holds the account or group IDs, display names, and hourly rates of the people or groups it prices, and a project role also records the account ID of the person who last changed it.

### Transient Data (read and processed in memory only, never persisted)

Issue, worklog, story point, numeric custom field, and status reads from Jira.

User and group lookups from Jira.

When a report is opened, this data is read from Jira through the standard REST API, processed in memory to calculate the report, and then discarded. It is not written to storage.

## 2. Personal Data Processing

OnBudget is designed to minimize the personal data it retains.

Atlassian account IDs and group IDs are stored as they are inside the records that need them: report ownership, share grants for reports and saved filters, and rate cards. Storage keys use **one-way hashes** of these IDs instead, so a raw ID never appears in a key.

Display names and group names are stored next to those IDs, as they were when the record was saved. Everywhere else, names are resolved from Jira when a page is shown.

OnBudget does **not** collect email addresses, IP addresses, passwords, authentication tokens, or work item content such as summaries, descriptions, comments, or attachments. The only free text it stores is what you type into OnBudget itself: report names, labels, saved filter names and search text, and rate card and role names.

## 3. Data Storage and Retention

All persisted data is stored on Atlassian Forge infrastructure within your own Atlassian tenant.

Report **results** are not stored. Every report is recalculated from live Jira data each time it is opened.

Report definitions, user preferences, share grants, per-user star and hide records, personal labels, saved filters and their shares, and rate cards are retained for the life of the installation.

## 4. Data Sharing

OnBudget does not share your data with any third parties.

There is no sale or transfer of data to third parties.

The app makes no outbound network calls to external services.

All data stays within Atlassian.

## 5. Security

OnBudget applies a layered security posture. A summary follows; see the OnBudget Security Policy page for detail.

The app runs inside the Atlassian Forge sandbox and requests only read scopes (read:jira-work, read:jira-user, and storage:app). It has no write or manage scopes.

Jira reads are permission-aware and run as the signed-in user, so the app never exposes data you cannot already see. An app-level read is used only to load field and status metadata catalogs.

Report edit, delete, and share actions are restricted to the report owner, and writing project-role rate cards requires the Jira "Administer projects" permission.

Storage keys use one-way hashes of account and group identifiers.

All stored input is validated and size-capped before it is written, and text used in JQL is quoted and escaped.

## 6. Data Deletion

When the app is uninstalled, all stored data is deleted automatically and permanently.

For manual data requests, contact us at [contact@numericoasis.com](mailto:contact@numericoasis.com).

## 7. GDPR Compliance

OnBudget is built with privacy by default.

- **Data minimization:** only the report settings and records listed in section 1 are stored; report results and Jira work item content are processed in memory and never persisted.
- **Hashed keys:** storage keys use one-way hashes of account IDs and group IDs. The records listed in section 1 keep account IDs, group IDs, and names where a feature needs them.
- **Purpose limitation:** data is used solely to build and display your budget reports, and is never sold or transferred to third parties.
- **Data residency:** all persisted data remains within your Atlassian tenant on Forge infrastructure, with no outbound calls to external services.
- **Right to erasure:** all stored data is deleted automatically and permanently on uninstall, and manual requests can be made by contacting us.

## 8. Contact

For any questions about this Privacy Policy or your data, contact **Numeric Oasis**.

**Email:** [contact@numericoasis.com](mailto:contact@numericoasis.com)

**Support Portal:** [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39)

## 9. Changes to This Policy

We may update this Privacy Policy from time to time. When we do, we will revise the **Last Updated** date shown at the top of this page. We encourage you to review this policy periodically to stay informed about how OnBudget handles your data.
