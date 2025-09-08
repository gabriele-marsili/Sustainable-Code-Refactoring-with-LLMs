//@ts-check

/**
 * @param {string} word
 * @returns {boolean}
 */
export function isIsogram(word) {
  const lowerCaseWord = word.toLowerCase();
  const charSet = new Set();

  for (let i = 0; i < lowerCaseWord.length; i++) {
    const char = lowerCaseWord[i];
    if (!/[a-zà-ÿ]/.test(char)) {
      continue;
    }
    if (charSet.has(char)) {
      return false;
    }
    charSet.add(char);
  }

  return true;
}