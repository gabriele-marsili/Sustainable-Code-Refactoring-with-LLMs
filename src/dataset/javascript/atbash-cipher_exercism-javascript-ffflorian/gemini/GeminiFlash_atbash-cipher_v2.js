//@ts-check

/**
 * @param {string} input
 * @returns {string}
 */
export const decode = input => {
  let result = '';
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (/[A-Za-z]/.test(char)) {
      const lowerChar = char.toLowerCase();
      const charCode = lowerChar.charCodeAt(0);
      const startIndex = 97;
      result += String.fromCharCode(startIndex + 25 - (charCode - startIndex));
    } else if (/\d/.test(char)) {
      result += char;
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
  let result = '';
  for (let i = 0; i < decoded.length; i++) {
    result += decoded[i];
    if ((i + 1) % 5 === 0 && i !== decoded.length - 1) {
      result += ' ';
    }
  }
  return result;
};