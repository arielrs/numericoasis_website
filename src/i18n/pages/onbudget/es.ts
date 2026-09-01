import type { OnBudgetCopy } from './en';

export const es = {
  meta: {
    crumb: 'OnBudget',
    title: 'OnBudget: presupuesto e informes de costo en Jira',
  },
  hero: {
    eyebrow: 'App del Atlassian Marketplace para Jira Cloud',
    headline: 'Presupuesto e informes de costo en Jira, para finanzas y PMO.',
    lede: 'OnBudget convierte en dinero el trabajo que tu equipo ya registra en Jira. Antes que nada analiza una muestra de tus datos y te dice qué parte de tus elementos de trabajo lleva cada señal de costo, para que sepas qué sostienen realmente tus datos antes de armar un presupuesto sobre ellos.',
    ctaSecondary: 'Mira cómo se construye un informe',
  },
  problem: { eyebrow: 'El problema' },
  steps: {
    eyebrow: 'Cómo funciona',
    headline: 'Cuatro pasos desde un espacio de Jira hasta un presupuesto que puedes defender.',
  },
  methods: {
    eyebrow: 'Costeo',
    headline: 'Elige la señal que tu equipo ya produce.',
    lede: 'La parte difícil de costear el trabajo en Jira no es la aritmética. Es que cada equipo mide algo distinto, y la mitad no mide nada. OnBudget analiza tus datos y te muestra qué porcentaje de tus elementos de trabajo lleva cada señal, antes de que construyas nada encima.',
  },
  dashboard: {
    eyebrow: 'Paneles',
    headline: 'El panel es tuyo para reorganizarlo.',
    lede: 'Nueve tipos de gadget, cada uno con sus formatos de gráfico. Arrastra uno a otro hueco, redimensiónalo desde la esquina, clónalo, elimínalo, o cámbialo entre barra, línea, área, circular, de anillo, tabla y número simple. Guarda el diseño cuando se lea como tú piensas.',
  },
  sharing: {
    eyebrow: 'Compartir',
    headline: 'Un informe compartido respeta a quien lo lee, no a quien lo creó.',
    body: 'Cuando alguien abre un informe que compartiste, se recalcula con sus propios permisos de Jira, así que nadie ve elementos de trabajo que no pudiera abrir ya en Jira. La mayoría de las herramientas de informes entrega una fotografía de lo que veía el autor. Y si quien lo lee no tiene acceso a parte del alcance, el informe lo dice en la propia página, en lugar de mostrar una cifra más pequeña sin explicar por qué.',
  },
  scale: {
    eyebrow: 'A escala',
    headline: 'Hecho para el informe número cien, no para el primero.',
    lede: 'Una herramienta de presupuesto es fácil de querer con tres informes abiertos y difícil de sostener con cincuenta. Esto es lo que la app te da cuando el portafolio ya ha crecido.',
  },
  security: {
    eyebrow: 'Seguridad y datos',
    headline: 'Los datos de tu Jira se quedan en tu Jira.',
    scopes: 'Permisos solicitados',
  },
  languages: {
    eyebrow: 'Idiomas',
    headline: 'Habla el idioma en el que tu equipo rinde cuentas.',
    body: 'Toda la interfaz está disponible en inglés, portugués y español, y cada informe lleva su propia moneda, su formato de número y su formato de fecha. Un presupuesto en pesos se lee como un presupuesto en pesos, y no como una hoja de cálculo estadounidense con los separadores cambiados.',
  },
  faq: {
    eyebrow: 'Preguntas',
    headline: 'Lo que la gente pregunta antes de instalarla.',
  },
  cta: {
    headline: 'Instálala, o pregúntanos antes.',
    body: 'Está en el Atlassian Marketplace con prueba gratuita, así que puedes apuntarla a un proyecto real y ver tus propios números antes de decidir. Si prefieres hablarlo antes, atendemos en inglés, portugués y español.',
    primary: 'Pruébalo gratis en el Atlassian Marketplace',
    secondary: 'Hacernos una pregunta',
  },
  alsoSee: {
    eyebrow: 'Nuestras otras apps',
    headline: 'El resto de lo que hacemos.',
    link: 'Ver todas nuestras apps',
  },
} as const satisfies OnBudgetCopy;
