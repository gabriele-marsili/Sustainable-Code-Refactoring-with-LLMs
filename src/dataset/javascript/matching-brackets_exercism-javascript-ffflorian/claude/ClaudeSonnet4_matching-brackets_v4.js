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
  
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    
    if (leftBrackets.has(char)) {
      stack.push(char);
    } else if (rightBrackets.has(char)) {
      if (stack.length === 0 || stack.pop() !== bracketMap.get(char)) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}