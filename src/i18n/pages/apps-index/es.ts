import type { AppsIndexCopy } from './en';

export const es = {
  meta: {
    title: 'Todas nuestras apps para Jira y Confluence',
    crumb: 'Apps',
    metaDescription:
      'Nuestras apps del Atlassian Marketplace, hechas en Forge para Jira y Confluence Cloud: informes de costo y presupuesto, gobernanza y administración.',
    description:
      'Apps de Numeric Oasis en el Atlassian Marketplace, construidas en Forge para Jira y Confluence Cloud. Control de presupuesto, gobernanza en Confluence, mapa de dependencias, auditoría de configuración y limpieza de campos personalizados.',
  },
  eyebrow: 'Atlassian Marketplace',
  headline: 'Apps para Jira y Confluence Cloud.',
  lede: 'Todas están construidas en Forge, así que funcionan dentro de Atlassian y no junto a ella. Tus datos se quedan en tu tenant, no hay un tercero que homologar, y las actualizaciones llegan sin ventana de mantenimiento.',
  groups: {
    jira: 'Para Jira',
    confluence: 'Para Confluence',
  },
  cta: {
    headline: '¿No sabes cuál necesitas?',
    body: 'Cada app de pago tiene una prueba gratuita en el Atlassian Marketplace, y la gratuita no pide ningún registro. Si prefieres describir el problema primero, cuéntanos: te señalamos la app que encaja, o te decimos que ninguna de las nuestras lo hace.',
    primary: 'Escríbenos',
    secondary: 'Ver todas nuestras apps en el Marketplace',
  },
  builtFor: 'Pensado para',
  readMore: 'Ver más',
} as const satisfies AppsIndexCopy;
