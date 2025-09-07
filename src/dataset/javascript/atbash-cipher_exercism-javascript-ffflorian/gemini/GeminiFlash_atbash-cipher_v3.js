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
      let decodedCharCode;

      if (charCode >= 97 && charCode <= 122) {
        decodedCharCode = 97 + 122 - charCode;
      } else if (charCode >= 48 && charCode <= 57) {
        result += char;
        continue;
      } else {
        continue;
      }

      result += String.fromCharCode(decodedCharCode);
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
    if ((i + 1) % 5 === 0 && i + 1 < len) {
      result += ' ';
    }
  }

  return result;
};