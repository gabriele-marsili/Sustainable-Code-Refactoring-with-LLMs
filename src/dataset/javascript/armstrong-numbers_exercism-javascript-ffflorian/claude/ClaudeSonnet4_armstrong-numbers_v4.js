//@ts-check

/**
 * @param {number} candidate
 * @returns {boolean}
 */
export const isArmstrongNumber = candidate => {
  if (candidate < 0) return false;
  
  const str = candidate.toString();
  const numDigits = str.length;
  let sum = 0;
  
  for (let i = 0; i < numDigits; i++) {
    const digit = str.charCodeAt(i) - 48;
    sum += digit ** numDigits;
  }
  
  return sum === candidate;
};