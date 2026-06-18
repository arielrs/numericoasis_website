// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://numericoasis.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-BR', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      // Keep the hidden /poker/ timer out of the sitemap.
      filter: (page) => !page.includes('/poker'),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          'pt-BR': 'pt-BR',
          es: 'es-ES',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: 'directory',
  },
});
