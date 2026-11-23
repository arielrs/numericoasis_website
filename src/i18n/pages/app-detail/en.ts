export const en = {
  backToApps: 'All apps',
  eyebrow: 'Atlassian Marketplace app',
  install: 'Install on the Atlassian Marketplace',
  installShort: 'Install from the Marketplace',
  docs: 'Documentation',
  talkToUs: 'Ask us a question',
  heroCue: {
    free: 'Free on the Atlassian Marketplace. Runs inside your Atlassian site.',
    paid: 'Free trial on the Atlassian Marketplace. Runs inside your Atlassian site.',
  },
  problem: { eyebrow: 'The problem' },
  steps: {
    eyebrow: 'How it works',
    headline: 'Three steps from install to answer.',
  },
  comparison: {
    eyebrow: 'Compared with what is built in',
    needLabel: 'What you need',
  },
  related: {
    eyebrow: 'Guides',
    headline: 'Related guides from our blog.',
  },
  valueProps: {
    eyebrow: 'Why',
    headline: 'What teams actually get out of it.',
  },
  features: {
    eyebrow: 'Key features',
    headline: 'What is in the app.',
  },
  audiences: {
    eyebrow: 'Built for',
    headline: 'The people who get the most value.',
  },
  gallery: {
    eyebrow: 'See it in action',
    headlineSuffix: 'at a glance.',
    enlarge: 'Click to enlarge',
    close: 'Close',
    openLabel: 'Open screenshot',
  },
  data: {
    eyebrow: 'Data and permissions',
    headline: 'What the app can see, and what it keeps.',
  },
  faq: {
    eyebrow: 'Questions',
    headline: 'What administrators ask before installing.',
  },
  useCases: {
    eyebrow: 'Where it fits',
    headline: 'What teams use it for.',
  },
  cta: {
    headlinePrefix: 'Ready to try',
    bodyFree: 'It is free on the Atlassian Marketplace. Install it and see results in minutes.',
    bodyPaid: 'Install it from the Atlassian Marketplace, where the current pricing lives, or ask us anything first.',
  },
} as const;

export type AppDetailCopy = import('../../shape').Shape<typeof en>;
