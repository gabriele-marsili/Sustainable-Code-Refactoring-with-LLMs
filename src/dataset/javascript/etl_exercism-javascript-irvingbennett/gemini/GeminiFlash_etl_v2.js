export const transform = (s) => {
  const scrabble = {};
  for (const score in s) {
    if (Object.hasOwn(s, score)) {
      const letters = s[score];
      if (Array.isArray(letters)) {
        const parsedScore = parseInt(score, 10); // Parse once
        for (let i = 0; i < letters.length; i++) {
          scrabble[letters[i].toLowerCase()] = parsedScore;
        }
      }
    }
  }
  return scrabble;
};