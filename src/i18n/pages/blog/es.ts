import type { BlogCopy } from './en';

export const es = {
  meta: {
    crumb: 'Blog',
    title: 'Costo, administración y gobernanza en Jira',
    metaDescription:
      'Apuntes sobre visibilidad de costos, gobernanza en Confluence y salud de la configuración de Jira, del equipo que construye apps del Marketplace.',
    description:
      'Apuntes sobre visibilidad de costos en Atlassian, gobernanza en Confluence y salud de la configuración de Jira, del equipo que construye apps del Atlassian Marketplace.',
  },
  index: {
    eyebrow: 'Del taller',
    headline: 'Apuntes del taller.',
    lede: 'Lo que aprendemos construyendo apps en Forge, y lo que acabamos explicando dos veces. Sobre todo: saber cuánto cuesta tu trabajo en Atlassian, mantener Confluence gobernable, y evitar que la configuración de Jira se pudra en silencio.',
    empty: 'Todavía no hay nada publicado.',
    allTags: 'Todos los artículos',
    tagsLabel: 'Explorar por tema',
  },
  tagPage: {
    eyebrow: 'Tema',
    headlinePrefix: 'Artículos etiquetados',
    metaDescription: (label: string) =>
      `Todos los posts con la etiqueta ${label}. Apuntes del equipo que construye apps del Atlassian Marketplace para Jira y Confluence Cloud.`,
    backToBlog: 'Todos los artículos',
    empty: 'Todavía no hay nada publicado sobre este tema.',
  },
  post: {
    backToBlog: 'Todos los artículos',
    updated: 'Actualizado',
    readingTime: (minutes: number) => `${minutes} min de lectura`,
    by: 'Por',
    share: 'Compartir',
    shareOnLinkedIn: 'Compartir en LinkedIn',
    shareByEmail: 'Compartir por correo',
    previous: 'Anterior',
    next: 'Siguiente',
    related: 'Lectura relacionada',
    cta: {
      onbudget: {
        headline: '¿Quieres esto sin la hoja de cálculo?',
        body: 'OnBudget convierte el trabajo que tu equipo ya registra en Jira en presupuestos, pronósticos e informes de costo. Sin campos personalizados nuevos, y nada cambia en tu Jira.',
        primary: 'Mira qué hace OnBudget',
        secondary: 'Escríbenos',
      },
      general: {
        headline: 'Construimos apps del Atlassian Marketplace.',
        body: 'Apps en Forge para Jira y Confluence Cloud que funcionan dentro de tu propio entorno de Atlassian. Tus datos se quedan donde ya están, y no hay servidor de proveedor que seguridad tenga que aprobar.',
        primary: 'Mira nuestras apps',
        secondary: 'Escríbenos',
      },
    },
  },
  pagination: {
    label: 'Paginación',
    previous: 'Artículos más recientes',
    next: 'Artículos más antiguos',
    page: (current: number, total: number) => `Página ${current} de ${total}`,
  },
  tags: {
    onbudget: 'OnBudget',
    'jira-cost-management': 'Costos en Jira',
    'confluence-governance': 'Gobernanza en Confluence',
    'jira-administration': 'Administración de Jira',
    forge: 'Forge',
    marketplace: 'Atlassian Marketplace',
    'atlassian-cloud': 'Atlassian Cloud',
    'how-to': 'Cómo hacerlo',
    'product-updates': 'Novedades de las apps',
  },
} as const satisfies BlogCopy;
