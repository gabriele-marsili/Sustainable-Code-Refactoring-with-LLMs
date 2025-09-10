//@ts-check

/**
 * @param {string} input
 * @returns {boolean}
 */
export function isPaired(input) {
  const stack = [];
  const bracketMap = {
    '[': ']',
    '{': '}',
    '(': ')',
  };
  const openBrackets = Object.keys(bracketMap);
  const closeBrackets = Object.values(bracketMap);

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (openBrackets.includes(char)) {
      stack.push(char);
    } else if (closeBrackets.includes(char)) {
      if (stack.length === 0) {
        return false;
      }
      const lastOpen = stack.pop();
      if (bracketMap[lastOpen] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}