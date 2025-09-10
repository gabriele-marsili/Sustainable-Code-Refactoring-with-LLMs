export const transform = oldData => {
  const result = {};
  for (const point in oldData) {
    const letters = oldData[point];
    for (let i = 0; i < letters.length; i++) {
      result[letters[i].toLowerCase()] = +point;
    }
  }
  return result;
};