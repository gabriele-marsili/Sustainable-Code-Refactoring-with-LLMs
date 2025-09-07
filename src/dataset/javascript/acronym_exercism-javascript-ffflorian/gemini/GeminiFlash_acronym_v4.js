//@ts-check

/**
 * @param {string} text
 * @returns {string}
 */
export function parse(text) {
  let result = '';
  let lastChar = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[A-Z]/.test(char) && /[a-z]/.test(lastChar)) {
      result += char;
    } else if (char === '-' || char === '_' || char === ' ') {
      continue;
    } else if (result.length === 0) {
      result += char.toUpperCase();
    } else if (/[a-z]/.test(char) && /[A-Z]/.test(text[i+1])) {
      result += char.toUpperCase();
    }
    lastChar = char;
  }

  let finalResult = '';
  lastChar = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[A-Z]/.test(char) && /[a-z]/.test(lastChar)) {
      finalResult += char;
    } else if (char === '-' || char === '_' || char === ' ') {
      continue;
    } else if (finalResult.length === 0) {
      finalResult += char.toUpperCase();
    }
    lastChar = char;
  }

  if (finalResult.length === 0 && text.length > 0) {
      finalResult += text[0].toUpperCase();
  }

  let final = '';
  let wordStart = true;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '-' || char === '_' || char === ' ') {
      wordStart = true;
    } else if (wordStart) {
      final += char.toUpperCase();
      wordStart = false;
    } else if (i > 0 && /[a-z]/.test(text[i - 1]) && /[A-Z]/.test(char)) {
      final += char.toUpperCase();
    }
  }

  return final;
}