export const en = {
  meta: {
    crumb: 'Game Studio',
    title: 'Game Studio: Kindelve, a free browser game',
    metaDescription:
      'Numeric Oasis Game Studio makes Kindelve, a free creature-collection dungeon descent you play in any browser, in five languages. In open beta.',
    description:
      'Numeric Oasis Game Studio makes games that run in a browser on any phone or computer. Its first game, Kindelve, is a free creature-collection dungeon descent, in open beta and in five languages.',
  },
  hero: {
    eyebrow: 'Numeric Oasis Game Studio',
    headline: 'Games that run on the device you already own.',
    lede: 'Free to start, in five languages, in any modern browser on a phone or a computer. Our first game, Kindelve, is in open beta and updated most weeks.',
  },
  craft: {
    eyebrow: 'What the studio makes',
    headline: 'Games you start in a browser tab and keep for months.',
    paragraphs: [
      'Numeric Oasis Game Studio makes games that open in a browser tab, on a phone or a computer, with nothing to install and no account needed to start. A short session fits a coffee break; the progress it leaves behind builds over weeks.',
      'Each game is written once and runs everywhere from the same build: the browser first, then mobile apps and Steam. Progress follows the player through one account, every piece of player text ships in five languages, and the systems underneath are documented in full in the studio wiki.',
    ],
  },
  game: {
    eyebrow: 'In open beta',
    name: 'Kindelve',
    tagline: 'Pour creatures into a rift and decide how deep is deep enough.',
    paragraphs: [
      'You are the Warden of a rift in the ground. You send creatures down it, they fight their way deeper on their own, and you decide what goes down, what it carries, and when to stop. A delve lasts minutes. What it leaves behind lasts for weeks.',
      'Underneath, there are around nine hundred creatures to meet, lines that evolve as the deep rewrites them, twenty-seven keystones that change what a creature is doing rather than how much of it, and a daily Trial where every Warden descends into the same deep and the board is settled by proof rather than by trust.',
    ],
    factsHeading: 'At a glance',
    facts: [
      { label: 'Where', value: 'Any modern browser, phone or desktop. Nothing to install' },
      { label: 'Status', value: 'Open beta since 12 November 2026, updated most weeks' },
      { label: 'Season', value: 'The First Watch, since 16 November 2026: eight weeks, four optional goals' },
      { label: 'Languages', value: 'English, Portuguese, Spanish, French, Japanese' },
      {
        label: 'Saves',
        value: 'Play without an account, or sign in by email link or Google to keep one game on every device',
      },
      { label: 'Price', value: 'Free to play, with no ads. Purchases save time or change looks, never power' },
    ],
    play: 'Play Kindelve',
    docs: 'Read the player guide',
  },
  wiki: {
    eyebrow: 'Player guide',
    headline: 'How Kindelve works, in full.',
    body: 'The studio wiki covers the whole game: the descent, the Kin you send into it, builds, the Warden, the daily Trial, saves, and what the game stores.',
    all: 'Open the studio wiki',
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
        body: 'The shop sells time and looks: a shortcut down a road you could already walk, or a new look for the game. It never sells a road a paying player gets and you do not, and almost everything in it can also be bought with echoes, which you earn by playing. The rule is checked by a test, not kept in a document.',
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
    headline: 'Coming next.',
    items: [
      'Mobile apps, then Steam, from the same build. The game is written once and each platform is a thin shell over it.',
      'One account everywhere: the account you sign in with in the browser today is the one the apps and Steam will open.',
      'New seasons after The First Watch, each eight weeks with four optional goals, and nothing taken back when a season ends.',
    ],
  },
  blog: {
    eyebrow: 'From the blog',
    headline: 'Notes on making and releasing games.',
    all: 'All game development posts',
  },
  cta: {
    heading: 'Go down and see.',
    body: 'It runs in the tab you are reading this in, there is nothing to install, and the first delve takes about two minutes.',
    play: 'Play Kindelve',
    docs: 'Read the player guide',
    contact: 'Talk to the studio',
    support: 'Get help with a game',
  },
} as const;

export type StudioCopy = import('../../shape').Shape<typeof en>;
