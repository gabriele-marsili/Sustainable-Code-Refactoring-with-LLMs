// @ts-check

/**
 * @param {Record<number, string[]>} oldSet
 * @returns {Record<string, number>}
 */
export function transform(oldSet) {
  const newSet = {};
  for (const index in oldSet) {
    if (Object.hasOwn(oldSet, index)) {
      const score = parseInt(index, 10);
      const letters = oldSet[index];
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i].toLowerCase();
        newSet[letter] = score;
      }
    }
  }
  return newSet;
}