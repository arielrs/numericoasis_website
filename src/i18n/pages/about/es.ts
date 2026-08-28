import type { AboutCopy } from './en';

export const es = {
  meta: {
    crumb: 'Nosotros',
    title: 'Nosotros',
    description:
      'Numeric Oasis es socia en el Atlassian Marketplace y construye apps en Forge para Jira y Confluence Cloud, desde Canoas, Brasil. Cómo construimos, qué guarda cada app y cómo contactarnos.',
  },
  hero: {
    eyebrow: 'Sobre Numeric Oasis',
    headline: 'El equipo detrás de las apps.',
    lede: 'Construimos y damos soporte a apps en Forge para Jira y Confluence Cloud. Equipo pequeño, foco estrecho, y una negativa deliberada a ejecutar nada fuera de la infraestructura de Atlassian.',
  },
  standing: {
    eyebrow: 'Dónde estamos',
    headline: 'Socia en el Atlassian Marketplace.',
    paragraphs: [
      'Todo lo que publicamos pasa por el Atlassian Marketplace, lo que significa que Atlassian se encarga de las licencias, la facturación y la distribución, y tú compras nuestras apps igual que cualquier otra. Nuestra página de proveedor lista todo lo que hemos publicado.',
      'No tenemos un nivel de partner, y no vamos a insinuar que lo tengamos. Lo que sí tenemos es el distintivo Runs on Atlassian en cada app que publicamos, que es una afirmación sobre dónde se ejecuta el código y no un premio comercial.',
    ],
    link: 'Nuestra página en el Marketplace',
  },
  build: {
    eyebrow: 'Cómo construimos',
    headline: 'Solo Forge, con los permisos más estrechos que funcionen.',
    paragraphs: [
      'Forge significa que nuestro código se ejecuta dentro de Atlassian y no en una infraestructura nuestra. No hay un host de terceros que tu equipo de seguridad tenga que evaluar, no hay salida de datos que documentar, y no hay nada tuyo en una base de datos que nosotros operemos.',
      'Los permisos siguen el mismo principio. Pedimos los alcances más estrechos que sirvan para el trabajo, y decimos, app por app, qué guarda cada una realmente. Una promesa única de privacidad para toda una gama de apps siempre es falsa para al menos una de ellas, así que no la hacemos.',
    ],
  },
  dataTable: {
    eyebrow: 'Qué guarda cada app',
    headline: 'App por app, en lenguaje claro.',
    lede: 'La mayoría de nuestras apps no guardan nada sobre tu contenido. Las excepciones están en la tabla, y cada una es deliberada: una aceptación que no dice quién aceptó no es una aceptación, y un registro de auditoría que no dice quién hizo el cambio no es un registro de auditoría.',
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
    intro: 'El nombre tiene dos mitades, y las dos son intencionadas.',
    numericLabel: 'Numeric',
    numeric:
      'es el lado de ingeniería. Rigor, datos en los que se puede confiar, decisiones apoyadas en algo más que una corazonada. Es lo que nos vuelve cuidadosos con los detalles que deciden si una plataforma sigue funcionando en el tercer año: el rastro de auditoría que prueba qué cambió, la comprobación de permisos que aguanta cuando alguien comparte un informe, la limpieza de campos que no rompe un esquema de pantallas.',
    oasisLabel: 'Oasis',
    oasis:
      'es lo que queremos que las apps se sientan. La mayoría de los administradores de Atlassian que nos encuentran ya están enterrados: demasiadas apps, demasiadas configuraciones a medias, demasiados proveedores a los que no consiguen poner en una llamada. Intentamos ser lo contrario. Alcance estrecho, afirmaciones honestas incluido el no honesto, y contacto directo con quien escribe el código.',
    close: 'Software que deja tranquila la parte técnica. Esa es toda la marca.',
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
