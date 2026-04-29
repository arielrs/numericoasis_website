export const SITE = {
  name: 'Numeric Oasis',
  url: 'https://numericoasis.com',
  tagline: 'Atlassian Marketplace Partner & SaaS Custom Solutions',
  description:
    'Numeric Oasis is a software house and consulting company. Fifteen years of building custom software, shipping Atlassian Forge apps, advising on business and IT processes, and supporting the teams who run it all.',
  email: 'contact@numericoasis.com',
  location: 'Canoas, RS, Brasil',
  marketplaceUrl: 'https://marketplace.atlassian.com/vendors/1064627585/numeric-oasis',
  twitter: '',
  linkedin: 'https://www.linkedin.com/company/numeric-oasis/',
} as const;

export const NAV_LINKS = [
  { href: '/services/', label: 'Services' },
  { href: '/apps/', label: 'Apps' },
  { href: '/blog/', label: 'Blog' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
] as const;

export const PRODUCT_LABELS: Record<string, string> = {
  jira: 'Jira',
  confluence: 'Confluence',
  bitbucket: 'Bitbucket',
  jsm: 'JSM',
};
