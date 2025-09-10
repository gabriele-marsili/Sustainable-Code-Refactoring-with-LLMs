export const transform = (s) => {
  const scrabble = {};
  for (const score in s) {
    s[score].forEach(letter => {
      scrabble[letter.toLowerCase()] = +score;
    });
  }
  return scrabble;
};