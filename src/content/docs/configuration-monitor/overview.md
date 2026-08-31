---
title: "Overview"
app: "configuration-monitor"
order: 1
description: "How Configuration Monitor gives Jira project admins a searchable audit log of every configuration change, with no site admin access required."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "492306433"
sourceTitle: "Configuration Monitor - Project Audit Log for Jira"
---

Configuration Monitor is an Atlassian Forge app for Jira Cloud that gives Project Administrators full visibility into what changed in their project configuration, when it changed, and who changed it. It automatically monitors 13 configuration sections across all project types, including Jira Service Management, and provides filtering, export, and audit capabilities directly within your project settings.

## Why Use Configuration Monitor?

### For Project Administrators

Configuration Monitor puts change visibility directly in the hands of Project Administrators. Instead of filing a ticket with your Jira Site Admin every time something breaks or looks different, you can see exactly what changed, when, and who did it, right from your project settings. No escalation needed.

| Challenge | How Configuration Monitor Helps |
| --- | --- |
| **"Something broke, but I don't know what changed"** | Instantly see every configuration change with before/after values. Filter by date range to pinpoint exactly when a breaking change was introduced. |
| **"I don't know who changed our permissions"** | Change attribution identifies the administrator who made each change via audit log correlation. |
| **"I can't keep track of all the settings that matter"** | Monitors 13 configuration sections automatically, permissions, notifications, workflows, screens, security, roles, work types, components, versions, project settings, JSM queues and request types, and Sprints (for Scrum projects). |
| **"I need to report on configuration changes for compliance"** | Generate CSV exports of all filtered changes directly in the app. Copy and paste into Excel or Google Sheets for compliance reporting. |
| **"I only notice problems long after they happen"** | Automatic hourly syncing captures changes within an hour. No manual checking required. |
| **"Multiple admins manage our project and we step on each other"** | The change log serves as a shared record of all configuration activity. |
| **"I always have to ask the Site Admin to check what changed"** | Project Admins get full change visibility directly in their project settings, no need to escalate to Site Admins for routine configuration investigations. |
| **"A user renamed themselves and now our reports look wrong"** | Project lead and component lead changes are tracked by identity, not display name. A user renaming themselves won't trigger false change alerts. |

### For Jira Site Administrators

- **Site-wide oversight:** Works across every project. Each project maintains its own independent change history.
- **GDPR compliance:** The Admin Panel lets you export or anonymize user data across all tracked projects, satisfying Right of Access and Right to Erasure.
- **Reduced support burden:** Project Admins can self-serve on configuration change inquiries, freeing Site Admins to focus on strategic work instead of answering "who changed this?" questions.
- **Zero maintenance:** Syncs automatically every hour, retains data for up to 1 year, purges old records, and fully cleans up on uninstall.

### For Teams and Organizations

- **Onboarding:** New project admins can review the change history to understand the current configuration.
- **Incident response:** Quickly identify the root cause when workflows break, notifications stop, or permissions change.
- **Audit readiness:** Continuous audit trail of who changed what and when, exportable at any time.
- **Decentralized accountability:** Project Admins own their configuration visibility, reducing bottlenecks and dependency on centralized Jira administration.
- **Change management:** Passive record of all modifications, bringing accountability to configuration management.

## Who Is This For?

**Project Administrators** are the primary audience. Any Project Admin can access Configuration Monitor in their project's settings sidebar.

**Jira Site Administrators** have additional access to the GDPR Admin Panel for site-wide user data management.

| Capability | Project Admin | Site Admin |
| --- | --- | --- |
| View configuration changes | ✅ | ✅ |
| Run manual sync (Refresh Now) | ✅ | ✅ |
| Filter and search changes | ✅ | ✅ |
| Generate CSV export | ✅ | ✅ |
| View sync log | ✅ | ✅ |
| GDPR Admin Panel | ❌ | ✅ |

## Features

