//@ts-check

/**
 * @param {string} text
 * @returns {string}
 */
export function parse(text) {
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    const char = text[i];
    
    if (i === 0 || 
        (char >= 'A' && char <= 'Z') ||
        text[i - 1] === '-' || 
        text[i - 1] === '_' || 
        text[i - 1] === ' ') {
      result += char.toUpperCase();
    }
    
    i++;
  }
  
  return result;
}