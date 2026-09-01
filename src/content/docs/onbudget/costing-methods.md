---
title: "Costing methods"
app: "onbudget"
order: 4
description: "Reference for OnBudget's five costing methods: the formula each one uses, a worked example, what it needs in your Jira data, and when to avoid it."
# Written for the site, not migrated out of Confluence. The exporter
# only touches pages listed in its MAP, so a re-export leaves this alone.
---
## What a costing method is

A costing method is the rule OnBudget uses to turn work items into money. All five have the same shape:

**spend = quantity x unit cost**

What differs is where the quantity comes from: story points, a numeric field you already fill in, time logged in worklogs, or a count of work items. The unit cost is a figure you supply, in the report's currency. You pick the method in step three of the builder, which shows each method's coverage across your own data before you choose. OnBudget prices what it finds in Jira: it records no time, adds no custom field, and writes nothing back.

## How do I cost work that is estimated in story points?

Price a point, and OnBudget totals the points on the work items in scope.

**Formula.** spend = (sum of story points across matched work items) x (cost per point)

**Worked example.** A release scope holds 240 estimated points, priced at 400 a point. Spend is 96,000. Against a budget of 120,000 that is 80 percent consumed, the default at risk threshold, so the report turns amber and rises up the home screen.

**What it needs in Jira.** Story points on the work items in scope. Nothing else, and nothing new.

**When it is the wrong choice.** When estimation is partial: an item with no points contributes no points, so at 60 percent coverage you are reading the cost of 60 percent of the scope and calling it the whole. Also when one report spans teams whose points mean different things.

## How do I cost work using a numeric field of my own?

Price a unit of any numeric field on your work items, and OnBudget totals the field.

**Formula.** spend = (sum of the field's values across matched work items) x (cost per unit)

**Worked example.** A campaign scope tracks media units in a numeric field totalling 1,500. You price a unit at 30. Spend is 45,000. If the field already holds money rather than a quantity, price the unit at 1 and the report totals the field.

**What it needs in Jira.** An existing numeric field, populated. OnBudget does not create it and asks for no screen scheme change.

**When it is the wrong choice.** When the field is thinly filled, which is common on work items created before it was introduced, or when it means different things in different spaces, since one cost per unit applies across the whole scope.

## How do I cost logged time?

Price time already logged in Jira worklogs, with a flat rate or a rate card that varies the rate by who logged it.

**Formula.** spend = sum over every matched worklog of (time logged, in the rate's time basis) x (the rate that applies to that worklog's author)

**Worked example.** A quarter's worklogs total 1,120 hours. A flat rate of 85 an hour gives 95,200. With a rate card instead, 700 hours on a senior role at 110 and 420 hours on a delivery role at 70 gives 106,400.

**What it needs in Jira.** Worklogs, however they got there. OnBudget is not a time tracker and records no time itself, so worklogs written to Jira by another app are priced like any others.

**When it is the wrong choice.** When time is logged unevenly, in which case you are costing the people who log it and nobody else.

## How do I cost work items that have been closed or resolved?

Price a finished work item, and OnBudget counts the ones closed or resolved.

**Formula.** spend = (count of matched work items closed or resolved) x (cost per item)

**Worked example.** A support scope closed 850 work items in the quarter. At 45 an item, spend is 38,250.

**What it needs in Jira.** Nothing beyond the statuses and resolutions your workflow already sets. This is the method for teams that estimate nothing and log no time: marketing, support and operations.

**When it is the wrong choice.** When work items vary wildly in size, because a two hour request and a three week investigation are then priced identically. Also for long delivery cycles: work in flight costs nothing until it closes, so the report reads low and then jumps.

## How do I cost work items sitting in chosen statuses?

Price a work item and count only those currently sitting in statuses you choose.

**Formula.** spend = (count of matched work items in the chosen statuses) x (cost per item)

**Worked example.** You choose In progress and In review. Sixty work items sit there. At 120 an item, spend is 7,200: a standing cost of the work currently open.

**What it needs in Jira.** The statuses you want to count, picked from your own workflow.

**When it is the wrong choice.** When you expect a cumulative total. This counts where work items are now, not where they have been, so the number falls again as items move on. Right for a queue or a stage, wrong for costing a project to date.

## What happens if I leave the unit cost blank?

OnBudget divides the total budget across the total quantity and uses the result as the unit cost.

**Formula.** unit cost = (total budget) / (total quantity in scope), and spend follows as normal.

This is an allocation rather than a discovery. Across the full scope the total is the budget by construction, so the breakdown gadgets still show where the money went, while the health lozenge tells you nothing you did not already know. Enter a unit cost of your own when you need the report to be able to say the work cost more than you budgeted.

## How do rate cards decide what an hour costs?

A rate card is the lookup that turns a worklog author into a rate.

- **Rates per user or per project role.** A rate against a named person or against a role, so a dozen people are priced by one entry.
- **A fallback hourly rate.** For authors the card does not recognise, so every worklog gets a price, including the contractor nobody added to the card.
- **Role members resolved by user, group or project role.** Membership can be listed person by person or taken from a Jira group or project role, so the card follows changes you make in Jira.
- **Reusable worklog role presets.** Project admins define these in project settings, so the same roles are not rebuilt for every report.
- **Four time bases.** Hour, day, thirty minutes or fifteen minutes. The unit your rates are quoted in, so a day rate goes in as a day rate rather than being divided by hand.

Rate cards apply to the worklog method only; the other four price a unit you define directly.

## What is coverage discovery, and what does the percentage mean?

Before you commit to a method, OnBudget samples your scope and reports what share of the work items actually carries that signal. The shipped example in the builder shows three methods at 14 percent, 38 percent and 47 percent.

The percentage is not a quality score. It is the answer to "will this even work on my data", given before you build anything. A method at 14 percent will still produce a number, and that number is the cost of 14 percent of your scope presented as the cost of all of it.

When coverage comes back low, there are four honest moves:

1. **Choose a different method.** The percentages sit side by side, and one is usually much higher than the one you assumed.
2. **Narrow the scope to the part that carries the signal.** A JQL scope, validated as you type, restricts the report to the estimated work, and a 38 percent signal across everything can be a complete signal across the right subset.
3. **Fall back to counting work items.** Closed or resolved, and in chosen statuses, depend on no optional field.
4. **Fix the data, then rebuild.** Sometimes the honest answer is that the estimates are missing and should not be.

## Which method fits which team?

| Method | What it needs in Jira | Typical team | Unit of cost | Common failure mode |
| --- | --- | --- | --- | --- |
| Story points | Points on the work items | Delivery teams that estimate | Cost per point | Half the backlog unestimated, so spend reads low |
| Numeric field | The field, populated | Teams pricing a quantity of their own | Cost per unit | The field is empty on older work items |
| Worklogs | Logged time | Teams that bill or cost time | Rate per hour, day, thirty or fifteen minutes | Authors missing from the card, absorbed by the fallback rate |
| Closed or resolved | Statuses and resolutions you have | Support, operations, marketing | Cost per item | Work in flight costs nothing until it closes |
| In chosen statuses | The statuses you choose | Anyone costing a stage or a queue | Cost per item | Read as a running total when it counts the present |

If a method turns out to be the wrong choice, the documented route is to duplicate an existing report and build the copy on a different one. Nothing in Jira changes either way: OnBudget holds two read scopes plus its own storage and writes nothing back.
