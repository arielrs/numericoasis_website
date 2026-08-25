import type { OnBudgetCopy } from './en';

export const es = {
  meta: {
    crumb: 'OnBudget',
    title: 'OnBudget: control de presupuesto e informes de costo para Jira',
  },
  hero: {
    eyebrow: 'App del Atlassian Marketplace para Jira Cloud',
    headline: 'Control de presupuesto e informes de costo para Jira.',
    ctaSecondary: 'Mira cómo se construye un informe',
  },
  problem: { eyebrow: 'El hueco' },
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
    lede: 'Nueve tipos de gadget, cada uno con sus formatos de gráfico. Arrastra uno a otro hueco, redimensiónalo desde la esquina, clónalo, elimínalo, o cámbialo entre barra, línea, área, tarta, dona, tabla y número simple. Guarda el diseño cuando se lea como tú piensas.',
  },
  sharing: {
    eyebrow: 'Compartir',
    headline: 'Un informe compartido respeta a quien lo lee, no a quien lo creó.',
    body: 'La mayoría de las herramientas de informes entrega una fotografía de lo que veía el autor. OnBudget no. Cuando alguien abre un informe que compartiste, se recalcula con sus propios permisos de Jira, así que nadie ve elementos de trabajo que no pudiera abrir ya en Jira. Si quien lo lee no tiene acceso a parte del alcance, el informe lo dice en lugar de mostrar en silencio una cifra más pequeña.',
  },
  scale: {
    eyebrow: 'A escala',
    headline: 'Hecho para el informe número cien, no para el primero.',
    lede: 'Una herramienta de presupuesto es fácil de querer con tres informes abiertos y difícil de sostener con cincuenta. Esto es lo que la app te da cuando el portafolio ya ha crecido.',
  },
  security: {
    eyebrow: 'Seguridad y datos',
    headline: 'Solo lectura, y todo se queda dentro de Atlassian.',
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
    body: 'Está en el Atlassian Marketplace con periodo de prueba gratuito, y ahí es donde vive el precio actual. Si prefieres hablarlo, atendemos en inglés, portugués y español.',
    primary: 'Instalar desde el Atlassian Marketplace',
    secondary: 'Hacernos una pregunta',
  },
  alsoSee: {
    eyebrow: 'También nuestras',
    headline: 'Cinco apps más para Jira y Confluence.',
    link: 'Ver las seis apps',
  },
} as const satisfies OnBudgetCopy;
