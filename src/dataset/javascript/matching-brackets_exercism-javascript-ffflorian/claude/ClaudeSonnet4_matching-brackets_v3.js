//@ts-check

const leftBrackets = new Set(['[', '{', '(']);
const rightBrackets = new Set([']', '}', ')']);
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
    if (leftBrackets.has(bracket)) {
      stack.push(bracket);
    } else if (rightBrackets.has(bracket)) {
      if (stack.pop() !== bracketMap.get(bracket)) {
        return false;
      }
    }
  }

  return stack.length === 0;
}