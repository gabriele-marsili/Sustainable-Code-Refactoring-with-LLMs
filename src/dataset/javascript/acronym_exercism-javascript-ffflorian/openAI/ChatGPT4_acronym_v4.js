//@ts-check

/**
 * @param {string} text
 * @returns {string}
 */
export function parse(text) {
  let result = '';
  for (let i = 0, len = text.length; i < len; i++) {
    const char = text[i];
    if (
      (i > 0 && char >= 'A' && char <= 'Z' && text[i - 1] >= 'a' && text[i - 1] <= 'z') ||
      char === '-' || char === '_' || char === ' '
    ) {
      continue;
    }
    result += char.toUpperCase();
  }
  return result;
}