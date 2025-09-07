//@ts-check

/**
 * @param {number} candidate
 * @returns {boolean}
 */
export const isArmstrongNumber = candidate => {
  const candidateString = candidate.toString();
  const numDigits = candidateString.length;
  let sum = 0;
  for (let i = 0; i < numDigits; i++) {
    const digit = parseInt(candidateString[i], 10);
    sum += Math.pow(digit, numDigits);
  }
  return sum === candidate;
};