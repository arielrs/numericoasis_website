export const en = {
  meta: {
    crumb: 'About',
    title: 'About us, and what each app stores',
    metaDescription:
      'Who builds our Atlassian Marketplace apps, how they run inside Atlassian, and exactly what each app stores. The page to hand to your security review.',
    description:
      'Numeric Oasis is a partner in the Atlassian Marketplace, building Forge apps for Jira and Confluence Cloud from Canoas, Brazil. How we build, what each app stores, and how to reach us.',
  },
  hero: {
    eyebrow: 'About Numeric Oasis',
    headline: 'The team behind the apps.',
    lede: 'We build and support Forge apps for Jira and Confluence Cloud. Every one runs inside your own Atlassian environment, carries the Runs on Atlassian badge, and is supported by the people who wrote it.',
  },
  standing: {
    eyebrow: 'Where we stand',
    headline: 'A partner in the Atlassian Marketplace.',
    paragraphs: [
      'Everything we publish goes through the Atlassian Marketplace, which means Atlassian handles licensing, billing and distribution, and you buy our apps the same way you buy any other. Our vendor page lists everything we have published.',
      'Every app we ship carries the Runs on Atlassian badge, the Atlassian mark for apps whose code runs on Forge inside Atlassian infrastructure. There is no vendor server in the path and nothing of yours leaves your site.',
    ],
    link: 'Our Marketplace vendor page',
  },
  build: {
    eyebrow: 'How we build',
    headline: 'Built to pass your security review.',
    paragraphs: [
      'Forge means our code runs inside Atlassian infrastructure rather than on a server of ours. Your reviewer has no third-party host to assess, nothing leaving Atlassian to document, and nothing of yours sitting in a database we operate. Most of the questionnaire is answered by where the code runs.',
      'Permissions follow the same principle. Each app asks for the scopes it needs to do its job, and each one says on its own page exactly what it stores. The table below puts every app side by side, so you can check them all in one place.',
    ],
  },
  dataTable: {
    eyebrow: 'What each app stores',
    headline: 'Per app, in plain terms.',
    lede: 'Most of our apps hold nothing about your content. The ones that do hold personal data hold it because the job requires it: an acknowledgement that does not name who acknowledged it is not an acknowledgement, and an audit log that does not name who made the change is not an audit log.',
    columns: {
      app: 'App',
      host: 'Host',
      personalData: 'Stores personal data',
    },
    yes: 'Yes, by design',
    no: 'No',
  },
  support: {
    eyebrow: 'Support',
    headline: 'One portal, three languages.',
    body: 'Support for every app goes through the same Jira Service Management portal, so requests land in a queue rather than an inbox. We answer in English, Portuguese and Spanish.',
    link: 'Open the support portal',
  },
  name: {
    eyebrow: 'The name',
    headline: 'Why Numeric Oasis',
    intro: 'The name has two halves, and both mean something.',
    numericLabel: 'Numeric',
    numeric:
      'is the engineering side. Rigour, data you can trust, decisions backed by something other than guesswork. It is what makes us careful about the details that decide whether a platform still works in year three: the audit trail that proves what changed, the permission check that holds when someone shares a report, the field cleanup that does not break a screen scheme.',
    oasisLabel: 'Oasis',
    oasis:
      'is what we want the apps to feel like. Most Atlassian admins who find us are already buried: too many apps, too many half-finished configurations, too many vendors they cannot get on a call. We try to be the opposite of that. One job per app, claims you can check against the listing, and direct contact with the people who write the code.',
    close: 'Software that makes the technical part calm.',
  },
  where: {
    eyebrow: 'Where we are',
    headlinePrefix: 'Working from',
    paragraphs: [
      'Our customers are spread across six continents, so most of our work is asynchronous and most of our asynchronous is in writing. That gives everyone predictable response windows without pushing anyone into a bad-hour call.',
    ],
    contactLead: 'Reach us at',
    contactMid: 'or through our',
    contactLink: 'contact page',
  },
} as const;

export type AboutCopy = import('../../shape').Shape<typeof en>;
