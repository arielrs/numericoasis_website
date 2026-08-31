import type { Dictionary } from './en';

export const es = {
  site: {
    description:
      'Numeric Oasis es socia en el Atlassian Marketplace. Construimos apps en Forge para Jira y Confluence Cloud: informes de costo y presupuesto, gobernanza y cumplimiento, y el trabajo de administración que mantiene ordenado un sitio que crece.',
    location: 'Canoas, RS, Brasil',
  },
  nav: {
    apps: 'Apps',
    docs: 'Wiki',
    blog: 'Blog',
    about: 'Nosotros',
    contact: 'Contacto',
    tryApps: 'Prueba nuestras apps',
    toggleMenu: 'Abrir menú',
    mainNavLabel: 'Principal',
    homeAriaLabel: (siteName: string) => `Página de inicio de ${siteName}`,
  },
  footer: {
    headings: {
      apps: 'Apps',
      company: 'Empresa',
      connect: 'Conecta',
    },
    links: {
      about: 'Nosotros',
      apps: 'Apps',
      blog: 'Blog',
      docs: 'Wiki',
      contact: 'Contacto',
      support: 'Portal de soporte',
      marketplace: 'Atlassian Marketplace',
      linkedin: 'LinkedIn',
      rss: 'Feed RSS',
    },
    builtWith: 'Hecho con Astro · Alojado en GitHub Pages',
    copyright: (year: number, siteName: string, location: string) =>
      `© ${year} ${siteName}. ${location}.`,
  },
  apps: {
    priceFree: 'Gratis',
    pricePaid: 'Prueba gratuita en el Marketplace',
    installOnMarketplace: 'Instalar desde el Atlassian Marketplace',
    viewOnMarketplace: 'Ver en el Marketplace',
    builtFor: 'Pensado para:',
    runsOnAtlassian: 'Runs on Atlassian',
  },
  common: {
    home: 'Inicio',
    skipToContent: 'Saltar al contenido',
    languagePicker: 'Idioma',
    learnMore: 'Más información',
    readMore: 'Seguir leyendo',
    backToTop: 'Volver arriba',
    talkToTheTeam: 'Habla con el equipo',
    getInTouch: 'Contáctanos',
  },
} as const satisfies Dictionary;
