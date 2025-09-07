//@ts-check

/**
 * @param {string} ccnumber
 * @returns {boolean}
 */
export const valid = ccnumber => {
  const cleanedNumber = ccnumber.replace(/ /g, '');

  if (!/^\d+$/.test(cleanedNumber) || cleanedNumber.length <= 1) {
    return false;
  }

  let sum = 0;
  const len = cleanedNumber.length;

  for (let i = len - 1; i >= 0; i--) {
    let digit = parseInt(cleanedNumber[i], 10);

    if ((len - 1 - i) % 2 !== 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  return sum % 10 === 0;
};