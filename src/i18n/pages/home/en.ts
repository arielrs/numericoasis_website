export const en = {
  meta: {
    title: 'Software, Atlassian consulting and a game studio',
    metaDescription:
      'Numeric Oasis builds custom software, migrates and runs Jira and Confluence, publishes Forge apps, and runs a game studio. From Canoas, Brazil, since 2011.',
    description:
      'Numeric Oasis Technologies works on three fronts: custom web applications, integrations and internal tools; Atlassian consulting, Marketplace apps and custom Forge apps; and a game studio building Kindelve, a browser game in open testing. Small releases, a test for every fix, in English, Portuguese and Spanish.',
  },
  hero: {
    eyebrow: 'Numeric Oasis Technologies',
    headline: 'Three kinds of software, one way of building it.',
    lede: 'We build custom software for companies that have outgrown the off-the-shelf version, we migrate, run and extend Jira and Confluence, and our game studio is making a game you can play in a browser today. All of it ships in small releases, with the tests to prove it.',
    primary: 'Talk to us',
    secondary: 'Who we are',
    frontsLabel: 'What we do',
  },
  /** The hero's index of the three fronts. Same order as the nav and the sections below. */
  fronts: [
    { name: 'Custom Development', line: 'Web apps, integrations and internal tools, built to your shape.' },
    { name: 'Atlassian', line: 'Cloud migrations, administration, Forge apps and a smaller app bill.' },
    { name: 'Game Studio', line: 'Kindelve, a creature-collection descent, in open testing now.' },
  ],
  /**
   * Six reasons to trust us, not six facts about our stack. Company-wide since
   * the three fronts: every item holds for all of them, not only for the apps.
   */
  proof: {
    label: 'Built for trust',
    items: [
      'Building software since 2011',
      'Partner in the Atlassian Marketplace',
      'Small releases that ship',
      'Every bug fix lands with a test',
      'Documentation for everything we ship',
      'Support in English, Portuguese and Spanish',
    ],
  },
  detail: {
    eyebrow: 'What we do',
    headline: 'Three fronts, one standard.',
    lede: 'They look like three businesses. They are one team holding three kinds of work to the same bar: scope it small, ship it, test it, and tell you the truth about what it costs.',
    sections: [
      {
        eyebrow: 'Custom Development',
        headline: 'Software built for the way you already work.',
        body: 'When the product you bought covers eighty percent of the job, the other twenty percent is where your team loses its week. We build the web applications, integrations and internal tools that close that gap, and we document them so your team is never left guessing.',
        points: [
          'Web applications and customer portals',
          'Integrations between the systems you already pay for',
          'Internal tools that replace the spreadsheet nobody dares to touch',
        ],
        link: 'Custom development',
      },
      {
        eyebrow: 'Atlassian',
        headline: 'Jira and Confluence, from the migration to the last custom field.',
        body: 'Fifteen years inside Atlassian tools. We assess and run moves from Data Center to Cloud, size the ScriptRunner rewrite before you commit to it, clean up what a migration leaves behind, publish our own apps on the Marketplace, and build custom Forge apps when one small app beats three subscriptions.',
        points: [
          'Data Center to Cloud migrations and assessments',
          'Administration, governance and license clean-up',
          'Marketplace apps, custom Forge apps and a smaller app bill',
        ],
        link: 'Atlassian services',
      },
      {
        eyebrow: 'Game Studio',
        headline: 'A game you can play in the tab you have open.',
        body: 'Kindelve is a creature-collection dungeon descent that runs in any browser, on a phone or a desktop. It is built with the same discipline as everything else here: a simulation that gives the same answer on every device, five languages from the first release, and nothing for sale that would buy power.',
        points: [
          'Kindelve, in open testing and free to play',
          'A daily Trial where scores are proven, not trusted',
          'English, Portuguese, Spanish, French and Japanese',
        ],
        link: 'The Game Studio',
      },
    ],
  },
  focus: {
    eyebrow: 'OnBudget, for Jira Cloud',
    headline: 'Track every Jira budget on one screen.',
    lede: 'Budget versus actual, health and forecast, built from the work your team already tracks in Jira. Delivery, product and marketing budgets side by side, each in its own currency, and it works with the fields your team already fills in.',
    custom: {
      title: 'Shape the report, then shape the screen.',
      report: 'You decide what a report covers: whole spaces, work items picked by key or summary text, or a JQL query. You set the budget and its currency, the two thresholds that turn it at risk and then over budget, and the number and date formats it reads in.',
      dashboard: 'Then the dashboard is yours to rearrange. Drag a gadget to a new slot, resize it from the corner, clone or remove it, switch it between bar, line, area, pie, donut, table and plain number, and save the layout when it reads the way you think.',
    },
    ctaPrimary: 'See what OnBudget does',
    ctaSecondary: 'View on the Marketplace',
  },
  how: {
    eyebrow: 'How we work',
    headline: 'Small, finished, and honest about what it costs.',
    paragraphs: [
      'We scope the smallest version of the thing that is worth having, ship it, and let what people do with it decide the next release. It is slower to describe than a big plan and much faster to finish.',
      'Every bug we fix comes with a test that fails without the fix, and the test stays. Our own products run on the same rule, which is why we can tell you what changed in a release and what did not.',
      'We are a small team in Canoas, in southern Brazil, and we work in English, Portuguese and Spanish. You talk to the people who write the code.',
    ],
    link: 'More about the team',
  },
  blog: {
    eyebrow: 'From the blog',
    headline: 'Notes from the workshop.',
    link: 'All posts',
  },
  cta: {
    headline: 'Tell us what you are building.',
    body: 'A project, a migration, an app you wish existed, or a question about any of them. You will hear back from a person, in English, Portuguese or Spanish.',
    primary: 'Talk to us',
    secondary: 'See our apps',
  },
} as const;

export type HomeCopy = import('../../shape').Shape<typeof en>;
