/**
 *
 * @param {string} input
 * @returns string
 */
export function translate(input) {
  return input
    .split(' ')
    .map(word => {
      if (/^([aeiou]|xr|yt)/.test(word)) {
        return word + 'ay';
      }

      const match = word.match(/^(ch|rh|thr?|sch|[^aeiou]?qu)(.*)/);

      if (match) {
        return match[2] + match[1] + 'ay';
      }

      return word.substring(1) + word.substring(0, 1) + 'ay';
    })
    .join(' ');
}