//@ts-check

const openBrackets = new Set(['[', '{', '(']);
const closeBrackets = new Set([']', '}', ')']);
const bracketMap = {
  ']': '[',
  '}': '{',
  ')': '('
};

/**
 * @param {string} input
 * @returns {boolean}
 */
export function isPaired(input) {
  const stack = [];

  for (const bracket of input) {
    if (openBrackets.has(bracket)) {
      stack.push(bracket);
    } else if (closeBrackets.has(bracket)) {
      if (stack.pop() !== bracketMap[bracket]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}