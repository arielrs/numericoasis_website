import type { Dictionary } from './en';

export const ptBR = {
  site: {
    description:
      'A Numeric Oasis é parceira no Atlassian Marketplace. Construímos apps em Forge para Jira e Confluence Cloud: relatórios de custo e orçamento, governança e conformidade, e o trabalho de administração que mantém um site organizado conforme ele cresce.',
    location: 'Canoas, RS, Brasil',
  },
  nav: {
    apps: 'Apps',
    blog: 'Blog',
    about: 'Sobre',
    contact: 'Contato',
    tryApps: 'Experimente nossos apps',
    toggleMenu: 'Abrir menu',
    mainNavLabel: 'Principal',
    homeAriaLabel: (siteName: string) => `Página inicial de ${siteName}`,
  },
  footer: {
    headings: {
      apps: 'Apps',
      company: 'Empresa',
      connect: 'Conecte-se',
    },
    links: {
      about: 'Sobre',
      apps: 'Apps',
      blog: 'Blog',
      contact: 'Contato',
      support: 'Portal de suporte',
      marketplace: 'Atlassian Marketplace',
      linkedin: 'LinkedIn',
      rss: 'Feed RSS',
    },
    builtWith: 'Feito com Astro · Hospedado no GitHub Pages',
    copyright: (year: number, siteName: string, location: string) =>
      `© ${year} ${siteName}. ${location}.`,
  },
  apps: {
    priceFree: 'Gratuito',
    pricePaid: 'Teste gratuito no Marketplace',
    installOnMarketplace: 'Instalar pelo Atlassian Marketplace',
    viewOnMarketplace: 'Ver no Marketplace',
    builtFor: 'Feito para:',
    runsOnAtlassian: 'Runs on Atlassian',
  },
  common: {
    home: 'Início',
    skipToContent: 'Ir para o conteúdo',
    languagePicker: 'Idioma',
    learnMore: 'Saiba mais',
    readMore: 'Continuar lendo',
    backToTop: 'Voltar ao topo',
    talkToTheTeam: 'Fale com o time',
    getInTouch: 'Entre em contato',
  },
} as const satisfies Dictionary;
