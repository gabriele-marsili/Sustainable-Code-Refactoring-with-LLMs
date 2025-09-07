//@ts-check

/**
 * @param {string} word
 * @returns {string}
 */
function sortedKey(word) {
  const lowerCaseWord = word.toLowerCase();
  return [...lowerCaseWord].sort().join('');
}

/**
 * @param {string} word
 * @param {string[]} matches
 * @returns {string[]}
 */
export function findAnagrams(word, matches) {
  const lowerCaseWord = word.toLowerCase();
  const sortedWord = sortedKey(word);

  return matches.filter(matchTest => {
    const lowerCaseMatch = matchTest.toLowerCase();
    if (lowerCaseWord === lowerCaseMatch) {
      return false;
    }
    return sortedWord === sortedKey(matchTest);
  });
}