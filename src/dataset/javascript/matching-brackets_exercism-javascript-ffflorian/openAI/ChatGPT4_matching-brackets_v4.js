//@ts-check

const bracketMap = new Map([
  [']', '['],
  ['}', '{'],
  [')', '('],
]);

const openingBrackets = new Set(['[', '{', '(']);

/**
 * @param {string} input
 * @returns {boolean}
 */
export function isPaired(input) {
  const stack = [];

  for (const bracket of input) {
    if (openingBrackets.has(bracket)) {
      stack.push(bracket);
    } else if (bracketMap.has(bracket)) {
      if (stack.pop() !== bracketMap.get(bracket)) {
        return false;
      }
    }
  }

  return stack.length === 0;
}