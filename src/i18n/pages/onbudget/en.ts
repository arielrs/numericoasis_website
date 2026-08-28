export const en = {
  meta: {
    crumb: 'OnBudget',
    title: 'OnBudget: budget and cost reports for Jira',
  },
  hero: {
    eyebrow: 'Atlassian Marketplace app for Jira Cloud',
    headline: 'Budget and cost reporting for Jira, built for finance and PMO.',
    lede: 'OnBudget turns the work your team already tracks in Jira into money. It samples your data first and tells you what share of your work items carries each costing signal, so you find out your worklog coverage is thin before you build a budget on top of it.',
    ctaSecondary: 'See how a report is built',
  },
  problem: { eyebrow: 'The gap' },
  steps: {
    eyebrow: 'How it works',
    headline: 'Four steps from a Jira space to a budget you can defend.',
  },
  methods: {
    eyebrow: 'Costing',
    headline: 'Pick the signal your team already has.',
    lede: 'The hard part of costing Jira work is not the arithmetic. It is that every team measures something different, and half of them measure nothing at all. OnBudget samples your data and shows you what share of your work items carries each signal, before you build anything on top of it.',
  },
  dashboard: {
    eyebrow: 'Dashboards',
    headline: 'The dashboard is yours to rearrange.',
    lede: 'Nine gadget types, each with its own chart formats. Drag one to a new slot, resize it from the corner, clone it, remove it, or switch it between bar, line, area, pie, donut, table and plain number. Save the layout when it reads the way you think.',
  },
  sharing: {
    eyebrow: 'Sharing',
    headline: 'A shared report respects the reader, not the author.',
    body: 'Most reporting tools hand out a snapshot of what the author could see. OnBudget does not. When someone opens a report you shared with them, it is regenerated under their own Jira permissions, so nobody sees work items they could not already open in Jira. If a viewer lacks access to part of the scope, the report says so rather than quietly showing a smaller number.',
  },
  scale: {
    eyebrow: 'At scale',
    headline: 'Built for the hundredth report, not the first.',
    lede: 'A budgeting tool is easy to like with three reports open and hard to live with at fifty. This is what the app gives you once a portfolio has grown.',
  },
  security: {
    eyebrow: 'Security and data',
    headline: 'Read only, and it stays inside Atlassian.',
    scopes: 'Requested permissions',
  },
  languages: {
    eyebrow: 'Languages',
    headline: 'It speaks the language your team reports in.',
    body: 'The whole interface is available in English, Portuguese and Spanish, and each report carries its own currency, number format and date format. A budget in reais reads like a budget in reais, not like a US spreadsheet with the wrong separators.',
  },
  faq: {
    eyebrow: 'Questions',
    headline: 'Things people ask before they install it.',
  },
  cta: {
    headline: 'Install it, or ask a question first.',
    body: 'It is on the Atlassian Marketplace with a free trial, and the current pricing lives there. If you would rather talk it through, we answer in English, Portuguese and Spanish.',
    primary: 'Install from the Atlassian Marketplace',
    secondary: 'Ask us a question',
  },
  alsoSee: {
    eyebrow: 'Our other apps',
    headline: 'The rest of what we make.',
    link: 'See all our apps',
  },
} as const;

export type OnBudgetCopy = import('../../shape').Shape<typeof en>;
