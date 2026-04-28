import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    }),
});

const apps = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/apps' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tagline: z.string(),
      description: z.string(),
      marketplaceUrl: z.string().url().optional(),
      documentationUrl: z.string().url().optional(),
      products: z.array(z.enum(['jira', 'confluence', 'bitbucket', 'jsm'])).default([]),
      pricing: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(100),
      icon: image().optional(),
    }),
});

export const collections = { blog, apps };
