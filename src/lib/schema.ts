/**
 * One JSON-LD `@graph` per page.
 *
 * The site previously emitted a standalone Organization node on every page (66
 * of them across the build), plus a second, disconnected Organization inside
 * each SoftwareApplication and BlogPosting. Nothing tied them together, no
 * WebSite node existed even though three pages referenced `#website` as their
 * `isPartOf`, and there were no breadcrumbs anywhere.
 *
 * Now every page emits a single graph whose nodes reference each other by
 * `@id`, so a crawler resolves one organisation, one website, and one page
 * entity rather than a pile of look-alikes.
 */
import { SITE, ORG_DETAILS } from '../consts';
import { BCP47_MAP, withLocale, type Locale } from '../i18n';

export type JsonLdNode = Record<string, unknown> & {
  '@type': string | string[];
  '@id'?: string;
};

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const LOGO_ID = `${SITE.url}/#logo`;

export interface Crumb {
  /** Localised label. */
  name: string;
  /** Bare, slash-terminated path such as `/apps/astrolink/`. Localised here. */
  path: string;
}

export interface OgImage {
  url: string;
  width: number;
  height: number;
}

export interface GraphInput {
  lang: Locale;
  /** Absolute canonical URL, already locale-prefixed. */
  canonical: string;
  name: string;
  description: string;
  image?: OgImage;
  /** Home is prepended automatically; pass the rest in order. */
  breadcrumbs?: Crumb[];
  /** Nodes this page owns: SoftwareApplication, BlogPosting, ItemList, FAQPage. */
  extraNodes?: JsonLdNode[];
  /** `@id` of the node that is this page's subject. Wires WebPage.mainEntity. */
  primaryEntityId?: string;
  /** WebPage subtype, e.g. 'AboutPage', 'ContactPage', 'CollectionPage'. */
  pageType?: string;
  /** Localised label for the breadcrumb root. */
  homeLabel: string;
}

function organizationNode(): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: `${SITE.url}/png_logo_main.png`,
      width: 442,
      height: 468,
      caption: SITE.name,
    },
    image: { '@id': LOGO_ID },
    description: SITE.description,
    slogan: ORG_DETAILS.slogan,
    email: SITE.email,
    foundingDate: ORG_DETAILS.foundingDate,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Canoas',
      addressRegion: 'RS',
      addressCountry: 'BR',
    },
    areaServed: ORG_DETAILS.serviceArea.map((name) => ({ '@type': 'Place', name })),
    knowsAbout: ORG_DETAILS.knowsAbout,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE.email,
        availableLanguage: ['English', 'Portuguese', 'Spanish'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        url: SITE.supportUrl,
        availableLanguage: ['English', 'Portuguese', 'Spanish'],
      },
    ],
    sameAs: [SITE.marketplaceUrl, SITE.linkedin].filter(Boolean),
  };
}

function webSiteNode(lang: Locale): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': ORG_ID },
    inLanguage: BCP47_MAP[lang],
  };
}

function breadcrumbNode(canonical: string, lang: Locale, crumbs: Crumb[], homeLabel: string): JsonLdNode {
  const all = [{ name: homeLabel, path: '/' }, ...crumbs];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: all.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: new URL(withLocale(lang, crumb.path), SITE.url).toString(),
    })),
  };
}

export function buildGraph(input: GraphInput) {
  const {
    lang,
    canonical,
    name,
    description,
    image,
    breadcrumbs = [],
    extraNodes = [],
    primaryEntityId,
    pageType,
    homeLabel,
  } = input;

  const hasCrumbs = breadcrumbs.length > 0;

  const webPage: JsonLdNode = {
    '@type': pageType ? ['WebPage', pageType] : 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: BCP47_MAP[lang],
    ...(image && {
      primaryImageOfPage: {
        '@type': 'ImageObject',
        '@id': `${canonical}#primaryimage`,
        url: image.url,
        width: image.width,
        height: image.height,
      },
    }),
    ...(hasCrumbs && { breadcrumb: { '@id': `${canonical}#breadcrumb` } }),
    ...(primaryEntityId && { mainEntity: { '@id': primaryEntityId } }),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      webSiteNode(lang),
      webPage,
      ...(hasCrumbs ? [breadcrumbNode(canonical, lang, breadcrumbs, homeLabel)] : []),
      ...extraNodes,
    ],
  };
}
