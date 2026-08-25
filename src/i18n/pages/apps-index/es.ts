import type { AppsIndexCopy } from './en';

export const es = {
  meta: {
    title: 'Apps',
    crumb: 'Apps',
    description:
      'Seis apps de Numeric Oasis en el Atlassian Marketplace, construidas en Forge para Jira y Confluence Cloud. Control de presupuesto, gobernanza en Confluence, mapa de dependencias, auditoría de configuración y limpieza de campos personalizados.',
  },
  eyebrow: 'Atlassian Marketplace',
  headline: 'Seis apps para Jira y Confluence Cloud.',
  lede: 'Todas están construidas en Forge, así que funcionan dentro de Atlassian y no junto a ella. Tus datos se quedan en tu tenant, no hay un tercero que homologar, y las actualizaciones llegan sin ventana de mantenimiento.',
  groups: {
    jira: 'Para Jira',
    confluence: 'Para Confluence',
  },
  flagshipBadge: 'Principal',
  builtFor: 'Pensado para',
  readMore: 'Ver más',
} as const satisfies AppsIndexCopy;
