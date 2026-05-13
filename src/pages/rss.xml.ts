import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import { contentSlug } from '../i18n/paths';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (
    await getCollection('blog', ({ data }) => data.lang === 'en' && !data.draft)
  ).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: `${SITE.name} Blog`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${contentSlug(post.id)}/`,
      categories: [...post.data.tags],
      author: post.data.author,
    })),
    customData: `<language>en-us</language>`,
  });
}
