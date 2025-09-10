export const transform = oldData => {
  const result = {};
  for (const point in oldData) {
    for (const letter of oldData[point]) {
      result[letter.toLowerCase()] = +point;
    }
  }
  return result;
};