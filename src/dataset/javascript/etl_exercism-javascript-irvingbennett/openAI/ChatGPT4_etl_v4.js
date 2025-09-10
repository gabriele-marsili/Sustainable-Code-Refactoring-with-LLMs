export const transform = (s) => {
  const scrabble = {};
  Object.entries(s).forEach(([score, letters]) => {
    letters.forEach(letter => {
      scrabble[letter.toLowerCase()] = +score;
    });
  });
  return scrabble;
};