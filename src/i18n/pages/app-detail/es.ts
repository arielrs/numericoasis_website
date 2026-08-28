import type { AppDetailCopy } from './en';

export const es = {
  backToApps: 'Todas las apps',
  eyebrow: 'App del Atlassian Marketplace',
  install: 'Instalar desde el Atlassian Marketplace',
  installShort: 'Instalar desde el Marketplace',
  docs: 'Documentación',
  talkToUs: 'Hacernos una pregunta',
  valueProps: {
    eyebrow: 'Por qué',
    headline: 'Lo que los equipos realmente obtienen.',
  },
  features: {
    eyebrow: 'Funcionalidades clave',
    headline: 'Qué trae la app.',
  },
  audiences: {
    eyebrow: 'Pensado para',
    headline: 'Las personas que sacan el máximo provecho.',
  },
  gallery: {
    eyebrow: 'Míralo en acción',
    headlineSuffix: 'en detalle.',
    enlarge: 'Haz clic para ampliar',
    close: 'Cerrar',
    openLabel: 'Abrir captura de pantalla',
  },
  data: {
    eyebrow: 'Datos y permisos',
    headline: 'Qué ve la app, y qué guarda.',
    scopes: 'Permisos solicitados',
  },
  cta: {
    headlinePrefix: 'Listo para probar',
    bodyFree: 'Es gratis en el Atlassian Marketplace. Instálala y verás resultados en minutos.',
    bodyPaid: 'Instálala desde el Atlassian Marketplace, que es donde vive el precio actual, o pregúntanos antes lo que quieras.',
  },
} as const satisfies AppDetailCopy;
