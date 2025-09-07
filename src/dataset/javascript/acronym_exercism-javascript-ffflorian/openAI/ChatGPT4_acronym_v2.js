//@ts-check

/**
 * @param {string} text
 * @returns {string}
 */
export function parse(text) {
  let result = '';
  let prevChar = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (
      (i > 0 && /[a-z]/.test(prevChar) && /[A-Z]/.test(char)) ||
      /[-_ ]/.test(char)
    ) {
      continue;
    }
    if (i === 0 || /[-_ ]/.test(prevChar)) {
      result += char.toUpperCase();
    }
    prevChar = char;
  }
  return result;
}