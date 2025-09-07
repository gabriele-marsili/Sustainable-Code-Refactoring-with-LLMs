//@ts-check

/**
 * @param {string} input
 * @returns {string}
 */
export const decode = input => {
  let result = '';
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const charCode = char.charCodeAt(0);
    
    if ((charCode >= 48 && charCode <= 57)) { // 0-9
      result += char;
    } else if (charCode >= 65 && charCode <= 90) { // A-Z
      result += String.fromCharCode(90 - (charCode - 65));
    } else if (charCode >= 97 && charCode <= 122) { // a-z
      result += String.fromCharCode(122 - (charCode - 97));
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
  for (let i = 0; i < decoded.length; i += 5) {
    if (i > 0) result += ' ';
    result += decoded.slice(i, i + 5);
  }
  return result;
};