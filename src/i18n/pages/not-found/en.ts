export const en = {
  title: 'Page not found',
  description: 'That page does not exist on Numeric Oasis.',
  eyebrow: '404',
  headline: "We couldn't find that page.",
  body: 'The link may be old, or we may have moved things around. Try the homepage, or one of the sections below.',
  home: 'Back to home',
  apps: 'Browse the apps',
  blog: 'Read the blog',
} as const;

/** The structural contract the other locales must satisfy. */
export type NotFoundCopy = import('../../shape').Shape<typeof en>;
