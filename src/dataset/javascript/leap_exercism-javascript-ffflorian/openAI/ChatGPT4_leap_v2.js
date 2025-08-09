//@ts-check

/**
 * @param {number} year
 * @returns {boolean}
 */
export const isLeap = year => {
  if ((year & 3) !== 0) return false;
  if (year % 25 !== 0) return true;
  return year % 16 === 0;
};