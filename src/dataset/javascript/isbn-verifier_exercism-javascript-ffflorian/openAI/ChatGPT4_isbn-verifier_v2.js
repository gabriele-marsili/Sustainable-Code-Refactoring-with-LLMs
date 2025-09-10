//@ts-check

/**
 * @param {string} input
 * @returns {boolean}
 */
export const isValid = input => {
  let sum = 0, remainder = 0, factor = 1;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '-') continue;

    const digit = char === 'X' ? 10 : Number(char);
    if (isNaN(digit) || factor > 10) return false;

    remainder += digit;
    sum += remainder;
    factor++;
  }

  return factor === 11 && sum % 11 === 0;
};