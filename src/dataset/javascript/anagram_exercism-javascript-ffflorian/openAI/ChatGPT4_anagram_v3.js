//@ts-check

/**
 * @param {string} word
 * @returns {string}
 */
function sort(word) {
  const charCount = Array(26).fill(0);
  for (const char of word.toLowerCase()) {
    const code = char.charCodeAt(0) - 97;
    if (code >= 0 && code < 26) charCount[code]++;
  }
  return charCount.join(',');
}

/**
 * @param {string} word
 * @param {string[]} matches
 * @returns {string[]}
 */
export function findAnagrams(word, matches) {
  const sortedWord = sort(word);
  const lowerWord = word.toLowerCase();
  return matches.filter(match => {
    const lowerMatch = match.toLowerCase();
    return lowerWord !== lowerMatch && sortedWord === sort(match);
  });
}