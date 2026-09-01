/**
 * The website privacy policy.
 *
 * SCOPE. This covers numericoasis.com, the marketing site. It does NOT cover
 * what the apps do inside a customer's Atlassian tenant: each app has its own
 * privacy policy under /documentation/<app>/privacy/, because each one touches
 * different data and a Marketplace security review reads them individually.
 *
 * ACCURACY. Everything below describes something the site actually does. It was
 * written against the code, not from a template: Cloudflare Web Analytics is in
 * BaseLayout.astro, the Google tag and its consent gate are in
 * ConsentGate.astro, the outbound parameters are in lib/outbound.ts, and there
 * is no form anywhere on the site because there is no server to post one to.
 * If any of those change, this changes with them.
 *
 * REVIEW. A lawyer has not read this. It is an honest description of a static
 * site's data handling, which is most of what a privacy policy for a static
 * site needs to be, but the owner should read it before it does any work.
 */
export const en = {
  meta: {
    crumb: 'Privacy',
    title: 'Privacy policy for this website',
    metaDescription:
      'What numericoasis.com collects, what it does not, and who processes it. Cookieless analytics by default, advertising measurement only with consent.',
    description:
      'What numericoasis.com collects, what it does not collect, and which processors are involved. Analytics is cookieless by default. Advertising measurement runs only with your consent. Each app has its own separate privacy policy.',
  },
  hero: {
    eyebrow: 'Privacy',
    headline: 'What this website collects, and what it does not.',
    lede: 'Short version: no account, no form, no profile. Cookieless analytics always, advertising measurement only if you allow it.',
  },
  updated: 'Last updated',
  updatedDate: '2026-09-01',
  scope: {
    heading: 'What this policy covers',
    body: 'This policy covers numericoasis.com, the website you are reading. It does not cover what our apps do inside your Atlassian site. Each app stores different things and is reviewed separately, so each one publishes its own privacy policy.',
    linkLabel: 'App privacy policies',
    linkHref: '/documentation/',
  },
  sections: [
    {
      heading: 'We do not ask you for anything',
      body: 'There is no account to create, no newsletter to join and no contact form. The site is a set of static files. If you want to reach us you send an email or open a support request, and in both cases you decide what to tell us.',
    },
    {
      heading: 'Analytics, always on and cookieless',
      body: 'We use Cloudflare Web Analytics on every page. It sets no cookies, stores no identifier on your device and does not follow you between sites. It reports aggregate counts: which pages were viewed, roughly where visits came from, and how fast the pages loaded. We cannot pick an individual out of it, and neither can Cloudflare on our behalf.',
    },
    {
      heading: 'Advertising measurement, only with your consent',
      body: "When we run ads we need to know which of them lead somewhere. If you allow it, we load the Google tag, which sets cookies and reports to Google Analytics and Google Ads that a visit arrived and that someone clicked through to one of our Atlassian Marketplace listings. If you decline, or if you are in a region where consent is required and you ignore the banner, the tag runs without storage: it can count that something happened without keeping anything on your device or identifying you. You can change your mind at any time by clearing this site's data in your browser, which removes the stored choice and brings the banner back.",
    },
    {
      heading: 'What we can and cannot see about an install',
      body: "Installing an app happens on the Atlassian Marketplace, which is Atlassian's site, not ours. We never see it happen. What we see is that someone left our page towards a listing. We add parameters to those outbound links so the Marketplace can tell us which of our pages sent a visitor, and those parameters describe the page, not the person.",
    },
    {
      heading: 'Server logs',
      body: 'The site is hosted on GitHub Pages and served through Cloudflare. Both keep short-lived operational logs, which normally include an IP address, for security and abuse prevention. We do not have access to those logs and we do not receive them.',
    },
    {
      heading: 'Email and support',
      body: 'If you email contact@numericoasis.com we keep the message for as long as the conversation is useful, and we use it to answer you. If you open a support request it lives in our Jira Service Management project, which is an Atlassian Cloud service, and it is kept as part of the support record for that app.',
    },
    {
      heading: 'Who processes data for us',
      body: 'Cloudflare, for analytics and delivery. GitHub, for hosting. Google, for advertising measurement, and only with your consent. Atlassian, for the support portal and the Marketplace. We do not sell data, and there is no advertising network on this site beyond the Google tag described above.',
    },
    {
      heading: 'Your rights',
      body: 'Under the GDPR and the LGPD you can ask what we hold about you, ask for a copy, ask us to correct it or ask us to delete it. For this website the honest answer is usually that we hold nothing, because we never collected anything that identifies you. Where we do hold something, it is an email thread or a support ticket you started. Write to contact@numericoasis.com and we will answer within thirty days.',
    },
    {
      heading: 'Children',
      body: 'These are business tools for Atlassian administrators. The site is not directed at children and we do not knowingly collect anything from them.',
    },
    {
      heading: 'Changes',
      body: 'When this policy changes we change the date at the top of the page. If a change is significant, for example if we start collecting something new, we will say so on the page rather than quietly editing it.',
    },
  ],
  contact: {
    heading: 'Questions about any of this',
    body: 'Write to us. A privacy question goes to a person, not a queue.',
    cta: 'Email us',
    subject: 'Privacy question',
  },
} as const;

export type PrivacyCopy = import('../../shape').Shape<typeof en>;
