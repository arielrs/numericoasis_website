import type { BlogCopy } from './en';

export const es = {
  meta: {
    crumb: 'Blog',
    title: 'Guías y noticias de Atlassian, software y juegos',
    metaDescription:
      'Guías y noticias para administradores de Jira, Confluence, JSM y Rovo, y artículos sobre software a medida y la industria del videojuego, de Numeric Oasis.',
    description:
      'Guías y noticias para administradores de Atlassian Cloud sobre Jira, Confluence, Jira Service Management y Rovo, y artículos sobre software a medida y la industria del videojuego, del equipo de Numeric Oasis.',
  },
  index: {
    eyebrow: 'Del taller',
    headline: 'Apuntes del taller.',
    lede: 'Guías y noticias para administradores de Atlassian Cloud, notas sobre desarrollo de software a medida y artículos sobre la industria del videojuego. Cada uno responde a su pregunta en las primeras líneas y enlaza sus fuentes.',
    empty: 'Todavía no hay nada publicado.',
    allTags: 'Todos los artículos',
    tagsLabel: 'Explorar por tema',
  },
  tagPage: {
    eyebrow: 'Tema',
    headlinePrefix: 'Artículos etiquetados',
    metaDescription: (label: string) =>
      `Todos los posts con la etiqueta ${label}. Apuntes de Numeric Oasis sobre software a medida, trabajo con Atlassian y desarrollo de videojuegos.`,
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
        body: 'OnBudget convierte el trabajo que tu equipo ya registra en Jira en presupuestos, pronósticos e informes de coste. Funciona con los campos que tu equipo ya rellena, y lee tu Jira en vez de editarlo.',
        primary: 'Mira qué hace OnBudget',
        secondary: 'Escríbenos',
      },
      general: {
        headline: 'Construimos apps del Atlassian Marketplace.',
        body: 'Apps en Forge para Jira y Confluence Cloud que funcionan dentro de tu propio entorno de Atlassian. Tus datos se quedan donde ya están, y tu revisión de seguridad cubre una plataforma que ya tienes aprobada.',
        primary: 'Mira nuestras apps',
        secondary: 'Escríbenos',
      },
      customDev: {
        headline: '¿Tienes tu propio veinte por ciento?',
        body: 'Creamos las aplicaciones web, las integraciones y las herramientas internas que cierran el hueco que dejó abierto el producto que compraste. Entregas pequeñas, probadas y documentadas, en tres idiomas.',
        primary: 'Desarrollo a medida',
        secondary: 'Escríbenos',
      },
      consulting: {
        headline: '¿Preparando una migración, o poniendo orden después de una?',
        body: 'Evaluamos migraciones de Data Center a Cloud, dimensionamos la reescritura de ScriptRunner, sacamos equipos de otras herramientas y limpiamos lo que una migración deja atrás. Hablas con quien hace el trabajo.',
        primary: 'Servicios Atlassian',
        secondary: 'Escríbenos',
      },
      studio: {
        headline: 'Juega a lo que hace nuestro Estudio de Juegos.',
        body: 'Kindelve es un descenso a mazmorras con colección de criaturas que funciona en cualquier navegador, gratis, en cinco idiomas. La página del estudio tiene el juego, cómo está hecho y lo que viene.',
        primary: 'El Estudio de Juegos',
        secondary: 'Habla con el estudio',
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
    'jira-cost-management': 'Costes en Jira',
    'confluence-governance': 'Gobernanza en Confluence',
    'jira-administration': 'Administración de Jira',
    forge: 'Forge',
    marketplace: 'Atlassian Marketplace',
    'atlassian-cloud': 'Atlassian Cloud',
    'how-to': 'Cómo hacerlo',
    'product-updates': 'Novedades de las apps',
    'custom-development': 'Desarrollo a medida',
    'atlassian-consulting': 'Consultoría Atlassian',
    'cloud-migration': 'Migración a Cloud',
    'game-development': 'Desarrollo de videojuegos',
    'atlassian-news': 'Noticias de Atlassian',
    'jira-service-management': 'Jira Service Management',
    'rovo-and-ai': 'Rovo e IA',
  },
} as const satisfies BlogCopy;
