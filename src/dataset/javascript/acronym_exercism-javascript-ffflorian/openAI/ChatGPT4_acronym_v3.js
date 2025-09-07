//@ts-check

/**
 * @param {string} text
 * @returns {string}
 */
export function parse(text) {
  let result = '';
  let isPrevLower = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '-' || char === '_' || char === ' ') {
      isPrevLower = false;
      continue;
    }
    if (isPrevLower && char >= 'A' && char <= 'Z') {
      result += char;
    } else if (!isPrevLower) {
      result += char;
    }
    isPrevLower = char >= 'a' && char <= 'z';
  }
  return result.toUpperCase();
}