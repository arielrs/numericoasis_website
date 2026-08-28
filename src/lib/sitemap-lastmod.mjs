/**
 * Real `lastmod` values for the sitemap, keyed by pathname.
 *
 * IndexNow covers Bing, Yandex, Seznam and Naver. Google ignores IndexNow
 * entirely, and without lastmod the sitemap gave it no cheap signal that a page
 * had changed, so a corrected app page or an updated post waited on a crawl
 * schedule rather than announcing itself.
 *
 * Dates are only emitted where a real one exists in frontmatter. Google
 * explicitly says an inaccurate lastmod is worse than none, and stamping the
 * build time onto every URL would make all 60 of them claim to have changed on
 * every deploy, which is exactly the pattern that gets the field ignored. The
 * static pages therefore carry no lastmod at all.
 *
 * Read straight off disk rather than through the content layer, because this
 * runs inside astro.config.mjs, where the collections are not yet available.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const LOCALES = ['en', 'pt-BR', 'es'];
const DEFAULT_LOCALE = 'en';

/** Just enough YAML for scalar dates and booleans. */
function frontmatterField(text, key) {
  const match = text.match(new RegExp(`^${key}:[ \\t]*(.+)$`, 'm'));
  if (!match) return undefined;
  return match[1].trim().replace(/^["']|["']$/g, '');
}

function localePath(lang, path) {
  return lang === DEFAULT_LOCALE ? path : `/${lang}${path}`;
}

function isoDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

/**
 * @param {string} root project root
 * @returns {Map<string, string>} pathname -> ISO timestamp
 */
export function buildLastmodMap(root) {
  const map = new Map();

  for (const [collection, urlFor, dateKeys] of [
    ['blog', (slug) => `/blog/${slug}/`, ['updatedDate', 'pubDate']],
    ['apps', (slug) => `/apps/${slug}/`, ['dateModified', 'datePublished']],
  ]) {
    for (const lang of LOCALES) {
      const dir = join(root, 'src', 'content', collection, lang);
      if (!existsSync(dir)) continue;

      for (const file of readdirSync(dir)) {
        if (!/\.mdx?$/.test(file)) continue;
        const text = readFileSync(join(dir, file), 'utf8');
        if (frontmatterField(text, 'draft') === 'true') continue;

        const slug = file.replace(/\.mdx?$/, '');
        // A flagship app is served from its own top-level URL, and its
        // /apps/<slug>/ form is a redirect stub the sitemap already skips.
        const landing = frontmatterField(text, 'landingPath');
        const path = landing ? `${landing.replace(/\/?$/, '/')}` : urlFor(slug);

        let stamp;
        for (const key of dateKeys) {
          stamp = isoDate(frontmatterField(text, key));
          if (stamp) break;
        }
        if (stamp) map.set(localePath(lang, path), stamp);
      }
    }
  }

  return map;
}
