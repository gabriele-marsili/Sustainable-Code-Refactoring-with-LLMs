//@ts-check

/**
 * @param {number} candidate
 * @returns {boolean}
 */
export const isArmstrongNumber = candidate => {
  if (candidate < 0) return false;
  
  let temp = candidate;
  let digitCount = 0;
  
  while (temp > 0) {
    digitCount++;
    temp = Math.floor(temp / 10);
  }
  
  temp = candidate;
  let sum = 0;
  
  while (temp > 0) {
    const digit = temp % 10;
    sum += digit ** digitCount;
    temp = Math.floor(temp / 10);
  }
  
  return sum === candidate;
};