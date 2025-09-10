//@ts-check

/**
 * @param {string} input
 * @returns {boolean}
 */
export const isValid = input => {
  const cleanInput = input.replace(/-/g, '');

  if (!/^\d{0,9}[\dX]$/.test(cleanInput)) {
    return false;
  }

  let sum = 0;
  let remainder = 0;

  for (let i = 0; i < 10; i++) {
    const char = cleanInput[i];
    let digit;

    if (char === 'X') {
      digit = 10;
    } else {
      digit = Number(char);
    }

    remainder += digit;
    sum += remainder;
  }

  return sum % 11 === 0;
};