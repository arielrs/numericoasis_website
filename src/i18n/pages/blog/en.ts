export const en = {
  meta: {
    crumb: 'Blog',
    title: 'Notes on software, Atlassian and games',
    metaDescription:
      'Notes on custom software, Jira and Confluence work, Forge apps and building a browser game, from the team at Numeric Oasis.',
    description:
      'Notes on custom software, Jira and Confluence migrations and administration, Forge apps, and building a browser game, from the team at Numeric Oasis.',
  },
  index: {
    eyebrow: 'From the workshop',
    headline: 'Notes from the workshop.',
    lede: 'What we learn building software on three fronts: custom applications, Jira and Confluence work and Forge apps, and a game of our own. Mostly the decisions that are expensive to get wrong, written down so we stop explaining them twice.',
    empty: 'Nothing published yet.',
    allTags: 'All posts',
    tagsLabel: 'Browse by topic',
  },
  tagPage: {
    eyebrow: 'Topic',
    headlinePrefix: 'Posts tagged',
    metaDescription: (label: string) =>
      `Every post tagged ${label}. Notes from Numeric Oasis on custom software, Atlassian work and game development.`,
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
        body: 'OnBudget turns the work your team already tracks in Jira into budgets, forecasts and cost reports. It works with the fields your team already fills in, and it reads your Jira rather than editing it.',
        primary: 'See what OnBudget does',
        secondary: 'Ask us a question',
      },
      general: {
        headline: 'We build Atlassian Marketplace apps.',
        body: 'Forge apps for Jira and Confluence Cloud that run inside your own Atlassian environment. Your data stays where it already is, and your security review covers one platform you have already approved.',
        primary: 'See our apps',
        secondary: 'Ask us a question',
      },
      customDev: {
        headline: 'Have a twenty percent of your own?',
        body: 'We build the web applications, integrations and internal tools that close the gap the product you bought left open. Small releases, tested and documented, in three languages.',
        primary: 'Custom development',
        secondary: 'Ask us a question',
      },
      consulting: {
        headline: 'Planning a move, or cleaning up after one?',
        body: 'We assess Data Center to Cloud migrations, size the ScriptRunner rewrite, move teams off other tools, and clean up what a migration leaves behind. You talk to the people who do the work.',
        primary: 'Atlassian services',
        secondary: 'Ask us a question',
      },
      studio: {
        headline: 'Made by our Game Studio.',
        body: 'Kindelve is a creature-collection dungeon descent that runs in any browser, free, in five languages. The studio page has the game, how it is built, and what comes next.',
        primary: 'The Game Studio',
        secondary: 'Talk to the studio',
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
    'custom-development': 'Custom development',
    'atlassian-consulting': 'Atlassian consulting',
    'cloud-migration': 'Cloud migration',
    'game-development': 'Game development',
  },
} as const;

export type BlogCopy = import('../../shape').Shape<typeof en>;
