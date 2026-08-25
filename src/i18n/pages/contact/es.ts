import type { ContactCopy } from './en';

export const es = {
  meta: {
    crumb: 'Contacto',
    title: 'Contacto',
    description:
      'El soporte de todas las apps de Numeric Oasis pasa por nuestro portal de Jira Service Management. Las consultas de preventa, evaluación y alianzas van a contact@numericoasis.com. Atendemos en inglés, portugués y español.',
  },
  hero: {
    eyebrow: 'Contacto',
    headline: 'Dos caminos, según lo que necesites.',
    lede: 'Atendemos en inglés, portugués y español.',
  },
  support: {
    label: 'Ya usas una de nuestras apps',
    headline: 'El soporte pasa por el portal.',
    body: 'Abre la solicitud en nuestro portal de Jira Service Management, no por correo. Allí la petición se convierte en un ticket, entra en una cola y deja historial, que es justo lo que quieres cuando algo se rompe. El portal cubre las seis apps.',
    cta: 'Abrir una solicitud de soporte',
    includeTitle: 'Con estos datos solemos ahorrarnos una ida y vuelta',
    include: [
      'La URL de tu sitio de Atlassian',
      'Qué app, y la versión que aparece en su anuncio del Marketplace',
      'Qué esperabas que pasara',
      'Qué pasó en su lugar, con una captura de pantalla si hay algo que capturar',
    ],
  },
  sales: {
    label: 'Evaluando, o dándole vueltas',
    headline: 'La preventa la atiende una persona.',
    body: 'Dudas sobre si una app encaja, qué puede medir, cómo maneja los permisos, licenciamiento por volumen o alianzas: escríbenos. Respondemos en un día hábil.',
    cta: 'Escríbenos',
    subject: 'Consulta sobre vuestras apps de Atlassian',
    includeTitle: 'Conviene mencionar',
    include: [
      'Qué app o qué problema quieres resolver',
      'Jira, Confluence, o ambos',
      'Más o menos cuántas personas la usarían',
      'Qué has intentado ya',
    ],
  },
  elsewhere: {
    label: 'En otros sitios',
    marketplace: 'Nuestras apps en el Atlassian Marketplace',
    linkedin: 'Numeric Oasis en LinkedIn',
    location: 'Dónde estamos',
  },
} as const satisfies ContactCopy;
