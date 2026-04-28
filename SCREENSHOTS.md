# Adding marketplace screenshots to app pages

The Atlassian Marketplace blocks server-side image downloads (AWS WAF JavaScript challenge), so screenshots have to be saved manually and committed locally.

## Workflow

1. Open each app's Marketplace listing in your browser:
   - Astrolink: <https://marketplace.atlassian.com/apps/2775238726/astrolink-work-item-link-graph-for-jira>
   - Configuration Monitor: <https://marketplace.atlassian.com/apps/3948220256/configuration-monitor-project-audit-log-for-jira>
   - Atelier: <https://marketplace.atlassian.com/apps/2683700690/atelier-page-design-content-formatting-macros>
   - Field Scout: <https://marketplace.atlassian.com/apps/388046425/field-scout-custom-field-audit-for-jira>
2. For each screenshot, right-click on the image and **Save Image As...** (or click the screenshot to open the lightbox first, then right-click that larger version).
3. Save to the matching folder under `src/assets/screenshots/<app-slug>/` using the filename plan below.
4. Once all the files are in place, ping me and I'll wire them into each app's `.mdx` frontmatter and the gallery section will appear automatically. (Or do it yourself by adding a `screenshots:` block, see "Frontmatter shape" below.)

## Suggested filename plan

### `src/assets/screenshots/astrolink/`
- `01-star-map.jpg` (the main interactive star-map view)
- `02-layout-panel.jpg` (theme picker, node styles, layout controls)
- `03-timeline.jpg` (timeline replay scrubber)
- `04-issue-panel.jpg` (Astrolink rendered inside the Jira issue panel)
- `05-launch.jpg` (entry-points launch screen)
- `06-jql-filter.jpg` (JQL / saved filter view)

### `src/assets/screenshots/configuration-monitor/`
- `01-change-log.jpg` (project change log table)
- `02-sprint-audit.jpg` (sprint audit trail)
- `03-gdpr-panel.jpg` (admin / GDPR export)

### `src/assets/screenshots/atelier/`
- `01-confluence-page.jpg` (styled Confluence page sample)
- `02-text-blocks.jpg` (custom text colors and sizes)
- `03-color-palette.jpg` (Space Settings color palette tab)
- `04-background-config.jpg` (Background macro config panel)
- `05-info-panels.jpg` (info panels with accent colors)
- `06-fonts-tab.jpg` (Space Settings fonts tab)
- `07-macro-browser.jpg` (all 8 Atelier macros in macro browser)
- `08-brand-colors.jpg` (defining brand colors)

### `src/assets/screenshots/field-scout/`
- `01-dashboard.jpg` (Field Health Score and overview cards)
- `02-duplicates.jpg` (Potential Duplicates panel)
- `03-field-table.jpg` (main field table)
- `04-per-project.jpg` (per-project field tracking)
- `05-distribution.jpg` (fields by origin and type)
- `06-csv-export.jpg` (CSV export modes)
- `07-detailed-table.jpg` (detailed field table with filters)

## Frontmatter shape (once images are in place)

In each `src/content/apps/<app>.mdx` add:

```yaml
screenshots:
  - image: ../../assets/screenshots/astrolink/01-star-map.jpg
    caption: Astrolink centered on epic AST-11 with 15 connected work items.
  - image: ../../assets/screenshots/astrolink/02-layout-panel.jpg
    caption: Theme picker, node styles, spread/size controls, and stale threshold settings.
```

The detail page will then render a gallery section with click-to-enlarge lightbox automatically.

## Image guidelines

- **Format**: JPG (preferred) or PNG.
- **Size**: 1600 px wide is plenty. Astro will resize and convert to WebP automatically.
- **Aspect ratio**: any ratio works; the gallery preserves it.
- **First screenshot** is rendered full-width as a hero, the rest tile in a 2-column grid.
