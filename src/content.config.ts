import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const langEnum = z.enum(['en', 'pt-BR', 'es']);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      author: z.string().default('Numeric Oasis Team'),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
      lang: langEnum,
      translationKey: z.string(),
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
        /** Full Marketplace listing title. Used in <title> and structured data. */
        listingName: z.string().optional(),
        version: z.string().optional(),
        datePublished: z.coerce.date().optional(),
        dateModified: z.coerce.date().optional(),

        // --- Links ----------------------------------------------------------
        marketplaceUrl: z.string().url().optional(),
        documentationUrl: z.string().url().optional(),
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
        /** True only for Expanded Macro Collection, whose privacy copy differs. */
        storesPersonalData: z.boolean().default(false),
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

export const collections = { blog, apps };
