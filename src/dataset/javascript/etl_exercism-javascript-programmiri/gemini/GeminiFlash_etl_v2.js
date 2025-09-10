export const transform = (oldMap) => {
  const newMap = {};
  for (const score in oldMap) {
    if (Object.hasOwn(oldMap, score)) {
      const letters = oldMap[score];
      const numericScore = Number(score);
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i].toLowerCase();
        newMap[letter] = numericScore;
      }
    }
  }
  return newMap;
};