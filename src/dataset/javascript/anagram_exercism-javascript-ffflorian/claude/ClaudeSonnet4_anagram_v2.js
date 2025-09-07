//@ts-check

/**
 * @param {string} word
 * @param {string[]} matches
 * @returns {string[]}
 */
export function findAnagrams(word, matches) {
  const wordLower = word.toLowerCase();
  const wordSorted = [...wordLower].sort().join('');
  const result = [];
  
  for (let i = 0; i < matches.length; i++) {
    const matchLower = matches[i].toLowerCase();
    if (wordLower !== matchLower && wordSorted === [...matchLower].sort().join('')) {
      result.push(matches[i]);
    }
  }
  
  return result;
}