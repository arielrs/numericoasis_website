import type { NotFoundCopy } from './en';

export const es = {
  title: 'Página no encontrada',
  description: 'Esa página no existe en Numeric Oasis.',
  eyebrow: '404',
  headline: 'No pudimos encontrar esa página.',
  body: 'Es posible que el enlace esté desactualizado o que hayamos reorganizado el sitio. Vuelve al inicio o elige una de las secciones de abajo.',
  home: 'Volver al inicio',
  apps: 'Ver los apps',
  blog: 'Leer el blog',
} as const satisfies NotFoundCopy;
