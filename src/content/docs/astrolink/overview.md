---
title: "Overview"
app: "astrolink"
order: 1
description: "How Astrolink renders the links between your Jira work items as an interactive star map: what it shows, where it appears, and how to read it."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "498696194"
sourceTitle: "Astrolink - Work Item Link Graph for Jira"
---

> **What's new in v3.0 (April 2026):** Path Finder, Impact Analysis, and Dependency Health analysis tools; full issue side panel; 10 node colour modes and 11 glow rings; saved presets; cluster hulls and Layout Lock; full-page Global view powered by JQL, project, or filter; minimap; PNG / SVG / JPG export; stats panel; keyboard shortcuts. See the [Release Notes](/documentation/astrolink/release-notes/) for the full list.

Astrolink is an Atlassian Forge app for Jira Cloud that visualizes your work item connections as an interactive star map. See every relationship between work items, epics, subtasks, Confluence pages, and external resources, rendered as a force-directed graph directly in your Jira issue panel, or as a full-page view powered by JQL, a project, or a filter.

Astrolink traverses links and hierarchies up to 10 levels deep and across projects, revealing hidden dependencies, blockers, and relationships that boards and lists cannot show. Find the shortest path between any two work items, run an impact analysis, and spot at-risk dependencies automatically. Navigate to any connected work item with a single click, no matter which project it lives in.

## Why Astrolink?

| Challenge | How Astrolink Helps |
| --- | --- |
| **"I can't see how my work items are connected"** | Instantly visualize every link, hierarchy, and dependency radiating from any work item in a beautiful interactive star map. |
| **"Dependencies are spread across multiple projects"** | Astrolink crosses project boundaries automatically. See connections to work items in any project, Confluence pages, and external URLs. |
| **"I don't know what's blocking what"** | Color-coded link types make blockers and critical paths immediately visible. Dependency Health flags at-risk edges (e.g. blocked-by items still in To Do while the source is Done) automatically. |
| **"What's the shortest path between these two tickets?"** | Path Finder, right-click a node, pick a target, and Astrolink highlights the shortest chain of links between them. |
| **"If we delay this ticket, what gets affected?"** | Impact Analysis, right-click a node and run a heat-map of every downstream item that depends on it. |
| **"Our issue map is too complex to understand"** | Powerful filtering by type, status, assignee, label, project, sprint, version, component, or link type. Cluster nodes by project, epic, assignee, sprint, or status. Search nodes instantly. |
| **"I need to present our work structure to stakeholders"** | Five themes (including High Contrast for projectors), fullscreen mode, customizable node styles, and PNG / SVG / JPG export at viewport or full-graph scope. |
| **"I want to save my favourite views and reapply them"** | Five built-in presets (Default, Blockers Only, Presentation, Work Breakdown, Status Flow) plus unlimited custom presets per user. Saved Maps store your favourite full-page JQL / project / filter views too. |
| **"I want to see how things evolved over time"** | Built-in timeline replays how your network of work items grew, with adjustable playback speed. |
| **"Our JPD ideas feel disconnected from delivery"** | Jira Product Discovery ideas linked to delivery tickets appear naturally in the graph. See the full chain from idea to implementation. |

## Who Is This For?

Any Jira user can use Astrolink. It appears as a panel on every issue and as a full-page Global view.

| Role | Use Case |
| --- | --- |
| Developers | Understand the full dependency chain before starting work. See what blocks you and what you block. Use Path Finder to trace links between two tickets. |
| Project Managers | Visualize project structure, identify bottlenecks, and present work relationships to stakeholders. Use Impact Analysis to scope schedule risk before reprioritising. |
| Scrum Masters | Identify cross-team dependencies during sprint planning. Spot disconnected work items and orphan tickets. Watch Dependency Health for at-risk edges. |
| Product Owners | See the full scope of an epic or initiative, including all linked work across projects. Cluster by epic or sprint to see structure at a glance. |
| Product Discovery Teams | Visualize how JPD ideas connect to delivery tickets, epics, and implementation work. |

## Key Features

### Visualization

**Interactive Star Map**, Zoom, pan, drag, and click to navigate.

**Deep Traversal**, Follows links, hierarchies, epics, and subtasks up to 10 levels deep across projects.

**Cross-Project Navigation**, Click any node to jump directly to that work item, regardless of project.