- **Automatic Syncing:** Configuration snapshots every hour and on install. Manual sync available. Large instances (100+ projects) use Forge Queue for batched processing.
- **Change Detection:** Compares snapshots to detect additions, removals, and modifications across all tracked sections.
- **Change Attribution:** Identifies which administrator made each change via audit log correlation (see *Change Attribution Details* below).
- **Section Filtering:** Filter changes by any of the 13 tracked sections.
- **Date Range Filtering:** Filter changes by start and end date.
- **Configurable Pagination:** Choose 25, 50, or 100 changes per page.
- **Change Type Filtering:** Instantly filter your change log by Added, Removed, or Modified changes.
- **Clickable Stats Dashboard:** Click the Total, Added, Removed, or Modified stat boxes to quickly filter your view.
- **Full Dataset Filtering:** Filters and stats always reflect your complete change history, not just the current page.
- **Open in New Tab:** All links to Jira configuration pages, user profiles, and schemes open in a new browser tab so you never lose your place.
- **Project Context Header:** See your project name, key, type, and management style at a glance.
- **Clear Empty States:** Helpful guidance messages when no changes exist yet or when your filters return no results.
- **Multiple Author Visibility:** When multiple administrators modify the same configuration in the same period, all contributors are shown.
- **CSV Export:** Generate CSV of all filtered changes in-app. Copy and paste into Excel or Google Sheets. Includes date, time, section, type, entity, details, changed by (name + account ID), and before/after values. Also available in the GDPR Admin Panel for site-wide user data export with project context.
- **Sync Log:** View sync history, zero-change syncs are automatically hidden for a clean view. All information displayed on a single line.
- **Project Type Detection:** Displays project type (Software/Service Management/Business) and management style (Team-managed/Company-managed).
- **Smart Team-Managed Handling:** Automatically hides irrelevant sections (Components, Versions) for team-managed projects and shows contextual disclaimers.
- **Sprint Tracking:** For Jira Software projects using Scrum boards, tracks sprint creation, start, close, reopen, name changes, date changes, and goal updates. Kanban projects are automatically detected and skipped.
- **JSM Support:** For Jira Service Management projects, additionally tracks Queues and Request Types.
- **Issue Security Tracking:** Monitors security scheme assignments, levels, and membership changes.
- **GDPR Admin Panel:** Site administrators can export or anonymize user data.
- **Action Filtering:** Filter the audit trail by Export or Anonymize actions to quickly find what you need.
- **Linked User Profiles:** User names in the audit trail are clickable links to their Jira profile.
- **Smart Anonymization:** After anonymizing a user, only their historical activity is anonymized. If the same user remains active and makes new changes, those are tracked normally, ensuring ongoing accountability while respecting their right to erasure for past data.
- **Admin CSV Export:** Export a specific user's change data as CSV directly from the Admin Panel.
- **Data Retention:** Changes older than 1 year are automatically purged. Maximum 1000 changes per project.
- **Clean Uninstall:** All stored data is removed when the app is uninstalled.
- **Runs on Atlassian:** Fully eligible for the Runs on Atlassian program. No data egress.

## Tracked Configuration Sections

| Section | What is Tracked | Team-Managed |
| --- | --- | --- |
| Permissions | Permission scheme assignment, individual permission grants | Limited |
| Notifications | Notification scheme assignment, event notification rules | ✅ |
| Workflows | Workflow scheme assignment, statuses, transitions, and transition rules | ✅ |
| Screens | Issue type screen scheme, screen scheme assignments, screen tab fields | Limited |
| Issue Security | Issue security scheme assignment, security levels, and level membership | N/A |
| Roles | Project role membership changes, users and groups added or removed | ✅ |
| Work Types | Work type (issue type) additions, removals, and property modifications | ✅ |
| Components | Component additions, removals, lead and default assignee changes | Skipped |
| Versions | Version additions, removals, release and archive status changes | Skipped |
| General | Project name, description, lead, default assignee type, project category, and type changes | ✅ |
| Queues (JSM) | Queue additions, removals, JQL filter and column changes | ✅ |
| Request Types (JSM) | Request type additions, removals, description and portal group changes | ✅ |
| Sprints | Sprint creation, deletion, start, close, reopen, name changes, date changes, and goal updates (Scrum boards only) | ✅ |

## Team-Managed Project Limitations

Team-managed (next-gen) projects use a simplified configuration model that differs from company-managed (classic) projects. The following limitations apply:

- **Components and Versions:** Automatically skipped for team-managed projects, as these do not use traditional components or versions.
- **Screens and Field Configurations:** Team-managed projects configure fields directly on work types rather than through screen schemes. Due to Jira REST API constraints, field configuration changes on work type screens are not currently trackable.
- **Permissions:** Team-managed projects use simplified permission models. Some scheme-based permission details may show limited data.
- **Issue Security:** Not applicable to team-managed projects.

## Change Attribution Details

Configuration Monitor identifies which administrator made each change through audit log correlation. Attribution is resolved by matching detected changes against Jira's audit log records using entity name matching and section-specific keyword fallback.

**Important:** Attribution may not be available for all change types. Bulk operations, scheme-level edits affecting multiple projects, or changes made through third-party integrations may not produce matching audit records.

| Section | Attribution | Details |
| --- | --- | --- |
| General | ✅ Full | Project name, description, lead, assignee type, and category changes are directly tied to the project. |
| Work Types | ✅ Full | Work type changes have clear entity names that match accurately. |
| Components | ✅ Full | Components are project-specific entities. |
| Versions | ✅ Full | Versions are project-specific entities. |
| Roles | ✅ Full | Role membership changes are well-attributed. |
| Workflows | ✅ Full | Identifies who modified workflows, transitions, and rules. |
| Issue Security | ✅ Level-level | Identifies who changed security levels and membership. |
| Permissions | ✅ Full | Identifies who changed any permission in the project's scheme. |
| Notifications | ✅ Full | Identifies who modified notification rules. |
| Screens | ✅ Full | Identifies who changed screen configurations. |
| Queues (JSM) | ✅ Best-effort | Queue changes detected and attributed through project-level matching. |
| Request Types (JSM) | ✅ Best-effort | Request type changes detected and attributed through project-level matching. |

## Technical Details

- **Platform:** Atlassian Forge
- **Sync interval:** Automatic hourly syncing with manual refresh available
- **Runs on Atlassian:** Fully eligible. All data stays within Atlassian infrastructure.
