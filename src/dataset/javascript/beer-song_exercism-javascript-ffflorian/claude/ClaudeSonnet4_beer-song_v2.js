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
 * @param {number} begin
 * @param {number} times
 * @returns {string[]}
 */
export function recite(begin = 99, times = 0) {
  if (times === 0) return [];
  
  const verses = [];
  const capacity = times * 3 - 1;
  verses.length = capacity;
  
  let idx = 0;
  for (let i = 0; i < times; i++) {
    const num = begin - i;
    const nextNum = num - 1;
    const isLast = i === times - 1;
    
    verses[idx++] = `${count(num)} ${bottle(num, true)}, ${count(num, num === 0)} ${bottle(num)}.`;
    verses[idx++] = `${take(num)}, ${count(nextNum, num === 1)} ${bottle(nextNum, true)}.`;
    
    if (!isLast) {
      verses[idx++] = '';
    }
  }
  
  return verses;
}