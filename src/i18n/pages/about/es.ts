import type { AboutCopy } from './en';

export const es = {
  meta: {
    crumb: 'Nosotros',
    title: 'Sobre nosotros, y qué guarda cada app',
    metaDescription:
      'Quién construye nuestras apps del Atlassian Marketplace, cómo funcionan dentro de Atlassian y qué guarda cada app. La página para tu equipo de seguridad.',
    description:
      'Numeric Oasis es socia en el Atlassian Marketplace y construye apps en Forge para Jira y Confluence Cloud, desde Canoas, Brasil. Cómo construimos, qué guarda cada app y cómo contactarnos.',
  },
  hero: {
    eyebrow: 'Sobre Numeric Oasis',
    headline: 'El equipo detrás de las apps.',
    lede: 'Construimos y damos soporte a apps en Forge para Jira y Confluence Cloud. Todas funcionan dentro de tu propio sitio de Atlassian, llevan el distintivo Runs on Atlassian y las soporta quien escribió el código.',
  },
  standing: {
    eyebrow: 'Dónde estamos',
    headline: 'Socia en el Atlassian Marketplace.',
    paragraphs: [
      'Todo lo que publicamos pasa por el Atlassian Marketplace, lo que significa que Atlassian se encarga de las licencias, la facturación y la distribución, y tú compras nuestras apps igual que cualquier otra. Nuestra página de proveedor lista todo lo que hemos publicado.',
      'Cada app que publicamos lleva el distintivo Runs on Atlassian, la marca de Atlassian para apps cuyo código se ejecuta en Forge dentro de la infraestructura de Atlassian. No hay servidor de proveedor en el camino y nada tuyo sale de tu sitio.',
    ],
    link: 'Nuestra página en el Marketplace',
  },
  build: {
    eyebrow: 'Cómo construimos',
    headline: 'Hecho para pasar tu revisión de seguridad.',
    paragraphs: [
      'Forge significa que nuestro código se ejecuta dentro de la infraestructura de Atlassian y no en un servidor nuestro. Quien revisa no tiene un host de terceros que evaluar, nada saliendo de Atlassian que documentar, y nada tuyo en una base de datos que nosotros operemos. La mayor parte del cuestionario la responde dónde se ejecuta el código.',
      'Los permisos siguen el mismo principio. Cada app pide los alcances que necesita para hacer su trabajo, y cada una dice en su propia página exactamente qué guarda. La tabla de abajo las pone todas una al lado de la otra, para que lo verifiques en un solo lugar.',
    ],
  },
  dataTable: {
    eyebrow: 'Qué guarda cada app',
    headline: 'App por app, en lenguaje claro.',
    lede: 'La mayoría de nuestras apps no guardan nada sobre tu contenido. Las que sí guardan datos personales lo hacen porque el trabajo lo exige: una aceptación que no dice quién aceptó no es una aceptación, y un registro de auditoría que no dice quién hizo el cambio no es un registro de auditoría.',
    columns: {
      app: 'App',
      host: 'Producto',
      personalData: 'Guarda datos personales',
    },
    yes: 'Sí, por diseño',
    no: 'No',
  },
  support: {
    eyebrow: 'Soporte',
    headline: 'Un portal, tres idiomas.',
    body: 'El soporte de todas las apps pasa por el mismo portal de Jira Service Management, así que las solicitudes entran en una cola y no en una bandeja de entrada. Atendemos en inglés, portugués y español.',
    link: 'Abrir el portal de soporte',
  },
  name: {
    eyebrow: 'El nombre',
    headline: 'Por qué Numeric Oasis',
    intro: 'El nombre tiene dos mitades, y las dos significan algo.',
    numericLabel: 'Numeric',
    numeric:
      'es el lado de ingeniería. Rigor, datos en los que se puede confiar, decisiones apoyadas en algo más que una corazonada. Es lo que nos vuelve cuidadosos con los detalles que deciden si una plataforma sigue funcionando en el tercer año: el rastro de auditoría que prueba qué cambió, la comprobación de permisos que aguanta cuando alguien comparte un informe, la limpieza de campos que no rompe un esquema de pantallas.',
    oasisLabel: 'Oasis',
    oasis:
      'es lo que queremos que las apps se sientan. La mayoría de los administradores de Atlassian que nos encuentran ya están enterrados: demasiadas apps, demasiadas configuraciones a medias, demasiados proveedores a los que no consiguen poner en una llamada. Intentamos ser lo contrario. Un trabajo por app, afirmaciones que puedes verificar en el Marketplace, y contacto directo con quien escribe el código.',
    close: 'Software que deja tranquila la parte técnica.',
  },
  where: {
    eyebrow: 'Dónde estamos',
    headlinePrefix: 'Trabajando desde',
    paragraphs: [
      'Nuestros clientes están repartidos por seis continentes, así que la mayor parte de nuestro trabajo es asíncrono y la mayor parte de lo asíncrono es por escrito. Eso da ventanas de respuesta predecibles para todos sin empujar a nadie a una llamada a mala hora.',
    ],
    contactLead: 'Escríbenos a',
    contactMid: 'o a través de nuestra',
    contactLink: 'página de contacto',
  },
} as const satisfies AboutCopy;
