//@ts-check

/**
 * @param {string[]} array
 * @param {(input: string) => string} accumulator
 * @returns {string[]}
 */
export const accumulate = (array, accumulator) => {
  const result = new Array(array.length);
  for (let index = 0; index < array.length; index++) {
    result[index] = accumulator(array[index]);
  }
  return result;
};