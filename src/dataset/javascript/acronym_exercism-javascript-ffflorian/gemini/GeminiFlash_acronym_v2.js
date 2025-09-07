//@ts-check

/**
 * @param {string} text
 * @returns {string}
 */
export function parse(text) {
  let result = "";
  const len = text.length;
  for (let i = 0; i < len; i++) {
    const char = text[i];
    if (/[A-Z]/.test(char) && (i === 0 || /[a-z]/.test(text[i - 1]) || text[i - 1] === '-' || text[i - 1] === '_' || text[i - 1] === ' ')) {
      result += char;
    }
  }
  return result.toUpperCase();
}