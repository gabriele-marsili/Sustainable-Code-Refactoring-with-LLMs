const letterScores = new Map();

[
  [['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'], 1],
  [['D', 'G'], 2],
  [['B', 'C', 'M', 'P'], 3],
  [['F', 'H', 'V', 'W', 'Y'], 4],
  [['K'], 5],
  [['J', 'X'], 8],
  [['Q', 'Z'], 10],
].forEach(group => {
  const letters = group[0];
  const score = group[1];
  letters.forEach(letter => {
    letterScores.set(letter, score);
  });
});

export function score(word) {
  if (!word || /^\s*$/.test(word)) {
    return 0;
  }

  let totalScore = 0;
  for (let i = 0; i < word.length; i++) {
    const letter = word[i].toUpperCase();
    const letterScore = letterScores.get(letter);
    if (letterScore) {
      totalScore += letterScore;
    }
  }
  return totalScore;
}