//@ts-check

/**
 * @template T
 * @param {T[] | T[][] | T[][][] | T[][][][]} input
 * @returns {T[]}
 */
export function flatten(input) {
  const stack = [...input];
  const output = [];
  while (stack.length) {
    const value = stack.pop();
    if (Array.isArray(value)) {
      stack.push(...value);
    } else if (value !== undefined && value !== null) {
      output.push(value);
    }
  }
  return output.reverse();
}