**10 Node Colour Modes**, Type, Status, Priority, Assignee, Project, Component, Fix Version, Hierarchy Level, Sprint, Resolution.

**11 Glow Ring Modes**, Independent of node colour, layered on top for a second dimension of context.

**5 Themes**, Dark, Light, Sky, High Contrast, and Sunset.

**4 Node Styles**, Icons, Compact, Cards, and Default.

**Stale Highlighting**, Dim work items not updated in 7, 14, 30, or 90 days.

**Cluster Hulls**, Group nodes by project, epic, assignee, sprint, or status with labelled convex hulls.

**Confluence & External Links**, Linked Confluence pages and external URLs shown as distinct node types.

### Analysis

**Path Finder**, Right-click any node > *Find Path To...* to highlight the shortest chain of links between two work items.

**Impact Analysis**, Right-click > *Show Impact* for a heat-map of every downstream item that depends on the selected one.

**Dependency Health**, At-risk edges (e.g. a "blocked by" item still in To Do while the source is Done) are flagged automatically.

**Stats Panel**, Work items by type and status, connections by type, network density, orphan count, network cohesion.

### Saved views & productivity

**Built-in Presets**, Default, Blockers Only, Presentation, Work Breakdown, Status Flow.

**Custom Presets**, Save your filters, layout, fields, and node style as reusable presets.

**Layout Lock**, Pin manually-arranged node positions per work item, persisted for 30 days.

**PNG / SVG / JPG Export**, Export the viewport or the full graph at standard or 2x resolution.

**Keyboard Shortcuts**, Press `?` for the cheat sheet.

**Real-Time Search**, Highlight matching nodes as you type.

**Configurable Tooltips**, Choose which fields appear on hover.

**Issue Side Panel**, Click any node to open a side panel with description, comments, custom fields, components, and fix versions.

**Timeline Playback**, Replay how your network of work items grew over time, with adjustable speed.

### Filtering

**Powerful Filters**, Filter by issue type, status, assignee, label, project, sprint, version, component, or link type. All combinable.

**Remote Link Toggles**, Show or hide Confluence pages and external URLs independently.

**Subtask Shrinking**, Render subtasks at 50% size for cleaner hierarchies.

## Global Page

Open Astrolink as a full-page view from the Jira app launcher, powered by any of three sources:

**JQL**, Type or paste a JQL query with autocomplete for fields, operators, and values.

**Project**, Pick a project from the typeahead.

**Filter**, Pick any saved Jira filter from the typeahead.

The Global Page includes a minimap for navigating large graphs, every visualization and analysis feature from the issue panel, and Saved Maps so your favourite views are one click away. From the issue panel, the **Open in Full View** button jumps to the Global Page with the current work item already seeded as the root.

## Jira Product Discovery

Astrolink works with **Jira Product Discovery (JPD)** out of the box. Links between ideas and delivery tickets are automatically traversed, letting you visualize the full journey from product idea to implementation.

**Note:** Astrolink appears in the standard Jira issue panel. To view the star map for a JPD idea, open it in the standard Jira issue view.

## Security & Privacy

**Read-only Jira access**, Astrolink cannot modify any of your data.

**Permission-aware**, All Jira API calls run on behalf of the requesting user; work items you cannot access are shown as locked nodes with no information exposed.

**Sandboxed storage**, Per-user presets, saved layouts, and saved Maps are stored in Atlassian Forge KVS, sandboxed to your site. Uninstalling the app deletes all stored data.

**No external network egress**, Fully hosted on Atlassian Forge infrastructure. No data leaves your Atlassian site.

**No PII in logs**, Astrolink never logs account IDs, work item keys, error messages, or stack traces.

For full details, see the [Astrolink Privacy Policy](/documentation/astrolink/privacy/).

## Getting Started

After installing Astrolink, a Jira administrator needs to enable it for your projects:

Open any work item in your Jira project.

Click the **View App Actions** icon (puzzle piece) in the issue panel area.

Select **Astrolink** from the list.

Click the **...** (three dots) menu on the Astrolink panel header.

Select **Show for all work items** to enable Astrolink across the project.

Once enabled, Astrolink will appear automatically on every work item in that project for all users. Open the Global Page from the Jira app launcher to use Astrolink with JQL, projects, or filters.

## Support

For questions, feedback, or issues:

Email: [contact@numericoasis.com](mailto:contact@numericoasis.com)

Support Portal: [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39)
