---
title: "Privacy policy"
app: "expanded-macro-collection"
order: 9
description: "What the Expanded Macro Collection stores, including the sign-off records it keeps by design, and what it never sends anywhere."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "584908801"
sourceTitle: "EMC - Privacy Policy"
---

**Last Updated:** June 29, 2026 
**App:** Expanded Macro Collection 
**Vendor:** Numeric Oasis

## 1. Data We Collect

Expanded Macro Collection collects and processes only the minimum data necessary to provide its macros:

- **Page workflow state (Confluence content properties):** Page Status and Page Classification are stored as content properties on the page itself. Each records the status or classification value, a timestamp, and the Atlassian account ID of the user who last set it.
- **Link index (app storage):** page-to-page link relationships (page identifiers and titles) used by Referenced By and Related Pages.
- **Acknowledgement records (app storage):** when a user acknowledges a page via the Sign-off macro, the app records the page, the version acknowledged, the timestamp, and the acknowledging user's Atlassian account ID and display name (captured at the time of signing).
- **Per-space configuration and crawl bookkeeping (app storage):** the space's workflow status and classification sets, and internal crawl timestamps and a schema version.
- **Transient reads (not stored):** to render the macros, the app reads page bodies, metadata, labels, space roles, and group membership from Confluence via the standard REST API. This data is processed in memory and is not stored, except as the indexes described above.

## 2. Personal Data Processing

The app processes minimal personal data:

The Atlassian account ID (and, for sign-offs, the display name captured at signing) is recorded so the app can attribute acknowledgements and "last changed by" within the relevant macros.

Display names are otherwise resolved on demand at render time and are not stored.

We do **not** collect or store email addresses, IP addresses, passwords, authentication tokens, page text content, comments, or attachments, beyond the transient reads needed to render a macro.

## 3. Data Storage and Retention

**Where:** all app-stored data resides on Atlassian's Forge infrastructure within your tenant. No data leaves the Atlassian environment.

**Content properties** (Page Status, Classification) are removed automatically by Confluence when the page is deleted.

**App storage** (link index, acknowledgement records, classification index, configuration) is retained for the lifetime of the install. A removed page's link, acknowledgement, and classification records are deleted when the page is removed.

## 4. Data Sharing

We do not share, sell, or transfer any data to third parties. All data remains within the Atlassian ecosystem. The app makes no outbound network calls to any external service.

## 5. Security

Runs entirely on Atlassian Forge infrastructure (a sandboxed environment).

Reads Confluence with the viewer's own permissions, so users only see content they are authorised to view; restricted pages are never revealed.

Diagnostic logs are sanitised: account IDs, page content, and request payloads are never logged.

Your data never leaves the Atlassian Cloud environment.

## 6. Data Deletion

**On uninstall:** all app-stored data (link index, acknowledgement records, classification index, and configuration) is deleted from Atlassian Forge storage.

**Manual request:** contact us at [contact@numericoasis.com](mailto:contact@numericoasis.com) to request data deletion at any time.

## 7. GDPR and User Data Requests

The Atlassian account IDs we store are opaque platform identifiers. To remove a specific user's footprint from the app's storage, an admin can submit a deletion request as described above; we will identify and remove all references to that account ID across acknowledgement and workflow records.

## 8. Contact

Email: [contact@numericoasis.com](mailto:contact@numericoasis.com)

Website: [numericoasis.com](https://numericoasis.com/)
