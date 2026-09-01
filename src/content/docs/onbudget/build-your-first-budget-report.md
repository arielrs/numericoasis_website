---
title: "Build your first budget report"
app: "onbudget"
order: 3
description: "Walk the four OnBudget builder steps in Jira Cloud, with JQL examples, the coverage check read properly, and fixes for totals that look wrong."
# Written for the site, not migrated out of Confluence. The exporter
# only touches pages listed in its MAP, so a re-export leaves this alone.
---
## What you will have at the end

A saved report that names a budget, measures spend against it from work already in Jira, and shows a health status, a breakdown of where the money went, and a forecast if you want one.

Building the first one takes minutes, and that is a statement about setup rather than about the app. There is nothing to prepare in Jira first: OnBudget adds no custom fields, changes no screen schemes, edits no workflows, and needs no backfill. It reads signals your team already records, and it is read only, so a report you get wrong costs nothing but the time it took to build.

You need OnBudget installed on your Jira Cloud site, from the [Marketplace listing](https://marketplace.atlassian.com/apps/2136850574/onbudget-cost-tracking-budget-reports-for-jira?utm_source=numericoasis&utm_medium=site&utm_campaign=doc-first-report&utm_content=doc-article). It is built on Atlassian Forge, so it is Cloud only. There is no Data Center or Server version.

Open **Apps** in Jira, open **OnBudget**, and start a new report. The builder is four steps and a preview, and nothing is written until you save, so you can walk the whole thing and abandon it.

## Step 1. Choose where the numbers come from

A report can be pointed at whole spaces, at individual work items picked by key, key prefix or summary text, or at a JQL query that is validated as you type.

JQL is the option worth learning, because it is the only one that expresses "this work, in this period".

Everything raised in one project since a date:

```
project = MKTG AND created >= "2026-01-01"
```

Everything under one epic:

```
parent = MKTG-412
```

Use `parent` rather than the older epic link function. Atlassian folded epic link, parent link and parentEpic into `parent`, and says the old functions keep working in existing searches but "you'll no longer be able to use them in new searches" ([Atlassian, Introducing the new Parent field in company-managed projects](https://community.atlassian.com/forums/Jira-articles/Introducing-the-new-Parent-field-in-company-managed-projects/ba-p/2377758)).

One toggle then pulls in sub-tasks and everything under an epic. Turn it on for the epic query above. If your team logs time or points on sub-tasks and the scope names only parent records, the report prices the parents and treats the work beneath them as zero. That toggle is the honest answer to "what did this epic cost", because an epic costs what the work underneath it costs, not what the epic record costs.

## Step 2. Set the budget, the currency and the two thresholds

Enter the total budget and pick a currency. There are 18 ISO currencies, including USD, EUR, GBP and BRL. A report is denominated in exactly one of them, and OnBudget does not convert between currencies, deliberately, because an invented exchange rate is worse than no exchange rate. A programme that spends in two currencies is therefore two reports. Number, decimal and date formats are set per report.

Then the two thresholds, expressed as percentages of budget consumed. **At risk** defaults to 80 percent and **over budget** to 100 percent, and both are configurable.

Set them deliberately, because three things read them:

- the health lozenge on the report,
- the colour of the budget health gauge,
- the sort order on the home screen, which is how the reports needing attention rise to the top of a portfolio.

That third one is why not to leave every report on the defaults. If a budget is a hard ceiling, 80 and 100 are right. If it is an envelope you expect to run close to, raise the at risk threshold, or every report sits amber and the sort stops meaning anything.

## Step 3. Pick the costing method, and read the coverage check

Five methods turn work into money:

1. Story points, priced per point.
2. Any numeric field, priced per unit.
3. Worklogs, priced by a rate card or a flat rate.
4. Work items closed or resolved, priced per item.
5. Work items sitting in statuses you choose, priced per item.

You can also leave the unit cost blank, in which case OnBudget divides the total budget across the total quantity.

Before you commit to one, OnBudget samples the data your scope actually returned and shows what share of those work items carries each signal. The shipped example shows three methods at 14 percent, 38 percent and 47 percent coverage.

Read that as the fraction of your scope the report will be able to price. Work items without the signal are not estimated or guessed at, they contribute nothing. A method at 14 percent is not a report that is slightly rough. It is a report about a seventh of your work wearing the label of all of it.

The highest percentage is not automatically the right choice, since a method can cover everything and still measure the wrong thing. But a low one is a hard fact about your data, better met here than a week after you built a report on it.

If you choose worklogs, this is where rate cards come in. A card holds rates per user or per project role, plus a fallback hourly rate for authors it does not recognise. Role members resolve by user, group or project role, and project admins can define reusable worklog role presets in project settings. Rates can be set per hour, day, thirty minutes or fifteen minutes.

## Step 4. Add a time frame and a forecast, then preview

Limit the report to a date range if the budget covers a period rather than a body of work. Then choose a forecast horizon: to the report's end date, to 30, 60 or 90 days out, or off entirely.

The forecast is a linear run rate from the spend recorded so far. It assumes the coming weeks look like the weeks behind you, which is reasonable for steady delivery flow and misleading across a holiday shutdown, a hiring ramp or a release spike, so read it as an extrapolation rather than a plan.

Finally, preview. It runs the report without saving anything, so you can go back a step, change the method or widen the scope, and regenerate until the totals match the work you had in mind. Save when they do, and the report opens on its dashboard.

## What to do when the numbers look wrong

**Coverage came back low.** The method you picked is not recorded on most of your work items. Go back a step and read the other coverage figures. Teams that never estimate and never log time still have counts: items closed or resolved, or items sitting in chosen statuses, are the usual answer for marketing, support and operations.

**The total is much smaller than expected.** Check the sub-task toggle first, since a scope naming only epics or only stories leaves the priced work underneath outside the report. Then check the time frame, which excludes work outside its range. Then check coverage again, because unpriced work items count as nothing rather than raising a flag.

**The scope pulled in more than you meant.** Open the parameters row on the report, which spells out the exact scope, method and currency it used. Then click any bar or slice in a breakdown: it opens the matching work items in Jira, the fastest way to see what got included. A broad project clause with no date bound is the usual cause. Export to CSV if you want the per work item breakdown behind the totals in one list.

**A colleague sees a different number from you.** Expected, rather than a fault. A shared report is not a snapshot of your view. It regenerates under the viewer's own Jira permissions, so nobody sees work items they could not already open in Jira, and the report warns a viewer when they lack access to part of its scope. If two people must agree on a figure, both need access to the whole scope.

## What next

- [Costing methods](/documentation/onbudget/costing-methods/) goes through all five in detail, including how to choose between them.
- [Limitations](/documentation/onbudget/what-onbudget-does-not-do/) is worth reading before you build anything a finance team will rely on. It sets out what OnBudget does not do, including currency conversion, invoicing, and writing anything back to Jira.
