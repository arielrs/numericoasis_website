/**
 * One-shot export of the public Confluence space into the docs collection.
 *
 * Kept in the repo rather than run once and thrown away, because the migration
 * is worth being able to re-run and diff: if a page is edited in Confluence
 * before the space is switched off, this reproduces the export exactly.
 *
 * Reads anonymously. The space is public, so no token is involved and nothing
 * here can write to Confluence even by accident.
 *
 *   node scripts/confluence-export.mjs           write src/content/docs
 *   node scripts/confluence-export.mjs --dry     print the plan and change nothing
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const SITE = 'https://numericoasis.atlassian.net/wiki';
const SPACE_ID = '491651080';
const OUT = 'src/content/docs';
const DRY = process.argv.includes('--dry');

/**
 * Confluence page id -> where it lands.
 *
 * Explicit rather than derived from the title. The Confluence titles carry
 * product suffixes ("Field Scout - Custom Field Audit for Jira") that make poor
 * URLs and poor sidebar labels, and two apps are deliberately unpublished.
 *
 * `app` matches the translationKey in the apps collection, so a docs page can
 * be joined to its app entry for the icon and the Marketplace link.
 */
const MAP = {
  // Astrolink
  498696194: { app: 'astrolink', slug: 'overview', title: 'Overview', order: 1 },
  498597890: { app: 'astrolink', slug: 'release-notes', title: 'Release notes', order: 8 },
  498630659: { app: 'astrolink', slug: 'privacy', title: 'Privacy policy', order: 9 },

  // Configuration Monitor
  492306433: { app: 'configuration-monitor', slug: 'overview', title: 'Overview', order: 1 },
  493256705: { app: 'configuration-monitor', slug: 'release-notes', title: 'Release notes', order: 8 },
  492339201: { app: 'configuration-monitor', slug: 'privacy', title: 'Privacy policy', order: 9 },

  // Expanded Macro Collection
  584810499: { app: 'expanded-macro-collection', slug: 'overview', title: 'Overview', order: 1 },
  584843266: { app: 'expanded-macro-collection', slug: 'macros', title: 'Macros reference', order: 2 },
  584810516: { app: 'expanded-macro-collection', slug: 'release-notes', title: 'Release notes', order: 8 },
  584908801: { app: 'expanded-macro-collection', slug: 'privacy', title: 'Privacy policy', order: 9 },
  588316676: { app: 'expanded-macro-collection', slug: 'security', title: 'Security policy', order: 10 },

  // Field Scout
  508035075: { app: 'field-scout', slug: 'overview', title: 'Overview', order: 1 },
  508297240: { app: 'field-scout', slug: 'release-notes', title: 'Release notes', order: 8 },
  508362762: { app: 'field-scout', slug: 'privacy', title: 'Privacy policy', order: 9 },

  // OnBudget
  589496323: { app: 'onbudget', slug: 'overview', title: 'Overview', order: 1 },
  589791233: { app: 'onbudget', slug: 'release-notes', title: 'Release notes', order: 8 },
  589758465: { app: 'onbudget', slug: 'privacy', title: 'Privacy policy', order: 9 },
  589824001: { app: 'onbudget', slug: 'security', title: 'Security policy', order: 10 },

  // Shared legal
  493420545: { app: 'legal', slug: 'terms', title: 'Terms of service', order: 1 },
  492994563: { app: 'legal', slug: 'sla', title: 'Service level agreement', order: 2 },

  // Not on the Marketplace. Migrated so nothing is lost when the space closes,
  // but marked draft so they are not published or indexed until the apps ship.
  542244866: { app: 'sprint-rollover-tracker', slug: 'overview', title: 'Overview', order: 1, draft: true },
  542343170: { app: 'sprint-rollover-tracker', slug: 'release-notes', title: 'Release notes', order: 8, draft: true },
  542375937: { app: 'sprint-rollover-tracker', slug: 'privacy', title: 'Privacy policy', order: 9, draft: true },
  600047618: { app: 'millrace', slug: 'overview', title: 'Overview', order: 1, draft: true },
  600113153: { app: 'millrace', slug: 'release-notes', title: 'Release notes', order: 8, draft: true },
  600080385: { app: 'millrace', slug: 'privacy', title: 'Privacy policy', order: 9, draft: true },
  600145921: { app: 'millrace', slug: 'security', title: 'Security policy', order: 10, draft: true },

  // The space homepage is replaced by a hand-written hub page, not migrated.
  491651362: null,
};

/**
 * Entities, resolved rather than passed through.
 *
 * The em dash matters most: there are 135 of them in this content and
 * check-content.mjs fails the build on a single U+2014 anywhere in src/. They
 * become commas, which is what they are doing in almost every case here.
 * The arrow matters too: no Inter subset covers U+2192, so it would silently
 * fall back to a system font mid-sentence.
 */
