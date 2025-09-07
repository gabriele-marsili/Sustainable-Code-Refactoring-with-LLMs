//@ts-check

/**
 * @param {number} candidate
 * @returns {boolean}
 */
export const isArmstrongNumber = candidate => {
  const str = candidate.toString();
  const length = str.length;
  let sum = 0;
  
  for (let i = 0; i < length; i++) {
    const digit = str.charCodeAt(i) - 48; // Convert char to number without parsing
    sum += digit ** length;
  }
  
  return sum === candidate;
};