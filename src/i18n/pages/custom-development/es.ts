import type { CustomDevCopy } from './en';

export const es = {
  meta: {
    crumb: 'Desarrollo a medida',
    title: 'Desarrollo de software a medida',
    metaDescription:
      'Aplicaciones web, integraciones y herramientas internas, en entregas pequeñas con pruebas y documentación. Software a medida de Numeric Oasis.',
    description:
      'Numeric Oasis crea aplicaciones web a medida, integraciones entre los sistemas que ya pagas, herramientas internas y sitios en varios idiomas. Entregas pequeñas, una prueba para cada corrección y documentación que tu equipo puede leer, desde Canoas, Brasil.',
  },
  hero: {
    eyebrow: 'Desarrollo a medida',
    headline: 'Software hecho para tu forma de trabajar.',
    lede: 'El producto que compraste cubre la mayor parte del trabajo. El resto es donde tu equipo pierde la semana: la exportación que alguien hace a mano cada viernes, los dos sistemas que no se ponen de acuerdo sobre el mismo cliente, la hoja de cálculo que nadie se atreve a tocar. Nosotros creamos el software que cierra ese hueco.',
    primary: 'Cuéntanos qué necesitas',
    secondary: 'Cómo trabajamos',
  },
  build: {
    eyebrow: 'Qué creamos',
    headline: 'Cuatro tipos de trabajo, todos terminados.',
    items: [
      {
        title: 'Aplicaciones web',
        body: 'Portales para clientes, flujos de pedido y de reserva, y paneles con los números con los que tu equipo decide de verdad. Pensadas primero para el navegador, así que no hay nada que instalar ni que mantener actualizado en el ordenador de nadie.',
      },
      {
        title: 'Integraciones',
        body: 'La conexión entre dos sistemas que ya pagas, hecha para tu modelo de datos y no para el de un proveedor, con los reintentos, los registros y la conciliación que la hacen fiable a las tres de la madrugada.',
      },
      {
        title: 'Herramientas internas',
        body: 'La pequeña aplicación que sustituye a la hoja de cálculo que todos temen editar. Parte de esa hoja, conserva lo que funciona en ella y añade la validación, el historial y los permisos que nunca tuvo.',
      },
      {
        title: 'Sitios y plataformas de contenido',
        body: 'Sitios estáticos rápidos en varios idiomas, con comprobaciones en el build que se niegan a publicar un enlace roto, una traducción que falta o un color ilegible. Este sitio es uno de ellos.',
      },
    ],
  },
  how: {
    eyebrow: 'Cómo trabajamos',
    headline: 'Entregas pequeñas, pruebas de verdad, ninguna sorpresa.',
    steps: [
      {
        title: 'Acotar lo más pequeño que sea útil',
        body: 'Empezamos por la versión que ya merece la pena por sí sola, y dejamos por escrito lo que queda fuera. Una lista corta de lo que no vamos a construir es lo más útil que puede contener un alcance.',
      },
      {
        title: 'Entregarlo en semanas',
        body: 'La primera versión llega pronto a quien la va a usar. Lo que hace con ella decide la siguiente versión con más fiabilidad que cualquier plan escrito antes de que la tuviera.',
      },
      {
        title: 'Cada corrección trae su prueba',
        body: 'Un error se corrige escribiendo primero una prueba que falla por su culpa, y después haciendo que esa prueba pase. La prueba se queda, y por eso el mismo error no vuelve.',
      },
      {
        title: 'Documentado sobre la marcha',
        body: 'Cada entrega dice qué cambió y qué no. Cuando el proyecto termina, tu equipo hereda un software que puede leer, y no una caja negra con nuestro teléfono pegado.',
      },
    ],
  },
  proof: {
    eyebrow: 'Lo que hemos entregado',
    headline: 'Nuestros propios productos son el portafolio.',
    paragraphs: [
      'Construimos nuestros productos como construiríamos los tuyos, y son públicos, así que puedes juzgar el trabajo en sí y no una descripción de él.',
      'Seis apps en Forge en el Atlassian Marketplace, cada una documentada en nuestra wiki. Este sitio, en tres idiomas, con comprobaciones en el build que impiden que un enlace roto, una traducción que falta o un color ilegible lleguen a publicarse. Y Kindelve, un juego de navegador cuya simulación da la misma respuesta en cualquier aparato, y cuyo servidor demuestra una puntuación de la clasificación volviendo a jugar la partida.',
    ],
    apps: 'Nuestras apps en el Marketplace',
    studio: 'El Estudio de Juegos',
  },
  posts: {
    eyebrow: 'Del blog',
    headline: 'Apuntes sobre construir software.',
    link: 'Todos los artículos de desarrollo a medida',
  },
  cta: {
    heading: 'Cuéntanos qué estás sorteando.',
    body: 'Describe el trabajo que tus herramientas actuales dejan sin hacer, en español, inglés o portugués. Te responde una persona que construye software, no una cola de ventas.',
    primary: 'Hablemos',
  },
} as const satisfies CustomDevCopy;
