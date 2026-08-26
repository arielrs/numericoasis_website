import type { BlogCopy } from './en';

export const es = {
  meta: {
    crumb: 'Blog',
    title: 'Blog',
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
