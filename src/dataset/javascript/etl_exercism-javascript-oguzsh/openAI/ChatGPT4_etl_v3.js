export const transform = oldData => {
  const result = {};
  for (const point in oldData) {
    oldData[point].forEach(letter => {
      result[letter.toLowerCase()] = +point;
    });
  }
  return result;
};