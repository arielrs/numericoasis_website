/**
 * The translation termbase.
 *
 * WHY THIS EXISTS
 *
 * The site ships in three languages and had no translation tooling at all: no
 * glossary, no per-locale linter, no staleness detector. The parity gate
 * confirms a file exists with the right translationKey and never opens the body.
 * So a fluency audit found things nothing could have caught: words that are not
 * Portuguese (`regera`, `amostra` used as a verb), a Spanish sentence saying the
 * author *puts up with* the apps rather than supports them, "listing"
 * translated as "advertisement" in four places, and one English structure
 * calqued into both languages ten times.
 *
 * It also found the same concept rendered two ways inside one locale thirteen
 * times per language, and a Spanish corpus written in two variants at once.
 *
 * WHY IT LIVES IN scripts/ RATHER THAN src/i18n/
 *
 * Only the build gate consumes it, and a file whose whole job is to list
 * forbidden phrasings would trip the defensive-copy and terminology checks if it
 * sat inside the directories those checks scan.
 *
 * THE TWO RULES IT ENCODES
 *
 * 1. Some English stays English, because a Brazilian or Spanish Jira
 *    administrator genuinely says it that way. Translating "story points" into
 *    Portuguese would read as though written by someone who has never used the
 *    product. That list is KEEP_ENGLISH, and it exists to stop an over-eager
 *    future pass from "fixing" correct copy.
 * 2. Everything else gets translated, and gets translated the SAME WAY every
 *    time. That is FORBIDDEN.
 *
 * Spanish is es-ES. The code already declared it (BCP47_MAP and OG_LOCALE_MAP in
 * src/i18n/config.ts both say es-ES), roughly seventy percent of the corpus
 * already read that way, and every worked currency example was already in euros.
 * The twenty-six `costo` instances were the exception, not the rule, and one of
 * them sat eleven characters into a lede whose own title said `costes`.
 */

/**
 * Terms that must NOT be translated. Documented so a later pass does not
 * "correct" them. These are the words the product's own interface uses and the
 * words its administrators type into a search box.
 */
export const KEEP_ENGLISH = [
  'Jira',
  'Confluence',
  'Forge',
  'Atlassian Marketplace',
  'Jira Service Management',
  'story points',
  'worklogs',
  'JQL',
  'custom fields',
  'dashboard',
  'epic',
  'sprint',
  'backlog',
];

/**
 * Forbidden renderings, per locale.
 *
 * `re` must be word-bounded: an earlier version of the defensive-copy gate used
 * bare substrings and rejected a legitimate privacy sentence.
 *
 * URLs and slugs are stripped from a line before it is tested, because slugs
 * stay English on purpose. `src/i18n/paths.ts` builds every locale URL by
 * re-prefixing the same bare path, so translating a slug in one locale breaks
 * the hreflang cluster for all three.
 */
export const FORBIDDEN = {
  'pt-BR': [
    { re: /\bwork items?\b/i, say: 'use "itens de trabalho"' },
    { re: /\bissues\b/i, say: 'Atlassian retired "issue": use "itens de trabalho"' },
    { re: /\bvendors?\b/i, say: 'use "fornecedor"' },
    { re: /\bseats\b/i, say: 'use "licenças"' },
    { re: /\bassentos\b/i, say: '"assentos" are chairs: use "licenças" or "usuários"' },
    { re: /\bfootprint\b/i, say: 'use "parque de apps"' },
    { re: /\bregera(ção|r|m)?\b/i, say: 'not a Portuguese word: use "regenerar" or "gerar de novo"' },
    { re: /\bcontornos\b/i, say: 'for "workaround" use "soluções de contorno"' },
    { re: /\bworkarounds?\b/i, say: 'use "soluções de contorno"' },
    // Narrow on purpose: a bare "build" matched a TypeScript object key.
    { re: /\bbuild (customizado|sob medida|personalizado)\b/i, say: 'use "desenvolvimento sob medida"' },
    { re: /é seu para\b/i, say: 'calque of "yours to X": rewrite as a verb the reader performs' },
    { re: /\bsão seus para\b/i, say: 'calque of "yours to X"' },
    { re: /\bpreso em voo\b/i, say: '"in flight" is an English metaphor: say "em trabalho em andamento"' },
    { re: /\bsub-tarefas\b/i, say: 'Atlassian pt-BR writes "subtarefas"' },
  ],
  es: [
    // The es-ES decision. `costo`/`costos` is the Latin American form.
    { re: /\bcostos?\b/i, say: 'this site is es-ES: use "coste" / "costes"' },
    { re: /\bwork items?\b/i, say: 'use "elementos de trabajo"' },
    { re: /\bissues\b/i, say: 'Atlassian retired "issue": use "elementos de trabajo"' },
    { re: /\bvendors?\b/i, say: 'use "proveedor"' },
    { re: /\bfootprint\b/i, say: 'use "parque de apps"' },
    { re: /\bmonitoreadas?\b/i, say: 'es-ES uses "monitorizadas"' },
    { re: /\bun app\b/i, say: '"app" is feminine here: "una app"' },
    { re: /es tuyo para\b/i, say: 'calque of "yours to X": rewrite as a verb the reader performs' },
    { re: /son tuyos para\b/i, say: 'calque of "yours to X"' },
    { re: /\batado en vuelo\b/i, say: '"in flight" is an English metaphor: say "en trabajo en curso"' },
    { re: /\ben corto\b/i, say: 'use "en resumen"' },
  ],
};

/**
 * Meta field caps, mirrored from the zod schema in src/content.config.ts.
 *
 * The content collections are capped there, so MDX cannot exceed them: the build
 * fails first. The src/i18n/pages/** dictionaries are plain TypeScript objects
 * and had no guard at all, which is how three privacy metaDescriptions reached
 * 207 to 217 characters against a 160 cap, and one Spanish title reached 53
 * against 50. Portuguese and Spanish run longer than English, so the translated
 * versions truncate first and truncate mid-clause.
 */
export const META_CAPS = { title: 50, description: 160 };
