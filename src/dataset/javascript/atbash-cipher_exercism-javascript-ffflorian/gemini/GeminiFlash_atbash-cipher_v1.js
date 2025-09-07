//@ts-check

/**
 * @param {string} input
 * @returns {string}
 */
export const decode = input => {
  let result = "";
  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    if (/[A-Za-z\d]/.test(char)) {
      char = char.toLowerCase();
      const charCode = char.charCodeAt(0);
      const startIndex = charCode >= 97 ? 97 : 65;

      if (charCode >= 97 && charCode <= 122 || charCode >= 65 && charCode <= 90) {
        result += String.fromCharCode(startIndex + 25 - (charCode - startIndex));
      } else {
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
  let result = "";
  for (let i = 0; i < decoded.length; i++) {
    result += decoded[i];
    if ((i + 1) % 5 === 0 && i + 1 !== decoded.length) {
      result += " ";
    }
  }
  return result;
};