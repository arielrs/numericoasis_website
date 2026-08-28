export const en = {
  meta: {
    crumb: 'Blog',
    title: 'Jira cost, admin and governance notes',
    metaDescription:
      'Notes on Atlassian cost visibility, Confluence governance and Jira configuration health, from the team that builds Atlassian Marketplace apps.',
    description:
      'Notes on Atlassian cost visibility, Confluence governance and Jira configuration health, from the team that builds Atlassian Marketplace apps.',
  },
  index: {
    eyebrow: 'From the workshop',
    headline: 'Notes from the workshop.',
    lede: 'What we learn building Forge apps, and what we keep having to explain twice. Mostly about knowing what your Atlassian work costs, keeping Confluence governable, and keeping Jira configuration from quietly rotting.',
    empty: 'Nothing published yet.',
    allTags: 'All posts',
    tagsLabel: 'Browse by topic',
  },
  tagPage: {
    eyebrow: 'Topic',
    headlinePrefix: 'Posts tagged',
    metaDescription: (label: string) =>
      `Every post tagged ${label}. Notes from the team that builds Atlassian Marketplace apps for Jira and Confluence Cloud.`,
    backToBlog: 'All posts',
    empty: 'Nothing published on this topic yet.',
  },
  post: {
    backToBlog: 'All posts',
    updated: 'Updated',
    readingTime: (minutes: number) => `${minutes} min read`,
    by: 'By',
    share: 'Share',
    shareOnLinkedIn: 'Share on LinkedIn',
    shareByEmail: 'Share by email',
    previous: 'Previous',
    next: 'Next',
    related: 'Related reading',
    cta: {
      onbudget: {
        headline: 'Want this without the spreadsheet?',
        body: 'OnBudget turns the work your team already tracks in Jira into budgets, forecasts and cost reports. No new custom fields, and nothing in your Jira changes.',
        primary: 'See what OnBudget does',
        secondary: 'Ask us a question',
      },
      general: {
        headline: 'We build Atlassian Marketplace apps.',
        body: 'Forge apps for Jira and Confluence Cloud that run inside your own Atlassian site. Your data stays where it already is, and there is no vendor server for security to sign off.',
        primary: 'See our apps',
        secondary: 'Ask us a question',
      },
    },
  },
  pagination: {
    label: 'Pagination',
    previous: 'Newer posts',
    next: 'Older posts',
    page: (current: number, total: number) => `Page ${current} of ${total}`,
  },
  tags: {
    onbudget: 'OnBudget',
    'jira-cost-management': 'Jira cost management',
    'confluence-governance': 'Confluence governance',
    'jira-administration': 'Jira administration',
    forge: 'Forge',
    marketplace: 'Atlassian Marketplace',
    'atlassian-cloud': 'Atlassian Cloud',
    'how-to': 'How to',
    'product-updates': 'Product updates',
  },
} as const;

export type BlogCopy = import('../../shape').Shape<typeof en>;
