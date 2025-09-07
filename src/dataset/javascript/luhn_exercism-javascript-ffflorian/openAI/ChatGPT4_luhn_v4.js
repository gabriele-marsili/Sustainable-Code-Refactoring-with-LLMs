//@ts-check

/**
 * @param {string} ccnumber
 * @returns {boolean}
 */
export const valid = ccnumber => {
  if (!/^\d[\d ]+$/.test(ccnumber)) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = ccnumber.length - 1; i >= 0; i--) {
    const char = ccnumber[i];
    if (char === ' ') continue;

    let digit = char.charCodeAt(0) - 48;
    if (shouldDouble) {
      digit = digit * 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};