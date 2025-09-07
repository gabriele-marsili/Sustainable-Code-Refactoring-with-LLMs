//@ts-check

/**
 * @param {string} ccnumber
 * @returns {boolean}
 */
export const valid = ccnumber => {
  const cleanedNumber = ccnumber.replace(/ /g, '');

  if (!/^\d+$/.test(cleanedNumber)) {
    return false;
  }

  const digitsCount = cleanedNumber.length;
  if (digitsCount <= 1) {
    return false;
  }

  let sum = 0;
  for (let i = digitsCount - 1, parity = digitsCount % 2; i >= 0; i--) {
    let digit = parseInt(cleanedNumber[i], 10);

    if ((digitsCount - 1 - i) % 2 === parity) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  return sum % 10 === 0;
};