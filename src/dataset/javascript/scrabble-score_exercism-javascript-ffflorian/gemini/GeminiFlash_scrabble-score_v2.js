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
  group[0].forEach(letter => {
    letterScores.set(letter, group[1]);
  });
});

export function score(word) {
  if (!word || /^\s*$/.test(word)) {
    return 0;
  }

  let totalScore = 0;
  const upperCaseWord = word.toUpperCase();

  for (let i = 0; i < upperCaseWord.length; i++) {
    const letter = upperCaseWord[i];
    const points = letterScores.get(letter);
    if (points) {
      totalScore += points;
    }
  }

  return totalScore;
}