//@ts-check

/**
 * @param {string} ccnumber
 * @returns {boolean}
 */
export const valid = ccnumber => {
  if (!/^\d[\d ]+$/.test(ccnumber)) {
    return false;
  }

  const digits = ccnumber.replace(/ /g, '');
  const length = digits.length;
  const parity = length % 2;
  let sum = parseInt(digits[length - 1], 10);

  for (let i = 0; i < length - 1; i++) {
    let digit = parseInt(digits[i], 10);
    if (i % 2 === parity) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  return sum % 10 === 0;
};