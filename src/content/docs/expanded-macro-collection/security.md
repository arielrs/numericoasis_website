---
title: "Security policy"
app: "expanded-macro-collection"
order: 10
description: "Where the Expanded Macro Collection runs, what it stores, who can read it, and what happens when you uninstall it."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "588316676"
sourceTitle: "EMC - Security Policy"
---

**Last Updated:** June 30, 2026 
**App:** Expanded Macro Collection 
**Vendor:** Numeric Oasis

This document describes how Numeric Oasis secures Expanded Macro Collection and the practices we follow to protect customer data and maintain the integrity of the app.

## 1. Security Architecture

- **No external servers:** all compute and storage runs within Atlassian's own infrastructure. The app operates no vendor-hosted servers or databases.
- **No data egress:** the app makes no outbound network calls to any external service. All data remains within Atlassian's platform boundary.
- **Sandboxed execution:** each app invocation runs in an isolated, Atlassian-managed sandbox.
- **Permission-aware reads:** macros read Confluence content with the authenticated user's own permissions, so users only see content they are authorised to view; restricted pages are counted but never revealed.
- **Permission-enforced writes:** the only content the app writes is the Page Status and Page Classification values it stores as page content properties. These writes are performed as the requesting user, so Confluence rejects them unless that user can edit the page.
- **Least privilege:** the app requests only the permissions its features need: read access to pages, spaces, users, labels, page hierarchy, content permissions, groups, and space permissions, and write access limited to the page content properties and the app storage it owns.

## 2. Data Protection

- **Minimal data storage:** the app stores a page-to-page link index (page identifiers and titles), workflow status and classification values (as content properties on the page), a classification index, sign-off acknowledgement records, and per-space configuration. It does not store page bodies, comments, attachments, or search queries.
- **Personal data:** the only personal data stored is Atlassian account identifiers (opaque platform IDs), plus a user display name captured at the time of a sign-off. These are restricted by Confluence to authenticated users and are never exposed in exports or to anonymous viewers.
- **Automatic cleanup:** all app-stored data is permanently deleted when the app is uninstalled, and a page's records are removed when the page is deleted. Status and classification values, being content properties, are removed by Confluence together with the page.
- **Transient processing:** page bodies, metadata, labels, and role or group lookups are read on demand and processed in memory; they are not persisted except as the indexes described above.
- **Log hygiene:** diagnostic logs never include account identifiers, page content, page titles, or request payloads. Only non-sensitive operation counts and identifiers are logged, and this is enforced by automated tests.

## 3. Secure Development Practices

- **Input validation:** all user-supplied input, including content IDs, space keys, and configuration values, is validated and sanitised before it is used in an API call or a storage key.
- **Permission filtering:** data returned to the user interface is filtered through the viewer's own permissions, so restricted content is never disclosed, only counted.
- **Dependency management:** third-party dependencies are kept to a minimum and reviewed for known vulnerabilities.
- **Code review:** all code changes undergo review before deployment to production.
- **Automated security checks:** the codebase includes automated tests that verify no request payloads or events are logged, no unsafe UI patterns are introduced, and storage is accessed only through the correct, supported APIs.

## 4. Vulnerability Management

- **Monitoring:** we monitor platform advisories and dependency vulnerability databases for issues that may affect the app.
- **Response time:** high-severity issues are prioritised for prompt assessment, and patches are deployed as quickly as is safe.
- **Platform updates:** the app runs on the latest supported platform runtime and follows Atlassian's recommended versions.

## 5. Incident Response

In the event of a security incident affecting the app:

- **Identification:** we investigate and assess the scope and impact of the issue.
- **Containment:** if necessary, the app can be redeployed or taken offline to prevent further exposure.
- **Notification:** affected customers are notified through our support channels with details of the incident and any recommended actions.
- **Remediation:** a fix is developed, tested, and deployed, followed by a post-incident review to prevent recurrence.

## 6. Reporting Security Issues

If you discover a security vulnerability or have concerns about the app's security, please contact us immediately:

Email: [contact@numericoasis.com](mailto:contact@numericoasis.com)

Website: [numericoasis.com](https://numericoasis.com/)

We take all security reports seriously and will respond as quickly as possible. Please include as much detail as you can to help us investigate and resolve the issue.

## 7. Compliance

**GDPR:** the app is designed with privacy by default. It stores minimal personal data, restricts it to authenticated users, and deletes it on uninstall and on page removal. Data subject requests can be fulfilled by contacting us.

**Data residency:** all app data is stored within Atlassian's infrastructure and follows the customer's own Confluence environment. The app performs no external data transfers.

## 8. Changes to This Policy

We may update this security policy as our practices evolve. The "Last Updated" date at the top reflects the most recent revision.
