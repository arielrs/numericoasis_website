import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const langEnum = z.enum(['en', 'pt-BR', 'es']);

/**
 * A closed tag vocabulary, because tags are indexable URLs. With a free-form
 * array one typo ships a one-post archive in three locales, which is exactly
 * the thin-content pattern the tag pages exist to avoid.
 *
 * Slugs stay ASCII and locale-independent so /blog/tag/forge/ is the same path
 * in every locale and the hreflang cluster stays mirrored. The display labels
 * are localised in src/i18n.
 */
export const BLOG_TAGS = [
  'onbudget',
  'jira-cost-management',
  'confluence-governance',
  'jira-administration',
  'forge',
  'marketplace',
  'atlassian-cloud',
  'how-to',
  'product-updates',
] as const;

export type BlogTag = (typeof BLOG_TAGS)[number];

/** Authors are an enum so a byline cannot reference a person with no bio. */
export const AUTHOR_IDS = ['team'] as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /**
       * The SERP title, capped. Two post headlines are 91 and 102 characters,
       * which is a good headline and a truncated search result.
       */
      metaTitle: z.string().max(50).optional(),
      description: z.string(),
      /**
       * The SERP snippet, capped. `description` also feeds
       * BlogPosting.description and the card blurb, where length is an asset,
       * so truncating that one field to fit a SERP would degrade the others.
       */
      metaDescription: z.string().max(160).optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.enum(BLOG_TAGS)).min(1).max(4),
      author: z.enum(AUTHOR_IDS).default('team'),
      heroImage: image().optional(),
      /** Required whenever heroImage is set. See the refinement below. */
      heroImageAlt: z.string().optional(),
      draft: z.boolean().default(false),
      lang: langEnum,
      translationKey: z.string(),
    })
    .superRefine((data, ctx) => {
      // The hero is the largest image on the article and the Open Graph card
      // image. It was hardcoded alt="" on every post, which is the correct
      // value for the decorative copy on the *cards* but wrong here.
      if (data.heroImage && !data.heroImageAlt) {
        ctx.addIssue({
          code: 'custom',
          path: ['heroImageAlt'],
          message: 'posts with a heroImage must set heroImageAlt',
        });
      }
    }),
});

const apps = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/apps' }),
  schema: ({ image }) =>
    z
      .object({
        // --- Identity -------------------------------------------------------
        name: z.string(),
        tagline: z.string(),
        description: z.string(),
        /** Full Marketplace listing title. Verbatim, so it stays English. */
        listingName: z.string().optional(),
        /**
         * Localised noun phrase naming the category, e.g. "Custom field audit
         * for Jira". Carries the keyword in the <title> and the H1, both of
         * which were the bare product name on five of six apps: nobody searches
         * "Atelier". Localised, unlike listingName, which is the English
         * Marketplace title and is identical in every locale.
         */
        descriptor: z.string().optional(),
        /**
         * The SERP title, capped so it survives with the brand token appended.
         * Explicit rather than composed from name plus descriptor: "Expanded
         * Macro Collection" is 25 characters on its own, so one formula cannot
         * serve every app.
         */
        metaTitle: z.string().max(50).optional(),
        /**
         * The SERP snippet, capped. `description` also feeds
         * SoftwareApplication.description, where length is an asset.
         */
        metaDescription: z.string().max(160).optional(),
        version: z.string().optional(),
        datePublished: z.coerce.date().optional(),
        dateModified: z.coerce.date().optional(),

        // --- Links ----------------------------------------------------------
        marketplaceUrl: z.string().url().optional(),
        /**
         * Root relative on purpose. The docs are on this site, and
         * check-dist.mjs only validates href="/..." links, so an absolute URL
         * here was invisible to the link gate and would have 404ed silently
         * after any rename.
         */
        documentationUrl: z.string().startsWith('/').optional(),
        supportUrl: z.string().url().optional(),

        // --- Placement ------------------------------------------------------
        /**
         * Where the app is deployed, which drives the "For Jira" / "For
         * Confluence" grouping on the portfolio pages. Distinct from `products`,
         * which is the compatibility badge row and must be substantiated by the
         * Marketplace listing.
         */
        hostProducts: z.array(z.enum(['jira', 'confluence'])).min(1),
        products: z.array(z.enum(['jira', 'confluence', 'bitbucket', 'jsm'])).default([]),
        order: z.number().default(100),
        audiences: z.array(z.string()).default([]),

        /**
         * The flagship gets its own landing page and is excluded from the
         * /apps/<slug>/ route, so there is exactly one indexable page per app.
         */
        flagship: z.boolean().default(false),
        landingPath: z.string().optional(),

        // --- Commerce -------------------------------------------------------
        /**
         * An enum rather than a display string. Pricing used to be inferred by
         * regex from localised copy, which meant three different regexes in
         * three page files. The localised label now lives in the dictionaries.
         */
        priceModel: z.enum(['free', 'paid']),

        // --- Trust ----------------------------------------------------------
        runsOnAtlassian: z.boolean().default(true),
        /**
         * Required, deliberately. This drives a published privacy claim in the
         * per-app table on /about/. With a default, four apps asserted "No"
         * because nobody had set the field, and one of those assertions was
         * false. A missing value must fail the build, not publish an answer.
         */
        storesPersonalData: z.boolean(),
        scopeSummary: z.array(z.string()).default([]),
        dataStatement: z.string().optional(),
        trustSignals: z.array(z.string()).default([]),

        // --- Body content ---------------------------------------------------
        icon: image().optional(),
        screenshots: z
          .array(
            z.object({
              image: image(),
              caption: z.string(),
              /** Defaults to the caption when omitted. */
              alt: z.string().optional(),
              /** Lets a landing page place a specific shot rather than take them in order. */
              slot: z.string().optional(),
            }),
          )
          .default([]),
        valueProps: z
          .array(
            z.object({
              title: z.string(),
              body: z.string(),
              icon: z.string().optional(),
            }),
          )
          .default([]),
        keyFeatures: z.array(z.string()).default([]),
        featureGroups: z
          .array(
            z.object({
              name: z.string(),
              blurb: z.string().optional(),
              items: z.array(z.string()).min(1),
            }),
          )
          .default([]),

        // --- Flagship landing content ---------------------------------------
        /** The 40 to 60 word answer-first opening. Also the meta description. */
        answerFirst: z.string().optional(),
        problem: z
          .object({
            heading: z.string(),
            body: z.string(),
            questions: z.array(z.string()).min(1),
          })
          .optional(),
        steps: z
          .array(
            z.object({
              title: z.string(),
              body: z.string(),
              shot: z.string().optional(),
            }),
          )
          .default([]),
        faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
        useCases: z
          .array(z.object({ persona: z.string(), job: z.string(), outcome: z.string() }))
          .default([]),
        relatedApps: z.array(z.string()).default([]),

        // --- Bookkeeping ----------------------------------------------------
        lang: langEnum,
        translationKey: z.string(),
      })
      .superRefine((data, ctx) => {
        if (!data.flagship) return;
        // A flagship page is only worth its own URL if it is actually deeper
        // than a detail page. Enforce that at build time so a thin translation
        // fails the deploy instead of shipping a half-empty landing page.
        for (const key of ['answerFirst', 'landingPath', 'problem'] as const) {
          if (!data[key]) {
            ctx.addIssue({ code: 'custom', path: [key], message: `flagship apps require "${key}"` });
          }
        }
        if (data.faq.length < 8) {
          ctx.addIssue({
            code: 'custom',
            path: ['faq'],
            message: `flagship apps require at least 8 FAQ entries, got ${data.faq.length}`,
          });
        }
        if (data.steps.length < 3) {
          ctx.addIssue({
            code: 'custom',
            path: ['steps'],
            message: `flagship apps require at least 3 steps, got ${data.steps.length}`,
          });
        }
      }),
});

