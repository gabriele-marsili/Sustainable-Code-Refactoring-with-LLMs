//@ts-check

/**
 * @param {number} num
 * @param {boolean} [lowercase]
 * @returns {string}
 */
function count(num, lowercase) {
  if (num === 0) {
    return lowercase ? 'n' + 'o more' : 'N' + 'o more';
  }
  return num === -1 ? '99' : String(num);
}

/**
 * @param {number} num
 * @param {boolean} [extended]
 * @returns {string}
 */
function bottle(num, extended) {
  const plural = num !== 1 ? 's' : '';
  const wall = extended ? ' on the wall' : '';
  return 'bottle' + plural + ' of beer' + wall;
}

/**
 * @param {number} num
 * @returns {string}
 */
function take(num) {
  return num === 0 ? 'Go to the store and buy some more' : 'Take ' + (num === 1 ? 'it' : 'one') + ' down and pass it around';
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
    `${currentCount} ${currentBottle}, ${count(num, num === 0)} ${bottle(num)}.`,
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
  const verses = [];
  let current = begin;
  for (let i = 0; i < times; i++) {
    verses.push(...verse(current));
    current--;
  }
  if (verses.length > 0) {
    verses.pop();
  }
  return verses;
}