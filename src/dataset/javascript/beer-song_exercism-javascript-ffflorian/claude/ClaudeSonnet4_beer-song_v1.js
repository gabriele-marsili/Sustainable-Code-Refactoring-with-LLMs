//@ts-check

/**
 * @param {number} num
 * @param {boolean} [lowercase]
 * @returns {string}
 */
function count(num, lowercase) {
  if (num === 0) return lowercase ? 'no more' : 'No more';
  if (num === -1) return '99';
  return num.toString();
}

/**
 * @param {number} num
 * @param {boolean} [extended]
 * @returns {string}
 */
function bottle(num, extended) {
  const plural = num !== 1 ? 's' : '';
  return extended ? `bottle${plural} of beer on the wall` : `bottle${plural} of beer`;
}

/**
 * @param {number} num
 * @returns {string}
 */
function take(num) {
  if (num === 0) return 'Go to the store and buy some more';
  return num === 1 ? 'Take it down and pass it around' : 'Take one down and pass it around';
}

/**
 * @param {number} num
 * @returns {string[]}
 */
function verse(num) {
  const currentCount = count(num);
  const currentBottle = bottle(num, true);
  const currentBottleShort = bottle(num);
  const nextNum = num - 1;
  const nextCount = count(nextNum, num === 1);
  const nextBottle = bottle(nextNum, true);
  
  return [
    `${currentCount} ${currentBottle}, ${count(num, num === 0)} ${currentBottleShort}.`,
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
  if (times === 0) return [];
  
  const result = [];
  for (let i = 0; i < times; i++) {
    const verseLines = verse(begin - i);
    result.push(verseLines[0], verseLines[1]);
    if (i < times - 1) result.push('');
  }
  return result;
}