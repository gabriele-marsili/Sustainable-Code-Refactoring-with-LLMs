//@ts-check

/**
 * @param {string} text
 * @returns {string}
 */
export function parse(text) {
  let result = '';
  let i = 0;
  const len = text.length;
  
  if (len === 0) return '';
  
  result += text[0].toUpperCase();
  
  for (i = 1; i < len; i++) {
    const char = text[i];
    const prevChar = text[i - 1];
    
    if ((char >= 'A' && char <= 'Z' && prevChar >= 'a' && prevChar <= 'z') ||
        char === '-' || char === '_' || char === ' ') {
      if (char !== '-' && char !== '_' && char !== ' ') {
        result += char;
      } else if (i + 1 < len) {
        result += text[++i].toUpperCase();
      }
    }
  }
  
  return result;
}