//@ts-check

/**
 * @param {string} word
 * @returns {string}
 */
function sort(word) {
  return word.toLowerCase().split('').sort().join('');
}

/**
 * @param {string} word
 * @param {string[]} matches
 * @returns {string[]}
 */
export function findAnagrams(word, matches) {
  const wordLower = word.toLowerCase();
  const wordSorted = sort(word);
  const result = [];
  
  for (let i = 0; i < matches.length; i++) {
    const matchTest = matches[i];
    const matchLower = matchTest.toLowerCase();
    
    if (wordLower !== matchLower && wordSorted === sort(matchTest)) {
      result.push(matchTest);
    }
  }
  
  return result;
}