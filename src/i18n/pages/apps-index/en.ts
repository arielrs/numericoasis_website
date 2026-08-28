export const en = {
  meta: {
    title: 'All our apps for Jira and Confluence',
    crumb: 'Apps',
    metaDescription:
      'Our Atlassian Marketplace apps for Jira and Confluence Cloud. Know what your work costs, keep Confluence governable, and keep Jira configuration clean.',
    description:
      'Atlassian Marketplace apps from Numeric Oasis, built on Forge for Jira and Confluence Cloud. Budget tracking, Confluence governance, dependency mapping, configuration auditing and custom field cleanup.',
  },
  eyebrow: 'Atlassian Marketplace',
  headline: 'Apps for Jira and Confluence Cloud.',
  lede: 'Every one runs on Forge inside your own Atlassian site, so your data stays where it already is, there is no vendor server for security to sign off, and updates arrive without a maintenance window.',
  groups: {
    jira: 'For Jira',
    confluence: 'For Confluence',
  },
  cta: {
    headline: 'Tell us the problem. We will point you at the app.',
    body: 'Every paid app has a free trial on the Atlassian Marketplace, and the free one starts working the moment you install it. If you would rather describe what you are trying to fix first, tell us and we will point you at the one that does it.',
    primary: 'Ask us a question',
    secondary: 'See all our listings',
  },
  builtFor: 'Built for',
  readMore: 'Read more',
} as const;

export type AppsIndexCopy = import('../../shape').Shape<typeof en>;
