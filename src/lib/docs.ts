/**
 * The shape of the documentation section.
 *
 * One place that knows how docs pages group into apps, what order they sit in,
 * and what each app is called, so the hub, the sidebar and the prev/next footer
 * cannot disagree with each other.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Joins to the apps collection. A docs group and an app share a key, so the
 * icon, the Marketplace link and the product page can all be looked up from
 * one. Three pages need these now, so they live here rather than in the hub.
 */
const appEntry = async (key: string) =>
  (await getCollection('apps', ({ data }) => data.lang === 'en')).find(
    (a) => a.data.translationKey === key,
  );

export const iconFor = async (key: string) => (await appEntry(key))?.data.icon;

export const marketplaceFor = async (key: string) => (await appEntry(key))?.data.marketplaceUrl;

/** The product page, which is /onbudget/ for the flagship and /apps/<slug>/ otherwise. */
export const appHrefFor = async (key: string) => {
  const entry = await appEntry(key);
  if (!entry) return undefined;
  return entry.data.landingPath ?? `/apps/${key}/`;
};

export type DocEntry = CollectionEntry<'docs'>;

/**
 * Display order and labels for the groups in the sidebar.
 *
 * Explicit rather than read from the apps collection, because two of these are
 * not apps: "legal" has no product behind it, and the unpublished apps are not
 * in the apps collection at all. The order matches the apps collection where
 * they overlap, so OnBudget leads here as it does everywhere else.
 */
/**
 * The two wikis.
 *
 * Until 2026-11-23 the game sat in the same wiki as the six Marketplace apps,
 * filtered out of the hub's app grid and still in every app page's sidebar. A
 * player reading about a delve had Jira permission settings one click away, and
 * an administrator reading OnBudget's security policy had a game in the rail.
 * The game's pages now belong to the Game Studio, at /studio/wiki/, and share
 * nothing with the apps wiki except the layout and the content collection.
 */
export type DocSection = 'apps' | 'studio';

export const SECTIONS: Record<
  DocSection,
  {
    /** Where the section's hub lives, and the prefix of every page in it. */
    base: string;
    /** The sidebar's heading and its mobile toggle. */
    label: string;
    /** The first link in the sidebar, back to the section's hub. */
    homeLabel: string;
    /** Crumbs that sit above the group in every trail. */
    crumbs: { name: string; path: string }[];
  }
> = {
  apps: {
    base: '/documentation/',
    label: 'Wiki',
    homeLabel: 'All documentation',
    crumbs: [{ name: 'Wiki', path: '/documentation/' }],
  },
  studio: {
    base: '/studio/wiki/',
    label: 'Studio wiki',
    homeLabel: 'All game guides',
    crumbs: [
      { name: 'Game Studio', path: '/studio/' },
      { name: 'Wiki', path: '/studio/wiki/' },
    ],
  },
};

const GROUPS: {
  app: string;
  label: string;
  blurb: string;
  indexDescription?: string;
  section?: DocSection;
  /** Games only: where the game is played, for the call to action on its pages. */
  playUrl?: string;
}[] = [
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
    app: 'kindelve',
    label: 'Kindelve',
    blurb: 'Creature-collection dungeon descent, from Numeric Oasis Game Studio.',
    // A game is not an app, so the per-group index cannot describe itself as
    // "setup, features and policies" the way the six Marketplace apps do.
    indexDescription:
      'How Kindelve works, in full: the descent, the Kin you send into it, builds, the daily Trial, and what the game stores.',
    section: 'studio',
    playUrl: 'https://play.kindelve.com',
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
  /** Overrides the app-shaped default on the group's index page. */
  indexDescription?: string;
  section?: DocSection;
  playUrl?: string;
  pages: DocEntry[];
};

/** The wiki a group belongs to. Everything that is not a game is in the apps wiki. */
export const sectionOf = (app: string): DocSection =>
  GROUPS.find((g) => g.app === app)?.section ?? 'apps';

/** The slug a docs entry is published at, without its section's prefix. */
export const docSlug = (entry: DocEntry): string => entry.id.replace(/\.mdx?$/, '');

export const docHref = (entry: DocEntry): string =>
  `${SECTIONS[sectionOf(entry.data.app)].base}${docSlug(entry)}/`;

/** A group's own index page, in whichever wiki it belongs to. */
export const groupHref = (app: string): string => `${SECTIONS[sectionOf(app)].base}${app}/`;

/**
 * Every published group of one wiki, in display order, each with its pages
 * sorted.
 *
 * Drafts are dropped here rather than at each call site, so an unpublished app
 * cannot leak into the sidebar of a published one by being forgotten. The
 * section filter is here for the same reason: a game cannot reach the apps
 * wiki's sidebar, or an app the studio's, by a page forgetting to filter.
 */
export async function docGroups(section: DocSection = 'apps'): Promise<DocGroup[]> {
  const all = await getCollection('docs', ({ data }) => !data.draft);

  return GROUPS.filter((group) => (group.section ?? 'apps') === section).map((group) => ({
    ...group,
    pages: all
      .filter((entry) => entry.data.app === group.app)
      .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title)),
  })).filter((group) => group.pages.length > 0);
}

/**
 * Flattened reading order.
 *
 * Kept for building the route list, but NOT for prev and next. Walking it
 * across products meant six of twenty edges left the app: OnBudget's security
 * policy led to Astrolink, and Atelier has one page so both of its arrows
 * pointed at other products. Neighbours now come from within the group, and a
 * boundary is a link to the group index instead.
 */
export const docOrder = (groups: DocGroup[]): DocEntry[] => groups.flatMap((g) => g.pages);

/** The previous and next page inside the entry's own group. */
export function neighbours(groups: DocGroup[], entry: DocEntry) {
  const group = groups.find((g) => g.app === entry.data.app);
  const i = group?.pages.findIndex((p) => p.id === entry.id) ?? -1;
  return { prev: i > 0 ? group?.pages[i - 1] : undefined, next: i >= 0 ? group?.pages[i + 1] : undefined };
}

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
