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

// 1. Route parity: every bare path must exist in all three locales.
const bare = (url) => url.replace(/^\/(pt-BR|es)(?=\/|$)/, '') || '/';
const byLocale = { en: new Set(), 'pt-BR': new Set(), es: new Set() };

for (const file of pages) {
  const url = toUrl(file);
  if (STANDALONE.has(url)) continue;
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

// 3. Head invariants on every indexable page.
for (const file of pages) {
  const url = toUrl(file);
  if (STANDALONE.has(url)) continue;
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
}

if (errors.length) {
  console.error(`\ncheck-dist failed (${errors.length}):\n${errors.map((e) => `  x ${e}`).join('\n')}\n`);
  process.exit(1);
}
console.log(`check-dist: ${pages.length} pages, route parity + internal links + head invariants OK`);
