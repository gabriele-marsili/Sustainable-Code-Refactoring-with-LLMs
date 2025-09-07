//@ts-check

/**
 * @param {string} word
 * @returns {string}
 */
function getSortedKey(word) {
  return word.toLowerCase().split('').sort().join('');
}

/**
 * @param {string} word
 * @param {string[]} matches
 * @returns {string[]}
 */
export function findAnagrams(word, matches) {
  const wordKey = getSortedKey(word);
  const lowerWord = word.toLowerCase();

  return matches.filter(match => {
    const lowerMatch = match.toLowerCase();
    return lowerWord !== lowerMatch && wordKey === getSortedKey(match);
  });
}