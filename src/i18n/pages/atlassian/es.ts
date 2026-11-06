import type { AtlassianCopy } from './en';

export const es = {
  meta: {
    crumb: 'Atlassian',
    title: 'Consultoría Atlassian y apps en Forge',
    metaDescription:
      'Migración de Jira y Confluence a Cloud, administración y limpieza de licencias, nuestras apps del Marketplace y apps en Forge a medida que reducen la factura.',
    description:
      'Numeric Oasis evalúa y ejecuta migraciones de Jira y Confluence de Data Center a Cloud, dimensiona reescrituras de ScriptRunner, saca equipos de otras herramientas, ordena la administración y las licencias, publica apps en Forge en el Atlassian Marketplace y crea apps en Forge a medida que sustituyen varias suscripciones.',
  },
  hero: {
    eyebrow: 'Atlassian',
    headline: 'Jira y Confluence, desde la migración hasta el último custom field.',
    lede: 'Llevamos quince años trabajando dentro de las herramientas de Atlassian, como administradores, consultores y socios del Marketplace. Te llevamos a Cloud, mantenemos el sitio ordenado una vez allí, y creamos la app que necesitas cuando el Marketplace no la tiene, o cobra demasiado por la parte que usas.',
    primary: 'Hablemos',
    secondary: 'Mira nuestras apps',
  },
  consulting: {
    eyebrow: 'Consultoría',
    headline: 'Migraciones, limpiezas y la administración que hay entre unas y otras.',
    items: [
      {
        title: 'Migraciones de Data Center a Cloud',
        body: 'Una evaluación antes de que nada se mueva: cada app con su camino a Cloud, cada script dimensionado para su reescritura, cada macro de Confluence revisada para ver si sobrevive al viaje. Después, la migración en sí, en oleadas ensayadas, con un plan para la mañana siguiente.',
      },
      {
        title: 'Reescrituras de ScriptRunner',
        body: 'ScriptRunner en Cloud no es la versión de Data Center en otra dirección. Hacemos inventario de lo que tienes, decimos qué retirar, qué se traduce y qué hay que reescribir, y lo dimensionamos con honestidad antes de que te comprometas con una fecha.',
      },
      {
        title: 'Salida de otras herramientas',
        body: 'Hojas de cálculo que se convirtieron en un sistema, herramientas de proyecto que se quedaron caras, wikis sin dueño. Trazamos qué pasa a Jira y Confluence, qué pasa de otra forma, y qué conviene simplemente apagar.',
      },
      {
        title: 'Administración y gobernanza',
        body: 'Esquemas que se fueron desviando, permisos que nadie sabe explicar, reglas de automatización que se disparan para nadie y licencias pagadas por gente que ya se fue. Lo ordenamos, dejamos escrito el porqué y dejamos reglas que lo mantienen ordenado.',
      },
    ],
  },
  apps: {
    eyebrow: 'Apps en el Marketplace',
    headline: 'Nuestras apps para Jira y Confluence Cloud.',
    lede: 'Hechas en Forge, así que funcionan dentro de tu propio entorno de Atlassian y tus datos se quedan allí. Cada una hace un trabajo de principio a fin, y cada una dice en su página exactamente qué guarda.',
    link: 'Todas las apps',
  },
  custom: {
    eyebrow: 'Apps en Forge a medida',
    headline: 'Paga por la parte que usas.',
    paragraphs: [
      'La mayoría de los sitios de Atlassian cargan con apps del Marketplace compradas por una sola función cada una, y cada una se cobra por usuario en todo el sitio. Muchas veces, dos o tres de ellas se pueden sustituir por una sola app pequeña en Forge, hecha exactamente para lo que tus equipos hacen con ellas.',
      'Partimos de tu inventario de apps y de tu registro de auditoría: qué está instalado, qué se usa, por cuántas personas y cuánto cuesta en tu plan. Después recibes una recomendación con los números: qué apps conservar, cuáles quitar y cuáles sustituir. Una app a medida funciona en Forge, dentro de Atlassian, así que pasa tu revisión de seguridad igual que las nuestras.',
    ],
    points: [
      'Un inventario de apps con uso y coste reales',
      'Una app en Forge en lugar de varias suscripciones',
      'Funciona dentro de Atlassian, como todas las apps que entregamos',
    ],
    link: 'Lee: cómo reducir tu parque de apps de Atlassian',
  },
  posts: {
    eyebrow: 'Del blog',
    headline: 'Apuntes sobre el trabajo con Atlassian.',
    link: 'Todos los artículos de consultoría Atlassian',
  },
  cta: {
    heading: '¿Preparando una migración, o poniendo orden después de una?',
    body: 'Cuéntanos dónde está tu sitio y adónde tiene que llegar, en español, inglés o portugués. Hablarás con las personas que hacen el trabajo.',
    primary: 'Hablemos',
  },
} as const satisfies AtlassianCopy;
