import type { Shape } from './shape';

export const en = {
  site: {
    description:
      'Numeric Oasis builds custom software, migrates and runs Jira and Confluence, publishes Forge apps on the Atlassian Marketplace, and runs a game studio. Small, finished releases, since 2011.',
    location: 'Canoas, RS, Brazil',
    slogan: 'Small, finished software, on three fronts.',
  },
  nav: {
    customDev: 'Custom Dev',
    atlassian: 'Atlassian',
    apps: 'Apps',
    docs: 'Wiki',
    blog: 'Blog',
    studio: 'Game Studio',
    about: 'About',
    contact: 'Contact',
    tryApps: 'Try our apps',
    talkToUs: 'Talk to us',
    toggleMenu: 'Toggle menu',
    mainNavLabel: 'Main',
    homeAriaLabel: (siteName: string) => `${siteName} home`,
  },
  footer: {
    headings: {
      fronts: 'What we do',
      apps: 'Apps',
      company: 'Company',
      connect: 'Connect',
    },
    links: {
      about: 'About',
      customDev: 'Custom Development',
      atlassian: 'Atlassian',
      marketplaceApps: 'Marketplace apps',
      apps: 'Apps',
      blog: 'Blog',
      docs: 'Wiki',
      studio: 'Game Studio',
      contact: 'Contact',
      support: 'Support portal',
      marketplace: 'Atlassian Marketplace',
      linkedin: 'LinkedIn',
      rss: 'RSS feed',
    },
    builtWith: 'Built with Astro · Hosted on GitHub Pages',
    copyright: (year: number, siteName: string, location: string) =>
      `© ${year} ${siteName}. ${location}.`,
  },
  apps: {
    priceFree: 'Free',
    pricePaid: 'Free trial on the Marketplace',
    priceTrial: 'Free trial',
    installOnMarketplace: 'Install on the Atlassian Marketplace',
    viewOnMarketplace: 'View on the Marketplace',
    builtFor: 'Built for:',
    runsOnAtlassian: 'Built on Atlassian Forge',
  },
  consent: {
    label: 'Cookie choice',
    body: 'We use cookieless analytics by default. With your permission we also measure which of our pages and ads lead to an app install, using Google.',
    allow: 'Allow',
    deny: 'No thanks',
    privacyLabel: 'Read the privacy policy',
    privacyHref: '/privacy/',
  },
  landing: {
    ctaHeading: 'Try it on your own Jira',
    ctaBody: 'A free trial on the Atlassian Marketplace. It reads your Jira rather than editing it, so trying it costs you a Marketplace click and nothing else.',
  },
  legal: {
    heading: 'Legal',
    privacy: 'Privacy policy',
    terms: 'Terms of service',
    sla: 'Service level agreement',
  },
  common: {
    home: 'Home',
    skipToContent: 'Skip to content',
    languagePicker: 'Language',
    learnMore: 'Learn more',
    readMore: 'Read more',
    backToTop: 'Back to top',
    talkToTheTeam: 'Talk to the team',
    getInTouch: 'Get in touch',
  },
} as const;

/** The structural contract every locale dictionary must satisfy. */
export type Dictionary = Shape<typeof en>;
