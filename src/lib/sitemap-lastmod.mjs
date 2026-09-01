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

/**
 * How many published posts each tag archive holds, keyed by pathname.
 *
 * The tag route marks an archive noindex below three posts, because four of the
 * six tags hold a single post and the archive is then a duplicate of that one
 * post's card. Submitting a URL and then asking for it not to be indexed is the
 * "Submitted URL marked noindex" warning in Search Console, so the sitemap has
 * to apply the same threshold.
 *
 * Counted here rather than shared with the route, because this runs inside
 * astro.config.mjs where the content collections do not exist yet.
 * check-dist.mjs asserts the two agree, so a drift fails the build instead of
 * going quiet. A tag with no posts in a locale is simply absent from the map,
 * which is the same answer as zero.
 */
export function tagPostCounts(root) {
  const counts = new Map();

  for (const lang of LOCALES) {
    const dir = join(root, 'src', 'content', 'blog', lang);
    if (!existsSync(dir)) continue;

    for (const file of readdirSync(dir)) {
      if (!/\.mdx?$/.test(file)) continue;
      const text = readFileSync(join(dir, file), 'utf8');
      if (frontmatterField(text, 'draft') === 'true') continue;

      // tags is a flow sequence in every post: `tags: ["a", "b"]`.
      const raw = frontmatterField(text, 'tags');
      if (!raw) continue;
      for (const entry of raw.replace(/^\[|\]$/g, '').split(',')) {
        const name = entry.trim().replace(/^["']|["']$/g, '');
        if (!name) continue;
        const key = localePath(lang, `/blog/tag/${name}/`);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  }
  return counts;
}

/** The threshold, in one place. The route imports the same number. */
export const TAG_INDEX_FROM = 3;
