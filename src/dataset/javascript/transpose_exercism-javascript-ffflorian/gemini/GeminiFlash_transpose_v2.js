function trimTrailing(array) {
  let i = array.length;
  while (i > 0 && array[i - 1] === undefined) {
    i--;
  }
  return array.slice(0, i);
}

export const transpose = lines => {
  const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
  const result = [];

  for (let col = 0; col < longestLine; col++) {
    const columnChars = [];
    for (let row = 0; row < lines.length; row++) {
      columnChars.push(lines[row][col]);
    }
    result.push(trimTrailing(columnChars).map(char => char || ' ').join(''));
  }

  return result;
};