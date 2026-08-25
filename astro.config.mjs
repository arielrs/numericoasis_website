// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

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
