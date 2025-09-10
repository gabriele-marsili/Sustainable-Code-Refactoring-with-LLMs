/**
 *
 * @param {string} input
 * @returns string
 */
export function translate(input) {
  return input
    .split(' ')
    .map(word => {
      const firstLetter = word[0];
      if (/[aeiou]/.test(firstLetter) || word.startsWith('xr') || word.startsWith('yt')) {
        return word + 'ay';
      }

      let consonantCluster = '';
      let restOfWord = word;

      if (word.startsWith('ch')) {
        consonantCluster = 'ch';
        restOfWord = word.slice(2);
      } else if (word.startsWith('rh')) {
        consonantCluster = 'rh';
        restOfWord = word.slice(2);
      } else if (word.startsWith('thr')) {
        consonantCluster = 'thr';
        restOfWord = word.slice(3);
      } else if (word.startsWith('th')) {
          consonantCluster = 'th';
          restOfWord = word.slice(2);
      } else if (word.startsWith('sch')) {
        consonantCluster = 'sch';
        restOfWord = word.slice(3);
      } else if (word.startsWith('qu')) {
        consonantCluster = 'qu';
        restOfWord = word.slice(2);
      } else if (word.length > 1 && word[1] === 'u' && !/[aeiou]/.test(firstLetter)) {
          consonantCluster = word.slice(0,2);
          restOfWord = word.slice(2);
      }
      else if (!/[aeiou]/.test(firstLetter)) {
        consonantCluster = firstLetter;
        restOfWord = word.slice(1);
      }

      if (consonantCluster) {
        return restOfWord + consonantCluster + 'ay';
      }

      return word.slice(1) + firstLetter + 'ay';
    })
    .join(' ');
}