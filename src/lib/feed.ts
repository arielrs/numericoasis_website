/**
 * Shared RSS feed builder.
 *
 * There is one feed per locale. Previously a single English feed existed while
 * all three footers linked to it, so a Portuguese reader who subscribed got
 * English posts.
 *
 * These stay as three static endpoint files rather than moving under
 * `[...lang]/`: a dynamic endpoint has a null pathname, which makes Astro
 * resolve it with a trailing slash, and that 404s in dev while working in
 * production.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { contentSlug, withLocale, useTranslations, type Locale } from '../i18n';

const FEED_LANGUAGE: Record<Locale, string> = {
  en: 'en-us',
  'pt-BR': 'pt-BR',
  es: 'es-ES',
};

const FEED_TITLE: Record<Locale, string> = {
  en: `${SITE.name} Blog`,
  'pt-BR': `Blog da ${SITE.name}`,
  es: `Blog de ${SITE.name}`,
};

export async function localeFeed(context: APIContext, lang: Locale) {
  const site = (context.site ?? new URL(SITE.url)).toString().replace(/\/$/, '');
  const selfUrl = `${site}${withLocale(lang, '/rss.xml')}`;
  const t = useTranslations(lang);

  const posts = (
    await getCollection('blog', ({ data }) => data.lang === lang && !data.draft)
  ).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const lastBuild = posts[0]?.data.updatedDate ?? posts[0]?.data.pubDate;

  return rss({
    title: FEED_TITLE[lang],
    description: t.site.description,
    site,
    trailingSlash: true,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: withLocale(lang, `/blog/${contentSlug(post.id)}/`),
      categories: [...post.data.tags],
      author: post.data.author,
    })),
    customData: [
      `<language>${FEED_LANGUAGE[lang]}</language>`,
      `<atom:link href="${selfUrl}" rel="self" type="application/rss+xml" />`,
      lastBuild ? `<lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>` : '',
    ].join(''),
  });
}
