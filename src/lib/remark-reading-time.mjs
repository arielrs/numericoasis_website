import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

/**
 * Exposes reading time on `remarkPluginFrontmatter`.
 *
 * Emits minutes as a number rather than a formatted string. Emitting the string
 * is the usual mistake and it hardcodes English into every locale; the template
 * formats it per language.
 */
export function remarkReadingTime() {
  return function (tree, { data }) {
    const text = toString(tree);
    data.astro.frontmatter.readingMinutes = Math.max(1, Math.round(getReadingTime(text).minutes));
    data.astro.frontmatter.wordCount = text.split(/\s+/).filter(Boolean).length;
  };
}