const ENTITIES = [
  [/\s*&mdash;\s*/g, ', '],
  [/&ndash;/g, '-'],
  [/&rarr;/g, '>'],
  [/&times;/g, 'x'],
  [/&hellip;/g, '...'],
  [/&le;/g, 'at most '],
  [/&sect;/g, 'Section '],
  [/&rsquo;/g, "'"],
  [/&lsquo;/g, "'"],
  [/&ldquo;|&rdquo;|&quot;/g, '"'],
  [/&nbsp;/g, ' '],
  [/&ccedil;/g, 'ç'],
  [/&atilde;/g, 'ã'],
  [/&gt;/g, '>'],
  [/&lt;/g, '<'],
  [/&amp;/g, '&'],
];

const decode = (s) => ENTITIES.reduce((acc, [re, to]) => acc.replace(re, to), s);

/** Inline XHTML to inline markdown. */
function inline(html) {
  let s = html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/?(?:span|time|ac:link|ri:page|ri:user)[^>]*>/gi, '')
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, t) => '`' + strip(t) + '`')
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, (_, t) => `**${inline(t).trim()}**`)
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, (_, t) => `**${inline(t).trim()}**`)
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, (_, t) => `*${inline(t).trim()}*`)
    .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, (_, t) => `*${inline(t).trim()}*`)
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) => `[${strip(t)}](${href})`)
    .replace(/<[^>]+>/g, '');
  return decode(s).replace(/[ \t]+/g, ' ');
}

const strip = (html) => decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

/** Cells can hold several paragraphs; a markdown table row cannot. */
const cell = (html) =>
  inline(html.replace(/<\/p>\s*<p[^>]*>/gi, ' <br> '))
    .replace(/\s+/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();

function convert(html) {
  let s = html;

  // The children macro listed sub-pages. The sidebar does that job now.
  s = s.replace(/<ac:structured-macro[^>]*ac:name="children"[\s\S]*?<\/ac:structured-macro>/gi, '');
  // An info panel becomes a blockquote. Base64 for the same reason the tables
  // use it: a bare <<<INFO>>> marker looks enough like a tag that the inline
  // stripper below eats the opening half and leaves ">>" in the prose.
  s = s.replace(
    /<ac:structured-macro[^>]*ac:name="info"[\s\S]*?<ac:rich-text-body>([\s\S]*?)<\/ac:rich-text-body>[\s\S]*?<\/ac:structured-macro>/gi,
    (_, body) => `\n\nINFOBLOCK${Buffer.from(body).toString('base64')}ENDINFO\n\n`,
  );
  s = s.replace(/<ac:structured-macro[\s\S]*?<\/ac:structured-macro>/gi, '');
  s = s.replace(/<colgroup[\s\S]*?<\/colgroup>/gi, '');

  const out = [];

  // Tables first, so their inner markup is not eaten by the block pass.
  s = s.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, body) => {
    const rows = [...body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) => m[1]);
    if (!rows.length) return '';
    const cells = (row) => [...row.matchAll(/<(th|td)[^>]*>([\s\S]*?)<\/\1>/gi)].map((c) => cell(c[2]));
    const head = cells(rows[0]);
    const rest = rows.slice(1).map(cells);
    const lines = [
      `| ${head.join(' | ')} |`,
      `| ${head.map(() => '---').join(' | ')} |`,
      ...rest.map((r) => `| ${r.join(' | ')} |`),
    ];
    return `\n\nTABLEBLOCK${Buffer.from(lines.join('\n')).toString('base64')}ENDTABLE\n\n`;
  });

  // Placeholders split too. Without that a table stayed glued to the heading
  // above it, and the table branch below ran first, printing the table before
  // its own heading.
  const blocks = s.split(/(?=<(?:h[1-6]|p|ul|ol|hr)[\s>])|(?=(?:TABLE|INFO)BLOCK)/);
  for (const raw of blocks) {
    const b = raw.trim();
    if (!b) continue;

    const table = b.match(/TABLEBLOCK([A-Za-z0-9+/=]+)ENDTABLE/);
    if (table) {
      out.push(Buffer.from(table[1], 'base64').toString('utf8'));
      const after = b.replace(/TABLEBLOCK[A-Za-z0-9+/=]+ENDTABLE/, '').trim();
      if (after) out.push(...convert(after).split('\n\n').filter(Boolean));
      continue;
    }

    const info = b.match(/INFOBLOCK([A-Za-z0-9+/=]+)ENDINFO/);
    if (info) {
      const inner = convert(Buffer.from(info[1], 'base64').toString('utf8'));
      out.push(inner.split('\n').filter(Boolean).map((l) => `> ${l}`).join('\n'));
      const after = b.replace(/INFOBLOCK[A-Za-z0-9+/=]+ENDINFO/, '').trim();
      if (after) out.push(...convert(after).split('\n\n').filter(Boolean));
      continue;
    }

    const h = b.match(/^<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/i);
    if (h) {
      // Confluence h1 is a page title; the layout renders that, so demote.
      const level = Math.max(2, Number(h[1]));
      out.push(`${'#'.repeat(level)} ${strip(h[2])}`);
      const after = b.slice(h[0].length).trim();
      if (after) out.push(...convert(after).split('\n\n').filter(Boolean));
      continue;
    }

    if (/^<hr/i.test(b)) {
      out.push('---');
      continue;
    }

    const list = b.match(/^<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/i);
    if (list) {
      const ordered = list[1].toLowerCase() === 'ol';
      const items = [...list[2].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => inline(m[1]).trim());
      out.push(items.map((t, i) => `${ordered ? `${i + 1}.` : '-'} ${t}`).join('\n'));
      const after = b.slice(list[0].length).trim();
      if (after) out.push(...convert(after).split('\n\n').filter(Boolean));
      continue;
    }

    const p = inline(b).trim();
    if (p) out.push(p);
  }

  return out.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}

