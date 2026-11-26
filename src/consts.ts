export const SITE = {
  name: 'Numeric Oasis Technologies',
  /**
   * The brand token used in <title>. The legal name is 26 characters, and with
   * the separator it left 30 of a 60 character budget for the part that
   * actually describes the page. The full name stays on the Organization node,
   * the footer and the copyright line.
   */
  shortName: 'Numeric Oasis',
  url: 'https://numericoasis.com',
  tagline: 'Apps for Jira and Confluence Cloud, plus custom software, Atlassian consulting and a game studio.',
  /**
   * The canonical English description, used by /llms.txt and as a last-resort
   * meta description. The Organization and WebSite nodes take the localised
   * `site.description` from the dictionaries instead.
   *
   * Apps first since 2026-11-25: the site leads with the Marketplace apps, and
   * custom development, Atlassian consulting and the Game Studio follow. From
   * 2026-11-06 to then it led with those three fronts as equals.
   */
  description:
    'Numeric Oasis makes Atlassian Marketplace apps for Jira and Confluence Cloud: budget tracking, a dependency map, a configuration audit log, page design and read sign-off. It also builds custom software, offers Atlassian consulting and runs a game studio, from Canoas, Brazil, since 2011.',
  email: 'contact@numericoasis.com',
  supportUrl: 'https://numericoasis.atlassian.net/servicedesk/customer/portal/39',
  /**
   * Players, not Marketplace customers. The games desk is its own portal so a
   * bug in Kindelve does not land in the same queue as a Forge app incident,
   * and it asks which game the request is about on every form.
   */
  gameSupportUrl: 'https://numericoasis.atlassian.net/servicedesk/customer/portal/105',
  marketplaceUrl: 'https://marketplace.atlassian.com/vendors/1064627585/numeric-oasis',
  twitter: '',
  linkedin: 'https://www.linkedin.com/company/numeric-oasis/',
} as const;

/**
 * Apps first, then what helps an admin use them, then the rest of the company.
 *
 * Since 2026-11-25 the site leads with the Marketplace apps, so the nav does
 * too: Apps, Guides (the blog, under the name of what it holds), Docs, and only
 * then custom development, Atlassian consulting (the /atlassian/ page) and the
 * Game Studio. Every item is top level, with no dropdown to hide one in.
 */
export const NAV_LINKS = [
  { href: '/apps/', labelKey: 'apps' },
  { href: '/blog/', labelKey: 'guides' },
  // Not locale prefixed: the documentation is published in English only.
  { href: '/documentation/', labelKey: 'docs', absolute: true },
  { href: '/custom-development/', labelKey: 'customDev' },
  { href: '/atlassian/', labelKey: 'consulting' },
  { href: '/studio/', labelKey: 'studio' },
  { href: '/about/', labelKey: 'about' },
] as const;

/**
 * The header call to action. Pages selling one thing override it, and so does
 * /apps/ itself, where this would be a link to the page already open. See
 * Nav.astro.
 */
export const NAV_CTA = { href: '/apps/', labelKey: 'browseApps' } as const;

export const PRODUCT_LABELS: Record<string, string> = {
  jira: 'Jira',
  confluence: 'Confluence',
  bitbucket: 'Bitbucket',
  jsm: 'Jira Service Management',
};

export const ORG_DETAILS = {
  foundingYear: 2011,
  foundingDate: '2011-01-01',
  slogan: 'Small, finished software, on three fronts.',
  serviceArea: ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'],
  /**
   * What the organisation is an authority on. Every entry maps to a shipped app,
   * a service on /custom-development/ or /atlassian/, or the Game Studio.
   */
  knowsAbout: [
    'Custom software development',
    'Web application development',
    'System integration',
    'Internal tools',
    'Atlassian consulting',
    'Jira Data Center to Cloud migration',
    'Confluence Data Center to Cloud migration',
    'ScriptRunner for Jira Cloud',
    'Atlassian license management',
    'Game development',
    'Browser games',
    'Deterministic game simulation',
    'Video game industry',
    'Publishing games on Steam',
    'Atlassian Marketplace',
    'Atlassian Forge',
    'Forge app development',
    'Jira',
    'Jira Cloud',
    'Jira Service Management',
    'Confluence',
    'Confluence Cloud',
    'Project budget management',
    'Project cost tracking',
    'Budget versus actual reporting',
    'Cost forecasting',
    'Rate cards',
    'PMO reporting',
    'Confluence content governance',
    'Document classification',
    'Policy acknowledgement and sign-off',
    'Knowledge base navigation',
    'Work item dependency mapping',
    'Jira project configuration auditing',
    'Jira custom field administration',
    'Atlassian Cloud governance',
    // The administration topics the blog covers in depth since 2026-11-23,
    // each one part of the consulting on /atlassian/.
    'Atlassian Rovo',
    'Atlassian Guard',
    'Jira automation',
    'JQL',
    'Jira workflows',
    'Jira Service Management SLAs',
    'Confluence permissions',
    'Atlassian Cloud sandboxes',
  ],
} as const;

/**
 * Cloudflare Web Analytics site token. Public by design: it identifies the site
 * being measured, not an account. Cookieless, so no consent banner is required.
 * Leave empty to ship no analytics at all.
 */
export const CLOUDFLARE_ANALYTICS_TOKEN = '09bc00fc0b37489693bcfd821bde013c';

/**
 * Google tag ids, for advertising measurement.
 *
 * EMPTY SHIPS NOTHING. With no measurementId, src/components/ConsentGate.astro
 * renders no script, no banner and no cookie, and the site stays exactly as
 * cookieless as it was. Filling these in activates the tag, the consent banner
 * and the outbound-click conversion together, which is deliberate: Google
 * requires the privacy disclosure to be live before the tag is, and /privacy/
 * already is.
 *
 * - measurementId:      the GA4 property, "G-XXXXXXXXXX"
 * - adsConversionId:    the Google Ads account, "AW-XXXXXXXXX"
 * - adsConversionLabel: the conversion action's label, from Google Ads
 *
 * The conversion these measure is an outbound click to the Atlassian
 * Marketplace, not an install. Nothing we run can observe an install, because
 * it happens on a domain we do not control. See ConsentGate.astro.
 */
export const GOOGLE_TAG = {
  measurementId: 'G-B57RCD9930',
  adsConversionId: '',
  adsConversionLabel: '',
} as const;
