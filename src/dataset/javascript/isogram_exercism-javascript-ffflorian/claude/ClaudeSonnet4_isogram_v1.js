//@ts-check

/**
 * @param {string} word
 * @returns {boolean}
 */
export function isIsogram(word) {
  const seen = new Set();
  for (let i = 0; i < word.length; i++) {
    const char = word[i].toLowerCase();
    if (seen.has(char)) {
      return false;
    }
    seen.add(char);
  }
  return true;
}