---
title: "Release notes"
app: "configuration-monitor"
order: 8
description: "Every Configuration Monitor release, newest first, with the features and fixes that shipped in each version."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "493256705"
sourceTitle: "CM - Release Notes"
---

## Version 4.0

**Release Date:** April 2026

Sprint lifecycle tracking and performance improvements.

### Sprint Tracking

**13th Tracked Section:** Sprints are now tracked as a full configuration section for Jira Software projects using Scrum boards.

**Sprint Lifecycle:** Detects sprint creation, deletion, start, close, and reopen events.

**Sprint Details:** Tracks changes to sprint name, start date, end date, and sprint goal.

**Full Attribution:** Identifies who created, started, closed, or modified each sprint.

**Smart Detection:** Automatically detects Scrum vs Kanban boards. Kanban projects are silently skipped, no errors, no noise.

**Sprint Filter:** New "Sprints" filter button appears only for Software projects, keeping the interface clean for other project types.

### Improvements

**Better Attribution:** Change attribution now matches by project identity (not just project key), resolving cases where attribution was missing for role changes, project updates, and other modifications.

**Workflow API Migration:** Migrated to the latest Jira workflow API for future-proof compatibility and richer transition rule data.

**Smart Lead Tracking:** Project lead and component lead changes are now compared by identity, so user renames no longer trigger false change alerts.

**Improved Anonymization:** Post-anonymization activity by the same user is tracked normally, ensuring ongoing accountability while respecting erasure of historical data.

---

## Version 3.0

**Release Date:** February 2026

Initial public release of Configuration Monitor for Jira Cloud.

### Configuration Monitoring

**12-Section Tracking:** Monitors Permissions, Notifications, Workflows, Screens, Issue Security, Roles, Work Types, Components, Versions, General Settings, JSM Queues, and JSM Request Types.

**Automatic Hourly Sync:** Configuration snapshots taken every hour, with support for large instances (100+ projects).

**Change Detection:** Detects additions, removals, and modifications with detailed before/after value comparison.

**Change Type Filtering:** Filter by Added, Removed, or Modified changes.

**Smart Change Detection:** User renames don't trigger false project lead or component lead change alerts.

**Enhanced Attribution:** All 12 tracked sections now have full change attribution, see exactly who made every change.

**Multiple Author Visibility:** See all contributors when multiple administrators modify the same configuration.

**Change Attribution:** Identifies which administrator made each configuration change.

### Change History

**Section and Date Filtering:** Filter changes by any tracked section and/or date range.

**Configurable Pagination:** View 25, 50, or 100 changes per page.

**Full Dataset Stats:** Stats and filters work across your entire change history, not just the current page.

**Open in New Tab:** Configuration and user profile links open in a new tab.

**Clickable Stats:** Click stat boxes to quickly filter by change type.

**Project Header:** Project name, key, and type badges displayed at the top.

**Empty State Guidance:** Clear messages when no changes exist or filters return no results.

**Direct Links:** Navigate directly to the relevant Jira configuration page for each change.

### Export

**Admin CSV Export:** Export user data as CSV from the GDPR Admin Panel with project context.

**CSV Export:** Export filtered changes to CSV (Excel-compatible).

### Multi-Product Support

**Project Type Detection:** Automatic detection of Software, Service Management, and Business projects (Team-managed and Company-managed).

**JSM Support:** Queue and Request Type change tracking for Jira Service Management projects.

**Issue Security Tracking:** Monitors security scheme assignments, security levels, and level membership.

**Smart Layout:** Automatically adapts the interface based on your project type, showing only the sections relevant to you.

### Sync Log

**Sync History:** View sync history with timestamps and change counts.

**Clean View:** Zero-change syncs are automatically hidden.

**Compact Layout:** All sync information on a single line for quick scanning.

**User Profiles:** Linked user profiles for attributed changes.

### Privacy & Compliance

**Minimal Data Footprint:** Only stores the data necessary for change detection and attribution.

**Automatic Retention:** 1-year data retention with automatic cleanup.

**Clean Uninstall:** All stored data is fully removed when the app is uninstalled.

**GDPR Admin Panel:** Site administrators can export or anonymize any user's data across all tracked projects.

**Smart Anonymization:** Post-anonymization activity by the same user is tracked normally, ensuring ongoing accountability while respecting erasure of historical data.

**Audit Trail Filtering:** Filter admin actions by Export or Anonymize.

**Linked Profiles in Audit Trail:** User names are clickable links to their Jira profile.

**Runs on Atlassian:** Fully hosted on Atlassian infrastructure. No external data transfers.
