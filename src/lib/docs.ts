/**
 * The shape of the documentation section.
 *
 * One place that knows how docs pages group into apps, what order they sit in,
 * and what each app is called, so the hub, the sidebar and the prev/next footer
 * cannot disagree with each other.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type DocEntry = CollectionEntry<'docs'>;

/**
 * Display order and labels for the groups in the sidebar.
 *
 * Explicit rather than read from the apps collection, because two of these are
 * not apps: "legal" has no product behind it, and the unpublished apps are not
 * in the apps collection at all. The order matches the apps collection where
 * they overlap, so OnBudget leads here as it does everywhere else.
 */
const GROUPS: { app: string; label: string; blurb: string }[] = [
  {
    app: 'onbudget',
    label: 'OnBudget',
    blurb: 'Budget tracking and cost reporting for Jira.',
  },
  {
    app: 'astrolink',
    label: 'Astrolink',
    blurb: 'Work item link graph for Jira.',
  },
  {
    app: 'expanded-macro-collection',
    label: 'Expanded Macro Collection',
    blurb: 'Governance and reporting macros for Confluence.',
  },
  {
    app: 'configuration-monitor',
    label: 'Configuration Monitor',
    blurb: 'Project audit log for Jira.',
  },
  {
    app: 'atelier',
    label: 'Atelier',
    blurb: 'Page design and formatting macros for Confluence.',
  },
  {
    app: 'field-scout',
    label: 'Field Scout',
    blurb: 'Custom field audit for Jira.',
  },
  {
    app: 'legal',
    label: 'Terms and policies',
    blurb: 'The agreements that cover every app we publish.',
  },
];

export type DocGroup = {
  app: string;
  label: string;
  blurb: string;
  pages: DocEntry[];
};

/** The slug a docs entry is published at, without the /documentation prefix. */
export const docSlug = (entry: DocEntry): string => entry.id.replace(/\.mdx?$/, '');

export const docHref = (entry: DocEntry): string => `/documentation/${docSlug(entry)}/`;

/**
 * Every published group, in display order, each with its pages sorted.
 *
 * Drafts are dropped here rather than at each call site, so an unpublished app
 * cannot leak into the sidebar of a published one by being forgotten.
 */
export async function docGroups(): Promise<DocGroup[]> {
  const all = await getCollection('docs', ({ data }) => !data.draft);

  return GROUPS.map((group) => ({
    ...group,
    pages: all
      .filter((entry) => entry.data.app === group.app)
      .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title)),
  })).filter((group) => group.pages.length > 0);
}

/** Flattened reading order, which is what prev and next walk. */
export const docOrder = (groups: DocGroup[]): DocEntry[] => groups.flatMap((g) => g.pages);

export const groupLabel = (app: string): string =>
  GROUPS.find((g) => g.app === app)?.label ?? app;

/**
 * Headings for the on-this-page rail.
 *
 * Only h2, deliberately. These pages came out of Confluence with inconsistent
 * h3 usage, and a two-level rail on a 1,500 word page is noise rather than
 * navigation.
 */
export type Heading = { depth: number; slug: string; text: string };

export const tocFrom = (headings: Heading[]): Heading[] =>
  headings.filter((h) => h.depth === 2);
