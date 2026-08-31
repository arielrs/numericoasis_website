---
title: "Release notes"
app: "astrolink"
order: 8
description: "Every Astrolink release, newest first, with the features and fixes that shipped in each version."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "498597890"
sourceTitle: "Astrolink - Release Notes"
---

## Version 3.0, April 2026

**Release Date:** April 30, 2026

Major upgrade promoting a year of feature work to all Marketplace customers. Astrolink is now a complete relationship-and-dependency analysis tool, not just a graph viewer.

### Dependency analysis

- **Path Finder:** right-click any work item > *Find Path To...* to highlight the shortest chain of links between two items.
- **Impact Analysis:** right-click > *Show Impact* runs a heat-map showing every downstream item affected.
- **Dependency Health:** at-risk edges (e.g. a "blocked by" item still in To Do while the source is Done) are flagged automatically with red borders.

### Issue side panel

Click any node to open a side panel with the work item's description, comments, custom fields, components, fix versions, labels, environment, resolution, and timestamps.

### Visualization

- **10 node colour modes:** Type, Status, Priority, Assignee, Project, Component, Fix Version, Hierarchy Level, Sprint, Resolution.
- **11 glow ring modes:** Status, Priority, Assignee, Project, Component, Fix Version, Hierarchy Level, Sprint, Resolution, Type, plus None.
- **Cluster hulls:** group nodes by project, epic, assignee, sprint, or status with labelled convex hulls and tunable cluster density.
- **Stale highlighting:** dim work items not updated in 7, 14, 30, or 90 days.
- **Node Size slider:** dial nodes between 50 % and 150 %.
- **Show Keys toggle:** overlay the work item key on each node.

### Saved views

**5 built-in presets:** Default, Blockers Only, Presentation, Work Breakdown, and Status Flow.

**Unlimited custom presets per user**, save filters, layout, fields, and node style.

**Layout Lock:** pin manually-arranged node positions per work item, persisted for 30 days.

### Global Page

Open Astrolink as a full-page view powered by JQL, a project, or a filter as the source.

**Minimap** for navigating large graphs with viewport drag and click.

JQL autocomplete with field, operator, and value suggestions.

**Saved Maps** so favourite JQL / project / filter views are one click away.

**Open in Full View:** jump from the issue panel to the Global Page with the current work item seeded as the root.

### Productivity

**Stats Panel:** work items by type/status, connections by type, network density, orphan count, network cohesion, cluster count.

**PNG / SVG / JPG export** at viewport or full-graph scope, with high-resolution variants (2x).

**Keyboard shortcuts**, press `?` for the cheat sheet, `F` for fullscreen, etc.

**Search highlighting** with debounced input for responsive typing on large graphs.

### Polish & bug fixes

Search by partial work item key (e.g. `AST-1`) now works correctly, runs key and summary searches in parallel and dedupes the results.

Timeline auto-closes when other panels open and has its own x button.

JQL autocomplete dropdown dismisses on Esc, click-outside, and stays closed until you keep typing.

Consistent typography across all overlay menus and panels; node labels are easier to read at default scale.

Sky theme: stats meta line is now legible against the panel background.

Presets are theme-agnostic, applying a preset no longer overrides your selected theme.

Layout button now uses a paint-palette icon for discoverability.

JQL autocomplete suggestions for project / sprint / version values insert with correct quoting (no more double-wrapped `"\"Astrolink App\""`).

### Architecture & security

Migrated frontend build from Create React App to Vite 7, zero dependency vulnerabilities.

All Jira API calls run as `asUser()`, Astrolink respects each user's existing permissions.

Forge KVS (Atlassian-managed, sandboxed) for per-user presets, saved positions, and Maps; uninstall sweep deletes everything created by the app.

No external network egress, no `asApp()` use, no PII or work item keys in logs.

## Version 1.0, February 2026

**Release Date:** February 2026

Initial public release of Astrolink for Jira Cloud.

### Interactive Star Map

- **Force-Directed Graph:** Beautiful interactive visualization rendered directly in the Jira issue panel with zoom, pan, and drag.
- **Deep Traversal:** Follows issue links, hierarchies, epics, and subtasks up to 5 levels deep across projects.
- **Cross-Project Navigation:** Click any node to navigate directly to that work item, regardless of which project it belongs to.
- **Remote Links:** Linked Confluence pages and external URLs displayed as distinct node types.

### Visualization

- **5 Themes:** Dark, Light, Sky, High Contrast (accessibility/projectors), and Sunset.
- **5 Node Styles:** Icons, Circles, Avatars, Cards, and Compact.
- **Subtask Shrinking:** Toggle to render subtasks at 50% size for cleaner hierarchies.
- **Color-Coded Links:** Distinct colors for each link type, instantly identify blockers, hierarchies, and relationships.
- **Link Labels:** Toggle to display link type names on edges.
- **Fullscreen Mode:** Expand the map for presentations or detailed exploration.
- **Zoom to Fit:** One-click to center and fit the entire graph in view.

### Filtering and Search

- **Comprehensive Filters:** Filter by issue type, status, assignee, label, project, or link type. All combinable.
- **Real-Time Search:** Highlight matching nodes as you type.
- **Remote Link Toggles:** Show or hide Confluence pages and external links independently.

### Timeline

- **Timeline Playback:** Replay how your work item network grew over time.
- **Adjustable Speed:** 1x, 2x, and 4x playback speeds.
- **Date Scrubbing:** Drag the slider to any point in time.

### Tooltips

**Configurable Fields:** Choose which fields appear on hover, key, summary, type, status, assignee, priority, labels, project, and more.

**Confluence & External Tooltips:** Contextual information for linked pages and URLs.

### Compatibility

**Jira Product Discovery:** JPD ideas linked to delivery tickets appear naturally in the graph.

**All Project Types:** Works with Software, Service Management, and Business projects.

### Security & Privacy

- **Read-Only:** Astrolink cannot modify any of your data.
- **Permission-Aware:** Restricted work items appear as locked nodes, no data exposed.
- **Runs on Atlassian:** Fully hosted on Atlassian infrastructure. No external data transfers.
