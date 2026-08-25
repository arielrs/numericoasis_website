export const en = {
  meta: {
    title: 'Apps',
    crumb: 'Apps',
    description:
      'Six Atlassian Marketplace apps from Numeric Oasis, built on Forge for Jira and Confluence Cloud. Budget tracking, Confluence governance, dependency mapping, configuration auditing and custom field cleanup.',
  },
  eyebrow: 'Atlassian Marketplace',
  headline: 'Six apps for Jira and Confluence Cloud.',
  lede: 'Every one is built on Forge, so it runs inside Atlassian rather than beside it. Your data stays in your tenancy, there is no third party to vet, and updates ship without a maintenance window.',
  groups: {
    jira: 'For Jira',
    confluence: 'For Confluence',
  },
  flagshipBadge: 'Flagship',
  builtFor: 'Built for',
  readMore: 'Read more',
} as const;

export type AppsIndexCopy = import('../../shape').Shape<typeof en>;
