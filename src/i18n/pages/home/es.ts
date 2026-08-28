import type { HomeCopy } from './en';

export const es = {
  meta: {
    title: 'Apps Forge para Jira y Confluence Cloud',
    metaDescription:
      'Socia del Atlassian Marketplace, creando apps Forge para Jira y Confluence Cloud, con la atención puesta en OnBudget: presupuestos, pronósticos y costos.',
    description:
      'Numeric Oasis es socia en el Atlassian Marketplace y construye apps en Forge para Jira y Confluence Cloud. Ahora mismo la mayor parte de nuestra atención está en OnBudget, que convierte el trabajo ya registrado en Jira en presupuestos, pronósticos e informes de costo.',
  },
  hero: {
    eyebrow: 'Socia en el Atlassian Marketplace',
    headline: 'Las apps de Atlassian que siempre quisimos que existieran.',
    lede: 'Quince años dentro de Jira y Confluence nos enseñaron dónde están los huecos, sobre todo viendo a los equipos esquivar siempre los mismos. Ahora construimos las apps que los cierran, y cada una funciona dentro de Atlassian y no junto a ella.',
    primary: 'Ver lo que hacemos',
    secondary: 'Cómo trabajamos',
    iconsLabel: 'Nuestras apps',
  },
  proof: {
    label: 'Cómo están construidas nuestras apps',
    items: [
      'Runs on Atlassian',
      'Hecho en Forge',
      'Solo Cloud',
      'Solo lectura siempre que se puede',
      'Jira y Confluence',
      'Soporte en tres idiomas',
    ],
  },
  focus: {
    eyebrow: 'Dónde está nuestra atención ahora',
    headline: 'Jira sabe qué pasó. No sabe cuánto costó.',
    body: 'Los datos de entrega viven en Jira. El dinero vive en una hoja de cálculo que alguien exporta el viernes y que el lunes ya está mal. Peor todavía: los equipos que nunca adoptaron puntos de historia ni registros de horas ni siquiera aparecen en esa hoja.',
    body2: 'OnBudget es la app que más estamos empujando en este momento, porque creemos que es la que resuelve el problema más grande. Convierte el trabajo que tu equipo ya registra en presupuestos, pronósticos e informes de costo, sin pedirle a nadie que rellene un campo nuevo.',
    link: 'Mira lo que hace OnBudget',
  },
  portfolio: {
    eyebrow: 'Las apps',
    headline: 'Apps para Jira y Confluence Cloud.',
    lede: 'Cada una cierra un hueco que el producto anfitrión deja abierto. Y vienen más.',
  },
  how: {
    eyebrow: 'Cómo trabajamos',
    headline: 'Solo Forge, y es una restricción deliberada.',
    paragraphs: [
      'Cada app que publicamos funciona sobre Atlassian Forge, lo que significa que se ejecuta dentro de la infraestructura de Atlassian y no en un servidor nuestro. No hay un tercero que tu equipo de seguridad tenga que revisar, no hay salida de datos que documentar, y no hay un tiempo de actividad aparte del que preocuparse.',
      'También significa que pedimos los permisos más estrechos que sirvan para el trabajo. La mayoría de nuestras apps solo leen. Las que escriben dicen exactamente qué escriben y por qué, en sus propias páginas, porque una promesa genérica de privacidad que es falsa para una app es peor que ninguna promesa.',
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
    body: 'Cada app de pago tiene periodo de prueba gratuito, y la que es gratis ni siquiera lo necesita. Si prefieres hablar con una persona antes de instalar nada, también funciona.',
    primary: 'Ver lo que hacemos',
    secondary: 'Hacernos una pregunta',
  },
} as const satisfies HomeCopy;
