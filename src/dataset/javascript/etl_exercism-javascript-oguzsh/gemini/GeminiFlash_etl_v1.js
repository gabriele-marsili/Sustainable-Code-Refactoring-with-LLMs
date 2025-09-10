export const transform = oldData => {
  const result = {};
  for (const point in oldData) {
    if (Object.hasOwn(oldData, point)) {
      const letters = oldData[point];
      const numericPoint = Number(point);
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i].toLowerCase();
        result[letter] = numericPoint;
      }
    }
  }
  return result;
};