export const en = {
  meta: {
    title: 'All our apps for Jira and Confluence',
    crumb: 'Apps',
    metaDescription:
      'Our Atlassian Marketplace apps, built on Forge for Jira and Confluence Cloud: cost and budget reporting, governance, and everyday site administration.',
    description:
      'Atlassian Marketplace apps from Numeric Oasis, built on Forge for Jira and Confluence Cloud. Budget tracking, Confluence governance, dependency mapping, configuration auditing and custom field cleanup.',
  },
  eyebrow: 'Atlassian Marketplace',
  headline: 'Apps for Jira and Confluence Cloud.',
  lede: 'Every one is built on Forge, so it runs inside Atlassian rather than beside it. Your data stays in your tenancy, there is no third party to vet, and updates ship without a maintenance window.',
  groups: {
    jira: 'For Jira',
    confluence: 'For Confluence',
  },
  cta: {
    headline: 'Not sure which one you need?',
    body: 'Every paid app has a free trial on the Atlassian Marketplace, and the free one has nothing to sign up for. If you would rather describe the problem first, tell us and we will point you at the app that fits, or tell you that none of ours do.',
    primary: 'Ask us a question',
    secondary: 'See all our listings',
  },
  builtFor: 'Built for',
  readMore: 'Read more',
} as const;

export type AppsIndexCopy = import('../../shape').Shape<typeof en>;
