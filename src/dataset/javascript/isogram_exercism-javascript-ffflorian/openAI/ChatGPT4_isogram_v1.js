//@ts-check

/**
 * @param {string} word
 * @returns {boolean}
 */
export function isIsogram(word) {
  const seen = new Set();
  for (const char of word.toLowerCase()) {
    if (seen.has(char) && /[a-zà-ÿ]/i.test(char)) {
      return false;
    }
    seen.add(char);
  }
  return true;
}