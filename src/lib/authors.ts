/**
 * Blog authorship.
 *
 * Posts were previously attributed to a Person named "Numeric Oasis Team",
 * which is the wrong schema.org type: a team is an Organization. Until named
 * humans are added here, the byline resolves to the organisation, which is both
 * correct and honest.
 *
 * Adding a person later is a data change, not a rebuild: add an entry, widen
 * AUTHOR_IDS in content.config.ts, and the Person node, the byline and the
 * /about/ anchor all follow.
 */
import { SITE } from '../consts';
import { withLocale, type Locale } from '../i18n';
import { ORG_ID, type JsonLdNode } from './schema';

type Author =
  | { kind: 'org' }
  | {
      kind: 'person';
      name: string;
      jobTitle: string;
      /** Anchor on /about/ that describes them. Must actually exist there. */
      anchor: string;
      sameAs: string[];
    };

export const AUTHORS: Record<string, Author> = {
  team: { kind: 'org' },
};

export function authorFor(id: string, lang: Locale): {
  displayName: string;
  ref: { '@id': string };
  nodes: JsonLdNode[];
} {
  const author = AUTHORS[id] ?? AUTHORS.team;

  if (author.kind === 'org') {
    return { displayName: SITE.name, ref: { '@id': ORG_ID }, nodes: [] };
  }

  const personId = `${SITE.url}/#person-${author.anchor}`;
  return {
    displayName: author.name,
    ref: { '@id': personId },
    nodes: [
      {
        '@type': 'Person',
        '@id': personId,
        name: author.name,
        jobTitle: author.jobTitle,
        url: new URL(withLocale(lang, `/about/#${author.anchor}`), SITE.url).toString(),
        sameAs: author.sameAs,
        worksFor: { '@id': ORG_ID },
      },
    ],
  };
}
