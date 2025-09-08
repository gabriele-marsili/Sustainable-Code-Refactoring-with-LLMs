//@ts-check

/**
 * @param {string} word
 * @returns {boolean}
 */
export function isIsogram(word) {
  const lowerCaseWord = word.toLowerCase();
  const letters = new Set();

  for (let i = 0; i < lowerCaseWord.length; i++) {
    const char = lowerCaseWord[i];
    if (char >= 'a' && char <= 'z') {
      if (letters.has(char)) {
        return false;
      }
      letters.add(char);
    }
  }

  return true;
}