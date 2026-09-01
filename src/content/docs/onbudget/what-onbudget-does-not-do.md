---
title: "What OnBudget does not do"
app: "onbudget"
order: 6
description: "The limits of OnBudget stated plainly: no time tracking, no currency conversion, no invoicing, no writes to Jira, and no Data Center build."
# Written for the site, not migrated out of Confluence. The exporter
# only touches pages listed in its MAP, so a re-export leaves this alone.
---
## Does OnBudget run on Jira Data Center or Server?

No. OnBudget is built on Atlassian Forge, and Forge apps run only inside Atlassian's cloud, so there is no Data Center build and no Server build. It runs on Jira Cloud, and it also supports Jira Service Management. If your Jira is self-hosted, nothing here will help you today, and it is better to know that in one line than after a trial request.

## Does OnBudget record time?

No. OnBudget is not a time tracker, and it does not ask your team to become one. It reads whatever already landed in Jira worklogs and prices it, using a rate card that holds rates per user or per project role plus a fallback hourly rate for authors it does not recognise. If your team logs time through another app that writes to Jira worklogs, OnBudget costs those worklogs like any others. It neither competes with that app nor replaces it. It also does not need worklogs at all: four of the five costing methods never touch them, pricing story points per point, any numeric field per unit, work items closed or resolved per item, or work items sitting in chosen statuses per item.

## Does OnBudget convert between currencies?

No, and that is a decision rather than a gap. A report is denominated in one of 18 ISO currencies, including USD, EUR, GBP and BRL, and it stays in that currency. An invented exchange rate is worse than no exchange rate, because it puts a figure on the screen that looks precise, that nobody can reconcile, and that changes meaning the day the rate moves. A portfolio can hold reports in several currencies and filter by currency, but OnBudget will not roll them into one consolidated total. If you need that total, you need a finance system, and the CSV export is how you feed one.

## Does OnBudget do invoicing or track revenue?

No. OnBudget reports cost against a budget you set, and that is the whole job. It does not raise invoices, does not hold customer or supplier records, does not track revenue, and is not an accounting or billing system. What it hands an accounting system is a CSV export carrying the per work item breakdown behind every total, so a figure that started as a chart on a dashboard can be checked line by line.

## Does OnBudget require new custom fields?

No. There is nothing to add to a screen scheme, no workflow to edit, and nothing to backfill before a first report. OnBudget reads what your Jira already holds: story points, worklogs, existing numeric fields, statuses and resolutions. Because the point is to price a signal your team already produces, the builder samples your actual data and shows what share of your work items carries each method before you commit to one. Three methods measured against the same data can score very differently, and the builder shows all of them before you choose. That is the answer to "will this work on my data", given before you build anything rather than a week later.

## Can OnBudget change anything in Jira?

No. It holds two read scopes on Jira, read:jira-work and read:jira-user, plus storage:app for its own settings. There is no write scope, so it cannot create, edit, transition or delete a work item, and it adds no custom fields and makes no screen scheme changes. Every read is made with your own Jira permissions. A shared report is not a snapshot of your view either. It regenerates under the viewer's own Jira permissions, so nobody sees work items they could not already open in Jira, and the report warns when a viewer lacks access to part of its scope. The practical consequence is that trying it risks very little, because there is nothing in Jira for it to leave behind.

## Does OnBudget send your data outside Atlassian?

No. It runs entirely on Forge, inside Atlassian, which is what makes it eligible for Atlassian's Runs on Atlassian program. It stores your report settings and nothing else: never the content of your work items, never the results of a report. Account and group identifiers are hashed before they are used as storage keys. The CSV export is generated in your browser, so the data does not leave Atlassian in order to produce the file. Uninstalling the app purges everything it held.

## Is OnBudget free?

No. OnBudget is a paid app with a free trial, sold through the Atlassian Marketplace. Pricing lives on the [Marketplace listing](https://marketplace.atlassian.com/apps/2136850574/onbudget-cost-tracking-budget-reports-for-jira?utm_source=numericoasis&utm_medium=site&utm_campaign=doc-does-not-do&utm_content=doc-article) rather than here, because that is the one place it stays accurate. The trial is the honest way to test the answers above against your own Jira, and coverage discovery will tell you early whether any of the five methods has enough signal in your data to be worth building on.

## Why is this list so short?

Because the app does one job and declines the ones next to it. Costing work in Jira usually means installing a time tracking discipline first, or licensing a timesheet product and a financials product together, or building a reporting layer over worklog data, or keeping the spreadsheet that somebody exports on Fridays and that is wrong by Monday. OnBudget's claim is that you can skip all of that, and the price of that claim is everything listed above: no time recording, no currency conversion, no invoicing, no writes to Jira, no Data Center. What is left is four builder steps, a coverage check before you commit to a method, and a preview before you save. That is why a first report takes minutes rather than a change request, and it is the same reason the list of things it does not do is this short.
