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

  let remainder = 0;
  let sum = 0;

  for (let i = 0; i < 10; i++) {
    const char = withoutDashes[i];
    const digit = char === 'X' ? 10 : char - '0';
    remainder += digit;
    sum += remainder;
  }

  return sum % 11 === 0;
};