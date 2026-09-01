import type { Dictionary } from './en';

export const es = {
  site: {
    description:
      'Numeric Oasis es socia en el Atlassian Marketplace. Construimos apps en Forge para Jira y Confluence Cloud: informes de costo y presupuesto, gobernanza y cumplimiento, y el trabajo de administración que mantiene ordenado un sitio que crece.',
    location: 'Canoas, RS, Brasil',
    slogan: 'Apps que funcionan dentro de Atlassian, no al lado.',
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
    priceTrial: 'Prueba gratuita',
    installOnMarketplace: 'Instalar desde el Atlassian Marketplace',
    viewOnMarketplace: 'Ver en el Marketplace',
    builtFor: 'Pensado para:',
    runsOnAtlassian: 'Construido en Atlassian Forge',
  },
  consent: {
    label: 'Elección sobre cookies',
    body: 'Usamos analítica sin cookies por defecto. Con tu permiso, también medimos qué páginas y anuncios llevan a instalar una app, usando Google.',
    allow: 'Permitir',
    deny: 'Ahora no',
    privacyLabel: 'Leer la política de privacidad',
    privacyHref: '/es/privacy/',
  },
  landing: {
    ctaHeading: 'Pruébalo en tu propio Jira',
    ctaBody: 'Prueba gratuita en el Atlassian Marketplace. Lee tu Jira en vez de editarlo, así que probarlo te cuesta un clic en el Marketplace y nada más.',
  },
  legal: {
    heading: 'Legal',
    privacy: 'Política de privacidad',
    terms: 'Términos del servicio',
    sla: 'Acuerdo de nivel de servicio',
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
