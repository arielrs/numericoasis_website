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

/**
 * Runs of label paragraphs become the lists they always were.
 *
 * Confluence authored these as definition items, "**Path Finder:** right-click
 * any work item...", but the storage format has them as plain <p>. Migrated
 * straight across, 357 paragraphs in 67 runs rendered as identical flat blocks
 * with no bullet, no indent and the same left edge as body prose: fourteen
 * consecutive near-identical two-line slabs filling a viewport on
 * configuration-monitor/overview.
 *
 * Only runs of three or more convert. A lone "**Support Portal:**" is a
 * paragraph and stays one, and the metadata line at the top of a policy page is
 * excluded by name. No words change, only the markup.
 */
const LABEL = /^\*\*[^*]{1,60}[:.]\*\*\s+\S|^\*\*[^*]{1,60}\*\*[:.]\s+\S/;
const META = /^\*\*(Last Updated|Release Date|Effective|App|Vendor|Version)/i;

function listify(md) {
  const blocks = md.split('\n\n');
  const out = [];
  let run = [];

  const flush = () => {
    if (run.length >= 3) out.push(run.map((b) => `- ${b.replace(/\n/g, ' ')}`).join('\n'));
    else out.push(...run);
    run = [];
  };

  for (const block of blocks) {
    const b = block.trim();
    if (LABEL.test(b) && !META.test(b)) {
      run.push(b);
      continue;
    }
    flush();
    out.push(block);
  }
  flush();
  return out.join('\n\n');
}

/**
 * A page with h3 and no h2 skips a level from the h1 the layout prints, and the
 * on-this-page rail keeps depth 2 only, so the longest page in the section had
 * no in-page navigation at all. Promote the whole page a level.
 */
function normaliseHeadings(md) {
  if (/^## /m.test(md) || !/^### /m.test(md)) return md;
  return md.replace(/^(#{3,6}) /gm, (_, hashes) => `${hashes.slice(1)} `);
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

/**
 * Corrections applied to the Confluence source on the way out.
 *
 * The source pages describe Jira's 700 custom field limit as an instance-wide
 * cap. It is 700 per space, and a Jira administrator evaluating a field-audit
 * app is precisely the reader who will check that and find it wrong. Corrected
 * here rather than in the markdown, so a re-export reproduces the correction
 * instead of quietly reverting it.
 *
 * `expect` is the number of matches this pattern should find across the whole
 * export. A shortfall is reported at the end, because the failure mode of a
 * correction table is that the source changes underneath it and it goes silent.
 */
const CORRECTIONS = [
  {
    expect: 1,
    from: /Jira Cloud enforces a \*\*700 custom field limit\*\*\./g,
    to: 'Jira Cloud caps custom fields at **700 per space**, not across the whole site.',
  },
  {
    expect: 1,
    from: /"We're approaching the 700 custom field limit"/g,
    to: '"A space is approaching the 700 custom field limit"',
  },
  {
    expect: 1,
    from: /as you approach or exceed Jira's 700 field limit/g,
    to: "as a space approaches or exceeds Jira's 700 field limit",
  },
  {
    expect: 1,
    from: /visual warnings as you approach or exceed the limit/g,
    to: 'visual warnings as a space approaches or exceeds the limit',
  },
  {
    expect: 1,
    from: /Company-managed projects share the 700-field limit per field configuration, see which projects are approaching it\./g,
    to: 'Company-managed projects share a field configuration, and the 700 field limit applies per space, so see which are approaching it.',
  },
  // The SLA cites a vendor id that is not ours. Hand-fixed once, then reverted
  // by the next export, which is the whole argument for this table existing:
  // anything corrected in the markdown instead of here lives until someone
  // re-runs the script, and nobody remembers that it was corrected.
  {
    expect: 1,
    from: /https:\/\/marketplace\.atlassian\.com\/vendors\/1227498/g,
    to: 'https://marketplace.atlassian.com/vendors/1064627585/numeric-oasis?utm_source=numericoasis&utm_medium=site&utm_campaign=doc-legal&utm_content=doc-article',
  },
  {
    expect: 1,
    from: /Weekends and public holidays \(Brasil\)/g,
    to: 'Weekends and public holidays (Brazil)',
  },
  // "plugin" is Server-era vocabulary Atlassian retired years ago, and the
  // house style bans it. The Confluence source predates that rule.
  {
    expect: 1,
    from: /fields accumulate from plugins, migrations, and changing workflows/g,
    to: 'fields accumulate from apps, migrations, and changing workflows',
  },
  {
    expect: 1,
    from: /and other plugins, even after the plugin is removed/g,
    to: 'and other apps, even after the app is removed',
  },
  {
    expect: 1,
    from: /"Old fields from removed plugins are cluttering our instance"/g,
    to: '"Old fields from removed apps are cluttering our instance"',
  },
  {
    expect: 2,
    from: /which products and plugins created your fields/g,
    to: 'which products and apps created your fields',
  },
  {
    expect: 1,
    from: /which product or plugin created each field/g,
    to: 'which product or app created each field',
  },
  {
    expect: 1,
    from: /the product or plugin that created each field/g,
    to: 'the product or app that created each field',
  },
];

function correct(md, tally) {
  let out = md;
  for (const rule of CORRECTIONS) {
    const hits = out.match(rule.from);
    if (hits) tally.set(rule, (tally.get(rule) ?? 0) + hits.length);
    out = out.replace(rule.from, rule.to);
  }
  return out;
}

async function main() {
  const res = await fetch(`${SITE}/api/v2/spaces/${SPACE_ID}/pages?limit=250`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`space listing failed: ${res.status}`);
  const { results } = await res.json();

  let written = 0;
  const unmapped = [];
  const unresolved = [];
  const corrections = new Map();

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

    let body = correct(
      normaliseHeadings(listify(relink(safe(convert(doc.body?.storage?.value ?? '')), unresolved))),
      corrections,
    );

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
  // A correction that stops matching means the Confluence source changed under
  // it, and a silent no-op there would re-publish the wrong claim.
  const missed = CORRECTIONS.filter((rule) => (corrections.get(rule) ?? 0) < rule.expect);
  if (missed.length) {
    console.log(
      `
CORRECTIONS THAT DID NOT APPLY (${missed.length}). Check whether each is still needed:`,
    );
    for (const rule of missed) console.log(`  ${rule.from}`);
  } else {
    console.log(`
${CORRECTIONS.length} source corrections applied.`);
  }

  console.log(`\n${written} pages${DRY ? ' planned' : ' written'}.`);
}

await main();
