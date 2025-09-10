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

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (bracketMap[char]) {
      stack.push(char);
    } else {
      let last = stack.pop();
      if (last && bracketMap[last] !== char) {
        return false;
      } else if (!last && Object.values(bracketMap).includes(char)) {
          return false;
      }
    }
  }

  return stack.length === 0;
}