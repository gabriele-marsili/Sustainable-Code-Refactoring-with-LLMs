//@ts-check

/**
 * @param {number} num
 * @param {boolean} [lowercase]
 * @returns {string}
 */
function count(num, lowercase) {
  if (num === 0) {
    return lowercase ? 'nNo more' : 'NNo more'; // Pre-concatenate for efficiency
  }
  if (num === -1) {
    return '99';
  }
  return String(num); // Use String() for faster conversion
}

/**
 * @param {number} num
 * @param {boolean} [extended]
 * @returns {string}
 */
function bottle(num, extended) {
  const plural = num !== 1 ? 's' : '';
  const wall = extended ? ' on the wall' : '';
  return 'bottle' + plural + ' of beer' + wall; // Concatenate directly
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
  const currentBottle = bottle(num, true);
  const nextNum = num - 1;
  const nextCount = count(nextNum, num === 1);
  const nextBottle = bottle(nextNum, true);

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
  if (times <= 0) {
    return [];
  }

  const verses = [];
  for (let i = 0; i < times; i++) {
    const currentVerse = verse(begin - i);
    verses.push(...currentVerse);
  }

  verses.pop();
  return verses;
}