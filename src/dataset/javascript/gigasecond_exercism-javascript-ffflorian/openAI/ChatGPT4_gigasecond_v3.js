//@ts-check

/**
 * @param {Date} beginTime
 * @returns {Date}
 */
export function gigasecond(beginTime) {
  const GIGASECOND_MS = 1_000_000_000_000;
  return new Date(beginTime.valueOf() + GIGASECOND_MS);
}