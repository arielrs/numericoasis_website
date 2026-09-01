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
import { join, relative } from 'node:path';
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

// 2b. Defensive copy.
//
// A review of every English string found the site was selling its hosting
// choice instead of the buyer's outcome, and volunteering what it would not do:
// "Forge only, and that is a deliberate constraint", "Read-only where we can
// be", "we do not hold a partner tier", "or tell you that none of ours do".
// Four instances of one habit, which means it needs a guard or it comes back
// one string at a time.
//
// Deliberately short, and deliberately literal. It bans the exact phrasings
// that were removed, not the words in general: "No new custom fields" is a
// benefit a Jira admin wants to read, and stays.
{
  const BANNED = [
    'deliberate constraint',
    'forge only',
    'rather than beside it',
    'we do not hold',
    'narrow focus',
    'where we can be',
    'none of ours do',
    'not the pitch',
  ];
  const COPY_DIRS = [join('src', 'i18n'), join('src', 'content'), join('src', 'consts.ts')];
  const files = (await walk(join(ROOT, 'src'))).filter((f) => /\.(ts|mdx?|md)$/.test(f));

  for (const file of files) {
    const shown = relative(ROOT, file);
    if (!COPY_DIRS.some((dir) => shown.startsWith(dir))) continue;
    const lines = (await readFile(file, 'utf8')).split('\n');
    lines.forEach((line, i) => {
      const lower = line.toLowerCase();
      for (const phrase of BANNED) {
        if (lower.includes(phrase)) {
          errors.push(`${shown}:${i + 1}: defensive copy, "${phrase}"`);
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

if (errors.length) {
  console.error(`\ncheck-content failed (${errors.length}):\n${errors.map((e) => `  x ${e}`).join('\n')}\n`);
  process.exit(1);
}
console.log('check-content: content parity and typography OK');
