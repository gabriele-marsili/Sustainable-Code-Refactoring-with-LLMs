//@ts-check

/**
 * @param {Date} beginTime
 * @returns {Date}
 */
export const gigasecond = (beginTime) => new Date(beginTime.valueOf() + 1e12);