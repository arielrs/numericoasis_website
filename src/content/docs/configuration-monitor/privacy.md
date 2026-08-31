---
title: "Privacy policy"
app: "configuration-monitor"
order: 9
description: "What Configuration Monitor stores, why it keeps change attribution for a year, and how the GDPR panel works. The privacy policy, in full."
# Migrated from Confluence. Kept so a page can be traced back to its origin.
sourcePageId: "492339201"
sourceTitle: "CM - Privacy Policy"
---

**Last Updated:** March 30, 2026 **App:** Configuration Monitor **Vendor:** Numeric Oasis

## 1. Data We Collect

Configuration Monitor collects and stores the following data within Atlassian Forge storage (hosted on Atlassian infrastructure):

- **Configuration Snapshots:** Point-in-time captures of project settings including permission schemes, notification schemes, workflows, screens, issue security levels, roles, issue types, components, and versions. These contain scheme names, IDs, and structural data but no issue content or user-generated content.
- **Change Records:** When configuration differences are detected between snapshots, we store: the section, type of change, entity name, before/after values, and timestamp.
- **Change Attribution:** For each detected change, we attempt to identify the administrator who made the change using the Jira audit log. We store their Atlassian Account ID and display name.
- **Sync Log:** Records of when syncs occurred, whether manual or scheduled, and who triggered manual syncs (Account ID and display name).

## 2. Personal Data Processing

The only personal data we process is:

- **Atlassian Account ID:** A pseudonymized identifier assigned by Atlassian.
- **Display Name:** The public display name associated with the Atlassian account.

We do **not** collect or store: email addresses, IP addresses, passwords, authentication tokens, issue content, attachments, or any data beyond configuration metadata.

## 3. Legal Basis (GDPR Art. 6)

We process personal data under **legitimate interest** (Art. 6(1)(f)) - the interest of Jira administrators in maintaining an audit trail of who changed project configurations.

## 4. Data Storage and Retention

- **Storage Location:** All data is stored exclusively in Atlassian Forge Storage, hosted on Atlassian's cloud infrastructure. We do not store data on any external servers.
- **Retention Period:** Change records are retained for a maximum of 1 year. Records older than 1 year are automatically purged. A maximum of 1000 change records are stored per project.
- **Data Deletion:** All app data is automatically deleted when the app is uninstalled. Project-specific data can also be cleared manually via the app's UI.

## 5. Data Subject Rights (GDPR)

Under GDPR, data subjects have the following rights which we support:

- **Right of Access (Art. 15):** Site administrators can export all data associated with a specific Atlassian Account ID using the Admin panel.
- **Right to Erasure (Art. 17):** Site administrators can anonymize all data associated with a specific Atlassian Account ID. This replaces the display name with "Anonymized User" in all change records created before the anonymization. The Account ID is preserved for audit compliance. If the same user remains active and makes new configuration changes after being anonymized, those new changes will show their current display name, maintaining accountability for ongoing activity while respecting their right to erasure for historical data. This action is logged in the admin audit trail.
- **Right to Rectification (Art. 16):** Display names are fetched from Atlassian's user API and reflect the current Atlassian account name. If a user changes their display name, future syncs will use the updated name.

## 6. Data Sharing

We do not share, sell, or transfer any data to third parties. All data remains within the Atlassian ecosystem.

## 7. Security

Data is protected by Atlassian Forge's built-in security measures including encryption at rest and in transit, app sandboxing, and OAuth 2.0 authentication.

## 8. Sub-Processors

We use only Atlassian as our sub-processor. No other sub-processors are involved.

## 9. Contact

For privacy inquiries or data subject requests:

Numeric Oasis Email: [contact@numericoasis.com](mailto:contact@numericoasis.com) Support Portal: [Customer Support Portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39)

## 10. Changes to This Policy

We may update this privacy policy from time to time. The "Last Updated" date at the top will reflect the most recent revision.
