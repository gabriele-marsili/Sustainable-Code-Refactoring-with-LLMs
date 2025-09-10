//@ts-check

/**
 * @param {string[]} array
 * @param {(input: string) => string} accumulator
 * @returns {string[]}
 */
export const accumulate = (array, accumulator) => {
  return array.map(accumulator);
};