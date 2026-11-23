/**
 * Structured data read out of a post's own body.
 *
 * Both helpers derive from text the reader can see, so the markup can never
 * claim something the page does not say. That is the rule that separates a
 * question-and-answer node from the manufactured FAQ blocks search engines and
 * answer engines discount.
 */

/** Markdown inline syntax reduced to the words a reader sees. */
const plain = (text: string): string =>
  text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim();

/** Lines of the body outside fenced code, so a `## ` inside a code sample is not a heading. */
const proseLines = (body: string): string[] => {
  const out: string[] = [];
  let fenced = false;
  for (const line of body.replace(/\r\n/g, '\n').split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      fenced = !fenced;
      out.push('');
      continue;
    }
    out.push(fenced ? '' : line);
  }
  return out;
};

/**
 * The outside sources a post links to, for BlogPosting.citation.
 *
 * The new posts state facts and link the primary source inline; this hands
 * the same list to a machine. Links to our own site are not citations.
 */
export function citationsFrom(body: string, siteUrl: string): string[] {
  const own = new URL(siteUrl).hostname;
  const urls = new Set<string>();
  for (const line of proseLines(body)) {
    for (const match of line.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
      try {
        const url = new URL(match[1]);
        if (url.hostname !== own && !url.hostname.endsWith(`.${own}`)) urls.add(url.toString());
      } catch {
        // A malformed URL in prose is a writing problem, not a schema one.
      }
    }
  }
  return [...urls];
}

/**
 * Question-shaped H2s and the paragraph that answers each one.
 *
 * Only an H2 that ends in a question mark and is followed directly by a prose
 * paragraph qualifies: a question answered by a table or a list has no single
 * answer to quote, so it is left out rather than paraphrased.
 */
export function faqFrom(body: string): { q: string; a: string }[] {
  const lines = proseLines(body);
  const out: { q: string; a: string }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const heading = lines[i].match(/^##\s+(.+\?)\s*$/);
    if (!heading) continue;

    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') j++;
    const para: string[] = [];
    while (j < lines.length && lines[j].trim() !== '' && !/^#{1,6}\s/.test(lines[j])) {
      para.push(lines[j]);
      j++;
    }
    const first = para[0]?.trim() ?? '';
    // Not prose: a table, a list, a quote, a component or an image.
    if (!first || /^(\||[-*+]\s|\d+[.)]\s|>|<|!\[)/.test(first)) continue;

    const answer = plain(para.join(' '));
    if (answer.length >= 40) out.push({ q: plain(heading[1]), a: answer });
  }
  return out;
}
