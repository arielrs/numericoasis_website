import type { Shape } from './shape';

export const en = {
  site: {
    description:
      'Numeric Oasis is a partner in the Atlassian Marketplace. We build Forge apps for Jira and Confluence Cloud: cost and budget reporting, governance and compliance, and the administration work of keeping a growing site clean.',
    location: 'Canoas, RS, Brazil',
    slogan: 'Apps that run inside Atlassian, not beside it.',
  },
  nav: {
    apps: 'Apps',
    docs: 'Wiki',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
    tryApps: 'Try our apps',
    toggleMenu: 'Toggle menu',
    mainNavLabel: 'Main',
    homeAriaLabel: (siteName: string) => `${siteName} home`,
  },
  footer: {
    headings: {
      apps: 'Apps',
      company: 'Company',
      connect: 'Connect',
    },
    links: {
      about: 'About',
      apps: 'Apps',
      blog: 'Blog',
      docs: 'Wiki',
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
