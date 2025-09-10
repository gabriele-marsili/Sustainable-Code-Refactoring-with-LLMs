/**
 *
 * @param {string} input
 * @returns string
 */
export function translate(input) {
  const vowelRegex = /^([aeoui]|xr|yt)/;
  const consonantRegex = /^(ch|rh|thr?|sch|[^aeoui]?qu)(.*)/;

  return input
    .split(' ')
    .map(word => {
      if (vowelRegex.test(word)) {
        return word + 'ay';
      }

      const match = consonantRegex.exec(word);
      if (match) {
        return match[2] + match[1] + 'ay';
      }

      return word.slice(1) + word[0] + 'ay';
    })
    .join(' ');
}