/**
 * Post-build checks on the emitted site.
 *
 * Catches the whole class of restructure mistakes that a green build hides:
 * a page that survives in one locale but not another, an internal link left
 * pointing at a deleted page, and per-page head invariants regressing.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const DIST = join(process.cwd(), 'dist');
const LOCALES = ['pt-BR', 'es'];

/** Deliberately monolingual, and deliberately excluded from the head invariants. */
const STANDALONE = new Set(['/poker/', '/404.html']);

/**
 * Whole sections that are monolingual. The documentation was migrated out of a
 * public Confluence space in English and is not translated, so route parity and
 * the hreflang count do not apply to it.
 */
const STANDALONE_PREFIXES = ['/documentation/'];

const isStandalone = (url) =>
  STANDALONE.has(url) || STANDALONE_PREFIXES.some((prefix) => url.startsWith(prefix));

const errors = [];

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path, out);
    else out.push(path);
  }
  return out;
}

const toUrl = (file) => {
  const rel = '/' + relative(DIST, file).split(sep).join('/');
  return rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
};

const files = await walk(DIST);
const assets = new Set(files.map((f) => '/' + relative(DIST, f).split(sep).join('/')));
const pages = files.filter((f) => f.endsWith('.html'));

/**
 * Every pathname the sitemap submits.
 *
 * Read so the noindex check below can assert the two never overlap. Submitting
 * a URL and then telling Google not to index it is the "Submitted URL marked
 * noindex" warning in Search Console, and it is entirely self-inflicted.
 */
const sitemapUrls = new Set();
for (const file of files.filter((f) => /sitemap-\d+\.xml$/.test(f))) {
  const xml = await readFile(file, 'utf8');
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    sitemapUrls.add(new URL(match[1]).pathname);
  }
}

// 1. Route parity: every bare path must exist in all three locales.
const bare = (url) => url.replace(/^\/(pt-BR|es)(?=\/|$)/, '') || '/';
const byLocale = { en: new Set(), 'pt-BR': new Set(), es: new Set() };

for (const file of pages) {
  const url = toUrl(file);
  if (isStandalone(url)) continue;
  const match = url.match(/^\/(pt-BR|es)(?=\/|$)/);
  byLocale[match ? match[1] : 'en'].add(bare(url));
}
for (const locale of LOCALES) {
  for (const path of byLocale.en) {
    if (!byLocale[locale].has(path)) errors.push(`route parity: ${path} exists in en but not ${locale}`);
  }
  for (const path of byLocale[locale]) {
    if (!byLocale.en.has(path)) errors.push(`route parity: ${path} exists in ${locale} but not en`);
  }
}

// 2. Internal links: every one resolves, and matches the trailing-slash policy.
for (const file of pages) {
  const source = await readFile(file, 'utf8');
  const from = toUrl(file);
  for (const match of source.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
    const href = match[1];
    if (/\.[a-z0-9]{2,5}$/i.test(href)) {
      if (!assets.has(href)) errors.push(`${from} -> ${href} (missing asset)`);
      continue;
    }
    if (!href.endsWith('/')) {
      errors.push(`${from} -> ${href} (missing trailing slash)`);
      continue;
    }
    const target = join(DIST, href.split('/').join(sep), 'index.html');
    if (!(await stat(target).catch(() => null))) errors.push(`${from} -> ${href} (404: no such page)`);
  }
}

// 2b. Every visible Marketplace link is attributed.
//
// Round one wrapped 193 of them and missed 13, including the home page's
// OnBudget button in all three locales, and the miss was invisible because the
// only evidence was a slot constant declared and never used. An untagged exit
// lands in the vendor console as direct traffic, indistinguishable from
// organic, which is the one thing the parameters exist to prevent.
//
// href only. The JSON-LD downloadUrl, installUrl and sameAs must stay bare:
// they are identity references, and a tracked url there makes the node
// disagree with the canonical listing.
for (const file of pages) {
  const source = await readFile(file, 'utf8');
  for (const [, href] of source.matchAll(/href="(https:\/\/marketplace\.atlassian\.com[^"]*)"/g)) {
    if (!href.includes('utm_source=')) {
      errors.push(`${toUrl(file)}: untagged Marketplace link, ${href}`);
    }
  }
}

// 3. Head invariants on every indexable page.
for (const file of pages) {
  const url = toUrl(file);
  if (isStandalone(url)) continue;
  const source = await readFile(file, 'utf8');

  // Redirect stubs are meta-refresh pages carrying their own noindex and a
  // canonical to the target. They are not indexable pages and have no hreflang.
  if (source.includes('http-equiv="refresh"')) {
    if (!source.includes('name="robots" content="noindex"')) {
      errors.push(`${url}: redirect stub is missing its noindex`);
    }
    if (!source.includes('rel="canonical"')) {
      errors.push(`${url}: redirect stub is missing its canonical`);
    }
    continue;
  }

  const count = (re) => (source.match(re) ?? []).length;

  if (count(/rel="canonical"/g) !== 1) errors.push(`${url}: expected 1 canonical, got ${count(/rel="canonical"/g)}`);
  if (count(/hreflang="/g) !== 4) errors.push(`${url}: expected 4 hreflang links, got ${count(/hreflang="/g)}`);
  if (!source.includes('hreflang="x-default"')) errors.push(`${url}: missing x-default`);

  // One graph per page, not a pile of disconnected nodes.
  const ldBlocks = count(/application\/ld\+json/g);
  if (ldBlocks !== 1) errors.push(`${url}: expected exactly 1 JSON-LD block, got ${ldBlocks}`);
  if (!source.includes('"@graph"')) errors.push(`${url}: JSON-LD is not a @graph`);

  // A deliberately unindexed page still has to be deliberate about it: noindex
  // with follow, so the links carry, and absent from the sitemap, so we are not
  // submitting a URL we have asked not to be indexed.
  if (/name="robots" content="noindex/.test(source)) {
    if (!/name="robots" content="noindex, follow"/.test(source)) {
      errors.push(`${url}: noindex without follow, on a page that is in the route tree`);
    }
    if (sitemapUrls.has(url)) errors.push(`${url}: noindex, but submitted in the sitemap`);
    continue;
  }

  if (!/name="robots" content="index, follow, max-snippet:-1/.test(source)) {
    errors.push(`${url}: missing the indexable robots meta`);
  }
}

if (errors.length) {
  console.error(`\ncheck-dist failed (${errors.length}):\n${errors.map((e) => `  x ${e}`).join('\n')}\n`);
  process.exit(1);
}
console.log(`check-dist: ${pages.length} pages, route parity + internal links + head invariants OK`);
