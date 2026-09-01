import type { PrivacyCopy } from './en';

export const es = {
  meta: {
    crumb: 'Privacidad',
    title: 'Política de privacidad de este sitio',
    metaDescription:
      'Qué recoge numericoasis.com y quién lo procesa. Analítica sin cookies siempre, y medición de anuncios que puedes apagar.',
    description:
      'Qué recoge numericoasis.com, qué no recoge y qué procesadores intervienen. La analítica es sin cookies y siempre está activa. Puedes apagar la medición de anuncios cuando quieras, y nunca empieza sin consentimiento donde la ley exige consentimiento primero. Cada app tiene su propia política de privacidad, aparte de esta.',
  },
  hero: {
    eyebrow: 'Privacidad',
    headline: 'Qué recoge este sitio, y qué no.',
    lede: 'En resumen: ninguna cuenta, ningún formulario, ningún perfil. Analítica sin cookies siempre, y medición de anuncios bajo tu control.',
  },
  updated: 'Última actualización',
  updatedDate: '2026-09-01',
  scope: {
    heading: 'Qué cubre esta política',
    body: 'Esta política cubre numericoasis.com, el sitio que estás leyendo. No cubre lo que hacen nuestras apps dentro de tu sitio de Atlassian. Cada app guarda cosas distintas y se revisa por separado, así que cada una publica su propia política de privacidad.',
    linkLabel: 'Políticas de privacidad de las apps',
    linkHref: '/documentation/',
  },
  sections: [
    {
      heading: 'No te pedimos nada',
      body: 'No hay cuenta que crear, ni boletín al que suscribirse, ni formulario de contacto. El sitio es un conjunto de archivos estáticos. Si quieres hablar con nosotros, envías un correo o abres una solicitud de soporte, y en ambos casos eres tú quien decide qué contar.',
    },
    {
      heading: 'Analítica, siempre activa y sin cookies',
      body: 'Usamos Cloudflare Web Analytics en todas las páginas. No coloca cookies, no guarda ningún identificador en tu dispositivo y no te sigue entre sitios. Informa recuentos agregados: qué páginas se vieron, aproximadamente de dónde vinieron las visitas y a qué velocidad cargaron las páginas. No podemos identificar a nadie a partir de eso, y Cloudflare tampoco lo haría por nosotros.',
    },
    {
      heading: 'Medición de anuncios, y la elección que tienes',
      body: 'Cuando anunciamos necesitamos saber cuáles de esos anuncios llevan a algo. Si lo permites, cargamos la etiqueta de Google, que coloca cookies e informa a Google Analytics y a Google Ads de que llegó una visita y de que alguien pasó a una de nuestras fichas del Atlassian Marketplace. Donde la ley exige consentimiento primero, que para nosotros son el Espacio Económico Europeo, el Reino Unido, Suiza y Brasil, no se guarda nada hasta que digas que sí: si ignoras el aviso allí, la etiqueta funciona sin almacenamiento, contando que algo ocurrió sin guardar nada en tu dispositivo ni identificarte. En el resto empieza activa y el aviso la apaga, así que si eliges Ahora no, dejamos de medir y borramos las cookies de Google ya colocadas. Puedes reabrir esa elección cuando quieras con el botón de abajo.',
    },
    {
      heading: 'Qué vemos y qué no vemos sobre una instalación',
      body: 'La instalación de una app ocurre en el Atlassian Marketplace, que es un sitio de Atlassian, no nuestro. Nunca la vemos ocurrir. Lo que vemos es que alguien salió de nuestra página hacia una ficha. Añadimos parámetros a esos enlaces de salida para que el Marketplace pueda decirnos cuál de nuestras páginas envió al visitante, y esos parámetros describen la página, no a la persona.',
    },
    {
      heading: 'Registros del servidor',
      body: 'El sitio está alojado en GitHub Pages y se sirve a través de Cloudflare. Ambos guardan registros operativos de corta duración, que normalmente incluyen una dirección IP, por seguridad y prevención de abusos. No tenemos acceso a esos registros y no los recibimos.',
    },
    {
      heading: 'Correo y soporte',
      body: 'Si escribes a contact@numericoasis.com guardamos el mensaje mientras la conversación sea útil y lo usamos para responderte. Si abres una solicitud de soporte, vive en nuestro proyecto de Jira Service Management, que es un servicio de Atlassian Cloud, y se conserva como parte del historial de soporte de esa app.',
    },
    {
      heading: 'Quién procesa datos por nosotros',
      body: 'Cloudflare, para analítica y entrega. GitHub, para alojamiento. Google, para medición de anuncios, que puedes apagar. Atlassian, para el portal de soporte y el Marketplace. No vendemos datos, y no hay ninguna red publicitaria en este sitio más allá de la etiqueta de Google descrita arriba.',
    },
    {
      heading: 'Tus derechos',
      body: 'Bajo el RGPD y la LGPD puedes preguntar qué tenemos sobre ti, pedir una copia, pedir que lo corrijamos o pedir que lo borremos. Para este sitio la respuesta honesta casi siempre es que no tenemos nada, porque nunca recogimos nada que te identifique. Cuando sí tenemos algo, es un hilo de correo o una solicitud de soporte que abriste tú. Escribe a contact@numericoasis.com y respondemos en un plazo de treinta días.',
    },
    {
      heading: 'Menores',
      body: 'Estas son herramientas de trabajo para administradores de Atlassian. El sitio no está dirigido a menores y no recogemos nada de ellos a sabiendas.',
    },
    {
      heading: 'Cambios',
      body: 'Cuando esta política cambie, cambiamos la fecha en la parte superior de la página. Si el cambio es relevante, por ejemplo si empezamos a recoger algo nuevo, lo diremos en la página en lugar de editarla en silencio.',
    },
  ],
  manage: {
    heading: 'Cambiar de opinión',
    body: 'Reabre el aviso de cookies y elige otra vez. Elegir Ahora no también borra las cookies de Google ya colocadas.',
    cta: 'Gestionar cookies',
  },
  contact: {
    heading: 'Dudas sobre cualquiera de estos puntos',
    body: 'Escríbenos. Una pregunta sobre privacidad va a una persona, no a una cola.',
    cta: 'Escríbenos',
    subject: 'Consulta sobre privacidad',
  },
} as const satisfies PrivacyCopy;