/**
 * Product documentation, migrated out of the public Confluence space so that
 * space can be switched off.
 *
 * English only, deliberately. The apps and blog collections carry "lang" and
 * "translationKey" and are parity-checked in all three locales; this one is
 * not, because 22,000 words of technical documentation is a different order of
 * translation commitment. check-content.mjs only enforces parity for those two
 * collections, so nothing here fights the build.
 */
/**
 * Commercial landing pages.
 *
 * Not blog posts: a post is dated, sits in a feed, and carries a byline. These
 * are undated pages that receive paid traffic and answer one buying question,
 * so they need a top level URL rather than a /blog/ one, and they must not turn
 * up in the RSS feed or the post listing.
 *
 * Not app pages either: an app page describes a product, and one of these can
 * describe a use case that spans products or none.
 *
 * Trilingual and enforced as such by scripts/check-content.mjs, because the
 * whole point of the format is that it takes paid traffic in three markets.
 */
const landings = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/landings' }),
  schema: z.object({
    title: z.string(),
    /** The SERP title, capped. Same reasoning as the blog collection. */
    metaTitle: z.string().max(60).optional(),
    description: z.string(),
    metaDescription: z.string().max(160).optional(),
    /** Feeds the h1 area. Short, and it is the promise the ad made. */
    eyebrow: z.string().optional(),
    /** The app this page sells, joined to the apps collection by translationKey. */
    app: z.string(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    lang: langEnum,
    translationKey: z.string(),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    /**
     * The app this page documents. Matches "translationKey" in the apps
     * collection, so a page can be joined to its app for the icon and the
     * Marketplace link. "legal" is the one value with no app behind it.
     */
    app: z.string(),
    /** Sort order inside the app. Policies sit at 8+ so they land last. */
    order: z.number().default(50),
    /**
     * The SERP snippet, and what renders when someone pastes a policy link into
     * chat. The exporter derives a first draft from the body, which produced
     * "Last Updated: July 2, 2026" on eight pages and a literal blockquote
     * marker on another, so the shape is enforced rather than trusted.
     */
    description: z
      .string()
      .min(40)
      .max(160)
      .refine((v) => !/^\s*[>#*|-]/.test(v), {
        message: 'description must not start with markdown punctuation',
      })
      .refine((v) => !/^(Last Updated|Release Date|Effective|Version)/i.test(v), {
        message: 'description must describe the page, not restate a date or version',
      }),
    /** Unpublished apps: migrated so nothing is lost, not yet shown. */
    draft: z.boolean().default(false),
    /** Traceability back to the page this came from, while Confluence still exists. */
    sourcePageId: z.string().optional(),
    sourceTitle: z.string().optional(),
  }),
});

export const collections = { blog, apps, docs, landings };
