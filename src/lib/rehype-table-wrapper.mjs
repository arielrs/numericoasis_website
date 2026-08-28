/**
 * Wraps every markdown table in a scrollable container.
 *
 * A comparison table needs a minimum width to stay readable, but a bare
 * `overflow-x: auto` on the table itself does not help: the min-width applies to
 * the scrolling element, so it overflows its parent instead of scrolling inside
 * it. Verified on a 375px viewport, where the post pushed the page to 560px.
 *
 * Written as a manual walk rather than pulling in unist-util-visit, since it
 * only needs to look at direct children of the root.
 */
export function rehypeTableWrapper() {
  return function (tree) {
    const wrap = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'element' && child.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            // tabIndex makes the scroll container keyboard-reachable. Without
            // it the overflow is mouse-only, which is a WCAG 2.1.1 Level A
            // failure: 37% of the comparison table could not be reached.
            properties: { className: ['table-scroll'], tabIndex: 0 },
            children: [child],
          };
        }
        wrap(child);
        return child;
      });
    };
    wrap(tree);
  };
}
