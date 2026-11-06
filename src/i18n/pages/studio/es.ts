import type { StudioCopy } from './en';

export const es = {
  meta: {
    crumb: 'Estudio de Juegos',
    title: 'Estudio de Juegos: el juego que creamos',
    metaDescription:
      'El Estudio de Juegos de Numeric Oasis crea Kindelve, un descenso a mazmorras con colección de criaturas que se juega en el navegador. En prueba abierta.',
    description:
      'El Estudio de Juegos de Numeric Oasis es la rama de videojuegos de Numeric Oasis Technologies, con sede en Canoas, Brasil. Está creando Kindelve, un descenso a mazmorras con colección de criaturas que funciona en el navegador, en cualquier móvil u ordenador.',
  },
  hero: {
    eyebrow: 'Estudio de Juegos de Numeric Oasis',
    headline: 'Hacemos juegos como hacemos apps.',
    lede: 'Pequeños, terminados y pensados para funcionar en el aparato que la persona ya tiene. El estudio tiene un juego en prueba abierta y una lista larga de cosas que no va a hacerte.',
  },
  why: {
    eyebrow: 'Por qué un estudio',
    headline: 'La misma empresa, otro oficio.',
    paragraphs: [
      'Numeric Oasis Technologies crea apps en Forge para Jira y Confluence Cloud desde 2011. El Estudio de Juegos es una rama aparte bajo el mismo techo: las mismas personas, el mismo nivel de ingeniería, dirigidos a algo que nadie tiene que instalar.',
      'Un juego es una prueba más dura de la misma disciplina. A una app se le perdona una página lenta; a un juego no se le perdona un fotograma perdido. Por eso el estudio trabaja como el resto de la casa: en entregas pequeñas que salen de verdad, con la simulación cubierta por pruebas y el contenido como datos, no como código.',
    ],
  },
  game: {
    eyebrow: 'En prueba abierta',
    name: 'Kindelve',
    tagline: 'Vierte criaturas en una grieta y decide cuánto de profundo es bastante.',
    paragraphs: [
      'Eres el Warden de una grieta en el suelo. Envías criaturas hacia abajo, ellas pelean solas para bajar más, y tú decides qué baja, qué lleva y cuándo parar. Un descenso dura minutos. Lo que deja atrás dura semanas.',
      'Por debajo hay cerca de novecientas criaturas que conocer, linajes que evolucionan a medida que la profundidad los reescribe, veintidós keystones que cambian lo que la criatura está haciendo en lugar de cuánto hace, y un Trial diario en el que todos los Warden bajan a la misma profundidad y la tabla se resuelve con pruebas y no con confianza.',
    ],
    factsHeading: 'En resumen',
    facts: [
      { label: 'Dónde', value: 'Cualquier navegador actual, móvil u ordenador. Nada que instalar' },
      { label: 'Estado', value: 'Prueba abierta, con novedades casi cada semana' },
      { label: 'Idiomas', value: 'Inglés, portugués, español, francés y japonés' },
      { label: 'Precio', value: 'Gratis, sin publicidad y sin nada que comprar' },
    ],
    play: 'Jugar a Kindelve',
    docs: 'Leer la documentación',
  },
  principles: {
    eyebrow: 'Cómo está hecho',
    headline: 'Cuatro compromisos, escritos en el código y no en una promesa.',
    items: [
      {
        title: 'La profundidad es la misma para todos',
        body: 'La simulación usa números enteros, un generador con semilla y ningún reloj, así que el mismo descenso da el mismo resultado en cualquier aparato. Eso es lo que permite a la tabla diaria aceptar una puntuación ejecutándola otra vez, en lugar de creer en tu palabra.',
      },
      {
        title: 'El dinero compra tiempo y vanidad, nunca poder',
        body: 'Hoy no hay nada que comprar. Cuando lo haya, acortará un camino que ya podías recorrer, y nunca será un camino que solo reciba quien paga. La regla la verifica una prueba, no la guarda un documento.',
      },
      {
        title: 'Hecho para un móvil de gama media',
        body: 'Seis pisos de criaturas animadas, efectos y números a la vez es fácil en un ordenador y de verdad difícil en un móvil, así que el móvil es el objetivo del diseño y el ordenador se queda con lo que sobra. Vertical primero, alcance del pulgar y ningún gesto que necesite ratón.',
      },
      {
        title: 'Cinco idiomas, y no al final de la cola',
        body: 'Todo el texto que lee quien juega sale en los cinco idiomas a la vez, comprobado por una verificación que falla cuando falta alguno. Los nombres de las criaturas se quedan en inglés en todos ellos, porque son nombres y no palabras.',
      },
    ],
  },
  next: {
    eyebrow: 'Qué viene ahora',
    headline: 'En construcción ahora mismo.',
    items: [
      'Una cuenta y una partida guardada en todos los aparatos, con entrada por enlace de correo o con Google, y un nombre para tu Warden. La partida que ya tienes se adopta, no se sustituye.',
      'Un servidor que guarda el progreso y prueba un descenso ejecutándolo otra vez, para que un navegador perdido deje de costar un mes y una tabla merezca confianza.',
      'Aplicaciones para móvil y después Steam, desde la misma versión. El juego se escribe una vez y cada plataforma es una carcasa fina a su alrededor.',
    ],
  },
  cta: {
    heading: 'Baja y míralo.',
    body: 'Funciona en la misma pestaña en la que estás leyendo esto, no hay nada que instalar, y el primer descenso lleva unos dos minutos.',
    play: 'Jugar a Kindelve',
    docs: 'Leer la documentación',
    contact: 'Hablar con el estudio',
  },
} as const satisfies StudioCopy;
