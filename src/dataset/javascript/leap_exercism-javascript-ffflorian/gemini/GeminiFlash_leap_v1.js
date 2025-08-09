//@ts-check

/**
 * @param {number} year
 * @returns {boolean}
 */
export const isLeap = year => (year & 3) === 0 && (year % 100 !== 0 || year % 400 === 0);