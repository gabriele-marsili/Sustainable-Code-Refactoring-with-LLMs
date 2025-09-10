// @ts-check

/**
 * @param {Record<number, string[]>} oldSet
 * @returns {Record<string, number>}
 */
export function transform(oldSet) {
  const newSet = {};
  for (const index in oldSet) {
    if (Object.hasOwn(oldSet, index)) {
      const letters = oldSet[index];
      const score = parseInt(index);
      for (let i = 0; i < letters.length; i++) {
        newSet[letters[i].toLowerCase()] = score;
      }
    }
  }
  return newSet;
}