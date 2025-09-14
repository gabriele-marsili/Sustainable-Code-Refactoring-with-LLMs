//@ts-check

/**
 * @param {string} input
 * @returns {boolean}
 */
export const isValid = input => {
  let digitCount = 0;
  let remainder = 0;
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    
    if (char === '-') continue;
    
    if (digitCount >= 10) return false;
    
    let digit;
    if (char === 'X') {
      if (digitCount !== 9) return false;
      digit = 10;
    } else if (char >= '0' && char <= '9') {
      digit = char.charCodeAt(0) - 48;
    } else {
      return false;
    }
    
    remainder += digit;
    sum += remainder;
    digitCount++;
  }

  return digitCount === 10 && sum % 11 === 0;
};