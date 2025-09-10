//@ts-check

/**
 * @param {string} input
 * @returns {string}
 */
export const hello = input => {
  const name = input || 'World';
  return `Hello, ${name}!`;
};