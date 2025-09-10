//@ts-check

/**
 * @param {string} input
 * @returns {boolean}
 */
export const isValid = input => {
  let sum = 0;
  let remainder = 0;
  let digit;
  let i = 0;

  for (const char of input) {
    if (char === '-') {
      continue;
    }

    if (i > 9) {
      return false;
    }

    if (char === 'X' && i === 9) {
      digit = 10;
    } else {
      digit = Number(char);
      if (isNaN(digit)) {
        return false;
      }
    }

    remainder += digit;
    sum += remainder;
    i++;
  }

  return i === 10 && sum % 11 === 0;
};