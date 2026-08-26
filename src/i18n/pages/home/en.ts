export const en = {
  meta: {
    title: 'Numeric Oasis Technologies',
    description:
      'Numeric Oasis is a partner in the Atlassian Marketplace, building Forge apps for Jira and Confluence Cloud. Right now most of our attention goes to OnBudget, which turns work already tracked in Jira into budgets, forecasts and cost reports.',
  },
  hero: {
    eyebrow: 'Partner in the Atlassian Marketplace',
    headline: 'The Atlassian apps we kept wishing existed.',
    lede: 'Fifteen years inside Jira and Confluence taught us where the gaps are, mostly by watching teams work around the same ones over and over. Now we build the apps that close them, and every one runs inside Atlassian rather than beside it.',
    primary: 'See what we make',
    secondary: 'How we work',
    iconsLabel: 'Our apps',
  },
  proof: {
    label: 'How our apps are built',
    items: [
      'Runs on Atlassian',
      'Built on Forge',
      'Cloud only',
      'Read-only where we can be',
      'Jira and Confluence',
      'Support in three languages',
    ],
  },
  focus: {
    eyebrow: 'Where our attention is right now',
    headline: 'Jira knows what happened. It does not know what it cost.',
    body: 'Delivery data lives in Jira. Money lives in a spreadsheet someone exports on Friday and that is wrong by Monday. Worse, the teams that never adopted story points or timesheets do not show up in that spreadsheet at all.',
    body2: 'OnBudget is the app we are pushing hardest at the moment, because it is the one we think solves the biggest problem. It turns work your team already tracks into budgets, forecasts and cost reports, without asking anyone to fill in a new field.',
    link: 'See what OnBudget does',
  },
  portfolio: {
    eyebrow: 'The apps',
    headline: 'Apps for Jira and Confluence Cloud.',
    lede: 'Each one closes a gap the host product leaves open. More are on the way.',
  },
  how: {
    eyebrow: 'How we work',
    headline: 'Forge only, and that is a deliberate constraint.',
    paragraphs: [
      'Every app we publish runs on Atlassian Forge, which means it executes inside Atlassian infrastructure rather than on a server of ours. There is no third party for your security team to review, no data egress to document, and no separate uptime to worry about.',
      'It also means we ask for the narrowest permissions that will do the job. Most of our apps only ever read. The ones that write say exactly what they write and why, on their own pages, because a blanket privacy claim that is false for one app is worse than no claim at all.',
      'We are a partner in the Atlassian Marketplace, working from Canoas in southern Brazil, and we answer support in English, Portuguese and Spanish.',
    ],
    link: 'More about the team',
  },
  blog: {
    eyebrow: 'From the blog',
    headline: 'Notes from the workshop.',
    link: 'All posts',
  },
  cta: {
    headline: 'Install from the Marketplace, or ask a question first.',
    body: 'Every paid app has a free trial, and the free one has no trial to bother with. If you would rather talk to a person before installing anything, that works too.',
    primary: 'See what we make',
    secondary: 'Ask us a question',
  },
} as const;

export type HomeCopy = import('../../shape').Shape<typeof en>;
