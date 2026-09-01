/**
 * Split a heading into words for the per-word hero entrance.
 *
 * Deliberately trivial, and deliberately done at build time rather than in the
 * browser: the spans ship in the HTML, so there is no script to fail, no flash
 * of unsplit text, and nothing to re-run on navigation.
 *
 * Safe on every heading it is used for. Each of them is a plain dictionary
 * string in all three locales, and none contains markup. The one heading on the
 * site that does, `/apps/<slug>/`, wraps an optional span for the app
 * descriptor and is not split for exactly that reason.
 */
export const words = (text: string): string[] => text.split(/\s+/).filter(Boolean);

/**
 * The delay for word `index`, in milliseconds.
 *
 * Was 350 + 130n. Cut by a quarter to 260 + 98n, which takes a seven word
 * headline from settling at 1730ms to settling at 1298ms. The effect survives
 * the cut because what makes it read as composed is the stagger being visible
 * at all, not its absolute length.
 *
 * Capped so a headline nobody predicted cannot push the rest of the hero out to
 * five seconds. The cap is 12 because the longest shipped headline is the
 * pt-BR home hero at 13 words, and at 8 its last five words shared one delay
 * and landed together, which is the effect switching itself off in the two
 * locales nobody was checking. 12 settles at 1436ms, still under the 1730ms
 * this all started from.
 */
export const wordDelay = (index: number, start = 260, step = 98, cap = 12): number =>
  start + Math.min(index, cap) * step;
