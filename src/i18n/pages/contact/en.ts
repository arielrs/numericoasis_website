export const en = {
  meta: {
    crumb: 'Contact',
    title: 'Contact',
    description:
      'Support for every Numeric Oasis app goes through our Jira Service Management portal. Pre-sales, evaluation and partnership enquiries go to contact@numericoasis.com. Answered in English, Portuguese and Spanish.',
  },
  hero: {
    eyebrow: 'Contact',
    headline: 'Two ways in, depending on what you need.',
    lede: 'We answer in English, Portuguese and Spanish.',
  },
  support: {
    label: 'Already using one of our apps',
    headline: 'Support goes through the portal.',
    body: 'Raise it in our Jira Service Management portal rather than by email. Requests there get a ticket, a queue and a history, which is what you want when something is broken. The portal covers all six apps.',
    cta: 'Open a support request',
    includeTitle: 'Include these and we can usually skip a round trip',
    include: [
      'Your Atlassian site URL',
      'Which app, and the version shown on its Marketplace listing',
      'What you expected to happen',
      'What happened instead, with a screenshot if there is one to take',
    ],
  },
  sales: {
    label: 'Evaluating, or thinking about it',
    headline: 'Pre-sales goes to a person.',
    body: 'Questions about whether an app fits, what it can measure, how it handles permissions, volume licensing, or working together: email us. We reply within one working day.',
    cta: 'Email us',
    subject: 'Question about your Atlassian apps',
    includeTitle: 'Useful to mention',
    include: [
      'Which app or which problem you are trying to solve',
      'Jira, Confluence, or both',
      'Roughly how many people would use it',
      'Anything you have already tried',
    ],
  },
  elsewhere: {
    label: 'Elsewhere',
    marketplace: 'Our apps on the Atlassian Marketplace',
    linkedin: 'Numeric Oasis on LinkedIn',
    location: 'Where we are',
  },
} as const;

export type ContactCopy = import('../../shape').Shape<typeof en>;
