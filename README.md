# Numeric Oasis — website

Marketing site for [numericoasis.com](https://numericoasis.com), built with [Astro](https://astro.build) + Tailwind CSS, hosted on GitHub Pages.

## Stack

- **Astro 6** — static site generator, zero JS by default
- **Tailwind CSS 4** — utility-first styling via `@tailwindcss/vite`
- **MDX** — markdown + components for blog posts and app pages
- **`@astrojs/sitemap`** — automatic sitemap.xml
- **`@astrojs/rss`** — RSS feed at `/rss.xml`

## Local development

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # → ./dist
npm run preview      # serve the production build locally
```

## Project structure

```
src/
├── components/      # Nav, Footer, SEO
├── consts.ts        # SITE metadata + nav links
├── content/
│   ├── apps/        # one MDX per Marketplace app
│   └── blog/        # blog posts
├── content.config.ts # collection schemas (Zod)
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── services.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── apps/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── rss.xml.ts
│   └── 404.astro
└── styles/global.css

public/
├── CNAME            # numericoasis.com — required for Pages custom domain
├── robots.txt
├── favicon.svg
└── og/              # social-share images (1200x630)
```

## Adding content

### A new blog post

Create `src/content/blog/<slug>.mdx`:

```mdx
---
title: "Your post title"
description: "One-sentence summary used as meta description and OG description."
pubDate: 2026-05-01
tags: ["forge", "jira"]
author: "Numeric Oasis Team"
---

Markdown body here. MDX is supported, so you can `import` components if needed.
```

Drafts: add `draft: true` to the frontmatter — they won't appear in `/blog/`, RSS, or sitemap.

### A new app

Create `src/content/apps/<slug>.mdx`:

```mdx
---
name: My App
tagline: One-line value prop.
description: Long description for SEO.
marketplaceUrl: https://marketplace.atlassian.com/apps/...
products: ["jira"]            # or "confluence", "bitbucket", "jsm"
featured: true                 # show on home page
order: 5                       # sort within /apps
---

## Markdown body content for the app page.
```

## Deployment

Pushes to `main` automatically build and deploy via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

DNS for `numericoasis.com` should point at GitHub Pages:

| Record | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `<github-username>.github.io.` |

In GitHub repo Settings → Pages: source = "GitHub Actions", custom domain = `numericoasis.com`, Enforce HTTPS = on.

## TODO assets

Replace these placeholders before launch:

- `public/logo.png` — square PNG used in JSON-LD `Organization.logo` (recommended ≥ 512×512)
- `public/og/default.png` — site-wide social share image (1200×630)
