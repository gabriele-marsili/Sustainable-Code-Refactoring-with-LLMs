//@ts-check

/**
 * @param {string[]} array
 * @param {(input: string) => string} accumulator
 * @returns {string[]}
 */
export const accumulate = (array, accumulator) => {
  const length = array.length;
  const result = new Array(length);
  for (let index = 0; index < length; index++) {
    result[index] = accumulator(array[index]);
  }
  return result;
};