// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';

export default defineConfig({
  site: 'https://numericoasis.com',

  // Only consumed by Astro.currentLocale here: routing is done by the file tree,
  // not by middleware. Harmless, and it documents the locale set in one place.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-BR', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  build: {
    format: 'directory',
  },

  // Matches build.format. Without it the default is 'ignore', so /about and
  // /about/ both resolve and the site has a duplicate URL surface.
  trailingSlash: 'always',

  // Default is 'warn'. During the route restructure an old page and its
  // replacement can generate the same URL, in which case the static route wins
  // on priority and the new one is silently dropped. Fail instead.
  prerenderConflictBehavior: 'error',

  // Generates srcset and lets Astro derive the missing dimension, so images are
  // responsive without hand-computed aspect ratios. responsiveStyles injects
  // zero-specificity rules, so existing Tailwind classes still win.
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },

  // Self-hosted, so there is no render-blocking round trip to a third-party CDN
  // on every page. fontProviders.local() rather than fontsource(): the fontsource
  // provider fetches from api.fontsource.org and jsDelivr at build time, so a CDN
  // outage fails CI, and the npm provider ignores `subsets` entirely and would
  // make <Font preload> preload all seven subset files.
  //
  // The latin subset covers every character the three locales need. Verified
  // against the installed package: U+0000-00FF includes a c o n, and no Inter
  // subset covers U+2192, so the arrow character already falls back to a system
  // font and always did.
  fonts: [
    {
      name: 'Inter Variable',
      cssVariable: '--font-inter',
      provider: fontProviders.local(),
      fallbacks: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      optimizedFallbacks: true,
      options: {
        variants: [
          {
            weight: '100 900',
            style: 'normal',
            display: 'swap',
            src: ['@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'],
            unicodeRange: [
              'U+0000-00FF', 'U+0131', 'U+0152-0153', 'U+02BB-02BC', 'U+02C6',
              'U+02DA', 'U+02DC', 'U+0304', 'U+0308', 'U+0329', 'U+2000-206F',
              'U+20AC', 'U+2122', 'U+2191', 'U+2193', 'U+2212', 'U+2215',
              'U+FEFF', 'U+FFFD',
            ],
          },
        ],
      },
    },
  ],

  // Static output emits a meta-refresh stub with a noindex meta and a canonical
  // pointing at the target. It is not a 301, because GitHub Pages cannot serve
  // one for a static file. Redirect routes are type 'redirect', which
  // @astrojs/sitemap skips, so the stubs stay out of the sitemap.
  redirects: {
    // The consulting surface is gone. These six URLs are indexed, so they point
    // at the app portfolio rather than 404ing. /apps/ and not /onbudget/ on
    // purpose: someone searching to cut Marketplace spend who lands on a paid
    // budgeting app has been baited, and would bounce.
    '/services': '/apps/',
    '/es/services': '/es/apps/',
    '/pt-BR/services': '/pt-BR/apps/',
    '/atlassian-app-cost-reduction': '/apps/',
    '/es/atlassian-app-cost-reduction': '/es/apps/',
    '/pt-BR/atlassian-app-cost-reduction': '/pt-BR/apps/',

    // A services pitch end to end, with no product to point at. Drafted rather
    // than deleted, so the writing survives, but the URLs still resolve.
    '/blog/real-value-custom-integrations': '/blog/',
    '/es/blog/real-value-custom-integrations': '/es/blog/',
    '/pt-BR/blog/real-value-custom-integrations': '/pt-BR/blog/',

    // OnBudget is the flagship and lives at its own top-level URL. The
    // predictable /apps/<slug>/ form redirects rather than 404s.
    '/apps/onbudget': '/onbudget/',
    '/es/apps/onbudget': '/es/onbudget/',
    '/pt-BR/apps/onbudget': '/pt-BR/onbudget/',
  },

  // extendMarkdownConfig defaults true, so MDX picks this up as well.
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },

  integrations: [
    mdx(),
    sitemap({
      // Keep the hidden /poker/ timer out of the sitemap.
      filter: (page) => !page.includes('/poker'),
      // No i18n block here on purpose. SEO.astro already emits a complete,
      // reciprocal, self-referencing hreflang cluster with x-default. The
      // sitemap integration would emit a second, conflicting one using
      // en-US/es-ES, and it structurally cannot emit x-default.
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
