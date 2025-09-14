//@ts-check

const openBrackets = new Set(['[', '{', '(']);
const bracketMap = new Map([
  [']', '['],
  ['}', '{'],
  [')', '(']
]);

/**
 * @param {string} input
 * @returns {boolean}
 */
export function isPaired(input) {
  const stack = [];

  for (const bracket of input) {
    if (openBrackets.has(bracket)) {
      stack.push(bracket);
    } else if (bracketMap.has(bracket)) {
      if (stack.pop() !== bracketMap.get(bracket)) {
        return false;
      }
    }
  }

  return stack.length === 0;
}