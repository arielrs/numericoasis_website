/**
 * /llms.txt
 *
 * Honest assessment: almost nothing reads this. An analysis of 137,000 domains
 * found 97 percent of published llms.txt files received zero requests, and zero
 * requests ever arrive for files that do not exist, meaning AI crawlers never go
 * looking. Google states plainly that Search does not use them.
 *
 * We ship it because it is thirty lines generated from data we already have and
 * it costs one file in the build. It should not be reported as an AI-visibility
 * win. The levers that actually matter here are the entity graph, the
 * max-snippet robots directive, the crawler allowances in robots.txt, and
 * IndexNow feeding Bing, which is what ChatGPT search reads.
 */
import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import { contentSlug } from '../i18n/paths';

export async function GET() {
  const apps = (await getCollection('apps', ({ data }) => data.lang === 'en')).sort(
    (a, b) => a.data.order - b.data.order,
  );

  const posts = (
    await getCollection('blog', ({ data }) => data.lang === 'en' && !data.draft)
  ).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const appLine = (app: (typeof apps)[number]) => {
    const url = `${SITE.url}${app.data.landingPath ?? `/apps/${contentSlug(app.id)}/`}`;
    const host = app.data.hostProducts.map((h) => (h === 'jira' ? 'Jira' : 'Confluence')).join(' and ');
    const price = app.data.priceModel === 'free' ? 'Free' : 'Paid';
    return `- [${app.data.name}](${url}): ${app.data.tagline} (${host} Cloud, ${price})`;
  };

  const body = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    'A partner in the Atlassian Marketplace, based in Canoas, Brazil. Every app is',
    'built on Atlassian Forge and carries the Runs on Atlassian badge, which means',
    'it executes inside Atlassian infrastructure rather than on servers we operate.',
    'The site is published in English (/), Portuguese (/pt-BR/) and Spanish (/es/).',
    '',
    '## Apps',
    '',
    ...apps.map(appLine),
    '',
    '## Writing',
    '',
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${SITE.url}/blog/${contentSlug(post.id)}/): ${post.data.description}`,
    ),
    '',
    '## Optional',
    '',
    `- [About](${SITE.url}/about/): who builds the apps, and what each one stores.`,
    `- [Contact](${SITE.url}/contact/): support via ${SITE.supportUrl}, pre-sales via ${SITE.email}`,
    `- [Atlassian Marketplace vendor page](${SITE.marketplaceUrl})`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
