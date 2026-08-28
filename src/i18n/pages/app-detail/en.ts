export const en = {
  backToApps: 'All apps',
  eyebrow: 'Atlassian Marketplace app',
  install: 'Install on the Atlassian Marketplace',
  installShort: 'Install from the Marketplace',
  docs: 'Documentation',
  talkToUs: 'Ask us a question',
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
    scopes: 'Requested permissions',
  },
  cta: {
    headlinePrefix: 'Ready to try',
    bodyFree: 'It is free on the Atlassian Marketplace. Install it and see results in minutes.',
    bodyPaid: 'Install it from the Atlassian Marketplace, where the current pricing lives, or ask us anything first.',
  },
} as const;

export type AppDetailCopy = import('../../shape').Shape<typeof en>;
