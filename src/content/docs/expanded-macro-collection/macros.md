---
title: "Macros reference"
app: "expanded-macro-collection"
order: 2
description: "A reference for every macro in the Expanded Macro Collection, grouped by purpose, plus the per-space settings."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "584843266"
sourceTitle: "EMC - Macros Reference"
---

A reference for every macro in the Expanded Macro Collection, grouped by purpose, plus the per-space settings.

## Governance and compliance

### Sign-off and Acknowledgement

An auditable "I have read and acknowledge this" button for policies and SOPs. Each viewer who can read the page can acknowledge the current version; the macro records the signer, the version, and the time. Editors see a roster of who has signed (collapsed by default). Changing the configured version resets everyone to "not yet acknowledged" so a republished policy must be re-signed. Configuration: heading, statement, version, an optional required-by date, and whether the roster is shown. The Acknowledgements tab in Space Settings lists completion per page and exports an auditor CSV.

### Page Classification Banner

Labels a page with a data classification from a per-space set (default Public, Internal, Confidential, Restricted). Editors pick the classification; everyone sees a coloured banner; the classification is stamped into PDF and Word exports. The Classification tab in Space Settings manages the set, shows how many pages hold each classification, and bulk re-classifies. This is advisory labelling, not access control.

### Content Visibility

A bodied macro: type content inside it and restrict who can see it. The audience is the page creator (always), plus any specific users and any space roles you choose, matched on an any-of basis. Anyone who can edit the page also sees it. The content is a display-level filter and is suppressed in exports.

## Navigation and discovery

### Referenced By

Shows the pages that link to the current page (backlinks), cross-space, permission-aware, and paginated. Confluence search cannot answer "what links here", so the app maintains its own link index. Restricted pages are counted, not revealed.

### Related Pages

Surfaces pages related to the current one through the link graph: pages that share an outbound link target with this page (co-citation) plus pages that link directly to it, ranked by shared-connection strength and permission-filtered. Configuration: maximum results, whether to include direct links, and a this-space-only toggle.

### Numbered Headings

A bodied macro: type content with headings inside it and the headings render automatically numbered (1, 1.1, 1.2 and so on) on view and in PDF and Word export. A companion "Number headings" action in the page actions menu writes numbers into a page's real headings in place. Numbering style and indentation are configurable.

## Admin reporting

### Status Rollup Report

Rolls up Page Status Badge values across a space, or a page and its descendants, into a count per status with a permission-filtered, paginated drill-down of the pages on each status. Configuration: scope, which statuses to include, whether to show the page lists, and rows per page.

### Stale Content Report

Lists pages not updated within a chosen threshold (30, 90, 180, or 365 days), across a space or a page's descendants, oldest first, with last-modified date and days stale. Optional last-editor and labels columns. Read entirely in the browser, so it adds no backend cost.

### Advanced Children Display

A sortable, filterable, paginated table of child pages with columns for last modified, created, author, status, labels, version, and word count. Compact or detailed layout, direct children or full tree, with per-column show and hide.

### Page Metadata Card

An at-a-glance card of page metadata: author, created and modified dates, version, word count, and labels. Each field can be shown or hidden.

## Authoring

### PDF Page Divider

Inserts a hidden marker that forces a page break when the space is exported to PDF. It requires a one-time CSS snippet per space; the snippet and steps are on the PDF Page Divider Setup tab in Space Settings.

### Page Status Badge

A click-to-advance workflow status (configurable per space, for example Draft, In Review, Approved, Archived) stored per page. Only users who can edit the page can change it. The status is stored on the page itself and is removed when the page is deleted.

### Review Reminder

Flags a page as due for review when it has not been updated within a configurable number of days. Read in the browser, so it adds no backend cost.

## Space settings

A multi-tab page under Space Settings, then Integrations, then Expanded Macro Collection:

**Page Status**: manage the workflow status set (names, colours, order); deleting an in-use status warns and migrates affected pages.

**Classification**: manage the classification set (name, colour, banner text); rollup and bulk re-classify.

**Acknowledgements**: a read-only audit of Sign-off acknowledgements with a CSV export.

**PDF Page Divider Setup**: the one-time CSS snippet and instructions for PDF page breaks.
