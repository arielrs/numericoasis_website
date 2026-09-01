---
title: "Release notes"
app: "field-scout"
order: 8
description: "Every Field Scout release, newest first, with the features and fixes that shipped in each version."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "508297240"
sourceTitle: "Field Scout - Release Notes"
---

## Version 1.0

**Release Date:** March 2026

Initial public release of Field Scout for Jira Cloud.

### Field Analysis Dashboard

- **Field Health Score:** Instantly see your overall field hygiene as a clear percentage.
- **Automatic Classification:** Every custom field is classified as Active, Stale (>6 months or >1 year), Likely Unused, or Unused based on screen associations, context assignments, and last-used dates.
- **Summary Cards:** At-a-glance metrics showing Field Health Score, total field count, system fields, team-managed fields, unused fields, likely unused fields, and stale fields, with visual warnings as a space approaches or exceeds Jira's 700 field limit.
- **Actionable Guidelines:** Get prioritized cleanup recommendations, know exactly which fields need attention and why, with clear ACTION, REVIEW, and TIP labels.
- **Field Scope:** See whether each field applies to All Spaces, Team-Managed, or Company-Managed projects.
- **System Fields:** Built-in Jira fields are included for a complete picture of your field landscape.
- **Team-Managed Fields:** Discover fields that only exist in team-managed projects, previously invisible in the global field list.
- **Origin Tracking:** Identifies the product or plugin that created each field, Jira Core, Jira Software, JSM, Advanced Roadmaps, ScriptRunner, Tempo, and more.

### Analytics & Insights

- **Potential Duplicates:** Find fields with identical or similar names that may be candidates for consolidation. Filter by match type, field type, and toggle team-managed fields on or off.
- **Fields by Origin:** Understand which products and plugins created your fields. View as a table, bar chart, or pie chart, with health scores per origin.
- **Fields by Type:** See how your fields are distributed across data types. View as a table, bar chart, pie chart, or tag cloud.

### Fields per Project

- **Per-Project Field Counts:** See how many custom fields each project uses, with breakdowns for likely unused and unused fields. Click any count to filter the main table to that project.
- **Team-Managed Discovery:** Automatically discovers fields that only exist in team-managed projects, adding them to your complete field inventory.
- **700-Field Limit Context:** Company-managed projects share a field configuration, and the 700 field limit applies per space, so see which are approaching it.

### Filtering and Search

- **Text Search:** Find fields instantly by name or ID.
- **Multi-Select Filters:** Filter by classification status, field type, origin, scope, and last-used recency. All filters are combinable.
- **Toggle Filters:** Quick toggles for Locked Only, Missing Description, Zero Screens, and Zero Contexts.
- **Scope Filter:** Filter fields by scope, All Spaces, Team-Managed, or Company-Managed.
- **Clear All:** Reset all active filters with one click.

### Table and Navigation

- **Sortable Columns:** Sort by field name, ID, type, origin, screens, contexts, last used, status, or scope.
- **Scope Column:** See whether each field applies to All Spaces, Team-Managed projects, or Company-Managed projects.
- **Configurable Page Size:** Choose 25, 50, or 100 fields per page.
- **Direct Admin Links:** Click any field name to open its configuration page in Jira admin. Screen counts link directly to screen associations.
- **Description Column:** Optional column toggled on or off to display each field's description inline.
- **Description Tooltips:** Hover over any field name that has a description to see it in a tooltip.
- **Share Filters:** Share your current filter view with colleagues via a copyable text string.

### Export

**CSV Export:** Export your current filtered view or the complete field inventory to CSV.

**Comprehensive Data:** Exported CSV includes field ID, name, type, origin, screens, contexts, last-used date, status, scope, locked state, and description.

### Large Instance Support

**Optimized for Scale:** Field Scout handles instances with thousands of fields smoothly. If analysis takes longer, progress is shown and you can incrementally load remaining data.

### Contextual Help

**Inline Tooltips:** Hover over origin values, screen and context counts, scope, and last-used dates for plain-language explanations of what each value means.

### Security & Privacy

- **Read-Only:** Field Scout cannot modify, create, or delete any data.
- **No Data Storage:** Nothing stored on any server or in any browser.
- **Admin-Only Access:** Only Jira site administrators can access Field Scout.
- **Runs on Atlassian:** Fully hosted on Atlassian Forge infrastructure. No external data transfers.
