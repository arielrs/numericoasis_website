---
lang: en
translationKey: jira-cost-tracking-without-timesheets
title: "Jira cost tracking without timesheets"
metaTitle: "Jira cost tracking without timesheets"
description: "Cost Jira work without asking anyone to log hours. OnBudget prices a signal your team already produces: work items closed or resolved, work items sitting in chosen statuses, or an existing numeric field, then tracks it against a budget."
metaDescription: "Cost Jira work with no timesheets. Price work items closed, items in a status, or a numeric field, and track budget versus actual with a forecast."
eyebrow: "Jira cost tracking"
app: "onbudget"
updatedDate: 2026-09-01
draft: false
---
You can cost Jira work with no timesheets at all. Instead of deriving spend from hours somebody typed in, price a signal your team already produces: work items closed or resolved, priced per item; work items sitting in statuses you choose, priced per item; or an existing numeric field, priced per unit. That is what OnBudget does. You set a budget and a currency, pick one of those signals, and get budget versus actual, a health status and a linear forecast. Nobody records anything new, no custom field is created, and nothing in your Jira changes.

## Who this is for

Marketing, support and operations teams that have a budget and have never used story points or worklogs. The work is already in Jira: the requests, the campaigns, the tickets, all recorded, in states, with dates. What is not recorded is money, and the usual way to add it is to ask the team to start logging hours.

If you have to say what a campaign or a quarter of support cost, and your team will not fill in timesheets, this page is the other route.

## Why the usual advice does not fit

Cost tracking normally derives spend from logged hours: hours multiplied by a rate. The precondition is built into the method. Someone has to log the hours, every day, accurately, and keep doing it. Where that habit already exists it is the better method, because an hourly rate is finer grained than any count, and OnBudget prices worklogs with rate cards for exactly that case.

Where the habit does not exist, the method does not degrade gracefully. It produces a number that reflects who remembered to log, not who did the work, and it can say nothing about last quarter, because the data begins on the day the habit begins. So look at what your Jira already holds instead.

## Signal one: work items closed or resolved, priced per item

OnBudget counts the work items closed or resolved inside the scope you defined and prices each one.

A worked example, with illustrative numbers. A support team cost 170,000 to run last quarter and closed 340 tickets, so a ticket cost roughly 500. Price closed items at 500 and the report tracks spend against the budget from then on. Or leave the unit cost blank, and OnBudget divides the total budget across the total quantity itself.

A per item average is defensible when the items are comparable: one work type, one team, one kind of request. Support queues, campaign tasks and change requests usually qualify. It is not defensible when one work item is a typo correction and the next is a three week migration: averaging across those produces a confident number that means nothing. The fix is scope, not method. Narrow the report until the items are alike, and run several instead of one. A report can be scoped to whole projects, which Jira now calls spaces, or to a JQL query as tight as you need.

## Signal two: work items sitting in chosen statuses, priced per item

The second count prices work items by the status they are in now, for the statuses you choose. It costs work in progress rather than work finished.

That answers a different question. Not what did we spend, but what is currently committed. Forty items sitting in In Progress and Awaiting Review, priced per item, is the value tied up in flight right now, and watched week over week it shows whether that commitment is growing.

Read it for what it is: a picture of the present, not of elapsed effort. It prices the stage, not the duration.

## Signal three: an existing numeric field, priced per unit

If somebody on your team is already typing a quantity into a field, that is a costing signal. Licences requested, seats, units shipped, quoted hours, print runs. Point OnBudget at the field, give it a cost per unit, and it prices it. This is often the most accurate of the three: a number a person entered deliberately usually means something specific. The risk is that optional fields tend to be half empty, which is what the next section is for.

## Check coverage before you commit

Before you build the report, OnBudget samples your actual data and tells you what share of your work items carries each signal. Three methods measured against the same data can score very differently, and you see all of them side by side before you choose.

The usual failure is not picking the wrong method. It is picking one, building on it, and finding out a week later that half the items carry no value, so half the work was priced at zero and the budget looked healthy. Coverage puts that discovery before the work instead of after it. Read the figures literally: 47 percent means fewer than half the items in scope carry a value. Narrow the scope until coverage is high, or cost the signal that scores highest.

## Four steps, and a preview before you save

The builder is four steps. Choose where the numbers come from: whole projects, which Jira now calls spaces, or individual work items picked by key, prefix or summary text, or a JQL query validated as you type, with one toggle to pull in sub-tasks and everything under an epic. Set the budget, the currency and the two thresholds. Pick the costing method, with coverage shown before you choose. Add a time frame and a forecast horizon, then preview the whole report and regenerate until it looks right before anything is saved.

There is no step where you configure Jira, because there is nothing to configure. That is the difference between a first report taking minutes and a first report taking a change request.

## Reading the result

Budget versus actual, in one of 18 currencies, with number, decimal and date formats set per report. Two thresholds decide when a report turns amber and when it turns red. At risk defaults to 80 percent of budget consumed and over budget to 100 percent, and both are yours to change. At risk is also raised when the forecast projects an overrun, though a forecast on its own never turns a report red. They drive the health lozenge, the gauge colour and the sort order on the home screen, so reports needing attention rise to the top of a long list.

The forecast is a linear run rate from the spend recorded so far, projected to the report end date, or 30, 60 or 90 days out, or switched off. It states what happens if the current rate holds.

Every report carries a parameters row spelling out the exact scope, method and currency behind the number. Click a bar or a slice in a breakdown and the matching work items open in Jira. The per item breakdown behind the totals exports to CSV, generated in your browser.

## What you give up

A per item average is coarser than an hourly rate. It is an average, so it is right across a set of items and wrong about any single one. If you need the cost of one specific piece of work, this will not give it to you.

It cannot tell you who spent the time. A count knows the item, not the effort behind it or the person who supplied it, so there is no per person breakdown without worklogs.

It cannot see effort that produced no work item. Work nobody ticketed is invisible here, exactly as it is invisible in Jira.

OnBudget does not record time. It is not a time tracker. It reads whatever ended up in Jira worklogs and prices it. It does no invoicing and no revenue tracking, and it does not convert between currencies, deliberately, because an invented exchange rate is worse than no exchange rate.

If a timesheet discipline already works in your organisation, use it and price the worklogs. If it does not, a count you can defend beats an hourly figure nobody filled in.

## Requirements and fit

OnBudget is a Jira Cloud app and it supports Jira Service Management. It is built on Atlassian Forge, so it is Cloud only: there is no Data Center or Server version, and running entirely on Forge is what makes it eligible for the Runs on Atlassian program.

It reads your Jira rather than editing it, and it works with the fields, statuses and worklogs already there. It keeps your report settings and nothing else, and uninstalling purges everything it held. The interface is in English, Portuguese and Spanish. OnBudget is paid, with a free trial, on the Atlassian Marketplace.

## Try it against your own data

Because it is read only, the cost of finding out is a trial and one coverage check. Build one report against one space, look at the coverage before you commit to a method, and decide whether the number it produces is one you would defend.

[Start the free trial on the Atlassian Marketplace](https://marketplace.atlassian.com/apps/2136850574/onbudget-cost-tracking-budget-reports-for-jira?utm_source=numericoasis&utm_medium=site&utm_campaign=jira-cost-tracking-without-timesheets&utm_content=hero)
