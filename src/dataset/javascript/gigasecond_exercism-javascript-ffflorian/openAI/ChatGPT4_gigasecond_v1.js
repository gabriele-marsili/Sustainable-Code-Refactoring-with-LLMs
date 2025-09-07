//@ts-check

/**
 * @param {Date} beginTime
 * @returns {Date}
 */
export function gigasecond(beginTime) {
  const GIGASECOND_MS = 1e12;
  return new Date(beginTime.valueOf() + GIGASECOND_MS);
}