//@ts-check

/**
 * @param {Date} beginTime
 * @returns {Date}
 */
export function gigasecond(beginTime) {
  return new Date(+beginTime + 1000000000000);
}