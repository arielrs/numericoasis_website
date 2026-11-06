export const en = {
  meta: {
    crumb: 'Atlassian',
    title: 'Atlassian consulting and Forge apps',
    metaDescription:
      'Jira and Confluence migrations to Cloud, administration and license clean-up, our Marketplace apps, and custom Forge apps that shrink the app bill.',
    description:
      'Numeric Oasis assesses and runs Jira and Confluence migrations from Data Center to Cloud, sizes ScriptRunner rewrites, moves teams off other tools, cleans up administration and licenses, publishes Forge apps on the Atlassian Marketplace, and builds custom Forge apps that replace several subscriptions.',
  },
  hero: {
    eyebrow: 'Atlassian',
    headline: 'Jira and Confluence, from the migration to the last custom field.',
    lede: 'We have worked inside Atlassian tools for fifteen years, as administrators, consultants and Marketplace partners. We move you to Cloud, keep the site clean once you are there, and build the app you need when the Marketplace does not have it, or charges too much for the part you use.',
    primary: 'Talk to us',
    secondary: 'See our apps',
  },
  consulting: {
    eyebrow: 'Consulting',
    headline: 'Moves, clean-ups and the administration in between.',
    items: [
      {
        title: 'Data Center to Cloud migrations',
        body: 'An assessment before anything moves: every app mapped to its Cloud path, every script sized for its rewrite, every Confluence macro checked for whether it survives the trip. Then the move itself, in rehearsed waves, with a plan for the morning after.',
      },
      {
        title: 'ScriptRunner rewrites',
        body: 'ScriptRunner on Cloud is not the Data Center version at a new address. We inventory what you have, say what to retire, what translates and what has to be rewritten, and size it honestly before you commit to a date.',
      },
      {
        title: 'Moving off other tools',
        body: 'Spreadsheets that became a system, project tools that outgrew their price, wikis nobody owns. We map what moves to Jira and Confluence, what moves differently, and what should simply be switched off.',
      },
      {
        title: 'Administration and governance',
        body: 'Schemes that drifted, permissions nobody can explain, automation rules that fire for no one, and licenses paid for people who left. We clean it up, write down why, and leave rules behind that keep it clean.',
      },
    ],
  },
  apps: {
    eyebrow: 'Marketplace apps',
    headline: 'Our apps for Jira and Confluence Cloud.',
    lede: 'Built on Forge, so they run inside your own Atlassian environment and your data stays there. Each one does one job end to end, and each one says on its own page exactly what it stores.',
    link: 'All apps',
  },
  custom: {
    eyebrow: 'Custom Forge apps',
    headline: 'Pay for the part you use.',
    paragraphs: [
      'Most Atlassian sites carry Marketplace apps bought for one feature each, and every one of them is priced per user across the whole site. Two or three of those can often be replaced by one small Forge app built for exactly what your teams do with them.',
      'We start from your app inventory and your audit log: what is installed, what is used, by how many people, and what it costs at your tier. Then you get a recommendation with the numbers: which apps to keep, which to drop and which to replace. A custom app runs on Forge, inside Atlassian, so it goes through your security review the same way ours do.',
    ],
    points: [
      'An app inventory with real usage and real cost',
      'One Forge app in place of several subscriptions',
      'Runs inside Atlassian, like every app we ship',
    ],
    link: 'Read: shrinking your Atlassian app footprint',
  },
  posts: {
    eyebrow: 'From the blog',
    headline: 'Notes on Atlassian work.',
    link: 'All Atlassian consulting posts',
  },
  cta: {
    heading: 'Planning a move, or cleaning up after one?',
    body: 'Tell us where your site is and where it needs to be, in English, Portuguese or Spanish. You will talk to the people who do the work.',
    primary: 'Talk to us',
  },
} as const;

export type AtlassianCopy = import('../../shape').Shape<typeof en>;
