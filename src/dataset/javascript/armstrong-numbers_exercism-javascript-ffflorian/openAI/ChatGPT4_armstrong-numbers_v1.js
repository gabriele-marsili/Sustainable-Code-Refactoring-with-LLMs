//@ts-check

/**
 * @param {number} candidate
 * @returns {boolean}
 */
export const isArmstrongNumber = candidate => {
  const str = candidate.toString();
  const len = str.length;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    const digit = str.charCodeAt(i) - 48; // Convert char to number
    sum += digit ** len;
    if (sum > candidate) return false; // Early exit if sum exceeds candidate
  }
  return sum === candidate;
};