export const en = {
  meta: {
    crumb: 'Custom Development',
    title: 'Custom software development',
    metaDescription:
      'Web applications, integrations and internal tools, built in small releases with tests and documentation. Custom software from Numeric Oasis.',
    description:
      'Numeric Oasis builds custom web applications, integrations between the systems you already pay for, internal tools and multilingual sites. Small releases, a test for every fix, and documentation your team can read, from Canoas, Brazil.',
  },
  hero: {
    eyebrow: 'Custom Development',
    headline: 'Software built for the way you already work.',
    lede: 'The product you bought covers most of the job. The rest is where your team loses its week: the export someone runs by hand every Friday, the two systems that disagree about the same customer, the spreadsheet nobody dares to touch. We build the software that closes that gap.',
    primary: 'Tell us what you need',
    secondary: 'How we work',
  },
  build: {
    eyebrow: 'What we build',
    headline: 'Four kinds of work, all of them finished.',
    items: [
      {
        title: 'Web applications',
        body: "Customer portals, ordering and booking flows, and dashboards for the numbers your team actually decides on. Built for the browser first, so there is nothing to install and nothing to keep updated on anyone's machine.",
      },
      {
        title: 'Integrations',
        body: "The connection between two systems you already pay for, built for your data model rather than a vendor's, with the retries, logging and reconciliation that make it trustworthy at three in the morning.",
      },
      {
        title: 'Internal tools',
        body: 'The small application that replaces the spreadsheet everyone is afraid to edit. It starts from that spreadsheet, keeps what works in it, and adds the validation, history and permissions it never had.',
      },
      {
        title: 'Sites and content platforms',
        body: 'Fast static sites in several languages, with build checks that refuse to publish a broken link, a missing translation or an unreadable colour. This site is one of them.',
      },
    ],
  },
  how: {
    eyebrow: 'How we work',
    headline: 'Small releases, real tests, no surprises.',
    steps: [
      {
        title: 'Scope the smallest useful thing',
        body: 'We start with the version that is worth having on its own, and we write down what is out of it. A short list of what we are not building is the most useful thing a scope can contain.',
      },
      {
        title: 'Ship it in weeks',
        body: 'The first release goes to the people who will use it, early. What they do with it decides the next release more reliably than any plan written before they had it.',
      },
      {
        title: 'Every fix comes with a test',
        body: 'A bug is fixed by first writing a test that fails because of it, then making that test pass. The test stays, which is why the same bug does not come back.',
      },
      {
        title: 'Documented as it goes',
        body: 'Every release says what changed and what did not. When the project ends, your team inherits software it can read, not a black box with our phone number on it.',
      },
    ],
  },
  proof: {
    eyebrow: 'What we have shipped',
    headline: 'Our own products are the portfolio.',
    paragraphs: [
      'We build our own products the way we would build yours, and they are public, so you can judge the work itself rather than a description of it.',
      'Six Forge apps on the Atlassian Marketplace, each documented on our wiki. This website, in three languages, with build checks that stop a broken link, a missing translation or an unreadable colour from going live. And Kindelve, a browser game whose simulation gives the same answer on every device, and whose server proves a leaderboard score by replaying it.',
    ],
    apps: 'Our Marketplace apps',
    studio: 'The Game Studio',
  },
  posts: {
    eyebrow: 'From the blog',
    headline: 'Notes on building software.',
    link: 'All custom development posts',
  },
  cta: {
    heading: 'Tell us what you are working around.',
    body: 'Describe the job your current tools leave undone, in English, Portuguese or Spanish. You will hear back from a person who builds software, not from a sales queue.',
    primary: 'Talk to us',
  },
} as const;

export type CustomDevCopy = import('../../shape').Shape<typeof en>;
