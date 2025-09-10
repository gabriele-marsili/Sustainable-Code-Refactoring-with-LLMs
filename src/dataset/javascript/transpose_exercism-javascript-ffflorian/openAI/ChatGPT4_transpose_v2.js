function trimTrailing(array) {
  let endIndex = array.length;
  while (endIndex > 0 && array[endIndex - 1] === undefined) {
    endIndex--;
  }
  return array.slice(0, endIndex);
}

export const transpose = lines => {
  const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
  const result = Array.from({ length: longestLine }, (_, col) => {
    let column = '';
    for (let row = 0; row < lines.length; row++) {
      column += lines[row][col] || ' ';
    }
    return column.trimEnd();
  });
  return result;
};