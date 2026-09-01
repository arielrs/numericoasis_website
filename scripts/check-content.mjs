/**
 * Pre-build content checks.
 *
 * Astro's build validates each content file in isolation, so an app or post that
 * exists in English but not in Spanish builds and deploys green while quietly
 * showing a shorter list to two thirds of visitors. Nothing else in the toolchain
 * catches that, which is what this script is for.
 *
 * Dictionary key parity and array-length drift are handled at the type level by
 * `Shape<typeof en>` (see src/i18n/shape.ts) and surface through `astro check`.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { FORBIDDEN, META_CAPS } from './termbase.mjs';
import { parse as parseYaml } from 'yaml';

const ROOT = process.cwd();
const LOCALES = ['en', 'pt-BR', 'es'];
const EM_DASH = '\u2014';

/** Out of scope for the em-dash rule: the poker timer is a separate, standalone product. */
const EM_DASH_EXCLUDE = [join('src', 'poker'), join('src', 'pages', 'poker.astro')];

const errors = [];

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules') await walk(path, out);
    } else {
      out.push(path);
    }
  }
  return out;
}

const frontmatterValue = (source, key) =>
  source
    .match(new RegExp(`^${key}:\s*(.+)$`, 'm'))?.[1]
    .trim()
    .replace(/^["']|["']$/g, '');

// 1. Content-collection parity: every translationKey in every locale, exactly once.
for (const collection of ['apps', 'blog', 'landings']) {
  const files = (await walk(join(ROOT, 'src/content', collection))).filter((f) => /\.mdx?$/.test(f));
  const seen = new Map();

  for (const file of files) {
    const source = await readFile(file, 'utf8');
    const lang = frontmatterValue(source, 'lang');
    const key = frontmatterValue(source, 'translationKey');
    const shown = relative(ROOT, file);

    if (!lang || !key) {
      errors.push(`${shown}: missing lang or translationKey`);
      continue;
    }
    if (!LOCALES.includes(lang)) {
      errors.push(`${shown}: unknown lang "${lang}"`);
      continue;
    }
    if (!seen.has(key)) seen.set(key, new Map());
    const langs = seen.get(key);
    if (langs.has(lang)) {
      errors.push(`content/${collection}: "${key}" has two ${lang} files (${langs.get(lang)}, ${shown})`);
    }
    langs.set(lang, shown);
  }

  for (const [key, langs] of seen) {
    const missing = LOCALES.filter((l) => !langs.has(l));
    if (missing.length) {
      errors.push(`content/${collection}: "${key}" missing locale(s): ${missing.join(', ')}`);
    }
  }
}

// 2. No em dashes in user-facing copy.
// All of src/, not a hand-listed subset: the first version of this check missed
// src/consts.ts and src/lib entirely, and silently passed a deliberate em dash.
{
  const files = (await walk(join(ROOT, 'src'))).filter((f) => /\.(astro|ts|tsx|mdx?|md|css)$/.test(f));
  for (const file of files) {
    const shown = relative(ROOT, file);
    if (EM_DASH_EXCLUDE.some((ex) => shown.startsWith(ex))) continue;
    const lines = (await readFile(file, 'utf8')).split('\n');
    lines.forEach((line, i) => {
      if (line.includes(EM_DASH)) errors.push(`${shown}:${i + 1}: em dash (U+2014) in copy`);
    });
  }
}

// 2b. Defensive copy, in three languages.
//
// The habit: selling an absence instead of a benefit. "Changes nothing in
// Jira" tells a buyer the app does nothing. "Shows only what you can already
// see" told them it showed them less, on Astrolink, whose entire job is to show
// them something they could not see before.
//
// This list has been wrong twice. The first version banned four exact English
// phrasings that had just been removed, and a later audit found 73 more
// instances of the same habit that it could not see, because two thirds of them
// were in Portuguese or Spanish and the list was English only. Both faults are
// fixed here: the rules are per locale, and they match the SHAPE of the habit
// rather than four sentences somebody once wrote.
//
// Reversal on the record: the previous version of this comment carved out "No
// new custom fields" as "a benefit a Jira admin wants to read". The owner
// overruled that after seeing it on the page. It is still a real benefit; it is
// now stated as one ("works with the data already in Jira") rather than as a
// thing we do not do. Do not re-add the carve-out.
//
// src/content/docs is EXCLUDED. The old version silently policed it, because
// COPY_DIRS contains src/content, and its own comment claimed otherwise.
// /documentation/onbudget/what-onbudget-does-not-do/ is a deliberate asset:
// answer engines build comparison tables out of negative facts, and a product
// with no stated limits is left out of them. The same goes for the "what you
// give up" sections in the long-form posts. Absence claims belong there. They do
// not belong above the fold on a page someone is paying to send traffic to.
{
  const BANNED = [
    // The originals, kept.
    { re: /deliberate constraint/i, say: 'sells the constraint, not the outcome' },
    { re: /\bforge only\b/i, say: 'sells the hosting choice as a limit' },
    { re: /rather than beside it/i, say: 'defensive framing' },
    { re: /\bnarrow focus\b/i, say: 'diminisher' },
    { re: /where we can be\b/i, say: 'hedged capability' },
    { re: /none of ours do/i, say: 'defensive framing' },
    { re: /not the pitch/i, say: 'defensive framing' },

    // English: the shapes the audit actually found.
    { re: /changes? nothing in (jira|confluence)/i, say: 'sells an absence: say what it does with your data' },
    { re: /shows? only what you (can )?already/i, say: 'sells an absence: say it respects permissions' },
    { re: /\bnever writes to\b/i, say: 'sells an absence: say it reads rather than edits' },
    { re: /\bno new custom fields\b/i, say: 'sells an absence: say it works with the fields already there' },
    { re: /\bstores only\b/i, say: 'diminisher: say what it keeps and why' },
    { re: /no third-party server to review/i, say: 'sells an absence: say the review stays inside Atlassian' },
    { re: /nothing to undo/i, say: 'pre-concedes the sale' },
    { re: /uninstall removes everything/i, say: 'sells the exit, not the product' },

    // Portuguese.
    { re: /não mud[ao] nada no (jira|confluence)/i, say: 'vende uma ausência: diga o que ele faz' },
    { re: /mostra só o que você já/i, say: 'vende uma ausência: diga que respeita permissões' },
    { re: /nunca escreve n[oa]/i, say: 'vende uma ausência: diga que lê em vez de editar' },
    { re: /sem campos personalizados novos/i, say: 'vende uma ausência: diga que usa os campos que já existem' },
    { re: /guarda apenas/i, say: 'diminuidor: diga o que guarda e por quê' },
    { re: /nenhum servidor de terceiros/i, say: 'vende uma ausência' },
    { re: /nada para desfazer/i, say: 'concede a venda antes da hora' },
    { re: /desinstalar remove tudo/i, say: 'vende a saída, não o produto' },

    // Spanish.
    { re: /no cambia nada en (jira|confluence)/i, say: 'vende una ausencia: di qué hace' },
    { re: /muestra solo lo que ya/i, say: 'vende una ausencia: di que respeta los permisos' },
    { re: /nunca escribe en/i, say: 'vende una ausencia: di que lee en vez de editar' },
    { re: /sin campos personalizados nuevos/i, say: 'vende una ausencia: di que usa los campos que ya existen' },
    { re: /guarda solo/i, say: 'diminutivo: di qué guarda y por qué' },
    { re: /ningún servidor de terceros/i, say: 'vende una ausencia' },
    { re: /nada que deshacer/i, say: 'concede la venta antes de tiempo' },
    { re: /desinstalar lo elimina todo/i, say: 'vende la salida, no el producto' },
  ];

  const COPY_DIRS = [join('src', 'i18n'), join('src', 'content'), join('src', 'consts.ts')];
  // Product documentation and the legal pages state limits on purpose.
  const EXEMPT = [join('src', 'content', 'docs'), join('src', 'i18n', 'pages', 'privacy')];
  const files = (await walk(join(ROOT, 'src'))).filter((f) => /\.(ts|mdx?|md)$/.test(f));

  for (const file of files) {
    const shown = relative(ROOT, file);
    if (!COPY_DIRS.some((dir) => shown.startsWith(dir))) continue;
    if (EXEMPT.some((dir) => shown.startsWith(dir))) continue;
    const lines = (await readFile(file, 'utf8')).split('\n');
    lines.forEach((line, i) => {
      // A comment explaining the ban is not a violation of it.
      if (/^\s*(\/\/|\*|<!--|#)/.test(line)) return;
      for (const rule of BANNED) {
        if (rule.re.test(line)) {
          errors.push(`${shown}:${i + 1}: defensive copy, ${rule.say}`);
        }
      }
    });
  }
}

// 2b. Atlassian terminology.
//
// "plugin" and "add-on" are Server-era words Atlassian retired, and "JIRA" has
// not been the product's capitalisation since 2011. They read as written by
// someone who has not touched the platform recently, which is the opposite of
// the impression a Marketplace vendor needs to make.
//
// Two migrated documentation pages carried "plugin" until the correction table
// in scripts/confluence-export.mjs caught them. This is the guard that stops it
// coming back on the next export, and it deliberately covers src/content/docs,
// which the defensive-copy check above does not.
{
  const TERMS = [
    { re: /\bplug-?ins?\b/i, say: 'plugin: Atlassian calls these apps' },
    { re: /\badd-?ons?\b/i, say: 'add-on: Atlassian calls these apps' },
    { re: /\bJIRA\b/, say: 'JIRA: the product is Jira' },
  ];
  const files = (await walk(join(ROOT, 'src'))).filter((f) => /\.(ts|astro|mdx?|md)$/.test(f));

  for (const file of files) {
    const shown = relative(ROOT, file);
    if (!shown.startsWith(join('src', 'i18n')) &&
        !shown.startsWith(join('src', 'content')) &&
        !shown.startsWith(join('src', 'pages'))) continue;
    // The poker timer is a separate, unrelated tool.
    if (shown.startsWith(join('src', 'poker'))) continue;

    const lines = (await readFile(file, 'utf8')).split('\n');
    lines.forEach((line, i) => {
      // A comment explaining the ban is not a violation of it.
      if (/^\s*(\/\/|\*|<!--)/.test(line)) return;
      for (const term of TERMS) {
        if (term.re.test(line)) errors.push(`${shown}:${i + 1}: ${term.say}`);
      }
    });
  }
}

// 3. GitHub workflow files must parse, and must define jobs.
//
// An invalid workflow does not fail loudly. GitHub creates a run with zero jobs
// and a bare "failure", labelled by file path instead of workflow name, and
// nothing deploys. A mangled inline shell block cost two silent deploys before
// this check existed.
{
  const files = (await walk(join(ROOT, '.github/workflows'))).filter((f) => /\.ya?ml$/.test(f));
  for (const file of files) {
    const shown = relative(ROOT, file);
    try {
      const doc = parseYaml(await readFile(file, 'utf8'));
      if (!doc?.jobs || Object.keys(doc.jobs).length === 0) {
        errors.push(`${shown}: parses, but defines no jobs`);
      }
    } catch (error) {
      errors.push(`${shown}: invalid YAML: ${String(error.message).split('\n')[0]}`);
    }
  }
}

// 4. Translation fluency.
//
// The site shipped in three languages with no translation tooling at all. The
// parity check above confirms a file EXISTS with the right translationKey; it
// never opens the body. A fluency audit found what that misses: words that are
// not Portuguese, a Spanish sentence saying the author puts up with the apps
// rather than supports them, one English structure calqued into both languages
// ten times, and a Spanish corpus written in two variants at once.
//
// It also found two English headings rewritten into questions with their
// Portuguese and Spanish twins left behind, which nothing noticed for a month.
// That is the staleness check at the end of this block.
//
// The rules live in scripts/termbase.mjs, because a file whose whole job is to
// list forbidden phrasings would trip the defensive-copy check if it sat inside
// the directories that check scans.
{
  const LOCALE_DIRS = { 'pt-BR': 'pt-BR', es: 'es' };
  const files = (await walk(join(ROOT, 'src'))).filter((f) => /\.(ts|mdx?|md)$/.test(f));

  for (const file of files) {
    const shown = relative(ROOT, file);
    if (!shown.startsWith(join('src', 'i18n')) && !shown.startsWith(join('src', 'content'))) continue;

    // Which locale is this file? Content is foldered by locale; the i18n
    // bundles are named by it.
    const locale = Object.keys(LOCALE_DIRS).find(
      (l) => shown.includes(`${sep}${l}${sep}`) || shown.endsWith(`${sep}${l}.ts`),
    );
    if (!locale) continue;

    const rules = FORBIDDEN[locale] ?? [];
    const lines = (await readFile(file, 'utf8')).split('\n');
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\*|<!--|#)/.test(line)) return;
      // Slugs stay English on purpose: src/i18n/paths.ts builds every locale URL
      // by re-prefixing the same bare path, so a translated slug in one locale
      // breaks the hreflang cluster for all three. Strip links and identifiers
      // before testing, or the gate fires on the URL rather than the prose.
      const prose = line
        .replace(/\]\([^)]*\)/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(
          // listingName is the app's official Marketplace title and must stay
          // English byte for byte. The rest are identifiers and paths.
          /^\s*(translationKey|listingName|slug|image|heroImage|icon|marketplaceUrl|documentationUrl|supportUrl):.*/,
          '',
        );
      for (const rule of rules) {
        if (rule.re.test(prose)) errors.push(`${shown}:${i + 1}: ${locale}, ${rule.say}`);
      }
    });
  }
}

// 5. Meta field lengths in the i18n dictionaries.
//
// zod caps metaTitle at 50 and metaDescription at 160 for src/content/**, so the
// MDX cannot exceed them: the build fails first. The src/i18n/pages/** bundles
// are plain TypeScript objects and had no guard, which is how three privacy
// metaDescriptions reached 207 to 217 characters and one Spanish title reached
// 53. Portuguese and Spanish run longer than English, so a field that just fits
// in English truncates mid-clause in the other two.
{
  const files = (await walk(join(ROOT, 'src', 'i18n', 'pages'))).filter(
    (f) => /\.ts$/.test(f) && !f.endsWith(`${sep}index.ts`),
  );

  for (const file of files) {
    const shown = relative(ROOT, file);
    const source = await readFile(file, 'utf8');
    for (const [key, cap] of [['title', META_CAPS.title], ['metaDescription', META_CAPS.description]]) {
      // Single-quoted scalars, possibly wrapped onto the next line by the
      // formatter. Escaped quotes are rare here and are handled.
      const re = new RegExp(`\\b${key}:\\s*(?:\\n\\s*)?'((?:[^'\\\\]|\\\\.)*)'`, 'g');
      for (const match of source.matchAll(re)) {
        const value = match[1].replace(/\\'/g, "'");
        if (value.length > cap) {
          const line = source.slice(0, match.index).split('\n').length;
          errors.push(`${shown}:${line}: ${key} is ${value.length} characters, cap is ${cap}`);
        }
      }
    }
  }
}

// 6. Stale translations.
//
// Rewrite an English string and its Portuguese and Spanish twins keep the old
// meaning, silently. That happened to two OnBudget headings: the English was
// rewritten into a question for answer-engine extraction and the other two
// locales carried statements for a month with a green build every time.
//
// The manifest stores a hash per English string. A changed hash means the
// translations need looking at. Accept them with:
//
//     node scripts/check-content.mjs --accept-translations
//
// which is deliberately a separate, explicit act rather than something that
// happens on its own.
{
  const MANIFEST = join(ROOT, 'scripts', 'translation-state.json');
  const accept = process.argv.includes('--accept-translations');

  const current = {};
  const enFiles = (await walk(join(ROOT, 'src', 'i18n'))).filter(
    (f) => f.endsWith(`${sep}en.ts`) && !f.endsWith(`${sep}index.ts`),
  );
  for (const file of enFiles) {
    const shown = relative(ROOT, file).split(sep).join('/');
    const source = await readFile(file, 'utf8');
    // Every single-quoted scalar in the file, in order. Positional rather than
    // keyed, which is cruder than walking the AST and enough: any edit to an
    // English string moves its hash.
    const strings = [...source.matchAll(/'((?:[^'\\\n]|\\.){8,})'/g)].map((m) => m[1]);
    current[shown] = createHash('sha256').update(strings.join(' ')).digest('hex').slice(0, 16);
  }

  if (accept) {
    await writeFile(MANIFEST, `${JSON.stringify(current, null, 2)}\n`, 'utf8');
    console.log(`translation state accepted for ${Object.keys(current).length} English bundles`);
  } else {
    let stored = {};
    try {
      stored = JSON.parse(await readFile(MANIFEST, 'utf8'));
    } catch {
      stored = null;
    }
    if (stored === null) {
      errors.push(
        'scripts/translation-state.json is missing: run node scripts/check-content.mjs --accept-translations',
      );
    } else {
      for (const [bundle, hash] of Object.entries(current)) {
        if (stored[bundle] && stored[bundle] !== hash) {
          errors.push(
            `${bundle}: English copy changed. Review the pt-BR and es twins, then run ` +
              `node scripts/check-content.mjs --accept-translations`,
          );
        }
      }
    }
  }
}

// 7. Per-locale array shape in the content collections.
//
// The parity check above confirms a file exists per locale. Zod validates each
// file in isolation and cannot express "the same length as the English one".
// So trustSignals going from four items in English to three in Spanish shipped
// two differently-shaped pages and a green build, and only a manual diff would
// have found it. This rewrite touched all six apps in all three locales, which
// is exactly the change that makes the gap expensive.
//
// Shape<T> already does this for src/i18n/** by preserving tuple arity. This is
// the same guarantee for src/content/**, where the types come from Astro's
// generated string[] and carry no length.
{
  const SHAPED = ['trustSignals', 'keyFeatures', 'audiences', 'valueProps', 'featureGroups', 'faq', 'useCases'];
  const byKey = new Map();

  for (const collection of ['apps', 'blog', 'landings']) {
    const files = (await walk(join(ROOT, 'src/content', collection))).filter((f) => /\.mdx?$/.test(f));
    for (const file of files) {
      // Normalised, because the working tree is CRLF on Windows and a regex
      // anchored on \n silently matches nothing against \r\n. An earlier
      // version of this check passed on every file for exactly that reason.
      const source = (await readFile(file, 'utf8')).replace(/\r\n/g, '\n');
      const key = frontmatterValue(source, 'translationKey');
      const lang = frontmatterValue(source, 'lang');
      if (!key || !lang) continue;

      // Count top-level "  - " entries under each field, without parsing YAML:
      // the frontmatter here is hand-written and uniformly two-space indented.
      const counts = {};
      for (const field of SHAPED) {
        const match = source.match(new RegExp(`^${field}:\\n((?:  [-#].*\\n|    .*\\n|\\n(?=  ))*)`, 'm'));
        if (!match) continue;
        counts[field] = (match[1].match(/^  - /gm) ?? []).length;
      }
      const id = `${collection}/${key}`;
      if (!byKey.has(id)) byKey.set(id, {});
      byKey.get(id)[lang] = { counts, shown: relative(ROOT, file) };
    }
  }

  for (const [id, locales] of byKey) {
    const reference = locales.en;
    if (!reference) continue;
    for (const [lang, entry] of Object.entries(locales)) {
      if (lang === 'en') continue;
      for (const [field, count] of Object.entries(reference.counts)) {
        const mine = entry.counts[field];
        if (mine === undefined) {
          errors.push(`${entry.shown}: ${id} has ${field} in en and not in ${lang}`);
        } else if (mine !== count) {
          errors.push(`${entry.shown}: ${field} has ${mine} entries, en has ${count}`);
        }
      }
    }
  }
}

// 8. The Google tag configuration is all-or-nothing per product.
//
// src/consts.ts GOOGLE_TAG holds three independent strings, and two of them only
// work as a pair. Paste adsConversionId without adsConversionLabel and
// ConsentGate.astro still loads the tag, still fires marketplace_click, and
// never fires a single conversion, because the send_to needs both halves. The
// site would look correctly configured and Smart Bidding would have nothing to
// learn from. That is the kind of failure nobody notices for a month of spend.
{
  const source = await readFile(join(ROOT, 'src', 'consts.ts'), 'utf8');
  // `\\s`, not `\s`. Inside a template literal `\s` is not a valid escape and
  // collapses to a bare "s", so the pattern would require `measurementId:s*'...'`
  // and match nothing, leaving this whole guard silently inert. The same bug
  // lives in frontmatterValue above, where it happens to be harmless.
  const read = (key) => (source.match(new RegExp(`${key}:\\s*'([^']*)'`)) ?? [])[1] ?? '';

  const measurement = read('measurementId');
  const adsId = read('adsConversionId');
  const adsLabel = read('adsConversionLabel');

  if (Boolean(adsId) !== Boolean(adsLabel)) {
    errors.push(
      'src/consts.ts: GOOGLE_TAG needs adsConversionId and adsConversionLabel together. ' +
        `Got ${adsId ? 'an id with no label' : 'a label with no id'}, which ships click ` +
        'events and no conversions.',
    );
  }
  if (measurement && !/^G-[A-Z0-9]+$/.test(measurement)) {
    errors.push(`src/consts.ts: measurementId should look like G-XXXXXXXXXX, got "${measurement}"`);
  }
  if (adsId && !/^AW-\d+$/.test(adsId)) {
    errors.push(`src/consts.ts: adsConversionId should look like AW-123456789, got "${adsId}"`);
  }
}

if (errors.length) {
  console.error(`\ncheck-content failed (${errors.length}):\n${errors.map((e) => `  x ${e}`).join('\n')}\n`);
  process.exit(1);
}
console.log('check-content: content parity and typography OK');
