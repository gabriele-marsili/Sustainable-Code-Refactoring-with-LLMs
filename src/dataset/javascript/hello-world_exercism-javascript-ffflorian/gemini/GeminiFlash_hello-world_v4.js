//@ts-check

/**
 * @param {string} input
 * @returns {string}
 */
export const hello = input => {
  return `Hello, ${input ? input : 'World'}!`;
};