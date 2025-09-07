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
  let sum = digits.charCodeAt(length - 1) - 48;

  for (let i = 0; i < length - 1; i++) {
    let digit = digits.charCodeAt(i) - 48;
    if (i % 2 === parity) {
      digit <<= 1;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  return sum % 10 === 0;
};