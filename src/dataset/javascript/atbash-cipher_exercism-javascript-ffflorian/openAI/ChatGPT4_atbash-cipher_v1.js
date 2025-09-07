//@ts-check

/**
 * @param {string} input
 * @returns {string}
 */
export const decode = input => {
  const aCode = 'a'.charCodeAt(0);
  const zCode = 'z'.charCodeAt(0);
  const ACode = 'A'.charCodeAt(0);
  const ZCode = 'Z'.charCodeAt(0);

  return [...input.toLowerCase()]
    .filter(char => {
      const code = char.charCodeAt(0);
      return (code >= aCode && code <= zCode) || (code >= '0'.charCodeAt(0) && code <= '9'.charCodeAt(0));
    })
    .map(char => {
      const code = char.charCodeAt(0);
      if (code >= aCode && code <= zCode) {
        return String.fromCharCode(zCode - (code - aCode));
      }
      return char;
    })
    .join('');
};

/**
 * @param {string} input
 * @returns {string}
 */
export const encode = input => {
  const decoded = decode(input);
  const result = [];
  for (let i = 0; i < decoded.length; i += 5) {
    result.push(decoded.slice(i, i + 5));
  }
  return result.join(' ');
};