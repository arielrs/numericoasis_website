import type { en } from './en';

export const es = {
  nav: {
    services: 'Servicios',
    apps: 'Apps',
    blog: 'Blog',
    about: 'Nosotros',
    contact: 'Contacto',
    startProject: 'Iniciar un proyecto',
    toggleMenu: 'Abrir menú',
    mainNavLabel: 'Principal',
    homeAriaLabel: (siteName: string) => `Página de inicio de ${siteName}`,
  },
  footer: {
    headings: {
      company: 'Empresa',
      connect: 'Conecta',
    },
    links: {
      about: 'Nosotros',
      services: 'Servicios',
      apps: 'Apps',
      blog: 'Blog',
      contact: 'Contacto',
      marketplace: 'Atlassian Marketplace',
      linkedin: 'LinkedIn',
      rss: 'Feed RSS',
    },
    builtWith: 'Hecho con Astro · Alojado en GitHub Pages',
    copyright: (year: number, siteName: string, location: string) =>
      `© ${year} ${siteName}. ${location}.`,
  },
  common: {
    skipToContent: 'Saltar al contenido',
    languagePicker: 'Idioma',
    learnMore: 'Más información',
    readMore: 'Seguir leyendo',
    backToTop: 'Volver arriba',
    talkToTheTeam: 'Habla con el equipo',
    getInTouch: 'Contáctanos',
  },
} as const satisfies typeof en;
