import type { HomeCopy } from './en';

export const es = {
  meta: {
    title: 'Apps para Jira y Confluence: presupuestos',
    metaDescription:
      'Apps para Jira y Confluence Cloud: presupuestado frente a real, mapa de dependencias, registro de auditoría, diseño de páginas y confirmación de lectura.',
    description:
      'Numeric Oasis crea apps del Atlassian Marketplace para Jira y Confluence Cloud, todas hechas en Atlassian Forge. OnBudget lleva el control de presupuesto y los informes de coste, presupuestado frente a real, a partir del trabajo que ya está en Jira. Astrolink dibuja un mapa de dependencias y un grafo de vínculos de los elementos de trabajo. Configuration Monitor mantiene un registro de auditoría de quién cambió los workflows, los permisos y los ajustes de un espacio de Jira. Atelier aporta diseño de páginas, colores de texto y de fondo y banners a Confluence. Expanded Macro Collection añade confirmación de lectura, firmas y estado de página. Numeric Oasis también crea software a medida, ofrece consultoría Atlassian y tiene un estudio de juegos.',
  },
  hero: {
    eyebrow: 'Apps en el Atlassian Marketplace',
    headline: 'Apps para Jira y Confluence Cloud que responden a las preguntas que recibe todo administrador.',
    lede: 'Numeric Oasis crea apps para Jira y Confluence Cloud: control de presupuesto e informes de coste, un mapa de dependencias, un registro de auditoría de los cambios de configuración, macros de diseño de página y confirmación de lectura con estado de página. Todas están hechas en Atlassian Forge y empiezan con una prueba gratuita en el Atlassian Marketplace.',
    primary: 'Ver las apps',
    secondary: 'Nuestras apps en el Atlassian Marketplace',
    questionsLabel: 'Preguntas que responden nuestras apps',
  },
  questions: {
    onbudget: {
      question: '¿Qué presupuestos van bien, cuáles están en riesgo y cuáles se pasaron?',
      answer: 'OnBudget, control de presupuesto para Jira',
    },
    astrolink: {
      question: '¿Qué bloquea este elemento de trabajo, y qué se retrasa con él?',
      answer: 'Astrolink, mapa de dependencias para Jira',
    },
    'configuration-monitor': {
      question: '¿Quién cambió el workflow o los permisos de este espacio?',
      answer: 'Configuration Monitor, registro de auditoría para Jira',
    },
    atelier: {
      question: '¿Cómo hago que una página de Confluence luzca como nuestra marca?',
      answer: 'Atelier, diseño de páginas para Confluence',
    },
    'expanded-macro-collection': {
      question: '¿Quién ha leído y firmado esta política?',
      answer: 'Expanded Macro Collection, firmas de lectura para Confluence',
    },
  },
  proof: {
    label: 'Lo que trae cada app',
    items: [
      'Hecha en Atlassian Forge',
      'Runs on Atlassian',
      'Pruébala gratis en el Marketplace',
      'Documentación y notas de versión',
      'Soporte en español, inglés y portugués',
    ],
  },
  apps: {
    eyebrow: 'Las apps',
    listName: 'Apps de Numeric Oasis para Jira y Confluence Cloud',
    headline: 'Presupuestos, dependencias y registros de auditoría en Jira. Diseño de páginas y firmas en Confluence.',
    lede: 'Hechas en Atlassian Forge, se ejecutan dentro de tu propio entorno de Atlassian. Cada una hace un trabajo de principio a fin, y cada una dice en su propia página exactamente qué guarda.',
    groups: {
      jira: 'Para Jira Cloud',
      confluence: 'Para Confluence Cloud',
    },
    lead: {
      badge: 'Para Jira Cloud',
      headline: 'OnBudget: control de presupuesto e informes de coste para Jira',
      body: 'Mira qué presupuestos van bien, cuáles están en riesgo y cuáles se pasaron, sin una hoja de cálculo. OnBudget convierte puntos de historia, registros de trabajo valorados con tarifarios, un campo numérico o el recuento de elementos de trabajo en coste, y muestra el presupuestado frente a real, la salud y el pronóstico de cada presupuesto en una sola pantalla.',
      points: [
        'Presupuestado frente a real, salud y pronóstico lineal en cada informe',
        'Cinco métodos de costeo, desde puntos de historia hasta registros de trabajo con tarifario',
        'Un presupuesto en una de 18 monedas, con los umbrales de en riesgo y por encima del presupuesto que tú defines',
        'Nueve gadgets de panel, exportación a CSV y uso compartido con usuarios o grupos',
      ],
      page: 'Mira cómo OnBudget controla los presupuestos en Jira',
      marketplace: 'OnBudget en el Atlassian Marketplace',
    },
    cards: {
      astrolink: {
        descriptor: 'Mapa de dependencias y grafo de vínculos para Jira',
        body: 'Mira qué bloquea un elemento de trabajo y qué se retrasa con él. Astrolink dibuja un grafo de dependencias interactivo a partir de los vínculos, padres y subtareas de Jira entre espacios, con páginas de Confluence como nodos. Empieza desde un elemento de trabajo, una consulta JQL, un filtro guardado o un espacio.',
        page: 'Explora el mapa de dependencias de Astrolink',
        marketplace: 'Astrolink en el Atlassian Marketplace',
      },
      'configuration-monitor': {
        descriptor: 'Registro de auditoría de configuración para espacios de Jira',
        body: 'Averigua quién cambió los workflows, los permisos, las pantallas y otros ajustes de un espacio, cuándo, y cómo estaba cada uno antes. Configuration Monitor revisa 13 secciones de configuración cada hora y guarda el registro de cambios dentro de cada espacio para sus administradores, con exportación a CSV.',
        page: 'Mira el registro de auditoría de Configuration Monitor',
        marketplace: 'Configuration Monitor en el Atlassian Marketplace',
      },
      atelier: {
        descriptor: 'Macros de diseño de página y color de texto para Confluence',
        body: 'Añade colores de fondo, banners, tarjetas, botones y cualquier color de texto en hex a las páginas de Confluence, con 64 patrones y sin CSS. Los administradores del espacio guardan una vez los colores de marca, los preajustes y las fuentes, y cada autor elige entre ellos.',
        page: 'Mira lo que Atelier añade a una página de Confluence',
        marketplace: 'Atelier en el Atlassian Marketplace',
      },
      'expanded-macro-collection': {
        descriptor: 'Confirmación de lectura, firmas y estado de página para Confluence',
        body: 'Demuestra quién leyó cada versión de una política, sigue el estado de las páginas de un espacio y encuentra las páginas que nadie ha revisado. Trece macros para firmas de lectura, banners de clasificación, resúmenes de estado, enlaces entrantes e informes de contenido obsoleto.',
        page: 'Mira las trece macros de Expanded Macro Collection',
        marketplace: 'Expanded Macro Collection en el Atlassian Marketplace',
      },
    },
  },
  guides: {
    eyebrow: 'Guías y docs',
    headline: 'Respuestas para quien administra Jira y Confluence.',
    lede: 'Guías paso a paso para las preguntas que llegan a la mesa de un administrador, y la documentación de cada app.',
    postsLabel: 'Guías',
    allPosts: 'Todas las guías para administradores de Jira y Confluence',
    docsLabel: 'Documentación de las apps, en inglés',
    docs: {
      firstReport: 'Crea tu primer informe de presupuesto en OnBudget',
      costingMethods: 'Métodos de costeo de OnBudget, con ejemplos',
      astrolink: 'Cómo leer un mapa de dependencias de Astrolink',
      configurationMonitor: 'Cómo registra Configuration Monitor los cambios de configuración',
      atelier: 'Las ocho macros de diseño de página de Atelier',
      macros: 'Referencia de las macros de Expanded Macro Collection',
    },
    allDocs: 'Toda la documentación de las apps',
  },
  cta: {
    headline: 'Prueba una en tu propio Jira o Confluence.',
    body: 'Cada app de esta página empieza con una prueba gratuita en el Atlassian Marketplace. Si antes tienes una pregunta, te responde una persona, en español, inglés o portugués.',
    primary: 'Ver las apps',
    secondary: 'Hacernos una pregunta',
  },
  also: {
    heading: 'También de Numeric Oasis',
    items: {
      customDev: {
        name: 'Desarrollo a medida',
        line: 'Aplicaciones web, integraciones y herramientas internas, a la medida de tu trabajo.',
      },
      consulting: {
        name: 'Consultoría Atlassian',
        line: 'Migraciones de Data Center a Cloud, administración y apps de Forge a medida.',
      },
      studio: {
        name: 'Estudio de Juegos',
        line: 'Kindelve, un descenso con colección de criaturas que juegas en el navegador, en beta abierta.',
      },
    },
  },
} as const satisfies HomeCopy;
