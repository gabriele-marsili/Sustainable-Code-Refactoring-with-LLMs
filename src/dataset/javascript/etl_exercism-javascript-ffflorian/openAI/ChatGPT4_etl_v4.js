// @ts-check

/**
 * @param {Record<number, string[]>} oldSet
 * @returns {Record<string, number>}
 */
export function transform(oldSet) {
  const newSet = {};
  for (const [index, letters] of Object.entries(oldSet)) {
    const value = Number(index);
    for (const letter of letters) {
      newSet[letter.toLowerCase()] = value;
    }
  }
  return newSet;
}