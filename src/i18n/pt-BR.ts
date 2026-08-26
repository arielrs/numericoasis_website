import type { Dictionary } from './en';

export const ptBR = {
  site: {
    description:
      'A Numeric Oasis é parceira no Atlassian Marketplace. Construímos apps em Forge para Jira e Confluence Cloud: relatórios de orçamento e custo, governança no Confluence, mapa de dependências, auditoria de configuração e limpeza de campos personalizados.',
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
    pricePaid: 'Pago, veja no Marketplace',
    installOnMarketplace: 'Instalar pelo Atlassian Marketplace',
    builtFor: 'Feito para:',
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
