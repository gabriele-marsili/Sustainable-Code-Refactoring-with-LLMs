//@ts-check

/**
 * @param {string} input
 * @returns {boolean}
 */
export const isValid = input => {
  const withoutDashes = input.replace(/-/g, '');

  if (withoutDashes.length !== 10 || !/^\d{9}[\dX]$/.test(withoutDashes)) {
    return false;
  }

  let sum = 0, remainder = 0;

  for (let i = 0; i < 10; i++) {
    const digit = withoutDashes[i] === 'X' ? 10 : withoutDashes.charCodeAt(i) - 48;
    remainder += digit;
    sum += remainder;
  }

  return sum % 11 === 0;
};