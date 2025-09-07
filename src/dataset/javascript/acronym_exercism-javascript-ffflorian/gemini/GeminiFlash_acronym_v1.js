//@ts-check

/**
 * @param {string} text
 * @returns {string}
 */
export function parse(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[A-Z]/.test(char) && i > 0 && /[a-z]/.test(text[i - 1])) {
      continue;
    }
    if (char === '-' || char === '_' || char === ' ') {
      continue;
    }
    result += char.charAt(0);
  }
  return result.replace(/[^A-Z]/g, '').toUpperCase();
}