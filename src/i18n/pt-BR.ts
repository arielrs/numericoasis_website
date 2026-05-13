import type { en } from './en';

export const ptBR = {
  nav: {
    services: 'Serviços',
    apps: 'Apps',
    blog: 'Blog',
    about: 'Sobre',
    contact: 'Contato',
    startProject: 'Iniciar um projeto',
    toggleMenu: 'Abrir menu',
    mainNavLabel: 'Principal',
    homeAriaLabel: (siteName: string) => `Página inicial de ${siteName}`,
  },
  footer: {
    headings: {
      company: 'Empresa',
      connect: 'Conecte-se',
    },
    links: {
      about: 'Sobre',
      services: 'Serviços',
      apps: 'Apps',
      blog: 'Blog',
      contact: 'Contato',
      marketplace: 'Atlassian Marketplace',
      linkedin: 'LinkedIn',
      rss: 'Feed RSS',
    },
    builtWith: 'Feito com Astro · Hospedado no GitHub Pages',
    copyright: (year: number, siteName: string, location: string) =>
      `© ${year} ${siteName}. ${location}.`,
  },
  common: {
    skipToContent: 'Ir para o conteúdo',
    languagePicker: 'Idioma',
    learnMore: 'Saiba mais',
    readMore: 'Continuar lendo',
    backToTop: 'Voltar ao topo',
    talkToTheTeam: 'Fale com o time',
    getInTouch: 'Entre em contato',
  },
} as const satisfies typeof en;
