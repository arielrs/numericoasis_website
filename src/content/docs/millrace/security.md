---
title: "Security policy"
app: "millrace"
order: 10
description: "Last Updated: July 14, 2026 App: Millrace Vendor: Numeric Oasis"
draft: true
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "600145921"
sourceTitle: "Millrace - Security Policy"
---

**Last Updated:** July 14, 2026 **App:** Millrace **Vendor:** Numeric Oasis

Millrace is a Critical Chain Project Management app for Jira Cloud, built entirely on Atlassian Forge. This policy describes how the app is architected, how it protects data, and how Numeric Oasis develops, maintains, and responds to security matters. Millrace runs entirely on Forge, makes no outbound network calls to external services, and requests only read-only access to Jira. This policy applies to Version 1.0, released in July 2026.

## 1. Security Architecture

Millrace is built entirely on the Atlassian Forge platform and runs inside your Atlassian tenant. Its architecture is designed to minimize attack surface and keep data within Atlassian.

**No external servers.** The app runs entirely on Forge. There is no Numeric Oasis infrastructure hosting or processing your data.

**No data egress.** Millrace makes no outbound network calls to external services. Charts and fonts are bundled locally, so no third-party endpoints are contacted at runtime. This is what makes the app eligible for the Atlassian "Runs on Atlassian" program.

**Sandboxed execution.** All code runs within the Forge sandbox, which isolates the app and enforces platform security controls.

**Least-privilege, read-only scopes.** The app requests only `read:jira-work`, `read:jira-user`, and `storage:app`. It has no write or manage scopes and cannot create, edit, delete, or transition Jira work items or change any Jira configuration.

**Read-only engine.** The scheduling engine runs asynchronously in Forge functions and only ever reads Jira to compute a schedule; it never writes to Jira. Interactive lookups such as the project, user, and group pickers run as the signed-in user.

## 2. Data Protection

Millrace stores only what is necessary to define, compute, and organize reports, and it keeps computed results as a cache that is refreshed from live Jira data.

**Minimal storage.** Using Atlassian Forge storage inside your Atlassian tenant, the app stores report definitions, cached computed results (schedule, buffers, fever data, and forecast, with work item keys and summaries as task labels), fever-chart history, user preferences, and share grants. Issue descriptions, comments, and attachments are never read or stored.

**Hashed identifiers.** Atlassian account IDs and group names are stored only as one-way (SHA-256) hashes, never in plain text. For sharing, the selected display label is stored so it can be shown in the sharing dialog.

**Access control.** A report is visible to its owner and to the users and groups it is explicitly shared with. Editing, deleting, and sharing a report are restricted to the report owner.

**License enforcement.** The app is a paid Marketplace app and enforces its license.

**Automatic deletion on uninstall.** All stored data is deleted automatically when the app is uninstalled.

## 3. Secure Development Practices

Security is built into how Millrace is developed and released.

**Input validation and size caps.** All stored input is validated and size-capped before it is written, and no single stored value exceeds platform limits.

**Safe JQL handling.** Text used in JQL is quoted and escaped.

**Structured error handling.** Errors are returned as structured messages without leaking internal detail.

**Automated tests.** The codebase carries automated engine correctness tests and security policy tests.

## 4. Vulnerability Management

Numeric Oasis takes reports of potential security issues seriously and works to keep the app secure over its lifetime.

We review reported security issues affecting the app and its dependencies.

We prioritize addressing higher-severity issues.

Because Millrace runs entirely on Forge, the underlying platform runtime is maintained by Atlassian.

## 5. Incident Response

If a security incident is identified, Numeric Oasis follows a structured response process.

**Identification.** Confirm and assess the scope and impact of the incident.

**Containment.** Contain the issue by deploying a corrected version or taking the app offline as needed.

**Notification.** Notify affected customers.

**Remediation and review.** Remediate the root cause and conduct a review to help prevent recurrence.

## 6. Reporting Security Issues

If you believe you have found a security vulnerability in Millrace, please contact us so we can investigate.

Email [contact@numericoasis.com](mailto:contact@numericoasis.com).

Or open a request through our [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39).

Please include enough detail for us to reproduce and understand the issue, such as the steps involved and the expected versus observed behavior. We respond promptly to security reports.

## 7. Compliance

Millrace is designed to support customer compliance obligations through data minimization and by keeping data within Atlassian.

**Data minimization.** The app stores only report definitions, cached results, fever-chart history, preferences, and share grants. Account IDs and group names are stored only as one-way hashes, and all stored data is deleted automatically when the app is uninstalled.

**Runs on Atlassian.** The app operates entirely within Atlassian, with no outbound network calls to external services and no external transfers of data.

## 8. Changes to This Policy

Numeric Oasis may update this policy from time to time. When we do, we will revise the "Last Updated" date shown at the top of this page. Continued use of Millrace after an update constitutes acceptance of the revised policy.
