export const en = {
  meta: {
    crumb: 'Game Studio',
    title: 'Game Studio: the game we are building',
    metaDescription:
      'Numeric Oasis Game Studio builds Kindelve, a creature-collection dungeon descent you play in a browser. In open testing, free, in five languages.',
    description:
      'Numeric Oasis Game Studio is the games side of Numeric Oasis Technologies, based in Canoas, Brazil. It is building Kindelve, a creature-collection dungeon descent that runs in a browser on any phone or desktop.',
  },
  hero: {
    eyebrow: 'Numeric Oasis Game Studio',
    headline: 'We make games the way we make apps.',
    lede: 'Small, finished, and built to run on the device somebody already owns. The studio has one game in open testing and a long list of things it is not going to do to you.',
  },
  why: {
    eyebrow: 'Why a studio',
    headline: 'The same company, a different craft.',
    paragraphs: [
      'Numeric Oasis Technologies builds Forge apps for Jira and Confluence Cloud, and has since 2011. The Game Studio is a separate line of work under the same roof: the same people, the same engineering standards, aimed at something nobody has to install.',
      'A game is a harder test of the same discipline. An app can be forgiven a slow page; a game cannot be forgiven a dropped frame. So the studio builds the way the apps do, in small releases that ship, with the simulation under test and the content as data rather than as code.',
    ],
  },
  game: {
    eyebrow: 'In open testing',
    name: 'Kindelve',
    tagline: 'Pour creatures into a rift and decide how deep is deep enough.',
    paragraphs: [
      'You are the Warden of a rift in the ground. You send creatures down it, they fight their way deeper on their own, and you decide what goes down, what it carries, and when to stop. A delve lasts minutes. What it leaves behind lasts for weeks.',
      'Underneath, there are around nine hundred creatures to meet, lines that evolve as the deep rewrites them, twenty-two keystones that change what a creature is doing rather than how much of it, and a daily Trial where every Warden descends into the same deep and the board is settled by proof rather than by trust.',
    ],
    factsHeading: 'At a glance',
    facts: [
      { label: 'Where', value: 'Any modern browser, phone or desktop. Nothing to install' },
      { label: 'Status', value: 'Open testing, updated most weeks' },
      { label: 'Languages', value: 'English, Portuguese, Spanish, French, Japanese' },
      { label: 'Price', value: 'Free, with no advertising and nothing to buy' },
    ],
    play: 'Play Kindelve',
    docs: 'Read the documentation',
  },
  principles: {
    eyebrow: 'How it is built',
    headline: 'Four commitments, in the code rather than in a promise.',
    items: [
      {
        title: 'The deep is the same for everyone',
        body: 'The simulation uses whole numbers, a seeded generator and no clock, so the same delve produces the same result on every device. That is what lets the daily board accept a score by running it again instead of taking your word for it.',
      },
      {
        title: 'Money buys time and vanity, never power',
        body: 'Nothing can be bought today. When something can, it will shorten a road you could already walk, and it will never be a road a paying player gets and you do not. The rule is checked by a test, not kept in a document.',
      },
      {
        title: 'Built for a mid-range phone',
        body: 'Six floors of animated creatures, effects and numbers at once is easy on a desktop and genuinely hard on a phone, so the phone is the design target and the desktop gets the surplus. Portrait first, thumb reach, and no gesture that needs a mouse.',
      },
      {
        title: 'Five languages, not an afterthought',
        body: 'Every piece of player text ships in five languages at once, checked by a build that fails when one is missing. Creature names stay in English everywhere, because they are names rather than words.',
      },
    ],
  },
  next: {
    eyebrow: 'What is next',
    headline: 'Being built now.',
    items: [
      'One account and one save across every device, with an email link or Google sign-in, and a name for your Warden. Your current save is adopted rather than replaced.',
      'A server that holds progress and proves a delve by replaying it, so a lost browser stops costing a month and a ladder is worth trusting.',
      'Mobile apps, then Steam, from the same build. The game is written once and each platform is a thin shell over it.',
    ],
  },
  cta: {
    heading: 'Go down and see.',
    body: 'It runs in the tab you are reading this in, there is nothing to install, and the first delve takes about two minutes.',
    play: 'Play Kindelve',
    docs: 'Read the documentation',
    contact: 'Talk to the studio',
  },
} as const;

export type StudioCopy = import('../../shape').Shape<typeof en>;
