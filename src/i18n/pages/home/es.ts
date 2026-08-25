import type { HomeCopy } from './en';

export const es = {
  meta: {
    title: 'Numeric Oasis Technologies',
    description:
      'Socia en el Atlassian Marketplace. Seis apps en Forge para Jira y Confluence Cloud, encabezadas por OnBudget, que convierte el trabajo ya registrado en Jira en presupuestos, pronósticos e informes de costo.',
  },
  hero: {
    eyebrow: 'Socia en el Atlassian Marketplace',
    headline: 'Descubre cuánto cuesta de verdad el trabajo en tu Jira.',
    lede: 'Construimos apps en Forge para Jira y Confluence Cloud. OnBudget, nuestra principal, convierte el trabajo que tu equipo ya registra en presupuestos, pronósticos e informes de costo, sin pedirle a nadie que rellene un campo nuevo.',
    primary: 'Descubre OnBudget',
    secondary: 'Ver las seis apps',
  },
  proof: {
    label: 'Cómo están construidas nuestras apps',
    items: [
      'Runs on Atlassian',
      'Hecho en Forge',
      'Solo Cloud',
      'Solo lectura siempre que se puede',
      'Jira y Confluence',
      'Socia en el Atlassian Marketplace',
    ],
  },
  problem: {
    eyebrow: 'Por qué creamos OnBudget',
    headline: 'Jira sabe qué pasó. No sabe cuánto costó.',
    body: 'Los datos de entrega viven en Jira. El dinero vive en una hoja de cálculo que alguien exporta el viernes y que el lunes ya está mal. Peor todavía: los equipos que nunca adoptaron puntos de historia ni partes de horas ni siquiera aparecen en esa hoja.',
    link: 'Mira cómo lo resuelve OnBudget',
  },
  portfolio: {
    eyebrow: 'Las apps',
    headline: 'Seis apps para Jira y Confluence Cloud.',
    lede: 'Cada una resuelve un problema que el producto anfitrión deja abierto, y cada una funciona dentro de Atlassian y no junto a ella.',
  },
  how: {
    eyebrow: 'Cómo trabajamos',
    headline: 'Solo Forge, y es una restricción deliberada.',
    paragraphs: [
      'Cada app que publicamos funciona sobre Atlassian Forge, lo que significa que se ejecuta dentro de la infraestructura de Atlassian y no en un servidor nuestro. No hay un tercero que tu equipo de seguridad tenga que revisar, no hay salida de datos que documentar, y no hay un tiempo de actividad aparte del que preocuparse.',
      'También significa que pedimos los permisos más estrechos que sirvan para el trabajo. Cuatro de nuestras seis apps son de solo lectura. Las dos que escriben dicen exactamente qué escriben y por qué, en sus propias páginas, porque una promesa genérica de privacidad que es falsa para una app es peor que ninguna promesa.',
      'Somos socios en el Atlassian Marketplace, trabajamos desde Canoas, en el sur de Brasil, y atendemos soporte en inglés, portugués y español.',
    ],
    link: 'Más sobre el equipo',
  },
  blog: {
    eyebrow: 'Del blog',
    headline: 'Apuntes del taller.',
    link: 'Todos los artículos',
  },
  cta: {
    headline: 'Instala desde el Marketplace, o pregúntanos antes.',
    body: 'Cada app tiene periodo de prueba gratuito, y la que es gratis ni siquiera lo necesita. Si prefieres hablar con una persona antes de instalar nada, también funciona.',
    primary: 'Ver las seis apps',
    secondary: 'Hacernos una pregunta',
  },
} as const satisfies HomeCopy;
