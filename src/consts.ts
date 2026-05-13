export const SITE = {
  name: 'Numeric Oasis Technologies',
  url: 'https://numericoasis.com',
  tagline: 'Atlassian Marketplace Partner & SaaS Custom Solutions',
  description:
    'Numeric Oasis is a software house and consulting company. Fifteen years of building custom software for teams worldwide (SaaS, in-house tools, mobile apps, and integrations), shipping Atlassian Forge apps on the Marketplace, advising on business and IT processes, and supporting the teams who run it all.',
  email: 'contact@numericoasis.com',
  location: 'Canoas, RS, Brasil',
  marketplaceUrl: 'https://marketplace.atlassian.com/vendors/1064627585/numeric-oasis',
  twitter: '',
  linkedin: 'https://www.linkedin.com/company/numeric-oasis/',
} as const;

export const NAV_LINKS = [
  { href: '/services/', labelKey: 'services' },
  { href: '/apps/', labelKey: 'apps' },
  { href: '/blog/', labelKey: 'blog' },
  { href: '/about/', labelKey: 'about' },
  { href: '/contact/', labelKey: 'contact' },
] as const;

export const PRODUCT_LABELS: Record<string, string> = {
  jira: 'Jira',
  confluence: 'Confluence',
  bitbucket: 'Bitbucket',
  jsm: 'JSM',
};

export const ORG_DETAILS = {
  foundingYear: 2011,
  foundingDate: '2011-01-01',
  slogan: 'Build, advise, and run. Across software, Atlassian, and operations.',
  serviceArea: ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'],
  knowsAbout: [
    'Atlassian Marketplace',
    'Atlassian Forge',
    'Forge app development',
    'Jira',
    'Jira Service Management',
    'Confluence',
    'Bitbucket',
    'Atlassian Cloud migration',
    'Atlassian platform consulting',
    'Custom software development',
    'SaaS development',
    'TypeScript',
    'Node.js',
    'React',
    'Web application development',
    'Mobile application development',
    'IT service management',
    'ITSM',
    'ITIL',
    'Business process consulting',
    'IT governance',
    'Process design',
    'Managed services',
    'Customer support',
    'Software consulting',
  ],
} as const;
