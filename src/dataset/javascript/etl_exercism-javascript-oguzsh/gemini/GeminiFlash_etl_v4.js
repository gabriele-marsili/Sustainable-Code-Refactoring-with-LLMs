export const transform = oldData => {
  const result = {};
  for (const point in oldData) {
    if (Object.hasOwn(oldData, point)) {
      const letters = oldData[point];
      if (Array.isArray(letters)) {
        for (let i = 0; i < letters.length; i++) {
          const letter = letters[i];
          if (typeof letter === 'string') {
            result[letter.toLowerCase()] = Number(point);
          }
        }
      }
    }
  }
  return result;
};