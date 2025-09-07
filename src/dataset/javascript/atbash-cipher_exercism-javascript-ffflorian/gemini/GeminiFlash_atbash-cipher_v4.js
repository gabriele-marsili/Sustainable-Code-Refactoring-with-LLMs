//@ts-check

/**
 * @param {string} input
 * @returns {string}
 */
export const decode = input => {
  let result = '';
  const len = input.length;

  for (let i = 0; i < len; i++) {
    const char = input[i];
    if (/[A-Za-z\d]/.test(char)) {
      const lowerChar = char.toLowerCase();
      const charCode = lowerChar.charCodeAt(0);

      if (charCode >= 97 && charCode <= 122) {
        result += String.fromCharCode(97 + 122 - charCode);
      } else if (charCode >= 48 && charCode <= 57) {
        result += char;
      }
    }
  }
  return result;
};

/**
 * @param {string} input
 * @returns {string}
 */
export const encode = input => {
  const decoded = decode(input);
  const len = decoded.length;
  let result = '';

  for (let i = 0; i < len; i++) {
    result += decoded[i];
    if ((i + 1) % 5 === 0 && i !== len - 1) {
      result += ' ';
    }
  }
  return result;
};