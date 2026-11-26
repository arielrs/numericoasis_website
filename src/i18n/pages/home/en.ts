/**
 * The home page, an apps landing since 2026-11-25.
 *
 * Every capability sentence below was checked against the live Marketplace
 * listing (rest/2/addons/<key> and its versions/latest) on that date, and most
 * of them reuse the listing's own words, because those are the words a buyer
 * typed into a search box. Change an app, change its sentence here too.
 */
export const en = {
  meta: {
    title: 'Jira and Confluence apps: budgets and audits',
    metaDescription:
      'Apps for Jira and Confluence Cloud: budget vs actual reports, a dependency map, a configuration audit log, page design and read sign-off. Try each one free.',
    description:
      'Numeric Oasis makes Atlassian Marketplace apps for Jira and Confluence Cloud, all built on Atlassian Forge. OnBudget tracks budgets and cost reports, budget vs actual, from work already in Jira. Astrolink draws a dependency map and link graph of work items. Configuration Monitor keeps an audit log of who changed a Jira space\'s workflows, permissions and settings. Atelier adds page design, text and background colors and banners to Confluence. Expanded Macro Collection adds read confirmation, sign-off and page status. Numeric Oasis also builds custom software, offers Atlassian consulting and runs a game studio.',
  },
  hero: {
    eyebrow: 'Atlassian Marketplace apps',
    headline: 'Apps for Jira and Confluence Cloud that answer the questions admins get asked.',
    lede: 'Numeric Oasis makes apps for Jira and Confluence Cloud: budget tracking and cost reports, a dependency map, an audit log of configuration changes, page design macros, and read confirmation with page status. Each one is built on Atlassian Forge and starts with a free trial on the Atlassian Marketplace.',
    primary: 'Browse the apps',
    secondary: 'Our apps on the Atlassian Marketplace',
    questionsLabel: 'Questions our apps answer',
  },
  /**
   * The hero's index: the question each app answers, and the app that answers
   * it. Keyed by the app's translationKey, in the order of the cards below.
   */
  questions: {
    onbudget: {
      question: 'Which budgets are on track, at risk or over?',
      answer: 'OnBudget, budget tracking for Jira',
    },
    astrolink: {
      question: 'What blocks this work item, and what slips with it?',
      answer: 'Astrolink, dependency map for Jira',
    },
    'configuration-monitor': {
      question: 'Who changed this space\'s workflow or permissions?',
      answer: 'Configuration Monitor, audit log for Jira',
    },
    atelier: {
      question: 'How do I make a Confluence page match our brand?',
      answer: 'Atelier, page design for Confluence',
    },
    'expanded-macro-collection': {
      question: 'Who has read and signed off this policy?',
      answer: 'Expanded Macro Collection, sign-off for Confluence',
    },
  },
  /** Holds for every app on this page. No counts of installs or reviews, ever. */
  proof: {
    label: 'What every app comes with',
    items: [
      'Built on Atlassian Forge',
      'Runs on Atlassian',
      'Try it free on the Marketplace',
      'Documentation and release notes',
      'Support in English, Portuguese and Spanish',
    ],
  },
  apps: {
    eyebrow: 'The apps',
    listName: 'Numeric Oasis apps for Jira and Confluence Cloud',
    headline: 'Budgets, dependencies and audit logs in Jira. Page design and sign-off in Confluence.',
    lede: 'Built on Atlassian Forge, so they run inside your own Atlassian environment. Each one does one job end to end, and each one says on its own page exactly what it stores.',
    groups: {
      jira: 'For Jira Cloud',
      confluence: 'For Confluence Cloud',
    },
    lead: {
      badge: 'For Jira Cloud',
      headline: 'OnBudget: budget tracking and cost reports for Jira',
      body: 'See which budgets are on track, at risk or over, without a spreadsheet. OnBudget turns story points, worklogs priced by rate cards, a numeric field or work item counts into cost, then shows budget vs actual, health and a forecast for every budget on one screen.',
      points: [
        'Budget vs actual, health and a linear forecast on every report',
        'Five costing methods, from story points to worklogs priced by rate card',
        'A budget in one of 18 currencies, with at risk and over budget thresholds you set',
        'Nine dashboard gadgets, CSV export, and sharing with users or groups',
      ],
      page: 'See how OnBudget tracks Jira budgets',
      marketplace: 'OnBudget on the Atlassian Marketplace',
    },
    /** Keyed by translationKey. The order on the page lives in the route file. */
    cards: {
      astrolink: {
        descriptor: 'Dependency map and link graph for Jira',
        body: 'See what blocks a work item and what slips with it. Astrolink draws an interactive dependency graph from your Jira links, parents and subtasks across spaces, with Confluence pages as nodes. Start from a work item, a JQL query, a saved filter or a space.',
        page: 'Explore the Astrolink dependency map',
        marketplace: 'Astrolink on the Atlassian Marketplace',
      },
      'configuration-monitor': {
        descriptor: 'Configuration audit log for Jira spaces',
        body: 'Find out who changed a space\'s workflows, permissions, screens and other settings, when, and what each one was before. Configuration Monitor checks 13 configuration sections every hour and keeps the change log inside each space for its admins, with CSV export.',
        page: 'See the Configuration Monitor audit log',
        marketplace: 'Configuration Monitor on the Atlassian Marketplace',
      },
      atelier: {
        descriptor: 'Page design and text color macros for Confluence',
        body: 'Add background colors, banners, cards, buttons and any hex text color to Confluence pages, with 64 patterns and no CSS. Space admins save brand colors, presets and fonts once, and every author picks from them.',
        page: 'See what Atelier adds to a Confluence page',
        marketplace: 'Atelier on the Atlassian Marketplace',
      },
      'expanded-macro-collection': {
        descriptor: 'Read confirmation, sign-off and page status for Confluence',
        body: 'Prove who read each policy version, track page status across a space and find pages nobody has reviewed. Thirteen macros for read sign-off, classification banners, status rollups, backlinks and stale content reports.',
        page: 'See the thirteen macros in Expanded Macro Collection',
        marketplace: 'Expanded Macro Collection on the Atlassian Marketplace',
      },
    },
  },
  guides: {
    eyebrow: 'Guides and docs',
    headline: 'Answers for Jira and Confluence admins.',
    lede: 'Step by step guides to the questions that land on an admin\'s desk, and the documentation for every app.',
    postsLabel: 'Guides',
    allPosts: 'All guides for Jira and Confluence admins',
    docsLabel: 'App documentation',
    /** Keyed like DOC_LINKS in the route file, which holds the paths. */
    docs: {
      firstReport: 'Build your first budget report in OnBudget',
      costingMethods: 'OnBudget costing methods, with worked examples',
      astrolink: 'How to read an Astrolink dependency map',
      configurationMonitor: 'How Configuration Monitor logs configuration changes',
      atelier: 'The eight page design macros in Atelier',
      macros: 'Expanded Macro Collection macros reference',
    },
    allDocs: 'All app documentation',
  },
  cta: {
    headline: 'Try one on your own Jira or Confluence site.',
    body: 'Every app on this page starts with a free trial on the Atlassian Marketplace. If you have a question first, you will hear back from a person, in English, Portuguese or Spanish.',
    primary: 'Browse the apps',
    secondary: 'Ask us a question',
  },
  /** One quiet strip at the foot of the page. The other work stays, smaller. */
  also: {
    heading: 'Also from Numeric Oasis',
    items: {
      customDev: {
        name: 'Custom development',
        line: 'Web apps, integrations and internal tools, built to your shape.',
      },
      consulting: {
        name: 'Atlassian consulting',
        line: 'Data Center to Cloud migrations, administration and custom Forge apps.',
      },
      studio: {
        name: 'Game Studio',
        line: 'Kindelve, a creature-collection descent you play in a browser, in open beta.',
      },
    },
  },
} as const;

export type HomeCopy = import('../../shape').Shape<typeof en>;
