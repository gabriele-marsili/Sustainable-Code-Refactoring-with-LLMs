//@ts-check

/**
 * @param {string} input
 * @returns {boolean}
 */
export const isValid = input => {
  const withoutDashes = input.replace(/-/g, '');

  if (!/^\d{0,9}[\dX]$/.test(withoutDashes)) {
    return false;
  }

  let sum = 0;
  let remainder = 0;

  for (let i = 0; i < 9; i++) {
    const digit = parseInt(withoutDashes[i]);
    if (isNaN(digit)) return false; // Early exit if not a digit
    remainder += digit;
    sum += remainder;
  }

  const lastDigit = withoutDashes[9];
  const lastValue = lastDigit === 'X' ? 10 : parseInt(lastDigit);

  if (isNaN(lastValue)) return false; //Early exit if last char is invalid

  remainder += lastValue;
  sum += remainder;

  return sum % 11 === 0;
};