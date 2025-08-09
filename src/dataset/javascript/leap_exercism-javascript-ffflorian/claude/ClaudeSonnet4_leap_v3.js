//@ts-check

/**
 * @param {number} year
 * @returns {boolean}
 */
export const isLeap = year => !(year & 3) && (year % 100 || !(year % 400));