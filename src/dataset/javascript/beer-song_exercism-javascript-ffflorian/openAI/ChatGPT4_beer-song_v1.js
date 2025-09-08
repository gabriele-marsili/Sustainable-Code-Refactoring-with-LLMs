//@ts-check

/**
 * @param {number} num
 * @param {boolean} [lowercase]
 * @returns {string}
 */
function count(num, lowercase) {
  if (num === 0) return `${lowercase ? 'n' : 'N'}o more`;
  if (num === -1) return '99';
  return String(num);
}

/**
 * @param {number} num
 * @param {boolean} [extended]
 * @returns {string}
 */
function bottle(num, extended) {
  return `bottle${num === 1 ? '' : 's'} of beer${extended ? ' on the wall' : ''}`;
}

/**
 * @param {number} num
 * @returns {string}
 */
function take(num) {
  return num === 0 ? 'Go to the store and buy some more' : `Take ${num === 1 ? 'it' : 'one'} down and pass it around`;
}

/**
 * @param {number} num
 * @returns {string[]}
 */
function verse(num) {
  const nextNum = num - 1;
  const isZero = num === 0;
  return [
    `${count(num)} ${bottle(num, true)}, ${count(num, isZero)} ${bottle(num)}.`,
    `${take(num)}, ${count(nextNum, num === 1)} ${bottle(nextNum, true)}.`,
    '',
  ];
}

/**
 * @param {number} begin
 * @param {number} times
 * @returns {string[]}
 */
export function recite(begin = 99, times = 0) {
  const verses = new Array(times * 3 - 1);
  for (let i = 0, idx = 0; i < times; i++) {
    const v = verse(begin - i);
    verses[idx++] = v[0];
    verses[idx++] = v[1];
    if (idx < verses.length) verses[idx++] = v[2];
  }
  return verses;
}