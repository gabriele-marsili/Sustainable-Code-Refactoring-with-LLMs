//@ts-check

/**
 * @param {number} num
 * @param {boolean} [lowercase]
 * @returns {string}
 */
function count(num, lowercase = false) {
  if (num === 0) return `${lowercase ? 'n' : 'N'}o more`;
  if (num === -1) return '99';
  return String(num);
}

/**
 * @param {number} num
 * @param {boolean} [extended]
 * @returns {string}
 */
function bottle(num, extended = false) {
  return `bottle${num !== 1 ? 's' : ''} of beer${extended ? ' on the wall' : ''}`;
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
  const currentCount = count(num);
  const nextCount = count(num - 1, num === 1);
  const currentBottle = bottle(num, true);
  const nextBottle = bottle(num - 1, true);

  return [
    `${currentCount} ${currentBottle}, ${currentCount.toLowerCase()} ${bottle(num)}.`,
    `${take(num)}, ${nextCount} ${nextBottle}.`,
    '',
  ];
}

/**
 * @param {number} begin
 * @param {number} times
 * @returns {string[]}
 */
export function recite(begin = 99, times = 0) {
  return Array.from({ length: times }, (_, i) => verse(begin - i)).flat(1).slice(0, -1);
}