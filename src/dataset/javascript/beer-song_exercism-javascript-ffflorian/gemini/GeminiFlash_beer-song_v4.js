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
  if (num === -1) {
    return '99';
  }
  return String(num);
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
  if (num === 0) {
    return 'Go to the store and buy some more';
  }
  return 'Take ' + (num === 1 ? 'it' : 'one') + ' down and pass it around';
}

/**
 * @param {number} num
 * @returns {string[]}
 */
function verse(num) {
  const n = num === 0;
  const currentCount = count(num);
  const nextCount = count(num - 1, num === 1);
  const currentBottle = bottle(num, true);
  const nextBottle = bottle(num - 1, true);
  const takeAction = take(num);

  return [
    `${currentCount} ${currentBottle}, ${count(num, n)} ${bottle(num)}.`,
    `${takeAction}, ${nextCount} ${nextBottle}.`,
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
  if (times > 0) {
    for (let i = 0; i < times; i++) {
      const currentVerse = verse(begin - i);
      verses.push(...currentVerse);
    }
    verses.pop();
  }
  return verses;
}