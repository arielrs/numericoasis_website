import type { CollectionEntry } from 'astro:content';

export const POSTS_PER_PAGE = 9;

/**
 * Related posts, computed at build time so the page ships no JavaScript for it.
 *
 * Same locale, self excluded, ranked by how many tags a post shares, ties broken
 * by recency. Falls back to the most recent posts when nothing shares a tag, so
 * the section is never empty on a young blog.
 */
export function relatedPosts(
  current: CollectionEntry<'blog'>,
  pool: CollectionEntry<'blog'>[],
  limit = 3,
): CollectionEntry<'blog'>[] {
  const currentTags = new Set(current.data.tags);

  const scored = pool
    .filter((p) => p.id !== current.id && p.data.lang === current.data.lang && !p.data.draft)
    .map((post) => ({
      post,
      shared: post.data.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .sort(
      (a, b) =>
        b.shared - a.shared || b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime(),
    );

  // Only pad with unrelated posts when nothing shares a tag at all. The
  // cornerstone cost post has one real match and two consultancy-era posts
  // behind it, and "Related reading" was showing all three.
  const matched = scored.filter((s) => s.shared > 0);
  const chosen = matched.length > 0 ? matched : scored;

  return chosen.slice(0, limit).map((s) => s.post);
}
