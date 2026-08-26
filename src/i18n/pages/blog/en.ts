export const en = {
  meta: {
    crumb: 'Blog',
    title: 'Blog',
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
