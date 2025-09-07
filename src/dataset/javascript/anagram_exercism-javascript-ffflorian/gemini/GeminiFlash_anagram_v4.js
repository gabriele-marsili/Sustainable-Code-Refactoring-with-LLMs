//@ts-check

/**
 * @param {string} word
 * @returns {string}
 */
function sort(word) {
  return [...word].sort().join('');
}

/**
 * @param {string} word
 * @param {string[]} matches
 * @returns {string[]}
 */
export function findAnagrams(word, matches) {
  const lowerWord = word.toLowerCase();
  const sortedWord = sort(lowerWord);

  return matches.reduce((/** @type string[] */ result, matchTest) => {
    const lowerMatch = matchTest.toLowerCase();
    if (lowerWord !== lowerMatch) {
      if (sortedWord === sort(lowerMatch)) {
        result.push(matchTest);
      }
    }
    return result;
  }, []);
}