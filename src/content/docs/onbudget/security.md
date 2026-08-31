---
title: "Security policy"
app: "onbudget"
order: 10
description: "Last Updated: July 2, 2026 App: OnBudget Vendor: Numeric Oasis"
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "589824001"
sourceTitle: "OnBudget - Security Policy"
---

**Last Updated:** July 2, 2026 **App:** OnBudget **Vendor:** Numeric Oasis

OnBudget is a budget and expense reporting app for Jira Cloud and Jira Service Management, built entirely on Atlassian Forge. This policy describes how the app is architected, how it protects data, and how Numeric Oasis develops, maintains, and responds to security matters. OnBudget runs entirely on Forge, makes no outbound network calls to external services, and requests only read-only access to Jira. This policy applies to Version 1.0, released in July 2026.

## 1. Security Architecture

OnBudget is built entirely on the Atlassian Forge platform and runs inside your Atlassian tenant. Its architecture is designed to minimize attack surface and keep data within Atlassian.

**No external servers.** The app runs entirely on Forge. There is no Numeric Oasis infrastructure hosting or processing your data.

**No data egress.** OnBudget makes no outbound network calls to external services. Charts and fonts are bundled locally, so no third-party endpoints are contacted at runtime. This is what makes the app eligible for the Atlassian "Runs on Atlassian" program.

**Sandboxed execution.** All code runs within the Forge sandbox, which isolates the app and enforces platform security controls.

**Least-privilege, read-only scopes.** The app requests only `read:jira-work`, `read:jira-user`, and `storage:app`. It has no write or manage scopes and cannot create, edit, delete, or transition Jira issues or change any Jira configuration.

**Permission-aware execution.** Jira reads run as the signed-in user, so the app never exposes data that user cannot already see. An app-level read is used only to load field and status metadata catalogs.

## 2. Data Protection

OnBudget stores only what is necessary to define and organize reports, and it recalculates results from live Jira data every time a report is opened.

**Minimal storage.** Using Atlassian Forge storage inside your Atlassian tenant, the app stores report definitions (origin, budget, currency, method, time frame, thresholds, gadget layout, and metadata such as name and timestamps), user preferences, share grants, per-user star and hide records, and project-role rate cards. Report results are never stored.

**Hashed identifiers.** Atlassian account IDs and group IDs are stored only as one-way hashes, never in plain text.

**Transient, in-memory generation.** When a report is opened, the app reads issues, worklogs, story points, numeric custom fields, statuses, and user or group lookups from Jira through the standard REST API, processes them in memory, and does not persist them.

**Ownership checks.** Report edit, delete, and share actions are restricted to the report owner.

**Permission gate on rate cards.** Writing project-role rate cards requires the Jira "Administer projects" permission.

**License enforcement.** The backend enforces the app license.

**Automatic deletion on uninstall.** All stored data is deleted automatically when the app is uninstalled.

## 3. Secure Development Practices

Security is built into how OnBudget is developed and released.

**Input validation and size caps.** All stored input is validated and size-capped before it is written.

**Safe JQL handling.** Text used in JQL is quoted and escaped.

**Structured error handling.** Errors are returned as structured messages without leaking internal detail.

**Automated security tests.** The codebase carries automated security tests.

## 4. Vulnerability Management

Numeric Oasis takes reports of potential security issues seriously and works to keep the app secure over its lifetime.

We review reported security issues affecting the app and its dependencies.

We prioritize addressing higher-severity issues.

Because OnBudget runs entirely on Forge, the underlying platform runtime is maintained by Atlassian.

## 5. Incident Response

If a security incident is identified, Numeric Oasis follows a structured response process.

**Identification.** Confirm and assess the scope and impact of the incident.

**Containment.** Contain the issue by deploying a corrected version or taking the app offline as needed.

**Notification.** Notify affected customers.

**Remediation and review.** Remediate the root cause and conduct a review to help prevent recurrence.

## 6. Reporting Security Issues

If you believe you have found a security vulnerability in OnBudget, please contact us so we can investigate.

Email [contact@numericoasis.com](mailto:contact@numericoasis.com).

Or open a request through our [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39).

Please include enough detail for us to reproduce and understand the issue, such as the steps involved and the expected versus observed behavior. We respond promptly to security reports.

## 7. Compliance

OnBudget is designed to support customer compliance obligations through data minimization and by keeping data within Atlassian.

**Data minimization.** The app stores only report definitions and related metadata, user preferences, share grants, per-user star and hide records, and project-role rate cards. Report results are never stored, Atlassian account IDs and group IDs are stored only as one-way hashes, and all stored data is deleted automatically when the app is uninstalled.

**Runs on Atlassian.** The app operates entirely within Atlassian, with no outbound network calls to external services and no external transfers of data.

## 8. Changes to This Policy

Numeric Oasis may update this policy from time to time. When we do, we will revise the "Last Updated" date shown at the top of this page. Continued use of OnBudget after an update constitutes acceptance of the revised policy.
