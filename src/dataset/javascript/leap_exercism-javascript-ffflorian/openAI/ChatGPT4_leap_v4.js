//@ts-check

/**
 * @param {number} year
 * @returns {boolean}
 */
export const isLeap = year => {
  if (year % 4 !== 0) return false;
  if (year % 100 !== 0) return true;
  return year % 400 === 0;
};