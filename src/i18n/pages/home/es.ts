import type { HomeCopy } from './en';

export const es = {
  meta: {
    title: 'Apps Forge para Jira y Confluence Cloud',
    metaDescription:
      'Socia del Atlassian Marketplace, con apps para Jira y Confluence Cloud. Sigue todos los presupuestos de Jira en una sola pantalla con OnBudget.',
    description:
      'Numeric Oasis es socia en el Atlassian Marketplace y construye apps en Forge para Jira y Confluence Cloud. OnBudget convierte el trabajo ya registrado en Jira en presupuestos, pronósticos e informes de costo, y cada app que publicamos funciona dentro de tu propio entorno de Atlassian.',
  },
  hero: {
    eyebrow: 'Socia en el Atlassian Marketplace',
    headline: 'Las apps de Jira y Confluence que siempre quisimos que existieran.',
    lede: 'Quince años dentro de Jira y Confluence nos enseñaron qué tienen que esquivar los equipos todos los días. Ahora construimos las apps que hacen ese trabajo por ellos, y cada una funciona dentro de tu propio entorno de Atlassian.',
    primary: 'Ver nuestras apps',
    secondary: 'Cómo construimos',
    iconsLabel: 'Nuestras apps',
  },
  proof: {
    label: 'Hecho para generar confianza',
    items: [
      'Construido en Atlassian Forge',
      'Tus datos nunca salen de Atlassian',
      'Ningún servidor de terceros que revisar',
      'Para Jira y Confluence Cloud',
      'Prueba gratuita en cada app de pago',
      'Soporte en inglés, portugués y español',
    ],
  },
  focus: {
    eyebrow: 'OnBudget, para Jira Cloud',
    headline: 'Todos los presupuestos de Jira en una sola pantalla.',
    lede: 'Presupuestado frente a real, salud y pronóstico, a partir del trabajo que tu equipo ya registra en Jira. Presupuestos de entrega, producto y marketing uno al lado del otro, cada uno en su moneda, y ningún campo personalizado nuevo que rellenar.',
    custom: {
      title: 'Da forma al informe, y luego a la pantalla.',
      report: 'Tú decides qué cubre el informe: espacios completos, elementos de trabajo elegidos por clave o por texto, o una consulta JQL. Tú fijas el presupuesto y su moneda, los dos umbrales que lo ponen en riesgo y luego por encima del presupuesto, y los formatos de número y fecha en que se lee.',
      dashboard: 'Después el panel es tuyo para reorganizar. Arrastra un gadget a otro hueco, redimensiónalo desde la esquina, clónalo o elimínalo, cámbialo entre barra, línea, área, circular, de anillo, tabla y número simple, y guarda el diseño cuando se lea como tú piensas.',
    },
    ctaPrimary: 'Mira lo que hace OnBudget',
    ctaSecondary: 'Ver en el Marketplace',
  },
  portfolio: {
    eyebrow: 'Las apps',
    headline: 'Apps para Jira y Confluence Cloud.',
    lede: 'Descubre cuánto cuesta tu trabajo. Mantén Confluence gobernable. Mantén Jira ordenado. Cada app hace uno de esos trabajos de principio a fin, y vienen más.',
  },
  how: {
    eyebrow: 'Dentro de Atlassian',
    headline: 'Todo lo que construimos funciona dentro de tu propio entorno de Atlassian.',
    paragraphs: [
      'Cada app que publicamos funciona sobre Atlassian Forge, así que el código se ejecuta dentro de la infraestructura de Atlassian y tus datos se quedan en tu propio entorno de Atlassian. Eso responde la mayor parte de una revisión de seguridad antes de que empiece: no hay un host de terceros que evaluar, no hay nada saliendo de Atlassian que documentar, y no hay un tiempo de actividad aparte del que depender.',
      'Cada app pide los permisos que necesita para hacer su trabajo, y cada una publica exactamente qué guarda en su propia página. Nuestra página Nosotros los lista todos en una sola tabla, para que lo verifiques antes de instalar y no después.',
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
    body: 'Cada app de pago viene con prueba gratuita, y la que es gratis empieza a funcionar en el momento en que la instalas. Si prefieres hablarlo con una persona primero, atendemos en tres idiomas.',
    primary: 'Ver nuestras apps',
    secondary: 'Hacernos una pregunta',
  },
} as const satisfies HomeCopy;
