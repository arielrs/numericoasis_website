import type { Shape } from './shape';

export const en = {
  site: {
    description:
      'Numeric Oasis is a partner in the Atlassian Marketplace. We build Forge apps for Jira and Confluence Cloud: cost and budget reporting, governance and compliance, and the administration work of keeping a growing site clean.',
    location: 'Canoas, RS, Brazil',
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
    installOnMarketplace: 'Install on the Atlassian Marketplace',
    viewOnMarketplace: 'View on the Marketplace',
    builtFor: 'Built for:',
    runsOnAtlassian: 'Runs on Atlassian',
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
