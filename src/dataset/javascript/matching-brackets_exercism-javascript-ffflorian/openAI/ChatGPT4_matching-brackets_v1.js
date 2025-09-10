//@ts-check

const bracketMap = {
  '[': ']',
  '{': '}',
  '(': ')',
};

/**
 * @param {string} input
 * @returns {boolean}
 */
export function isPaired(input) {
  const stack = [];

  for (const bracket of input) {
    if (bracket in bracketMap) {
      stack.push(bracket);
    } else if (Object.values(bracketMap).includes(bracket)) {
      if (stack.length === 0 || bracketMap[stack.pop()] !== bracket) {
        return false;
      }
    }
  }

  return stack.length === 0;
}