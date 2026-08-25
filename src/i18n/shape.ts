/**
 * Widens literal types to their base primitive while preserving the exact key
 * structure of the reference dictionary.
 *
 * The reference dictionaries are declared `as const`, which makes every string a
 * literal type. Checking a translation with `satisfies typeof en` therefore
 * demands that the Portuguese copy literally equal the English copy, which is
 * never true. `Shape<typeof en>` keeps the keys and drops the values, so a
 * translation must match the structure and nothing else.
 *
 * Because the mapped types below are homomorphic, they preserve readonly-ness,
 * optionality, and tuple length. A translated array with fewer entries than the
 * English one is a type error, which is the drift `satisfies` alone misses.
 */
export type Shape<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T extends readonly unknown[]
    ? { [K in keyof T]: Shape<T[K]> }
    : T extends string
      ? string
      : T extends number
        ? number
        : T extends boolean
          ? boolean
          : T extends object
            ? { [K in keyof T]: Shape<T[K]> }
            : T;
