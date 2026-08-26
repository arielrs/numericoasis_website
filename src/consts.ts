export const SITE = {
  name: 'Numeric Oasis Technologies',
  url: 'https://numericoasis.com',
  tagline: 'Atlassian Marketplace Partner. Forge apps for Jira and Confluence Cloud.',
  /**
   * The canonical English description, used for the Organization node and as a
   * last-resort meta description. Localised copy lives in the dictionaries.
   */
  description:
    'Numeric Oasis is a partner in the Atlassian Marketplace. We build Forge apps for Jira and Confluence Cloud: budget and cost reporting, Confluence governance and compliance, work item dependency mapping, project configuration auditing, and custom field cleanup.',
  email: 'contact@numericoasis.com',
  location: 'Canoas, RS, Brasil',
  supportUrl: 'https://numericoasis.atlassian.net/servicedesk/customer/portal/39',
  marketplaceUrl: 'https://marketplace.atlassian.com/vendors/1064627585/numeric-oasis',
  twitter: '',
  linkedin: 'https://www.linkedin.com/company/numeric-oasis/',
} as const;

export const NAV_LINKS = [
  { href: '/apps/', labelKey: 'apps' },
  { href: '/blog/', labelKey: 'blog' },
  { href: '/about/', labelKey: 'about' },
  { href: '/contact/', labelKey: 'contact' },
] as const;

/**
 * The header call to action. It points at the range rather than at a single app
 * or at a contact form: the verb carries the invitation, and it does not need
 * rewriting every time the app we are pushing changes.
 */
export const NAV_CTA = { href: '/apps/', labelKey: 'tryApps' } as const;

export const PRODUCT_LABELS: Record<string, string> = {
  jira: 'Jira',
  confluence: 'Confluence',
  bitbucket: 'Bitbucket',
  jsm: 'Jira Service Management',
};

export const ORG_DETAILS = {
  foundingYear: 2011,
  foundingDate: '2011-01-01',
  slogan: 'Apps that run inside Atlassian, not beside it.',
  serviceArea: ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'],
  /** What the organisation is an authority on. Every entry maps to a shipped app. */
  knowsAbout: [
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
