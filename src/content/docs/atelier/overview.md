---
title: "Overview"
app: "atelier"
order: 1
description: "Atelier is a visual customization toolkit for Confluence Cloud: eight macros that bring branded colours, patterns and rich formatting to your pages."
# Not migrated from Confluence. Atelier is the one published app with no page in
# the knowledge base, so this was assembled from its Marketplace listing and its
# own app entry. Every claim below traces to one of those two sources. Worth a
# read from someone who has actually used the app before it is treated as final.
sourceTitle: "Written from the Marketplace listing and src/content/apps/en/atelier.mdx"
---

Atelier is a visual customization toolkit for Confluence Cloud. It adds eight
macros that bring branded colours, background patterns and rich formatting to
your pages, with no custom CSS or HTML anywhere in the process.

The point is consistency without a stylesheet. Space administrators curate the
palette, the theme presets and the font choices once; every author in the space
then picks from that set rather than inventing their own.

## What you get

| Capability | What it does |
| --- | --- |
| 8 design macros | Background, Banner, Text Color, Divider, Info Panel, Button, Spacer and Card, designed to sit together on one page. |
| 64 background patterns | Applied through a config panel with colour pickers and a live preview. |
| Per space colour palettes | Named brand colours with hex codes and opacity control, set in space settings. |
| Reusable theme presets | A saved combination an author can apply in one step. |
| Curated font suggestions | A shortlist chosen by the space admin rather than the full system list. |
| Page embedding | Embeds another page's content, fetched with the reader's own permissions on screen. Exports use a saved copy, see below. |
| PDF and Word export | Styling survives the export rather than collapsing to plain text. |

## Who it is for

Atelier is aimed at Confluence authors and space administrators, and in practice
gets the most use from documentation teams, internal communications and brand or
design teams who need pages to look deliberate without asking every author to
learn CSS.

## Where the settings live

Colour palettes, theme presets and font selections are configured once per space,
in space settings, by a space administrator. Authors then apply them from the
macro configuration panel on any page.

## Data and permissions

Atelier's own storage holds your space level design settings, the palettes, presets
and font choices, and nothing about the content of your pages. Storage is encrypted and
stays inside Atlassian, because the app runs on Atlassian Forge rather than on
infrastructure of ours.

On screen, a page embedded in the Background macro is fetched with the reader's own
Confluence permissions, so it appears only for people who can open the source page.
PDF and Word exports work differently. They use a copy of the embedded page that is
saved in the macro's settings when the author saves the macro, and macros saved before
that copy existed fetch the page as the app. An export can therefore include embedded
content that the person exporting cannot open, as it stood when the macro was last saved.

## Getting help

Support goes through our
[Jira Service Management portal](https://numericoasis.atlassian.net/servicedesk/customer/portal/39),
so requests land in a queue rather than an inbox. We answer in English,
Portuguese and Spanish.
