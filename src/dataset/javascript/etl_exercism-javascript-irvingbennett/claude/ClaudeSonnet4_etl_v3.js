export const transform = (s) => {
  const scrabble = {};
  for (const score in s) {
    const scoreInt = parseInt(score);
    const letters = s[score];
    for (let i = 0; i < letters.length; i++) {
      scrabble[letters[i].toLowerCase()] = scoreInt;
    }
  }
  return scrabble;
};