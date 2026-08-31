---
title: "Privacy policy"
app: "astrolink"
order: 9
description: "What Astrolink reads from Jira, what it stores, and what it never sends anywhere. The privacy policy for the app, in full."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "498630659"
sourceTitle: "Astrolink - Privacy Policy"
---

**Last Updated:** April 30, 2026 **App:** Astrolink **Vendor:** Numeric Oasis

Astrolink runs entirely on Atlassian Forge infrastructure. We do not operate any external servers or databases. The data we store is the minimum required to deliver per-user features (saved presets, layouts, maps) and is sandboxed within your Atlassian site.

## 1. Data We Collect and Store

### 1.1 Transient (in-memory) data

When you open the panel, Astrolink reads work item metadata (key, summary, type, status, assignee, links, custom fields you choose to display) via the Jira REST API to render the graph. This data is held in memory for the duration of the request and is never retained.

### 1.2 Stored data (Atlassian Forge KVS)

Astrolink stores the following per-user data in Atlassian Forge KVS, a sandboxed key-value store managed by Atlassian within your site:

| What is stored | Why | Retention |
| --- | --- | --- |
| Custom presets (filters, layout, field choices, node style) | So you can save and reload your view configurations | Until you delete the preset or uninstall the app |
| Saved node positions per work item | So your manually-arranged layout persists between sessions | 30 days from last save, then automatically expired |
| Saved Maps (Global Page sources: JQL, project, or filter) | So your saved full-page views are one click away | Until you delete or uninstall |
| Last announcement version dismissed | So "What's new" popups don't reappear after dismissal | Until you uninstall |
| Issue panel > Global Page seed (work item key) | So opening Astrolink full-page from a work item inherits the seed | 60 seconds, then automatically expired |

### 1.3 Site-wide non-personal caches

To minimise Jira API calls, Astrolink caches non-personal reference data for one hour:

Jira custom field IDs (e.g. Sprint, Story Points, Epic Link mappings).

JQL autocomplete reference data (fields, functions, reserved words).

These caches contain no personal information and are shared across all users on a single installation.

### 1.4 Browser local storage

Display preferences (theme, node style, filter toggles, etc.) are saved to your browser's localStorage on your device. This data never leaves your device and is clearable at any time via your browser settings.

## 2. Personal Data Processing

The personal data Astrolink processes during graph rendering is limited to:

Assignee and reporter display names (shown in tooltips and the side panel).

Assignee avatar URL (used in the avatar node style).

Comment author display names and timestamps (in the issue side panel).

We do **not** collect or store email addresses, IP addresses, passwords, authentication tokens, or any other personal data beyond what is required to render the visualisation. Atlassian account IDs are used as part of KVS keys to scope data per user; they are opaque identifiers assigned by Atlassian and contain no personal information. Astrolink never logs account IDs, work item keys, error messages, or stack traces.

## 3. Data Storage and Retention

| Storage Surface | Where | Retention |
| --- | --- | --- |
| Forge KVS (per-user data) | Atlassian-managed, sandboxed to your site | Until deletion or uninstall (TTLs noted in Section 1.2) |
| Forge KVS (non-personal caches) | Atlassian-managed, sandboxed to your site | 1 hour |
| Browser localStorage | On your device only | Until you clear it |
| External servers | None, Astrolink does not operate any | n/a |

## 4. Data Deletion on Uninstall

When you uninstall Astrolink, our Forge uninstall trigger sweeps every KVS entry created by the app (presets, saved positions, saved maps, pending seeds, version flags, and caches) and deletes them. The deletion is immediate and complete, no data is retained.

## 5. Data Sharing

We do not share, sell, or transfer any data to third parties. All data remains within the Atlassian ecosystem. Astrolink makes no external network calls.

## 6. Security

Runs entirely on Atlassian Forge infrastructure (sandboxed).

Read-only Jira scopes (`read:jira-work`, `read:jira-user`) plus `storage:app` for the per-user state above, the app cannot modify any of your Jira data.

All Jira API calls are made on behalf of the requesting user; Astrolink respects each user's existing Jira permissions.

Work items you lack permission to view appear as locked nodes with no metadata exposed.

No use of `asApp()` or other privilege escalation, and no external network egress.

## 7. GDPR Compliance

The data Astrolink stores is limited and per-user. Each user can:

**Right to access:** Request a copy of your stored presets, saved positions, and saved Maps via your Atlassian site administrator.

**Right to deletion:** Delete individual presets and saved Maps from within the app, or remove all data by uninstalling Astrolink.

**Right to portability:** Saved presets and Maps are stored as JSON and can be exported on request.

Atlassian account IDs used in KVS keys are the same opaque identifiers Atlassian assigns and contain no personal information.

## 8. Contact

For privacy inquiries:

Numeric Oasis Email: [contact@numericoasis.com](mailto:contact@numericoasis.com) Support Portal: [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39)

## 9. Changes to This Policy

We may update this privacy policy from time to time. The "Last Updated" date at the top will reflect the most recent revision.
