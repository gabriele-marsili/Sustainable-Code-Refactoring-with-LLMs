//@ts-check

/**
 * @param {string} input
 * @returns {boolean}
 */
export const isValid = input => {
  let remainder = 0;
  let sum = 0;
  let factor = 1;

  for (let i = 0, len = input.length; i < len; i++) {
    const char = input[i];
    if (char === '-') continue;

    const digit = char === 'X' ? 10 : char.charCodeAt(0) - 48;
    if (digit < 0 || digit > 10 || factor > 10) return false;

    remainder += digit;
    sum += remainder;
    factor++;
  }

  return factor === 11 && sum % 11 === 0;
};