/** Markdown still renders raw HTML, so a stray angle bracket has to be tamed. */
const safe = (md) => md.replace(/<(?![a-zA-Z/!])/g, '&lt;');

/**
 * Cross-references between Confluence pages, repointed at their new homes.
 *
 * These are the links that would rot silently. They work today, they survive
 * the migration looking perfectly fine, and they turn into 404s the moment the
 * space is switched off, which is exactly when nobody is looking. Anything that
 * cannot be mapped is reported rather than left to be discovered later.
 */
function relink(md, unresolved) {
  return md.replace(
    /https:\/\/numericoasis\.atlassian\.net\/wiki\/spaces\/[^/]+\/pages\/(\d+)[^\s)]*/g,
    (url, id) => {
      const target = MAP[id];
      if (!target) {
        unresolved.push(url);
        return url;
      }
      return `/documentation/${target.app}/${target.slug}/`;
    },
  );
}

const yaml = (v) => `"${String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

async function main() {
  const res = await fetch(`${SITE}/api/v2/spaces/${SPACE_ID}/pages?limit=250`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`space listing failed: ${res.status}`);
  const { results } = await res.json();

  let written = 0;
  const unmapped = [];
  const unresolved = [];

  for (const page of results) {
    const target = MAP[page.id];
    if (target === null) continue;
    if (!target) {
      unmapped.push(`${page.id} ${page.title}`);
      continue;
    }

    const r = await fetch(`${SITE}/api/v2/pages/${page.id}?body-format=storage`, {
      headers: { Accept: 'application/json' },
    });
    if (!r.ok) throw new Error(`page ${page.id} failed: ${r.status}`);
    const doc = await r.json();

    let body = relink(safe(convert(doc.body?.storage?.value ?? '')), unresolved);

    // The layout already renders the page title as the h1. Several Confluence
    // pages open with an h2 that repeats it, most often a bare "Overview",
    // which would print the same word twice and put a useless first entry in
    // the on-this-page rail.
    // A leading rule is a separator with nothing above it to separate.
    body = body.replace(/^-{3,}\s*\n+/, '');

    const firstHeading = body.match(/^##\s+(.+)$/m);
    if (firstHeading) {
      const heading = firstHeading[1].trim().toLowerCase();
      if (heading === target.title.toLowerCase() || heading === 'overview') {
        // Drop the heading line only. Its content stays; it just stops
        // repeating the h1 the layout has already printed directly above.
        body = body.replace(/^##\s+.+\n+/m, '').trim();
      }
    }
    const first = body.split('\n').find((l) => l && !l.startsWith('#') && !l.startsWith('|'));
    const derived = (first ?? '').replace(/[*`[\]]/g, '').slice(0, 155).trim();

    const front = [
      '---',
      `title: ${yaml(target.title)}`,
      `app: ${yaml(target.app)}`,
      `order: ${target.order}`,
      `description: ${yaml(description)}`,
      target.draft ? 'draft: true' : null,
      '# Migrated from Confluence. Kept so a page can be traced back to its origin.',
      `sourcePageId: ${yaml(page.id)}`,
      `sourceTitle: ${yaml(page.title)}`,
      '---',
      '',
    ].filter((l) => l !== null);

    const file = join(OUT, target.app, `${target.slug}.md`);

    // A description written by hand outclasses one derived from the first line
    // of body text, every time. Re-running the export must not throw it away.
    let description = derived;
    try {
      const existing = await readFile(file, 'utf8');
      const kept = existing.match(/^description:\s*"(.*)"\s*$/m);
      if (kept) description = kept[1];
    } catch {
      // No file yet. The derived description is the starting point.
    }
    if (!DRY) {
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, `${front.join('\n')}\n${body}\n`, 'utf8');
    }
    written += 1;
    const words = body.split(/\s+/).filter(Boolean).length;
    console.log(
      `${DRY ? 'would write' : 'wrote'} ${file.padEnd(52)} ${String(words).padStart(5)} words` +
        (target.draft ? '  (draft)' : ''),
    );
  }

  if (unresolved.length) {
    const list = [...new Set(unresolved)].join('\n  ');
    console.log(
      `\nCONFLUENCE LINKS THAT COULD NOT BE REPOINTED. These will 404 once the` +
        `\nspace is closed:\n  ${list}`,
    );
  }
  if (unmapped.length) {
    console.log(`\nNOT MAPPED, review before the space is closed:\n  ${unmapped.join('\n  ')}`);
  }
  console.log(`\n${written} pages${DRY ? ' planned' : ' written'}.`);
}

await main();
