//@ts-check

/**
 * @param {Date} beginTime
 * @returns {Date}
 */
export function gigasecond(beginTime) {
  const gigasecondInMilliseconds = 1000000000000;
  return new Date(beginTime.valueOf() + gigasecondInMilliseconds);
}