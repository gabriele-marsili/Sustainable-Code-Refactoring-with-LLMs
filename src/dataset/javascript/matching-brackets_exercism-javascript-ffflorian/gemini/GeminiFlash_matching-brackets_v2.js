//@ts-check

const bracketPairsMap = {
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
    if (bracketPairsMap[bracket]) {
      stack.push(bracket);
    } else {
      const lastBracket = stack.pop();
      if (!lastBracket || bracketPairsMap[lastBracket] !== bracket) {
        return false;
      }
    }
  }

  return stack.length === 0;
}