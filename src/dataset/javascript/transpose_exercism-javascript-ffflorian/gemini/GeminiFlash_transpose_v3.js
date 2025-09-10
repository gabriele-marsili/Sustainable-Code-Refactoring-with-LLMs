function trimTrailing(array) {
  let i = array.length;
  while (i > 0 && array[i - 1] === undefined) {
    i--;
  }
  return array.slice(0, i);
}

export const transpose = lines => {
  const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
  const result = Array(longestLine).fill('');

  for (let col = 0; col < longestLine; col++) {
    let transposedLine = '';
    for (let row = 0; row < lines.length; row++) {
      const char = lines[row][col];
      transposedLine += char !== undefined ? char : ' ';
    }
    result[col] = transposedLine;
  }

  return trimTrailing(result);
};