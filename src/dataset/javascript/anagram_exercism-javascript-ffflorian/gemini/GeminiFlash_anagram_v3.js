//@ts-check

/**
 * @param {string} word
 * @returns {string}
 */
function sort(word) {
  const charArray = Array(26).fill(0);
  for (let i = 0; i < word.length; i++) {
    const charCode = word.charCodeAt(i) - 97;
    if (charCode >= 0 && charCode < 26) {
      charArray[charCode]++;
    }
  }
  return charArray.join('');
}

/**
 * @param {string} word
 * @param {string[]} matches
 * @returns {string[]}
 */
export function findAnagrams(word, matches) {
  const lowerWord = word.toLowerCase();
  const sortedWord = sort(lowerWord);

  return matches.filter(matchTest => {
    const lowerMatch = matchTest.toLowerCase();
    return lowerWord !== lowerMatch && sortedWord === sort(lowerMatch);
  });
}