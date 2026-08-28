import type { AppsIndexCopy } from './en';

export const es = {
  meta: {
    title: 'Todas nuestras apps para Jira y Confluence',
    crumb: 'Apps',
    metaDescription:
      'Nuestras apps del Atlassian Marketplace para Jira y Confluence Cloud. Sabe cuánto cuesta el trabajo, gobierna Confluence y mantén Jira ordenado.',
    description:
      'Apps de Numeric Oasis en el Atlassian Marketplace, construidas en Forge para Jira y Confluence Cloud. Control de presupuesto, gobernanza en Confluence, mapa de dependencias, auditoría de configuración y limpieza de campos personalizados.',
  },
  eyebrow: 'Atlassian Marketplace',
  headline: 'Apps para Jira y Confluence Cloud.',
  lede: 'Todas funcionan sobre Forge dentro de tu propio entorno de Atlassian, así que tus datos se quedan donde ya están, no hay servidor de proveedor que seguridad tenga que aprobar, y las actualizaciones llegan sin ventana de mantenimiento.',
  groups: {
    jira: 'Para Jira',
    confluence: 'Para Confluence',
  },
  cta: {
    headline: 'Cuéntanos el problema. Te señalamos la app.',
    body: 'Cada app de pago tiene una prueba gratuita en el Atlassian Marketplace, y la gratuita empieza a funcionar en el momento en que la instalas. Si prefieres describir antes qué quieres resolver, cuéntanos y te señalamos la que lo hace.',
    primary: 'Escríbenos',
    secondary: 'Ver todas nuestras apps en el Marketplace',
  },
  builtFor: 'Pensado para',
  readMore: 'Ver más',
} as const satisfies AppsIndexCopy;
