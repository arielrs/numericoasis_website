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
  tagline: 'Custom software, Atlassian consulting and Forge apps, and a game studio.',
  /**
   * The canonical English description, used for the Organization node and as a
   * last-resort meta description. Localised copy lives in the dictionaries.
   *
   * Three fronts since 2026-11-06: custom development, Atlassian (consulting,
   * Marketplace apps and custom Forge apps), and the Game Studio.
   */
  description:
    'Numeric Oasis builds custom software, migrates and runs Jira and Confluence, publishes Forge apps on the Atlassian Marketplace, and runs a game studio. From Canoas, Brazil, since 2011.',
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
 * The three fronts lead, in the order the home page presents them. Contact
 * left the list for the call to action, which now carries it: with three
 * fronts there is no single range to point the button at, and a conversation
 * is the next step for all of them.
 */
export const NAV_LINKS = [
  { href: '/custom-development/', labelKey: 'customDev' },
  { href: '/atlassian/', labelKey: 'atlassian' },
  // Localised like the rest of the marketing pages, unlike /documentation/,
  // which exists in English only.
  { href: '/studio/', labelKey: 'studio' },
  { href: '/blog/', labelKey: 'blog' },
  { href: '/documentation/', labelKey: 'docs', absolute: true },
  { href: '/about/', labelKey: 'about' },
] as const;

/** The header call to action. Pages selling one thing override it. See Nav.astro. */
export const NAV_CTA = { href: '/contact/', labelKey: 'talkToUs' } as const;

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
