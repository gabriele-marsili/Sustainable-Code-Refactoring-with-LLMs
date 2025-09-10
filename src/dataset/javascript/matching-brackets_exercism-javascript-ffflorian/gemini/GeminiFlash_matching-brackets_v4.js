//@ts-check

const bracketPairs = {
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

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (bracketPairs[char]) {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (!last || bracketPairs[last] !== char) {
        if (char === ']' || char === '}' || char === ')') {
          if (!last || bracketPairs[last] !== char) {
            return false;
          }
        }
      }
    }
  }

  return stack.length === 0;
}