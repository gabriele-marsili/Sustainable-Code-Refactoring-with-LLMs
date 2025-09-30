//@ts-check

/**
 * @param {string} text
 * @returns {string}
 */
export function parse(text) {
  let result = '';
  let i = 0;
  const len = text.length;
  
  while (i < len) {
    const char = text[i];
    
    if (i === 0 || 
        char === '-' || 
        char === '_' || 
        char === ' ' ||
        (char >= 'A' && char <= 'Z' && i > 0 && text[i-1] >= 'a' && text[i-1] <= 'z')) {
      
      if (char !== '-' && char !== '_' && char !== ' ') {
        result += char >= 'a' && char <= 'z' ? String.fromCharCode(char.charCodeAt(0) - 32) : char;
      } else if (i + 1 < len) {
        const nextChar = text[i + 1];
        result += nextChar >= 'a' && nextChar <= 'z' ? String.fromCharCode(nextChar.charCodeAt(0) - 32) : nextChar;
        i++;
      }
    }
    i++;
  }
  
  return result;
}