//@ts-check

/**
 * @param {string} text
 * @returns {string}
 */
export function parse(text) {
  let result = "";
  let lastChar = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[A-Z]/.test(char) && /[a-z]/.test(lastChar)) {
      result += char;
    } else if (char === '-' || char === '_' || char === ' ') {
      continue;
    } else if (result === "" || !/[A-Z]/.test(result[result.length - 1])) {
      result += char.toUpperCase();
    }
    lastChar = char;
  }

  let finalResult = "";
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    if (/[A-Z]/.test(char)) {
      finalResult += char;
    }
  }

  return finalResult;
}