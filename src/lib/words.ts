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
 * 130ms apart, which is close to the 150ms the effect was modelled on but keeps
 * a long headline from running past the lede that follows it. Capped so a
 * headline nobody predicted cannot push the rest of the hero out to five
 * seconds.
 */
export const wordDelay = (index: number, start = 350, step = 130, cap = 8): number =>
  start + Math.min(index, cap) * step;
