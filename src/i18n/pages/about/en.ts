export const en = {
  meta: {
    crumb: 'About',
    title: 'About',
    description:
      'Numeric Oasis is a partner in the Atlassian Marketplace, building Forge apps for Jira and Confluence Cloud from Canoas, Brazil. How we build, what each app stores, and how to reach us.',
  },
  hero: {
    eyebrow: 'About Numeric Oasis',
    headline: 'The team behind the apps.',
    lede: 'We build and support Forge apps for Jira and Confluence Cloud. Small team, narrow focus, and a deliberate refusal to run anything outside Atlassian infrastructure.',
  },
  standing: {
    eyebrow: 'Where we stand',
    headline: 'A partner in the Atlassian Marketplace.',
    paragraphs: [
      'Everything we publish goes through the Atlassian Marketplace, which means Atlassian handles licensing, billing and distribution, and you buy our apps the same way you buy any other. Our vendor page lists everything we have published.',
      'We do not hold a partner tier, and we will not imply one. What we do hold is the Runs on Atlassian badge on every app we ship, which is a statement about where the code executes rather than a sales award.',
    ],
    link: 'Our Marketplace vendor page',
  },
  build: {
    eyebrow: 'How we build',
    headline: 'Forge only, narrowest permissions that work.',
    paragraphs: [
      'Forge means our code runs inside Atlassian rather than on infrastructure of ours. There is no third-party host for your security team to assess, no data egress to document, and nothing of yours sitting in a database we operate.',
      'Permissions follow the same principle. We ask for the narrowest scopes that will do the job, and we say per app what each one actually stores. A single blanket privacy claim across a range of apps is always false for at least one of them, so we do not make one.',
    ],
  },
  dataTable: {
    eyebrow: 'What each app stores',
    headline: 'Per app, in plain terms.',
    lede: 'Five of our apps hold nothing about your content. One holds sign-off records on purpose, because an acknowledgement that does not name who acknowledged it is not an acknowledgement.',
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
    intro: 'The name has two halves, and both are deliberate.',
    numericLabel: 'Numeric',
    numeric:
      'is the engineering side. Rigour, data you can trust, decisions backed by something other than guesswork. It is what makes us careful about the details that decide whether a platform still works in year three: the audit trail that proves what changed, the permission check that holds when someone shares a report, the field cleanup that does not break a screen scheme.',
    oasisLabel: 'Oasis',
    oasis:
      'is what we want the apps to feel like. Most Atlassian admins who find us are already buried: too many apps, too many half-finished configurations, too many vendors they cannot get on a call. We try to be the opposite of that. Narrow scope, honest claims including the honest no, and direct contact with the people who write the code.',
    close: 'Software that makes the technical part calm. That is the whole brand.',
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
