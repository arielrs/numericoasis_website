import type { Shape } from './shape';

export const en = {
  nav: {
    services: 'Services',
    costReduction: 'Atlassian costs',
    apps: 'Apps',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
    startProject: 'Start a project',
    toggleMenu: 'Toggle menu',
    mainNavLabel: 'Main',
    homeAriaLabel: (siteName: string) => `${siteName} home`,
  },
  footer: {
    headings: {
      company: 'Company',
      connect: 'Connect',
    },
    links: {
      about: 'About',
      services: 'Services',
      apps: 'Apps',
      blog: 'Blog',
      contact: 'Contact',
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
    pricePaid: 'Paid, see the Marketplace',
    installOnMarketplace: 'Install on the Atlassian Marketplace',
    builtFor: 'Built for:',
  },
  common: {
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
