//@ts-check

/**
 * @template T
 * @param {T[] | T[][] | T[][][] | T[][][][]} input
 * @returns {T[]}
 */
export function flatten(input) {
  const output = [];
  const stack = [input];
  
  while (stack.length > 0) {
    const current = stack.pop();
    
    if (Array.isArray(current)) {
      for (let i = current.length - 1; i >= 0; i--) {
        const item = current[i];
        if (item != null) {
          stack.push(item);
        }
      }
    } else {
      output.push(current);
    }
  }
  
  return output.reverse();
}