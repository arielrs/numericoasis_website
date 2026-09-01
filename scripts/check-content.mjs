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

if (errors.length) {
  console.error(`\ncheck-content failed (${errors.length}):\n${errors.map((e) => `  x ${e}`).join('\n')}\n`);
  process.exit(1);
}
console.log('check-content: content parity and typography OK');
