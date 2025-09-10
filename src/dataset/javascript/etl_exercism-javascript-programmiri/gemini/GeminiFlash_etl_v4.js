export const transform = (oldMap) => {
  const acc = {};
  for (const key in oldMap) {
    if (Object.hasOwn(oldMap, key)) {
      const points = Number(key);
      const letters = oldMap[key];
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i].toLowerCase();
        acc[letter] = points;
      }
    }
  }
  return acc;
};