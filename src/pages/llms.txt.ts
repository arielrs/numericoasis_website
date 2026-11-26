/**
 * /llms.txt
 *
 * Honest assessment: almost nothing reads this. An analysis of 137,000 domains
 * found 97 percent of published llms.txt files received zero requests, and zero
 * requests ever arrive for files that do not exist, meaning AI crawlers never go
 * looking. Google states plainly that Search does not use them.
 *
 * We ship it because it is generated from data we already have and costs one
 * file in the build. It should not be reported as an AI-visibility win. The
 * levers that actually matter here are the entity graph, the max-snippet robots
 * directive, the crawler allowances in robots.txt, IndexNow feeding Bing (which
 * is what ChatGPT search reads), and posts that answer a question in their
 * first lines and cite their sources.
 *
 * Rewritten on 2026-11-23: it still described an app vendor with nothing else,
 * three weeks after the site started leading with three fronts. Every page
 * description now comes from the page's own English dictionary, so this file
 * cannot drift from the page it summarises again.
 *
 * Reordered on 2026-11-25, when the site went back to leading with its apps:
 * the apps, their documentation and the admin guides come first, and Atlassian
 * consulting, custom development and the Game Studio follow under "Also from
 * Numeric Oasis", the same order as the home page.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, PRODUCT_LABELS } from '../consts';
import { contentSlug } from '../i18n/paths';
import { atlassian } from '../i18n/pages/atlassian';
import { customDev } from '../i18n/pages/custom-development';
import { home } from '../i18n/pages/home';
import { studio } from '../i18n/pages/studio';
import { docGroups, docHref, groupHref, SECTIONS } from '../lib/docs';

type Post = CollectionEntry<'blog'>;

export async function GET() {
  // Paid apps first, then the collection order, so OnBudget leads and Field
  // Scout, the free one, closes the list.
  const apps = (await getCollection('apps', ({ data }) => data.lang === 'en')).sort(
    (a, b) =>
      Number(a.data.priceModel === 'free') - Number(b.data.priceModel === 'free') ||
      a.data.order - b.data.order,
  );

  const posts = (
    await getCollection('blog', ({ data }) => data.lang === 'en' && !data.draft)
  ).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const appDocs = await docGroups('apps');
  const gameDocs = await docGroups('studio');

  const appLine = (app: (typeof apps)[number]) => {
    const url = `${SITE.url}${app.data.landingPath ?? `/apps/${contentSlug(app.id)}/`}`;
    // products, not hostProducts. hostProducts is the install target, so a
    // Jira app that also supports Jira Service Management reads as Jira only.
    const host = app.data.products.map((h) => PRODUCT_LABELS[h] ?? h).join(' and ');
    const price = app.data.priceModel === 'free' ? 'Free' : 'Paid';
    return `- [${app.data.name}](${url}): ${app.data.tagline} (${host} Cloud, ${price})`;
  };

  const postLine = (post: Post) =>
    `- [${post.data.title}](${SITE.url}/blog/${contentSlug(post.id)}/) (${post.data.pubDate
      .toISOString()
      .slice(0, 10)}): ${post.data.description}`;

  // One topic per post, first match wins, in the order a reader would look.
  const has = (post: Post, tag: string) => (post.data.tags as readonly string[]).includes(tag);
  const news = posts.filter((p) => has(p, 'atlassian-news'));
  const games = posts.filter((p) => !news.includes(p) && has(p, 'game-development'));
  const custom = posts.filter(
    (p) => !news.includes(p) && !games.includes(p) && has(p, 'custom-development'),
  );
  const guides = posts.filter((p) => !news.includes(p) && !games.includes(p) && !custom.includes(p));

  const section = (heading: string, list: Post[]) =>
    list.length ? [`### ${heading}`, '', ...list.map(postLine), ''] : [];

  const body = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    'A partner in the Atlassian Marketplace that makes apps for Jira and Confluence Cloud. Every app is',
    'built on Atlassian Forge and runs inside the customer\'s own Atlassian environment, and each app\'s',
    'page says exactly what it stores. The company also builds custom software, offers Atlassian',
    'consulting and runs a game studio, from Canoas, Brazil.',
    'The site is published in English (/), Portuguese (/pt-BR/) and Spanish (/es/); the documentation',
    'and the Game Studio wiki are in English.',
    '',
    '## Apps for Jira and Confluence Cloud',
    '',
    `- [Home](${SITE.url}/): ${home.en.meta.description}`,
    `- [All apps](${SITE.url}/apps/): every Marketplace app, grouped by product.`,
    ...apps.map(appLine),
    '',
    '## App documentation',
    '',
    `- [Documentation](${SITE.url}${SECTIONS.apps.base}): setup, features, release notes and policies for every app.`,
    ...appDocs.map((g) => `  - [${g.label}](${SITE.url}${groupHref(g.app)}): ${g.blurb}`),
    '',
    '## Guides',
    '',
    'Guides and news for Jira and Confluence Cloud administrators. Each post answers its question in the',
    'opening lines and links its sources.',
    '',
    ...section('Guides for Jira and Confluence admins', guides),
    ...section('Atlassian news', news),
    '## Also from Numeric Oasis',
    '',
    `- [Atlassian consulting](${SITE.url}/atlassian/): ${atlassian.en.meta.description}`,
    `- [Custom development](${SITE.url}/custom-development/): ${customDev.en.meta.description}`,
    `- [Game Studio](${SITE.url}/studio/): ${studio.en.meta.description}`,
    `- [Game Studio wiki](${SITE.url}${SECTIONS.studio.base}): player guides for the studio's games.`,
    ...gameDocs.flatMap((g) => [
      `  - [${g.label} player guide](${SITE.url}${groupHref(g.app)}): ${g.indexDescription ?? g.blurb}`,
      ...g.pages.map((p) => `    - [${p.data.title}](${SITE.url}${docHref(p)}): ${p.data.description}`),
    ]),
    '',
    ...section('Notes on custom development', custom),
    ...section('Game development and the game industry', games),
    '## Optional',
    '',
    `- [About](${SITE.url}/about/): who we are, how we build, and what each app stores.`,
    `- [Contact](${SITE.url}/contact/): app support via ${SITE.supportUrl}, everything else via ${SITE.email}`,
    `- [Atlassian Marketplace vendor page](${SITE.marketplaceUrl})`,
    `- [RSS feed](${SITE.url}/rss.xml)`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
