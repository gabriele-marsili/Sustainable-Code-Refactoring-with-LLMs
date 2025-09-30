//@ts-check

/**
 * @param {string} input
 * @returns {string}
 */
export const decode = input => {
  let result = '';
  
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const code = char.charCodeAt(0);
    
    if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      if (code >= 48 && code <= 57) {
        result += char;
      } else {
        const isLower = code >= 97;
        const base = isLower ? 97 : 65;
        result += String.fromCharCode(base + 25 - (code - base));
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
  let result = '';
  
  for (let i = 0; i < decoded.length; i += 5) {
    if (i > 0) result += ' ';
    result += decoded.slice(i, i + 5);
  }
  
  return result;
};