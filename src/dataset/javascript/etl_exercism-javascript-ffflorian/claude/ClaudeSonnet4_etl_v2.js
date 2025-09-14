// @ts-check

/**
 * @param {Record<number, string[]>} oldSet
 * @returns {Record<string, number>}
 */
export function transform(oldSet) {
  const newSet = {};
  for (const index in oldSet) {
    const numIndex = +index;
    const letters = oldSet[index];
    for (let i = 0; i < letters.length; i++) {
      newSet[letters[i].toLowerCase()] = numIndex;
    }
  }
  return newSet;
}