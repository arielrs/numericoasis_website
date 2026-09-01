---
title: "Overview"
app: "field-scout"
order: 1
description: "How Field Scout audits Jira custom fields: usage classification, duplicate detection, the health score, and staying under 700 fields per space."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "508035075"
sourceTitle: "Field Scout - Custom Field Audit for Jira"
---

Field Scout is a free Atlassian Forge app for Jira Cloud that gives administrators a centralized dashboard to analyze and manage custom field usage across their entire instance.

Jira Cloud caps custom fields at **700 per space**, not across the whole site. Over time, fields accumulate from apps, migrations, and changing workflows, many ending up unused, duplicated, or forgotten. Field Scout scans every custom field and classifies it by usage, so you always know where you stand and which fields are safe to clean up.

## Why Field Scout?

| Challenge | How Field Scout Helps |
| --- | --- |
| **"A space is approaching the 700 custom field limit"** | Instantly see your total field count with visual warnings as a space approaches or exceeds the limit. |
| **"I don't know which fields are actually being used"** | Every field is classified as Active, Stale, Likely Unused, or Unused based on real usage data from Jira. |
| **"Old fields from removed apps are cluttering our instance"** | Filter by origin to see fields from ScriptRunner, Tempo, JSM, and other apps, even after the app is removed. |
| **"I need to audit fields before a migration"** | Export your entire field inventory to CSV with all metadata, screens, contexts, last used dates, and classifications. |
| **"Some fields have no description and nobody knows what they do"** | Toggle the Missing Description filter to instantly find undocumented fields that need attention. |
| **"I need to report on field hygiene to management"** | The Field Health Score gives you a single percentage that summarizes your instance's field hygiene, with actionable guidelines to improve it. |
| **"We have duplicate fields with similar names"** | Potential Duplicates detection finds exact-match and similar-name fields across your instance, including team-managed projects. |
| **"We need visibility into team-managed project fields"** | Load project data to discover team-managed-only fields and see per-project field counts. |

## Who Is This For?

Field Scout is designed for **Jira Cloud administrators**. It appears as an admin page accessible from Jira Settings.

| Role | Use Case |
| --- | --- |
| Jira Administrators | Audit custom fields, identify cleanup candidates, and stay within Jira's field limits. |
| Platform Teams | Monitor field sprawl across the instance and enforce field governance policies. |
| Migration Engineers | Export a complete field inventory before migrations to identify what to keep, merge, or remove. |
| Consultants | Quickly assess a client's field health and provide data-driven cleanup recommendations. |

## Key Features

**Field Health Score**, See your overall field hygiene at a glance with a percentage-based health score.

**Field Classification**, Every custom field is automatically classified as Active, Stale, Likely Unused, or Unused based on real usage data.

**Actionable Guidelines**, Get prioritized recommendations for cleaning up your fields, with clear ACTION, REVIEW, and TIP labels.

**Summary Dashboard**, At-a-glance cards showing Field Health Score, total field count, system fields, team-managed fields, unused fields, likely unused, and stale fields.

**Potential Duplicates**, Spot fields with identical or similar names that could be consolidated, with filtering by match type and field type.

**Fields by Origin**, Understand which products and apps created your fields, with per-origin health breakdowns in table or chart views.

**Fields by Type**, See how your fields are distributed across data types (text, select, date, etc.) in table, chart, or tag cloud views.

**Fields per Project**, See how many fields each project uses and which are unused, helping you identify project-level cleanup opportunities.

**Field Scope**, Know whether each field applies to all projects, only team-managed projects, or only company-managed projects.

**Origin Tracking**, See which product or app created each field: Jira Core, Jira Software, JSM, ScriptRunner, Tempo, Advanced Roadmaps, and more.

**Comprehensive Filtering**, Search by name or ID. Filter by status, field type, origin, scope, and last-used recency. Toggle filters for locked fields, missing descriptions, zero screens, and zero contexts.

**Direct Admin Links**, Click any field name to jump directly to its configuration page in Jira admin. Screen counts link to the field's screen associations.

**CSV Export**, Export your filtered view or the full field inventory to CSV for reporting, spreadsheets, or migration planning.

**Contextual Tooltips**, Hover over values to understand what they mean, field origins, screen associations, context assignments, scope, and last-used dates are all explained inline.

**Sortable Table**, Sort by any column. Configurable page sizes (25, 50, or 100 fields per page).

**Share Filters**, Share your current filter view with colleagues via a copyable text string.

**Description Column**, Toggle to show each field's description directly in the table for quick auditing.

## Field Classifications

| Classification | What It Means |
| --- | --- |
| **Active** | The field is on screens, has contexts configured, and has been used within the last year. |
| **Stale (>6 months)** | The field has screens and contexts, but has not been used in 6+ months. It may be trending toward disuse. |
| **Stale (>1 year)** | The field has screens and contexts, but has not been used in over one year. |
| **Likely Unused** | The field is missing screen associations or context assignments, or Jira does not track its usage. |
| **Unused** | The field has zero screens and zero contexts, it is not visible anywhere in Jira. |
| **System** | Built-in Jira fields managed by Atlassian. These cannot be deleted or modified. |
| **Not Tracked** | Team-managed-only fields where Jira does not provide usage tracking data. |

## Security & Privacy

**Read-only access**, Field Scout only reads field metadata. It cannot modify, create, or delete any fields or data.

**No data storage**, Nothing is stored on any server. All data is fetched in real-time and displayed in your browser.

**Admin-only access**, Only Jira site administrators can access Field Scout.

**Runs on Atlassian**, Fully hosted on Atlassian Forge infrastructure. No external data transfers.

## Getting Started

Install Field Scout from the Atlassian Marketplace.

In Jira, go to **Settings** (gear icon) > **Apps**.

Select **Field Scout** from the sidebar.

Your custom field analysis loads automatically.

(Optional) Click **Load project data** to see per-project field counts and discover team-managed-only fields.

## Support

For questions, feedback, or issues:

Email: [contact@numericoasis.com](mailto:contact@numericoasis.com)

Support Portal: [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39)
