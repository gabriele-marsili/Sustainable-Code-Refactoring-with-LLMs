//@ts-check

const bracketMap = {
  '[': ']',
  '{': '}',
  '(': ')',
};

const openingBrackets = new Set(Object.keys(bracketMap));
const closingBrackets = new Set(Object.values(bracketMap));

/**
 * @param {string} input
 * @returns {boolean}
 */
export function isPaired(input) {
  const stack = [];

  for (const bracket of input) {
    if (openingBrackets.has(bracket)) {
      stack.push(bracket);
    } else if (closingBrackets.has(bracket)) {
      if (stack.length === 0 || bracketMap[stack.pop()] !== bracket) {
        return false;
      }
    }
  }

  return stack.length === 0;
}