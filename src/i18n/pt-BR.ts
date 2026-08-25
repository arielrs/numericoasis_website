import type { Dictionary } from './en';

export const ptBR = {
  nav: {
    services: 'Serviços',
    costReduction: 'Custos Atlassian',
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
