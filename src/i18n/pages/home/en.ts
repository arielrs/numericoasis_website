export const en = {
  meta: {
    title: 'Forge apps for Jira and Confluence Cloud',
    metaDescription:
      'Atlassian Marketplace partner building apps for Jira and Confluence Cloud. Track every Jira budget on one screen with OnBudget, our cost reporting app.',
    description:
      'Numeric Oasis is a partner in the Atlassian Marketplace, building Forge apps for Jira and Confluence Cloud. OnBudget turns work already tracked in Jira into budgets, forecasts and cost reports, and every app we ship runs inside your own Atlassian environment.',
  },
  hero: {
    eyebrow: 'Partner in the Atlassian Marketplace',
    headline: 'The Jira and Confluence apps we kept wishing existed.',
    lede: 'Fifteen years inside Jira and Confluence taught us what teams keep having to work around. Now we build the apps that do that work for them, and every one runs inside your own Atlassian environment.',
    primary: 'See our apps',
    secondary: 'How we build',
    iconsLabel: 'Our apps',
  },
  /**
   * Six reasons to trust us, not six facts about our stack. The heading is
   * borrowed from our own Marketplace listings, which head the same facts with
   * "Built for trust" rather than "how this was built".
   */
  proof: {
    label: 'Built for trust',
    items: [
      'Built on Atlassian Forge',
      'Your data never leaves Atlassian',
      'No third-party server to review',
      'For Jira and Confluence Cloud',
      'A free trial on every paid app',
      'Support in English, Portuguese and Spanish',
    ],
  },
  focus: {
    eyebrow: 'OnBudget, for Jira Cloud',
    headline: 'Track every Jira budget on one screen.',
    lede: 'Budget versus actual, health and forecast, built from the work your team already tracks in Jira. Delivery, product and marketing budgets side by side, each in its own currency, and no new custom fields for anyone to fill in.',
    custom: {
      title: 'Shape the report, then shape the screen.',
      report: 'You decide what a report covers: whole spaces, work items picked by key or summary text, or a JQL query. You set the budget and its currency, the two thresholds that turn it at risk and then over budget, and the number and date formats it reads in.',
      dashboard: 'Then the dashboard is yours to rearrange. Drag a gadget to a new slot, resize it from the corner, clone or remove it, switch it between bar, line, area, pie, donut, table and plain number, and save the layout when it reads the way you think.',
    },
    ctaPrimary: 'See what OnBudget does',
    ctaSecondary: 'View on the Marketplace',
  },
  portfolio: {
    eyebrow: 'The apps',
    headline: 'Apps for Jira and Confluence Cloud.',
    lede: 'Know what your work costs. Keep Confluence governable. Keep Jira clean. Each app does one of those jobs end to end, and more are on the way.',
  },
  how: {
    eyebrow: 'Inside Atlassian',
    headline: 'Everything we build runs inside your own Atlassian environment.',
    paragraphs: [
      'Every app we publish runs on Atlassian Forge, so the code executes inside Atlassian infrastructure and your data stays in your own Atlassian environment. That answers most of a security review before it starts: there is no third-party host to assess, nothing leaving Atlassian to document, and no separate uptime to depend on.',
      'Each app asks for the permissions it needs to do its job, and each one publishes exactly what it stores on its own page. Our about page lists all of them in one table, so you can check before you install rather than after.',
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
    body: 'Every paid app comes with a free trial, and the free one starts working the moment you install it. If you would rather talk it through with a person first, we answer in three languages.',
    primary: 'See our apps',
    secondary: 'Ask us a question',
  },
} as const;

export type HomeCopy = import('../../shape').Shape<typeof en>;
