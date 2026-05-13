export const en = {
  nav: {
    services: 'Services',
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
