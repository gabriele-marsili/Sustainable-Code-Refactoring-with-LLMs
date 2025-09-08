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
  return num === 0 ? 'Go to the store and buy some more' : `Take ${num === 1 ? 'it' : 'one'} down and pass it around`;
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
  const takeAction = take(num);
  
  return [
    `${currentCount} ${currentBottle}, ${count(num, num === 0)} ${currentBottleShort}.`,
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
  if (times === 0) return [];
  
  const totalLines = times * 3 - 1;
  const verses = new Array(totalLines);
  let index = 0;
  
  for (let i = 0; i < times; i++) {
    const verseLines = verse(begin - i);
    verses[index++] = verseLines[0];
    verses[index++] = verseLines[1];
    if (i < times - 1) {
      verses[index++] = verseLines[2];
    }
  }
  
  return verses;
}