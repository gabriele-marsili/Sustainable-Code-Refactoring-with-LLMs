//@ts-check

/**
 * @param {string} word
 * @returns {string}
 */
function sortedKey(word) {
  const lowerWord = word.toLowerCase();
  return [...lowerWord].sort().join('');
}

/**
 * @param {string} word
 * @param {string[]} matches
 * @returns {string[]}
 */
export function findAnagrams(word, matches) {
  const lowerWord = word.toLowerCase();
  const sortedWord = sortedKey(word);

  return matches.filter(matchTest => {
    const lowerMatch = matchTest.toLowerCase();
    return lowerWord !== lowerMatch && sortedWord === sortedKey(matchTest);
  });
}