export const transform = (s) => {
  const scrabble = {};
  for (const score in s) {
    if (Object.hasOwn(s, score)) {
      const letters = s[score];
      if (Array.isArray(letters)) {
        const parsedScore = parseInt(score, 10);
        for (let i = 0; i < letters.length; i++) {
          const letter = letters[i].toLowerCase();
          scrabble[letter] = parsedScore;
        }
      }
    }
  }
  return scrabble;
};